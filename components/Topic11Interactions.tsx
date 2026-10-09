"use client";

import { PhysicsText } from "./PhysicsText";

import { useEffect, useId, useMemo, useState } from "react";

import { SvgArrowMarker, SvgVectorArrow } from "./SvgArrowMarker";

type ChoiceQuestion = {
  id: string;
  prompt: string;
  choices: string[];
  answer: string;
  explanation: string;
  hint?: string;
  skill?: string;
  difficulty?: string;
  type?: string;
};

type WrittenQuestion = {
  id: string;
  prompt: string;
  modelAnswer: string;
  skill?: string;
  difficulty?: string;
  type?: string;
};

const metadata = {
  course: "AP Physics 1",
  unit: "Kinematics",
  topic: "Scalars and Vectors in One Dimension",
};

const masteryQuestions: ChoiceQuestion[] = [
  {
    id: "classification",
    prompt: "Which of the following is necessarily a vector quantity?",
    choices: ["3 kg", "18 m/s south", "12 J", "4 s"],
    answer: "18 m/s south",
    explanation: "18 m/s south has both magnitude and direction, so it is necessarily a vector quantity.",
  },
  {
    id: "representation",
    prompt: "A vector points in the negative x-direction and has a magnitude of 7 units. What is its x-component?",
    choices: ["-7", "0", "+7", "Cannot be determined"],
    answer: "-7",
    explanation: "A magnitude of 7 in the negative x-direction has an x-component of -7.",
  },
  {
    id: "addition",
    prompt: "Right is positive. An object undergoes +11 m, -6 m, and -3 m. Determine the resultant.",
    choices: ["+2 m", "-2 m", "+20 m", "-20 m"],
    answer: "+2 m",
    explanation: "11 - 6 - 3 = +2 m, so the resultant is 2 m right.",
  },
  {
    id: "comparison",
    prompt: "Object A travels 6 m/s left, and Object B travels 6 m/s right. Which statement is correct?",
    choices: [
      "Their speeds are equal, but their velocities are different.",
      "Object B has the greater speed.",
      "Object A has the greater speed.",
      "Their velocities are equal.",
    ],
    answer: "Their speeds are equal, but their velocities are different.",
    explanation:
      "Their speeds are equal because both magnitudes are 6 m/s. Their velocities are different because they point in opposite directions.",
  },
  {
    id: "reasoning",
    prompt: "If an object's velocity is negative, the object must be slowing down.",
    choices: ["True", "False"],
    answer: "False",
    explanation:
      "A negative velocity indicates direction relative to the coordinate system. It does not, by itself, tell whether speed is increasing or decreasing.",
  },
];

export function ChoicePractice({ question }: { question: ChoiceQuestion }) {
  const [selected, setSelected] = useState("");
  const [checked, setChecked] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [celebrating, setCelebrating] = useState(false);
  const correct = selected === question.answer;

  useEffect(() => {
    if (!celebrating) {
      return;
    }

    const timeout = window.setTimeout(() => setCelebrating(false), 1600);
    return () => window.clearTimeout(timeout);
  }, [celebrating]);

  const checkAnswer = () => {
    setChecked(true);
    if (correct) {
      setCompleted(true);
      setCelebrating(true);
    }
  };

  return (
    <div
      className={`interactive-card choice-card${completed ? " completed" : ""}`}
      data-course={metadata.course}
      data-unit={metadata.unit}
      data-topic={metadata.topic}
      data-question-id={question.id}
      data-question-type={question.type ?? "multiple-choice"}
      data-skill={question.skill}
      data-difficulty={question.difficulty ?? "introductory"}
    >
      {celebrating ? (
        <span className="success-burst" aria-hidden="true">
          {Array.from({ length: 10 }).map((_, index) => (
            <i key={index} />
          ))}
        </span>
      ) : null}
      <p id={`${question.id}-prompt`}><PhysicsText text={question.prompt} /></p>
      <div className="choice-grid" role="radiogroup" aria-labelledby={`${question.id}-prompt`}>
        {question.choices.map((choice, choiceIndex) => (
          <label key={choice}>
            <input
              type="radio"
              name={question.id}
              value={choice}
              checked={selected === choice}
              onChange={(event) => {
                setSelected(event.target.value);
                setChecked(false);
                if (completed && event.target.value !== question.answer) {
                  setCompleted(false);
                }
              }}
            />
            <span><strong className="choice-letter">{String.fromCharCode(65 + choiceIndex)}.</strong> <PhysicsText text={choice} /></span>
          </label>
        ))}
      </div>
      <button
        className="button secondary"
        type="button"
        disabled={!selected}
        onClick={checkAnswer}
      >
        Check Answer
      </button>
      {checked ? (
        <div className={correct ? "feedback correct" : "feedback incorrect"} role="status">
          <strong>{correct ? "Correct" : "Not quite. Try again."}</strong>
          <p>
            {correct
              ? question.explanation
              : question.hint ??
                "Review the relevant idea in the lesson, then try another answer. Focus on what the sign, direction, and magnitude each mean."}
          </p>
        </div>
      ) : null}
    </div>
  );
}

