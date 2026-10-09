"use client";

import { PhysicsText } from "./PhysicsText";

import Link from "next/link";
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

const mcqs: McqQuestion[] = [
  { id: "mcq1", skill: "Vector Reasoning", lessonHref: "/ap-physics/physics-1/kinematics/scalars-vectors-one-dimension", prompt: "Which pair contains one scalar and one vector?", choices: ["speed and distance", "velocity and displacement", "distance and displacement", "acceleration and velocity"], answer: "distance and displacement", explanation: "Distance is scalar; displacement is vector." },
  { id: "mcq2", skill: "Direction and Signs", lessonHref: "/ap-physics/physics-1/kinematics/displacement-velocity-acceleration", prompt: "Right is positive. An object moves from +4 m to -2 m. What is its displacement?", choices: ["+6 m", "-6 m", "+2 m", "-2 m"], answer: "-6 m", explanation: "Δx = x_f - x_i = -2 - 4 = -6 m." },
  { id: "mcq3", skill: "Distance vs Displacement", lessonHref: "/ap-physics/physics-1/kinematics/displacement-velocity-acceleration", prompt: "A runner completes one full 400 m lap and returns to the start. Which statement is correct?", choices: ["distance = 0, displacement = 400 m", "distance = 400 m, displacement = 0", "both are 400 m", "both are 0"], answer: "distance = 400 m, displacement = 0", explanation: "Distance is path length; displacement depends only on initial and final position." },
  { id: "mcq4", skill: "Average Velocity", lessonHref: "/ap-physics/physics-1/kinematics/displacement-velocity-acceleration", prompt: "A cart moves from x = -3 m to x = +9 m in 6 s. What is its average velocity?", choices: ["+1 m/s", "+2 m/s", "+6 m/s", "+12 m/s"], answer: "+2 m/s", explanation: "Δx = +12 m and Δt = 6 s, so v_avg = +2 m/s." },
  { id: "mcq5", skill: "Acceleration", lessonHref: "/ap-physics/physics-1/kinematics/displacement-velocity-acceleration", prompt: "Velocity changes from -8 m/s to -2 m/s in 3 s. What is the average acceleration?", choices: ["-2 m/s²", "+2 m/s²", "-10 m/s²", "+10 m/s²"], answer: "+2 m/s²", explanation: "Δv = -2 - (-8) = +6 m/s. a_avg = +6/3 = +2 m/s²." },
  { id: "mcq6", skill: "Speeding Up/Slowing Down", lessonHref: "/ap-physics/physics-1/kinematics/displacement-velocity-acceleration", prompt: "An object has velocity +5 m/s and acceleration -2 m/s². What is happening to its speed at that instant?", choices: ["speeding up", "slowing down", "speed is constant", "direction cannot be determined"], answer: "slowing down", explanation: "Velocity and acceleration point in opposite directions, so speed decreases." },
  { id: "mcq7", skill: "Motion Diagrams", lessonHref: "/ap-physics/physics-1/kinematics/representing-motion", stimulus: "Equal-time position dots appear farther apart as time increases to the left.", prompt: "Which description matches the motion diagram?", choices: ["moving right and speeding up", "moving left and speeding up", "moving left and slowing down", "stationary"], answer: "moving left and speeding up", explanation: "The ordered positions go left, and spacing increases during equal time intervals." },
  { id: "mcq8", skill: "Graph Interpretation", lessonHref: "/ap-physics/physics-1/kinematics/representing-motion", stimulus: "A position-time graph is a horizontal line from t = 2 s to t = 5 s.", prompt: "What is true during that interval?", choices: ["Velocity is zero.", "Velocity is positive.", "Position is zero.", "Acceleration must be positive."], answer: "Velocity is zero.", explanation: "Horizontal x-t graph means position is constant, so velocity is zero." },
  { id: "mcq9", skill: "Graph Slope", lessonHref: "/ap-physics/physics-1/kinematics/representing-motion", stimulus: "A line on an x-t graph goes from (1 s, 2 m) to (5 s, 10 m).", prompt: "What velocity does the slope represent?", choices: ["+1 m/s", "+2 m/s", "+8 m/s", "+12 m/s"], answer: "+2 m/s", explanation: "Slope = Δx/Δt = 8 m / 4 s = +2 m/s." },
  { id: "mcq10", skill: "Reference Frames", lessonHref: "/ap-physics/physics-1/kinematics/reference-frames-relative-motion", prompt: "A passenger is seated on a train moving +18 m/s relative to the ground. What is the passenger's velocity relative to the train?", choices: ["0 m/s", "+18 m/s", "-18 m/s", "Cannot be known"], answer: "0 m/s", explanation: "The passenger remains at the same position within the train." },
  { id: "mcq11", skill: "Relative Velocity", lessonHref: "/ap-physics/physics-1/kinematics/reference-frames-relative-motion", prompt: "A bus moves +14 m/s relative to the ground. A student walks -3 m/s relative to the bus. What is the student's velocity relative to the ground?", choices: ["-17 m/s", "-11 m/s", "+11 m/s", "+17 m/s"], answer: "+11 m/s", explanation: "v_student,ground = -3 + 14 = +11 m/s." },
  { id: "mcq12", skill: "Inertial Frames", lessonHref: "/ap-physics/physics-1/kinematics/reference-frames-relative-motion", prompt: "Two inertial observers using parallel axes may disagree about an object's velocity. Which quantity do they measure the same for the same accelerating object?", choices: ["position", "velocity", "acceleration", "distance"], answer: "acceleration", explanation: "In inertial frames with constant relative velocity, acceleration is the same." },
  { id: "mcq13", skill: "Vector Components", lessonHref: "/ap-physics/physics-1/kinematics/vectors-motion-two-dimensions", prompt: "A vector of magnitude A makes angle θ above +x. Which expression gives the vertical component?", choices: ["A cos θ", "A sin θ", "A / cos θ", "A tan θ"], answer: "A sin θ", explanation: "When θ is measured from +x, the y-component is opposite the angle, so A_y = A sin θ." },
  { id: "mcq14", skill: "Component Signs", lessonHref: "/ap-physics/physics-1/kinematics/vectors-motion-two-dimensions", prompt: "A vector points down and right. Which component signs are correct?", choices: ["x positive, y positive", "x negative, y positive", "x negative, y negative", "x positive, y negative"], answer: "x positive, y negative", explanation: "Right is +x and down is -y." },
  { id: "mcq15", skill: "Resultant Magnitude", lessonHref: "/ap-physics/physics-1/kinematics/vectors-motion-two-dimensions", prompt: "A displacement has perpendicular x- and y-components +5 m and +12 m. What is its magnitude?", choices: ["7 m", "13 m", "17 m", "60 m"], answer: "13 m", explanation: "Magnitude = √(5² + 12²) = 13 m." },
  { id: "mcq16", skill: "Projectile Concepts", lessonHref: "/ap-physics/physics-1/kinematics/vectors-motion-two-dimensions", prompt: "For ideal projectile motion, which statement is true?", choices: ["Horizontal acceleration is -g.", "Vertical acceleration is zero.", "Horizontal velocity is constant.", "Acceleration is tangent to the path."], answer: "Horizontal velocity is constant.", explanation: "With negligible air resistance, a_x = 0, so v_x remains constant." },
  { id: "mcq17", skill: "Projectile Peak", lessonHref: "/ap-physics/physics-1/kinematics/vectors-motion-two-dimensions", prompt: "At the highest point of an angled projectile's flight, what is true?", choices: ["v_x = 0 and a_y = 0", "v_y = 0 and a_y is downward", "total velocity is zero", "gravity stops briefly"], answer: "v_y = 0 and a_y is downward", explanation: "Vertical velocity is zero instantaneously, but acceleration remains downward." },
  { id: "mcq18", skill: "Experimental Reasoning", lessonHref: "/ap-physics/physics-1/kinematics/vectors-motion-two-dimensions", stimulus: "Students launch a ball horizontally from a table and measure table height and horizontal range.", prompt: "What should they calculate first to determine launch speed?", choices: ["mass of the ball", "time of flight from vertical motion", "horizontal acceleration", "final vertical velocity only"], answer: "time of flight from vertical motion", explanation: "Use table height and vertical acceleration to determine the shared flight time, then v_x = range/time." },
];

