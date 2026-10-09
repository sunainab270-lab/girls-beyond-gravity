export function classifyMastery(scorePercent) {
  if (scorePercent >= 90) return "Mastered";
  if (scorePercent >= 80) return "Proficient";
  if (scorePercent >= 65) return "Developing";
  return "Review Recommended";
}

export function scoreAssessment(questions, responses) {
  const results = questions.map((question) => {
    const response = responses[question.id];
    const correct = Array.isArray(question.answer)
      ? Array.isArray(response) &&
        question.answer.length === response.length &&
        question.answer.every((value) => response.includes(value))
      : String(response ?? "").trim().toLowerCase() ===
        String(question.answer).trim().toLowerCase();

    return {
      id: question.id,
      topic: question.topic,
      correct,
      explanation: question.explanation,
    };
  });

  const correctCount = results.filter((result) => result.correct).length;
  const percent = Math.round((correctCount / questions.length) * 100);
  return {
    correctCount,
    total: questions.length,
    percent,
    mastery: classifyMastery(percent),
    results,
  };
}

export function recommendApPathway(profile) {
  if (profile.calculus === "none" && profile.challenge === "very-high") {
    return {
      pathway: "Complete calculus prerequisites first",
      reason:
        "AP Physics C is calculus-based, so strengthening calculus first will make the mechanics and electricity pathways more manageable.",
    };
  }

  if (profile.previousPhysics === "none" || profile.algebra === "building") {
    return {
      pathway: "Strengthen Grade 10 foundations",
      reason:
        "A stronger base in algebra, forces, energy, and circuits will make AP-aligned preparation less stressful.",
    };
  }

  if (profile.calculus === "ready" && profile.interest === "engineering") {
    return {
      pathway: "Begin AP Physics C: Mechanics",
      reason:
        "You have calculus readiness and an engineering goal, so mechanics is the most direct advanced pathway.",
    };
  }

  if (profile.previousPhysics === "ap1" && profile.interest === "space-science") {
    return {
      pathway: "Begin AP Physics 2 preparation",
      reason:
        "Your prior mechanics background pairs well with fluids, thermodynamics, electricity, optics, and modern physics.",
    };
  }

  return {
    pathway: "Begin AP Physics 1 preparation",
    reason:
      "This is the strongest broad starting point for algebra-based AP Physics preparation.",
  };
}

export function verificationStatus(record, today = new Date("2026-07-10")) {
  if (!record.nextReviewDate) return "Needs review date";
  const reviewDate = new Date(record.nextReviewDate);
  return reviewDate < today ? "Stale verification" : record.verificationStatus;
}

export function matchOpportunity(student, opportunity, today = new Date("2026-07-10")) {
  const reasons = [];
  const barriers = [];
  const missing = [];
  let score = 0;
  let possible = 0;

  const add = (condition, points, positive, negative, missingInfo = false) => {
    possible += points;
    if (missingInfo) {
      missing.push(negative);
      return;
    }
    if (condition) {
      score += points;
      reasons.push(positive);
    } else {
      barriers.push(negative);
    }
  };

  const deadline = opportunity.deadline ? new Date(opportunity.deadline) : null;
  if (deadline && deadline < today) {
    return {
      percent: 0,
      label: "Deadline passed",
      reasons: [],
      barriers: ["The application deadline has passed."],
      missing,
      staleStatus: verificationStatus(opportunity, today),
    };
  }

  add(
    opportunity.remote || opportunity.country === student.country,
    20,
    opportunity.remote ? "Remote option available." : "Location aligns with your country.",
    "Location may require travel or relocation.",
  );
  add(
    student.age >= opportunity.minAge && student.age <= opportunity.maxAge,
    20,
    "Age range appears aligned.",
    "Age may not meet the published range.",
    typeof student.age !== "number",
  );
  add(
    opportunity.gradeLevels.includes(student.grade),
    15,
    "Grade level matches the published audience.",
    "Grade level may not match.",
  );
  add(
    opportunity.types.includes(student.preferredType),
    15,
    "Opportunity type matches your preference.",
    "Opportunity type is not your selected preference.",
  );
  add(
    opportunity.fields.some((field) => student.interests.includes(field)),
    15,
    "Aerospace interests overlap.",
    "Your saved interests do not strongly overlap yet.",
  );
  add(
    !opportunity.citizenshipRequired ||
      student.citizenship.includes(opportunity.citizenshipRequired),
    15,
    "No citizenship barrier detected from demo data.",
    "Citizenship or residency requirements need direct confirmation.",
    !student.citizenship,
  );

  const percent = Math.round((score / possible) * 100);
  let label = "Check eligibility";
  if (percent >= 85) label = "Excellent match";
  else if (percent >= 65) label = "Possible match";
  else if (barriers.length >= 3) label = "Not currently eligible";

  return {
    percent,
    label,
    reasons,
    barriers,
    missing,
    staleStatus: verificationStatus(opportunity, today),
  };
}
