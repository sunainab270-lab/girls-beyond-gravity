# Authentication validation

Production build, 24 tests, TypeScript, and lint for changed authentication files pass. Generated Cloudflare runtime declarations also resolve the earlier environment type errors.

Browser verification on localhost:5173: email account creation, account access, persistence after reload, sign-out, incorrect-password rejection, and successful password login. Both account forms fit 390px and 1440px viewports. Generated QA accounts/sessions and their local rate-limit records were removed after testing; no real users were created for testing.

API verification: duplicate account 409, incorrect password 401, sign-in and session 200, sign-out revokes the session, anonymous session returns null, cross-origin mutation 403. Automated tests include password salting/verification, Unicode bounds, random session tokens, cookie flags, origin checks, public form rendering, anonymous account redirect, and rejected Google callbacks.

Google live sign-in remains untested and unavailable until the owner configures OAuth credentials. Setup instructions: docs/AUTH_SETUP.md. No deployment performed.
