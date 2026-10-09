declare const module: {
 GlobalWorkerOptions:{workerSrc:string};
 getDocument:(options:unknown)=>{promise:Promise<{getPage:(page:number)=>Promise<{getViewport:(options:{scale:number})=>{width:number;height:number};render:(options:unknown)=>{promise:Promise<void>}}> ;destroy:()=>Promise<void>}>;destroy:()=>Promise<void>};
};
export const GlobalWorkerOptions: typeof module.GlobalWorkerOptions;
export const getDocument: typeof module.getDocument;
