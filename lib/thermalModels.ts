export const gasPressureKPa=(temperature:number,volumeLitres:number,moles=0.2)=>moles*8.314*temperature/volumeLitres;
export function speedDensity(speed:number,temperature:number,mass=6.64e-27) {
 const k=1.380649e-23;
 return 4*Math.PI*Math.pow(mass/(2*Math.PI*k*temperature),1.5)*speed*speed*Math.exp(-mass*speed*speed/(2*k*temperature));
}
export function heatingState(energyKJ:number) {
 const iceWarm=4.2; const melt=33.4;
 if(energyKJ<iceWarm)return {temperature:-20+energyKJ/0.21,phase:'ice warming',meltedFraction:0};
 if(energyKJ<=iceWarm+melt)return {temperature:0,phase:'ice–water mixture melting',meltedFraction:(energyKJ-iceWarm)/melt};
 return {temperature:(energyKJ-iceWarm-melt)/0.418,phase:'liquid water warming',meltedFraction:1};
}
export function equilibriumTemperatures(time:number) {
 const final=40;const decay=Math.exp(-time/10);
 return {hot:final+40*decay,cold:final-20*decay};
}
