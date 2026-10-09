"use client";
import { useState } from 'react';
import { PhysicsText } from './PhysicsText';
import type { UnitOne } from '@/lib/unitOne';
export function UnitOneTest({unit}:{unit:UnitOne}) {
 const [answers,setAnswers]=useState<Record<number,number>>({});
 const [written,setWritten]=useState<Record<number,string>>({});
 const [submitted,setSubmitted]=useState(false);
 const score=unit.questions.filter((q,i)=>answers[i]===q.correct).length;
 const answered=unit.questions.filter((_,i)=>answers[i]!==undefined).length;
 return <article className="test-panel">
 <h2>Unit 1 practice assessment</h2>
 <p>{unit.questions.length} multiple-choice questions and {unit.freeResponse.length} written responses • suggested time: {unit.questions.length>12 ? "75–100" : "45–60"} minutes. This original practice test is not an official AP exam. Your work stays in this page while it is open.</p>
 <p>Multiple-choice answers receive automatic feedback. Written responses have a self-review rubric and are not automatically graded.</p>
 <form onSubmit={e=>{e.preventDefault();setSubmitted(true);}}>
 {unit.questions.map((q,i)=><fieldset className="assessment-question" key={q.prompt}><legend>Question {i+1}</legend><p><PhysicsText text={q.prompt}/></p>{q.choices.map((choice,j)=><label key={choice}><input type="radio" name={`question-${i}`} checked={answers[i]===j} disabled={submitted} onChange={()=>setAnswers(a=>({...a,[i]:j}))}/><span><strong>{String.fromCharCode(65+j)}.</strong> <PhysicsText text={choice}/></span></label>)}{submitted&&<p className="notice"><strong>{answers[i]===q.correct?'Correct.':'Review this question.'}</strong> Answer {String.fromCharCode(65+q.correct)}: <PhysicsText text={q.choices[q.correct]}/>. <PhysicsText text={q.explanation}/></p>}</fieldset>)}
 <h2>Written responses</h2>{unit.freeResponse.map((frq,i)=><section className="assessment-question" key={frq.prompt}><label htmlFor={`written-${i}`}><strong>Written response {i+1}</strong></label><p><PhysicsText text={frq.prompt}/></p><textarea id={`written-${i}`} value={written[i]??''} disabled={submitted} onChange={e=>setWritten(a=>({...a,[i]:e.target.value}))}/>{submitted&&<><h3>Compare your reasoning</h3><ul>{frq.rubric.map(point=><li key={point}><PhysicsText text={point}/></li>)}</ul><p>Check each point against your response. Response length alone does not demonstrate understanding.</p></>}</section>)}
 {!submitted&&<><p>{answered} of {unit.questions.length} multiple-choice questions answered.</p><button className="button primary" type="submit" disabled={answered!==unit.questions.length}>Submit and review</button></>}
 </form>
 {submitted&&<section role="status" className="result"><h2>Multiple-choice score: {score} / {unit.questions.length}</h2><p>{score/unit.questions.length>=0.8?'Strong foundation. Review any missed questions and justify your written responses.':'Revisit the lessons connected to missed questions, then try again.'}</p><p>Written responses are self-reviewed separately.</p><button className="button secondary" onClick={()=>{setAnswers({});setWritten({});setSubmitted(false);}}>Try again</button></section>}
 </article>;
}
