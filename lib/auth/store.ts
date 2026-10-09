import {authSchema as schema} from './schema';
import {getClient} from '@/db/connection';
import type {InValue} from '@libsql/client';
import {randomToken,tokenHash} from './security';
export type User={id:string;email:string;display_name:string;password_hash:string|null;google_sub:string|null};
type Statement={bind:(...values:unknown[])=>Statement;run:()=>Promise<unknown>;first:<T>()=>Promise<T|null>};
type Database={exec:(sql:string)=>Promise<unknown>;prepare:(sql:string)=>Statement};
const adapter:Database={
 exec:async(sql)=>getClient().executeMultiple(sql),
 prepare:(sql)=>{let args:InValue[]=[];const statement:Statement={bind:(...values)=>{args=values as InValue[];return statement;},run:()=>getClient().execute({sql,args}),first:async<T>()=>{const result=await getClient().execute({sql,args});return (result.rows[0] as unknown as T)??null;}};return statement;},
};
export async function bindings(){return {DB:adapter,GOOGLE_CLIENT_ID:process.env.GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET:process.env.GOOGLE_CLIENT_SECRET,GOOGLE_REDIRECT_URI:process.env.GOOGLE_REDIRECT_URI};}
let initialized:Promise<unknown>|undefined;
export async function database(){const db=(await bindings()).DB;if(!db)throw new Error('Account database unavailable');initialized??=db.exec(schema.split(';').map(statement=>statement.replace(/\s+/g,' ').trim()).filter(Boolean).join(';\n')+';').catch(e=>{initialized=undefined;throw e;});await initialized;return db;}
export async function findUser(email:string){return (await database()).prepare('SELECT * FROM auth_users WHERE email = ?').bind(email).first<User>();}
export async function createSession(id:string){const db=await database(),token=randomToken();await db.prepare('DELETE FROM auth_sessions WHERE expires_at < ?').bind(Date.now()).run();await db.prepare('INSERT INTO auth_sessions VALUES (?, ?, ?)').bind(await tokenHash(token),id,Date.now()+7*86400000).run();return token;}
export async function sessionUser(token:string){if(!/^[a-f0-9]{64}$/.test(token))return null;return (await database()).prepare('SELECT u.id,u.email,u.display_name FROM auth_users u JOIN auth_sessions s ON s.user_id=u.id WHERE s.token_hash=? AND s.expires_at>?').bind(await tokenHash(token),Date.now()).first<Pick<User,'id'|'email'|'display_name'>>();}
export async function rateLimit(key:string,max=10){const db=await database();await db.prepare('DELETE FROM auth_limits WHERE expires_at < ?').bind(Date.now()).run();const row=await db.prepare('INSERT INTO auth_limits VALUES (?,1,?) ON CONFLICT(key) DO UPDATE SET attempts=attempts+1 RETURNING attempts').bind(await tokenHash(key),Date.now()+15*60000).first<{attempts:number}>();return (row?.attempts??max+1)<=max;}
