"use client";

import { PhysicsText } from "./PhysicsText";

import { useEffect, useState } from "react";

type ReviewQuestion = {
  answer: string;
  choices?: string[];
  explanation: string;
  hint: string;
  id: string;
  prompt: string;
  section: string;
  skill: string;
};

const reviewQuestions: ReviewQuestion[] = [
  { id: "scalar-vector", skill: "Scalars vs vectors", section: "scalars", prompt: "Which quantity must include direction?", choices: ["Distance", "Speed", "Displacement", "Time"], answer: "Displacement", hint: "A vector needs magnitude and direction.", explanation: "Displacement is a vector because it describes change in position with direction." },
  { id: "signs", skill: "Direction/sign conventions", section: "signs", prompt: "Right is positive. A cart moves 7 m left. What is its displacement?", answer: "-7 m", hint: "Left is the negative direction in this coordinate system.", explanation: "The displacement is -7 m because the motion is 7 m in the negative direction." },
  { id: "distance", skill: "Distance vs displacement", section: "position", prompt: "A runner goes 30 m east then 10 m west. What distance did the runner travel?", answer: "40 m", hint: "Distance counts the path length, not final change in position.", explanation: "The path length is 30 m + 10 m = 40 m." },
  { id: "velocity", skill: "Average velocity", section: "position", prompt: "A student moves from x = -2 m to x = +10 m in 4 s. What is average velocity?", answer: "+3 m/s", hint: "Use displacement divided by elapsed time.", explanation: "Δx = 12 m and Δt = 4 s, so v_avg = +3 m/s." },
  { id: "accel", skill: "Acceleration", section: "acceleration", prompt: "Velocity changes from +4 m/s to +12 m/s in 2 s. What is average acceleration?", answer: "+4 m/s²", hint: "Use Δv / Δt.", explanation: "Δv = +8 m/s over 2 s, so a_avg = +4 m/s²." },
  { id: "speeding", skill: "Speeding up/slowing down", section: "acceleration", prompt: "Velocity is negative and acceleration is positive. What happens to speed?", choices: ["Speeding up", "Slowing down", "Always stationary", "Cannot be determined"], answer: "Slowing down", hint: "Velocity and acceleration point in opposite directions.", explanation: "Opposite signs mean velocity and acceleration point opposite ways, so speed decreases." },
  { id: "motion-diagram", skill: "Motion diagrams", section: "representations", prompt: "Equal-time dots progress to the right and get farther apart as time increases. What is happening?", choices: ["Speeding up right", "Slowing down right", "Stationary", "Moving left"], answer: "Speeding up right", hint: "Farther spacing during equal times means greater speed.", explanation: "The object moves right and covers more distance each interval, so it speeds up." },
  { id: "graph-slope", skill: "Position-time graphs", section: "graphs", prompt: "A position-time graph has a constant negative slope. What does that show?", choices: ["Constant positive velocity", "Constant negative velocity", "Positive acceleration", "No motion"], answer: "Constant negative velocity", hint: "Slope on an x-t graph is velocity.", explanation: "A straight line has constant slope; negative slope means negative velocity." },
  { id: "reference", skill: "Reference frames", section: "relative", prompt: "A passenger seated on a train has velocity 0 m/s in which frame?", choices: ["Train frame", "Ground frame only", "Every frame", "No frame"], answer: "Train frame", hint: "Choose the observer who sees the passenger remain at the same position.", explanation: "In the train frame, the seated passenger's position in the train does not change." },
  { id: "relative-same", skill: "Relative velocity", section: "relative", prompt: "Car A moves +22 m/s and Car B moves +17 m/s. What is A relative to B?", answer: "+5 m/s", hint: "Compare how much A gains on B each second.", explanation: "v_A,B = 22 - 17 = +5 m/s." },
  { id: "relative-opposite", skill: "Relative velocity", section: "relative", prompt: "Car A moves +12 m/s and Car B moves -8 m/s. What is A relative to B?", answer: "+20 m/s", hint: "Subtract B's signed velocity.", explanation: "v_A,B = 12 - (-8) = +20 m/s." },
  { id: "component", skill: "Vector components", section: "vectors", prompt: "A 10 m vector at 0° from +x has what y-component?", answer: "0 m", hint: "The vector is entirely horizontal.", explanation: "A vector along +x has no vertical component, so A_y = 0 m." },
  { id: "resultant", skill: "Vector addition", section: "vectors", prompt: "A vector has components +6 and +8. What is its magnitude?", answer: "10", hint: "Use the Pythagorean theorem.", explanation: "Magnitude = √(6² + 8²) = 10." },
  { id: "projectile-time", skill: "Projectile motion", section: "projectiles", prompt: "Two balls leave the same height horizontally at different speeds and land at the same level. Neglect air resistance. Which has greater fall time?", choices: ["Slower ball", "Faster ball", "Same fall time", "Cannot be known"], answer: "Same fall time", hint: "Fall time depends on vertical motion.", explanation: "Their vertical motion is the same, so they have the same fall time." },
  { id: "projectile-peak", skill: "Projectile motion", section: "projectiles", prompt: "At the highest point of ideal projectile motion with nonzero horizontal velocity, what is true?", choices: ["Velocity is zero", "Acceleration is zero", "Vertical velocity is zero", "Horizontal velocity is zero"], answer: "Vertical velocity is zero", hint: "Separate vertical velocity from total velocity.", explanation: "At the peak, v_y = 0 momentarily, but v_x remains nonzero and acceleration is downward." },
  { id: "symbolic", skill: "Symbolic reasoning", section: "projectiles", prompt: "For horizontal launch from height h, what quantity is found first from vertical motion?", choices: ["Horizontal speed", "Time of flight", "Mass", "Horizontal acceleration"], answer: "Time of flight", hint: "The vertical equation contains h, g, and t.", explanation: "Use vertical motion to find shared time, then use that time in the horizontal direction." },
];

