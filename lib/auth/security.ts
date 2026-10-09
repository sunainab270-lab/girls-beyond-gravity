import {compare,hash} from 'bcryptjs';
export function randomToken(){return Array.from(crypto.getRandomValues(new Uint8Array(32)),b=>b.toString(16).padStart(2,'0')).join('');}
export async function tokenHash(token:string){return Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(token))),b=>b.toString(16).padStart(2,'0')).join('');}
export function normalizeEmail(value:unknown){return typeof value==='string'?value.trim().toLowerCase():'';}
export function validEmail(email:string){return email.length<=254&&/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);}
export function validPassword(password:unknown):password is string{return typeof password==='string'&&password.length>=12&&new TextEncoder().encode(password).length<=72;}
export const hashPassword=(password:string)=>hash(password,12);
export const verifyPassword=(password:string,digest:string)=>compare(password,digest);
export function readCookie(request:Request,name:string){return request.headers.get('cookie')?.split(';').map(c=>c.trim()).find(c=>c.startsWith(name+'='))?.slice(name.length+1)??'';}
export function cookie(request:Request,name:string,value:string,maxAge:number){return `${name}=${value}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}${new URL(request.url).protocol==='https:'?'; Secure':''}`;}
export function sameOrigin(request:Request){return request.headers.get('origin')===new URL(request.url).origin;}
