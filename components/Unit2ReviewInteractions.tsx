"use client";

import { useState } from "react";
import { PhysicsText } from "./PhysicsText";

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
  { id: "system", section: "systems", skill: "Systems", prompt: "If two connected carts are chosen as one system, the tension between them is:", choices: ["external", "internal", "weight", "normal"], answer: "internal", hint: "The interaction is between objects inside the boundary.", explanation: "For the combined-cart system, the inter-cart tension is internal." },
  { id: "cm", section: "systems", skill: "Center of Mass", prompt: "Two equal masses are at x = 2 m and x = 10 m. The center of mass is:", choices: ["2 m", "4 m", "6 m", "10 m"], answer: "6 m", hint: "Equal masses place the center of mass at the midpoint.", explanation: "The midpoint of 2 m and 10 m is 6 m." },
  { id: "force-id", section: "fbd", skill: "Force Identification", prompt: "Which phrase is not a legitimate force label?", choices: ["Earth on box", "rope on cart", "force of motion", "table on book"], answer: "force of motion", hint: "A force label should describe an interaction/source.", explanation: "Motion is not an object exerting a force." },
  { id: "normal", section: "fbd", skill: "Normal Force", prompt: "The normal force is always:", choices: ["upward", "equal to weight", "perpendicular to surface", "zero"], answer: "perpendicular to surface", hint: "Think about the direction of contact support.", explanation: "Normal force is perpendicular to the contact surface." },
  { id: "third", section: "third-law", skill: "Newton's Third Law", prompt: "A small car and large truck collide. The interaction forces are:", choices: ["larger on the car", "larger on the truck", "equal magnitude", "zero"], answer: "equal magnitude", hint: "Third law describes the force pair.", explanation: "The forces are equal in magnitude and opposite in direction." },
  { id: "first", section: "first-law", skill: "Newton's First Law", prompt: "A puck moves at constant velocity on frictionless ice. Net force is:", choices: ["zero", "forward", "backward", "downward only"], answer: "zero", hint: "Constant velocity means zero acceleration.", explanation: "Zero acceleration requires zero net force." },
  { id: "second", section: "second-law", skill: "Newton's Second Law", prompt: "A 3 kg object has net force 12 N. Acceleration is:", answer: "4 m/s²", hint: "Use a = ΣF/m.", explanation: "a = 12 N / 3 kg = 4 m/s²." },
  { id: "graph", section: "graphs", skill: "Graph Interpretation", prompt: "In a net force vs acceleration graph, the slope represents:", choices: ["mass", "velocity", "time", "friction coefficient"], answer: "mass", hint: "Compare F = ma to y = mx.", explanation: "On a net force vs a graph, slope is mass." },
  { id: "gravity-factor", section: "gravity", skill: "Gravity", prompt: "If separation triples, gravitational force becomes:", choices: ["1/3", "1/6", "1/9", "9 times"], answer: "1/9", hint: "Use inverse-square dependence.", explanation: "F_g ∝ 1/r², so tripling r makes force one-ninth." },
  { id: "weight", section: "gravity", skill: "Apparent Weight", prompt: "Apparent weight is measured by:", choices: ["normal force", "mass", "speed", "friction coefficient"], answer: "normal force", hint: "A scale reads contact support force.", explanation: "Apparent weight is the normal force magnitude." },
  { id: "static", section: "friction", skill: "Static Friction", prompt: "A box stays at rest under a 7 N push. If f_s,max = 20 N, actual static friction is:", answer: "7 N", hint: "Static friction adjusts to what is needed.", explanation: "The actual static friction balances the 7 N push." },
  { id: "kinetic", section: "friction", skill: "Kinetic Friction", prompt: "Kinetic friction magnitude is modeled as:", choices: ["μ_kN", "μ_sN always", "kx", "v²/r"], answer: "μ_kN", hint: "Use the sliding-friction model.", explanation: "When surfaces slide, f_k = μ_kN." },
  { id: "spring", section: "springs", skill: "Spring Forces", prompt: "A spring stretched +0.10 m exerts force in the:", choices: ["positive direction", "negative direction", "zero direction", "downward direction always"], answer: "negative direction", hint: "Spring force opposes extension or compression from its relaxed length.", explanation: "F_s = -kx, so positive displacement gives negative force." },
  { id: "spring-graph", section: "graphs", skill: "Spring Graphs", prompt: "The slope magnitude of a spring force vs displacement graph represents:", choices: ["k", "m", "g", "μ"], answer: "k", hint: "Hooke's law is linear in displacement.", explanation: "The spring constant is the slope magnitude of F vs x." },
  { id: "circular-accel", section: "circular", skill: "Circular Motion", prompt: "For uniform circular motion, acceleration points:", choices: ["inward", "tangent", "outward as a real force", "nowhere"], answer: "inward", hint: "Velocity direction changes toward the center.", explanation: "Centripetal acceleration points toward the center." },
  { id: "circular-force", section: "circular", skill: "Circular FBD", prompt: "Centripetal force should be treated as:", choices: ["a new force", "the inward net force direction", "always gravity", "always normal force"], answer: "the inward net force direction", hint: "Name the real force that supplies the inward net force.", explanation: "Centripetal describes the direction of net force, not a separate interaction." },
  { id: "speed-factor", section: "circular", skill: "Circular Factor Reasoning", prompt: "If speed doubles in circular motion with same radius, a_c changes by:", choices: ["2", "4", "1/2", "unchanged"], answer: "4", hint: "Speed is squared in a_c = v²/r.", explanation: "Doubling v makes v² four times larger." },
  { id: "experiment-n2", section: "experiments", skill: "Experimental Design", prompt: "To test Newton's second law with carts, a useful graph is:", choices: ["net force vs acceleration", "color vs mass", "time vs name", "height vs friction only"], answer: "net force vs acceleration", hint: "Look for the relationship F = ma.", explanation: "With constant mass, force and acceleration are proportional." },
  { id: "friction-exp", section: "experiments", skill: "Friction Experiment", prompt: "A coefficient of kinetic friction can be found from the slope of:", choices: ["friction force vs normal force", "speed vs time only", "mass vs radius", "period vs color"], answer: "friction force vs normal force", hint: "f_k = μ_kN.", explanation: "The slope of f_k vs N is μ_k." },
  { id: "orbit", section: "circular", skill: "Circular Orbits", prompt: "In a circular orbit, the inward net force is supplied by:", choices: ["gravity", "force of motion", "air drag always", "a separate orbit force"], answer: "gravity", hint: "Identify the real interaction toward the central body.", explanation: "Gravity supplies the inward net force for circular orbits." },
  { id: "banked", section: "circular", skill: "Banked Curves", prompt: "For a frictionless banked curve, the inward component comes from:", choices: ["normal force component", "weight component upward", "force of motion", "static friction always"], answer: "normal force component", hint: "Resolve the normal force.", explanation: "A component of the normal force points inward on a banked curve." },
  { id: "elevator", section: "gravity", skill: "Elevators", prompt: "An elevator accelerates upward. A scale reading is:", choices: ["greater than weight", "less than weight", "zero", "always equal to mass"], answer: "greater than weight", hint: "The normal force must exceed weight to accelerate upward.", explanation: "Apparent weight is larger because F_N - F_g = ma upward." },
  { id: "connected", section: "second-law", skill: "Connected Systems", prompt: "For two blocks pulled as one system, internal tension:", choices: ["cancels from system equation", "is the only external force", "equals gravity always", "must be drawn twice"], answer: "cancels from system equation", hint: "Internal forces are between objects inside the system.", explanation: "Internal forces cancel when analyzing the combined system." },
  { id: "translation", section: "translation", skill: "FBD to Equation", prompt: "For a horizontal pull right with friction left, the x-equation can be:", choices: ["T - f = ma", "mg - N = ma_x", "T + f = 0 always", "N = mv²/r"], answer: "T - f = ma", hint: "Sum rightward positive forces.", explanation: "The rightward tension and leftward friction give ΣF_x = T - f = ma." },
  { id: "spring-exp", section: "experiments", skill: "Spring Experiment", prompt: "To determine k experimentally, measure force and:", choices: ["displacement", "color", "period only", "mass of Earth"], answer: "displacement", hint: "Hooke's law relates F and x.", explanation: "The magnitude of the force-displacement graph slope gives k." },
];

