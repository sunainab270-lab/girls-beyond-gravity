import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

const timestamps = {
  createdAt: text("created_at").notNull().default("CURRENT_TIMESTAMP"),
  updatedAt: text("updated_at").notNull().default("CURRENT_TIMESTAMP"),
};

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  displayName: text("display_name").notNull(),
  role: text("role").notNull().default("student"),
  ...timestamps,
});

export const profiles = sqliteTable("profiles", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id),
  ageRange: text("age_range"),
  gradeLevel: text("grade_level"),
  country: text("country"),
  region: text("region"),
  citizenship: text("citizenship"),
  curriculum: text("curriculum"),
  physicsConfidence: text("physics_confidence"),
  relocationPreference: text("relocation_preference"),
  accessibilityPreferences: text("accessibility_preferences"),
  timeAvailableWeekly: text("time_available_weekly"),
  ...timestamps,
});

export const interests = sqliteTable("interests", {
  id: text("id").primaryKey(),
  name: text("name").notNull().unique(),
});

export const userInterests = sqliteTable("user_interests", {
  userId: text("user_id").notNull().references(() => users.id),
  interestId: text("interest_id").notNull().references(() => interests.id),
});

export const curriculumLevels = sqliteTable("curriculum_levels", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  difficulty: text("difficulty").notNull(),
  sequence: integer("sequence").notNull(),
});

export const units = sqliteTable("units", {
  id: text("id").primaryKey(),
  levelId: text("level_id").notNull().references(() => curriculumLevels.id),
  title: text("title").notNull(),
  status: text("status").notNull().default("preview"),
  sequence: integer("sequence").notNull(),
});

export const lessons = sqliteTable("lessons", {
  id: text("id").primaryKey(),
  unitId: text("unit_id").notNull().references(() => units.id),
  title: text("title").notNull(),
  body: text("body").notNull(),
  sequence: integer("sequence").notNull(),
});

export const questions = sqliteTable("questions", {
  id: text("id").primaryKey(),
  unitId: text("unit_id").references(() => units.id),
  type: text("type").notNull(),
  prompt: text("prompt").notNull(),
  answer: text("answer").notNull(),
  explanation: text("explanation"),
  topic: text("topic"),
});

export const assessments = sqliteTable("assessments", {
  id: text("id").primaryKey(),
  unitId: text("unit_id").references(() => units.id),
  title: text("title").notNull(),
  timerMinutes: integer("timer_minutes"),
  integrityNotice: text("integrity_notice"),
});

export const assessmentAttempts = sqliteTable("assessment_attempts", {
  id: text("id").primaryKey(),
  assessmentId: text("assessment_id").notNull().references(() => assessments.id),
  userId: text("user_id").notNull().references(() => users.id),
  scorePercent: integer("score_percent"),
  masteryLevel: text("mastery_level"),
  submittedAt: text("submitted_at"),
  ...timestamps,
});

export const unitProgress = sqliteTable("unit_progress", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id),
  unitId: text("unit_id").notNull().references(() => units.id),
  completionPercent: integer("completion_percent").notNull().default(0),
  masteryLevel: text("mastery_level"),
  ...timestamps,
});

export const opportunities = sqliteTable("opportunities", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  organization: text("organization").notNull(),
  opportunityType: text("opportunity_type").notNull(),
  country: text("country"),
  region: text("region"),
  remoteMode: text("remote_mode"),
  minAge: integer("min_age"),
  maxAge: integer("max_age"),
  deadline: text("deadline"),
  officialSource: text("official_source"),
  verificationStatus: text("verification_status").notNull(),
  lastVerifiedAt: text("last_verified_at"),
  nextReviewAt: text("next_review_at"),
  staffNotes: text("staff_notes"),
  ...timestamps,
});

export const savedOpportunities = sqliteTable("saved_opportunities", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id),
  opportunityId: text("opportunity_id").notNull().references(() => opportunities.id),
  ...timestamps,
});

export const projects = sqliteTable("projects", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  gradeLevel: text("grade_level"),
  difficulty: text("difficulty"),
  safetyClass: text("safety_class").notNull(),
  adultSupervisionRequired: integer("adult_supervision_required", { mode: "boolean" }).notNull().default(false),
  portfolioEvidence: text("portfolio_evidence"),
});

export const careers = sqliteTable("careers", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  overview: text("overview").notNull(),
  verifiedSalaryStatus: text("verified_salary_status").notNull().default("not_published"),
});

export const testingCenters = sqliteTable("testing_centers", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  country: text("country").notNull(),
  city: text("city"),
  externalStudentPolicy: text("external_student_policy").notNull(),
  verificationStatus: text("verification_status").notNull(),
  lastVerifiedAt: text("last_verified_at"),
  source: text("source"),
  notes: text("notes"),
});

export const reports = sqliteTable("reports", {
  id: text("id").primaryKey(),
  reporterUserId: text("reporter_user_id").references(() => users.id),
  targetType: text("target_type").notNull(),
  targetId: text("target_id").notNull(),
  concernType: text("concern_type").notNull(),
  status: text("status").notNull().default("open"),
  ...timestamps,
});

export const auditLogs = sqliteTable("audit_logs", {
  id: text("id").primaryKey(),
  actorUserId: text("actor_user_id").references(() => users.id),
  action: text("action").notNull(),
  targetType: text("target_type").notNull(),
  targetId: text("target_id"),
  metadata: text("metadata", { mode: "json" }),
  createdAt: text("created_at").notNull().default("CURRENT_TIMESTAMP"),
});
