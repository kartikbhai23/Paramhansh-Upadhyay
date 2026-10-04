require('dotenv').config();
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const express = require('express');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const seedContent = require('./defaults');

const ROOT = path.join(__dirname, '..');
// DATA_DIR can be pointed at a mounted persistent disk (e.g. DATA_DIR=/var/data
// on Render) so CMS edits, messages and admin credentials survive restarts.
// Falls back to server/data for local development.
const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, 'data');
const SESSIONS_FILE = path.join(DATA_DIR, 'sessions.json');
const CONTENT_FILE = path.join(DATA_DIR, 'content.json');
const MESSAGES_FILE = path.join(DATA_DIR, 'messages.json');
const ADMIN_FILE = path.join(DATA_DIR, 'admin.json');

const PORT = process.env.PORT || 3000;
const IS_PROD = process.env.NODE_ENV === 'production';
const SESSION_TTL_MS = (Number(process.env.SESSION_TTL_MINUTES) || 120) * 60 * 1000;
const PASSWORD_RULE = 'Use at least 8 characters, including at least one letter and one number.';
const BCRYPT_ROUNDS = 12;
const CONTENT_KEYS = ['profile', 'pillars', 'practice', 'cases', 'articles', 'testimonials', 'team', 'education', 'experience', 'stats', 'media', 'settings', 'sections', 'announcements', 'activity'];

// ---- tiny JSON file helpers -------------------------------------------------
function ensureDir(dir) { if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true }); }
function readJson(file, fallback) {
  try { return JSON.parse(fs.readFileSync(file, 'utf8')); }
  catch (e) { return fallback; }
}
function writeJson(file, obj) {
  const tmp = file + '.tmp';
  const json = JSON.stringify(obj, null, 2);
  try {
    fs.writeFileSync(tmp, json);
    try {
      // Atomic overwrite: rename replaces the target on POSIX and, via
      // MoveFileEx, on Windows. No unlink-first, so there is no window where
      // the real file is gone and a crash would lose the data.
      fs.renameSync(tmp, file);
    } catch (e) {
      // Windows can throw EPERM/EEXIST if the target is briefly locked (AV,
      // search indexer). Only then fall back to unlink + rename.
      try { if (fs.existsSync(file)) fs.unlinkSync(file); } catch (e2) {}
      fs.renameSync(tmp, file);
    }
  } catch (err) {
    // Last resort: direct (non-atomic) write, then clean up the temp file.
    fs.writeFileSync(file, json);
    try { if (fs.existsSync(tmp)) fs.unlinkSync(tmp); } catch (e) {}
  }
}

// ---- safe session store (zero Windows EPERM rename collisions) --------------
class SafeSessionStore extends session.Store {
  constructor(filePath) {
    super();
    this.filePath = filePath;
    this.sessions = new Map();
    try {
      if (fs.existsSync(filePath)) {
        const raw = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        const now = Date.now();
        for (const [sid, sess] of Object.entries(raw)) {
          if (!sess.cookie || !sess.cookie.expires || new Date(sess.cookie.expires).getTime() > now) {
            this.sessions.set(sid, sess);
          }
        }
      }
    } catch (e) {
      this.sessions = new Map();
    }
    this._saveTimer = null;
  }

  _persist() {
    if (this._saveTimer) return;
    this._saveTimer = setTimeout(() => {
      this._saveTimer = null;
      try {
        const now = Date.now();
        const obj = {};
        for (const [sid, sess] of this.sessions.entries()) {
          if (!sess.cookie || !sess.cookie.expires || new Date(sess.cookie.expires).getTime() > now) {
            obj[sid] = sess;
          } else {
            this.sessions.delete(sid);
          }
        }
        writeJson(this.filePath, obj);
      } catch (err) {}
    }, 400);
  }

  get(sid, cb) {
    const sess = this.sessions.get(sid);
    if (!sess) return cb(null, null);
    if (sess.cookie && sess.cookie.expires && new Date(sess.cookie.expires).getTime() < Date.now()) {
      this.sessions.delete(sid);
      this._persist();
      return cb(null, null);
    }
    return cb(null, sess);
  }