const frqs: FrqQuestion[] = [
  {
    id: "frq1",
    title: "FRQ 1 — Mathematical Routines",
    skill: "Mathematical Routines",
    lessonHref: "/ap-physics/physics-1/kinematics/vectors-motion-two-dimensions",
    prompt: "A ball is launched horizontally from a 2.0 m high table with unknown horizontal speed and lands 3.0 m from the base. Set up a symbolic and numerical pathway to determine the launch speed. Include units and a physical interpretation.",
    rubric: ["Defines vertical quantities and solves for time using height and g.", "Uses shared time in horizontal motion.", "Calculates launch speed with units.", "Interprets horizontal velocity as constant in ideal projectile motion."],
  },
  {
    id: "frq2",
    title: "FRQ 2 — Translation Between Representations",
    skill: "Translation Between Representations",
    lessonHref: "/ap-physics/physics-1/kinematics/representing-motion",
    prompt: "A cart moves right at constant velocity, stops for 2 s, then moves left at a larger constant speed. Neglect the brief intervals when its velocity changes. Describe a motion diagram, position-time graph, and velocity-time graph consistent with the motion.",
    rubric: ["Motion diagram uses equal-time markers and correct spacing.", "Position-time graph has positive slope, horizontal segment, then steeper negative slope.", "Velocity-time graph shows positive constant, zero, then larger-magnitude negative constant.", "Explanation connects each representation to the same physical motion."],
  },
  {
    id: "frq3",
    title: "FRQ 3 — Experimental Design and Analysis",
    skill: "Experimental Design and Analysis",
    lessonHref: "/ap-physics/physics-1/kinematics/vectors-motion-two-dimensions",
    prompt: "Design a safe investigation to test whether horizontal launch speed affects fall time for objects launched from the same height. Identify measurements, procedure, graph or comparison, and one source of uncertainty.",
    rubric: ["Identifies controlled height and varied horizontal speed.", "Measures or compares fall time for each trial.", "Explains that vertical motion determines fall time.", "Discusses uncertainty such as release timing, height measurement, or landing detection."],
  },
  {
    id: "frq4",
    title: "FRQ 4 — Qualitative/Quantitative Translation",
    skill: "Qualitative/Quantitative Translation",
    lessonHref: "/ap-physics/physics-1/kinematics/reference-frames-relative-motion",
    prompt: "Car A and Car B move right with speeds v_A and v_B, where v_A is slightly greater than v_B. Predict how A appears from B's frame, then support your prediction with a symbolic relationship.",
    rubric: ["States that A moves right relative to B if v_A > v_B.", "Uses v_A,B = v_A,ground - v_B,ground.", "Explains why the relative speed can be small even if both ground speeds are large.", "Connects sign to direction in B's reference frame."],
  },
];

