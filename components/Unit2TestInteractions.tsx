"use client";

import Link from "next/link";
import { PhysicsText } from "./PhysicsText";
import { useMemo, useState } from "react";

type McqQuestion = {
  answer: string;
  choices: string[];
  explanation: string;
  id: string;
  lessonHref: string;
  prompt: string;
  skill: string;
  stimulus?: string;
};

type FrqQuestion = {
  id: string;
  lessonHref: string;
  prompt: string;
  rubric: string[];
  skill: string;
  title: string;
};

const base = "/ap-physics/physics-1/force-translational-dynamics";

const mcqs: McqQuestion[] = [
  { id: "u2-mcq1", skill: "Systems", lessonHref: `${base}/systems-and-center-of-mass`, prompt: "Two carts connected by a rope are chosen as one system. The tension between the carts is:", choices: ["external", "internal", "weight", "normal"], answer: "internal", explanation: "The tension acts between objects inside the chosen boundary." },
  { id: "u2-mcq2", skill: "Center of Mass", lessonHref: `${base}/systems-and-center-of-mass`, prompt: "A 1 kg mass is at x = 0 m and a 3 kg mass is at x = 8 m. The center of mass is:", choices: ["2 m", "4 m", "6 m", "8 m"], answer: "6 m", explanation: "x_cm = (1·0 + 3·8)/4 = 6 m." },
  { id: "u2-mcq3", skill: "Force Identification", lessonHref: `${base}/forces-and-free-body-diagrams`, prompt: "Which label should not appear on a free-body diagram?", choices: ["Earth on box", "table on book", "force of motion", "rope on cart"], answer: "force of motion", explanation: "Motion is not an object exerting an interaction force." },
  { id: "u2-mcq4", skill: "Normal Force", lessonHref: `${base}/forces-and-free-body-diagrams`, prompt: "A normal force is directed:", choices: ["always upward", "perpendicular to the contact surface", "always equal to weight", "parallel to motion"], answer: "perpendicular to the contact surface", explanation: "Normal force is the perpendicular contact force from a surface." },
  { id: "u2-mcq5", skill: "Newton's Third Law", lessonHref: `${base}/newton-s-third-law`, prompt: "A large truck and a small car collide. The force exerted by the truck on the car is:", choices: ["larger than the car on truck force", "smaller than the car on truck force", "equal in magnitude to the car on truck force", "zero because the truck is larger"], answer: "equal in magnitude to the car on truck force", explanation: "Third-law pair forces have equal magnitude and opposite direction." },
  { id: "u2-mcq6", skill: "Third-Law Pairs", lessonHref: `${base}/newton-s-third-law`, prompt: "A third-law partner to Earth pulling down on a ball is:", choices: ["air pushing up on the ball", "the ball pulling up on Earth", "the ball's velocity", "normal force on the ball"], answer: "the ball pulling up on Earth", explanation: "The partner force acts on the other object in the interaction." },
  { id: "u2-mcq7", skill: "Newton's First Law", lessonHref: `${base}/newton-s-first-law`, prompt: "An object moves with constant velocity. Its net force is:", choices: ["zero", "in the direction of velocity", "opposite velocity", "equal to mv"], answer: "zero", explanation: "Constant velocity means zero acceleration, so ΣF = 0." },
  { id: "u2-mcq8", skill: "Equilibrium", lessonHref: `${base}/newton-s-first-law`, prompt: "Equilibrium can describe:", choices: ["rest only", "constant velocity only", "rest or constant velocity", "acceleration only"], answer: "rest or constant velocity", explanation: "Equilibrium means zero acceleration." },
  { id: "u2-mcq9", skill: "Newton's Second Law", lessonHref: `${base}/newton-s-second-law`, prompt: "A 4 kg box has net force 20 N east. Its acceleration is:", choices: ["4 m/s² east", "5 m/s² east", "16 m/s² east", "80 m/s² east"], answer: "5 m/s² east", explanation: "a = ΣF/m = 20/4 = 5 m/s² east." },
  { id: "u2-mcq10", skill: "Net Force", lessonHref: `${base}/newton-s-second-law`, prompt: "A 10 N pull right and 4 N friction left act on a 3 kg box. The acceleration is:", choices: ["2 m/s² right", "3.3 m/s² right", "4.7 m/s² right", "14 m/s² right"], answer: "2 m/s² right", explanation: "ΣF = 6 N right, so a = 6/3 = 2 m/s² right." },
  { id: "u2-mcq11", skill: "Force Graphs", lessonHref: `${base}/newton-s-second-law`, stimulus: "A net force (vertical axis) versus acceleration (horizontal axis) graph for a constant-mass object is a straight line through the origin.", prompt: "The slope of the graph represents:", choices: ["mass", "velocity", "position", "friction coefficient"], answer: "mass", explanation: "F = ma matches y = mx, so slope is mass." },
  { id: "u2-mcq12", skill: "Gravity", lessonHref: `${base}/gravitational-force`, prompt: "If center-to-center separation doubles, gravitational force becomes:", choices: ["twice as large", "half as large", "one-fourth as large", "four times as large"], answer: "one-fourth as large", explanation: "Universal gravitation follows an inverse-square relationship." },
  { id: "u2-mcq13", skill: "Weight", lessonHref: `${base}/gravitational-force`, prompt: "Near Earth, a 2 kg object's weight is closest to:", choices: ["2 N", "4.9 N", "19.6 N", "98 N"], answer: "19.6 N", explanation: "F_g = mg = 2(9.8) = 19.6 N." },
  { id: "u2-mcq14", skill: "Apparent Weight", lessonHref: `${base}/gravitational-force`, prompt: "A scale reads apparent weight because it measures:", choices: ["mass", "normal force", "speed", "gravitational constant"], answer: "normal force", explanation: "A scale reading is the normal force magnitude." },
  { id: "u2-mcq15", skill: "Static Friction", lessonHref: `${base}/kinetic-and-static-friction`, prompt: "A box remains at rest under a 12 N push. If maximum static friction is 30 N, actual static friction is:", choices: ["0 N", "12 N", "30 N", "42 N"], answer: "12 N", explanation: "Static friction adjusts to balance the applied push while the box stays at rest." },
  { id: "u2-mcq16", skill: "Kinetic Friction", lessonHref: `${base}/kinetic-and-static-friction`, prompt: "For a sliding object, kinetic friction magnitude is modeled by:", choices: ["μ_kN", "μ_sN always", "kx", "mv²/r"], answer: "μ_kN", explanation: "Kinetic friction is f_k = μ_kN." },
  { id: "u2-mcq17", skill: "Friction Graphs", lessonHref: `${base}/kinetic-and-static-friction`, stimulus: "A graph of kinetic friction force versus normal force is linear.", prompt: "The slope represents:", choices: ["μ_k", "mass", "speed", "spring constant"], answer: "μ_k", explanation: "f_k = μ_kN, so slope is the coefficient of kinetic friction." },
  { id: "u2-mcq18", skill: "Spring Forces", lessonHref: `${base}/spring-forces`, prompt: "A spring is stretched in the positive direction. The spring force is:", choices: ["positive", "negative", "zero", "always downward"], answer: "negative", explanation: "F_s = -kx, so the restoring force points opposite displacement." },
  { id: "u2-mcq19", skill: "Hooke's Law", lessonHref: `${base}/spring-forces`, prompt: "A spring with k = 50 N/m is compressed 0.20 m. The force magnitude is:", choices: ["2.5 N", "10 N", "50 N", "250 N"], answer: "10 N", explanation: "|F_s| = k|x| = 50(0.20) = 10 N." },
  { id: "u2-mcq20", skill: "Circular Motion", lessonHref: `${base}/circular-motion`, prompt: "For uniform circular motion, acceleration points:", choices: ["tangent to motion", "toward the center", "away from the center", "nowhere"], answer: "toward the center", explanation: "Centripetal acceleration is inward." },
  { id: "u2-mcq21", skill: "Centripetal Force", lessonHref: `${base}/circular-motion`, prompt: "Centripetal force is best understood as:", choices: ["a separate new force", "the inward net force supplied by real forces", "always friction", "always zero"], answer: "the inward net force supplied by real forces", explanation: "Centripetal describes the direction of net force, not a new interaction." },
  { id: "u2-mcq22", skill: "Circular Factor Reasoning", lessonHref: `${base}/circular-motion`, prompt: "If speed doubles while radius is unchanged, centripetal acceleration becomes:", choices: ["twice as large", "four times as large", "half as large", "unchanged"], answer: "four times as large", explanation: "a_c = v²/r, so doubling speed quadruples acceleration." },
  { id: "u2-mcq23", skill: "Circular Orbits", lessonHref: `${base}/circular-motion`, prompt: "For a satellite in circular orbit, the inward net force is supplied mainly by:", choices: ["gravity", "normal force", "force of motion", "spring force"], answer: "gravity", explanation: "Gravity provides the centripetal net force for an orbit." },
  { id: "u2-mcq24", skill: "Experimental Design", lessonHref: `${base}/newton-s-second-law`, prompt: "To test Newton's second law for a cart of fixed mass, students should graph:", choices: ["net force versus acceleration", "color versus time", "mass versus name", "height versus label"], answer: "net force versus acceleration", explanation: "A force-acceleration graph tests F = ma and gives mass from slope." },
];

