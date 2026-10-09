# Data Model

The long-term relational schema should support:

User, Profile, Role, Interest, UserInterest, CurriculumLevel, Unit, Lesson, LearningObjective, PracticeSet, Question, AnswerOption, Assessment, AssessmentAttempt, QuestionResponse, Skill, UserSkill, UnitProgress, Certificate, Project, ProjectSubmission, Portfolio, PortfolioItem, Opportunity, OpportunityEligibilityRule, SavedOpportunity, OpportunityMatch, Organization, Career, CountryGuide, TutorProfile, MentorProfile, Availability, TutoringSession, MentorshipMatch, Club, Event, NewsArticle, TestingCenter, TestingCenterExam, VerificationRecord, Report, ModerationAction, Notification, and AuditLog.

Indexes should cover common search filters: opportunity type, country, city, remote status, deadline, verification status, age range, grade level, fields, career tags, curriculum unit, and stale review dates.
