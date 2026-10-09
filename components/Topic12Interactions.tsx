"use client";

import { PhysicsText } from "./PhysicsText";

import { useMemo, useState } from "react";

import { SvgArrowMarker, SvgVectorArrow } from "./SvgArrowMarker";

type Direction = "left" | "right";

const signed = (value: number) => (value > 0 ? `+${value}` : String(value));

function Axis({
  start,
  finish,
  current,
  path,
  label,
}: {
  start?: number;
  finish?: number;
  current?: number;
  path?: number[];
  label: string;
}) {
  const toX = (value: number) => 360 + value * 27;
  const values = Array.from({ length: 11 }, (_, index) => -10 + index * 2);
  const pathPoints = path?.map((value) => `${toX(value)},102`).join(" ");
  const markerId = label.replace(/[^a-zA-Z0-9_-]/g, "-");

  return (
    <figure className="physics-diagram motion-axis" aria-label={label}>
      <svg viewBox="0 0 720 180" role="img">
        <defs>
          <SvgArrowMarker id={`axis-arrow-${markerId}`} size="axis" />
          <SvgArrowMarker id={`axis-arrow-start-${markerId}`} direction="start" size="axis" />
        </defs>
        <line className="axis-line" x1="70" y1="122" x2="650" y2="122" markerStart={`url(#axis-arrow-start-${markerId})`} markerEnd={`url(#axis-arrow-${markerId})`} />
        {values.map((value) => (
          <g key={value}>
            <line className="origin-tick" x1={toX(value)} y1="110" x2={toX(value)} y2="134" />
            <text x={toX(value) - 12} y="160">{value}</text>
          </g>
        ))}
        {pathPoints ? <polyline className="path-line" points={pathPoints} /> : null}
        {start !== undefined ? (
          <g>
            <circle className="start-dot" cx={toX(start)} cy="122" r="8" />
            <text x={toX(start) - 30} y="24">start</text>
          </g>
        ) : null}
        {finish !== undefined ? (
          <g>
            <circle className="finish-dot" cx={toX(finish)} cy="122" r="8" />
            <text x={toX(finish) - 28} y="76">finish</text>
          </g>
        ) : null}
        {current !== undefined ? (
          <g className="car-marker">
            <rect x={toX(current) - 20} y="52" width="40" height="18" rx="7" />
            <circle cx={toX(current) - 11} cy="73" r="4" />
            <circle cx={toX(current) + 11} cy="73" r="4" />
          </g>
        ) : null}
      </svg>
      <figcaption>{label}</figcaption>
    </figure>
  );
}

function MotionArrows({ velocity, acceleration }: { velocity: Direction; acceleration: Direction }) {
  const speedingUp = velocity === acceleration;
  return (
    <figure className="physics-diagram arrow-comparison" aria-label="Velocity and acceleration direction comparison">
      <svg viewBox="0 0 620 170" role="img">
        <text x="355" y="85">car</text>
        <rect className="motion-car" x="280" y="62" width="62" height="26" rx="9" />
        <circle className="motion-wheel" cx="294" cy="92" r="5" />
        <circle className="motion-wheel" cx="328" cy="92" r="5" />
        <SvgVectorArrow className="vector-line" x1={310} y1={48} x2={velocity === "right" ? 470 : 150} y2={48} />
        <text x="268" y="34">velocity</text>
        <SvgVectorArrow className="result-vector" x1={310} y1={126} x2={acceleration === "right" ? 470 : 150} y2={126} />
        <text x="248" y="158">acceleration</text>
      </svg>
      <figcaption>{speedingUp ? "SPEEDING UP" : "SLOWING DOWN"}</figcaption>
    </figure>
  );
}

export function PositionExplorer() {
  const [position, setPosition] = useState(4);
  const update = (value: number) => setPosition(Math.min(10, Math.max(-10, value)));

  return (
    <div className="interactive-card">
      <label>
        Move the car: {signed(position)} m
        <input type="range" min="-10" max="10" value={position} onInput={(event) => update(Number(event.currentTarget.value))} onChange={(event) => update(Number(event.target.value))} />
      </label>
      <div className="magnitude-buttons">
        <button className="button secondary" type="button" onClick={() => update(position - 1)} disabled={position <= -10}>Left</button>
        <button className="button secondary" type="button" onClick={() => update(position + 1)} disabled={position >= 10}>Right</button>
      </div>
      <Axis current={position} label="Interactive position explorer from -10 meters to +10 meters" />
      <div className="result">
        <strong>Position: {position === 0 ? "0" : `${signed(position)}`} m</strong>
      </div>
    </div>
  );
}