const frqs: FrqQuestion[] = [
  {
    id: "u2-frq1",
    title: "FRQ 1 — Mathematical Routines",
    skill: "Newton's Second Law",
    lessonHref: `${base}/newton-s-second-law`,
    prompt: "A block of mass m slides right on a horizontal surface and is pulled right by a horizontal tension T while kinetic friction acts left. Derive an expression for the block's acceleration in terms of T, μ_k, m, and g. Then describe how the acceleration changes if the mass increases while T and μ_k stay constant.",
    rubric: ["Draws or describes a correct FBD with weight, normal, tension, and kinetic friction.", "Uses N = mg for the horizontal surface.", "Writes ΣF_x = T - μ_kmg = ma.", "Solves a = T/m - μ_kg and explains the mass dependence of the applied-force term."],
  },
  {
    id: "u2-frq2",
    title: "FRQ 2 — Translation Between Representations",
    skill: "FBD to Equations",
    lessonHref: `${base}/forces-and-free-body-diagrams`,
    prompt: "A box slides right on a rough horizontal floor, remaining in contact with it, while a rope pulls right at angle θ above horizontal. Translate the physical situation into a free-body diagram description, horizontal and vertical force equations, and a short explanation of why the normal force is not necessarily equal to mg.",
    rubric: ["Identifies weight, normal, tension, and friction as real forces.", "Resolves angled tension into horizontal and vertical components.", "Writes vertical equilibrium using N + T_y - mg = 0 if vertical acceleration is zero.", "Explains that upward tension reduces the required normal force."],
  },
  {
    id: "u2-frq3",
    title: "FRQ 3 — Experimental Design and Analysis",
    skill: "Experimental Design",
    lessonHref: `${base}/kinetic-and-static-friction`,
    prompt: "Design an experiment to determine the coefficient of kinetic friction between a block and a surface. Include variables, procedure, graph, how the coefficient is determined, and one source of uncertainty.",
    rubric: ["Measures kinetic friction force for multiple normal forces or masses.", "Controls surface material and sliding condition.", "Graphs f_k versus N.", "Identifies slope as μ_k with units reasoning and describes uncertainty."],
  },
  {
    id: "u2-frq4",
    title: "FRQ 4 — Qualitative and Quantitative Translation",
    skill: "Circular Motion",
    lessonHref: `${base}/circular-motion`,
    prompt: "A small object moves in a horizontal circle of radius r with speed v. The speed is then doubled while radius is unchanged. Predict qualitatively and quantitatively how the required inward net force changes, and explain why centripetal force should not be drawn as an additional force on the FBD.",
    rubric: ["Uses a_c = v²/r and ΣF_inward = mv²/r.", "States the required inward net force quadruples when speed doubles.", "Explains the direction is toward the center.", "Identifies centripetal force as the inward net force from real interactions, not an extra force."],
  },
];