const normalize = (value: string) => value.replace(/\s+/g, "").toLowerCase().replace("−", "-");
const acceptable = (answer: string, response: string) => {
  const clean = normalize(response);
  const target = normalize(answer);
  const variants = [target, target.replace("m/s²", ""), target.replace("m/s", ""), target.replace("m", "")];
  return variants.some(value => clean === value || (value.startsWith("+") && clean === value.slice(1)));
};

function SuccessBurst({ show }: { show: boolean }) {
  if (!show) {
    return null;
  }

  return (
    <span className="success-burst" aria-hidden="true">
      {Array.from({ length: 10 }).map((_, index) => <i key={index} />)}
    </span>
  );
}

function ReviewQuestionCard({ question, index }: { question: ReviewQuestion; index: number }) {
  const [choice, setChoice] = useState("");
  const [response, setResponse] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [complete, setComplete] = useState(false);
  const [celebrating, setCelebrating] = useState(false);
  const correct = question.choices ? choice === question.answer : acceptable(question.answer, response);

  useEffect(() => {
    if (!celebrating) {
      return;
    }
    const timeout = window.setTimeout(() => setCelebrating(false), 1400);
    return () => window.clearTimeout(timeout);
  }, [celebrating]);

  return (
    <div className={`interactive-card choice-card${complete ? " completed" : ""}`} id={`review-${question.id}`}>
      <SuccessBurst show={celebrating} />
      <p id={`${question.id}-prompt`}><strong>Practice {index + 1}</strong> - <PhysicsText text={question.prompt} /></p>
      {question.choices ? (
        <div className="choice-grid" role="radiogroup" aria-labelledby={`${question.id}-prompt`}>
          {question.choices.map((option, choiceIndex) => (
            <label key={option}><input checked={choice === option} name={`review-${question.id}`} onChange={() => { setChoice(option); setSubmitted(false); if (option !== question.answer) setComplete(false); }} type="radio" /> <span><strong className="choice-letter">{String.fromCharCode(65 + choiceIndex)}.</strong> <PhysicsText text={option} /></span></label>
          ))}
        </div>
      ) : (
        <label>
          Student response
          <input onChange={(event) => { setResponse(event.target.value); setSubmitted(false); }} placeholder="Enter your answer with units" value={response} />
          <small>Example format: -7 m/s</small>
        </label>
      )}
      <button
        className="button secondary"
        disabled={question.choices ? !choice : !response.trim()}
        onClick={() => {
          setSubmitted(true);
          if (correct) {
            setComplete(true);
            setCelebrating(true);
          }
        }}
        type="button"
      >
        Check Answer
      </button>
      {submitted ? (
        <div className={correct ? "feedback correct" : "feedback incorrect"} role="status">
          <strong>{correct ? "Correct" : "Not quite. Try again."}</strong>
          <p>{correct ? question.explanation : question.hint}</p>
          <a href={`#review-section-${question.section}`}>Review this skill</a>
        </div>
      ) : null}
    </div>
  );
}

export function Unit1ReviewPracticeSet() {
  return (
    <div className="comparison-grid">
      {reviewQuestions.map((question, index) => <ReviewQuestionCard index={index} key={question.id} question={question} />)}
    </div>
  );
}

