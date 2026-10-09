import {Buffer} from "node:buffer";
// Fixed public-source allowlist: this endpoint cannot fetch arbitrary URLs.
const papers:Record<string,string>={
 'physics-1-ced':'ap-physics-1-course-and-exam-description.pdf',
 'physics-2-ced':'ap-physics-2-course-and-exam-description.pdf',
 'physics-1-2024':'ap24-frq-physics-1.pdf',
 'physics-2-2025':'ap25-frq-physics-2.pdf',
 'physics-2-2026':'ap26-frq-physics-2.pdf',
};
export async function GET(request:Request){
 const name=papers[new URL(request.url).searchParams.get('paper')??''];
 if(!name)return new Response('Unknown official paper',{status:404});
 try {
  const upstream=await fetch(`https://apcentral.collegeboard.org/media/pdf/${name}`,{signal:AbortSignal.timeout(20000),headers:{'User-Agent':'Mozilla/5.0','Accept':'application/pdf'}});
  if(!upstream.ok)return new Response(`Official source returned ${upstream.status}`,{status:502});
  const data=Buffer.from(await upstream.arrayBuffer()).toString('base64');
  return Response.json({data},{headers:{'Cache-Control':'public, max-age=86400','X-Content-Type-Options':'nosniff'}});
 }catch(error){console.error('Official paper source:',String(error),(error as {cause?:unknown}).cause);return new Response('Official source temporarily unavailable',{status:502});}
}