  set(sid, sess, cb) {
    this.sessions.set(sid, sess);
    this._persist();
    if (cb) cb(null);
  }

  destroy(sid, cb) {
    this.sessions.delete(sid);
    this._persist();
    if (cb) cb(null);
  }

  touch(sid, sess, cb) {
    const curr = this.sessions.get(sid);
    if (curr && sess && sess.cookie) {
      curr.cookie = sess.cookie;
      this._persist();
    }
    if (cb) cb(null);
  }
}

// ---- first-run setup: data dirs, seed content + admin -----------------------
function bootstrap() {
  ensureDir(DATA_DIR);
  if (!fs.existsSync(CONTENT_FILE)) {
    writeJson(CONTENT_FILE, seedContent);
    console.log('[setup] Seeded content.json from defaults.');
  } else {
    // If content.json exists but certain essential array sections are empty, backfill from defaults
    const existing = readJson(CONTENT_FILE, {});
    let updated = false;
    for (const k of ['pillars', 'practice', 'cases', 'testimonials', 'team', 'stats', 'media']) {
      // Only seed a section that is MISSING or corrupt (not a valid array) — never
      // one that exists as an empty array, since [] means the admin deleted every
      // item and we must not resurrect deleted content on the next restart.
      if (!Array.isArray(existing[k])) {
        if (Array.isArray(seedContent[k]) && seedContent[k].length > 0) {
          existing[k] = JSON.parse(JSON.stringify(seedContent[k]));
          updated = true;
          console.log(`[setup] Populated missing section '${k}' from defaults.`);
        }
      }
    }
    if (updated) {
      writeJson(CONTENT_FILE, existing);
    }
  }
  if (!fs.existsSync(MESSAGES_FILE)) writeJson(MESSAGES_FILE, []);

  // Sync admin credentials from .env
  const envEmail = (process.env.ADMIN_EMAIL || '').trim().toLowerCase();
  const envPassword = process.env.ADMIN_PASSWORD || '';
  const currentAdmin = readJson(ADMIN_FILE, null);

  if (!currentAdmin) {
    if (envEmail && envPassword) {
      const passwordHash = bcrypt.hashSync(envPassword, BCRYPT_ROUNDS);
      writeJson(ADMIN_FILE, { email: envEmail, passwordHash, updatedAt: new Date().toISOString() });
      console.log('[setup] Created admin account for ' + envEmail + ' from environment variables.');
    } else {
      console.warn('[setup] No admin account and ADMIN_EMAIL/ADMIN_PASSWORD not set. Run: npm run seed');
    }
  }
  // When admin.json already exists it is authoritative — we intentionally do
  // NOT re-sync it from .env, so a password changed in the admin panel survives
  // restarts. To reset a forgotten password, run: npm run seed -- --force.
}
bootstrap();

// ---- validation helpers -----------------------------------------------------
function isEmail(s) { return typeof s === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim()); }
function passwordError(pw) {
  if (typeof pw !== 'string' || pw.length < 8) return PASSWORD_RULE;
  if (!/[A-Za-z]/.test(pw) || !/[0-9]/.test(pw)) return PASSWORD_RULE;
  return null;
}
// Constant dummy hash so a wrong email costs the same time as a wrong password.
const DUMMY_HASH = bcrypt.hashSync('invalid-placeholder-password', BCRYPT_ROUNDS);

// ---- app --------------------------------------------------------------------
const app = express();
app.disable('x-powered-by');
// Trust proxy hops when deriving the client IP for rate limiting. Behind
// exactly one reverse proxy set TRUST_PROXY=1; leave it 0 (default) when the
// app is exposed directly, so clients can't spoof X-Forwarded-For to reset
// their rate-limit bucket.
app.set('trust proxy', Number(process.env.TRUST_PROXY) || 0);
app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: false }));

app.use(session({
  name: 'pu.sid',
  store: new SafeSessionStore(SESSIONS_FILE),
  secret: process.env.SESSION_SECRET || 'insecure-dev-secret-change-me',
  resave: false,
  saveUninitialized: false,
  rolling: false,
  cookie: { httpOnly: true, sameSite: 'lax', secure: IS_PROD, maxAge: SESSION_TTL_MS }
}));

