"use client";

import { PhysicsText } from "./PhysicsText";

import { useEffect, useState } from "react";

type Direction = "left" | "right";
type MotionKind = "constant" | "speeding" | "slowing";

type ChoiceQuestion = {
  answer: string;
  choices: string[];
  explanation: string;
  hint: string;
  id: string;
  prompt: string;
};

const formatVelocityDirection = (velocity: number) =>
  velocity > 0 ? "positive direction" : velocity < 0 ? "negative direction" : "stationary";
const slopeLabel = (velocity: number) => (velocity > 0 ? "Positive" : velocity < 0 ? "Negative" : "Zero");

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

export function Topic13ChoiceCheck({ question }: { question: ChoiceQuestion }) {
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

export function PositionReadCheck() {
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [celebrating, setCelebrating] = useState(false);
  const correct = answer.trim().toLowerCase() === "6" || answer.trim().toLowerCase() === "6 m";

  useEffect(() => {
    if (!celebrating) {
      return;
    }

    const timeout = window.setTimeout(() => setCelebrating(false), 1400);
    return () => window.clearTimeout(timeout);
  }, [celebrating]);

  return (
    <div className={`interactive-card choice-card${correct && submitted ? " completed" : ""}`}>
      <SuccessBurst show={celebrating} />
      <label>
        Where is the object at t = 2 s?
        <input
          onChange={(event) => {
            setAnswer(event.target.value);
            setSubmitted(false);
          }}
          placeholder="Enter position with units"
          value={answer}
        />
        <small>Example format: 12 m</small>
      </label>
      <button
        className="button secondary"
        disabled={!answer.trim()}
        onClick={() => {
          setSubmitted(true);
          if (correct) {
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
          <p>
            {correct
              ? "At t = 2 s, the graph reaches x = 6 m. You read time first, trace upward to the graph, then trace across to position."
              : "Find 2 s on the horizontal axis first. Then trace upward to the graph."}
          </p>
        </div>
      ) : null}
    </div>
  );
}

export function GraphDisplacementCheck() {
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const cleaned = answer.replace(/\s+/g, "").toLowerCase();
  const correct = cleaned === "+8m" || cleaned === "8m" || cleaned === "+8" || cleaned === "8";

  return (
    <div className="interactive-card">
      <label>
        What is the object&apos;s displacement between t = 1 s and t = 5 s?
        <input
          onChange={(event) => {
            setAnswer(event.target.value);
            setSubmitted(false);
          }}
          placeholder="Enter displacement with units"
          value={answer}
        />
        <small>Example format: -3 m</small>
      </label>
      <button className="button secondary" disabled={!answer.trim()} onClick={() => setSubmitted(true)} type="button">
        Check Answer
      </button>
      {submitted ? (
        <div className={correct ? "feedback correct" : "feedback incorrect"} role="status">
          <strong>{correct ? "Correct" : "Keep tracing the two positions."}</strong>
          <p>
            {correct
              ? "x_i = -2 m and x_f = +6 m. Δx = x_f - x_i = 6 - (-2) = +8 m, so the final position is 8 m in the positive direction from the initial position."
              : "Read the initial position at t = 1 s and the final position at t = 5 s, then use Δx = x_f - x_i."}
          </p>
        </div>
      ) : null}
    </div>
  );
}

function motionPositions(direction: Direction, motion: MotionKind) {
  const steps =
    motion === "constant"
      ? [0, 2, 4, 6, 8]
      : motion === "speeding"
        ? [0, 1, 3, 6, 10]
        : [0, 4, 7, 9, 10];
  const signedSteps = direction === "right" ? steps : steps.map((value) => -value);
  return signedSteps.map((value) => 300 + value * 22);
}

export function BuildMotionInteractive() {
  const [direction, setDirection] = useState<Direction>("right");
  const [motion, setMotion] = useState<MotionKind>("constant");
  const [frame, setFrame] = useState(4);
  const points = motionPositions(direction, motion);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setFrame((current) => (current >= 4 ? 0 : current + 1));
    }, 900);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="interactive-card">
      <p>Choose how the object moves. Watch how its motion diagram changes.</p>
      <div className="control-grid">
        <fieldset>
          <legend>Direction</legend>
          <label><input checked={direction === "left"} name="topic13-build-direction" onChange={() => setDirection("left")} type="radio" /> Left</label>
          <label><input checked={direction === "right"} name="topic13-build-direction" onChange={() => setDirection("right")} type="radio" /> Right</label>
        </fieldset>
        <fieldset>
          <legend>Motion</legend>
          <label><input checked={motion === "constant"} name="topic13-build-motion" onChange={() => setMotion("constant")} type="radio" /> Constant speed</label>
          <label><input checked={motion === "speeding"} name="topic13-build-motion" onChange={() => setMotion("speeding")} type="radio" /> Speeding up</label>
          <label><input checked={motion === "slowing"} name="topic13-build-motion" onChange={() => setMotion("slowing")} type="radio" /> Slowing down</label>
        </fieldset>
      </div>
      <figure className="physics-diagram topic13-track" aria-label="Build the motion diagram">
        <svg viewBox="0 0 720 180" role="img">
          <line className="axis-line" x1="90" y1="120" x2="630" y2="120" />
          <text x="82" y="150">-x</text>
          <text x="610" y="150">+x</text>
          {points.map((x, index) => (
            <g key={index}>
              <circle className={index <= frame ? "finish-dot" : "start-dot"} cx={x} cy="120" r={index <= frame ? 8 : 5} />
              <text x={x - 14} y={index % 2 ? 40 : 98}>t={index}s</text>
            </g>
          ))}
          <g className="car-marker">
            <rect x={points[frame] - 24} y="54" width="48" height="20" rx="8" />
            <circle cx={points[frame] - 13} cy="78" r="5" />
            <circle cx={points[frame] + 13} cy="78" r="5" />
          </g>
        </svg>
      </figure>
      <div className="result-grid">
        <div><small>Direction</small><strong>{direction === "right" ? "Positive" : "Negative"}</strong></div>
        <div><small>Speed behavior</small><strong>{motion === "constant" ? "Constant" : motion === "speeding" ? "Increasing" : "Decreasing"}</strong></div>
      </div>
      <button className="button secondary" onClick={() => setFrame(0)} type="button">Reset</button>
    </div>
  );
}

