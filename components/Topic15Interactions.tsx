"use client";

import { PhysicsText } from "./PhysicsText";

import { useEffect, useMemo, useState } from "react";

import { SvgVectorArrow } from "./SvgArrowMarker";

type ChoiceQuestion = {
  answer: string;
  choices: string[];
  explanation: string;
  hint: string;
  id: string;
  prompt: string;
};

const round = (value: number, digits = 1) => Number(value.toFixed(digits));
const signed = (value: number, unit = "") => `${value > 0 ? "+" : ""}${round(value)}${unit}`;
const componentStatus = (value: number) => (value > 0 ? "positive" : value < 0 ? "negative" : "zero");
const toPlaneX = (x: number) => 360 + x * 10;
const toPlaneY = (y: number) => 210 - y * 10;

function SuccessBurst({ show }: { show: boolean }) {
  if (!show) {
    return null;
  }

  return (
    <span className="success-burst" aria-hidden="true">
      {Array.from({ length: 10 }).map((_, index) => (
        <i key={index} />
      ))}
    </span>
  );
}

export function Topic15ChoiceCheck({ question }: { question: ChoiceQuestion }) {
  const [selected, setSelected] = useState("");
  const [checked, setChecked] = useState(false);
  const [complete, setComplete] = useState(false);
  const [celebrating, setCelebrating] = useState(false);
  const correct = selected === question.answer;

  useEffect(() => {
    if (!celebrating) {
      return;
    }

    const timeout = window.setTimeout(() => setCelebrating(false), 1400);
    return () => window.clearTimeout(timeout);
  }, [celebrating]);

  return (
    <div className={`interactive-card choice-card${complete ? " completed" : ""}`}>
      <SuccessBurst show={celebrating} />
      <p id={`${question.id}-prompt`}><PhysicsText text={question.prompt} /></p>
      <div className="choice-grid" role="radiogroup" aria-labelledby={`${question.id}-prompt`}>
        {question.choices.map((choice, choiceIndex) => (
          <label key={choice}>
            <input
              checked={selected === choice}
              name={question.id}
              onChange={() => {
                setSelected(choice);
                setChecked(false);
                if (choice !== question.answer) {
                  setComplete(false);
                }
              }}
              type="radio"
            />
            <span><strong className="choice-letter">{String.fromCharCode(65 + choiceIndex)}.</strong> <PhysicsText text={choice} /></span>
          </label>
        ))}
      </div>
      <button
        className="button secondary"
        disabled={!selected}
        onClick={() => {
          setChecked(true);
          if (correct) {
            setComplete(true);
            setCelebrating(true);
          }
        }}
        type="button"
      >
        Check Answer
      </button>
      {checked ? (
        <div className={correct ? "feedback correct" : "feedback incorrect"} role="status">
          <strong>{correct ? "Correct" : "Not quite. Try again."}</strong>
          <p>{correct ? question.explanation : question.hint}</p>
        </div>
      ) : null}
    </div>
  );
}

function CoordinatePlane({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <figure className="physics-diagram" aria-label={label}>
      <svg viewBox="0 0 720 420" role="img">
        <line className="axis-line" x1="90" y1="210" x2="630" y2="210" />
        <line className="axis-line" x1="360" y1="45" x2="360" y2="375" />
        <text x="610" y="238">+x</text>
        <text x="318" y="62">+y</text>
        <text x="102" y="238">-x</text>
        <text x="318" y="366">-y</text>
        {[120, 180, 240, 300, 420, 480, 540, 600].map((x) => (
          <line className="axis-guide" key={`x-${x}`} x1={x} y1="55" x2={x} y2="365" />
        ))}
        {[66, 114, 162, 258, 306, 354].map((y) => (
          <line className="axis-guide" key={`y-${y}`} x1="100" y1={y} x2="620" y2={y} />
        ))}
        {children}
      </svg>
    </figure>
  );
}

