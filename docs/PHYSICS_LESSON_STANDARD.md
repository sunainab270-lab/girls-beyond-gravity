# Physics teaching standard

User preferences confirmed 7 October 2026. Apply to future units and substantive revisions across all AP Physics courses.

- Align course units, topics, and required subtopics to the current public College Board framework. Distinguish course-local numbering from official AP numbering. Mark enrichment explicitly.
- Make lessons self-contained: define new terms and symbols, explain prerequisites briefly or link to the exact internal lesson, and do not depend on an outside tutorial to explain the physics.
- Follow the detailed Physics 1 Unit 1 progression: physical situation, definitions, one concept at a time, representation, mathematical relationship, examples, practice, reasoning, error analysis, challenge, and readiness checks.
- Explain important equations: symbols and units, physical meaning, reasoning or derivation, validity conditions, signs, and dimensional/limiting checks. Teach model selection before substitution.
- Treat graphs as physics: label quantities and units, distinguish spatial diagrams from time graphs, state fixed variables, use correct slopes and areas, and distinguish numerical graphs from schematic drawings. Keep all supported interactive values on a correct scale.
- Use diagrams with clear arrow origins, directions, proportionality claims, readable labels, and appropriate arrowheads. Keep mobile diagrams readable with local scrolling where needed.
- Provide original AP-style MCQs with explanations, written reasoning, experiments, graph translation, and cumulative assessment. Written responses require rubric-based self-review; do not imply automatic correctness from length.
- Add relevant publicly released College Board sample MCQs and past-paper questions with verified source and question identification. Keep official materials distinct from original practice. Display the original question pages inline, preserving diagrams and layout, with a full-source link and official scoring guidance; do not invent “real AP” questions or reproduce secure AP Classroom materials.
- Prepare students through both explanations and sustained practice; avoid claiming that one unit alone guarantees a particular AP score.

Implementation: `lib/guidedLessons.ts`, `components/GuidedLesson.tsx`, and `components/ThermalTopicExplorer.tsx` implement this standard for Physics 1 Unit 2 and Physics 2 Thermodynamics. Existing detailed Physics 1 Unit 1 remains the structural reference.
