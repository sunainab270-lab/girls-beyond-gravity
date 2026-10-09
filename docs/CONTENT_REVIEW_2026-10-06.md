# Girls Beyond Gravity: content and interface review

Reviewed 6 October 2026 against the College Board course frameworks currently available on AP Central.

## Available first units

| Course | Course unit | Official AP unit | Topics |
| --- | --- | --- | --- |
| AP Physics 1 | 1: Kinematics | 1 | 1.1–1.5 (existing lessons reviewed and corrected) |
| AP Physics 2 | 1: Thermodynamics | 9 | 9.1–9.6 |
| AP Physics C: Mechanics | 1: Kinematics | 1 | 1.1–1.5 |
| AP Physics C: E&M | 1: Electric Charges, Fields, and Gauss’s Law | 8 | 8.1–8.6 |

Physics 1 Unit 2 remains available. Later units have topic maps and are labelled coming soon. Course maps now include all seven Physics 2 units, all seven C: Mechanics units, and all six C: E&M units. Official numbering is displayed alongside the local sequence.

The three new first units include 17 lessons, defined vocabulary, equation conditions, 16 concept diagrams plus interactive models, at least two worked examples and two practice questions per topic, mixed unit reviews, and 12 multiple-choice questions plus two written responses per unit assessment. All new questions and instructional text are original preparation material.

## Corrections

- Physics 1 Topic 1.3: velocity/acceleration graphs, signed areas, instantaneous slopes, constant-acceleration equations, and free fall added.
- Physics 1 illustrations: component geometry, vector proportions, projectile tangent at the apex, and symmetric projectile snapshots corrected.
- Dynamics: spring relaxed length distinguished from equilibrium under other forces; friction graph and trial assumptions clarified; circular diagram clipping corrected.
- Shared SVG arrowheads reduced and scaled down for short vectors.
- New thermodynamics examples checked for first-law and ideal-gas state consistency. Constant-pressure monatomic example uses Q = 750 J, work = 300 J, and internal-energy change = 450 J.
- Quantitative entropy/Carnot material is optional enrichment; required Physics 2 second-law practice is qualitative.
- E&M covers continuous-distribution integrals, conductor versus insulator fields, surface normals, and the symmetry conditions for Gauss’s law. Disk integration is explicitly optional; required assessments use AP-scope distributions.
- Automatic grading now scores objective choices. Written work is submitted for rubric-based self-review; length or keywords do not earn correctness credit.
- Content availability is separated from student progress. Sidebar navigation no longer marks earlier lessons complete merely because a later lesson is open.

## Interface

Warm ivory, muted lavender, sage, serif headings, softer corners, an orbital-star logo, Girls Beyond Gravity branding, and clearer opportunity metadata labels. Desktop opportunity filters and course sidebars scroll within the viewport. Mobile filters remain in the page flow.

## Verification

Production build and 12 Node tests, including all 17 new lesson routes, their review and assessment routes, and unreleased-unit labels. Browser checks cover independent opportunity-panel scrolling to its bottom, thermal and field controls, hint/solution reveal, assessment scoring/reset, and mobile horizontal overflow.

Standalone TypeScript checking still reports three pre-existing Cloudflare declaration errors: cloudflare:workers, Fetcher, and D1Database. These do not prevent the verified Vinext build; deployment/runtime types should be generated when configuring hosted Cloudflare bindings. Other discovered TypeScript issues in changed educational components were fixed.

## Sources

- https://apcentral.collegeboard.org/courses/ap-physics-1
- https://apcentral.collegeboard.org/courses/ap-physics-2
- https://apcentral.collegeboard.org/courses/ap-physics-c-mechanics
- https://apcentral.collegeboard.org/courses/ap-physics-c-electricity-and-magnetism

Use the current linked Course and Exam Description and Course at a Glance for future additions. Match topic identifiers, preserve algebra versus calculus scope, define terms before use, label diagram axes and assumptions, and check worked examples independently. No recurring release automation was created, as requested.
