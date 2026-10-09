"use client";

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
};

type Frame = "ground" | "train";
type ObserverFrame = "ground" | "car-a" | "car-b";

const formatVelocity = (value: number) => (value > 0 ? `+${value}` : `${value}`);
const directionText = (value: number) =>
  value > 0 ? "right / positive" : value < 0 ? "left / negative" : "stationary in this frame";
const clampX = (value: number) => Math.max(120, Math.min(600, value));

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

export function Topic14ChoiceCheck({ question }: { question: ChoiceQuestion }) {
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

export function ChangePointOfViewInteractive() {
  const [frame, setFrame] = useState<Frame>("ground");
  const passengerVelocity = frame === "ground" ? 20 : 0;
  const groundVelocity = frame === "ground" ? 0 : -20;
  const trainX = frame === "ground" ? 250 : 295;
  const groundShift = frame === "ground" ? 0 : -95;

  return (
    <div className="interactive-card">
      <p>Switch observers. The physical situation stays the same, but the measured motion changes.</p>
      <div className="lesson-nav" role="group" aria-label="Choose reference frame">
        <button className={`button ${frame === "ground" ? "primary" : "secondary"}`} onClick={() => setFrame("ground")} type="button">
          View from Platform
        </button>
        <button className={`button ${frame === "train" ? "primary" : "secondary"}`} onClick={() => setFrame("train")} type="button">
          View from Train
        </button>
      </div>
      <figure className="physics-diagram" aria-label="Changing reference frame between platform and train">
        <svg viewBox="0 0 720 250" role="img">
          <rect className="axis-guide" x="70" y="164" width="580" height="8" rx="4" />
          {[0, 1, 2, 3, 4].map((tick) => (
            <g key={tick} transform={`translate(${groundShift + 110 + tick * 125} 0)`}>
              <line className="origin-tick" x1="0" y1="150" x2="0" y2="188" />
              <text x="-22" y="212">ground</text>
            </g>
          ))}
          <g transform={`translate(${trainX} 0)`}>
            <rect className="motion-car" x="0" y="82" width="180" height="54" rx="16" />
            <circle className="finish-dot" cx="42" cy="144" r="9" />
            <circle className="finish-dot" cx="138" cy="144" r="9" />
            <circle className="start-dot" cx="88" cy="108" r="10" />
            <text x="52" y="72">train + passenger</text>
          </g>
          <g>
            <circle className="start-dot" cx="112" cy="126" r="13" />
            <text x="82" y="104">platform observer</text>
          </g>
          {frame === "ground" ? <SvgVectorArrow className="vector-line" x1={456} y1={67} x2={575} y2={67} /> : <SvgVectorArrow className="vector-line" x1={190} y1={67} x2={90} y2={67} />}
          <text x={frame === "ground" ? 472 : 88} y="48">{frame === "ground" ? "train moves right" : "ground moves left"}</text>
        </svg>
        <figcaption>Frame selected: {frame === "ground" ? "Ground / platform" : "Train"}</figcaption>
      </figure>
      <div className="result-grid">
        <div><small>Reference frame</small><strong>{frame === "ground" ? "Ground" : "Train"}</strong></div>
        <div><small>Passenger velocity in this frame</small><strong>{formatVelocity(passengerVelocity)} m/s</strong></div>
        <div><small>Ground velocity in this frame</small><strong>{formatVelocity(groundVelocity)} m/s</strong></div>
      </div>
      <div className="feedback correct" role="status">
        <strong>What changed?</strong>
        <p>The physical situation stayed the same. The reference frame used to describe it changed.</p>
      </div>
    </div>
  );
}

export function WalkingTrainInteractive() {
  const [trainVelocity, setTrainVelocity] = useState(18);
  const [passengerVelocity, setPassengerVelocity] = useState(2);
  const [frame, setFrame] = useState<Frame>("ground");
  const groundVelocity = trainVelocity + passengerVelocity;
  const shownTrainVelocity = frame === "ground" ? trainVelocity : 0;
  const shownPassengerVelocity = frame === "ground" ? groundVelocity : passengerVelocity;
  const trainX = frame === "ground" ? clampX(350 + trainVelocity * 6) : 305;
  const passengerX = clampX(trainX + (frame === "ground" ? passengerVelocity * 10 : passengerVelocity * 16));
  const groundShift = frame === "ground" ? 0 : -trainVelocity * 6;

  return (
    <div className="interactive-card">
      <p>Change the train and walking velocities. The component velocities combine to give the passenger&apos;s velocity relative to the ground.</p>
      <div className="control-grid">
        <label>
          Train velocity relative to ground: {formatVelocity(trainVelocity)} m/s
          <input max="20" min="-20" onChange={(event) => setTrainVelocity(Number(event.target.value))} type="range" value={trainVelocity} />
        </label>
        <label>
          Passenger velocity relative to train: {formatVelocity(passengerVelocity)} m/s
          <input max="5" min="-5" onChange={(event) => setPassengerVelocity(Number(event.target.value))} type="range" value={passengerVelocity} />
        </label>
      </div>
      <div className="lesson-nav" role="group" aria-label="Choose animation reference frame">
        <button className={`button ${frame === "ground" ? "primary" : "secondary"}`} onClick={() => setFrame("ground")} type="button">View from Ground</button>
        <button className={`button ${frame === "train" ? "primary" : "secondary"}`} onClick={() => setFrame("train")} type="button">View from Train</button>
      </div>
      <figure className="physics-diagram" aria-label="Walking on the train relative velocity model">
        <svg viewBox="0 0 720 310" role="img">
          <rect className="axis-guide" x="70" y="215" width="580" height="8" rx="4" />
          {[0, 1, 2, 3, 4].map((tick) => (
            <line className="origin-tick" key={tick} x1={groundShift + 110 + tick * 125} y1="202" x2={groundShift + 110 + tick * 125} y2="236" />
          ))}
          <g transform={`translate(${trainX - 110} 0)`}>
            <rect className="motion-car" x="0" y="126" width="220" height="58" rx="16" />
            <circle className="finish-dot" cx="52" cy="194" r="9" />
            <circle className="finish-dot" cx="168" cy="194" r="9" />
            <text x="58" y="115">train frame</text>
          </g>
          <g>
            <circle className="start-dot" cx={passengerX} cy="154" r="10" />
            <text x={passengerX - 36} y="126">passenger</text>
          </g>
          {trainVelocity !== 0 ? <SvgVectorArrow className="vector-line" x1={360} y1={44} x2={360 + trainVelocity * 5} y2={44} /> : null}
          {passengerVelocity !== 0 ? <SvgVectorArrow className="vector-line" x1={360} y1={82} x2={360 + passengerVelocity * 18} y2={82} /> : null}
          {groundVelocity !== 0 ? <SvgVectorArrow className="result-vector" x1={360} y1={268} x2={360 + groundVelocity * 4.5} y2={268} /> : <circle className="finish-dot" cx="360" cy="268" r="8" />}
          <text x="78" y="24">Train relative to ground: {formatVelocity(trainVelocity)} m/s</text>
          <text x="78" y="68">Passenger relative to train: {formatVelocity(passengerVelocity)} m/s</text>
          <text x="78" y="244">Passenger relative to ground: {formatVelocity(groundVelocity)} m/s</text>
        </svg>
        <figcaption>{groundVelocity === 0 ? "The passenger is stationary relative to the ground in this setting." : `Passenger moves ${directionText(groundVelocity)} relative to the ground.`}</figcaption>
      </figure>
      <div className="result-grid">
        <div><small>Reference frame</small><strong>{frame === "ground" ? "Ground" : "Train"}</strong></div>
        <div><small>Passenger in selected frame</small><strong>{formatVelocity(shownPassengerVelocity)} m/s</strong></div>
        <div><small>Train in selected frame</small><strong>{formatVelocity(shownTrainVelocity)} m/s</strong></div>
        <div><small>Passenger relative to ground</small><strong>{formatVelocity(groundVelocity)} m/s</strong></div>
      </div>
    </div>
  );
}

export function OppositeMotionNumericalCheck() {
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [celebrating, setCelebrating] = useState(false);
  const cleaned = answer.replace(/\s+/g, "").toLowerCase();
  const correct = cleaned === "+9m/s" || cleaned === "9m/s" || cleaned === "+9" || cleaned === "9";

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
        What is the passenger&apos;s velocity relative to the ground?
        <input
          onChange={(event) => {
            setAnswer(event.target.value);
            setSubmitted(false);
          }}
          placeholder="Enter velocity with units"
          value={answer}
        />
        <small>Example format: -7 m/s</small>
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
              ? "The passenger's velocity relative to the ground is -3 + 12 = +9 m/s, so the passenger still moves right relative to the ground."
              : "Choose right as positive and combine the passenger's velocity relative to the bus with the bus's velocity relative to the ground."}
          </p>
        </div>
      ) : null}
    </div>
  );
}