export function VectorComponentExplorer() {
  const [magnitude, setMagnitude] = useState(10);
  const [angle, setAngle] = useState(35);
  const radians = (angle * Math.PI) / 180;
  const ax = round(magnitude * Math.cos(radians), 2);
  const ay = round(magnitude * Math.sin(radians), 2);
  const endX = toPlaneX(ax);
  const endY = toPlaneY(ay);

  return (
    <div className="interactive-card">
      <p>Change the vector. The diagonal vector and both perpendicular components update together.</p>
      <div className="control-grid">
        <label>
          Magnitude: {magnitude} units
          <input max="14" min="2" onChange={(event) => setMagnitude(Number(event.target.value))} type="range" value={magnitude} />
        </label>
        <label>
          Direction: {angle}°
          <input max="180" min="-180" onChange={(event) => setAngle(Number(event.target.value))} type="range" value={angle} />
        </label>
      </div>
      <CoordinatePlane label="Interactive vector component explorer">
        <line className="axis-guide" x1="360" y1={endY} x2={endX} y2={endY} />
        <line className="axis-guide" x1={endX} y1="210" x2={endX} y2={endY} />
        {Math.abs(ax) > 0.2 ? <SvgVectorArrow className="secondary-vector" x1={360} y1={210} x2={endX} y2={210} /> : null}
        {Math.abs(ay) > 0.2 ? <SvgVectorArrow className="result-vector" x1={endX} y1={210} x2={endX} y2={endY} /> : null}
        <SvgVectorArrow className="vector-line" x1={360} y1={210} x2={endX} y2={endY} />
        <circle className="finish-dot" cx={endX} cy={endY} r="8" />
        <text x={Math.min(610, Math.max(90, endX + 10))} y={Math.min(365, Math.max(55, endY - 10))}>A</text>
        <text x={Math.min(580, Math.max(100, (360 + endX) / 2 - 24))} y="275">A_x</text>
        <text x={Math.min(600, Math.max(100, endX + 12))} y={Math.min(350, Math.max(75, (210 + endY) / 2))}>A_y</text>
      </CoordinatePlane>
      <div className="result-grid">
        <div><small>Magnitude</small><strong>{magnitude} units</strong></div>
        <div><small>Angle</small><strong>{angle}° from +x</strong></div>
        <div><small>Horizontal component</small><strong>{signed(ax)} units</strong></div>
        <div><small>Vertical component</small><strong>{signed(ay)} units</strong></div>
      </div>
    </div>
  );
}

export function ComponentCalculationCheck() {
  const [selected, setSelected] = useState("");
  const [component, setComponent] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const largerCorrect = selected === "vertical";
  const cleaned = component.replace(/\s+/g, "").toLowerCase();
  const componentCorrect = ["10m", "10", "+10m", "+10"].includes(cleaned);
  const allCorrect = largerCorrect && componentCorrect;

  return (
    <div className="interactive-card">
      <p>A 20 m vector points 60° above +x.</p>
      <fieldset>
        <legend>Which component is larger?</legend>
        <label><input checked={selected === "horizontal"} name="topic15-qc1-large" onChange={() => { setSelected("horizontal"); setSubmitted(false); }} type="radio" /> Horizontal component</label>
        <label><input checked={selected === "vertical"} name="topic15-qc1-large" onChange={() => { setSelected("vertical"); setSubmitted(false); }} type="radio" /> Vertical component</label>
      </fieldset>
      <label>
        Calculate the horizontal component.
        <input onChange={(event) => { setComponent(event.target.value); setSubmitted(false); }} placeholder="Enter component with units" value={component} />
        <small>Example format: -6 m</small>
      </label>
      <button className="button secondary" disabled={!selected || !component.trim()} onClick={() => setSubmitted(true)} type="button">Check Answer</button>
      {submitted ? (
        <div className={allCorrect ? "feedback correct" : "feedback incorrect"} role="status">
          <strong>{allCorrect ? "Correct" : "Try again."}</strong>
          <p>
            {allCorrect
              ? "At 60°, the vertical component is larger. The horizontal component is A_x = 20 cos 60° = 10 m."
              : "Since the angle is closer to vertical than horizontal, the vertical component should be larger. For A_x, use the side adjacent to the angle from +x."}
          </p>
        </div>
      ) : null}
    </div>
  );
}

