import assert from "node:assert/strict";
import test from "node:test";
import {
  classifyMastery,
  matchOpportunity,
  recommendApPathway,
  scoreAssessment,
  verificationStatus,
} from "../lib/logic.mjs";

test("classifies mastery bands", () => {
  assert.equal(classifyMastery(92), "Mastered");
  assert.equal(classifyMastery(85), "Proficient");
  assert.equal(classifyMastery(70), "Developing");
  assert.equal(classifyMastery(40), "Review Recommended");
});

test("scores objective assessment responses", () => {
  const result = scoreAssessment(
    [
      { id: "a", topic: "Speed", answer: "5 m/s" },
      { id: "b", topic: "Graphs", answer: "Velocity" },
    ],
    { a: "5 m/s", b: "Mass" },
  );

  assert.equal(result.correctCount, 1);
  assert.equal(result.percent, 50);
  assert.equal(result.mastery, "Review Recommended");
  assert.deepEqual(
    result.results.filter((item) => !item.correct).map((item) => item.topic),
    ["Graphs"],
  );
});

test("recommends AP path with reasoning", () => {
  const recommendation = recommendApPathway({
    algebra: "ready",
    calculus: "ready",
    previousPhysics: "foundations",
    interest: "engineering",
    challenge: "balanced",
  });

  assert.equal(recommendation.pathway, "Begin AP Physics C: Mechanics");
  assert.match(recommendation.reason, /calculus readiness/i);
});

test("flags stale verification records", () => {
  assert.equal(
    verificationStatus({
      verificationStatus: "Potential center - contact required",
      nextReviewDate: "2026-01-01",
    }),
    "Stale verification",
  );
});

test("scores opportunity matches transparently", () => {
  const match = matchOpportunity(
    {
      age: 15,
      grade: "Grade 9",
      country: "United Arab Emirates",
      citizenship: "United Arab Emirates",
      interests: ["Satellites", "Software"],
      preferredType: "Summer program",
    },
    {
      remote: true,
      country: "United Arab Emirates",
      minAge: 14,
      maxAge: 18,
      gradeLevels: ["Grade 9"],
      types: ["Summer program"],
      fields: ["Satellites"],
      citizenshipRequired: null,
      deadline: "2026-09-15",
      verificationStatus: "Demonstration record",
      nextReviewDate: "2026-10-01",
    },
  );

  assert.equal(match.label, "Excellent match");
  assert.equal(match.percent, 100);
  assert.ok(match.reasons.length >= 4);
});