export function GraphMotionInteractive() {
  const [velocity, setVelocity] = useState(2);
  const [running, setRunning] = useState(false);
  const [time, setTime] = useState(0);
  const position = velocity * time - 2;
  const carX = 310 + position * 10;
  const graphEndY = 130 - position * 3;

  useEffect(() => {
    if (!running) {
      return;
    }

    const interval = window.setInterval(() => {
      setTime((current) => (current >= 5 ? 0 : Number((current + 0.5).toFixed(1))));
    }, 650);
    return () => window.clearInterval(interval);
  }, [running]);

  return (
    <div className="interactive-card graph-motion-card">
      <p>Change the object&apos;s velocity. Watch how its physical motion and graph change together.</p>
      <label>
        Velocity: {velocity} m/s
        <input
          max="4"
          min="-4"
          onChange={(event) => {
            setVelocity(Number(event.target.value));
            setTime(0);
          }}
          step="1"
          type="range"
          value={velocity}
        />
      </label>
      <div className="lesson-nav">
        <button className="button secondary" onClick={() => setRunning(true)} type="button">Play</button>
        <button className="button secondary" onClick={() => setRunning(false)} type="button">Pause</button>
        <button className="button secondary" onClick={() => { setTime(0); setRunning(false); }} type="button">Reset</button>
      </div>
      <div className="comparison-grid">
        <figure className="physics-diagram" aria-label="Physical position axis">
          <svg viewBox="0 0 620 210" role="img">
            <line className="axis-line" x1="70" y1="150" x2="550" y2="150" />
            <text x="68" y="180">-x</text>
            <text x="528" y="180">+x</text>
            <g className="car-marker">
              <rect x={carX - 26} y="88" width="52" height="22" rx="8" />
              <circle cx={carX - 14} cy="114" r="5" />
              <circle cx={carX + 14} cy="114" r="5" />
            </g>
            <text x={carX - 32} y="76">t = {time.toFixed(1)} s</text>
          </svg>
        </figure>
        <figure className="physics-diagram" aria-label="Synchronized position-time graph">
          <svg viewBox="0 0 620 290" role="img">
            <line className="axis-line" x1="80" y1="200" x2="550" y2="200" />
            <line className="axis-line" x1="80" y1="40" x2="80" y2="200" />
            <text x="255" y="272">Time, t (s)</text>
            <text x="12" y="38">Position, x (m)</text>
            <line className="axis-guide" x1="80" y1="130" x2="550" y2="130" />
            {[0, 1, 2, 3, 4, 5].map(t => <text key={t} x={74 + t * 76} y="230">{t}</text>)}
            {[-20, 0, 20].map(x => <text key={x} x="32" y={136 - x * 3}>{x}</text>)}
            <polyline className="result-vector graph-line" points={`80,136 ${80 + time * 76},${graphEndY}`} />
            <circle className="finish-dot" cx={80 + time * 76} cy={graphEndY} r="7" />
          </svg>
        </figure>
      </div>
      <div className="result-grid">
        <div><small>Direction</small><strong>{formatVelocityDirection(velocity)}</strong></div>
        <div><small>Graph slope</small><strong>{slopeLabel(velocity)}</strong></div>
      </div>
    </div>
  );
}

