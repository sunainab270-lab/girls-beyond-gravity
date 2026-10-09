"use client";

import Link from "next/link";
import { PhysicsText } from "./PhysicsText";
import { useEffect, useState } from "react";

import { SvgVectorArrow } from "./SvgArrowMarker";

type ChoiceQuestion = {
  answer: string;
  choices: string[];
  explanation: string;
  hint: string;
  id: string;
  prompt: string;
  skill?: string;
};

const round = (value: number, digits = 2) => Number(value.toFixed(digits));
const signed = (value: number, unit = "") => `${value > 0 ? "+" : ""}${round(value)}${unit}`;

function SuccessBurst({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <span className="success-burst" aria-hidden="true">
      {Array.from({ length: 10 }).map((_, index) => <i key={index} />)}
    </span>
  );
}

export function Unit2ChoiceCheck({ question }: { question: ChoiceQuestion }) {
  const [selected, setSelected] = useState("");
  const [checked, setChecked] = useState(false);
  const [complete, setComplete] = useState(false);
  const [celebrating, setCelebrating] = useState(false);
  const correct = selected === question.answer;

  useEffect(() => {
    if (!celebrating) return;
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
                if (choice !== question.answer) setComplete(false);
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

function ForceDiagramFrame({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <figure className="physics-diagram" aria-label={label}>
      <svg viewBox="0 0 720 360" role="img" aria-label={label}>
        <line className="axis-line" x1="80" y1="285" x2="640" y2="285" />
        {children}
      </svg>
    </figure>
  );
}

export function SystemBoundaryExplorer() {
  const [system, setSystem] = useState<"a" | "b" | "both">("both");
  const boundary = system === "a" ? { x: 165, w: 120 } : system === "b" ? { x: 430, w: 120 } : { x: 150, w: 420 };
  return (
    <div className="interactive-card">
      <p>Select the system. Interactions inside the dashed boundary are internal; interactions crossing the boundary are external.</p>
      <div className="lesson-nav">
        <button className={`button ${system === "a" ? "primary" : "secondary"}`} onClick={() => setSystem("a")} type="button">Cart A only</button>
        <button className={`button ${system === "b" ? "primary" : "secondary"}`} onClick={() => setSystem("b")} type="button">Cart B only</button>
        <button className={`button ${system === "both" ? "primary" : "secondary"}`} onClick={() => setSystem("both")} type="button">Both carts</button>
      </div>
      <ForceDiagramFrame label="System boundary explorer with two carts">
        <rect className="axis-guide" x={boundary.x} y="120" width={boundary.w} height="110" rx="20" strokeDasharray="9 8" />
        <rect className="motion-car" x="180" y="165" width="90" height="42" rx="12" />
        <rect className="motion-car" x="445" y="165" width="90" height="42" rx="12" />
        <circle className="motion-wheel" cx="205" cy="217" r="7" />
        <circle className="motion-wheel" cx="245" cy="217" r="7" />
        <circle className="motion-wheel" cx="470" cy="217" r="7" />
        <circle className="motion-wheel" cx="510" cy="217" r="7" />
        <line className="path-line" x1="270" y1="186" x2="445" y2="186" />
        <text x="200" y="152">Cart A</text>
        <text x="465" y="152">Cart B</text>
        <text x="268" y="94">system boundary</text>
      </ForceDiagramFrame>
      <div className="result-grid">
        <div><small>Internal interaction</small><strong>{system === "both" ? "A-B spring/rope" : "none shown"}</strong></div>
        <div><small>External interactions</small><strong>{system === "both" ? "ground, Earth, hand if applied" : "other cart, ground, Earth"}</strong></div>
      </div>
    </div>
  );
}

export function CenterOfMassExplorer() {
  const [m1, setM1] = useState(2);
  const [m2, setM2] = useState(5);
  const [x1, setX1] = useState(-4);
  const [x2, setX2] = useState(5);
  const xcm = round((m1 * x1 + m2 * x2) / (m1 + m2), 2);
  const toX = (x: number) => 360 + x * 36;

  return (
    <div className="interactive-card">
      <p>Move the masses and change their values. The center of mass is pulled toward the larger mass.</p>
      <div className="control-grid">
        <label>mass 1: {m1} kg<input max="8" min="1" onChange={(event) => setM1(Number(event.target.value))} type="range" value={m1} /></label>
        <label>mass 2: {m2} kg<input max="8" min="1" onChange={(event) => setM2(Number(event.target.value))} type="range" value={m2} /></label>
        <label>position 1: {signed(x1, " m")}<input max="8" min="-8" onChange={(event) => setX1(Number(event.target.value))} type="range" value={x1} /></label>
        <label>position 2: {signed(x2, " m")}<input max="8" min="-8" onChange={(event) => setX2(Number(event.target.value))} type="range" value={x2} /></label>
      </div>
      <ForceDiagramFrame label="Center of mass explorer">
        <line className="axis-line" x1="95" y1="180" x2="625" y2="180" />
        {[-8, -4, 0, 4, 8].map((x) => (
          <g key={x}>
            <line className="origin-tick" x1={toX(x)} y1="162" x2={toX(x)} y2="198" />
            <text x={toX(x) - 12} y="225">{x}</text>
          </g>
        ))}
        <circle className="start-dot" cx={toX(x1)} cy="180" r={8 + m1} />
        <circle className="finish-dot" cx={toX(x2)} cy="180" r={8 + m2} />
        <line className="path-line" x1={toX(xcm)} y1="110" x2={toX(xcm)} y2="250" />
        <text x={toX(xcm) - 44} y="96">center of mass</text>
      </ForceDiagramFrame>
      <div className="result-grid">
        <div><small>x_cm</small><strong>{signed(xcm, " m")}</strong></div>
        <div><small>relationship</small><strong>{m1 === m2 ? "midpoint for equal masses" : "closer to larger mass"}</strong></div>
      </div>
    </div>
  );
}

const forceOptions = ["weight", "normal", "tension", "friction", "applied force", "force of motion"];

export function FbdBuilder() {
  const [scenario, setScenario] = useState("book");
  const [forces, setForces] = useState<Record<string, boolean>>({ weight: true, normal: true });
  const valid = scenario === "book" ? ["weight", "normal"] : scenario === "hanging" ? ["weight", "tension"] : ["weight", "normal", "tension", "friction"];
  const selected = Object.keys(forces).filter((force) => forces[force]);
  const correct = selected.length === valid.length && selected.every((force) => valid.includes(force));
  const toggle = (force: string) => setForces((current) => ({ ...current, [force]: !current[force] }));
  const resetForScenario = (next: string) => {
    setScenario(next);
    setForces(next === "book" ? { weight: true, normal: true } : next === "hanging" ? { weight: true, tension: true } : { weight: true, normal: true, tension: true, friction: true });
  };

  return (
    <div className="interactive-card">
      <p>Select only real forces acting on the chosen object. Do not include motion or action-reaction partners.</p>
      <label>
        Scenario
        <select onChange={(event) => resetForScenario(event.target.value)} value={scenario}>
          <option value="book">book resting on table</option>
          <option value="hanging">hanging mass</option>
          <option value="pulled">box pulled by rope with friction</option>
        </select>
      </label>
      <div className="choice-grid">
        {forceOptions.map((force) => (
          <label key={force}><input checked={Boolean(forces[force])} onChange={() => toggle(force)} type="checkbox" /> {force}</label>
        ))}
      </div>
      <ForceDiagramFrame label="Free-body diagram builder">
        <rect className="motion-car" x="320" y="155" width="80" height="58" rx="12" />
        {forces.weight ? <><SvgVectorArrow className="vector-line" x1={360} y1={184} x2={360} y2={270} /><text x="374" y="248">F_g</text></> : null}
        {forces.normal ? <><SvgVectorArrow className="result-vector" x1={360} y1={184} x2={360} y2={98} /><text x="374" y="108">F_N</text></> : null}
        {forces.tension ? <><SvgVectorArrow className="secondary-vector" x1={360} y1={184} x2={scenario === "hanging" ? 360 : 525} y2={scenario === "hanging" ? 98 : 184} /><text x={scenario === "hanging" ? 340 : 456} y={scenario === "hanging" ? 112 : 162}>T</text></> : null}
        {forces.friction ? <><SvgVectorArrow className="vector-line" x1={320} y1={204} x2={210} y2={204} /><text x="230" y="230">f</text></> : null}
      </ForceDiagramFrame>
      <div className={correct ? "feedback correct" : "feedback incorrect"} role="status">
        <strong>{correct ? "Valid force set" : "Revise the force set"}</strong>
        <p>{correct ? "The selected forces are legitimate interactions acting on the object." : "Remove nonexistent forces such as force of motion and include only forces exerted on the selected object."}</p>
      </div>
    </div>
  );
}

export function ForcePairExplorer() {
  const [scenario, setScenario] = useState("wall");
  const data = {
    wall: ["person on wall", "wall on person"],
    collision: ["truck on car", "car on truck"],
    earth: ["Earth on object", "object on Earth"],
    skaters: ["skater A on skater B", "skater B on skater A"],
  } as const;
  const pair = data[scenario as keyof typeof data];
  return (
    <div className="interactive-card">
      <p>Select a scenario. Third-law partners always act on different objects and have equal magnitude, opposite direction.</p>
      <label>Scenario<select onChange={(event) => setScenario(event.target.value)} value={scenario}>{Object.keys(data).map((key) => <option key={key} value={key}>{key}</option>)}</select></label>
      <ForceDiagramFrame label="Newton third law force pair explorer">
        <rect className="motion-car" x="175" y="160" width="110" height="58" rx="14" />
        <rect className="motion-car" x="445" y="160" width="110" height="58" rx="14" />
        <SvgVectorArrow className="vector-line" x1={230} y1={189} x2={scenario === "earth" ? 350 : 110} y2={189} />
        <SvgVectorArrow className="result-vector" x1={500} y1={189} x2={scenario === "earth" ? 380 : 620} y2={189} />
        <text x="230" y="145" textAnchor="middle">{scenario === "wall" ? "person" : scenario === "collision" ? "truck" : scenario === "earth" ? "Earth" : "skater A"}</text>
        <text x="500" y="145" textAnchor="middle">{scenario === "wall" ? "wall" : scenario === "collision" ? "car" : scenario === "earth" ? "object" : "skater B"}</text>
      </ForceDiagramFrame>
      <div className="result-grid">
        <div><small>Force 1</small><strong>{pair[0]}</strong></div>
        <div><small>Third-law partner</small><strong>{pair[1]}</strong></div>
      </div>
    </div>
  );
}

export function ForceOffExplorer() {
  const [friction, setFriction] = useState(false);
  const [forceOn, setForceOn] = useState(true);
  const net = (forceOn ? 12 : 0) - (friction ? 4 : 0);
  const acceleration = net / 4;
  return (
    <div className="interactive-card">
      <p>Apply a force, then remove it. With no friction, the object keeps constant velocity. The object is sliding right at the instant shown; friction contributes 4 N left and the applied force contributes 12 N right. After force removal, friction slows it until it stops.</p>
      <div className="lesson-nav">
        <button className={`button ${forceOn ? "primary" : "secondary"}`} onClick={() => setForceOn(!forceOn)} type="button">{forceOn ? "Remove applied force" : "Apply force"}</button>
        <label><input checked={friction} onChange={(event) => setFriction(event.target.checked)} type="checkbox" /> friction enabled</label>
      </div>
      <ForceDiagramFrame label="Newton first law force-off explorer">
        <rect className="motion-car" x="310" y="190" width="100" height="54" rx="14" />
        {forceOn ? <SvgVectorArrow className="secondary-vector" x1={410} y1={217} x2={540} y2={217} /> : null}
        {friction ? <SvgVectorArrow className="vector-line" x1={310} y1={232} x2={230} y2={232} /> : null}
      </ForceDiagramFrame>
      <div className="result-grid">
        <div><small>Net force</small><strong>{signed(net, " N")}</strong></div>
        <div><small>Acceleration</small><strong>{signed(acceleration, " m/s²")}</strong></div>
        <div><small>Motion meaning</small><strong>{net === 0 ? "constant velocity" : "velocity changes"}</strong></div>
      </div>
    </div>
  );
}

export function NewtonSecondLab() {
  const [mass, setMass] = useState(4);
  const [applied, setApplied] = useState(18);
  const [friction, setFriction] = useState(6);
  const net = applied - friction;
  const acceleration = round(net / mass, 2);
  return (
    <div className="interactive-card">
      <p>Hold one variable steady and change another. Acceleration follows net force divided by mass. This snapshot assumes the box is sliding right, so kinetic friction points left even when acceleration is leftward.</p>
      <div className="control-grid">
        <label>mass: {mass} kg<input max="10" min="1" onChange={(event) => setMass(Number(event.target.value))} type="range" value={mass} /></label>
        <label>applied force: {applied} N<input max="40" min="0" onChange={(event) => setApplied(Number(event.target.value))} type="range" value={applied} /></label>
        <label>friction: {friction} N<input max="20" min="0" onChange={(event) => setFriction(Number(event.target.value))} type="range" value={friction} /></label>
      </div>
      <ForceDiagramFrame label="Newton second law lab">
        <rect className="motion-car" x="310" y="190" width="100" height="54" rx="14" />
        {applied > 0 ? <SvgVectorArrow className="secondary-vector" x1={410} y1={210} x2={410 + applied * 4} y2={210} /> : null}
        {friction > 0 ? <SvgVectorArrow className="vector-line" x1={310} y1={230} x2={310 - friction * 4} y2={230} /> : null}
        {net !== 0 ? <SvgVectorArrow className="result-vector" x1={360} y1={120} x2={360 + net * 5} y2={120} /> : null}
        <text x="294" y="105">net force</text>
      </ForceDiagramFrame>
      <div className="result-grid">
        <div><small>ΣF</small><strong>{signed(net, " N")}</strong></div>
        <div><small>mass</small><strong>{mass} kg</strong></div>
        <div><small>acceleration</small><strong>{signed(acceleration, " m/s²")}</strong></div>
      </div>
    </div>
  );
}

export function GravityExplorer() {
  const [m1, setM1] = useState(4);
  const [m2, setM2] = useState(6);
  const [r, setR] = useState(3);
  const relativeForce = round((m1 * m2) / (r * r), 2);
  return (
    <div className="interactive-card">
      <p>Explore proportional changes in F_g ∝ m₁m₂/r². The displayed force is scaled for comparison.</p>
      <div className="control-grid">
        <label>mass 1: {m1}<input max="10" min="1" onChange={(event) => setM1(Number(event.target.value))} type="range" value={m1} /></label>
        <label>mass 2: {m2}<input max="10" min="1" onChange={(event) => setM2(Number(event.target.value))} type="range" value={m2} /></label>
        <label>separation r: {r}<input max="8" min="1" onChange={(event) => setR(Number(event.target.value))} type="range" value={r} /></label>
      </div>
      <ForceDiagramFrame label="Universal gravitation explorer">
        <circle className="start-dot" cx={360 - r * 28} cy="170" r={12 + m1} />
        <circle className="finish-dot" cx={360 + r * 28} cy="170" r={12 + m2} />
        <SvgVectorArrow className="vector-line" x1={360 - r * 28 - 30} y1={170} x2={360 - r * 28 + 35} y2={170} />
        <SvgVectorArrow className="result-vector" x1={360 + r * 28 + 30} y1={170} x2={360 + r * 28 - 35} y2={170} />
        <text x="360" y="80" textAnchor="middle">equal and opposite attraction</text>
      </ForceDiagramFrame>
      <div className="result-grid">
        <div><small>relative F_g</small><strong>{relativeForce}</strong></div>
        <div><small>distance rule</small><strong>double r → one-fourth force</strong></div>
      </div>
    </div>
  );
}

export function FrictionBox() {
  const [applied, setApplied] = useState(12);
  const maxStatic = 20;
  const kinetic = 14;
  const moving = applied > maxStatic;
  const friction = moving ? kinetic : applied;
  const net = applied - friction;
  return (
    <div className="interactive-card">
      <p>Each slider setting models a new trial with the box initially at rest. Static friction adjusts up to 20 N; above that threshold sliding begins and kinetic friction is 14 N. Reducing the slider resets the trial rather than modeling a moving box slowing down.</p>
      <label>Applied force: {applied} N<input max="36" min="0" onChange={(event) => setApplied(Number(event.target.value))} type="range" value={applied} /></label>
      <ForceDiagramFrame label="Push the box friction explorer">
        <rect className="motion-car" x="310" y="190" width="100" height="54" rx="14" />
        {applied > 0 ? <SvgVectorArrow className="secondary-vector" x1={410} y1={210} x2={410 + applied * 4} y2={210} /> : null}
        {friction > 0 ? <SvgVectorArrow className="vector-line" x1={310} y1={232} x2={310 - friction * 4} y2={232} /> : null}
        <line className="axis-line" x1="90" y1="130" x2="280" y2="130" />
        <line className="axis-line" x1="90" y1="130" x2="90" y2="40" />
        <polyline className="path-line" points="90,130 190,50" />
        <line className="axis-guide" x1="190" y1="50" x2="190" y2="74" />
        <line className="path-line" x1="190" y1="74" x2="270" y2="74" />
        <circle className="finish-dot" cx={90 + applied * 5} cy={130 - friction * 4} r="5" />
        <text x="104" y="32">friction (N)</text>
        <text x="100" y="155">applied force (N)</text>
        <text x="196" y="49">20</text>
        <text x="76" y="146">0</text>
        <text x="190" y="146" textAnchor="middle">20</text>
        <text x="270" y="146" textAnchor="middle">36</text>
        <text x="240" y="94">14</text>
      </ForceDiagramFrame>
      <div className="result-grid">
        <div><small>state</small><strong>{moving ? "sliding: kinetic friction" : "not sliding: static friction"}</strong></div>
        <div><small>friction</small><strong>{friction} N</strong></div>
        <div><small>net force</small><strong>{net} N</strong></div>
      </div>
    </div>
  );
}

export function SpringExplorer() {
  const [k, setK] = useState(20);
  const [x, setX] = useState(0.3);
  const force = round(-k * x, 2);
  const springEnd = 350 + x * 130;
  const springPoints = Array.from({ length: 13 }, (_, index) => `${140 + (springEnd - 140) * index / 12},${index === 0 || index === 12 ? 180 : index % 2 ? 160 : 200}`).join(" ");
  return (
    <div className="interactive-card">
      <p>Stretch or compress the spring. The restoring force points opposite extension or compression from the relaxed length.</p>
      <div className="control-grid">
        <label>spring constant k: {k} N/m<input max="50" min="5" onChange={(event) => setK(Number(event.target.value))} type="range" value={k} /></label>
        <label>displacement x: {signed(x, " m")}<input max="1" min="-1" onChange={(event) => setX(Number(event.target.value))} step="0.1" type="range" value={x} /></label>
      </div>
      <ForceDiagramFrame label="Spring force explorer">
        <line className="axis-line" x1="130" y1="180" x2="620" y2="180" />
        <polyline className="path-line" points={springPoints} />
        <rect className="motion-car" x={350 + x * 130} y="155" width="70" height="50" rx="12" />
        {Math.abs(force) > 0.1 ? <SvgVectorArrow className="vector-line" x1={385 + x * 130} y1={125} x2={385 + x * 130 + force * 4} y2={125} /> : null}
        <line className="axis-guide" x1="350" y1="145" x2="350" y2="220" strokeDasharray="5 5" />
        <text x="350" y="245" textAnchor="middle">relaxed position (x = 0)</text>
      </ForceDiagramFrame>
      <div className="result-grid">
        <div><small>Hooke&apos;s law</small><strong>F_s = -kx</strong></div>
        <div><small>spring force</small><strong>{signed(force, " N")}</strong></div>
      </div>
    </div>
  );
}

export function CircularMotionLab() {
  const [speed, setSpeed] = useState(6);
  const [radius, setRadius] = useState(4);
  const [mass, setMass] = useState(2);
  const [angle, setAngle] = useState(40);
  const ac = round((speed * speed) / radius, 2);
  const inwardForce = round(mass * ac, 2);
  const radians = (angle * Math.PI) / 180;
  const cx = 360;
  const cy = 165;
  const scaleR = radius * 15;
  const px = cx + scaleR * Math.cos(radians);
  const py = cy + scaleR * Math.sin(radians);
  const tangentX = -Math.sin(radians);
  const tangentY = Math.cos(radians);
  return (
    <div className="interactive-card">
      <p>Centripetal means inward direction of net force, not a new physical force. Arrows show directions only; their lengths do not represent the displayed magnitudes.</p>
      <div className="control-grid">
        <label>speed: {speed} m/s<input max="12" min="1" onChange={(event) => setSpeed(Number(event.target.value))} type="range" value={speed} /></label>
        <label>radius: {radius} m<input max="7" min="2" onChange={(event) => setRadius(Number(event.target.value))} type="range" value={radius} /></label>
        <label>mass: {mass} kg<input max="6" min="1" onChange={(event) => setMass(Number(event.target.value))} type="range" value={mass} /></label>
        <label>position: {angle}°<input max="360" min="0" onChange={(event) => setAngle(Number(event.target.value))} type="range" value={angle} /></label>
      </div>
      <ForceDiagramFrame label="Circular motion lab">
        <circle className="axis-guide" cx={cx} cy={cy} r={scaleR} />
        <circle className="finish-dot" cx={px} cy={py} r="10" />
        <SvgVectorArrow className="secondary-vector" x1={px} y1={py} x2={px + tangentX * 60} y2={py + tangentY * 60} />
        <SvgVectorArrow className="result-vector" x1={px} y1={py} x2={cx} y2={cy} />
        <text x={px + tangentX * 70} y={Math.max(30, Math.min(320, py + tangentY * 70))} textAnchor="middle">v tangent</text>
        <text x={cx - 36} y={cy - 16}>a_c inward</text>
      </ForceDiagramFrame>
      <div className="result-grid">
        <div><small>a_c = v²/r</small><strong>{ac} m/s²</strong></div>
        <div><small>required inward net force</small><strong>{inwardForce} N</strong></div>
      </div>
    </div>
  );
}

export function Unit2MasteryCheck({ topicTitle, questions }: { topicTitle: string; questions: ChoiceQuestion[] }) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [written, setWritten] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const score = questions.filter((question) => answers[question.id] === question.answer).length;
  const total = questions.length;
  const weak = questions.filter((question) => answers[question.id] !== question.answer);
  const label = score === total ? "All multiple-choice checks correct" : "Review incorrect multiple-choice answers";

  return (
    <section className="lesson-section" data-topic-completion={submitted && score === total ? "complete" : "incomplete"}>
      <p className="eyebrow">Mastery Check</p>
      <h2>{topicTitle} Mastery Check</h2>
      <p>Answer all questions first. Feedback appears only after submission.</p>
      {questions.map((question, index) => (
        <div className="interactive-card" key={question.id}>
          <p id={`mastery-${question.id}-prompt`}><strong>Question {index + 1}</strong> - <PhysicsText text={question.prompt} /></p>
          <div className="choice-grid" role="radiogroup" aria-labelledby={`mastery-${question.id}-prompt`}>
            {question.choices.map((choice, choiceIndex) => (
              <label key={choice}><input checked={answers[question.id] === choice} name={`mastery-${question.id}`} onChange={() => { setAnswers((current) => ({ ...current, [question.id]: choice })); setSubmitted(false); }} type="radio" /><span><strong className="choice-letter">{String.fromCharCode(65 + choiceIndex)}.</strong> <PhysicsText text={choice} /></span></label>
            ))}
          </div>
        </div>
      ))}
      <div className="interactive-card">
        <p><strong>Written justification</strong> - Explain one physical principle from this topic and how a diagram or equation represents it.</p>
        <textarea onChange={(event) => { setWritten(event.target.value); setSubmitted(false); }} placeholder="Write a short AP-style justification." value={written} />
      </div>
      <button className="button primary" disabled={questions.some((question) => !answers[question.id]) || !written.trim()} onClick={() => setSubmitted(true)} type="button">Submit Mastery Check</button>
      {submitted ? (
        <div className="result" role="status" data-mastery-score={score}>
          <h3>{score}/{total} - {label}</h3>
          <p><strong>Written response submitted — self-review required.</strong> It is excluded from the automatic score. Compare your explanation with this lesson’s core ideas and worked example: name a physical principle, connect it to the diagram or equation, and check signs, assumptions, and units.</p>
          <div className="skill-feedback">
            <article><h4>Correct multiple-choice skills</h4><ul>{questions.filter((question) => answers[question.id] === question.answer).map((question) => <li key={question.id}>✓ {question.skill ?? question.id}</li>)}</ul></article>
            <article><h4>Review Recommended</h4><ul>{weak.map((question) => <li key={question.id}>△ {question.skill ?? question.id}</li>)}</ul></article>
          </div>
        </div>
      ) : null}
    </section>
  );
}

export function Unit2NavigationLinks({
  continueLabel = "Next",
  nextHref,
  previousHref,
}: {
  continueLabel?: string;
  nextHref: string;
  previousHref?: string;
}) {
  return (
    <div className="lesson-nav">
      {previousHref ? <Link className="button secondary" href={previousHref}>Previous</Link> : null}
      <Link className="button primary" href={nextHref}>{continueLabel}</Link>
    </div>
  );
}