const statusLabel = (answered: boolean, flagged: boolean) => {
  if (flagged && answered) return "Answered + flagged";
  if (flagged) return "Flagged";
  if (answered) return "Answered";
  return "Unanswered";
};

export function Unit2TestInterface() {
  const allQuestions = useMemo(() => [...mcqs, ...frqs], []);
  const [current, setCurrent] = useState(0);
  const [mcqAnswers, setMcqAnswers] = useState<Record<string, string>>({});
  const [frqAnswers, setFrqAnswers] = useState<Record<string, string>>({});
  const [flagged, setFlagged] = useState<Record<string, boolean>>({});
  const [warning, setWarning] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const currentQuestion = allQuestions[current];
  const isMcq = "choices" in currentQuestion;
  const answered = isMcq ? Boolean(mcqAnswers[currentQuestion.id]) : Boolean(frqAnswers[currentQuestion.id]?.trim());
  const unansweredCount = allQuestions.filter((question) => ("choices" in question ? !mcqAnswers[question.id] : !frqAnswers[question.id]?.trim())).length;
  const mcqScore = mcqs.filter((question) => mcqAnswers[question.id] === question.answer).length;
  const frqCompletion = frqs.filter((question) => (frqAnswers[question.id] ?? "").trim().length > 0).length;
  const strongSkills = Array.from(new Set(mcqs.filter((question) => mcqAnswers[question.id] === question.answer).map((question) => question.skill))).slice(0, 6);
  const weakSkills = Array.from(new Set(mcqs.filter((question) => mcqAnswers[question.id] !== question.answer).map((question) => question.skill))).slice(0, 8);

  if (submitted) {
    return (
      <div className="topic-module" data-test-submitted="true">
        <section className="lesson-section">
          <p className="eyebrow">Unit 2 Performance</p>
          <h2>Unit 2 — Force and Translational Dynamics Test Submitted</h2>
          <p>Multiple-choice answers are scored automatically. Written responses are submitted for self-review with the rubrics below and are excluded from the score.</p>
          <div className="result-grid">
            <div><small>MCQ score</small><strong>{mcqScore}/24</strong></div>
            <div><small>Written responses submitted</small><strong>{frqCompletion}/4</strong></div>
            <div><small>Written assessment</small><strong>Self-review required</strong></div>
          </div>
          <div className="skill-feedback">
            <article><h4>Correct multiple-choice skills</h4><ul>{strongSkills.length ? strongSkills.map((skill) => <li key={skill}>✓ {skill}</li>) : <li>Keep building accuracy across Unit 2.</li>}</ul></article>
            <article><h4>Review Recommended</h4><ul>{weakSkills.length ? weakSkills.map((skill) => <li key={skill}>△ {skill}</li>) : <li>✓ No MCQ skill gaps detected.</li>}</ul></article>
          </div>
          <div className="lesson-nav">
            <button className="button secondary" onClick={() => { setSubmitted(false); setWarning(false); setCurrent(0); }} type="button">Review Responses</button>
            <button className="button secondary" onClick={() => { setMcqAnswers({}); setFrqAnswers({}); setFlagged({}); setCurrent(0); setWarning(false); setSubmitted(false); }} type="button">Retake Unit Test</button>
            <Link className="button primary" href="/ap-physics/physics-1/work-energy-power">Continue to Unit 3</Link>
          </div>
        </section>
        <section className="lesson-section">
          <h2>Question Review</h2>
          {mcqs.map((question, index) => (
            <article className="interactive-card" key={question.id}>
              <p><strong>MCQ {index + 1}</strong> - {question.prompt}</p>
              {question.stimulus ? <p className="concept-callout">{question.stimulus}</p> : null}
              <p>Your answer: {mcqAnswers[question.id] ?? "Unanswered"}</p>
              <p>Correct answer: {question.answer}</p>
              <p>{question.explanation}</p>
              <p>Skill: {question.skill} · <a href={question.lessonHref}>Review lesson</a></p>
            </article>
          ))}
          {frqs.map((question) => (
            <article className="interactive-card" key={question.id}>
              <h3>{question.title}</h3>
              <p>{question.prompt}</p>
              <p style={{ whiteSpace: "pre-wrap" }}>Your response: {frqAnswers[question.id] || "Unanswered"}</p>
              <h4>Self-review rubric — no automatic written score</h4>
              <ul>{question.rubric.map((item) => <li key={item}>{item}</li>)}</ul>
              <p><a href={question.lessonHref}>Review relevant lesson</a></p>
            </article>
          ))}
        </section>
      </div>
    );
  }

  return (
    <div className="topic-module" data-unit-test="force-translational-dynamics">
      <section className="lesson-section">
        <div className="topic-meta">
          <span>Estimated time: 90-120 minutes</span>
          <span>Question {current + 1} of {allQuestions.length}</span>
          <span>{statusLabel(answered, Boolean(flagged[currentQuestion.id]))}</span>
        </div>
        <p className="eyebrow">{isMcq ? "Part A — Multiple Choice" : "Part B — Free Response"}</p>
        <h2>{isMcq ? `Question ${current + 1} of 28` : (currentQuestion as FrqQuestion).title}</h2>
        <p className="notice">Assessment mode: no hints, correctness, or explanations appear until final submission.</p>

        <div className="test-panel">
          {"stimulus" in currentQuestion && currentQuestion.stimulus ? <p className="concept-callout">{currentQuestion.stimulus}</p> : null}
          <p id="unit2-test-prompt"><PhysicsText text={currentQuestion.prompt} /></p>
          {isMcq ? (
            <div className="choice-grid" role="radiogroup" aria-labelledby="unit2-test-prompt">
              {(currentQuestion as McqQuestion).choices.map((choice, choiceIndex) => (
                <label key={choice}>
                  <input checked={mcqAnswers[currentQuestion.id] === choice} name={currentQuestion.id} onChange={() => setMcqAnswers((answers) => ({ ...answers, [currentQuestion.id]: choice }))} type="radio" />
                  <span><strong className="choice-letter">{String.fromCharCode(65 + choiceIndex)}.</strong> <PhysicsText text={choice} /></span>
                </label>
              ))}
            </div>
          ) : (
            <label>
              Written response
              <textarea onChange={(event) => setFrqAnswers((answers) => ({ ...answers, [currentQuestion.id]: event.target.value }))} placeholder="Write your response. Include equations, units, reasoning, and diagrams in words where useful." value={frqAnswers[currentQuestion.id] ?? ""} />
            </label>
          )}
        </div>

        <div className="lesson-nav">
          <button className="button secondary" disabled={current === 0} onClick={() => setCurrent((value) => Math.max(0, value - 1))} type="button">Previous</button>
          <button className="button secondary" onClick={() => setFlagged((flags) => ({ ...flags, [currentQuestion.id]: !flags[currentQuestion.id] }))} type="button">{flagged[currentQuestion.id] ? "Unflag" : "Flag for Review"}</button>
          <button className="button secondary" disabled={current === allQuestions.length - 1} onClick={() => setCurrent((value) => Math.min(allQuestions.length - 1, value + 1))} type="button">Next</button>
          <button className="button primary" onClick={() => { if (unansweredCount === 0) setSubmitted(true); else setWarning(true); }} type="button">Submit Unit Test</button>
        </div>

        {warning ? (
          <div className="feedback incorrect" role="status">
            <strong>You still have {unansweredCount} unanswered question{unansweredCount === 1 ? "" : "s"}.</strong>
            <div className="lesson-nav">
              <button className="button secondary" onClick={() => setWarning(false)} type="button">Return to Test</button>
              <button className="button primary" onClick={() => setSubmitted(true)} type="button">Submit Anyway</button>
            </div>
          </div>
        ) : null}
      </section>

      <section className="lesson-section">
        <h2>Question Navigator</h2>
        <div className="filter-row">
          {allQuestions.map((question, index) => {
            const itemAnswered = "choices" in question ? Boolean(mcqAnswers[question.id]) : Boolean(frqAnswers[question.id]?.trim());
            return (
              <button className={`button ${index === current ? "primary" : "secondary"}`} key={question.id} onClick={() => { setCurrent(index); setWarning(false); }} type="button">
                {index + 1} · {statusLabel(itemAnswered, Boolean(flagged[question.id]))}
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export const unit2TestCounts = {
  frq: frqs.length,
  mcq: mcqs.length,
};
