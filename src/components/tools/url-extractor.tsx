// @ts-nocheck
"use client";
import SimpleTool from "@/components/shared/simple-tool";
export default function UrlExtractor() {
  const process = (input: string) => {
    const urls = input.match(/https?:\/\/[^\s<>"{}|\\^`\[\]]+/gi) || [];
    return urls.length ? urls.join("\n") : "No URLs found in the text.";
  };
  return <SimpleTool label="Text" placeholder="Paste text containing URLs..." process={process} />;
}