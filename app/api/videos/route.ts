import { NextResponse } from "next/server";
import { fetchVideos } from "@/lib/services/youtube";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q") || "";
    const videos = await fetchVideos(q);
    return NextResponse.json(videos);
  } catch (error) {
    console.error("API route /api/videos failed:", error);
    return NextResponse.json({ error: "Failed to fetch videos" }, { status: 500 });
  }
}
