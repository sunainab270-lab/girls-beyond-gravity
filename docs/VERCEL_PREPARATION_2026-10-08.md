# Vercel preparation — 8 October 2026

Configured girlsbeyondgravity.org as the production metadata and sitemap domain, with a permanent www redirect. Added robots, Vercel config, and local/production environment examples. Converted runtime scripts to standard Next.js, updated asynchronous route parameters, moved the PDF worker to a static public asset, and replaced Cloudflare D1 authentication bindings with a libSQL adapter. Production on Vercel requires a remote Turso database.

Validation: Next.js webpack production build passed, 24 tests passed (including tests against production-rendered routes), and TypeScript and changed-file lint checks passed. Local Next.js authentication verified signup, wrong password, login, session, logout, cross-origin rejection, and session revocation. QA records removed. Existing local account records retained in ignored accounts.db; no account data is in the release ZIP.

The clean ZIP excludes secrets, local databases, caches/build artifacts, and unused Cloudflare scaffolding. No GitHub repository creation, Vercel deployment, DNS modification, database upload, or Google credentials configuration performed. Follow DEPLOYMENT.md for these owner-controlled setup steps.
