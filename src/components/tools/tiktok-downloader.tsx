// @ts-nocheck
"use client";
import { useState } from "react";
import { Download, Link } from "lucide-react";
import CopyButton from "@/components/copy-button";

export default function TiktokDownloader() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const process = () => {
    setError(""); setResult("");
    if (!url.trim()) { setError("Please enter a TikTok video URL"); return; }
    if (!url.includes("tiktok.com")) { setError("Please enter a valid TikTok URL (e.g. https://www.tiktok.com/@user/video/123456)"); return; }
    setResult("Processing TikTok video...\n\nThis tool extracts videos without watermark.\n\nYour URL: " + url + "\n\nNote: This is a client-side tool. For full functionality, a backend API is needed to fetch the video. The free APIs include: snaptik.app, tikwm.com, tikmate.cc\n\nTo download without watermark:\n1. Copy your TikTok link\n2. Visit one of the above services\n3. Paste and download");
  };

  return (
    <div className="space-y-4">
      <div><label className="block text-sm font-medium text-foreground mb-2">TikTok Video URL</label><input className="tool-input tool-input-sm font-sans" value={url} onChange={e=>setUrl(e.target.value)} placeholder="https://www.tiktok.com/@user/video/123456" /></div>
      <button onClick={process} className="tool-btn tool-btn-primary"><Download className="h-4 w-4" />Get Video</button>
      {error && <div className="rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 text-sm text-red-600 dark:text-red-400">{error}</div>}
      {result && <div><div className="flex items-center justify-between mb-2"><label className="text-sm font-medium text-foreground">Result</label><CopyButton text={result} /></div><pre className="tool-result">{result}</pre></div>}
    </div>
  );
}