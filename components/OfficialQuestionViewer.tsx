'use client';
import {useEffect,useRef,useState} from 'react';
type PdfPage={getViewport:(options:{scale:number})=>{width:number;height:number};render:(options:unknown)=>{promise:Promise<void>}};
type PdfDocument={getPage:(page:number)=>Promise<PdfPage>;destroy:()=>Promise<void>};
type PdfModule={GlobalWorkerOptions:{workerSrc:string};getDocument:(options:unknown)=>{promise:Promise<PdfDocument>;destroy:()=>Promise<void>}};
const papers:Record<string,string>={
 'ap-physics-1-course-and-exam-description.pdf':'physics-1-ced',
 'ap-physics-2-course-and-exam-description.pdf':'physics-2-ced',
 'ap24-frq-physics-1.pdf':'physics-1-2024',
 'ap25-frq-physics-2.pdf':'physics-2-2025',
 'ap26-frq-physics-2.pdf':'physics-2-2026',
};
export function OfficialQuestionViewer({url,title,pages}:{url:string;title:string;pages:number[]}){
 const root=useRef<HTMLDivElement>(null),canvas=useRef<HTMLCanvasElement>(null),documentRef=useRef<PdfDocument|null>(null);
 const [width,setWidth]=useState(0);
 useEffect(()=>{const element=root.current;if(!element)return;const observer=new ResizeObserver(()=>setWidth(element.clientWidth));observer.observe(element);setWidth(element.clientWidth);return()=>observer.disconnect();},[]);
 const [visible,setVisible]=useState(false),[ready,setReady]=useState(false),[index,setIndex]=useState(0),[zoom,setZoom]=useState(1),[status,setStatus]=useState('Loading the official question…'),[error,setError]=useState(false);
 useEffect(()=>{if(!root.current)return;const observer=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){setVisible(true);observer.disconnect();}},{rootMargin:'200px'});observer.observe(root.current);return()=>observer.disconnect();},[]);
 useEffect(()=>{
  if(!visible)return;let cancelled=false;let task:{promise:Promise<PdfDocument>;destroy:()=>Promise<void>}|undefined;
  async function load(){try{
   const pdf=await import('../lib/vendor/pdf.min.mjs') as PdfModule;
   if(cancelled)return;pdf.GlobalWorkerOptions.workerSrc='/vendor/pdfjs/pdf.worker.min.mjs';
   const filename=new URL(url).pathname.split('/').pop()??'';const id=papers[filename];if(!id)throw new Error('Unknown source');
   const response=await fetch(`/api/official-paper?paper=${id}`);if(!response.ok)throw new Error(`Source returned ${response.status}`);
   const payload=await response.json() as {data:string};if(cancelled)return;const bytes=Uint8Array.from(atob(payload.data),c=>c.charCodeAt(0));
   task=pdf.getDocument({data:bytes,standardFontDataUrl:'/vendor/pdfjs/standard_fonts/'});
   const doc=await task.promise;if(cancelled){await doc.destroy();return;}documentRef.current=doc;setReady(true);
  }catch(error){console.error("Official question viewer:",String(error));if(!cancelled){setError(true);setStatus('The original source could not load. Open the full-size source below.');}}}
  void load();return()=>{cancelled=true;documentRef.current=null;void task?.destroy();};
 },[visible,url]);
 useEffect(()=>{
  if(!ready)return;let cancelled=false;
  async function render(){try{
   const doc=documentRef.current;if(!doc)return;setStatus('Loading the official question…');
   const page=await doc.getPage(pages[index]);if(cancelled)return;
   const base=page.getViewport({scale:1});const renderWidth=Math.max(280,(width||700)-2)*zoom;const ratio=Math.min(window.devicePixelRatio||1,2);const viewport=page.getViewport({scale:renderWidth/base.width*ratio});
   // Render offscreen first so a fast page change never reuses an active canvas.
   const buffer=document.createElement('canvas');buffer.width=Math.ceil(viewport.width);buffer.height=Math.ceil(viewport.height);const context=buffer.getContext('2d');if(!context)throw new Error('Canvas unavailable');
   await page.render({canvas:buffer,canvasContext:context,viewport}).promise;
   if(cancelled||!canvas.current)return;const target=canvas.current;target.width=buffer.width;target.height=buffer.height;target.style.width=`${renderWidth}px`;target.style.height=`${viewport.height/ratio}px`;target.getContext('2d')?.drawImage(buffer,0,0);setStatus('');
  }catch{if(!cancelled){setError(true);setStatus('The page could not render. Open the full-size source below.');}}}
  void render();return()=>{cancelled=true;};
 },[ready,index,zoom,pages,width]);
 return <div ref={root} className="official-question-viewer"><div className="question-viewer-toolbar"><span>Original question · PDF page {pages[index]}</span><div><button type="button" aria-label="Previous question page" disabled={index===0||!ready} onClick={()=>setIndex(i=>i-1)}>←</button><span>{index+1} / {pages.length}</span><button type="button" aria-label="Next question page" disabled={index===pages.length-1||!ready} onClick={()=>setIndex(i=>i+1)}>→</button><button type="button" onClick={()=>setZoom(z=>z===1?1.5:1)} disabled={!ready}>{zoom===1?'Zoom in':'Fit width'}</button></div></div>{status&&<p role="status" className="question-viewer-status">{status}</p>}<div className="question-page-scroll" hidden={error}><canvas ref={canvas} role="img" aria-label={`${title}, original PDF page ${pages[index]}. Full accessible document available from the source link.`}/></div><p className="viewer-caption">© College Board · Original source page, with its diagrams and layout preserved.</p></div>;
}
