// @ts-nocheck
"use client";
import { useState } from "react";
import { Download } from "lucide-react";
import CopyButton from "@/components/copy-button";

export default function InstagramDownloader() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const process = () => {
    setError(""); setResult("");
    if (!url.trim()) { setError("Please enter an Instagram Reels URL"); return; }
    if (!url.includes("instagram.com")) { setError("Please enter a valid Instagram URL"); return; }
    setResult("Instagram Reels/Video Downloader\n\nURL: " + url + "\n\nTo download:\n1. Open Instagram and find the Reel or Video\n2. Tap the share button (paper airplane icon)\n3. Select 'Copy Link'\n4. Visit a download service:\n   - igram.io\n   - snaptik.app (also supports Instagram)\n   - saveinsta.app\n5. Paste your URL and click Download\n\nVideo will be saved without watermark in original quality.");
  };

  return (
    <div className="space-y-4">
      <div><label className="block text-sm font-medium text-foreground mb-2">Instagram Video/Reels URL</label><input className="tool-input tool-input-sm font-sans" value={url} onChange={e=>setUrl(e.target.value)} placeholder="https://www.instagram.com/reel/xxxxx/" /></div>
      <button onClick={process} className="tool-btn tool-btn-primary"><Download className="h-4 w-4" />Get Download Links</button>
      {error && <div className="rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 text-sm text-red-600 dark:text-red-400">{error}</div>}
      {result && <div><div className="flex items-center justify-between mb-2"><label className="text-sm font-medium text-foreground">Guide</label><CopyButton text={result} /></div><pre className="tool-result">{result}</pre></div>}
    </div>
  );
}