export function PredictionSimulation() {
  const [selected, setSelected] = useState("");
  const [ran, setRan] = useState(false);
  const correct = selected === "Negative slope";

  return (
    <div className="interactive-card">
      <p>If the car moves left at a constant velocity, what should the position-time graph look like?</p>
      <div className="choice-grid">
        {["Positive slope", "Negative slope", "Horizontal", "Vertical"].map((choice) => (
          <label key={choice}>
            <input checked={selected === choice} name="topic13-predict" onChange={() => { setSelected(choice); setRan(false); }} type="radio" />
            <PhysicsText text={choice} />
          </label>
        ))}
      </div>
      <button className="button secondary" disabled={!selected} onClick={() => setRan(true)} type="button">Run Simulation</button>
      {ran ? (
        <div className={correct ? "feedback correct" : "feedback incorrect"} role="status">
          <strong>{correct ? "Prediction confirmed" : "Observe the slope direction."}</strong>
          <p>The car moves left, so its position decreases as time increases. That produces a negative slope.</p>
        </div>
      ) : null}
    </div>
  );
}

export function RoadGraphMisconceptionCheck() {
  return (
    <Topic13ChoiceCheck
      question={{
        id: "road-graph-check",
        prompt: "The graph rises, becomes horizontal, then falls. Does this mean the object physically traveled uphill, stopped on a flat road, and then traveled downhill?",
        choices: ["Yes", "No"],
        answer: "No",
        hint: "Ask what the axes measure. The vertical axis is position, not height of a road.",
        explanation:
          "A position-time graph is not a picture of the road. Rising means position increases, horizontal means position is constant, and falling means position decreases.",
      }}
    />
  );
}

const graphChoices = [
  { id: "positive", label: "Straight line with positive slope" },
  { id: "negative", label: "Straight line with negative slope" },
  { id: "flat", label: "Horizontal line" },
  { id: "steeper-positive", label: "Steeper positive slope" },
];

const matchPrompts = [
  { id: "right", label: "Moving right at constant velocity", answer: "positive" },
  { id: "left", label: "Moving left at constant velocity", answer: "negative" },
  { id: "stationary", label: "Stationary", answer: "flat" },
  { id: "faster-right", label: "Moving right faster than another object", answer: "steeper-positive" },
];