// ---- CSRF (synchronizer token bound to the session) + auth guards -----------
function ensureCsrf(req, res, next) {
  if (!req.session.csrfToken) req.session.csrfToken = crypto.randomBytes(24).toString('hex');
  next();
}
function requireCsrf(req, res, next) {
  const token = req.get('x-csrf-token');
  if (!token || !req.session.csrfToken || token !== req.session.csrfToken) {
    return res.status(403).json({ error: 'Invalid or missing CSRF token.' });
  }
  next();
}
function requireAuth(req, res, next) {
  if (req.session && req.session.authenticated) return next();
  return res.status(401).json({ error: 'Authentication required.' });
}

// ---- rate limiters ----------------------------------------------------------
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, max: 8, standardHeaders: true, legacyHeaders: false,
  handler: function (req, res) { res.status(429).json({ error: 'Too many attempts. Please wait a few minutes and try again.' }); }
});
const messageLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, max: 20, standardHeaders: true, legacyHeaders: false,
  handler: function (req, res) { res.status(429).json({ error: 'Too many submissions. Please try again later.' }); }
});

// ---- CSRF token endpoint ----------------------------------------------------
app.get('/api/csrf', ensureCsrf, function (req, res) {
  res.json({ csrfToken: req.session.csrfToken });
});

// ---- public content + contact form -----------------------------------------
app.get('/api/content', function (req, res) {
  const c = readJson(CONTENT_FILE, seedContent);
  const pub = {};
  // 'activity' is an admin-only audit log; everything else (including the media
  // library that drives the public gallery) is published to the website.
  for (const k of CONTENT_KEYS) { if (k === 'activity') continue; pub[k] = c[k]; }
  res.json(pub);
});

app.post('/api/messages', messageLimiter, function (req, res) {
  const b = req.body || {};
  const name = String(b.name || '').trim().slice(0, 120);
  const email = String(b.email || '').trim().slice(0, 160);
  const phone = String(b.phone || '').trim().slice(0, 60);
  const message = String(b.message || '').trim().slice(0, 4000);
  if (!name || !email) return res.status(400).json({ error: 'Name and email are required.' });
  const messages = readJson(MESSAGES_FILE, []);
  messages.unshift({ id: crypto.randomUUID(), name, email, phone, message, time: new Date().toLocaleString() });
  writeJson(MESSAGES_FILE, messages.slice(0, 500));
  res.json({ ok: true });
});

// ---- auth -------------------------------------------------------------------
app.get('/api/auth/me', function (req, res) {
  if (req.session && req.session.authenticated) return res.json({ authenticated: true, email: req.session.email });
  res.json({ authenticated: false });
});

app.post('/api/auth/login', loginLimiter, ensureCsrf, requireCsrf, function (req, res) {
  const email = String((req.body && req.body.email) || '').trim().toLowerCase();
  const password = String((req.body && req.body.password) || '');
  const admin = readJson(ADMIN_FILE, null);
  const hash = (admin && admin.email === email) ? admin.passwordHash : DUMMY_HASH;
  const ok = !!admin && bcrypt.compareSync(password, hash) && admin.email === email;

  if (!ok) return res.status(401).json({ error: 'Invalid credentials.' });
  req.session.regenerate(function (err) {
    if (err) return res.status(500).json({ error: 'Could not start session.' });
    req.session.authenticated = true;
    req.session.email = admin.email;
    req.session.csrfToken = crypto.randomBytes(24).toString('hex');
    req.session.save(function () { res.json({ ok: true, email: admin.email, csrfToken: req.session.csrfToken }); });
  });
});

app.post('/api/auth/logout', requireAuth, requireCsrf, function (req, res) {
  req.session.destroy(function () { res.clearCookie('pu.sid'); res.json({ ok: true }); });
});