export function SwitchObserverInteractive() {
  const [frame, setFrame] = useState<ObserverFrame>("ground");
  const velocities =
    frame === "ground"
      ? { a: 15, b: 10 }
      : frame === "car-a"
        ? { a: 0, b: -5 }
        : { a: 5, b: 0 };
  const baseA = frame === "ground" ? 420 : frame === "car-a" ? 340 : 390;
  const baseB = frame === "ground" ? 300 : frame === "car-a" ? 250 : 340;

  return (
    <div className="interactive-card">
      <p>Observe the same two cars from three different reference frames.</p>
      <div className="lesson-nav" role="group" aria-label="Choose observer">
        <button className={`button ${frame === "ground" ? "primary" : "secondary"}`} onClick={() => setFrame("ground")} type="button">Observe from Ground</button>
        <button className={`button ${frame === "car-a" ? "primary" : "secondary"}`} onClick={() => setFrame("car-a")} type="button">Observe from Car A</button>
        <button className={`button ${frame === "car-b" ? "primary" : "secondary"}`} onClick={() => setFrame("car-b")} type="button">Observe from Car B</button>
      </div>
      <figure className="physics-diagram" aria-label="Two cars in different observer frames">
        <svg viewBox="0 0 720 255" role="img">
          <line className="axis-line" x1="90" y1="190" x2="630" y2="190" />
          <g className="car-marker">
            <rect x={baseA - 36} y="83" width="72" height="26" rx="9" />
            <circle cx={baseA - 20} cy="113" r="5" />
            <circle cx={baseA + 20} cy="113" r="5" />
          </g>
          <text x={baseA - 23} y="72">Car A</text>
          <g className="car-marker">
            <rect x={baseB - 36} y="143" width="72" height="26" rx="9" />
            <circle cx={baseB - 20} cy="173" r="5" />
            <circle cx={baseB + 20} cy="173" r="5" />
          </g>
          <text x={baseB - 23} y="132">Car B</text>
          {velocities.a !== 0 ? <SvgVectorArrow className="vector-line" x1={baseA + 48} y1={96} x2={baseA + 48 + velocities.a * 5} y2={96} /> : null}
          {velocities.b !== 0 ? <SvgVectorArrow className="result-vector" x1={baseB + 48} y1={156} x2={baseB + 48 + velocities.b * 9} y2={156} /> : null}
        </svg>
        <figcaption>In this frame: Car A = {formatVelocity(velocities.a)} m/s, Car B = {formatVelocity(velocities.b)} m/s.</figcaption>
      </figure>
      <div className="result-grid">
        <div><small>Physically faster relative to ground</small><strong>Car A</strong></div>
        <div><small>Car B relative to Car A</small><strong>-5 m/s, left</strong></div>
      </div>
    </div>
  );
}