export function RepresentationReviewActivity() {
  const [answers, setAnswers] = useState({ words: "", graph: "", equation: "", diagram: "" });
  const [submitted, setSubmitted] = useState(false);
  const update = (field: keyof typeof answers, value: string) => {
    setAnswers((current) => ({ ...current, [field]: value }));
    setSubmitted(false);
  };
  const score =
    (answers.words.toLowerCase().includes("right") ? 1 : 0) +
    (answers.graph.toLowerCase().includes("positive") || answers.graph.toLowerCase().includes("slope") ? 1 : 0) +
    (answers.equation.includes("Δx") || answers.equation.toLowerCase().includes("delta") ? 1 : 0) +
    (answers.diagram.toLowerCase().includes("equal") || answers.diagram.toLowerCase().includes("spacing") ? 1 : 0);

  return (
    <div className="interactive-card">
      <p>Scenario: A cart moves right at constant velocity from x = -2 m to x = +6 m in 4 s. Translate that one motion into four representations.</p>
      <label>Words<textarea onChange={(event) => update("words", event.target.value)} placeholder="Describe the motion in words." value={answers.words} /></label>
      <label>Motion diagram<textarea onChange={(event) => update("diagram", event.target.value)} placeholder="Describe marker spacing and direction." value={answers.diagram} /></label>
      <label>Graph<textarea onChange={(event) => update("graph", event.target.value)} placeholder="Describe the position-time graph." value={answers.graph} /></label>
      <label>Equation<textarea onChange={(event) => update("equation", event.target.value)} placeholder="Write a relationship using displacement and time." value={answers.equation} /></label>
      <button className="button secondary" disabled={Object.values(answers).some((answer) => !answer.trim())} onClick={() => setSubmitted(true)} type="button">Check Translation</button>
      {submitted ? (
        <div className={score >= 3 ? "feedback correct" : "feedback incorrect"} role="status">
          <strong>{score}/4 representation elements present</strong>
          <p>Model: The cart moves right at constant velocity; equal-time dots are equally spaced to the right; the x-t graph is a straight line with positive slope; Δx = +8 m and v_avg = Δx/Δt = +2 m/s.</p>
        </div>
      ) : null}
    </div>
  );
}

const stationData = [
  {
    id: "math",
    title: "Mathematical Routines",
    task: "A ball leaves a 1.8 m high table horizontally and lands 2.4 m from the base. Set up the pathway to determine launch speed.",
    model: "Use vertical motion first: -1.8 = 1/2(-9.8)t² to find t. Then use horizontal motion v_x = Δx/t.",
  },
  {
    id: "translation",
    title: "Translation Between Representations",
    task: "Describe a position-time graph for a cart moving left at constant speed, then stopping.",
    model: "The graph first has a straight negative slope, then becomes horizontal when the cart stops.",
  },
  {
    id: "experiment",
    title: "Experimental Design and Analysis",
    task: "Design a safe experiment to determine whether horizontal launch speed affects fall time.",
    model: "Launch objects horizontally from the same height with different speeds, measure fall time or compare synchronized impacts, and control height and initial vertical velocity.",
  },
  {
    id: "qual-quant",
    title: "Qualitative/Quantitative Translation",
    task: "If table height doubles for a horizontal projectile, predict how flight time changes.",
    model: "Since t = sqrt(2h/g), doubling h multiplies time by sqrt(2), not by 2.",
  },
];

export function FRQSkillStations() {
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [shown, setShown] = useState<Record<string, boolean>>({});

  return (
    <div className="comparison-grid">
      {stationData.map((station, index) => (
        <article className="interactive-card" key={station.id}>
          <p className="eyebrow">Station {index + 1}</p>
          <h3>{station.title}</h3>
          <p>{station.task}</p>
          <textarea onChange={(event) => setResponses((current) => ({ ...current, [station.id]: event.target.value }))} placeholder="Write your reasoning." value={responses[station.id] ?? ""} />
          <button className="button secondary" disabled={!(responses[station.id] ?? "").trim()} onClick={() => setShown((current) => ({ ...current, [station.id]: true }))} type="button">Show Model Explanation</button>
          {shown[station.id] ? <div className="feedback correct"><strong>Model explanation</strong><p>{station.model}</p></div> : null}
        </article>
      ))}
    </div>
  );
}

export function ReadinessDiagnostic() {
  const [mode, setMode] = useState<"all" | "weak">("all");
  const reviewSkills = mode === "all" ? reviewQuestions : reviewQuestions.filter((question) => ["projectiles", "vectors", "relative"].includes(question.section));

  return (
    <div className="interactive-card">
      <p>Choose how you want to review before the test.</p>
      <div className="lesson-nav">
        <button className={`button ${mode === "all" ? "primary" : "secondary"}`} onClick={() => setMode("all")} type="button">Review All</button>
        <button className={`button ${mode === "weak" ? "primary" : "secondary"}`} onClick={() => setMode("weak")} type="button">Practice Weak Skills</button>
      </div>
      <div className="skill-feedback">
        <article>
          <h4>Ready</h4>
          <ul>
            <li>✓ Displacement</li>
            <li>✓ Position-time graphs</li>
            <li>✓ Reference frames</li>
          </ul>
        </article>
        <article>
          <h4>Review Recommended</h4>
          <ul>
            {reviewSkills.slice(0, 5).map((question) => <li key={question.id}>△ <a href={`#review-${question.id}`}>{question.skill}</a></li>)}
          </ul>
        </article>
      </div>
    </div>
  );
}