export function ComponentSignsExplorer() {
  const [x, setX] = useState(-5);
  const [y, setY] = useState(6);
  const endpointX = toPlaneX(x);
  const endpointY = toPlaneY(y);

  return (
    <div className="interactive-card">
      <p>Move the vector endpoint around the coordinate plane. Watch the signs change from physical direction.</p>
      <div className="control-grid">
        <label>
          Endpoint x: {signed(x)}
          <input max="10" min="-10" onChange={(event) => setX(Number(event.target.value))} type="range" value={x} />
        </label>
        <label>
          Endpoint y: {signed(y)}
          <input max="7" min="-7" onChange={(event) => setY(Number(event.target.value))} type="range" value={y} />
        </label>
      </div>
      <CoordinatePlane label="Component sign explorer">
        <SvgVectorArrow className="vector-line" x1={360} y1={210} x2={endpointX} y2={endpointY} />
        <SvgVectorArrow className="secondary-vector" x1={360} y1={210} x2={endpointX} y2={210} />
        <SvgVectorArrow className="result-vector" x1={endpointX} y1={210} x2={endpointX} y2={endpointY} />
        <circle className="finish-dot" cx={endpointX} cy={endpointY} r="8" />
      </CoordinatePlane>
      <div className="result-grid">
        <div><small>x-component</small><strong>{componentStatus(x)} ({signed(x)})</strong></div>
        <div><small>y-component</small><strong>{componentStatus(y)} ({signed(y)})</strong></div>
      </div>
    </div>
  );
}

export function VectorAdditionLab() {
  const [a, setA] = useState({ x: 5, y: 3 });
  const [b, setB] = useState({ x: -2, y: 4 });
  const r = { x: a.x + b.x, y: a.y + b.y };
  const magnitude = round(Math.hypot(r.x, r.y), 2);
  const angle = round((Math.atan2(r.y, r.x) * 180) / Math.PI, 1);

  return (
    <div className="interactive-card">
      <p>Adjust the components of vectors A and B. The resultant R is built from component sums.</p>
      <div className="control-grid">
        <label>A_x: {signed(a.x)}<input max="8" min="-8" onChange={(event) => setA((current) => ({ ...current, x: Number(event.target.value) }))} type="range" value={a.x} /></label>
        <label>A_y: {signed(a.y)}<input max="7" min="-7" onChange={(event) => setA((current) => ({ ...current, y: Number(event.target.value) }))} type="range" value={a.y} /></label>
        <label>B_x: {signed(b.x)}<input max="8" min="-8" onChange={(event) => setB((current) => ({ ...current, x: Number(event.target.value) }))} type="range" value={b.x} /></label>
        <label>B_y: {signed(b.y)}<input max="7" min="-7" onChange={(event) => setB((current) => ({ ...current, y: Number(event.target.value) }))} type="range" value={b.y} /></label>
      </div>
      <CoordinatePlane label="Vector addition lab">
        <SvgVectorArrow className="vector-line" x1={360} y1={210} x2={toPlaneX(a.x)} y2={toPlaneY(a.y)} />
        <text x={toPlaneX(a.x) + 8} y={toPlaneY(a.y) - 8}>A</text>
        <SvgVectorArrow className="secondary-vector" x1={toPlaneX(a.x)} y1={toPlaneY(a.y)} x2={toPlaneX(a.x + b.x)} y2={toPlaneY(a.y + b.y)} />
        <text x={toPlaneX(a.x + b.x) + 8} y={toPlaneY(a.y + b.y) + 20}>B</text>
        <SvgVectorArrow className="result-vector" x1={360} y1={210} x2={toPlaneX(r.x)} y2={toPlaneY(r.y)} />
        <text x={toPlaneX(r.x) - 22} y={toPlaneY(r.y) - 18}>R</text>
      </CoordinatePlane>
      <div className="result-grid">
        <div><small>R_x</small><strong>{signed(r.x)}</strong></div>
        <div><small>R_y</small><strong>{signed(r.y)}</strong></div>
        <div><small>|R|</small><strong>{magnitude}</strong></div>
        <div><small>Direction</small><strong>{magnitude === 0 ? "Undefined for a zero vector" : `${angle}° from +x`}</strong></div>
      </div>
      <button className="button secondary" onClick={() => { setA({ x: 5, y: 3 }); setB({ x: -2, y: 4 }); }} type="button">Reset</button>
    </div>
  );
}