export function TranslationPractice() {
  const [expression, setExpression] = useState("");
  const [words, setWords] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const expressionStrong = expression.toLowerCase().includes("-4") && expression.includes("15");
  const wordsStrong = words.toLowerCase().includes("right") && words.includes("11");

  return (
    <div className="interactive-card">
      <label>
        Mathematical expression for the passenger&apos;s velocity relative to ground
        <input onChange={(event) => { setExpression(event.target.value); setSubmitted(false); }} placeholder="Write an expression using signed velocities" value={expression} />
        <small>Example format: v = +3 + (-1)</small>
      </label>
      <label>
        Verbal description of the resulting motion
        <textarea onChange={(event) => { setWords(event.target.value); setSubmitted(false); }} placeholder="Describe the direction and speed in words." value={words} />
      </label>
      <button className="button secondary" disabled={!expression.trim() || !words.trim()} onClick={() => setSubmitted(true)} type="button">
        Submit Translation
      </button>
      {submitted ? (
        <div className={expressionStrong && wordsStrong ? "feedback correct" : "feedback incorrect"} role="status">
          <strong>{expressionStrong && wordsStrong ? "Complete translation" : "Revise the representation."}</strong>
          <p>Expected: v_passenger,ground = -4 + 15 = +11 m/s. The passenger moves right at 11 m/s relative to the ground.</p>
        </div>
      ) : null}
    </div>
  );
}

