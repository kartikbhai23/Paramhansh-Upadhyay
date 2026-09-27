# Admin Authentication

Real, server-enforced authentication for the Safar Legal Trust admin panel.

The public website is static HTML/CSS/JS, but the admin panel and all content
now live behind a small **Node.js + Express** backend. The server is the security
boundary: the admin panel HTML, the content-editing APIs, and the stored messages
are all inaccessible without a valid, server-verified session. Nothing in the
browser can be edited to bypass it.

---

## 1. What was added and why

A purely static site cannot authenticate anyone: any "password check" written in
front-end JavaScript ships to the browser and can be read or skipped. To secure
the panel we added the smallest backend that does the job:

- `server/server.js` — the Express app (auth, sessions, CSRF, content + message APIs).
- `server/defaults.js` — seed content used the first time the server starts.
- `scripts/seed-admin.js` — one-off script to create/reset the admin login.
- `admin/login.html` + `admin/login.js` — the sign-in screen.
- `.env` / `.env.example` — configuration and secrets (the real `.env` is git-ignored).

Content that used to live in the browser's `localStorage` now lives in
`server/data/*.json` on the server, so edits are shared with real visitors and
protected by the login.

---

## 2. Requirements

- Node.js 18+ (developed on Node 24). npm ships with Node.
- No native build tools required — all dependencies are pure JavaScript.

## 3. Install

From the project root:

    npm install

## 4. Configure

Copy the example file and fill in your own values:

    cp .env.example .env        # PowerShell: Copy-Item .env.example .env

`.env` keys:

| Key | Purpose |
|-----|---------|
| `NODE_ENV` | `development` or `production`. In production the session cookie is marked `Secure` (HTTPS-only). |
| `PORT` | Port the server listens on (default `3000`). |
| `SESSION_SECRET` | Long random string used to sign the session cookie. Generate one with:<br>`node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"` |
| `ADMIN_EMAIL` | Email for the first admin account (seeded on first run). |
| `ADMIN_PASSWORD` | Password for the first admin account (seeded on first run). |
| `SESSION_TTL_MINUTES` | How long a session stays valid; refreshed on activity (default `120`). |

**Never commit `.env`.** It is listed in `.gitignore`. `.env.example` is the only
env file that belongs in git, and it must never contain real secrets.

## 5. Create the admin account

On first start the server auto-creates the admin from `ADMIN_EMAIL` /
`ADMIN_PASSWORD` if no account exists. To create or reset it explicitly:

    npm run seed              # creates the account (refuses if one already exists)
    npm run seed -- --force   # overwrites the existing account

The password is hashed with **bcrypt** (cost factor 12) before being written to
`server/data/admin.json`. The plaintext password is never stored.

## 6. Run

    npm start

Then open:

- Public site:  http://localhost:3000/
- Admin panel:  http://localhost:3000/admin  (redirects to the login until you sign in)

> Always reach the admin panel through the server URL. Opening
> `admin/index.html` directly from disk (`file://`) will not work — the panel
> talks to the server's APIs.

---

## 7. How the authentication works

**Sessions.** On successful login the server creates a server-side session
(stored as a file under `server/sessions/`) and sends the browser a session
cookie named `pu.sid`. The cookie is:

- `HttpOnly` — not readable by JavaScript, so XSS can't steal it.
- `SameSite=Lax` — not sent on cross-site requests, limiting CSRF.
- `Secure` when `NODE_ENV=production` — only sent over HTTPS.
- Expiring — `maxAge` = `SESSION_TTL_MINUTES`, refreshed on each request (`rolling`).

The cookie holds only an opaque session id; the authenticated flag and email live
server-side. The session persists across page refreshes until it expires or you
log out.

**Password hashing.** Passwords are hashed with bcrypt (cost 12). Login compares
the submitted password against the stored hash. When the email doesn't match any
account, the server still compares against a dummy hash so that a wrong email and a
wrong password take the same amount of time (timing-attack mitigation).

**Generic errors.** A failed login always returns the same message —
`Invalid credentials.` — whether the email or the password was wrong, so an
attacker can't tell which emails exist.

