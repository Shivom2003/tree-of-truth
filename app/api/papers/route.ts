import { NextResponse } from "next/server";
import { fetchPapers } from "@/lib/services/semanticScholar";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q") || "";
    const papers = await fetchPapers(q);
    return NextResponse.json(papers);
  } catch (error) {
    console.error("API route /api/papers failed:", error);
    return NextResponse.json({ error: "Failed to fetch papers" }, { status: 500 });
  }
}