const practiceQuestions = [
  {
    id: "same-way",
    prompt: "Train travels right at +24 m/s. Student walks right at +2 m/s relative to train. Student velocity relative to ground?",
    choices: ["+12 m/s", "+22 m/s", "+26 m/s", "+48 m/s"],
    answer: "+26 m/s",
    hint: "Same positive direction, so combine the signed velocities.",
    explanation: "v_student,ground = +2 + 24 = +26 m/s.",
  },
  {
    id: "opposite-way",
    prompt: "Bus travels right at +15 m/s. Student walks left at -5 m/s relative to bus. Student velocity relative to ground?",
    choices: ["-20 m/s", "-10 m/s", "+10 m/s", "+20 m/s"],
    answer: "+10 m/s",
    hint: "Left is negative, so use +15 and -5 together.",
    explanation: "v_student,ground = -5 + 15 = +10 m/s.",
  },
  {
    id: "cars-same",
    prompt: "Car A travels right at +20 m/s. Car B travels right at +12 m/s. Velocity of A relative to B?",
    choices: ["+8 m/s", "+12 m/s", "+20 m/s", "+32 m/s"],
    answer: "+8 m/s",
    hint: "Compare how much A gains on B each second.",
    explanation: "v_A,B = v_A,ground - v_B,ground = 20 - 12 = +8 m/s.",
  },
  {
    id: "acceleration",
    prompt: "Two observers are in different inertial reference frames. Which quantity must they measure to be the same for the same accelerating object?",
    choices: ["Position", "Velocity", "Acceleration", "Displacement"],
    answer: "Acceleration",
    hint: "In inertial frames, the added frame velocity is constant.",
    explanation: "Different inertial observers may measure different velocities, but they measure the same acceleration.",
  },
];

export function Topic14PracticeSet() {
  return (
    <div className="comparison-grid">
      {practiceQuestions.map((question) => (
        <Topic14ChoiceCheck question={question} key={question.id} />
      ))}
    </div>
  );
}

export function JustificationPractice() {
  const [response, setResponse] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="interactive-card">
      <label>
        Which student is correct? Justify your answer using reference frames.
        <textarea
          onChange={(event) => {
            setResponse(event.target.value);
            setSubmitted(false);
          }}
          placeholder="Identify the correct student, compare velocities, and interpret the result."
          value={response}
        />
      </label>
      <button className="button secondary" disabled={!response.trim()} onClick={() => setSubmitted(true)} type="button">Reveal Model Response</button>
      {submitted ? (
        <div className="feedback correct" role="status">
          <strong>Model response</strong>
          <p>Student 2 is correct. Both velocities are measured relative to the ground. From Car B&apos;s reference frame, Car B is stationary and Car A gains 2 meters on it each second. Therefore Car A&apos;s velocity relative to Car B is +2 m/s.</p>
          <ul>
            <li>✓ identifies reference frame</li>
            <li>✓ compares velocities</li>
            <li>✓ interprets result physically</li>
          </ul>
        </div>
      ) : null}
    </div>
  );
}

export function ChallengeProblem() {
  const [answers, setAnswers] = useState({ a: "", b: "", c: "", d: "" });
  const [submitted, setSubmitted] = useState(false);
  const clean = (value: string) => value.replace(/\s+/g, "").toLowerCase();
  const checks = {
    a: ["+23m/s", "23m/s", "+23", "23"].includes(clean(answers.a)),
    b: ["+18m/s", "18m/s", "+18", "18"].includes(clean(answers.b)),
    c: ["+5m/s", "5m/s", "+5", "5"].includes(clean(answers.c)),
    d: clean(answers.d).includes("left") || clean(answers.d).includes("negative"),
  };
  const score = Object.values(checks).filter(Boolean).length;
  const update = (field: keyof typeof answers, value: string) => {
    setAnswers((current) => ({ ...current, [field]: value }));
    setSubmitted(false);
  };

  return (
    <div className="interactive-card">
      <div className="comparison-grid">
        <label>Student A relative to ground<input onChange={(event) => update("a", event.target.value)} placeholder="Enter velocity with units" value={answers.a} /><small>Example format: +12 m/s</small></label>
        <label>Student B relative to ground<input onChange={(event) => update("b", event.target.value)} placeholder="Enter velocity with units" value={answers.b} /><small>Example format: -6 m/s</small></label>
        <label>Student A relative to Student B<input onChange={(event) => update("c", event.target.value)} placeholder="Enter relative velocity" value={answers.c} /><small>Example format: +4 m/s</small></label>
        <label>From Student A&apos;s frame, which way does Student B move?<input onChange={(event) => update("d", event.target.value)} placeholder="Enter a direction" value={answers.d} /></label>
      </div>
      <button className="button secondary" disabled={Object.values(answers).some((answer) => !answer.trim())} onClick={() => setSubmitted(true)} type="button">
        Show Solutions
      </button>
      {submitted ? (
        <div className={score === 4 ? "feedback correct" : "feedback incorrect"} role="status">
          <strong>{score}/4 parts correct</strong>
          <p>A: +23 m/s. B: +18 m/s. A relative to B: 23 - 18 = +5 m/s. From Student A&apos;s frame, Student B moves negative / left.</p>
        </div>
      ) : null}
    </div>
  );
}