**Session fixation.** The session id is regenerated on successful login, so a
pre-login session id can't be reused to hijack the authenticated session.

**CSRF protection.** A synchronizer token is bound to each session and returned by
`GET /api/csrf`. Every state-changing authenticated request (login, logout,
content save, message delete, credential change) must send it back in the
`x-csrf-token` header; the server rejects mismatches with `403`. The public
contact-form endpoint is exempt (it changes no admin state) but is rate-limited.

**Rate limiting / brute force.** Login attempts and public message submissions are
rate-limited per IP; exceeding the limit returns `429`.

---

## 8. API reference

### Public (no auth)
- `GET  /api/content` — published content for the website (excludes the admin-only
  activity log, media library, and messages).
- `POST /api/messages` — submit the contact form `{ name, email, phone, message }`.
- `GET  /api/csrf` — issue/read the session CSRF token.
- `GET  /api/auth/me` — `{ authenticated: boolean, email? }`.

### Authenticated (session required)
- `POST   /api/auth/login` — `{ email, password }` → sets the session. Needs CSRF.
- `POST   /api/auth/logout` — destroys the session and clears the cookie. Needs CSRF.
- `POST   /api/auth/change-credentials` — `{ currentPassword, newEmail?, newPassword? }`. Needs CSRF.
- `GET    /api/admin/content` — full content (including admin-only sections).
- `PUT    /api/admin/content` — save content. Needs CSRF.
- `GET    /api/admin/messages` — list contact-form submissions.
- `DELETE /api/admin/messages/:id` — delete one submission. Needs CSRF.

Every `/api/admin/*` route and the auth mutations check the session on the server
independently of the front-end. An unauthenticated call gets `401`; the browser
never receives protected data or the password hash. Requesting `/admin` (the panel
HTML) while unauthenticated returns a redirect to `/admin/login` — the panel shell
itself is gated before any static file is served.

---

## 9. Changing your email or password

Sign in, open **Settings → Sign-in credentials**, enter your current password, and
provide a new email and/or new password. Password rule: at least 8 characters
including at least one letter and one number. On success the change is written
immediately (bcrypt-hashed) and takes effect on your next login.

## 10. Logging out

The **Log out** button in the panel header calls `POST /api/auth/logout`, which
destroys the server session and clears the cookie. After logout, every protected
API returns `401` and `/admin` redirects to the login again.

---

## 11. Production notes

- Set `NODE_ENV=production` so the session cookie is `Secure`. This requires
  serving the site over **HTTPS** (typically behind a reverse proxy such as Nginx).
  `trust proxy` is already set for that case.
- Use a long, unique `SESSION_SECRET`. Rotating it invalidates existing sessions.
- Keep `server/data/` and `server/sessions/` on persistent storage and out of git
  (already git-ignored). Back up `server/data/` — it holds your content, messages,
  and the admin hash.
- Consider a process manager (pm2, systemd) so the server restarts on crash/reboot.

## 12. Security checklist

- [x] Passwords hashed with bcrypt (cost 12); plaintext never stored.
- [x] No passwords or secrets in front-end JavaScript, URLs, or API responses.
- [x] The password hash is never returned to the client.
- [x] `.env` git-ignored; only `.env.example` (no real secrets) is committed.
- [x] Auth enforced on the server for every protected route, independent of the UI.
- [x] HttpOnly + SameSite cookies; Secure in production.
- [x] Sessions expire and can be invalidated by logout.
- [x] Generic `Invalid credentials.` message; no user-enumeration.
- [x] CSRF tokens on all authenticated mutations.
- [x] Rate limiting on login and public submissions.
- [x] Session id regenerated on login (fixation protection).

## 13. Troubleshooting

- **Login says "Too many attempts"** — you hit the rate limit; wait, or restart the
  server in development.
- **Forgot the password** — reset it: `npm run seed -- --force` (uses the
  `ADMIN_EMAIL` / `ADMIN_PASSWORD` in `.env`).
- **Panel redirects to login immediately** — your session expired or the cookie was
  cleared; sign in again.
- **Changes don't appear on the public site** — make sure you're viewing the site
  through the server (http://localhost:3000/), not a file opened from disk.




