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
app.use(helmet({
  contentSecurityPolicy: false,   // managed manually below
  crossOriginResourcePolicy: false,
  crossOriginEmbedderPolicy: false,
}));

// ---- Security headers (CSP + Permissions-Policy) ----------------------------
app.use(function (req, res, next) {
  // Content-Security-Policy
  // Allows:
  //   self-hosted scripts/styles/images/fonts
  //   Google Fonts (for any future font CDN use)
  //   Google Maps iframes (contact section map embed)
  //   Unsplash images (used in team/gallery seed data)
  //   data: URIs (base64 uploaded images stored in CMS)
  // Blocks everything else by default.
  res.setHeader('Content-Security-Policy',
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",          // inline theme-init & JSON-LD scripts
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: https://images.unsplash.com https://safarlegaltrust.in",
      "frame-src https://www.google.com",           // Maps embed
      "connect-src 'self'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'"
    ].join('; ')
  );

  // Permissions-Policy — disable capabilities not used by this site
  res.setHeader('Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=()'
  );

  next();
});

// Ensure CSS files are always served with the correct MIME type
app.use(function (req, res, next) {
  if (req.path.endsWith('.css')) {
    res.setHeader('Content-Type', 'text/css; charset=utf-8');
  }
  next();
});
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

// Prevent caching of dynamic and sensitive API responses
app.use('/api', function (req, res, next) {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
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
  // Prevent admin login page from being indexed by crawlers
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  res.sendFile(path.join(ROOT, 'admin', 'login.html'));
});
app.get(['/admin', '/admin/', '/admin/index.html'], function (req, res) {
  // Prevent admin panel from being indexed by crawlers
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  if (req.session && req.session.authenticated) return res.sendFile(path.join(ROOT, 'admin', 'index.html'));
  res.redirect('/admin/login');
});

// ---- curated static assets (never expose server/, .env, package.json, .git) -
// Only public front-end files are served; the admin HTML shell is gated above.
app.use('/admin', express.static(path.join(ROOT, 'admin'), { index: false, dotfiles: 'ignore' }));

// Static assets caching & WebP content negotiation
app.use('/assets', function (req, res, next) {
  const accept = req.headers.accept || '';
  if (accept.includes('image/webp')) {
    const ext = path.extname(req.path).toLowerCase();
    if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
      const webpPath = path.join(ROOT, 'assets', req.path.replace(/\.(jpg|jpeg|png)$/i, '.webp'));
      if (fs.existsSync(webpPath)) {
        res.setHeader('Content-Type', 'image/webp');
        res.setHeader('Cache-Control', 'public, max-age=604800, stale-while-revalidate=86400');
        res.setHeader('Vary', 'Accept');
        return res.sendFile(webpPath);
      }
    }
  }
  next();
});

app.use('/assets', express.static(path.join(ROOT, 'assets'), {
  dotfiles: 'ignore',
  maxAge: '7d',
  setHeaders: function (res) {
    res.setHeader('Cache-Control', 'public, max-age=604800, stale-while-revalidate=86400');
  }
}));

app.get(['/styles.css', '/site.js'], function (req, res) {
  res.setHeader('Cache-Control', 'public, max-age=86400, must-revalidate'); // 1 day, must revalidate
  res.sendFile(path.join(ROOT, req.path), function (err) { if (err) res.status(404).end(); });
});

app.get(['/favicon.ico', '/favicon.svg'], function (req, res) {
  if (req.path.endsWith('.ico')) res.setHeader('Content-Type', 'image/x-icon');
  else if (req.path.endsWith('.svg')) res.setHeader('Content-Type', 'image/svg+xml');
  res.setHeader('Cache-Control', 'public, max-age=604800, stale-while-revalidate=86400'); // 7 days
  res.sendFile(path.join(ROOT, req.path), function (err) { if (err) res.status(404).end(); });
});
// Helper functions for Server-Side Rendering (SSR) of articles
function getPublishedArticles() {
  const c = readJson(CONTENT_FILE, seedContent);
  if (Array.isArray(c.cases) && c.cases.length) return c.cases;
  if (Array.isArray(c.articles) && c.articles.length) return c.articles;
  if (Array.isArray(seedContent.cases) && seedContent.cases.length) return seedContent.cases;
  return [];
}

