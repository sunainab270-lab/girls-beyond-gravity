export interface AssessmentQuestion {
  id: string;
  topic: string;
  answer: string | string[];
  explanation?: string;
}

export interface StudentProfile {
  age: number;
  grade: string;
  country: string;
  citizenship: string;
  interests: string[];
  preferredType: string;
}

export interface OpportunityRecord {
  country: string;
  remote: boolean;
  minAge: number;
  maxAge: number;
  gradeLevels: string[];
  types: string[];
  fields: string[];
  citizenshipRequired: string | null;
  deadline: string;
  verificationStatus: string;
  nextReviewDate: string;
}

export function classifyMastery(scorePercent: number): string;
export function scoreAssessment(
  questions: AssessmentQuestion[],
  responses: Record<string, string | string[]>,
): {
  correctCount: number;
  total: number;
  percent: number;
  mastery: string;
  results: Array<{
    id: string;
    topic: string;
    correct: boolean;
    explanation?: string;
  }>;
};
export function recommendApPathway(profile: Record<string, string>): {
  pathway: string;
  reason: string;
};
export function verificationStatus(
  record: { nextReviewDate?: string; verificationStatus: string },
  today?: Date,
): string;
export function matchOpportunity(
  student: StudentProfile,
  opportunity: OpportunityRecord,
  today?: Date,
): {
  percent: number;
  label: string;
  reasons: string[];
  barriers: string[];
  missing: string[];
  staleStatus: string;
};