export function WrittenPractice({ question }: { question: WrittenQuestion }) {
  const [response, setResponse] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div
      className="interactive-card"
      data-course={metadata.course}
      data-unit={metadata.unit}
      data-topic={metadata.topic}
      data-question-id={question.id}
      data-question-type={question.type ?? "written-reasoning"}
      data-skill={question.skill}
      data-difficulty={question.difficulty ?? "introductory"}
    >
      <p id={`${question.id}-prompt`}><PhysicsText text={question.prompt} /></p>
      <textarea
        value={response}
        placeholder="Write your reasoning here."
        onChange={(event) => {
          setResponse(event.target.value);
          setSubmitted(false);
        }}
      />
      <button
        className="button secondary"
        type="button"
        disabled={!response.trim()}
        onClick={() => setSubmitted(true)}
      >
        Submit Response
      </button>
      {submitted ? (
        <div className="feedback" role="status">
          <strong>Model answer</strong>
          <p>{question.modelAnswer}</p>
        </div>
      ) : null}
    </div>
  );
}

function VectorLine({
  magnitude,
  direction,
}: {
  magnitude: number;
  direction: "left" | "right";
}) {
  const id = useId().replace(/:/g, "");
  const origin = 320;
  const arrowLength = magnitude * 18;
  const end = direction === "right" ? origin + arrowLength : origin - arrowLength;

  return (
    <div className="vector-number-line" aria-label={`Vector ${magnitude} units ${direction}`}>
      <svg viewBox="0 0 640 140" role="img" aria-hidden="true">
        <defs>
          <SvgArrowMarker id={`axis-arrow-${id}`} size="axis" />
          <SvgArrowMarker id={`axis-arrow-start-${id}`} direction="start" size="axis" />
        </defs>
        <line
          className="axis-line"
          x1="56"
          y1="78"
          x2="584"
          y2="78"
          markerStart={`url(#axis-arrow-start-${id})`}
          markerEnd={`url(#axis-arrow-${id})`}
        />
        <line className="origin-tick" x1={origin} y1="54" x2={origin} y2="102" />
        <text x="308" y="126">0</text>
        <text x="78" y="56">-</text>
        <text x="548" y="56">+</text>
        <text x="592" y="62">x</text>
        <SvgVectorArrow className="vector-line" x1={origin} y1={38} x2={end} y2={38} />
      </svg>
    </div>
  );
}

export function VectorExplorer() {
  const [magnitude, setMagnitude] = useState(6);
  const [direction, setDirection] = useState<"left" | "right">("left");
  const component = direction === "left" ? -magnitude : magnitude;
  const updateMagnitude = (value: number) => {
    setMagnitude(Math.min(12, Math.max(1, value)));
  };

  return (
    <div className="interactive-card vector-explorer">
      <div className="control-grid">
        <label>
          Magnitude: {magnitude}
          <input
            type="range"
            min="1"
            max="12"
            value={magnitude}
            onChange={(event) => updateMagnitude(Number(event.target.value))}
            onInput={(event) => updateMagnitude(Number(event.currentTarget.value))}
          />
        </label>
        <div className="magnitude-buttons" aria-label="Adjust vector magnitude">
          <button
            className="button secondary"
            type="button"
            onClick={() => updateMagnitude(magnitude - 1)}
            disabled={magnitude <= 1}
          >
            Decrease
          </button>
          <button
            className="button secondary"
            type="button"
            onClick={() => updateMagnitude(magnitude + 1)}
            disabled={magnitude >= 12}
          >
            Increase
          </button>
        </div>
        <fieldset>
          <legend>Direction</legend>
          <label>
            <input
              type="radio"
              name="explorer-direction"
              checked={direction === "left"}
              onChange={() => setDirection("left")}
            />
            Left
          </label>
          <label>
            <input
              type="radio"
              name="explorer-direction"
              checked={direction === "right"}
              onChange={() => setDirection("right")}
            />
            Right
          </label>
        </fieldset>
      </div>
      <VectorLine magnitude={magnitude} direction={direction} />
      <div className="result-grid">
        <div>
          <small>Signed component</small>
          <strong>{component > 0 ? `+${component}` : component}</strong>
        </div>
        <div>
          <small>Magnitude</small>
          <strong>{Math.abs(component)}</strong>
        </div>
      </div>
    </div>
  );
}

