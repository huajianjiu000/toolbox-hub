// @ts-nocheck
"use client";
import { useState } from "react";
import { Download } from "lucide-react";
import CopyButton from "@/components/copy-button";

export default function YoutubeShortsDownloader() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const process = () => {
    setError(""); setResult("");
    if (!url.trim()) { setError("Please enter a YouTube Shorts URL"); return; }
    const m = url.match(/(?:youtube\.com\/shorts\/|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    if (!m) { setError("Not a valid YouTube Shorts URL. Use: https://www.youtube.com/shorts/VIDEO_ID"); return; }
    const id = m[1];
    setResult("YouTube Shorts Found!\n\nVideo ID: " + id + "\n\nThumbnail: https://img.youtube.com/vi/" + id + "/maxresdefault.jpg\n\nTo download the Shorts video:\n1. Visit y2mate.com or ssyoutube.com\n2. Paste this URL: https://www.youtube.com/shorts/" + id + "\n3. Select format and quality\n4. Click Download\n\nThe Shorts will be downloaded as a standard MP4 video file.");
  };

  return (
    <div className="space-y-4">
      <div><label className="block text-sm font-medium text-foreground mb-2">YouTube Shorts URL</label><input className="tool-input tool-input-sm font-sans" value={url} onChange={e=>setUrl(e.target.value)} placeholder="https://www.youtube.com/shorts/xxxxx" /></div>
      <button onClick={process} className="tool-btn tool-btn-primary"><Download className="h-4 w-4" />Get Shorts Info</button>
      {error && <div className="rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 text-sm text-red-600 dark:text-red-400">{error}</div>}
      {result && <div><div className="flex items-center justify-between mb-2"><label className="text-sm font-medium text-foreground">Result</label><CopyButton text={result} /></div><pre className="tool-result">{result}</pre></div>}
    </div>
  );
}