export function ProjectileMotionExplorer() {
  const [vx0, setVx0] = useState(8);
  const [vy0, setVy0] = useState(12);
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [showVectors, setShowVectors] = useState(true);
  const g = 9.8;
  const x = vx0 * time;
  const y = Math.max(0, vy0 * time - 0.5 * g * time * time);
  const vy = vy0 - g * time;
  const maxTime = (2 * vy0) / g;
  // One length scale keeps the physical trajectory undistorted and inside the canvas.
  const scale = Math.min(12, 450 / (vx0 * maxTime), 230 / (vy0 * vy0 / (2 * g)));
  const px = 95 + x * scale;
  const py = 330 - y * scale;

  useEffect(() => {
    if (!running) {
      return;
    }

    const interval = window.setInterval(() => {
      setTime((current) => {
        const next = round(current + 0.1, 1);
        if (next >= maxTime) {
          setRunning(false);
          return maxTime;
        }
        return next;
      });
    }, 120);
    return () => window.clearInterval(interval);
  }, [running, maxTime]);

  const path = useMemo(() => {
    const points = [];
    for (let sample = 0; sample <= 28; sample += 1) {
      const t = sample * maxTime / 28;
      points.push(`${95 + vx0 * t * scale},${330 - Math.max(0, vy0 * t - 0.5 * g * t * t) * scale}`);
    }
    return points.join(" ");
  }, [maxTime, scale, vx0, vy0]);

  return (
    <div className="interactive-card">
      <p>Change the initial velocity components. Horizontal velocity stays constant while vertical velocity changes due to gravity. The flight ends on return to the launch level; neglect air resistance. Position uses one scale in both directions; arrows show velocity and acceleration separately.</p>
      <div className="control-grid">
        <label>Initial horizontal velocity: {vx0} m/s<input max="14" min="2" onChange={(event) => { setVx0(Number(event.target.value)); setTime(0); setRunning(false); }} type="range" value={vx0} /></label>
        <label>Initial vertical velocity: {vy0} m/s<input max="18" min="1" onChange={(event) => { setVy0(Number(event.target.value)); setTime(0); setRunning(false); }} type="range" value={vy0} /></label>
      </div>
      <div className="lesson-nav">
        <button className="button secondary" onClick={() => { if (time >= maxTime) setTime(0); setRunning(true); }} type="button">Play</button>
        <button className="button secondary" onClick={() => setRunning(false)} type="button">Pause</button>
        <button className="button secondary" onClick={() => { setTime(0); setRunning(false); }} type="button">Reset</button>
        <label><input checked={showVectors} onChange={(event) => setShowVectors(event.target.checked)} type="checkbox" /> Show vectors</label>
      </div>
      <figure className="physics-diagram" aria-label="Projectile motion explorer">
        <svg viewBox="0 0 720 440" role="img">
          <line className="axis-line" x1="70" y1="330" x2="650" y2="330" />
          <line className="axis-line" x1="95" y1="55" x2="95" y2="340" />
          <polyline className="path-line" points={path} />
          <circle className="finish-dot" cx={px} cy={py} r="9" />
          {showVectors ? (
            <>
              <SvgVectorArrow className="secondary-vector" x1={px} y1={py} x2={px + vx0 * 7} y2={py} />
              {Math.abs(vy) > 0.4 ? <SvgVectorArrow className="vector-line" x1={px} y1={py} x2={px} y2={py - vy * 4} /> : null}
              <SvgVectorArrow className="result-vector" x1={px} y1={py} x2={px} y2={py + 70} />
              <text x={px + vx0 * 3.5} y={py - 12}>v_x</text>
              <text x={px - 36} y={py - vy * 2}>v_y</text>
              <text x={px + 12} y={py + 78}>a_y</text>
            </>
          ) : null}
        </svg>
      </figure>
      <div className="result-grid">
        <div><small>time</small><strong>{round(time, 1)} s</strong></div>
        <div><small>x</small><strong>{round(x, 1)} m</strong></div>
        <div><small>y</small><strong>{round(y, 1)} m</strong></div>
        <div><small>v_x</small><strong>{vx0} m/s</strong></div>
        <div><small>v_y</small><strong>{signed(vy, " m/s")}</strong></div>
        <div><small>a_y</small><strong>-9.8 m/s²</strong></div>
      </div>
    </div>
  );
}

