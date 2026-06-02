import { MediaItem, CURATED_MEDIA } from "@/lib/data/curatedMedia";

const SEMANTIC_SCHOLAR_BASE = "https://api.semanticscholar.org/graph/v1";

// Throttling mechanism to respect the 1 request per second rate limit
let lastRequestTime = 0;
let queuePromise = Promise.resolve();

async function throttleRequest<T>(fn: () => Promise<T>): Promise<T> {
  const currentPromise = queuePromise;
  let resolveQueue: () => void;
  queuePromise = new Promise((resolve) => {
    resolveQueue = resolve;
  });

  await currentPromise;
  try {
    const minInterval = 1100; // 1.1s to be safe
    const now = Date.now();
    const timeSinceLast = now - lastRequestTime;
    if (timeSinceLast < minInterval) {
      const delay = minInterval - timeSinceLast;
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
    lastRequestTime = Date.now();
    return await fn();
  } finally {
    resolveQueue!();
  }
}

interface ScholarPaperResponse {
  paperId: string;
  title: string;
  abstract: string | null;
  url: string | null;
  year: number | null;
  citationCount: number | null;
  authors: Array<{ name: string }>;
  externalIds?: {
    DOI?: string;
  };
}

// Convert Semantic Scholar response to standard MediaItem
function mapToMediaItem(paper: ScholarPaperResponse): MediaItem {
  const doi = paper.externalIds?.DOI || paper.paperId;
  return {
    id: doi,
    title: paper.title,
    description: paper.abstract || "No abstract available.",
    authorsOrChannel: paper.authors?.map(a => a.name) || [],
    url: paper.url || `https://www.semanticscholar.org/paper/${paper.paperId}`,
    publishedDate: paper.year ? `${paper.year}-01-01` : "Unknown",
    type: "paper",
    tags: [], // Tags will be added contextually or dynamically based on keyword matching
    citationCount: paper.citationCount || 0
  };
}

export async function fetchPapers(query: string): Promise<MediaItem[]> {
  const apiKey = process.env.SEMANTIC_SCHOLAR_API_KEY || "";

  if (!query || query.trim() === "") {
    return CURATED_MEDIA.filter(item => item.type === "paper");
  }

  try {
    const headers: Record<string, string> = {};
    if (apiKey) {
      headers["x-api-key"] = apiKey;
    }

    const response = await throttleRequest(() =>
      fetch(
        `${SEMANTIC_SCHOLAR_BASE}/paper/search?query=${encodeURIComponent(query)}&limit=10&fields=title,authors,abstract,url,year,citationCount,externalIds`,
        { headers, next: { revalidate: 3600 } } // Cache for 1 hour
      )
    );

    if (!response.ok) {
      throw new Error(`Semantic Scholar API responded with status ${response.status}`);
    }

    const data = await response.json();
    const papers: ScholarPaperResponse[] = data.data || [];
    const mapped = papers.map(mapToMediaItem);

    // Merge with any local curated papers that match the query to ensure core papers are present
    const matchedCurated = CURATED_MEDIA.filter(
      item =>
        item.type === "paper" &&
        (item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase()) ||
          item.authorsOrChannel.some(a => a.toLowerCase().includes(query.toLowerCase())))
    );

    // Avoid duplicating items (by id/DOI)
    const result = [...matchedCurated];
    mapped.forEach(paper => {
      if (!result.some(r => r.id === paper.id)) {
        result.push(paper);
      }
    });

    return result;
  } catch (error) {
    console.warn("Semantic Scholar API failed, falling back to curated local data. Error:", error);

    // Fallback: search local curated papers
    return CURATED_MEDIA.filter(
      item =>
        item.type === "paper" &&
        (item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase()) ||
          item.authorsOrChannel.some(a => a.toLowerCase().includes(query.toLowerCase())))
    );
  }
}

export async function fetchPaperById(id: string): Promise<MediaItem | null> {
  // Check local curated list first
  const localItem = CURATED_MEDIA.find(item => item.id === id && item.type === "paper");
  if (localItem) return localItem;

  const apiKey = process.env.SEMANTIC_SCHOLAR_API_KEY || "";

  try {
    const headers: Record<string, string> = {};
    if (apiKey) {
      headers["x-api-key"] = apiKey;
    }

    const response = await throttleRequest(() =>
      fetch(
        `${SEMANTIC_SCHOLAR_BASE}/paper/${encodeURIComponent(id)}?fields=title,authors,abstract,url,year,citationCount,externalIds`,
        { headers, next: { revalidate: 86400 } } // Cache for 24 hours
      )
    );

    if (!response.ok) {
      throw new Error(`Semantic Scholar API responded with status ${response.status}`);
    }

    const paper: ScholarPaperResponse = await response.json();
    return mapToMediaItem(paper);
  } catch (error) {
    console.warn(`Failed to fetch paper by ID ${id} from API, returning null. Error:`, error);
    return null;
  }
}