function articleSlug(a, idx) {
  const base = (a && a.title ? String(a.title) : '').toLowerCase().trim()
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  return base || ('article-' + (idx + 1));
}

function escHtml(s) {
  return String(s == null ? '' : s).replace(/[&<>'"]/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[c];
  });
}

function paragraphizeHtml(text) {
  const paras = String(text || '').split(/\n\s*\n/).map(function (t) { return t.trim(); }).filter(Boolean);
  if (!paras.length) return '<p>Full details for this article are coming soon.</p>';
  return paras.map(function (t) { return '<p>' + escHtml(t).replace(/\n/g, '<br>') + '</p>'; }).join('');
}

// SEO files
app.get('/sitemap.xml', function (req, res) {
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=86400'); // 24 h
  try {
    const articles = getPublishedArticles();
    let articleUrlsXml = '';
    articles.forEach(function (a, i) {
      const slug = articleSlug(a, i);
      const date = (a.date || '2026-10-10').split('T')[0];
      articleUrlsXml += '\n  <url>\n    <loc>https://safarlegaltrust.in/article?a=' + encodeURIComponent(slug) + '</loc>\n    <lastmod>' + date + '</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>';
    });
    const xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>https://safarlegaltrust.in/</loc>\n    <lastmod>2026-10-10</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>1.0</priority>\n  </url>\n  <url>\n    <loc>https://safarlegaltrust.in/articles</loc>\n    <lastmod>2026-10-10</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n  <url>\n    <loc>https://safarlegaltrust.in/gallery</loc>\n    <lastmod>2026-10-10</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.6</priority>\n  </url>' + articleUrlsXml + '\n</urlset>';
    res.send(xml);
  } catch (err) {
    res.sendFile(path.join(ROOT, 'sitemap.xml'));
  }
});
app.get('/robots.txt', function (req, res) {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=86400'); // 24 h
  res.sendFile(path.join(ROOT, 'robots.txt'), function (err) { if (err) res.status(404).end(); });
});
// llms.txt — plain-text site description for AI language models (emerging standard)
app.get('/llms.txt', function (req, res) {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=86400'); // 24 h
  res.sendFile(path.join(ROOT, 'llms.txt'), function (err) { if (err) res.status(404).end(); });
});

// SSR for /articles — renders article titles, excerpts, tags & crawlable links into initial HTML
app.get(['/articles', '/articles.html'], function (req, res) {
  try {
    const articles = getPublishedArticles();
    let html = fs.readFileSync(path.join(ROOT, 'articles.html'), 'utf8');

    const cardsHtml = articles.map(function (a, i) {
      const slug = articleSlug(a, i);
      const tag = a.tag || a.label || 'Legal Insight';
      const rawImg = a.image || a.photo;
      const img = rawImg ? (rawImg.startsWith('http') || rawImg.startsWith('/') ? rawImg : '/' + rawImg) : null;
      const desc = a.description ? String(a.description).replace(/\n+/g, ' ').slice(0, 240) + '…' : '';
      return `
        <a class="article-card reveal-init" href="/article?a=${encodeURIComponent(slug)}">
          ${img ? `<div class="article-card__media"><img src="${escHtml(img)}" alt="${escHtml(a.title || '')}" loading="lazy"></div>` : ''}
          <div class="article-card__body">
            <span class="article-card__tag">${escHtml(tag)}</span>
            <h2 class="article-card__title" style="font-size:1.25rem;">${escHtml(a.title || 'Untitled Article')}</h2>
            <p class="article-card__excerpt">${escHtml(desc)}</p>
            <span class="article-card__more">Read Article &rarr;</span>
          </div>
        </a>`;
    }).join('');

    if (cardsHtml) {
      html = html.replace(
        /<div class="articles-grid" id="articlesFullGrid">[\s\S]*?<\/div>/,
        '<div class="articles-grid" id="articlesFullGrid">' + cardsHtml + '</div>'
      );
    }

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
    res.send(html);
  } catch (err) {
    res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
    res.sendFile(path.join(ROOT, 'articles.html'));
  }
});