export function DistanceDisplacementExplorer() {
  const [positions, setPositions] = useState([0]);
  const current = positions[positions.length - 1];
  const distance = positions.slice(1).reduce((sum, value, index) => sum + Math.abs(value - positions[index]), 0);
  const displacement = current - positions[0];
  const move = (delta: number) => {
    const next = Math.min(10, Math.max(-10, current + delta));
    if (next !== current) {
      setPositions([...positions, next]);
    }
  };

  return (
    <div className="interactive-card">
      <p>Build a trip with multiple stages. The display updates after every move.</p>
      <div className="magnitude-buttons">
        <button className="button secondary" type="button" onClick={() => move(-3)}>3 m left</button>
        <button className="button secondary" type="button" onClick={() => move(2)}>2 m right</button>
        <button className="button secondary" type="button" onClick={() => move(5)}>5 m right</button>
        <button className="button secondary" type="button" onClick={() => setPositions([0])}>Reset</button>
      </div>
      <Axis start={positions[0]} current={current} path={positions} label="Interactive distance and displacement path" />
      <div className="result-grid">
        <div><small>Distance traveled</small><strong>{distance} m</strong></div>
        <div><small>Displacement</small><strong>{signed(displacement)} m</strong></div>
      </div>
    </div>
  );
}

export function ReturningStartCheck() {
  const [distance, setDistance] = useState("");
  const [displacement, setDisplacement] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const distanceCorrect = distance.trim() === "400" || distance.trim().toLowerCase() === "400 m";
  const displacementCorrect = displacement.trim() === "0" || displacement.trim().toLowerCase() === "0 m";

  return (
    <div className="interactive-card">
      <label>
        What distance did the runner travel?
        <input value={distance} onChange={(event) => setDistance(event.target.value)} placeholder="Enter your answer with units" />
        <small>Example format: 25 m</small>
      </label>
      <label>
        What is the runner&apos;s displacement?
        <input value={displacement} onChange={(event) => setDisplacement(event.target.value)} placeholder="Enter your answer with units" />
        <small>Example format: -8 m</small>
      </label>
      <button className="button secondary" type="button" disabled={!distance || !displacement} onClick={() => setSubmitted(true)}>Check Both</button>
      {submitted ? (
        <div className={distanceCorrect && displacementCorrect ? "feedback correct" : "feedback incorrect"} role="status">
          <strong>{distanceCorrect && displacementCorrect ? "Correct" : "Keep thinking"}</strong>
          <p>Distance measures the path traveled. Displacement depends only on initial and final position. A full lap has distance 400 m and displacement 0 m.</p>
        </div>
      ) : null}
    </div>
  );
}

export function SpeedingExplorer() {
  const [velocity, setVelocity] = useState<Direction>("right");
  const [acceleration, setAcceleration] = useState<Direction>("right");
  const [rule, setRule] = useState(false);
  const speedingUp = velocity === acceleration;

  return (
    <div className="interactive-card">
      <p>Try different combinations. What pattern do you notice?</p>
      <div className="control-grid">
        <fieldset>
          <legend>Velocity direction</legend>
          <label><input type="radio" name="topic12-velocity" checked={velocity === "left"} onChange={() => setVelocity("left")} /> Left</label>
          <label><input type="radio" name="topic12-velocity" checked={velocity === "right"} onChange={() => setVelocity("right")} /> Right</label>
        </fieldset>
        <fieldset>
          <legend>Acceleration direction</legend>
          <label><input type="radio" name="topic12-acceleration" checked={acceleration === "left"} onChange={() => setAcceleration("left")} /> Left</label>
          <label><input type="radio" name="topic12-acceleration" checked={acceleration === "right"} onChange={() => setAcceleration("right")} /> Right</label>
        </fieldset>
      </div>
      <MotionArrows velocity={velocity} acceleration={acceleration} />
      <div className="result"><strong>{speedingUp ? "SPEEDING UP" : "SLOWING DOWN"}</strong></div>
      <button className="button secondary" type="button" onClick={() => setRule(true)}>Reveal Rule</button>
      {rule ? <div className="concept-callout">Same direction means speeding up. Opposite directions means slowing down.</div> : null}
    </div>
  );
}

export function MotionGraphSketch() {
  const [shape, setShape] = useState("increasing-line");
  const [submitted, setSubmitted] = useState(false);
  const points = shape === "increasing-line" ? "90,160 540,70" : shape === "increasing-curve" ? "90,170 210,150 360,108 540,58" : "90,80 540,80";
  const valid = shape !== "flat";

  return (
    <div className="interactive-card">
      <label>
        Choose a qualitative sketch:
        <select value={shape} onChange={(event) => { setShape(event.target.value); setSubmitted(false); }}>
          <option value="increasing-line">Increasing straight line</option>
          <option value="increasing-curve">Increasing curve</option>
          <option value="flat">Flat line</option>
        </select>
      </label>
      <figure className="physics-diagram motion-graph" aria-label="Position time graph sketch">
        <svg viewBox="0 0 620 220" role="img">
          <line className="axis-line" x1="70" y1="180" x2="570" y2="180" />
          <line className="axis-line" x1="70" y1="180" x2="70" y2="30" />
          <text x="250" y="210">Time</text>
          <text x="8" y="40">Position</text>
          <polyline className="result-vector graph-line" points={points} />
        </svg>
      </figure>
      <button className="button secondary" type="button" onClick={() => setSubmitted(true)}>Submit Sketch</button>
      {submitted ? (
        <div className={valid ? "feedback correct" : "feedback incorrect"} role="status">
          <strong>{valid ? "Valid qualitative graph" : "Try an increasing graph"}</strong>
          <p>Because the car continues moving in the positive direction, its position increases as time passes.</p>
        </div>
      ) : null}
    </div>
  );
}