export function DropComparison() {
  const [prediction, setPrediction] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const y = 62 + 0.5 * 9.8 * time * time * 11;
  const xB = 410 + 12 * time * 6;
  const landingTime = Math.sqrt(2 * (300 - 62) / (9.8 * 11));
  const hit = time >= landingTime - 1e-9;

  useEffect(() => {
    if (!running) {
      return;
    }

    const interval = window.setInterval(() => {
      setTime((current) => {
        const next = round(current + 0.1, 1);
        if (next >= landingTime) {
          setRunning(false);
          return landingTime;
        }
        return next;
      });
    }, 120);
    return () => window.clearInterval(interval);
  }, [running, landingTime]);

  return (
    <div className="interactive-card">
      <p>Predict first: Ball A is dropped. Ball B is launched horizontally from the same height at the same instant. Neglect air resistance.</p>
      <div className="choice-grid">
        {["Ball A hits first", "Ball B hits first", "They hit at the same time"].map((choice) => (
          <label key={choice}><input checked={prediction === choice} name="drop-prediction" onChange={() => { setPrediction(choice); setRevealed(false); }} type="radio" /> {choice}</label>
        ))}
      </div>
      <div className="lesson-nav">
        <button className="button secondary" disabled={!prediction} onClick={() => { setRevealed(true); setRunning(true); setTime(0); }} type="button">Run Comparison</button>
        <button className="button secondary" onClick={() => { setTime(0); setRunning(false); }} type="button">Reset</button>
      </div>
      <figure className="physics-diagram" aria-label="Drop and horizontal launch comparison">
        <svg viewBox="0 0 720 360" role="img">
          <line className="axis-line" x1="70" y1="310" x2="650" y2="310" />
          <rect className="axis-guide" x="120" y="55" width="480" height="14" rx="7" />
          <circle className="start-dot" cx="235" cy={Math.min(y, 300)} r="11" />
          <circle className="finish-dot" cx={xB} cy={Math.min(y, 300)} r="11" />
          <text x="205" y="42">A dropped</text>
          <text x="384" y="42">B launched horizontally</text>
          {hit ? <text x="180" y="342">Both balls reach the ground together</text> : null}
        </svg>
      </figure>
      {revealed ? (
        <div className="feedback correct" role="status">
          <strong>They hit at the same time.</strong>
          <p>Their vertical motion is identical: same initial vertical velocity, same vertical acceleration, and same vertical displacement.</p>
        </div>
      ) : null}
    </div>
  );
}