const normalize = (value: string) => value.replace(/\s+/g, "").toLowerCase().replace(/²|\^2/g, "2");
const correctText = (answer: string, value: string) => {
  const response = normalize(value);
  const target = normalize(answer);
  return response === target || response === target.replace("m/s2", "") || response === target.replace("n", "");
};

function QuestionCard({ question, index }: { question: ReviewQuestion; index: number }) {
  const [choice, setChoice] = useState("");
  const [response, setResponse] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const correct = question.choices ? choice === question.answer : correctText(question.answer, response);
  return (
    <article className="interactive-card" id={`unit2-review-${question.id}`}>
      <p id={`${question.id}-review-prompt`}><strong>Practice {index + 1}</strong> - <PhysicsText text={question.prompt} /></p>
      {question.choices ? (
        <div className="choice-grid" role="radiogroup" aria-labelledby={`${question.id}-review-prompt`}>{question.choices.map((option, choiceIndex) => <label key={option}><input checked={choice === option} name={question.id} onChange={() => { setChoice(option); setSubmitted(false); }} type="radio" /><span><strong className="choice-letter">{String.fromCharCode(65 + choiceIndex)}.</strong> <PhysicsText text={option} /></span></label>)}</div>
      ) : (
        <label>Student response<input onChange={(event) => { setResponse(event.target.value); setSubmitted(false); }} placeholder="Enter answer with units" value={response} /><small>Example format: 12 N</small></label>
      )}
      <button className="button secondary" disabled={question.choices ? !choice : !response.trim()} onClick={() => setSubmitted(true)} type="button">Check Answer</button>
      {submitted ? <div className={correct ? "feedback correct" : "feedback incorrect"}><strong>{correct ? "Correct" : "Try again."}</strong><p>{correct ? question.explanation : question.hint}</p><a href={`#review-${question.section}`}>Review this skill</a></div> : null}
    </article>
  );
}