const masteryQuestions = [
  { id: "displacement", skill: "Displacement", prompt: "A cart moves from -6 m to +2 m. What is its displacement?", choices: ["-8 m", "-4 m", "+4 m", "+8 m"], answer: "+8 m", section: "section-displacement" },
  { id: "distance", skill: "Distance vs. displacement", prompt: "A runner moves 12 m right and 12 m left. Which is correct?", choices: ["distance 0 m, displacement 24 m", "distance 24 m, displacement 0 m", "distance 12 m, displacement 12 m", "distance 0 m, displacement 0 m"], answer: "distance 24 m, displacement 0 m", section: "section-distance" },
  { id: "velocity", skill: "Average velocity", prompt: "An object has displacement -18 m over 6 s. What is its average velocity?", choices: ["-3 m/s", "+3 m/s", "-12 m/s", "+108 m/s"], answer: "-3 m/s", section: "section-velocity" },
  { id: "acceleration", skill: "Average acceleration", prompt: "Velocity changes from +3 m/s to +15 m/s in 4 s. What is average acceleration?", choices: ["+3 m/s²", "+4 m/s²", "+12 m/s²", "-3 m/s²"], answer: "+3 m/s²", section: "section-acceleration" },
  { id: "direction", skill: "Acceleration direction", prompt: "Velocity is +9 m/s and acceleration is -2 m/s². What happens to speed?", choices: ["speeding up", "slowing down", "not moving", "impossible"], answer: "slowing down", section: "section-speeding" },
  { id: "graph", skill: "Qualitative motion representation", prompt: "A position-time graph for motion in the positive direction should generally show position...", choices: ["increasing", "decreasing only", "always zero", "unrelated to time"], answer: "increasing", section: "section-graph" },
];

export function Topic12MasteryCheck() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [written, setWritten] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const score = useMemo(() => masteryQuestions.filter((question) => answers[question.id] === question.answer).length, [answers]);
  const weak = masteryQuestions.filter((question) => answers[question.id] !== question.answer);
  const label = score === masteryQuestions.length ? "All multiple-choice checks correct" : "Review incorrect multiple-choice answers";

  return (
    <section className="lesson-section" data-topic-completion={submitted && score === masteryQuestions.length ? "complete" : "incomplete"}>
      <p className="eyebrow">Topic Mastery Check</p>
      <h2>26. Topic Mastery Check</h2>
      <p>Answer all questions first. Multiple-choice answers are scored automatically; written work requires self-review after submission.</p>
      {masteryQuestions.map((question, index) => (
        <div className="interactive-card" key={question.id}>
          <p id={`${question.id}-prompt`}><strong>Question {index + 1}</strong> — <PhysicsText text={question.prompt} /></p>
          <div className="choice-grid" role="radiogroup" aria-labelledby={`${question.id}-prompt`}>
            {question.choices.map((choice, choiceIndex) => (
              <label key={choice}><input type="radio" name={`topic12-${question.id}`} checked={answers[question.id] === choice} onChange={() => { setAnswers({ ...answers, [question.id]: choice }); setSubmitted(false); }} /> <span><strong className="choice-letter">{String.fromCharCode(65 + choiceIndex)}.</strong> <PhysicsText text={choice} /></span></label>
            ))}
          </div>
        </div>
      ))}
      <div className="interactive-card">
        <p><strong>Question 7</strong> — A cart has velocity -4 m/s and acceleration -1 m/s². Explain whether it is speeding up or slowing down.</p>
        <textarea value={written} onChange={(event) => { setWritten(event.target.value); setSubmitted(false); }} placeholder="Justify using velocity and acceleration directions." />
      </div>
      <button className="button primary" type="button" disabled={masteryQuestions.some((question) => !answers[question.id]) || !written.trim()} onClick={() => setSubmitted(true)}>Submit Mastery Check</button>
      {submitted ? (
        <div className="result" role="status" data-mastery-score={score}>
          <h3>{score}/{masteryQuestions.length} — {label}</h3>
          <p><strong>Written response submitted — self-review required.</strong> It is excluded from the automatic score.</p>
          <p><strong>Model reasoning:</strong> Velocity and acceleration both point in the negative direction, so the velocity magnitude increases and the cart speeds up.</p>
          <div className="skill-feedback">
            <article><h4>Correct multiple-choice skills</h4><ul>{masteryQuestions.filter((question) => answers[question.id] === question.answer).map((question) => <li key={question.id}>✓ {question.skill}</li>)}</ul></article>
            <article><h4>Review Recommended</h4><ul>{weak.map((question) => <li key={question.id}>△ <a href={`#${question.section}`}>{question.skill}</a></li>)}</ul></article>
          </div>
          <button className="button secondary" type="button" onClick={() => { setAnswers({}); setWritten(""); setSubmitted(false); }}>Retry Mastery Check</button>
        </div>
      ) : null}
    </section>
  );
}