const statusLabel = (answered: boolean, flagged: boolean) => {
  if (flagged && answered) return "Answered + flagged";
  if (flagged) return "Flagged";
  if (answered) return "Answered";
  return "Unanswered";
};

export function Unit1TestInterface() {
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
  const strongSkills = Array.from(new Set(mcqs.filter((question) => mcqAnswers[question.id] === question.answer).map((question) => question.skill))).slice(0, 5);
  const weakSkills = Array.from(new Set(mcqs.filter((question) => mcqAnswers[question.id] !== question.answer).map((question) => question.skill))).slice(0, 6);

  if (submitted) {
    return (
      <div className="topic-module" data-test-submitted="true">
        <section className="lesson-section">
          <p className="eyebrow">Unit 1 Performance</p>
          <h2>Unit 1 — Kinematics Test Submitted</h2>
          <p>Multiple-choice answers are scored automatically. Written responses are submitted for self-review with the rubrics below and are excluded from the score.</p>
          <div className="result-grid">
            <div><small>MCQ score</small><strong>{mcqScore}/18</strong></div>
            <div><small>Written responses submitted</small><strong>{frqCompletion}/4</strong></div>
            <div><small>Written assessment</small><strong>Self-review required</strong></div>
          </div>
          <div className="skill-feedback">
            <article>
              <h4>Correct multiple-choice skills</h4>
              <ul>{strongSkills.length ? strongSkills.map((skill) => <li key={skill}>✓ {skill}</li>) : <li>Keep building accuracy across the unit.</li>}</ul>
            </article>
            <article>
              <h4>Review Recommended</h4>
              <ul>{weakSkills.length ? weakSkills.map((skill) => <li key={skill}>△ {skill}</li>) : <li>✓ No MCQ skill gaps detected.</li>}</ul>
            </article>
          </div>
          <div className="lesson-nav">
            <button className="button secondary" onClick={() => { setSubmitted(false); setCurrent(0); }} type="button">Review Responses</button>
            <button className="button secondary" onClick={() => { setMcqAnswers({}); setFrqAnswers({}); setFlagged({}); setCurrent(0); setSubmitted(false); }} type="button">Retake Unit Test</button>
            <Link className="button primary" href="/ap-physics/physics-1/force-translational-dynamics">Continue to Unit 2</Link>
          </div>
        </section>
        <section className="lesson-section">
          <h2>Question Review</h2>
          {mcqs.map((question, index) => (
            <article className="interactive-card" key={question.id}>
              <p><strong>MCQ {index + 1}</strong> - <PhysicsText text={question.prompt} /></p>
              {question.stimulus ? <p className="concept-callout">{question.stimulus}</p> : null}
              <p>Your answer: {mcqAnswers[question.id] ?? "Unanswered"}</p>
              <p>Correct answer: <PhysicsText text={question.answer} /></p>
              <p><PhysicsText text={question.explanation} /></p>
              <p>Skill: {question.skill} · <a href={question.lessonHref}>Review lesson</a></p>
            </article>
          ))}
          {frqs.map((question) => (
            <article className="interactive-card" key={question.id}>
              <h3>{question.title}</h3>
              <p><PhysicsText text={question.prompt} /></p>
              <p>Your response:</p><div style={{ whiteSpace: "pre-wrap" }}>{frqAnswers[question.id] || "Unanswered"}</div>
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
    <div className="topic-module" data-unit-test="kinematics">
      <section className="lesson-section">
        <div className="topic-meta">
          <span>Estimated time: 70-90 minutes</span>
          <span>Question {current + 1} of {allQuestions.length}</span>
          <span>{statusLabel(answered, Boolean(flagged[currentQuestion.id]))}</span>
        </div>
        <p className="eyebrow">{isMcq ? "Part A — Multiple Choice" : "Part B — Free Response"}</p>
        <h2>{isMcq ? `Question ${current + 1} of 22` : (currentQuestion as FrqQuestion).title}</h2>
        <p className="notice">Assessment mode: no hints, correctness, or explanations appear until final submission.</p>

        <div className="test-panel">
          {"stimulus" in currentQuestion && currentQuestion.stimulus ? <p className="concept-callout">{currentQuestion.stimulus}</p> : null}
          <p id="unit1-current-prompt"><PhysicsText text={currentQuestion.prompt} /></p>
          {isMcq ? (
            <div className="choice-grid" role="radiogroup" aria-labelledby="unit1-current-prompt">
              {(currentQuestion as McqQuestion).choices.map((choice, index) => (
                <label key={choice}>
                  <input checked={mcqAnswers[currentQuestion.id] === choice} name={currentQuestion.id} onChange={() => setMcqAnswers((answers) => ({ ...answers, [currentQuestion.id]: choice }))} type="radio" />
                  <span><strong>{String.fromCharCode(65 + index)}.</strong> <PhysicsText text={choice} /></span>
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
          <button className="button secondary" onClick={() => setFlagged((flags) => ({ ...flags, [currentQuestion.id]: !flags[currentQuestion.id] }))} type="button">
            {flagged[currentQuestion.id] ? "Unflag" : "Flag for Review"}
          </button>
          <button className="button secondary" disabled={current === allQuestions.length - 1} onClick={() => setCurrent((value) => Math.min(allQuestions.length - 1, value + 1))} type="button">Next</button>
          <button className="button primary" onClick={() => { if (unansweredCount === 0) { setWarning(false); setSubmitted(true); } else setWarning(true); }} type="button">Submit Unit Test</button>
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

export const unit1TestCounts = {
  frq: frqs.length,
  mcq: mcqs.length,
};
