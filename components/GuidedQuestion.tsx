'use client';
import {useState} from 'react';
import type {GuidedLessonData} from '@/lib/guidedLessons';
import {PhysicsText} from './PhysicsText';
export function GuidedQuestion({id,question}:{id:string;question:GuidedLessonData['questions'][number]}) {
 const [selected,setSelected]=useState<number|null>(null);const [checked,setChecked]=useState(false);
 return <article className="interactive-card"><p id={`${id}-prompt`}><PhysicsText text={question.prompt}/></p><div className="choice-grid" role="radiogroup" aria-labelledby={`${id}-prompt`}>{question.choices.map((choice,i)=><label key={choice}><input type="radio" name={id} checked={selected===i} onChange={()=>{setSelected(i);setChecked(false);}}/><span><strong className="choice-letter">{String.fromCharCode(65+i)}.</strong> <PhysicsText text={choice}/></span></label>)}</div><button className="button secondary" disabled={selected===null} onClick={()=>setChecked(true)}>Check Answer</button>{checked&&<div role="status" className={`feedback ${selected===question.correct?'correct':'incorrect'}`}><strong>{selected===question.correct?'Correct.':'Review your reasoning.'}</strong><p>Answer {String.fromCharCode(65+question.correct)}: <PhysicsText text={question.choices[question.correct]}/></p><p><PhysicsText text={question.explanation}/></p></div>}</article>;
}
