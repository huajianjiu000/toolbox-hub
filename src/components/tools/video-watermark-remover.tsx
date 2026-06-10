// @ts-nocheck
"use client";
import SimpleTool from "@/components/shared/simple-tool";

export default function VideoWatermarkRemover() {
  const process = (input: string) => {
    return "Video Watermark Removal Guide\n\nFor TikTok/Reels/Shorts:\n1. Use TikTok/Instagram/YouTube Shorts downloader above to get the video\n2. The downloaded videos from our partner services come WITHOUT watermark\n\nFor other videos:\n1. Use video editing software:\n   - CapCut (free, mobile + desktop)\n   - DaVinci Resolve (free, professional)\n   - iMovie (free, Mac/iOS)\n2. Crop or blur the watermark area\n3. Export the edited video\n\nOnline tools for video watermark removal:\n- media.io (free watermark remover)\n- kapwing.com (online video editor)\n- beecut.com (online video toolkit)\n\nTip: For best results, use the download method above - most short video platforms store videos WITHOUT watermarks and add them during playback.";
  };
  return <SimpleTool label="Video URL or Notes" placeholder="Enter details about your video..." process={process} btnLabel="Show Guide" />;
}