const masteryQuestions = [
  { id: "frame", skill: "Identifying Reference Frames", section: "section-reference-frame", answer: "The train", prompt: "A passenger has velocity 0 m/s while seated on a moving train. Which reference frame makes that true?", choices: ["The ground", "The train", "The Sun", "Every frame"] },
  { id: "two-views", skill: "Two Observer Descriptions", section: "section-two-measurements", answer: "Stationary in the train frame, moving in the ground frame", prompt: "A seated passenger rides in a train moving right. Which description can be correct?", choices: ["Stationary in every frame", "Moving left in every frame", "Stationary in the train frame, moving in the ground frame", "Moving only if they walk"] },
  { id: "same", skill: "Same-Direction Relative Velocity", section: "section-same-direction", answer: "+19 m/s", prompt: "A train moves +16 m/s and a passenger walks +3 m/s relative to it. Passenger velocity relative to ground?", choices: ["+13 m/s", "+16 m/s", "+19 m/s", "+48 m/s"] },
  { id: "opposite", skill: "Opposite-Direction Relative Velocity", section: "section-opposite-directions", answer: "+7 m/s", prompt: "A bus moves +11 m/s. A passenger walks -4 m/s relative to the bus. Passenger velocity relative to ground?", choices: ["-15 m/s", "-7 m/s", "+7 m/s", "+15 m/s"] },
  { id: "reverse", skill: "Reversing Reference Frames", section: "section-reverse-frame", answer: "-14 m/s", prompt: "If v_train,ground = +14 m/s, what is v_ground,train?", choices: ["+14 m/s", "-14 m/s", "0 m/s", "+28 m/s"] },
  { id: "accel", skill: "Acceleration Across Frames", section: "section-acceleration", answer: "The same acceleration", prompt: "A cart accelerates inside a train moving at constant velocity. What do inertial observers agree on?", choices: ["The same position", "The same velocity", "The same acceleration", "No measurements"] },
];

export function Topic14MasteryCheck() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [symbolic, setSymbolic] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const score = masteryQuestions.filter((question) => answers[question.id] === question.answer).length;
  const weak = masteryQuestions.filter((question) => answers[question.id] !== question.answer);
  const label = score === masteryQuestions.length ? "All multiple-choice checks correct" : "Review incorrect multiple-choice answers";

  return (
    <section className="lesson-section" data-topic-completion={submitted && score === masteryQuestions.length ? "complete" : "incomplete"}>
      <p className="eyebrow">Topic Mastery Check</p>
      <h2>22. Topic Mastery Check</h2>
      <p>Answer all seven questions first. Multiple-choice answers are scored automatically; written work requires self-review after submission.</p>
      {masteryQuestions.map((question, index) => (
        <div className="interactive-card" key={question.id}>
          <p id={`${question.id}-prompt`}><strong>Question {index + 1}</strong> - <PhysicsText text={question.prompt} /></p>
          <div className="choice-grid" role="radiogroup" aria-labelledby={`${question.id}-prompt`}>
            {question.choices.map((choice, choiceIndex) => (
              <label key={choice}>
                <input
                  checked={answers[question.id] === choice}
                  name={`topic14-mastery-${question.id}`}
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
        <p><strong>Question 7</strong> - Symbolic reasoning: write the expression for passenger velocity relative to ground using v_PT and v_TG.</p>
        <textarea
          onChange={(event) => {
            setSymbolic(event.target.value);
            setSubmitted(false);
          }}
          placeholder="Write the relationship using symbolic velocities."
          value={symbolic}
        />
      </div>
      <button
        className="button primary"
        disabled={masteryQuestions.some((question) => !answers[question.id]) || !symbolic.trim()}
        onClick={() => setSubmitted(true)}
        type="button"
      >
        Submit Mastery Check
      </button>
      {submitted ? (
        <div className="result" role="status" data-mastery-score={score}>
          <h3>{score}/{masteryQuestions.length} - {label}</h3>
          <p><strong>Written response submitted — self-review required.</strong> It is excluded from the automatic score.</p>
          <p><strong>Model reasoning:</strong> Using the same axis for all velocities, v_PG = v_PT + v_TG. Each subscript identifies the object and the frame relative to which its velocity is measured.</p>
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
              <h4>Review Recommended</h4>
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
