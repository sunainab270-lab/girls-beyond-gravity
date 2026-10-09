import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
const source=fs.readFileSync(new URL('../lib/thermalModels.ts',import.meta.url),'utf8');
const js=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.ES2022}}).outputText;
const {gasPressureKPa,speedDensity,heatingState,equilibriumTemperatures}=await import(`data:text/javascript;base64,${Buffer.from(js).toString('base64')}`);
const near=(actual,expected,tolerance=1e-8)=>assert.ok(Math.abs(actual-expected)<tolerance,`${actual} vs ${expected}`);
test('gas graph obeys inverse-volume and kelvin-temperature scaling with correct units',()=>{
 near(gasPressureKPa(300,5),99.768);near(gasPressureKPa(600,10),99.768);
 near(gasPressureKPa(300,10),gasPressureKPa(300,5)/2);
});
test('speed distributions preserve probability and expected mean squared speed',()=>{
 for(const T of [200,300,600]){
  const dv=2;let area=0,secondMoment=0;
  for(let v=0;v<=12000;v+=dv){const p=speedDensity(v,T);area+=p*dv;secondMoment+=v*v*p*dv;assert.ok(p>=0);}
  near(area,1,1e-8);near(secondMoment/(3*1.380649e-23*T/6.64e-27),1,1e-8);
 }
});
test('heating curve has the correct latent-heat plateau and continuous stage boundaries',()=>{
 near(heatingState(0).temperature,-20);near(heatingState(4.2).temperature,0);
 near(heatingState(20).temperature,0);near(heatingState(37.6).temperature,0);
 near(heatingState(41.78).temperature,10);near(heatingState(58.5).temperature,50);
 near(heatingState(20).meltedFraction,(20-4.2)/33.4);
});
test('thermal equilibration conserves energy at every plotted time',()=>{
 for(let t=0;t<=60;t++){const s=equilibriumTemperatures(t);near(200*(s.hot-80)+400*(s.cold-20),0);assert.ok(s.hot>=40&&s.cold<=40);}
});