export function GraphConstructionActivity() {
  const [xGraph, setXGraph] = useState("linear");
  const [yGraph, setYGraph] = useState("curve-down");
  const [vxGraph, setVxGraph] = useState("constant-positive");
  const [vyGraph, setVyGraph] = useState("decreasing");
  const [submitted, setSubmitted] = useState(false);
  const correct = xGraph === "linear" && yGraph === "curve-down" && vxGraph === "constant-positive" && vyGraph === "decreasing";

  return (
    <div className="interactive-card">
      <p>Sign convention: +x is right and +y is upward. A ball is launched horizontally to the right from a table; neglect air resistance.</p>
      <div className="control-grid">
        <label>x-position vs time<select onChange={(event) => { setXGraph(event.target.value); setSubmitted(false); }} value={xGraph}><option value="linear">increases linearly</option><option value="flat">stays constant</option><option value="curve-down">curves downward</option></select></label>
        <label>y-position vs time<select onChange={(event) => { setYGraph(event.target.value); setSubmitted(false); }} value={yGraph}><option value="linear">increases linearly</option><option value="flat">stays constant</option><option value="curve-down">curves downward</option></select></label>
        <label>v_x vs time<select onChange={(event) => { setVxGraph(event.target.value); setSubmitted(false); }} value={vxGraph}><option value="constant-positive">constant positive</option><option value="decreasing">decreases</option><option value="zero">zero</option></select></label>
        <label>v_y vs time<select onChange={(event) => { setVyGraph(event.target.value); setSubmitted(false); }} value={vyGraph}><option value="constant-positive">constant positive</option><option value="decreasing">decreases</option><option value="zero">zero</option></select></label>
      </div>
      <button className="button secondary" onClick={() => setSubmitted(true)} type="button">Check Graph Set</button>
      {submitted ? (
        <div className={correct ? "feedback correct" : "feedback incorrect"} role="status">
          <strong>{correct ? "Valid graph family" : "Revise at least one graph."}</strong>
          <p>For a horizontal launch, x increases linearly, y curves downward, v_x is constant positive, and v_y decreases because acceleration is downward.</p>
        </div>
      ) : null}
    </div>
  );
}

export function ExperimentalReasoning() {
  const [response, setResponse] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="interactive-card">
      <label>
        Design the logic for measuring horizontal launch speed from a table.
        <textarea onChange={(event) => { setResponse(event.target.value); setSubmitted(false); }} placeholder="Describe measurements, time of flight, and horizontal speed calculation." value={response} />
      </label>
      <button className="button secondary" disabled={!response.trim()} onClick={() => setSubmitted(true)} type="button">Reveal Model Method</button>
      {submitted ? (
        <div className="feedback correct" role="status">
          <strong>Model method</strong>
          <p>Measure table height h and horizontal range x. Use vertical motion to find time, t = sqrt(2h/g), then calculate horizontal launch speed with v_x = x/t. Repeat trials and average the range to reduce random uncertainty.</p>
        </div>
      ) : null}
    </div>
  );
}

const masteryQuestions = [
  { id: "components", skill: "Vector Components", section: "section-components", answer: "A_x = A cos θ and A_y = A sin θ", prompt: "If θ is measured from +x, which component relationship is correct?", choices: ["A_x = A sin θ and A_y = A cos θ", "A_x = A cos θ and A_y = A sin θ", "A_x = A tan θ and A_y = A / tan θ", "A_x = A_y"] },
  { id: "signs", skill: "Component Signs", section: "section-signs", answer: "x negative, y positive", prompt: "A vector points up and left. What are the component signs?", choices: ["x positive, y positive", "x negative, y positive", "x negative, y negative", "x positive, y negative"] },
  { id: "resultant", skill: "Resultant Magnitude", section: "section-rebuilding", answer: "5 units", prompt: "A vector has components +3 and +4. What is its magnitude?", choices: ["1 unit", "5 units", "7 units", "12 units"] },
  { id: "direction", skill: "Resultant Direction", section: "section-rebuilding", answer: "Quadrant IV", prompt: "A vector has A_x > 0 and A_y < 0. Which quadrant contains the vector?", choices: ["Quadrant I", "Quadrant II", "Quadrant III", "Quadrant IV"] },
  { id: "independent", skill: "Independent Components", section: "section-independent", answer: "Analyze x and y separately using the same time", prompt: "What is the central strategy for projectile motion?", choices: ["Use only the curved path", "Analyze x and y separately using the same time", "Ignore vertical motion", "Assume velocity is zero at the top"] },
  { id: "projectile", skill: "Projectile Reasoning", section: "section-drop-comparison", answer: "They hit at the same time", prompt: "Two balls leave the same height at the same instant and land at the same level. One is dropped; one is launched horizontally. Neglect air resistance. Which hits first?", choices: ["Dropped ball", "Launched ball", "They hit at the same time", "It depends on horizontal speed"] },
  { id: "graph", skill: "Graph Translation", section: "section-graphs", answer: "Horizontal velocity is constant", prompt: "For ideal projectile motion, which graph statement is true?", choices: ["Horizontal velocity is constant", "Horizontal velocity decreases", "Vertical acceleration is zero", "Vertical velocity stays constant"] },
];

