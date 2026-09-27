/**
 * Safar Legal Trust — Client Engine
 * Institutional Legal Education & Mentorship Platform
 * Founded by Adv. Paramhansh Upadhyay
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'paramhanshCMS';
  const THEME_KEY = 'paramhanshTheme';

  // Institutional Default Content
  const defaults = {
    profile: {
      name: 'Adv. Paramhansh Upadhyay',
      designation: 'Advocate & Founder, Safar Legal Trust',
      tagline: 'Safar Legal Trust is dedicated to creating awareness, opportunity, and structured mentorship for law students, young advocates, and communities across India.',
      bio: 'Adv. Paramhansh Upadhyay is the Founder of Safar Legal Trust, an organisation committed to promoting legal awareness, education, justice, and social empowerment.\n\nThrough the Trust, he aims to create meaningful opportunities for law students, young advocates, and communities to understand their rights and responsibilities. His vision is to build a strong network of legal minds that can contribute towards a more informed, accessible, and responsible society.\n\nWith a focus on knowledge, advocacy, and community development, Adv. Paramhansh Upadhyay seeks to bridge the gap between law and society. Safar Legal Trust represents his vision of creating positive change through law, awareness, and collective action.',
      photo: 'assets/paramhansh-upadhyay.png',
      facebook: 'https://www.facebook.com/ParamIAS700',
      instagram: 'https://www.instagram.com/paramhanshupadhyay/',
      youtube: 'https://www.youtube.com/@paramhanshupadhyay'
    },
    pillars: [
      { title: 'Knowledge', description: 'Constitutional rights literacy & legal research' },
      { title: 'Justice', description: 'Accessible, ethical legal advocacy & support' },
      { title: 'Opportunity', description: 'Chamber mentorship & practical court exposure' },
      { title: 'Social Impact', description: 'Bridging the gap between law and society' }
    ],
    settings: {
      title: 'Safar Legal Trust | Legal Education, Mentorship & Practical Training',
      email: 'contact@safarlegaltrust.org',
      phone: '+91 98765 43210',
      address: 'New Delhi, India',
      footer: 'Knowledge • Justice • Opportunity • Social Impact. Empowering Law. Inspiring Change.',
      logo: '',
      heroImage: 'assets/hero-courtroom.jpg',
      aboutImage: 'assets/gallery-library.jpg',
      visionStatement: '\u201CTo build a stronger and more inclusive legal community where knowledge of law becomes a tool for empowerment and positive social change.\u201D',
      visionSlogan: 'Join the Safar. Shape the Future.',
      announcementEnabled: 'true',
      announcementText: '🚨 Admissions Open for Chamber Mentorship Program 2026!\nUpcoming Constitutional Literacy Camp in Delhi\nRegister for Drafting & Pleadings Intensive Workshop',
      announcementSeparator: '•',
      announcementSpeed: '25s'
    },
    announcements: [
      '🚨 Admissions Open for Chamber Mentorship Program 2026!',
      'Upcoming Constitutional Literacy Camp in Delhi',
      'Register for Drafting & Pleadings Intensive Workshop'
    ],
    sections: {
      pillars: {
        eyebrow: 'CORE FOUNDATION',
        title: 'The Four Pillars',
        tagline: 'The guiding principles that shape the vision and initiatives of Safar Legal Trust.'
      },
      practice: {
        eyebrow: 'OUR SERVICES',
        title: 'Practice Areas',
        tagline: 'Core focus areas of Safar Legal Trust — from mentorship and legal aid to community outreach and digital awareness.'
      },
      team: {
        eyebrow: 'LEADERSHIP & GUIDANCE',
        title: 'Our Team',
        tagline: ''
      },
      articles: {
        eyebrow: 'ARTICLES & LEGAL INSIGHTS',
        title: 'Articles & Legal Insights',
        tagline: 'Perspectives, commentary, and field notes from Safar Legal Trust on constitutional rights, advocacy, and community legal literacy.'
      },
      gallery: {
        eyebrow: 'ARCHIVAL & FIELD DOCUMENTATION',
        title: 'Institutional Gallery',
        tagline: 'Documentary glimpses of practical chamber research, drafting masterclasses, and community literacy camps.'
      },
      testimonials: {
        eyebrow: 'CLIENT & STUDENT FEEDBACK',
        title: 'Student & Community Perspectives',
        tagline: "Reflections from law students, young advocates, and community leaders who have experienced the Trust's guidance."
      },
      contact: {
        eyebrow: 'OFFICE & REACH',
        title: 'Contact & Trust Secretariat',
        tagline: 'Connect with Safar Legal Trust for inquiries, admissions, and institutional collaborations.'
      }
    }
  };

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>'"]/g, c => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[c]));
  }

  // Deep merge: server data takes priority, defaults fill gaps
  function deepMerge(target, source) {
    const out = {};
    const keys = new Set([...Object.keys(target || {}), ...Object.keys(source || {})]);
    for (const k of keys) {
      const t = (target || {})[k];
      const s = (source || {})[k];
      if (s === undefined || s === null) {
        out[k] = t;
      } else if (Array.isArray(s)) {
        out[k] = s; // arrays: take source as-is
      } else if (typeof s === 'object' && !Array.isArray(s) && typeof t === 'object' && !Array.isArray(t)) {
        out[k] = deepMerge(t, s);
      } else {
        out[k] = (s !== undefined && s !== null) ? s : t;
      }
    }
    return out;
  }

  function loadData() {
    let saved = null;
    try {
      saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
    } catch (e) {
      saved = null;
    }
    return deepMerge(defaults, saved || {});
  }

  function saveToCache(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) { /* storage full — ignore */ }
  }

  // --- Small DOM helpers ---
  function setText(id, val) {
    const el = document.getElementById(id);
    if (el && val != null && String(val).trim() !== '') el.textContent = val;
  }
  function setImg(id, src) {
    const el = document.getElementById(id);
    if (el && src) el.setAttribute('src', src);
  }

  // --- Dynamic Content Rendering ---
  function renderContent(explicitData) {
    const data = explicitData || loadData();
    const p = data.profile || {};
    const s = data.settings || {};

    if (s.title) {
      document.title = s.title;
      setText('metaTitle', s.title);
    }

    setText('heroTagline', p.tagline);
    setText('founderNameHeading', p.name);
    setText('founderRoleTag', p.designation);
    setImg('founderHeroImg', p.photo);

    // Hero Showcase Photo (Courtroom / Chambers)
    setImg('heroCourtImg', s.heroImage || 'assets/hero-courtroom.jpg');

    // About Trust / Research Library Photo
    setImg('aboutTrustImg', s.aboutImage || 'assets/gallery-library.jpg');

    // Hero badge avatar & details
    const heroAvatars = document.querySelectorAll('.hero-badge-avatar');
    if (p.photo) {
      heroAvatars.forEach(img => img.setAttribute('src', p.photo));
    }
    const badgeName = document.querySelector('.hero-badge-title');
    if (badgeName && p.name) badgeName.textContent = p.name;
    const badgeRole = document.querySelector('.hero-badge-role');
    if (badgeRole && p.designation) badgeRole.textContent = p.designation;

    const bioEl = document.getElementById('aboutBio');
    if (bioEl && p.bio) {
      const paras = p.bio.split(/\n\s*\n/).map(t => t.trim()).filter(Boolean);
      bioEl.innerHTML = paras.map(t => `<p>${esc(t)}</p>`).join('');
    }

    const emailEl = document.getElementById('contactEmail');
    if (emailEl && s.email) emailEl.innerHTML = `<a href="mailto:${esc(s.email)}">${esc(s.email)}</a>`;
    const phoneEl = document.getElementById('contactPhone');
    if (phoneEl && s.phone) phoneEl.innerHTML = `<a href="tel:${esc(String(s.phone).replace(/\s+/g, ''))}">${esc(s.phone)}</a>`;
    setText('contactAddress', s.address);

    setText('visionStatement', s.visionText || s.visionStatement);
    setText('visionSlogan', s.visionSlogan);

    renderLogo(s.logo);
    renderSocials(p);
    renderMap(s);
    renderStats(data.stats);
    renderPillars(data.pillars);
    renderPractice(data.practice);
    renderArticles(data.cases);
    renderArticleDetail(data.cases);
    renderTestimonials(data.testimonials);
    renderTeam(data.team, s);
    renderGallery(data.media, s);
    renderAnnouncements(data.announcements, s);
    renderFooter(s);
    renderSectionHeads(data.sections);
  }

  // --- Editable Section Headings & Taglines ---
  // Each section header on the page exposes three IDs: <key>Eyebrow, <key>Heading,
  // <key>Lead. setText only overwrites when a value is non-empty, so a blank admin
  // field leaves the markup's original text intact. The Team section starts with an
  // empty, hidden tagline (display:none inline) — it only appears once a tagline is set.
  function renderSectionHeads(sections) {
    const s = sections || {};
    const keys = ['pillars', 'practice', 'team', 'articles', 'gallery', 'testimonials', 'contact'];
    keys.forEach(function (k) {
      const cfg = s[k] || {};
      setText(k + 'Eyebrow', cfg.eyebrow);
      setText(k + 'Heading', cfg.title);
      const leadEl = document.getElementById(k + 'Lead');
      if (leadEl && cfg.tagline != null && String(cfg.tagline).trim() !== '') {
        leadEl.textContent = cfg.tagline;
        leadEl.style.display = ''; // reveal a tagline that was hidden by default (Team)
      }
    });
  }

  // --- Announcements Marquee Ticker ---
  function renderAnnouncements(announcements, settings) {
    const section = document.getElementById('marqueeSection');
    const track1 = document.getElementById('marqueeTrack1');
    const track2 = document.getElementById('marqueeTrack2');
    const container = document.getElementById('marqueeContainer');
    if (!section || !track1 || !track2) return;

    const s = settings || {};
    const enabled = s.announcementEnabled !== false && s.announcementEnabled !== 'false';
    if (!enabled) {
      section.style.display = 'none';
      return;
    }
    section.style.display = 'block';

    let list = [];
    if (Array.isArray(announcements) && announcements.length) {
      list = announcements.map(t => String(t || '').trim()).filter(Boolean);
    } else if (s.announcementText) {
      list = s.announcementText.split(/\r?\n/).map(t => t.trim()).filter(Boolean);
    }

    if (!list.length) {
      list = [
        '🚨 Admissions Open for Chamber Mentorship Program 2026!',
        'Upcoming Constitutional Literacy Camp in Delhi',
        'Register for Drafting & Pleadings Intensive Workshop'
      ];
    }

    const separator = s.announcementSeparator || '•';
    const html = list.map(item => `
      <span>${esc(item)}</span>
      <span class="marquee-separator">${esc(separator)}</span>
    `).join('');

    track1.innerHTML = html;
    track2.innerHTML = html;

    if (container && s.announcementSpeed) {
      container.style.animationDuration = s.announcementSpeed;
    }
  }

  // --- Founder social links ---
  function renderSocials(p) {
    const wrap = document.getElementById('founderSocialLinks');
    if (!wrap) return;
    const nets = [
      { key: 'facebook', label: 'Facebook', fill: true, path: '<path d="M13.5 21v-7h2.4l.4-3H13.5V9c0-.87.24-1.46 1.5-1.46H16.5V5.1c-.27-.04-1.2-.11-2.28-.11-2.26 0-3.8 1.38-3.8 3.9V11H8v3h2.42v7h3.08z"/>' },
      { key: 'instagram', label: 'Instagram', fill: false, path: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="1"/>' },
      { key: 'youtube', label: 'YouTube', fill: true, path: '<path d="M22 8.4s-.2-1.5-.8-2.1c-.8-.8-1.7-.8-2.1-.9C16.4 5.2 12 5.2 12 5.2s-4.4 0-7.1.2c-.4 0-1.3.1-2.1.9C2.2 6.9 2 8.4 2 8.4S1.8 10.2 1.8 12v1.9c0 1.8.2 3.6.2 3.6s.2 1.5.8 2.1c.8.8 1.8.8 2.3.9 1.7.2 7 .2 7 .2s4.4 0 7.1-.2c.4-.1 1.3-.1 2.1-.9.6-.6.8-2.1.8-2.1s.2-1.8.2-3.6V12c0-1.8-.2-3.6-.2-3.6z"/><path d="M9.9 15.4V9.6l5.4 2.9-5.4 2.9z" fill="var(--surface)"/>' },
      { key: 'twitter', label: 'Twitter', fill: true, path: '<path d="M18.9 2H22l-7.2 8.2L23 22h-6.6l-5.2-6.8L5.3 22H2l7.7-8.8L1.6 2h6.8l4.7 6.2L18.9 2z"/>' },
      { key: 'linkedin', label: 'LinkedIn', fill: true, path: '<path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.72C24 .77 23.2 0 22.22 0z"/>' }
    ];
    const items = nets.filter(n => p[n.key]).map(n => `
      <a class="founder-social-link" href="${esc(p[n.key])}" target="_blank" rel="noopener">
        <svg viewBox="0 0 24 24" ${n.fill ? 'fill="currentColor"' : 'fill="none" stroke="currentColor" stroke-width="1.8"'}>${n.path}</svg>
        ${esc(n.label)}
      </a>`).join('');
    if (items) wrap.innerHTML = items;
  }

  // --- Location map ---
  function renderMap(s) {
    const wrap = document.getElementById('mapEmbed');
    if (!wrap) return;
    let src = '';
    const embed = (s.mapEmbed || '').trim();
    if (embed) {
      const m = embed.match(/src\s*=\s*["']([^"']+)["']/i);
      src = m ? m[1] : embed;
    } else if (s.address) {
      src = 'https://www.google.com/maps?q=' + encodeURIComponent(s.address) + '&output=embed';
    }
    if (src) wrap.innerHTML = `<iframe title="Trust location map" src="${esc(src)}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`;
  }

  // --- Impact stats ---
  function renderStats(stats) {
    const el = document.getElementById('statsRow');
    if (!el || !Array.isArray(stats) || !stats.length) return;
    const sorted = stats.slice().sort((a, b) => (parseInt(a.order, 10) || 0) - (parseInt(b.order, 10) || 0));
    el.innerHTML = sorted.map(st => `
      <div class="metric-cell">
        <div class="metric-number">${esc(st.value)}</div>
        <div class="metric-label">${esc(st.label)}</div>
      </div>`).join('');
  }

  // --- Four Pillars (dynamic from server) ---
  function renderPillars(pillars) {
    if (!Array.isArray(pillars) || !pillars.length) return;
    const barEl = document.getElementById('pillarsBar');
    if (barEl) {
      barEl.innerHTML = pillars.map(p => `
        <div class="pillar-item">
          <span class="pillar-item__name">${esc(p.title)}</span>
        </div>`).join('');
    }
    const gridEl = document.getElementById('pillarsGrid');
    if (gridEl) {
      gridEl.innerHTML = pillars.map((p, idx) => `
        <div class="continuum-card">
          <span class="continuum-step">Pillar 0${idx + 1}</span>
          <h3>${esc(p.title)}</h3>
          <p>${esc(p.description)}</p>
          ${p.tags ? `<span class="continuum-tags" style="display:block;margin-top:12px;font-size:12px;color:var(--text-muted);font-weight:500;">${esc(p.tags)}</span>` : ''}
        </div>`).join('');
    }
  }

  // --- Practice Areas ---
  function renderPractice(items) {
    const el = document.getElementById('practiceGrid');
    if (!el || !Array.isArray(items) || !items.length) return;
    el.innerHTML = items.map(p => `
      <div class="practical-card">
        <h3>${esc(p.title)}</h3>
        <p>${esc(p.description)}</p>
      </div>`).join('');
  }

  // --- Scroll-reveal for dynamically rendered cards ---
  // Reuses the same .reveal-init / .is-visible classes as wireScrollReveal(),
  // but works for nodes created after page load (article cards from the CMS).
  let dynamicRevealObserver = null;
  function revealCards(nodes) {
    if (!nodes || !nodes.length) return;
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) {
      Array.prototype.forEach.call(nodes, n => n.classList.add('is-visible'));
      return;
    }
    if (!dynamicRevealObserver) {
      dynamicRevealObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) { entry.target.classList.add('is-visible'); obs.unobserve(entry.target); }
        });
      }, { threshold: 0.1 });
    }
    Array.prototype.forEach.call(nodes, (n, i) => {
      n.style.transitionDelay = (i % 3) * 0.08 + 's';
      dynamicRevealObserver.observe(n);
    });
  }

  // --- Articles & Legal Insights ---
  // A single article model { title, tag, description, image, featured } drives
  // the homepage previews (#articlesGrid), the full /articles listing
  // (#articlesFullGrid), and the single-article view (#articleDetail on
  // article.html). Data is stored under the CMS 'cases' key.
  let detailItems = null;
  let detailIdx = -1;

  // URL-safe, order-independent handle for an article (position fallback).
  function articleSlug(a, idx) {
    const base = (a && a.title ? String(a.title) : '').toLowerCase().trim()
      .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    return base || ('article-' + (idx + 1));
  }

  function articleCardHTML(a, idx) {
    const tag = a.tag || a.label || 'Legal Insight';
    const img = a.image || a.photo;
    const href = '/article?a=' + encodeURIComponent(articleSlug(a, idx));
    return `
      <a class="article-card reveal-init" href="${href}">
        ${img ? `<div class="article-card__media"><img src="${esc(img)}" alt="${esc(a.title || '')}" loading="lazy"></div>` : ''}
        <div class="article-card__body">
          <span class="article-card__tag">${esc(tag)}</span>
          <h3 class="article-card__title">${esc(a.title || '')}</h3>
          <p class="article-card__excerpt">${esc(a.description || '')}</p>
          <span class="article-card__more">Read Article &rarr;</span>
        </div>
      </a>`;
  }

  function renderArticles(items) {
    // Homepage: show a curated few — featured first, else the first three.
    // Index comes from the full array so card links survive reordering.
    const grid = document.getElementById('articlesGrid');
    if (grid && Array.isArray(items)) {
      const indexed = items.map((a, i) => ({ a, i }));
      const featured = indexed.filter(o => o.a && o.a.featured);
      const list = (featured.length ? featured : indexed).slice(0, 3);
      if (list.length) {
        grid.innerHTML = list.map(o => articleCardHTML(o.a, o.i)).join('');
        revealCards(grid.querySelectorAll('.article-card'));
      }
    }
    // Dedicated /articles sub-page: list every article, in saved order.
    const full = document.getElementById('articlesFullGrid');
    if (full && Array.isArray(items)) {
      if (items.length) {
        full.innerHTML = items.map((a, i) => articleCardHTML(a, i)).join('');
        revealCards(full.querySelectorAll('.article-card'));
      } else {
        full.innerHTML = '<p class="articles-empty">No articles have been published yet. Please check back soon.</p>';
      }
    }
  }
  // Split a description into paragraphs for the full-article body.
  function paragraphize(text) {
    const paras = String(text || '').split(/\n\s*\n/).map(t => t.trim()).filter(Boolean);
    if (!paras.length) return '<p>Full details for this article are coming soon.</p>';
    return paras.map(t => `<p>${esc(t).replace(/\n/g, '<br>')}</p>`).join('');
  }
  function clip(t, n) {
    t = String(t || 'Untitled');
    return t.length > n ? t.slice(0, n - 1).trim() + '…' : t;
  }

  function articleDetailHTML(a, items, idx) {
    const tag = a.tag || a.label || 'Legal Insight';
    const img = a.image || a.photo;
    const n = items.length;
    const prev = (idx - 1 + n) % n, next = (idx + 1) % n;
    return `
      <a class="article-full__back" href="/articles">&larr; All Articles</a>
      <article class="article-full">
        <header class="article-full__head">
          <span class="article-card__tag">${esc(tag)}</span>
          <h1 class="article-full__title">${esc(a.title || 'Untitled Article')}</h1>
        </header>
        ${img ? `<div class="article-full__media"><img src="${esc(img)}" alt="${esc(a.title || '')}"></div>` : ''}
        <div class="article-full__body">${paragraphize(a.description)}</div>
        ${n > 1 ? `
        <nav class="article-full__nav">
          <button type="button" class="article-nav-btn" data-nav="prev">
            <span class="article-nav-btn__dir">&larr; Previous</span>
            <span class="article-nav-btn__title">${esc(clip(items[prev].title, 44))}</span>
          </button>
          <button type="button" class="article-nav-btn article-nav-btn--next" data-nav="next">
            <span class="article-nav-btn__dir">Next &rarr;</span>
            <span class="article-nav-btn__title">${esc(clip(items[next].title, 44))}</span>
          </button>
        </nav>` : ''}
      </article>`;
  }
  // Render/replace the single-article view. animate=true does a fade
  // out → swap → fade in (used by the Prev/Next buttons); the initial
  // paint just fades in.
  function paintArticle(idx, animate) {
    const host = document.getElementById('articleDetail');
    if (!host || !detailItems || !detailItems[idx]) return;
    const build = () => {
      detailIdx = idx;
      const a = detailItems[idx];
      host.innerHTML = articleDetailHTML(a, detailItems, idx);
      try { history.replaceState(null, '', '/article?a=' + encodeURIComponent(articleSlug(a, idx))); } catch (e) {}
      document.title = ((a && a.title) ? a.title : 'Article') + ' | Safar Legal Trust';
      wireDetailNav();
    };
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      build();
      host.style.opacity = '1';
      if (animate) { try { window.scrollTo(0, 0); } catch (e) {} }
      return;
    }
    if (animate) {
      host.style.opacity = '0';
      try { window.scrollTo({ top: 0, behavior: 'smooth' }); } catch (e) { window.scrollTo(0, 0); }
      setTimeout(() => { build(); requestAnimationFrame(() => { host.style.opacity = '1'; }); }, 340);
    } else {
      build();
      host.style.opacity = '0';
      requestAnimationFrame(() => { host.style.opacity = '1'; });
    }
  }

  function wireDetailNav() {
    const host = document.getElementById('articleDetail');
    if (!host || !detailItems) return;
    const n = detailItems.length;
    const p = host.querySelector('[data-nav="prev"]');
    const nx = host.querySelector('[data-nav="next"]');
    if (p) p.addEventListener('click', () => paintArticle((detailIdx - 1 + n) % n, true));
    if (nx) nx.addEventListener('click', () => paintArticle((detailIdx + 1) % n, true));
  }
  // Entry point (called from renderContent): resolve which article the URL
  // asks for and render it. No-op on pages without #articleDetail.
  function renderArticleDetail(items) {
    const host = document.getElementById('articleDetail');
    if (!host) return;
    detailItems = Array.isArray(items) ? items : [];
    if (!detailItems.length) {
      host.innerHTML = '<p class="articles-empty">This article could not be found. <a href="/articles">Browse all articles &rarr;</a></p>';
      host.style.opacity = '1';
      return;
    }
    const params = new URLSearchParams(location.search);
    const key = params.get('a');
    let idx = key ? detailItems.findIndex((a, i) => articleSlug(a, i) === key) : -1;
    if (idx < 0) { const nn = parseInt(params.get('id'), 10); if (!isNaN(nn) && detailItems[nn]) idx = nn; }
    if (idx < 0) idx = 0;
    if (detailIdx === -1) {
      paintArticle(idx, false); // first paint — fade in
    } else {
      // Server-sync refresh: swap content in place without a fade flicker.
      detailIdx = idx;
      host.innerHTML = articleDetailHTML(detailItems[idx], detailItems, idx);
      host.style.opacity = '1';
      wireDetailNav();
    }
  }

  // --- Client Feedback / Testimonials Single Row with Fade Animation ---
  let feedbackTimer = null;
  let currentFeedbackIndex = 0;
  let feedbackList = [];
  let isFeedbackFading = false;

  function renderTestimonials(items) {
    const container = document.getElementById('testimonialContainer') || document.getElementById('testimonialGrid');
    if (!container) return;
    if (!Array.isArray(items) || !items.length) {
      container.innerHTML = '<div class="feedback-empty muted" style="text-align:center; padding:30px;">No client feedback available yet.</div>';
      return;
    }

    feedbackList = items;
    if (currentFeedbackIndex >= feedbackList.length) currentFeedbackIndex = 0;

    container.className = 'testimonials-single-row';
    container.innerHTML = `
      <div class="feedback-showcase-card" id="feedbackShowcaseCard">
        <span class="feedback-quote-mark" aria-hidden="true">“</span>
        <div class="feedback-content-wrapper" id="feedbackContentWrapper">
          <p class="feedback-quote-text" id="feedbackQuote"></p>
          <div class="feedback-author-row">
            <div class="feedback-author-info">
              <span class="feedback-author-name" id="feedbackAuthor"></span>
              <span class="feedback-author-role" id="feedbackRole"></span>
            </div>
            <div class="feedback-nav-controls">
              <span class="feedback-count-badge" id="feedbackCountBadge">1 / ${feedbackList.length}</span>
              <button class="feedback-nav-btn" id="feedbackPrevBtn" type="button" aria-label="Previous Feedback" title="Previous Feedback">‹</button>
              <div class="feedback-dots" id="feedbackDots"></div>
              <button class="feedback-nav-btn" id="feedbackNextBtn" type="button" aria-label="Next Feedback" title="Next Feedback">›</button>
            </div>
          </div>
        </div>
      </div>
    `;

    // Populate dots
    const dotsContainer = document.getElementById('feedbackDots');
    if (dotsContainer) {
      dotsContainer.innerHTML = feedbackList.map((_, i) => `
        <button class="feedback-dot ${i === currentFeedbackIndex ? 'is-active' : ''}" type="button" aria-label="Go to feedback ${i + 1}" data-index="${i}"></button>
      `).join('');

      dotsContainer.querySelectorAll('.feedback-dot').forEach(dot => {
        dot.addEventListener('click', () => {
          const targetIndex = parseInt(dot.dataset.index, 10);
          if (targetIndex !== currentFeedbackIndex) {
            goToFeedback(targetIndex);
          }
        });
      });
    }

    applyFeedbackContent(currentFeedbackIndex);

    const prevBtn = document.getElementById('feedbackPrevBtn');
    if (prevBtn) {
      prevBtn.onclick = () => {
        const nextIdx = (currentFeedbackIndex - 1 + feedbackList.length) % feedbackList.length;
        goToFeedback(nextIdx);
      };
    }

    const nextBtn = document.getElementById('feedbackNextBtn');
    if (nextBtn) {
      nextBtn.onclick = () => {
        const nextIdx = (currentFeedbackIndex + 1) % feedbackList.length;
        goToFeedback(nextIdx);
      };
    }

    const card = document.getElementById('feedbackShowcaseCard');
    if (card) {
      card.onmouseenter = () => stopFeedbackTimer();
      card.onmouseleave = () => startFeedbackTimer();
    }

    startFeedbackTimer();
  }

  function applyFeedbackContent(index) {
    const item = feedbackList[index];
    if (!item) return;

    const quoteEl = document.getElementById('feedbackQuote');
    const authorEl = document.getElementById('feedbackAuthor');
    const roleEl = document.getElementById('feedbackRole');
    const badgeEl = document.getElementById('feedbackCountBadge');

    if (quoteEl) quoteEl.textContent = `“${item.description || item.quote || ''}”`;
    if (authorEl) authorEl.textContent = item.title || item.name || 'Student / Advocate';
    if (roleEl) {
      roleEl.textContent = item.role || '';
      roleEl.style.display = item.role ? 'inline-block' : 'none';
    }
    if (badgeEl) {
      badgeEl.textContent = `${index + 1} / ${feedbackList.length}`;
    }

    const dots = document.querySelectorAll('#feedbackDots .feedback-dot');
    dots.forEach((d, i) => {
      d.classList.toggle('is-active', i === index);
    });
  }

  function goToFeedback(newIndex) {
    if (isFeedbackFading || newIndex === currentFeedbackIndex || !feedbackList.length) return;
    isFeedbackFading = true;

    const wrapper = document.getElementById('feedbackContentWrapper');
    if (!wrapper) {
      currentFeedbackIndex = newIndex;
      applyFeedbackContent(newIndex);
      isFeedbackFading = false;
      return;
    }

    wrapper.classList.add('is-fading');

    setTimeout(() => {
      currentFeedbackIndex = newIndex;
      applyFeedbackContent(newIndex);
      wrapper.classList.remove('is-fading');
      setTimeout(() => {
        isFeedbackFading = false;
      }, 350);
    }, 320);

    startFeedbackTimer();
  }

  function startFeedbackTimer() {
    stopFeedbackTimer();
    if (feedbackList.length > 1) {
      feedbackTimer = setInterval(() => {
        const nextIdx = (currentFeedbackIndex + 1) % feedbackList.length;
        goToFeedback(nextIdx);
      }, 5000);
    }
  }

  function stopFeedbackTimer() {
    if (feedbackTimer) {
      clearInterval(feedbackTimer);
      feedbackTimer = null;
    }
  }


  // --- Documentary gallery (homepage 2 rows limit + full subpage + ordering + lightbox) ---
  function renderGallery(media, settings) {
    if (!Array.isArray(media) || !media.length) {
      // No media published yet: clear the /gallery sub-page "Loading…"
      // placeholders so they don't hang forever. The homepage #galleryGrid
      // keeps its static fallback tiles (we don't wipe them here).
      const emptyFull = document.getElementById('galleryFullGrid');
      if (emptyFull) emptyFull.innerHTML = '<p class="articles-empty">No gallery photos have been published yet. Please check back soon.</p>';
      const emptyCount = document.getElementById('gallerySubpageCount');
      if (emptyCount) emptyCount.textContent = '0 Institutional Photos';
      const emptyPills = document.getElementById('galleryFilterPills');
      if (emptyPills) emptyPills.innerHTML = '';
      return;
    }

    // Filter valid items
    const valid = media.filter(m => m && (m.data || m.photo || m.url));

    // Sort order handling
    const sortMode = (settings && settings.gallerySort) || 'custom';
    let sorted = [...valid];
    if (sortMode === 'newest') {
      sorted.reverse();
    } else if (sortMode === 'oldest') {
      // preserve natural array order
    } else {
      // Custom order based on m.order
      sorted.sort((a, b) => {
        const ordA = (a.order !== undefined && a.order !== null && a.order !== '') ? Number(a.order) : 9999;
        const ordB = (b.order !== undefined && b.order !== null && b.order !== '') ? Number(b.order) : 9999;
        if (ordA !== ordB) return ordA - ordB;
        return 0;
      });
    }

    // Helper to generate a gallery item HTML
    function itemHTML(m) {
      const src = m.data || m.photo || m.url;
      const caption = m.caption || m.name || m.title || 'Institutional Documentation';
      const tag = m.tag || 'Documentation';
      return `
        <div class="gallery-item" data-src="${esc(src)}" data-caption="${esc(caption)}" data-tag="${esc(tag)}" tabindex="0" role="button" aria-label="View ${esc(caption)}">
          <img src="${esc(src)}" alt="${esc(caption)}" loading="lazy">
          <div class="gallery-caption">
            <span class="gallery-caption__tag">${esc(tag)}</span>
            <div class="gallery-caption__title">${esc(caption)}</div>
          </div>
        </div>`;
    }

    // 1. Homepage Gallery (#galleryGrid) — Limited to 2 rows (8 images max on 4 columns)
    const homeGrid = document.getElementById('galleryGrid');
    if (homeGrid) {
      const maxRows = (settings && settings.galleryMaxRows) || '2';
      let maxItems = 8; // Default 2 rows * 4 columns = 8 images
      if (maxRows === '1') maxItems = 4;
      else if (maxRows === '3') maxItems = 12;
      else if (maxRows === 'all') maxItems = sorted.length;

      const homeItems = sorted.slice(0, maxItems);
      homeGrid.innerHTML = homeItems.map(itemHTML).join('');

      // Update badge count on homepage View More button
      const totalBadge = document.getElementById('galleryTotalBadge');
      if (totalBadge) totalBadge.textContent = sorted.length;

      const viewMoreRow = document.getElementById('galleryViewMoreRow');
      if (viewMoreRow) {
        viewMoreRow.style.display = 'block';
      }
    }

    // 2. Subpage Gallery (#galleryFullGrid on /gallery) — Displays ALL media
    const fullGrid = document.getElementById('galleryFullGrid');
    if (fullGrid) {
      fullGrid.innerHTML = sorted.map(itemHTML).join('');

      const countEl = document.getElementById('gallerySubpageCount');
      if (countEl) countEl.textContent = `${sorted.length} Institutional Photos`;

      // Build tag filters
      const pillsContainer = document.getElementById('galleryFilterPills');
      if (pillsContainer) {
        const rawTags = sorted.map(m => (m.tag || 'Documentation').trim()).filter(Boolean);
        const tags = ['all', ...new Set(rawTags)];
        pillsContainer.innerHTML = tags.map(t => `
          <button class="gallery-filter-btn ${t === 'all' ? 'is-active' : ''}" type="button" data-filter="${esc(t)}">
            ${t === 'all' ? `All Photos (${sorted.length})` : esc(t)}
          </button>
        `).join('');

        pillsContainer.querySelectorAll('.gallery-filter-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            pillsContainer.querySelectorAll('.gallery-filter-btn').forEach(b => b.classList.remove('is-active'));
            btn.classList.add('is-active');
            const filter = btn.dataset.filter;
            const filtered = filter === 'all' ? sorted : sorted.filter(m => (m.tag || 'Documentation').trim().toLowerCase() === filter.toLowerCase());
            fullGrid.innerHTML = filtered.map(itemHTML).join('');
            if (countEl) countEl.textContent = `${filtered.length} of ${sorted.length} Photos`;
            wireLightbox();
          });
        });
      }
    }

    // 3. Setup Lightbox click handlers
    wireLightbox();
  }

  // --- Lightbox Preview Handler ---
  function wireLightbox() {
    const items = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('galleryLightbox');
    const lbImg = document.getElementById('galleryLightboxImg');
    const lbTitle = document.getElementById('galleryLightboxTitle');
    const lbTag = document.getElementById('galleryLightboxTag');
    const lbClose = document.getElementById('galleryLightboxClose');
    const lbBackdrop = document.getElementById('galleryLightboxBackdrop');

    if (!lightbox || !lbImg) return;

    function openLb(src, caption, tag) {
      lbImg.src = src;
      lbImg.alt = caption;
      if (lbTitle) lbTitle.textContent = caption;
      if (lbTag) lbTag.textContent = tag;
      lightbox.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }

    function closeLb() {
      lightbox.style.display = 'none';
      lbImg.src = '';
      document.body.style.overflow = '';
    }

    items.forEach(el => {
      el.onclick = () => {
        const src = el.dataset.src;
        const caption = el.dataset.caption;
        const tag = el.dataset.tag;
        if (src) openLb(src, caption, tag);
      };
      el.onkeydown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          el.click();
        }
      };
    });

    if (lbClose) lbClose.onclick = closeLb;
    if (lbBackdrop) lbBackdrop.onclick = closeLb;

    // Bind the Escape-to-close handler only ONCE. wireLightbox() runs on every
    // gallery render and every filter click, so the old inline binding leaked a
    // new document 'keydown' listener each time. This self-contained handler
    // looks the elements up fresh, so it stays correct across re-renders.
    if (!wireLightbox._escBound) {
      document.addEventListener('keydown', e => {
        if (e.key !== 'Escape') return;
        const lb = document.getElementById('galleryLightbox');
        if (lb && lb.style.display === 'flex') {
          lb.style.display = 'none';
          const img = document.getElementById('galleryLightboxImg');
          if (img) img.src = '';
          document.body.style.overflow = '';
        }
      });
      wireLightbox._escBound = true;
    }
  }

  // --- Helper to render a team card ---
  function createTeamCardHTML(member) {
    const label = member.title || member.name || 'Advocate';
    const initials = label.split(/\s+/).map(n => n[0]).join('').substring(0, 2).toUpperCase();
    return `
      <div class="team-card">
        <div class="team-card__photo">
          ${member.photo ? `<img src="${esc(member.photo)}" alt="${esc(label)}" loading="lazy">` : `<div class="team-card__placeholder">${esc(initials)}</div>`}
        </div>
        <div class="team-card__info">
          <h3>${esc(label)}</h3>
          <span class="team-card__role">${esc(member.role || '')}</span>
          <p>${esc(member.description || '')}</p>
        </div>
      </div>`;
  }

  // --- Team slider ---
  function renderTeam(team, s) {
    const teamEl = document.getElementById('teamContainer');
    if (!teamEl || !Array.isArray(team) || !team.length) return;
    const mode = (s && s.teamSliderMode) || 'auto';
    const speed = (s && s.teamSliderSpeed) || '35s';
    // Whenever number of team members increases or is 3 or more, enable smooth sliding animation
    const animated = mode === 'always' || (mode !== 'grid' && team.length >= 3);

    const cardsHtml = team.map(createTeamCardHTML).join('');

    if (!animated) {
      teamEl.innerHTML = `<div class="team-static-grid">${cardsHtml}</div>`;
      return;
    }

    const style = ` style="animation-duration:${esc(speed)}"`;
    teamEl.innerHTML = `
      <div class="team-marquee" id="teamMarquee">
        <div class="team-track is-sliding"${style} id="teamTrack">
          <div class="team-group">${cardsHtml}</div>
          <div class="team-group" aria-hidden="true">${cardsHtml}</div>
        </div>
      </div>`;

    // When mouse is on a particular person or the track, pause immediately; resume on mouse leave
    const track = document.getElementById('teamTrack');
    const marquee = document.getElementById('teamMarquee');
    if (track && marquee) {
      marquee.addEventListener('mouseenter', () => {
        track.style.animationPlayState = 'paused';
      });
      marquee.addEventListener('mouseleave', () => {
        track.style.animationPlayState = 'running';
      });
    }
  }

  // --- Footer ---
  function renderFooter(s) {
    setText('footerMotto', s.footer);
    setText('footerAddress', s.address);
    const em = document.getElementById('footerEmail');
    if (em && s.email) { em.textContent = s.email; em.setAttribute('href', 'mailto:' + s.email); }
    const ph = document.getElementById('footerPhone');
    if (ph && s.phone) { ph.textContent = s.phone; ph.setAttribute('href', 'tel:' + String(s.phone).replace(/\s+/g, '')); }
    const cp = document.getElementById('footerCopyright');
    if (cp) cp.textContent = '\u00A9 ' + new Date().getFullYear() + ' Safar Legal Trust. All rights reserved.';
  }

  // --- Header & Footer Branding / Logo ---
  function renderLogo(logoUrl) {
    const brands = document.querySelectorAll('.header__brand, #siteLogo');
    brands.forEach(brand => {
      let crest = brand.querySelector('.brand-crest');
      if (!crest) {
        crest = document.createElement('div');
        crest.className = 'brand-crest';
        brand.insertBefore(crest, brand.firstChild);
      }
      if (logoUrl && String(logoUrl).trim()) {
        crest.innerHTML = `<img src="${esc(logoUrl)}" alt="Safar Legal Trust Emblem" class="brand-crest-img">`;
        crest.classList.add('has-custom-logo');
      } else {
        crest.innerHTML = '§';
        crest.classList.remove('has-custom-logo');
      }
    });

    // Footer brand crest
    const footerCrests = document.querySelectorAll('.footer-brand .brand-crest, #footerBrandCrest');
    footerCrests.forEach(crest => {
      if (logoUrl && String(logoUrl).trim()) {
        crest.innerHTML = `<img src="${esc(logoUrl)}" alt="Safar Legal Trust" class="brand-crest-img">`;
        crest.classList.add('has-custom-logo');
        crest.style.display = 'flex';
      } else {
        crest.innerHTML = '§';
        crest.classList.remove('has-custom-logo');
        crest.style.display = 'none';
      }
    });

    // Update browser tab favicon if custom logo present
    if (logoUrl && String(logoUrl).trim()) {
      let fav = document.querySelector('link[rel="icon"]');
      if (!fav) {
        fav = document.createElement('link');
        fav.setAttribute('rel', 'icon');
        document.head.appendChild(fav);
      }
      fav.setAttribute('href', logoUrl);
    }
  }

  // --- Theme Controller ---
  function wireTheme() {
    const btn = document.getElementById('themeToggle');
    const icon = document.getElementById('themeIcon');
    if (!btn) return;

    function applyTheme(theme) {
      document.documentElement.setAttribute('data-theme', theme);
      try { localStorage.setItem(THEME_KEY, theme); } catch (e) {}

      if (icon) {
        if (theme === 'dark') {
          // Sun icon
          icon.innerHTML = '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>';
        } else {
          // Moon icon
          icon.innerHTML = '<path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z"/>';
        }
      }
    }

    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    applyTheme(currentTheme);

    btn.addEventListener('click', () => {
      const active = document.documentElement.getAttribute('data-theme') || 'light';
      applyTheme(active === 'dark' ? 'light' : 'dark');
    });
  }

  // --- Mobile Navigation Drawer ---
  function wireMobileMenu() {
    const btn = document.getElementById('mobileMenuBtn');
    const nav = document.getElementById('mainNav');
    if (!btn || !nav) return;

    btn.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      btn.classList.toggle('is-active', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        btn.classList.remove('is-active');
        document.body.style.overflow = '';
      });
    });
  }

  // --- Active Navigation Highlighting ---
  function wireActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.header__nav a');
    if (!sections.length || !navLinks.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('is-active');
            } else {
              link.classList.remove('is-active');
            }
          });
        }
      });
    }, { threshold: 0.25, rootMargin: '-60px 0px -40% 0px' });

    sections.forEach(sec => observer.observe(sec));
  }

  // --- Scroll Reveal Animations ---
  function wireScrollReveal() {
    if (!('IntersectionObserver' in window)) return;

    const elementsToReveal = document.querySelectorAll(
      '.section-head, .program-card, .practical-card, .continuum-card, .founder-profile, .gallery-item, .article-card, .testimonial-card, .event-card, .institutional-form'
    );

    elementsToReveal.forEach(el => el.classList.add('reveal-init'));

    const revealObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    elementsToReveal.forEach(el => revealObserver.observe(el));
  }

  // --- Application & Contact Form Submission ---
  function wireForm() {
    const form = document.getElementById('contactForm');
    const note = document.getElementById('formNote');
    const submitBtn = document.getElementById('submitBtn');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = (document.getElementById('cfName')?.value || '').trim();
      const email = (document.getElementById('cfEmail')?.value || '').trim();
      const phone = (document.getElementById('cfPhone')?.value || '').trim();
      const institution = (document.getElementById('cfInstitution')?.value || '').trim();
      const year = (document.getElementById('cfYear')?.value || '').trim();
      const rawMessage = (document.getElementById('cfMessage')?.value || '').trim();

      if (!name || !email || !year) {
        showNote('Please provide your full name, valid email address, and year of study.', false);
        return;
      }

      const fullMessage = `[Application Details]\nInstitution: ${institution}\nYear / Status: ${year}\n\nStatement of Intent:\n${rawMessage}`;

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting Application...';
      }

      let sentToServer = false;

      try {
        const res = await fetch('/api/messages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, phone, message: fullMessage })
        });
        if (res.ok) sentToServer = true;
      } catch (err) {
        // Network error / server unreachable
      }

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit Application / Inquiry';
      }

      if (sentToServer) {
        form.reset();
        showNote(
          'Thank you. Your mentorship application has been formally received by the Trust Secretariat. We will review your credentials and connect with you shortly.',
          true
        );
      } else {
        // Submission failed — do NOT clear the form or claim success, so the
        // applicant can retry without re-typing everything.
        showNote(
          'We could not submit your application right now. Please check your internet connection and try again in a moment.',
          false
        );
      }
    });

    function showNote(msg, isSuccess) {
      if (!note) return;
      note.textContent = msg;
      note.className = 'form-feedback ' + (isSuccess ? 'is-success' : 'is-error');
      note.style.display = 'block';
      setTimeout(() => {
        if (isSuccess) note.style.display = 'none';
      }, 9000);
    }
  }

  // --- Server Content Sync (deep merge, server is source of truth) ---
  async function syncFromServer() {
    try {
      const res = await fetch('/api/content');
      if (res.ok) {
        const serverData = await res.json();
        if (serverData && typeof serverData === 'object') {
          // Deep merge: server data wins over defaults, cached to localStorage
          const merged = deepMerge(defaults, serverData);
          saveToCache(merged);
          renderContent(merged);
        }
      }
    } catch (e) {
      // Offline / standalone operation supported — use cached localStorage data
    }
  }

  // Initialize on DOM load
  document.addEventListener('DOMContentLoaded', () => {
    wireTheme();
    renderContent();
    wireMobileMenu();
    wireActiveNav();
    wireScrollReveal();
    wireForm();
    syncFromServer();
  });
})();
