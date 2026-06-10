// @ts-nocheck
"use client";
import { useState, useRef } from "react";
import { Upload, Scissors, Download } from "lucide-react";

export default function ImageWatermarkRemover() {
  const [img, setImg] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [method, setMethod] = useState("crop");
  const [cropArea, setCropArea] = useState({ x: 0, y: 0, w: 150, h: 50 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const handleFile = (file: File) => {
    const url = URL.createObjectURL(file);
    const img = new window.Image();
    img.onload = () => { imgRef.current = img; setImg(url); setResult(null); };
    img.src = url;
  };

  const removeWatermark = () => {
    const canvas = canvasRef.current;
    const image = imgRef.current;
    if (!canvas || !image) return;
    canvas.width = image.width; canvas.height = image.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(image, 0, 0);

    if (method === "crop") {
      const w = Math.min(cropArea.w, image.width - cropArea.x);
      const h = Math.min(cropArea.h, image.height - cropArea.y);
      const croppedCanvas = document.createElement("canvas");
      croppedCanvas.width = image.width;
      croppedCanvas.height = image.height - h;
      const cropCtx = croppedCanvas.getContext("2d");
      if (!cropCtx) return;
      cropCtx.drawImage(canvas, 0, 0, image.width, cropArea.y, 0, 0, image.width, cropArea.y);
      cropCtx.drawImage(canvas, 0, cropArea.y + h, image.width, image.height - cropArea.y - h, 0, cropArea.y, image.width, image.height - cropArea.y - h);
      setResult(croppedCanvas.toDataURL("image/png"));
    } else {
      ctx.fillStyle = "white";
      ctx.fillRect(cropArea.x, cropArea.y, cropArea.w, cropArea.h);
      ctx.filter = "blur(20px)";
      ctx.drawImage(canvas, cropArea.x, cropArea.y, cropArea.w, cropArea.h, cropArea.x, cropArea.y, cropArea.w, cropArea.h);
      ctx.filter = "none";
      setResult(canvas.toDataURL("image/png"));
    }
  };

  const download = () => {
    if (!result) return;
    const a = document.createElement("a");
    a.href = result;
    a.download = "watermark-removed.png";
    a.click();
  };

  return (
    <div className="space-y-4">
      {!img ? (
        <label className="flex flex-col items-center gap-4 rounded-xl border-2 border-dashed p-12 cursor-pointer hover:border-primary"><Upload className="h-8 w-8 text-muted-foreground" /><p className="text-sm text-muted-foreground">Upload an image to remove watermark</p><input type="file" accept="image/*" onChange={e=>{const f=e.target.files?.[0]; if(f)handleFile(f);}} className="hidden" /></label>
      ) : (
        <div className="space-y-4">
          <div className="flex gap-2">
            <button onClick={()=>setMethod("crop")} className={"tool-btn "+(method==="crop"?"tool-btn-primary":"tool-btn-secondary")}><Scissors className="h-4 w-4" />Crop Area</button>
            <button onClick={()=>setMethod("blur")} className={"tool-btn "+(method==="blur"?"tool-btn-primary":"tool-btn-secondary")}>Blur Area</button>
          </div>
          {method === "crop" ? (
            <div className="grid grid-cols-2 gap-2">
              <div><label className="text-xs">X Position</label><input type="number" value={cropArea.x} onChange={e=>setCropArea({...cropArea,x:+e.target.value})} className="tool-input tool-input-sm w-20" /></div>
              <div><label className="text-xs">Y Position</label><input type="number" value={cropArea.y} onChange={e=>setCropArea({...cropArea,y:+e.target.value})} className="tool-input tool-input-sm w-20" /></div>
              <div><label className="text-xs">Width</label><input type="number" value={cropArea.w} onChange={e=>setCropArea({...cropArea,w:+e.target.value})} className="tool-input tool-input-sm w-20" /></div>
              <div><label className="text-xs">Height</label><input type="number" value={cropArea.h} onChange={e=>setCropArea({...cropArea,h:+e.target.value})} className="tool-input tool-input-sm w-20" /></div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Blur mode: applies a heavy blur over the selected area to hide the watermark.</p>
          )}
          <div className="flex gap-2">
            <button onClick={removeWatermark} className="tool-btn tool-btn-primary"><Scissors className="h-4 w-4" />Remove Watermark</button>
            <button onClick={()=>{setImg(null);setResult(null);}} className="tool-btn tool-btn-secondary">Reset</button>
            {result && <button onClick={download} className="tool-btn tool-btn-secondary"><Download className="h-4 w-4" />Download</button>}
          </div>
          {result && <img src={result} className="max-h-64 rounded border" alt="Result" />}
          <img src={img} className="max-h-64 rounded border opacity-50" alt="Original" />
        </div>
      )}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}