export function MatchMotionInteractive() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const allAnswered = matchPrompts.every((prompt) => answers[prompt.id]);
  const correct = matchPrompts.every((prompt) => answers[prompt.id] === prompt.answer);

  return (
    <div className="interactive-card">
      <p>Match each verbal description to the graph that could represent it.</p>
      {matchPrompts.map((prompt) => {
        const isWrong = submitted && answers[prompt.id] !== prompt.answer;
        return (
          <label className={isWrong ? "feedback incorrect" : ""} key={prompt.id}>
            {prompt.label}
            <select
              onChange={(event) => {
                setAnswers((current) => ({ ...current, [prompt.id]: event.target.value }));
                setSubmitted(false);
              }}
              value={answers[prompt.id] ?? ""}
            >
              <option value="">Choose a graph</option>
              {graphChoices.map((choice) => (
                <option key={choice.id} value={choice.id}>{choice.label}</option>
              ))}
            </select>
          </label>
        );
      })}
      <button className="button secondary" disabled={!allAnswered} onClick={() => setSubmitted(true)} type="button">Check Answers</button>
      {submitted ? (
        <div className={correct ? "feedback correct" : "feedback incorrect"} role="status">
          <strong>{correct ? "All matched" : "Some matches need another look."}</strong>
          <p>
            {correct
              ? "Positive slope means moving right, negative slope means moving left, horizontal means stationary, and a larger slope magnitude means greater speed."
              : "Incorrect matches are highlighted. Use slope sign for direction and slope magnitude for speed."}
          </p>
        </div>
      ) : null}
    </div>
  );
}

export function DrawGraphActivity({ challenge = false }: { challenge?: boolean }) {
  const [start, setStart] = useState(challenge ? 2 : -2);
  const [middle, setMiddle] = useState(challenge ? 6 : 2);
  const [end, setEnd] = useState(challenge ? 0 : 6);
  const [submitted, setSubmitted] = useState(false);
  const valid = challenge
    ? middle > start && end < middle && Math.abs(end - middle) > Math.abs(middle - start)
    : start === -2 && end > start && middle === (start + end) / 2;

  return (
    <div className="interactive-card">
      <div className="control-grid">
        <label>Start position: {start} m<input max="8" min="-8" onChange={(event) => { setStart(Number(event.target.value)); setSubmitted(false); }} type="range" value={start} /></label>
        <label>Middle position: {middle} m<input max="8" min="-8" onChange={(event) => { setMiddle(Number(event.target.value)); setSubmitted(false); }} type="range" value={middle} /></label>
        <label>Final position: {end} m<input max="8" min="-8" onChange={(event) => { setEnd(Number(event.target.value)); setSubmitted(false); }} type="range" value={end} /></label>
      </div>
      <figure className="physics-diagram" aria-label="Student-built qualitative position-time graph">
        <svg viewBox="0 0 620 295" role="img">
          <line className="axis-line" x1="80" y1="210" x2="550" y2="210" />
          <line className="axis-line" x1="80" y1="40" x2="80" y2="210" />
          <text x="250" y="280">Time, t (s)</text>
          <text x="10" y="36">Position, x (m)</text>
          <line className="axis-guide" x1="80" y1="125" x2="550" y2="125" />
          {(challenge ? [0, 2, 3, 5] : [0, 2, 4]).map(t => <text key={t} x={74 + t * (challenge ? 94 : 117.5)} y="240">{t}</text>)}
          {[-8, 0, 8].map(x => <text key={x} x="32" y={131 - x * 9}>{x}</text>)}
          <polyline className="result-vector graph-line" points={challenge ? `80,${125 - start * 9} 268,${125 - middle * 9} 362,${125 - middle * 9} 550,${125 - end * 9}` : `80,${125 - start * 9} 315,${125 - middle * 9} 550,${125 - end * 9}`} />
          {[start, middle, end].map((value, index) => (
            <circle className="finish-dot" cx={challenge ? [80, 268, 550][index] : 80 + index * 235} cy={125 - value * 9} key={index} r="7" />
          ))}
        </svg>
      </figure>
      <button className="button secondary" onClick={() => setSubmitted(true)} type="button">Submit Sketch</button>
      {submitted ? (
        <div className={valid ? "feedback correct" : "feedback incorrect"} role="status">
          <strong>{valid ? "Valid qualitative structure" : "Revise the required features."}</strong>
          <p>
            {challenge
              ? "A valid graph rises first, becomes nearly horizontal for a stop, then falls with a greater slope magnitude than the first segment."
              : "A valid graph starts at x = -2 m, increases with time, and is straight for constant velocity."}
          </p>
        </div>
      ) : null}
    </div>
  );
}

