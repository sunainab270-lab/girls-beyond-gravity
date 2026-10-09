import {createClient,type Client} from '@libsql/client';
let client:Client|undefined;
export function getClient(){
 if(client)return client;
 const url=process.env.TURSO_DATABASE_URL||process.env.DATABASE_URL||'file:./accounts.db';
 if(process.env.VERCEL&&(!url.startsWith('libsql://')&&!url.startsWith('https://')))throw new Error('Vercel requires a persistent remote database. Set TURSO_DATABASE_URL and TURSO_AUTH_TOKEN.');
 client=createClient({url,authToken:process.env.TURSO_AUTH_TOKEN});return client;
}
