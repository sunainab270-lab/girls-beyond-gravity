# Girls Beyond Gravity

AP Physics lessons, interactive explanations, exam practice, and aerospace opportunities. Production domain: **https://girlsbeyondgravity.org**.

## Local development

Use Node.js 22 and pnpm. Run `pnpm install`, copy `.env.example` to `.env.local`, then run `pnpm dev`. The app opens at http://localhost:3000. Email/password accounts persist in a local ignored SQLite file, `accounts.db`. Google sign-in requires OAuth credentials.

## Verification

Run `pnpm test` (includes the production build). Tests cover physics models, assessment logic, authentication security, and production-rendered pages. `pnpm exec tsc --noEmit` checks types.

## GitHub and Vercel

Follow [DEPLOYMENT.md](DEPLOYMENT.md). Upload the project contents as the repository root, with `package.json` at the root. The app uses standard Next.js with the Node runtime and a Turso/libSQL database for persistent production accounts. No Cloudflare binding is required.

`.env.production.example` lists Vercel environment variables; it contains placeholders only. Never upload `.env.local`, database files, credentials, `node_modules`, `.next`, or `work`.

## Content

The first unit is available for all four AP Physics courses. Physics 1 Unit 2 is also available. Unreleased units are locked. Physics 2 begins at official AP Unit 9; C: E&M begins at Unit 8. Original practice is distinct from publicly released College Board questions displayed inline.

Email/password signup, login, and logout are implemented. Google sign-in becomes available when credentials are configured. Progress synchronization, email verification, and password recovery are not yet implemented. The AI study assistant remains a preview.