app.post('/api/auth/change-credentials', requireAuth, requireCsrf, function (req, res) {
  const b = req.body || {};
  const currentPassword = String(b.currentPassword || '');
  const newEmail = b.newEmail !== undefined ? String(b.newEmail).trim().toLowerCase() : '';
  const newPassword = b.newPassword !== undefined ? String(b.newPassword) : '';
  const admin = readJson(ADMIN_FILE, null);
  if (!admin || !bcrypt.compareSync(currentPassword, admin.passwordHash)) {
    return res.status(400).json({ error: 'Your current password is incorrect.' });
  }
  if (!newEmail && !newPassword) return res.status(400).json({ error: 'Enter a new email or a new password.' });
  if (newEmail && !isEmail(newEmail)) return res.status(400).json({ error: 'Enter a valid email address.' });
  if (newPassword) { const pe = passwordError(newPassword); if (pe) return res.status(400).json({ error: pe }); }
  const updated = {
    email: newEmail || admin.email,
    passwordHash: newPassword ? bcrypt.hashSync(newPassword, BCRYPT_ROUNDS) : admin.passwordHash,
    updatedAt: new Date().toISOString()
  };
  writeJson(ADMIN_FILE, updated);
  req.session.email = updated.email;
  res.json({ ok: true, email: updated.email });
});

// ---- protected admin content ------------------------------------------------
app.get('/api/admin/content', requireAuth, function (req, res) {
  res.json(readJson(CONTENT_FILE, seedContent));
});

app.put('/api/admin/content', requireAuth, requireCsrf, function (req, res) {
  const body = req.body || {};
  if (typeof body !== 'object' || Array.isArray(body)) return res.status(400).json({ error: 'Invalid content payload.' });
  const current = readJson(CONTENT_FILE, seedContent);
  const next = {};
  for (const k of CONTENT_KEYS) next[k] = (body[k] !== undefined) ? body[k] : current[k];
  writeJson(CONTENT_FILE, next);
  res.json({ ok: true });
});

app.get('/api/admin/messages', requireAuth, function (req, res) {
  res.json(readJson(MESSAGES_FILE, []));
});

app.delete('/api/admin/messages/:id', requireAuth, requireCsrf, function (req, res) {
  const messages = readJson(MESSAGES_FILE, []);
  const filtered = messages.filter(function (m) { return m.id !== req.params.id; });
  writeJson(MESSAGES_FILE, filtered);
  res.json({ ok: true, removed: messages.length - filtered.length });
});

// ---- admin pages: gate the panel BEFORE any static file handler ------------
app.get('/admin/login', function (req, res) {
  res.sendFile(path.join(ROOT, 'admin', 'login.html'));
});
app.get(['/admin', '/admin/', '/admin/index.html'], function (req, res) {
  if (req.session && req.session.authenticated) return res.sendFile(path.join(ROOT, 'admin', 'index.html'));
  res.redirect('/admin/login');
});

// ---- curated static assets (never expose server/, .env, package.json, .git) -
// Only public front-end files are served; the admin HTML shell is gated above.
app.use('/admin', express.static(path.join(ROOT, 'admin'), { index: false, dotfiles: 'ignore' }));
app.use('/assets', express.static(path.join(ROOT, 'assets'), { dotfiles: 'ignore' }));
['/styles.css', '/site.js', '/favicon.ico'].forEach(function (f) {
  app.get(f, function (req, res) {
    res.sendFile(path.join(ROOT, f), function (err) { if (err) res.status(404).end(); });
  });
});
app.get(['/articles', '/articles.html'], function (req, res) {
  res.sendFile(path.join(ROOT, 'articles.html'));
});
app.get(['/article', '/article.html'], function (req, res) {
  res.sendFile(path.join(ROOT, 'article.html'));
});
app.get(['/gallery', '/gallery.html'], function (req, res) {
  res.sendFile(path.join(ROOT, 'gallery.html'));
});
app.get(['/', '/index.html'], function (req, res) {
  res.sendFile(path.join(ROOT, 'index.html'));
});

// ---- start ------------------------------------------------------------------
app.listen(PORT, function () {
  console.log('Server running:  http://localhost:' + PORT);
  console.log('Public site:     http://localhost:' + PORT + '/');
  console.log('Admin panel:     http://localhost:' + PORT + '/admin');
});