// SSR for /article — renders individual article detail, meta tags, and BlogPosting schema into initial HTML
app.get(['/article', '/article.html'], function (req, res) {
  try {
    const articles = getPublishedArticles();
    let html = fs.readFileSync(path.join(ROOT, 'article.html'), 'utf8');

    if (!articles.length) {
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
      return res.send(html);
    }

    const querySlug = req.query.a ? String(req.query.a).trim().toLowerCase() : '';
    const queryId = parseInt(req.query.id, 10);
    let idx = querySlug ? articles.findIndex(function (a, i) { return articleSlug(a, i) === querySlug; }) : -1;
    if (idx < 0 && !isNaN(queryId) && articles[queryId]) idx = queryId;
    if (idx < 0) idx = 0;

    const a = articles[idx];
    const slug = articleSlug(a, idx);
    const tag = a.tag || a.label || 'Legal Insight';
    const rawImg = a.image || a.photo;
    const img = rawImg ? (rawImg.startsWith('http') || rawImg.startsWith('/') ? rawImg : '/' + rawImg) : null;
    const fullImgUrl = img ? (img.startsWith('http') ? img : 'https://safarlegaltrust.in' + (img.startsWith('/') ? img : '/' + img)) : 'https://safarlegaltrust.in/assets/hero-courtroom.jpg';
    const pageTitle = (a.title ? a.title : 'Legal Article') + ' | Safar Legal Trust';
    const pageUrl = 'https://safarlegaltrust.in/article?a=' + encodeURIComponent(slug);
    const rawDesc = (a.description || '').replace(/\s+/g, ' ').trim();
    const pageDesc = rawDesc.slice(0, 155) + (rawDesc.length > 155 ? '…' : '');
    const pubDate = a.date ? (a.date.includes('T') ? a.date : a.date + 'T10:00:00+05:30') : '2026-01-15T10:00:00+05:30';

    const n = articles.length;
    const prevIdx = (idx - 1 + n) % n;
    const nextIdx = (idx + 1) % n;
    const prevSlug = articleSlug(articles[prevIdx], prevIdx);
    const nextSlug = articleSlug(articles[nextIdx], nextIdx);

    const detailHtml = `
      <a class="article-full__back" href="/articles">&larr; All Articles</a>
      <article class="article-full">
        <header class="article-full__head">
          <span class="article-card__tag">${escHtml(tag)}</span>
          <h1 class="article-full__title">${escHtml(a.title || 'Untitled Article')}</h1>
        </header>
        ${img ? `<div class="article-full__media"><img src="${escHtml(img)}" alt="${escHtml(a.title || '')}"></div>` : ''}
        <div class="article-full__body">${paragraphizeHtml(a.description)}</div>
        ${n > 1 ? `
        <nav class="article-full__nav">
          <a href="/article?a=${encodeURIComponent(prevSlug)}" class="article-nav-btn" data-nav="prev">
            <span class="article-nav-btn__dir">&larr; Previous</span>
            <span class="article-nav-btn__title">${escHtml(articles[prevIdx].title || 'Previous')}</span>
          </a>
          <a href="/article?a=${encodeURIComponent(nextSlug)}" class="article-nav-btn article-nav-btn--next" data-nav="next">
            <span class="article-nav-btn__dir">Next &rarr;</span>
            <span class="article-nav-btn__title">${escHtml(articles[nextIdx].title || 'Next')}</span>
          </a>
        </nav>` : ''}
      </article>`;

    // Replace Title & Description
    html = html.replace(/<title id="metaTitle">[\s\S]*?<\/title>/, `<title id="metaTitle">${escHtml(pageTitle)}</title>`);
    html = html.replace(/<meta id="metaDescription" name="description" content="[\s\S]*?">/, `<meta id="metaDescription" name="description" content="${escHtml(pageDesc)}">`);
    html = html.replace(/<meta id="metaRobots" name="robots" content="[\s\S]*?">/, '<meta id="metaRobots" name="robots" content="index, follow, max-snippet:-1, max-image-preview:large">');
    html = html.replace(/<link id="metaCanonical" rel="canonical" href="[\s\S]*?">/, `<link id="metaCanonical" rel="canonical" href="${pageUrl}">`);

    // Replace Open Graph
    html = html.replace(/<meta id="ogUrl" property="og:url" content="[\s\S]*?">/, `<meta id="ogUrl" property="og:url" content="${pageUrl}">`);
    html = html.replace(/<meta id="ogTitle" property="og:title" content="[\s\S]*?">/, `<meta id="ogTitle" property="og:title" content="${escHtml(pageTitle)}">`);
    html = html.replace(/<meta id="ogDescription" property="og:description" content="[\s\S]*?">/, `<meta id="ogDescription" property="og:description" content="${escHtml(pageDesc)}">`);
    html = html.replace(/<meta id="ogImage" property="og:image" content="[\s\S]*?">/, `<meta id="ogImage" property="og:image" content="${fullImgUrl}">`);

    // Replace Twitter
    html = html.replace(/<meta id="twTitle" name="twitter:title" content="[\s\S]*?">/, `<meta id="twTitle" name="twitter:title" content="${escHtml(pageTitle)}">`);
    html = html.replace(/<meta id="twDescription" name="twitter:description" content="[\s\S]*?">/, `<meta id="twDescription" name="twitter:description" content="${escHtml(pageDesc)}">`);
    html = html.replace(/<meta id="twImage" name="twitter:image" content="[\s\S]*?">/, `<meta id="twImage" name="twitter:image" content="${fullImgUrl}">`);

    // Replace Breadcrumb JSON-LD
    const breadcrumbLd = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': [
        { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://safarlegaltrust.in/' },
        { '@type': 'ListItem', 'position': 2, 'name': 'Articles & Legal Insights', 'item': 'https://safarlegaltrust.in/articles' },
        { '@type': 'ListItem', 'position': 3, 'name': a.title || 'Article', 'item': pageUrl }
      ]
    };
    html = html.replace(/<script id="breadcrumbJsonLd" type="application\/ld\+json">[\s\S]*?<\/script>/, `<script id="breadcrumbJsonLd" type="application/ld+json">\n${JSON.stringify(breadcrumbLd, null, 2)}\n</script>`);

    // Replace BlogPosting JSON-LD
    const blogPostingLd = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      'headline': a.title || 'Legal Article',
      'description': pageDesc,
      'url': pageUrl,
      'mainEntityOfPage': {
        '@type': 'WebPage',
        '@id': pageUrl
      },
      'publisher': {
        '@type': 'Organization',
        '@id': 'https://safarlegaltrust.in/#organization',
        'name': 'Safar Legal Trust'
      },
      'author': {
        '@type': 'Person',
        '@id': 'https://safarlegaltrust.in/#founder',
        'name': 'Adv. Paramhansh Upadhyay'
      },
      'datePublished': pubDate,
      'dateModified': pubDate,
      'inLanguage': 'en-IN',
      'articleSection': tag
    };
    if (img) blogPostingLd.image = fullImgUrl;
    html = html.replace(/<script id="articleJsonLd" type="application\/ld\+json">[\s\S]*?<\/script>/, `<script id="articleJsonLd" type="application/ld+json">\n${JSON.stringify(blogPostingLd, null, 2)}\n</script>`);

    // Replace article body
    html = html.replace(/<div id="articleDetail" class="article-detail">[\s\S]*?<\/div>/, `<div id="articleDetail" class="article-detail">${detailHtml}</div>`);

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
    res.send(html);
  } catch (err) {
    res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
    res.sendFile(path.join(ROOT, 'article.html'));
  }
});

app.get(['/gallery', '/gallery.html'], function (req, res) {
  res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
  res.sendFile(path.join(ROOT, 'gallery.html'));
});
app.get(['/', '/index.html'], function (req, res) {
  res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
  res.sendFile(path.join(ROOT, 'index.html'));
});

// ---- start ------------------------------------------------------------------
app.listen(PORT, function () {
  console.log('Server running:  http://localhost:' + PORT);
  console.log('Public site:     http://localhost:' + PORT + '/');
  console.log('Admin panel:     http://localhost:' + PORT + '/admin');
});





