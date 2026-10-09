# Deploy girlsbeyondgravity.org on Vercel

The repository is configured for standard Next.js, Node.js, and Vercel. No deployment, DNS changes, or external accounts have been created by this preparation.

## 1. Put the project on GitHub

Use the clean release ZIP or upload this project’s source contents. `package.json`, `pnpm-lock.yaml`, `next.config.ts`, and `vercel.json` must be at the repository root. Include the example environment files, but never actual secrets or local database files. If you upload a containing folder instead, select that folder as Vercel’s Root Directory.

## 2. Create a persistent account database

Create a [Turso](https://turso.tech/) database and obtain its libSQL URL and authentication token. Keep the token private. Set `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN` in Vercel. Authentication tables are created automatically on the first account request. A local SQLite file cannot persist accounts across Vercel serverless instances; the application rejects that configuration on Vercel.

Existing local accounts are not automatically uploaded. If you have real local accounts to retain, arrange a database migration before launch. Test and preview deployments should use a separate database from production.

## 3. Import the GitHub repository into Vercel

Select **Next.js** and **Node.js 22.x**. Build command: `pnpm run build`. Leave the output directory at Vercel’s Next.js default. Add these production environment variables:

| Variable | Value |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `https://girlsbeyondgravity.org` |
| `TURSO_DATABASE_URL` | Your database’s `libsql://…` URL |
| `TURSO_AUTH_TOKEN` | Your private database token |
| `GOOGLE_CLIENT_ID` | Your Google web OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Your private Google client secret |
| `GOOGLE_REDIRECT_URI` | `https://girlsbeyondgravity.org/api/auth/google-callback` |

Google credentials can be added later; email/password authentication works with just the database configured. Set credentials for **Production**. For previews, use a separate database and either omit Google credentials or register the exact preview callback and configure its redirect URI. Redeploy after changing environment variables.

## 4. Connect your domain

In Vercel **Project Settings → Domains**, add `girlsbeyondgravity.org` and `www.girlsbeyondgravity.org`. Make the apex domain primary and redirect `www` to it. The app also includes a permanent `www` redirect.

At your domain registrar, enter the DNS records Vercel shows for this project. Use those exact values; do not copy generic A/CNAME values from an old tutorial. Preserve existing email/MX records. Wait until Vercel verifies the domain and provisions HTTPS. See [Vercel’s domain setup guide](https://vercel.com/docs/domains/set-up-custom-domain).

## 5. Activate Google login

In [Google Cloud Console](https://console.cloud.google.com/), configure Google Auth Platform branding/audience, then create an OAuth client of type **Web application**. Request only `openid`, `email`, and `profile`.

Register these exact authorized redirect URIs as applicable:

- Production: `https://girlsbeyondgravity.org/api/auth/google-callback`
- Local development: `http://localhost:3000/api/auth/google-callback`

Put the client credentials in Vercel environment variables and `.env.local` for local development. Never put the client secret in GitHub or any `NEXT_PUBLIC_` variable. Complete any audience/testing or verification requirements shown by Google. See [Google’s web-server OAuth guide](https://developers.google.com/identity/protocols/oauth2/web-server).

## 6. Verify the deployed site

Check the homepage and a lesson with interactive graphs and an official-question viewer. Create a test email account, sign out, sign in again, and reload the account page. Test Google login after credentials are configured. Verify `www` redirects to the apex, HTTPS works, `/robots.txt` and `/sitemap.xml` use the correct domain, and anonymous `/account` requests redirect to sign-in.

Email verification and password recovery still require a separate email-provider implementation. Progress synchronization is not included. This guide does not claim those features are enabled.
