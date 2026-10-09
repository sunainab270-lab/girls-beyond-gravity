import { ThermodynamicsReviewPath } from "./ThermodynamicsReviewPath";
import { ReleasedPractice } from "./ReleasedPractice";
import { PhysicsText } from './PhysicsText';
import type { UnitOne } from '@/lib/unitOne';
export function UnitOneReview({unit,courseSlug}:{unit:UnitOne;courseSlug:string}) {
 return <>
 <p className="notice">Course Unit 1 • AP Unit {unit.apNumber}. This is original review material aligned to the <a href={unit.source} target="_blank" rel="noreferrer">College Board framework</a>.</p>
 {courseSlug==="physics-2"&&<ThermodynamicsReviewPath/>}
 <h2>Connect the ideas</h2><p>For every problem, identify the system or reference frame, choose a representation, write the relevant principle, and state the assumptions that make it valid. Use units and limiting cases to check your answer.</p>
 {unit.lessons.map(lesson=><section className="lesson-check" key={lesson.slug}><h3>Topic {lesson.apTopic}: {lesson.title}</h3><p>{lesson.summary}</p>{lesson.equations.map(eq=><p key={eq} className="lesson-equation"><PhysicsText text={eq}/></p>)}<p><strong>Watch for:</strong> <PhysicsText text={lesson.mistake}/></p><a href={`/ap-physics/${courseSlug}/${unit.slug}/${lesson.slug}`}>Revisit this lesson</a></section>)}
 <h2>Mixed practice</h2><p>Write your reasoning before revealing each solution. These problems cover every topic in the unit.</p>
 {unit.practice.map((problem,index)=><section className="lesson-check" key={problem.prompt}><h3>Problem {index+1}</h3><p><PhysicsText text={problem.prompt}/></p><details><summary>Hint</summary><p><PhysicsText text={problem.hint}/></p></details><details><summary>Solution and reasoning</summary><p><PhysicsText text={problem.answer}/></p></details></section>)}
 {courseSlug==="physics-2"&&<ReleasedPractice course="physics-2"/>}
 <h2>Ready for the unit test?</h2><p>You should be able to explain each definition, select equations with their conditions, create labelled representations, and justify both numerical and qualitative predictions.</p>
 <a className="button primary" href={`/ap-physics/${courseSlug}/${unit.slug}/test`}>Start Unit 1 practice test</a>
 </>;
}
