# Authentication setup (updated for Vercel)

See [../DEPLOYMENT.md](../DEPLOYMENT.md) for the current domain, database, environment variables, and Google OAuth setup. The project now uses standard Next.js and Turso/libSQL; older Cloudflare `.dev.vars` instructions are superseded.

## Security and limits

Passwords use salted bcrypt hashes (cost 12), with at least 12 characters and a maximum of 72 UTF-8 bytes. Session cookies are HttpOnly, SameSite=Lax, Secure over HTTPS, expire after seven days, and are revoked on sign-out. Session tokens are hashed in the database. Mutation endpoints check Origin. Account/IP attempts are rate-limited for 15 minutes. Google authorization attempts are limited separately. Credential errors are generic.

Email verification and password recovery require an email delivery provider and are not implemented yet. Google login cannot be tested end-to-end until a real OAuth client is configured. This project has not been deployed.