export function Topic15MasteryCheck() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [written, setWritten] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const score = masteryQuestions.filter((question) => answers[question.id] === question.answer).length;
  const weak = masteryQuestions.filter((question) => answers[question.id] !== question.answer);
  const label = score === masteryQuestions.length ? "All multiple-choice checks correct" : "Review incorrect multiple-choice answers";

  return (
    <section className="lesson-section" data-topic-completion={submitted && score === masteryQuestions.length ? "complete" : "incomplete"}>
      <p className="eyebrow">Topic Mastery Check</p>
      <h2>24. Topic 1.5 Mastery Check</h2>
      <p>Answer all eight questions first. Multiple-choice answers are scored automatically; written work requires self-review after submission.</p>
      {masteryQuestions.map((question, index) => (
        <div className="interactive-card" key={question.id}>
          <p id={`${question.id}-prompt`}><strong>Question {index + 1}</strong> - <PhysicsText text={question.prompt} /></p>
          <div className="choice-grid" role="radiogroup" aria-labelledby={`${question.id}-prompt`}>
            {question.choices.map((choice, choiceIndex) => (
              <label key={choice}>
                <input checked={answers[question.id] === choice} name={`topic15-mastery-${question.id}`} onChange={() => { setAnswers((current) => ({ ...current, [question.id]: choice })); setSubmitted(false); }} type="radio" />
                <span><strong className="choice-letter">{String.fromCharCode(65 + choiceIndex)}.</strong> <PhysicsText text={choice} /></span>
              </label>
            ))}
          </div>
        </div>
      ))}
      <div className="interactive-card">
        <p><strong>Question 8</strong> - Justify why a faster horizontal launch from the same height does not increase fall time.</p>
        <textarea onChange={(event) => { setWritten(event.target.value); setSubmitted(false); }} placeholder="Use independent components and shared time in your explanation." value={written} />
      </div>
      <button className="button primary" disabled={masteryQuestions.some((question) => !answers[question.id]) || !written.trim()} onClick={() => setSubmitted(true)} type="button">
        Submit Mastery Check
      </button>
      {submitted ? (
        <div className="result" role="status" data-mastery-score={score}>
          <h3>{score}/{masteryQuestions.length} - {label}</h3>
          <p><strong>Written response submitted — self-review required.</strong> It is excluded from the automatic score.</p>
          <p><strong>Model reasoning:</strong> With the same launch height, initial vertical velocity, and landing level, both projectiles have identical vertical motion and fall time. Horizontal speed changes range, while the same elapsed time applies to both components. Assume negligible air resistance.</p>
          <div className="skill-feedback">
            <article>
              <h4>Correct multiple-choice skills</h4>
              <ul>
                {masteryQuestions.filter((question) => answers[question.id] === question.answer).map((question) => <li key={question.id}>✓ {question.skill}</li>)}
                
              </ul>
            </article>
            <article>
              <h4>Review Recommended</h4>
              <ul>
                {weak.map((question) => <li key={question.id}>△ <a href={`#${question.section}`}>{question.skill}</a></li>)}
                
              </ul>
            </article>
          </div>
        </div>
      ) : null}
    </section>
  );
}
