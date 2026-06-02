import { MediaItem, CURATED_MEDIA } from "@/lib/data/curatedMedia";

const YOUTUBE_API_BASE = "https://www.googleapis.com/youtube/v3";

interface YouTubeSearchResponseItem {
  id: {
    videoId: string;
  };
  snippet: {
    title: string;
    description: string;
    channelTitle: string;
    publishedAt: string;
    thumbnails: {
      medium?: { url: string };
      high?: { url: string };
      default?: { url: string };
    };
  };
}

// Helper to determine if a video is likely a podcast/dialogue
function determineVideoType(title: string, description: string): "video" | "podcast" | "short" {
  const t = (title + " " + description).toLowerCase();
  if (t.includes("podcast") || t.includes("dialogue") || t.includes("conversation") || t.includes("interview") || t.includes("discussion")) {
    return "podcast";
  }
  if (t.includes("short") || t.includes("tiktok") || t.includes("reel")) {
    return "short";
  }
  return "video";
}

// Batch fetch details for a list of video IDs from the YouTube API
export async function fetchVideosByIds(ids: string[]): Promise<MediaItem[]> {
  const apiKey = process.env.YOUTUBE_API_KEY || "";
  
  if (ids.length === 0) {
    return [];
  }

  // If no API Key is available, immediately return local static matching records
  if (!apiKey) {
    return CURATED_MEDIA.filter(item => ids.includes(item.id) && item.type !== "paper");
  }

  try {
    const response = await fetch(
      `${YOUTUBE_API_BASE}/videos?part=snippet,contentDetails&id=${encodeURIComponent(ids.join(","))}&key=${apiKey}`,
      { next: { revalidate: 86400 } } // Cache for 24 hours
    );

    if (!response.ok) {
      throw new Error(`YouTube API responded with status ${response.status}`);
    }

    const data = await response.json();
    const items = data.items || [];

    const mapped = items.map((item: any) => {
      const snippet = item.snippet;
      const type = determineVideoType(snippet.title, snippet.description);
      const thumb = snippet.thumbnails.medium?.url || snippet.thumbnails.high?.url || snippet.thumbnails.default?.url || "";

      // Parse ISO 8601 duration (e.g. PT1H24M12S to "1:24:12")
      const isoDuration = item.contentDetails?.duration || "";
      let duration = "";
      if (isoDuration) {
        const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
        if (match) {
          const hours = match[1] ? parseInt(match[1]) : 0;
          const minutes = match[2] ? parseInt(match[2]) : 0;
          const seconds = match[3] ? parseInt(match[3]) : 0;

          if (hours > 0) {
            duration = `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
          } else {
            duration = `${minutes}:${seconds.toString().padStart(2, "0")}`;
          }
        }
      }

      // Preserve tags from the local curated database if available
      const localItem = CURATED_MEDIA.find(lc => lc.id === item.id);
      const tags = localItem ? localItem.tags : [];

      return {
        id: item.id,
        title: snippet.title,
        description: snippet.description,
        authorsOrChannel: [snippet.channelTitle],
        url: `https://www.youtube.com/watch?v=${item.id}`,
        publishedDate: snippet.publishedAt.split("T")[0],
        type,
        thumbnailUrl: thumb,
        tags,
        duration: duration || undefined
      };
    });

    // Ensure any videos requested that weren't returned by the API still fallback to static data
    const missedIds = ids.filter(id => !mapped.some((m: any) => m.id === id));
    if (missedIds.length > 0) {
      const fallbackItems = CURATED_MEDIA.filter(item => missedIds.includes(item.id) && item.type !== "paper");
      mapped.push(...fallbackItems);
    }

    return mapped;
  } catch (error) {
    console.warn("YouTube batch fetch failed, falling back to static curated data. Error:", error);
    return CURATED_MEDIA.filter(item => ids.includes(item.id) && item.type !== "paper");
  }
}

// Hydrates all curated videos from YouTube API live
export async function getCuratedVideos(): Promise<MediaItem[]> {
  const curatedVideoIds = CURATED_MEDIA.filter(item => item.type !== "paper").map(item => item.id);
  return fetchVideosByIds(curatedVideoIds);
}

export async function fetchVideos(query: string): Promise<MediaItem[]> {
  const apiKey = process.env.YOUTUBE_API_KEY || "";

  if (!query || query.trim() === "") {
    return getCuratedVideos();
  }

  // If no API Key is available, immediately fall back to local search
  if (!apiKey) {
    return CURATED_MEDIA.filter(
      item =>
        item.type !== "paper" &&
        (item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase()) ||
          item.authorsOrChannel.some(c => c.toLowerCase().includes(query.toLowerCase())))
    );
  }

  try {
    const response = await fetch(
      `${YOUTUBE_API_BASE}/search?part=snippet&q=${encodeURIComponent(query)}&maxResults=10&type=video&key=${apiKey}`,
      { next: { revalidate: 3600 } } // Cache for 1 hour
    );

    if (!response.ok) {
      throw new Error(`YouTube API responded with status ${response.status}`);
    }

    const data = await response.json();
    const items: YouTubeSearchResponseItem[] = data.items || [];

    const mapped: MediaItem[] = items.map(item => {
      const videoId = item.id.videoId;
      const snippet = item.snippet;
      const type = determineVideoType(snippet.title, snippet.description);
      const thumb = snippet.thumbnails.medium?.url || snippet.thumbnails.high?.url || snippet.thumbnails.default?.url || "";

      return {
        id: videoId,
        title: snippet.title,
        description: snippet.description,
        authorsOrChannel: [snippet.channelTitle],
        url: `https://www.youtube.com/watch?v=${videoId}`,
        publishedDate: snippet.publishedAt.split("T")[0],
        type,
        thumbnailUrl: thumb,
        tags: [],
        duration: undefined
      };
    });

    // Merge with any local curated videos that match the query
    const matchedCurated = CURATED_MEDIA.filter(
      item =>
        item.type !== "paper" &&
        (item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase()) ||
          item.authorsOrChannel.some(c => c.toLowerCase().includes(query.toLowerCase())))
    );

    const result = [...matchedCurated];
    mapped.forEach(video => {
      if (!result.some(r => r.id === video.id)) {
        result.push(video);
      }
    });

    return result;
  } catch (error) {
    console.warn("YouTube API search failed, falling back to local curated data. Error:", error);

    // Fallback: search local curated videos
    return CURATED_MEDIA.filter(
      item =>
        item.type !== "paper" &&
        (item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase()) ||
          item.authorsOrChannel.some(c => c.toLowerCase().includes(query.toLowerCase())))
    );
  }
}