export function TellStoryCheck() {
  const [answers, setAnswers] = useState({ stationary: "", negative: "", displacement: "", greater: "" });
  const [submitted, setSubmitted] = useState(false);
  const displacementClean = answers.displacement.replace(/\s+/g, "").toLowerCase().replace("−", "-");
  const matchesInterval = (response: string, start: number, end: number) => {
    const interval = response.toLowerCase().replace(/seconds?|secs?|(?<=\d)s|\bt\b|=|from|between|\s/g, "").replace(/[–−—]/g, "-");
    return new RegExp(`^${start}(?:-|to|through|and|,)${end}$`).test(interval);
  };
  const correct = {
    stationary: matchesInterval(answers.stationary, 2, 4),
    negative: matchesInterval(answers.negative, 4, 6),
    displacement: displacementClean === "-2m" || displacementClean === "-2",
    greater: matchesInterval(answers.greater, 4, 6),
  };
  const score = Object.values(correct).filter(Boolean).length;

  const update = (field: keyof typeof answers, value: string) => {
    setAnswers((current) => ({ ...current, [field]: value }));
    setSubmitted(false);
  };

  return (
    <div className="interactive-card">
      <label>During which interval is the object stationary?<input onChange={(event) => update("stationary", event.target.value)} placeholder="Enter a time interval" value={answers.stationary} /></label>
      <label>During which interval is the velocity negative?<input onChange={(event) => update("negative", event.target.value)} placeholder="Enter a time interval" value={answers.negative} /></label>
      <label>What is the object&apos;s displacement from 0 s to 6 s?<input onChange={(event) => update("displacement", event.target.value)} placeholder="Enter your answer with units" value={answers.displacement} /><small>Example format: +7 m</small></label>
      <label>During which moving interval does the object have the greater speed?<input onChange={(event) => update("greater", event.target.value)} placeholder="Enter a time interval" value={answers.greater} /></label>
      <button
        className="button secondary"
        disabled={Object.values(answers).some((answer) => !answer.trim())}
        onClick={() => setSubmitted(true)}
        type="button"
      >
        Submit Responses
      </button>
      {submitted ? (
        <div className={score === 4 ? "feedback correct" : "feedback incorrect"} role="status">
          <strong>{score}/4 complete</strong>
          <p>
            Stationary: 2-4 s. Negative velocity: 4-6 s. Total displacement: -2 m. Greatest speed: 4-6 s because that segment has the greatest slope magnitude.
          </p>
        </div>
      ) : null}
    </div>
  );
}

const masteryQuestions = [
  { id: "diagram", skill: "Motion Diagrams", section: "section-motion-diagrams", answer: "Speeding up", prompt: "Equal-time markers progress rightward and get farther apart as time increases. What is happening?", choices: ["Speeding up", "Slowing down", "Stationary", "Moving left at constant speed"] },
  { id: "position", skill: "Reading Position-Time Graphs", section: "section-reading-position", answer: "5 m", prompt: "On a graph, the point at t = 3 s is x = 5 m. What is the position?", choices: ["3 m", "5 m", "8 m", "15 m"] },
  { id: "displacement", skill: "Displacement", section: "section-displacement-graph", answer: "+6 m", prompt: "A graph shows x_i = -4 m and x_f = +2 m. What is Δx?", choices: ["-6 m", "-2 m", "+2 m", "+6 m"] },
  { id: "slope", skill: "Slope and Velocity", section: "section-slope", answer: "+3 m/s", prompt: "Position changes from 1 m to 10 m in 3 s. What is the average velocity?", choices: ["+3 m/s", "+9 m/s", "-3 m/s", "+30 m/s"] },
  { id: "direction", skill: "Direction of Motion", section: "section-slope-sign", answer: "Negative direction", prompt: "A position-time graph has negative slope. Which direction is the object moving?", choices: ["Positive direction", "Negative direction", "It must be speeding up", "No direction"] },
  { id: "speed", skill: "Slope Magnitude", section: "section-speed", answer: "Steep negative slope", prompt: "Which graph can represent the greatest speed?", choices: ["Gentle positive slope", "Horizontal line", "Steep negative slope", "Gentle negative slope"] },
];

