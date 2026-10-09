import type { ReactNode } from 'react';
import { guidedLessons } from '@/lib/guidedLessons';
import { PhysicsText } from './PhysicsText';
import { GuidedQuestion } from './GuidedQuestion';
import { ReleasedPractice } from './ReleasedPractice';
const Text=({text}:{text:string})=><p><PhysicsText text={text}/></p>;
export function GuidedTeaching({topic,visual}:{topic:string;visual?:ReactNode}) {
 const data=guidedLessons[topic]; if(!data)return null;
 return <div className="guided-teaching">
 <section className="lesson-section"><h2>Start with what you know</h2><Text text={data.prerequisites}/><h3>The physical situation</h3><Text text={data.opening}/></section>
 <nav className="lesson-roadmap" aria-label="Lesson progression"><strong>Your path through this lesson</strong><ol><li>Build the physical picture</li><li>Understand the equations</li><li>Read and test representations</li><li>Work through examples</li><li>Explain, practise, and challenge yourself</li></ol></nav>
 {data.sections.map((s,i)=><section className="lesson-section" key={s.title}><h2>{i+1}. {s.title}</h2>{s.paragraphs.map(p=><Text key={p} text={p}/>)}</section>)}
 <section className="lesson-section"><h2>Understand the equations</h2><p>Read the symbols, reasoning, and limits together. A formula is a model of a physical relationship.</p>{data.models.map(m=><article className="equation-guide" key={m.equation}><h3 className="lesson-equation"><PhysicsText text={m.equation}/></h3><dl><dt>Symbols and units</dt><dd><PhysicsText text={m.symbols}/></dd><dt>Physical meaning</dt><dd><PhysicsText text={m.meaning}/></dd><dt>Why it works</dt><dd><PhysicsText text={m.reasoning}/></dd><dt>When it applies</dt><dd><PhysicsText text={m.conditions}/></dd><dt>Check the model</dt><dd><PhysicsText text={m.check}/></dd></dl></article>)}</section>
 <section className="lesson-section"><h2>Translate between representations</h2><Text text={data.graph}/>{visual}</section>
 </div>;
}
export function GuidedPractice({topic}:{topic:string}) {
 const data=guidedLessons[topic]; if(!data)return null;
 return <>
 <section className="lesson-section"><h2>Worked examples</h2><p>Follow the reasoning, then cover the solution and reproduce it yourself.</p>{data.examples.map((e,i)=><article className="practice" key={e.prompt}><h3>Example {i+1}</h3><Text text={e.prompt}/><ol>{e.steps.map(s=><li key={s}><PhysicsText text={s}/></li>)}</ol></article>)}</section>
 <section className="lesson-section"><h2>Check your understanding</h2><p>These are original AP-style MCQs. Choose an answer before checking; feedback explains the physical relationship.</p>{data.questions.map((q,i)=><GuidedQuestion key={`${topic}-${i}`} id={`guided-${topic}-${i}`} question={q}/>)}</section>
 <section className="lesson-section"><h2>Reasoning, error analysis, and challenge</h2><p>Write a response before revealing the model explanation. A numerical answer should include units; a justification should connect a claim to a physical principle.</p>{data.reasoning.map((q,i)=><article className="lesson-check" key={q.prompt}><h3>Reasoning task {i+1}</h3><Text text={q.prompt}/><details><summary>Check the solution</summary><Text text={q.answer}/></details></article>)}</section>
 <ReleasedPractice topic={topic}/>
 <section className="lesson-section"><h2>Before You Continue</h2><p>Explain these without looking back. If you cannot, revisit the related explanation or worked example before advancing.</p><ul>{data.checklist.map(c=><li key={c}>{c}</li>)}</ul></section>
 </>;
}
