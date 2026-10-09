import {spawn} from 'node:child_process';
const port=3100,base=`http://127.0.0.1:${port}`;
const server=spawn(process.execPath,['node_modules/next/dist/bin/next','start','-p',String(port)],{stdio:['ignore','ignore','inherit'],env:{...process.env,GOOGLE_CLIENT_ID:'',GOOGLE_CLIENT_SECRET:''}});
try {
 let ready=false;
 for(let i=0;i<100;i++){if(server.exitCode!==null)throw new Error('Production server exited');try{const response=await fetch(base);if(response.ok){ready=true;break;}}catch{}await new Promise(resolve=>setTimeout(resolve,200));}
 if(!ready)throw new Error('Production server did not become ready');
 const runner=spawn(process.execPath,['--test','tests/rendered-html.test.mjs'],{stdio:'inherit',env:{...process.env,TEST_BASE_URL:base}});
 process.exitCode=await new Promise(resolve=>runner.on('exit',code=>resolve(code??1)));
}finally{server.kill('SIGTERM');}
