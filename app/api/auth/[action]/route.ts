import {bindings,createSession,database,findUser,rateLimit,sessionUser,type User} from '@/lib/auth/store';
import {cookie,hashPassword,normalizeEmail,randomToken,readCookie,sameOrigin,tokenHash,validEmail,validPassword,verifyPassword} from '@/lib/auth/security';
const sessionCookie='gbg_session',stateCookie='gbg_google_state';
function json(data:unknown,status=200,headers:Record<string,string>={}){return Response.json(data,{status,headers:{'Cache-Control':'no-store',...headers}});}
function action(request:Request){return new URL(request.url).pathname.split('/').pop();}
async function oauthConfig(request:Request){const env=await bindings();return {client:env.GOOGLE_CLIENT_ID,secret:env.GOOGLE_CLIENT_SECRET,redirect:env.GOOGLE_REDIRECT_URI||`${new URL(request.url).origin}/api/auth/google-callback`};}
function redirect(request:Request,path:string,clearState=false){return new Response(null,{status:303,headers:{Location:new URL(path,request.url).toString(),'Cache-Control':'no-store',...(clearState?{'Set-Cookie':cookie(request,stateCookie,'',0)}:{})}});}
export async function GET(request:Request){try{
 const route=action(request);
 if(route==='session'){const user=await sessionUser(readCookie(request,sessionCookie));return json({user});}
 if(route==='config'){const config=await oauthConfig(request);return json({googleAvailable:Boolean(config.client&&config.secret)});}
 if(route==='google'){
  const config=await oauthConfig(request);if(!config.client||!config.secret)return redirect(request,'/sign-in?error=google-unavailable');
  if(!await rateLimit(`google:${(process.env.VERCEL?request.headers.get('x-forwarded-for')?.split(',')[0]?.trim():request.headers.get('cf-connecting-ip'))||'local'}`,30))return redirect(request,'/sign-in?error=try-later');
  const state=randomToken(),verifier=randomToken();const db=await database();await db.prepare('DELETE FROM auth_oauth WHERE expires_at < ?').bind(Date.now()).run();await db.prepare('INSERT INTO auth_oauth VALUES (?,?,?)').bind(await tokenHash(state),verifier,Date.now()+10*60000).run();
  const challengeBytes=new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(verifier)));const challenge=btoa(String.fromCharCode(...challengeBytes)).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');
  const url=new URL('https://accounts.google.com/o/oauth2/v2/auth');url.search=new URLSearchParams({client_id:config.client,redirect_uri:config.redirect,response_type:'code',scope:'openid email profile',state,code_challenge:challenge,code_challenge_method:'S256',prompt:'select_account'}).toString();
  return new Response(null,{status:302,headers:{Location:url.toString(),'Cache-Control':'no-store','Set-Cookie':cookie(request,stateCookie,state,600)}});
 }
 if(route==='google-callback'){
  const url=new URL(request.url),state=url.searchParams.get('state'),code=url.searchParams.get('code'),config=await oauthConfig(request);
  if(!state||!/^[a-f0-9]{64}$/.test(state)||state!==readCookie(request,stateCookie)||!code||!config.client||!config.secret)return redirect(request,'/sign-in?error=google-cancelled',true);
  const db=await database();const pending=await db.prepare('DELETE FROM auth_oauth WHERE token_hash=? RETURNING verifier,expires_at').bind(await tokenHash(state)).first<{verifier:string;expires_at:number}>();
  if(!pending||pending.expires_at<Date.now())return redirect(request,'/sign-in?error=google-cancelled',true);
  const tokenResponse=await fetch('https://oauth2.googleapis.com/token',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({code,client_id:config.client,client_secret:config.secret,redirect_uri:config.redirect,grant_type:'authorization_code',code_verifier:pending.verifier}),signal:AbortSignal.timeout(10000)});
  if(!tokenResponse.ok)return redirect(request,'/sign-in?error=google-failed',true);
  const token=await tokenResponse.json() as {access_token?:string};if(!token.access_token)return redirect(request,'/sign-in?error=google-failed',true);
  const profileResponse=await fetch('https://openidconnect.googleapis.com/v1/userinfo',{headers:{Authorization:`Bearer ${token.access_token}`},signal:AbortSignal.timeout(10000)});
  if(!profileResponse.ok)return redirect(request,'/sign-in?error=google-failed',true);
  const profile=await profileResponse.json() as {sub?:string;email?:string;email_verified?:boolean;name?:string};const email=normalizeEmail(profile.email);
  if(!profile.sub||!validEmail(email)||profile.email_verified!==true)return redirect(request,'/sign-in?error=google-failed',true);
  let user=await db.prepare('SELECT * FROM auth_users WHERE google_sub=?').bind(profile.sub).first<User>();
  if(!user){if(await findUser(email))return redirect(request,'/sign-in?error=use-password',true);const id=crypto.randomUUID();try{await db.prepare('INSERT INTO auth_users VALUES (?,?,?,?,?,?)').bind(id,email,(profile.name||email.split('@')[0]).slice(0,80),null,profile.sub,Date.now()).run();}catch{return redirect(request,'/sign-in?error=google-failed',true);}user={id,email,display_name:profile.name||email,password_hash:null,google_sub:profile.sub};}
  const response=redirect(request,'/account',true);response.headers.append('Set-Cookie',cookie(request,sessionCookie,await createSession(user.id),7*86400));return response;
 }
 return json({error:'Not found'},404);
}catch{return action(request)==='google-callback'?redirect(request,'/sign-in?error=google-failed',true):json({error:'Accounts are temporarily unavailable. Please try again.'},503);}}
export async function POST(request:Request){
 if(!sameOrigin(request))return json({error:'Request origin is not allowed.'},403);
 try{
  const route=action(request),db=await database();
  if(route==='sign-out'){const token=readCookie(request,sessionCookie);if(token)await db.prepare('DELETE FROM auth_sessions WHERE token_hash=?').bind(await tokenHash(token)).run();return json({ok:true},200,{'Set-Cookie':cookie(request,sessionCookie,'',0)});}
  if(route!=='sign-in'&&route!=='sign-up')return json({error:'Not found'},404);
  const text=await request.text();if(text.length>8000)return json({error:'Request is too large.'},413);
  let body:{email?:unknown;password?:unknown;name?:unknown};try{body=JSON.parse(text);}catch{return json({error:'Invalid request.'},400);}if(!body||typeof body!=='object')return json({error:'Invalid request.'},400);
  const email=normalizeEmail(body.email),password=body.password;
  if(!validEmail(email)||typeof password!=='string'||new TextEncoder().encode(password).length>72)return json({error:'Enter a valid email and password.'},400);
  const ip=(process.env.VERCEL?request.headers.get('x-forwarded-for')?.split(',')[0]?.trim():request.headers.get('cf-connecting-ip'))||'local';if(!await rateLimit(`ip:${ip}`,30)||!await rateLimit(`email:${email}`,10))return json({error:'Too many attempts. Please try again in 15 minutes.'},429);
  let user=await findUser(email);
  if(route==='sign-up'){
   if(!validPassword(password))return json({error:'Use at least 12 characters and no more than 72 bytes for your password.'},400);
   const name=typeof body.name==='string'?body.name.trim():'';if(name.length<1||name.length>80)return json({error:'Enter a name between 1 and 80 characters.'},400);
   if(user)return json({error:'An account already uses this email. Try signing in.'},409);
   const id=crypto.randomUUID(),digest=await hashPassword(password);
   try{await db.prepare('INSERT INTO auth_users VALUES (?,?,?,?,?,?)').bind(id,email,name,digest,null,Date.now()).run();}catch{return json({error:'An account already uses this email. Try signing in.'},409);}
   user={id,email,display_name:name,password_hash:digest,google_sub:null};
  }else{
   // Same password work for unknown accounts prevents a fast account-enumeration path.
   const dummy='$2b$12$R9h/cIPz0gi.URNNX3kh2OPST9/PgBkqquzi.Ss7KIUgO2t0jWMUW';
   const matches=await verifyPassword(password,user?.password_hash||dummy);
   if(!user?.password_hash||!matches)return json({error:'Email or password is incorrect.'},401);
  }
  const old=readCookie(request,sessionCookie);if(old)await db.prepare('DELETE FROM auth_sessions WHERE token_hash=?').bind(await tokenHash(old)).run();
  return json({ok:true},200,{'Set-Cookie':cookie(request,sessionCookie,await createSession(user.id),7*86400)});
 }catch(error){console.error('Authentication service failure:',error instanceof Error?error.message:'Unknown error');return json({error:'Accounts are temporarily unavailable. Please try again.'},503);}
}