export function VectorBuilder() {
  const [magnitude, setMagnitude] = useState(6);
  const [direction, setDirection] = useState<"left" | "right">("left");
  const [submitted, setSubmitted] = useState(false);
  const component = direction === "left" ? -magnitude : magnitude;
  const correct = magnitude === 6 && direction === "left";
  const followUpCorrect = magnitude === 12 && direction === "right";

  return (
    <div className="interactive-card">
      <p>
        Right is defined as positive. Construct a vector representing -6 m.
      </p>
      <div className="control-grid">
        <label>
          Magnitude: {magnitude} m
          <input
            type="range"
            min="1"
            max="14"
            value={magnitude}
            onChange={(event) => {
              setMagnitude(Number(event.target.value));
              setSubmitted(false);
            }}
          />
        </label>
        <fieldset>
          <legend>Direction</legend>
          <label>
            <input
              type="radio"
              name="builder-direction"
              checked={direction === "left"}
              onChange={() => {
                setDirection("left");
                setSubmitted(false);
              }}
            />
            Left
          </label>
          <label>
            <input
              type="radio"
              name="builder-direction"
              checked={direction === "right"}
              onChange={() => {
                setDirection("right");
                setSubmitted(false);
              }}
            />
            Right
          </label>
        </fieldset>
      </div>
      <VectorLine magnitude={magnitude} direction={direction} />
      <p>
        Component: <strong>{component > 0 ? `+${component}` : component} m</strong>
      </p>
      <button className="button secondary" type="button" onClick={() => setSubmitted(true)}>
        Submit Vector
      </button>
      {submitted ? (
        <div className={correct ? "feedback correct" : "feedback incorrect"} role="status">
          <strong>{correct ? "Correct representation" : "Keep adjusting"}</strong>
          <p>
            Correct representation: magnitude 6 m, direction left, component -6 m.
          </p>
          <p>
            Follow-up target: twice the magnitude and the opposite direction is
            magnitude 12 m, direction right, component +12 m.
          </p>
          {followUpCorrect ? <p>You have also constructed the follow-up vector.</p> : null}
        </div>
      ) : null}
    </div>
  );
}

export function MasteryCheck() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [complete, setComplete] = useState(
    () =>
      typeof window !== "undefined" &&
      window.localStorage.getItem("bg-topic-1-1-complete") === "true",
  );
  const score = useMemo(
    () => masteryQuestions.filter((question) => answers[question.id] === question.answer).length,
    [answers],
  );
  const label =
    score === 5 ? "Mastered" : score === 4 ? "Proficient" : score === 3 ? "Developing" : "Review Recommended";

  const markComplete = () => {
    window.localStorage.setItem("bg-topic-1-1-complete", "true");
    window.localStorage.setItem("bg-topic-1-1-mastery-score", String(score));
    setComplete(true);
  };

  return (
    <section className="lesson-section" data-topic-completion={complete ? "complete" : "incomplete"}>
      <p className="eyebrow">Topic Mastery Check</p>
      <h2>19. Topic Mastery Check</h2>
      <p>
        Complete these questions without looking back through the lesson if possible.
        Your goal is to demonstrate that you can apply the concepts, not simply
        recognize definitions.
      </p>
      {masteryQuestions.map((question, index) => (
        <div className="interactive-card" key={question.id}>
          <p id={`${question.id}-prompt`}>
            <strong>Mastery Question {index + 1}</strong> — <PhysicsText text={question.prompt} />
          </p>
          <div className="choice-grid" role="radiogroup" aria-labelledby={`${question.id}-prompt`}>
            {question.choices.map((choice, choiceIndex) => (
              <label key={choice}>
                <input
                  type="radio"
                  name={`mastery-${question.id}`}
                  value={choice}
                  checked={answers[question.id] === choice}
                  onChange={(event) => {
                    setAnswers((current) => ({
                      ...current,
                      [question.id]: event.target.value,
                    }));
                    setSubmitted(false);
                    setComplete(false);
                  }}
                />
                <span><strong className="choice-letter">{String.fromCharCode(65 + choiceIndex)}.</strong> <PhysicsText text={choice} /></span>
              </label>
            ))}
          </div>
        </div>
      ))}
      <button
        className="button primary"
        type="button"
        disabled={masteryQuestions.some((question) => !answers[question.id])}
        onClick={() => setSubmitted(true)}
      >
        Submit Mastery Check
      </button>
      {submitted ? (
        <div className="result" role="status" data-mastery-score={score}>
          <strong>
            {score}/5 — {label}
          </strong>
          <p>
            {score === 5
              ? "Excellent. You're ready to continue."
              : score === 4
                ? "You're ready to continue, but review the explanation for the question you missed."
                : score === 3
                  ? "Review the sections connected to your missed questions before continuing."
                  : "Return to the relevant sections and try the mastery check again."}
          </p>
          <ul>
            {masteryQuestions
              .filter((question) => answers[question.id] !== question.answer)
              .map((question) => (
                <li key={question.id}>{question.explanation}</li>
              ))}
          </ul>
          <button className="button secondary" type="button" onClick={markComplete}>
            Mark Topic Complete
          </button>
          {complete ? <p className="notice">Topic completion saved for this session.</p> : null}
        </div>
      ) : null}
    </section>
  );
}
