# Inline official questions and spacing

Official practice cards display the referenced original PDF pages with diagrams preserved, continuation-page controls, zoom, and the full accessible source link. The viewer loads only when approached, responds to width changes, and uses a fixed allowlist of public College Board documents. Source-load failures retain a direct link.

Consolidated overlapping lesson spacing rules for headings, paragraphs, lists, vocabulary, equation explanations, MCQs, feedback, solution disclosures, and diagrams. Mobile cards use reduced padding while retaining readable line spacing.

Validation: production build and 19 tests pass; changed components pass ESLint. All 31 lessons and 10 review/test pages checked at 390px and 1440px widths: no page-wide overflow. Official Physics 2 sample MCQ and released FRQ rendered in the browser; FRQ continuation and zoom controls verified. Browser audit: work/inline-spacing-browser-audit.json.

Type checking still reports three existing Cloudflare environment declaration errors in db/index.ts and worker/index.ts; no new errors from this change.

Original source pages are displayed rather than transcribed into lesson text. Accessible full-document links remain available. Public-source availability depends on College Board. No publication or deployment performed.
