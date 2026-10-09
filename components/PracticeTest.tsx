"use client";

import { useMemo, useState } from "react";
import { motionQuestions } from "@/lib/data";
import { scoreAssessment } from "@/lib/logic.mjs";

export function PracticeTest() {
  const [answers, setAnswers] = useState<Record<string, string>>({
    q1: "5 m/s",
    q2: "",
    q3: "",
    q4: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const assessment = useMemo(
    () => scoreAssessment(motionQuestions, answers),
    [answers],
  );

  return (
    <div className="test-panel">
      {motionQuestions.map((question) => (
        <fieldset key={question.id}>
          <legend>{question.prompt}</legend>
          {question.choices.map((choice) => (
            <label key={choice}>
              <input
                type="radio"
                name={question.id}
                value={choice}
                checked={answers[question.id] === choice}
                onChange={(event) =>
                  setAnswers((current) => ({
                    ...current,
                    [question.id]: event.target.value,
                  }))
                }
              />
              {choice}
            </label>
          ))}
        </fieldset>
      ))}
      <button className="button primary" type="button" onClick={() => setSubmitted(true)}>
        Submit practice test
      </button>
      {submitted ? (
        <div className="result" role="status">
          <strong>
            {assessment.correctCount}/{assessment.total} correct - {assessment.mastery}
          </strong>
          <p>
            Recommended review:{" "}
            {assessment.results
              .filter((result: {correct: boolean}) => !result.correct)
              .map((result: {topic: string}) => result.topic)
              .join(", ") || "continue to challenge practice"}
            .
          </p>
        </div>
      ) : null}
      <p className="notice">
        This is AP-aligned preparation, not an officially authorized AP course.
        Platform certificates are not official AP scores or school credit.
      </p>
    </div>
  );
}
