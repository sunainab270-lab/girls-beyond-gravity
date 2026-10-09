"use client";
import { useId, useState } from 'react';
import type { Lesson } from '@/lib/unitOne';
export function UnitOneLab({kind,note}:{kind:Lesson['lab'];note:string}) {
 const id=useId().replace(/:/g,'');
 const [temperature,setTemperature]=useState(300);
 const [volume,setVolume]=useState(5);
 const [velocity,setVelocity]=useState(4);
 const [acceleration,setAcceleration]=useState(-1);
 const [time,setTime]=useState(2);
 const [charge,setCharge]=useState(2);
 const [distance,setDistance]=useState(0.5);
 const pressure=0.2*8.314*temperature/(volume/1000)/1000;
 const position=velocity*time+0.5*acceleration*time*time;
 const speed=velocity+acceleration*time;
 const field=8.99*charge/(distance*distance);
 const curve=Array.from({length:81},(_,i)=> {const t=i/20;return `${60+t*100},${155-(velocity*t+0.5*acceleration*t*t)*1.8}`;}).join(' ');
 return <section className="lesson-lab" aria-label="Interactive concept explorer">
 <h2>Explore the model</h2><p>{note}</p>
 {kind==='thermal' ? <>
 <label>Temperature: {temperature} K<input aria-label="Temperature" type="range" min="200" max="600" step="10" value={temperature} onChange={e=>setTemperature(+e.target.value)}/></label>
 <label>Volume: {volume.toFixed(1)} L<input aria-label="Volume" type="range" min="2" max="10" step="0.5" value={volume} onChange={e=>setVolume(+e.target.value)}/></label>
 <svg viewBox="0 0 520 250" role="img" aria-label="Pressure versus volume plot for a fixed amount of gas at the selected temperature">
 <path d="M60 25V205H470" fill="none" stroke="#646171" strokeWidth="1.5"/>
 <text x="65" y="18">P (kPa)</text><text x="440" y="242">V (L)</text>
 {[0,100,200,300,400,500].map(p=><g key={p}>{p!==0&&<line x1="60" x2="460" y1={205-p*.32} y2={205-p*.32} stroke="#ebe6ef"/>}<line x1="56" x2="60" y1={205-p*.32} y2={205-p*.32} stroke="#646171"/><text x="49" y={210-p*.32} textAnchor="end">{p}</text></g>)}
 {[2,4,6,8,10].map(v=><g key={v}><line x1={60+v*38} x2={60+v*38} y1="205" y2="210" stroke="#646171"/><text x={60+v*38} y="225" textAnchor="middle">{v}</text></g>)}
 <polyline points={Array.from({length:81},(_,i)=>{const v=2+i*.1;const p=.2*8.314*temperature/v;return `${60+v*38},${205-p*.32}`;}).join(' ')} stroke="#625780" strokeWidth="2.5" fill="none"/>
 <circle cx={60+volume*38} cy={205-pressure*.32} r="5" fill="#96674b"/>
 </svg><p role="status">For 0.20 mol: P = <strong>{pressure.toFixed(1)} kPa</strong> • U = <strong>{(1.5*.2*8.314*temperature).toFixed(0)} J</strong> (monatomic gas)</p>
 <p>Try doubling volume at fixed temperature, then doubling temperature at fixed volume. Predict the pressure before checking.</p>
 </> : kind==='motion' ? <>
 <label>Initial velocity: {velocity} m/s<input aria-label="Initial velocity" type="range" min="-8" max="8" value={velocity} onChange={e=>setVelocity(+e.target.value)}/></label>
 <label>Constant acceleration: {acceleration} m/s²<input aria-label="Constant acceleration" type="range" min="-4" max="4" step="0.5" value={acceleration} onChange={e=>setAcceleration(+e.target.value)}/></label>
 <label>Time: {time.toFixed(1)} s<input aria-label="Time" type="range" min="0" max="4" step="0.1" value={time} onChange={e=>setTime(+e.target.value)}/></label>
 <svg viewBox="0 0 520 310" role="img" aria-label="Position versus time graph, with positive and negative position and a selected time marker">
 <path d="M60 20V285H470M60 155H470" fill="none" stroke="#646171" strokeWidth="1.5"/>
 <text x="68" y="17">x (m)</text><text x="475" y="289">t (s)</text>
 {[-60,-30,0,30,60].map(x=><g key={x}>{x!==0&&<line x1="60" x2="460" y1={155-x*1.8} y2={155-x*1.8} stroke="#ebe6ef"/>}<line x1="56" x2="60" y1={155-x*1.8} y2={155-x*1.8} stroke="#646171"/><text x="49" y={160-x*1.8} textAnchor="end">{x}</text></g>)}
 {[0,1,2,3,4].map(t=><g key={t}><line x1={60+t*100} x2={60+t*100} y1="285" y2="291" stroke="#646171"/><text x={60+t*100} y="305" textAnchor="middle">{t}</text></g>)}
 <polyline points={curve} fill="none" stroke="#625780" strokeWidth="2.5"/>
 <circle cx={60+time*100} cy={155-position*1.8} r="5" fill="#96674b"/>
 </svg><p role="status">x(0) = 0 m • x({time.toFixed(1)} s) = <strong>{position.toFixed(2)} m</strong> • v({time.toFixed(1)} s) = <strong>{speed.toFixed(2)} m/s</strong></p>
 <p>The plot shows 0–4 s on a fixed scale, so curves can be compared directly. Try a positive initial velocity and negative acceleration. Find when the tangent becomes horizontal and explain the turn.</p>
 </> : <>
 <label>Positive source charge: {charge.toFixed(1)} nC<input aria-label="Source charge" type="range" min="1" max="5" step="0.5" value={charge} onChange={e=>setCharge(+e.target.value)}/></label>
 <label>Observation distance: {distance.toFixed(1)} m<input aria-label="Observation distance" type="range" min="0.2" max="1" step="0.1" value={distance} onChange={e=>setDistance(+e.target.value)}/></label>
 <svg viewBox="0 0 520 250" role="img" aria-label="Radial field of a positive point source; a dashed circular Gaussian surface through the observation point">
 <defs><marker id={id} markerUnits="userSpaceOnUse" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><path d="M0 0L7 3L0 6Z" fill="#625780"/></marker></defs>
 <circle cx="255" cy="125" r={distance*95} stroke="#658b7e" fill="none" strokeDasharray="5 5"/>
 {Array.from({length:12},(_,i)=>{const a=i*Math.PI/6;return <line key={i} x1={255+25*Math.cos(a)} y1={125+25*Math.sin(a)} x2={255+100*Math.cos(a)} y2={125+100*Math.sin(a)} stroke="#625780" strokeWidth="1.5" markerEnd={`url(#${id})`}/>;})}
 <circle cx="255" cy="125" r="16" fill="#ece6f3"/><text x="248" y="130">+</text>
 <circle cx={255+distance*95} cy="125" r="4" fill="#96674b"/><path d={`M${255+distance*95} 125L370 145`} fill="none" stroke="#96674b" strokeDasharray="3 3"/><text x="370" y="163" fontSize="14">observation point</text>
 <text x="260" y="233" textAnchor="middle" fontSize="14">Dashed circle: cross-section of a Gaussian sphere</text>
 </svg><p role="status">E = <strong>{field.toFixed(1)} N/C</strong> outward • spherical flux = <strong>{(charge*1e-9/8.85e-12).toFixed(1)} N·m²/C</strong></p>
 <p>Distance is measured from the source centre; the source icon is not drawn to scale. Double distance: field becomes one quarter as strong while total flux stays constant. Arrow lengths here indicate direction, not a quantitative strength scale.</p>
 </>}
 </section>;
}
