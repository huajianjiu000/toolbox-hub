// @ts-nocheck
"use client";
import SimpleTool from "@/components/shared/simple-tool";
export default function TextStats() {
  const process = (input: string) => {
    const chars = input.length;
    const charsNoSpaces = input.replace(/\s/g, "").length;
    const words = input.trim() ? input.trim().split(/\s+/).length : 0;
    const lines = input.split("\n").length;
    const sentences = input.split(/[.!?]+/).filter(Boolean).length;
    const paragraphs = input.split(/\n\s*\n/).filter(p => p.trim()).length;
    const avgWord = words ? (charsNoSpaces / words).toFixed(1) : "0";
    const readingTime = Math.max(1, Math.ceil(words / 200));
    const mostUsed = (()=>{const m:Record<string,number>={};input.toLowerCase().split(/\s+/).forEach(w=>{const c=w.replace(/[^a-z]/g,"");if(c.length>2)m[c]=(m[c]||0)+1});return Object.entries(m).sort((a,b)=>b[1]-a[1]).slice(0,5).map(([w,n])=>w+": "+n).join(", ");})();
    return "Characters: " + chars + "\nCharacters (no spaces): " + charsNoSpaces + "\nWords: " + words + "\nLines: " + lines + "\nSentences: " + sentences + "\nParagraphs: " + paragraphs + "\nAvg Word Length: " + avgWord + "\nReading Time: " + readingTime + " min\nTop Words: " + mostUsed;
  };
  return <SimpleTool label="Text" placeholder="Paste text..." process={process} btnLabel="Analyze" />;
}