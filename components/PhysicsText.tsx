import { Children, type ReactNode } from 'react';

/** Typeset explicit ASCII subscripts/exponents without changing answer values. */
export function PhysicsText({text}:{text:string}) {
 const pattern=/([A-Za-zΑ-ω][A-Za-zΑ-ω0-9]*\u20d7?)_([A-Za-z0-9]+(?:,[A-Za-z0-9]+)?)|\^\(([^)]+)\)|\^([0-9]+)/g;
 const parts:ReactNode[]=[];let end=0;let match:RegExpExecArray|null;
 while((match=pattern.exec(text))!==null){
   parts.push(text.slice(end,match.index));
   if(match[1]) parts.push(<span key={match.index}>{match[1]}<sub>{match[2]}</sub></span>);
   else parts.push(<sup key={match.index}>{match[3]??match[4]}</sup>);
   end=match.index+match[0].length;
 }
 if(!parts.length)return <>{text}</>;
 parts.push(text.slice(end));
 return <span className="physics-notation" aria-label={text}>{parts}</span>;
}
export function PhysicsChildren({children}:{children:ReactNode}) {
 return <>{Children.map(children,child=>typeof child==='string'?<PhysicsText text={child}/>:child)}</>;
}
