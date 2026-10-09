import type {NextConfig} from 'next';
const nextConfig:NextConfig={
 webpack(config,{dev}){if(dev&&process.env.CODEX_SANDBOX==='seatbelt'){config.watchOptions={...config.watchOptions,poll:1000,ignored:/node_modules|work|\.wrangler/};}return config;},
 serverExternalPackages:['@libsql/client'],
 async redirects(){return [{source:'/:path*',has:[{type:'host',value:'www.girlsbeyondgravity.org'}],destination:'https://girlsbeyondgravity.org/:path*',permanent:true}];},
};
export default nextConfig;