export function Unit2ReviewPractice() {
  return <div className="comparison-grid">{reviewQuestions.map((question, index) => <QuestionCard index={index} key={question.id} question={question} />)}</div>;
}

export function Unit2FbdBootcamp() {
  const [attempt, setAttempt] = useState("");
  const [shown, setShown] = useState(false);
  return (
    <div className="interactive-card">
      <p>Choose one: horizontal surface, incline, connected objects, flat curve, or satellite orbit. Describe the object/system and the real forces that belong on the FBD.</p>
      <textarea onChange={(event) => { setAttempt(event.target.value); setShown(false); }} placeholder="List real forces and directions. Do not include force of motion or fake centripetal force." value={attempt} />
      <button className="button secondary" disabled={!attempt.trim()} onClick={() => setShown(true)} type="button">Show Bootcamp Checklist</button>
      {shown ? <div className="feedback correct"><strong>Checklist</strong><ul><li>Identify the selected object/system.</li><li>Draw only real external forces on it.</li><li>For circular motion, identify which real force/component supplies inward net force.</li><li>For connected systems, decide whether tension is internal or external.</li></ul></div> : null}
    </div>
  );
}

export function Unit2FrqStations() {
  const stations = [
    ["Mathematical Routines", "A block slides right on a horizontal floor and is pulled right with horizontal tension T while kinetic friction acts left. Derive acceleration symbolically.", "Use an FBD, write ΣF_x = T - μ_kN = ma, and solve for a. If horizontal, N = mg."],
    ["Translation Between Representations", "Translate a box-on-incline scenario into an FBD, component equation, and verbal conclusion.", "Forces are weight, normal, and possible friction; resolve weight into parallel/perpendicular components before equations."],
    ["Experimental Design and Analysis", "Design an experiment to determine spring constant.", "Measure force for several displacements, graph F vs x, and use slope magnitude as k."],
    ["Qualitative/Quantitative Translation", "Predict how centripetal force changes if speed doubles.", "Qualitatively faster turning requires much more inward force; quantitatively F ∝ v², so it quadruples."],
  ];
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [shown, setShown] = useState<Record<string, boolean>>({});
  return (
    <div className="comparison-grid">
      {stations.map(([title, prompt, model], index) => (
        <article className="interactive-card" key={title}>
          <p className="eyebrow">Station {index + 1}</p>
          <h3>{title}</h3>
          <p>{prompt}</p>
          <textarea onChange={(event) => setResponses((current) => ({ ...current, [title]: event.target.value }))} placeholder="Write your reasoning." value={responses[title] ?? ""} />
          <button className="button secondary" disabled={!(responses[title] ?? "").trim()} onClick={() => setShown((current) => ({ ...current, [title]: true }))} type="button">Show Model</button>
          {shown[title] ? <div className="feedback correct"><strong>Model</strong><p>{model}</p></div> : null}
        </article>
      ))}
    </div>
  );
}

export const unit2ReviewQuestionCount = reviewQuestions.length;
