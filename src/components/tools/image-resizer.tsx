// @ts-nocheck
"use client";
import { useState, useRef } from "react";
import { Download, Upload } from "lucide-react";
export default function ImageResizer() {
  const [orig, setOrig] = useState<string | null>(null);
  const [resized, setResized] = useState<string | null>(null);
  const [width, setWidth] = useState(200);
  const [height, setHeight] = useState(200);
  const [keepRatio, setKeepRatio] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const handleFile = (file: File) => {
    const url = URL.createObjectURL(file);
    const img = new window.Image();
    img.onload = () => { imgRef.current = img; setOrig(url); setWidth(img.width); setHeight(img.height); };
    img.src = url;
  };

  const resize = () => {
    const img = imgRef.current;
    const canvas = canvasRef.current;
    if (!img || !canvas) return;
    canvas.width = width; canvas.height = height;
    const ctx = canvas.getContext("2d");
    ctx?.drawImage(img, 0, 0, width, height);
    setResized(canvas.toDataURL("image/png"));
  };

  const download = () => { if (!resized) return; const a = document.createElement("a"); a.href = resized; a.download = "resized.png"; a.click(); };

  return (
    <div className="space-y-4">
      {!orig ? (
        <label className="flex flex-col items-center gap-4 rounded-xl border-2 border-dashed p-12 cursor-pointer hover:border-primary"><Upload className="h-8 w-8 text-muted-foreground" /><p className="text-sm text-muted-foreground">Drop an image or click to select</p><input type="file" accept="image/*" onChange={e=>{const f=e.target.files?.[0]; if(f)handleFile(f);}} className="hidden" /></label>
      ) : (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <div><label className="text-xs">Width</label><input type="number" value={width} onChange={e=>setWidth(+e.target.value)} className="tool-input tool-input-sm w-20" /></div>
            <div><label className="text-xs">Height</label><input type="number" value={height} onChange={e=>setHeight(+e.target.value)} className="tool-input tool-input-sm w-20" /></div>
          </div>
          <button onClick={resize} className="tool-btn tool-btn-primary">Resize</button>
          {resized && <button onClick={download} className="tool-btn tool-btn-secondary"><Download className="h-4 w-4" />Download</button>}
          <div className="flex gap-4">{resized ? <img src={resized} className="max-h-48 rounded border" /> : <div className="h-20 flex items-center text-muted-foreground">Click Resize</div>}</div>
        </div>
      )}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}