export function Topic13MasteryCheck() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [written, setWritten] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const score = masteryQuestions.filter((question) => answers[question.id] === question.answer).length;
  const weak = masteryQuestions.filter((question) => answers[question.id] !== question.answer);
  const label = score === masteryQuestions.length ? "All multiple-choice checks correct" : "Review incorrect multiple-choice answers";

  return (
    <section className="lesson-section" data-topic-completion={submitted && score === masteryQuestions.length ? "complete" : "incomplete"}>
      <p className="eyebrow">Topic Mastery Check</p>
      <h2>20. Topic Mastery Check</h2>
      <p>Answer all seven questions first. Multiple-choice answers are scored automatically; written work requires self-review after submission.</p>
      {masteryQuestions.map((question, index) => (
        <div className="interactive-card" key={question.id}>
          <p id={`${question.id}-prompt`}><strong>Question {index + 1}</strong> - <PhysicsText text={question.prompt} /></p>
          <div className="choice-grid" role="radiogroup" aria-labelledby={`${question.id}-prompt`}>
            {question.choices.map((choice, choiceIndex) => (
              <label key={choice}>
                <input
                  checked={answers[question.id] === choice}
                  name={`topic13-mastery-${question.id}`}
                  onChange={() => {
                    setAnswers((current) => ({ ...current, [question.id]: choice }));
                    setSubmitted(false);
                  }}
                  type="radio"
                />
                <span><strong className="choice-letter">{String.fromCharCode(65 + choiceIndex)}.</strong> <PhysicsText text={choice} /></span>
              </label>
            ))}
          </div>
        </div>
      ))}
      <div className="interactive-card">
        <p><strong>Question 7</strong> - A motion diagram has equally spaced markers moving right. Justify which position-time graph represents it.</p>
        <textarea
          onChange={(event) => {
            setWritten(event.target.value);
            setSubmitted(false);
          }}
          placeholder="Explain using marker spacing, direction, and slope."
          value={written}
        />
      </div>
      <button
        className="button primary"
        disabled={masteryQuestions.some((question) => !answers[question.id]) || !written.trim()}
        onClick={() => setSubmitted(true)}
        type="button"
      >
        Submit Mastery Check
      </button>
      {submitted ? (
        <div className="result" role="status" data-mastery-score={score}>
          <h3>{score}/{masteryQuestions.length} - {label}</h3>
          <p><strong>Written response submitted — self-review required.</strong> It is excluded from the automatic score.</p>
          <p><strong>Model reasoning:</strong> Equal spacing in equal time intervals means constant speed; motion right means positive velocity. The position–time graph is a straight line with positive slope.</p>
          <div className="skill-feedback">
            <article>
              <h4>Correct multiple-choice skills</h4>
              <ul>
                {masteryQuestions.filter((question) => answers[question.id] === question.answer).map((question) => (
                  <li key={question.id}>✓ {question.skill}</li>
                ))}
                
              </ul>
            </article>
            <article>
              <h4>Review</h4>
              <ul>
                {weak.map((question) => (
                  <li key={question.id}>△ <a href={`#${question.section}`}>{question.skill}</a></li>
                ))}
                
              </ul>
            </article>
          </div>
        </div>
      ) : null}
    </section>
  );
}
