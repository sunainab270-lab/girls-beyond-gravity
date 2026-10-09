# Lesson rebuild — 7 October 2026

Rebuilt all nine Physics 1 Unit 2 lessons and all six Physics 2 Thermodynamics lessons around the detailed Unit 1 teaching progression.

## Teaching changes

Lessons now include prerequisites, physical situations, explicit vocabulary, staged explanations, equation guides (symbols, meaning, reasoning, conditions, and checks), graph interpretation, worked examples, original MCQs with explanatory feedback, written reasoning, error analysis, challenges, and readiness checks. Important equations including PV = nRT are explained from their physical model rather than presented solely as substitution rules.

Dynamics retains its topic-specific interactive force and motion tools and mastery checks. Added examples include connected masses, apparent weight, static-friction thresholds, spring equilibrium, vertical circles, orbital scaling, and banked turns.

Thermodynamics adds quantitative molecular speed distributions; pressure–volume, pressure–temperature, and linearized gas graphs; conserving thermal-equilibrium curves; path-dependent work and heat; a heating curve with latent-heat stages; and cyclic engine accounting. Enrichment such as numerical entropy and Carnot efficiency is explicitly separated from core qualitative second-law content.

The thermodynamics review now connects all six topics and includes deeper mixed reasoning. Its original assessment has 24 MCQs and four written-response tasks with self-review rubrics.

## Official practice

Verified public source links identify College Board sample MCQs and relevant released 2024 Physics 1 and 2025–2026 Physics 2 FRQs. Official prompts and figures remain in their source documents, with on-site preparation and conceptual discussions. The site’s original quizzes remain labelled as original AP-style practice. Secure AP Classroom material is not reproduced.

## Validation

- Production build and all 17 tests passed.
- New model tests check gas-law unit/scaling behaviour, normalized speed distributions and mean squared speed, heating-curve boundaries, and energy conservation during equilibration.
- Browser scans cover all 15 rewritten lessons on desktop and mobile: no page overflow, clipped SVG labels, or undersized mobile SVG text found in initial rendered states.
- Browser interactions verified alternative gas graphs, high/low work paths, the heating-curve endpoint, correct/incorrect MCQ feedback, 24/24 assessment grading, multiline response retention, and reset behaviour.
- Lint passed for the modified teaching components and data.
- TypeScript checking reports only the three pre-existing Cloudflare environment declaration errors (cloudflare:workers, Fetcher, D1Database).

Future units should follow PHYSICS_LESSON_STANDARD.md. No publication or recurring releases were performed.
