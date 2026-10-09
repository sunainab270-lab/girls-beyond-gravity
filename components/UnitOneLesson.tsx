import { GuidedTeaching, GuidedPractice } from "./GuidedLesson";
import { ThermalTopicExplorer } from "./ThermalTopicExplorer";
import { PhysicsText } from './PhysicsText';
import type { Lesson } from '@/lib/unitOne';
import { UnitOneDiagram } from './UnitOneDiagram';
import { UnitOneLab } from './UnitOneLab';
export function UnitOneLesson({lesson,source}:{lesson:Lesson;source:string}) {
 const thermal=lesson.apTopic.startsWith("9.");
 return <>
 <p className="notice">AP Topic {lesson.apTopic} • <a href={source} target="_blank" rel="noreferrer">College Board course framework</a>. Lesson explanations and site quizzes are original. Official practice sources are labelled separately.</p>
 <h2>Learning objectives</h2><ul>{lesson.objectives.map(o=><li key={o}>{o}</li>)}</ul>
 <h2>Key vocabulary</h2><dl className="lesson-terms">{lesson.terms.map(([term,definition])=><div key={term}><dt><PhysicsText text={term}/></dt><dd><PhysicsText text={definition}/></dd></div>)}</dl>
 {thermal ? <><GuidedTeaching topic={lesson.apTopic} visual={<ThermalTopicExplorer topic={lesson.apTopic}/>}/><GuidedPractice topic={lesson.apTopic}/></> : <> {lesson.sections.map(section=><section key={section.title}><h2>{section.title}</h2><p><PhysicsText text={section.text}/></p></section>)}
 <UnitOneDiagram topic={lesson.apTopic}/>
 <h2>Equations and conditions</h2>{lesson.equations.map(eq=><p className="lesson-equation" key={eq}><PhysicsText text={eq}/></p>)}
 <UnitOneLab kind={lesson.lab} note={lesson.labNote}/>
 <h2>Worked examples</h2>{lesson.worked.map((example,index)=><section className="practice" key={example.prompt}><h3>Example {index+1}</h3><p><strong><PhysicsText text={example.prompt}/></strong></p><ol>{example.steps.map(step=><li key={step}><PhysicsText text={step}/></li>)}</ol></section>)}
</>}
 <h2>Common mistake</h2><p className="notice"><PhysicsText text={lesson.mistake}/></p>
 <h2>{thermal ? "Additional practice" : "Check your understanding"}</h2><p>Try each problem before opening the hint or solution. State your assumptions and include units.</p>
 {lesson.checks.map((check,index)=><section className="lesson-check" key={check.prompt}><h3>Practice {index+1}</h3><p><PhysicsText text={check.prompt}/></p><details><summary>Show a hint</summary><p><PhysicsText text={check.hint}/></p></details><details><summary>Check the solution</summary><p><PhysicsText text={check.answer}/></p></details></section>)}
 <h2>Before you move on</h2><p>{lesson.summary} Explain the result in words, relate it to a diagram or graph, and check whether the limiting case makes physical sense.</p>
 </>;
}
