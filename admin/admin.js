// =========================================================================
//  Paramhansh Upadhyay — Advocate Admin CMS
//  Fully server-synced: all data lives in server/data/content.json
//  localStorage is used only as a fallback cache when offline.
// =========================================================================

const KEY = 'paramhanshCMS';
const defaults = {
  profile: {
    name: 'Adv. Paramhansh Upadhyay',
    designation: 'Founder, Safar Legal Trust',
    tagline: 'Safar Legal Trust is dedicated to creating awareness, opportunity, and structured mentorship for law students, young advocates, and communities across India.',
    experience: '10+',
    bio: 'Adv. Paramhansh Upadhyay is the Founder of Safar Legal Trust, an organisation committed to promoting legal awareness, education, justice, and social empowerment.\n\nThrough the Trust, he aims to create meaningful opportunities for law students, young advocates, and communities to understand their rights and responsibilities. His vision is to build a strong network of legal minds that can contribute towards a more informed, accessible, and responsible society.\n\nWith a focus on knowledge, advocacy, and community development, Adv. Paramhansh Upadhyay seeks to bridge the gap between law and society. Safar Legal Trust represents his vision of creating positive change through law, awareness, and collective action.',
    photo: 'assets/paramhansh-upadhyay.png',
    facebook: 'https://www.facebook.com/ParamIAS700',
    instagram: 'https://www.instagram.com/paramhanshupadhyay/',
    youtube: 'https://www.youtube.com/@paramhanshupadhyay',
    twitter: '',
    linkedin: ''
  },
  pillars: [
    { title: 'Knowledge', description: 'Creating widespread legal awareness and literacy. Demystifying complex laws for students, young professionals, and citizens so they fully understand their constitutional rights and responsibilities.', tags: 'Legal Literacy • Education • Rights Awareness' },
    { title: 'Justice', description: 'Promoting accessible, fair, and responsible legal advocacy. Championing ethical legal practice and standing by underprivileged communities to make the justice system equitable.', tags: 'Accessible Justice • Pro Bono Pathways • Ethics' },
    { title: 'Opportunity', description: 'Providing mentorship, practical training, research internships, and networking platforms for law students and budding advocates to help them thrive in the legal profession.', tags: 'Student Mentorship • Internships • Advocacy Bootcamps' },
    { title: 'Social Impact', description: 'Bridging the gap between law and society through grassroots community action, citizen outreach campaigns, and collaborative efforts that spark positive social change.', tags: 'Community Action • Citizen Rights • Collective Progress' }
  ],
  practice: [
    { title: 'Law Student Mentorship', description: 'Structured guidance, court observation, research internships, and moot court training designed to prepare young legal aspirants for successful careers.' },
    { title: 'Community Rights Awareness', description: 'Grassroots workshops educating citizens on fundamental rights, consumer protections, cyber law basics, and everyday legal remedies.' },
    { title: 'Pro Bono Legal Guidance', description: 'Connecting underprivileged citizens and vulnerable families with reliable, compassionate advice and institutional legal aid pathways.' },
    { title: 'Young Advocates Network', description: 'A collaborative peer forum fostering knowledge-exchange, research roundtables, professional ethics, and leadership in litigation.' },
    { title: 'Legal Research & Policy', description: 'Publishing accessible legal briefs, comparative insights, and actionable policy whitepapers to support law reforms and social justice.' },
    { title: 'Digital Legal Literacy', description: 'Creating engaging video tutorials, explanatory legal guides, and social media campaigns to make the law accessible to every household.' }
  ],
  cases: [
    { title: 'Pan-India Legal Literacy Drive', description: 'Conducted interactive workshops empowering citizens and students with fundamental constitutional and statutory rights.' },
    { title: 'Youth Advocacy & Mentorship Bootcamps', description: 'Mentored law graduates and students in trial advocacy, procedural drafting, and ethical litigation practice.' },
    { title: 'Grassroots Community Aid & Support', description: 'Assisted underprivileged families in accessing legal aid and understanding administrative dispute mechanisms.' }
  ],
  testimonials: [
    { title: 'Priya Sharma (Law Student)', description: 'Safar Legal Trust provided the exact mentorship and clarity I needed as a first-generation law student. Adv. Paramhansh Upadhyay’s guidance on courtroom drafting transformed my outlook.' },
    { title: 'Rajesh Verma (Social Worker)', description: 'The community legal camp organized by Safar Legal Trust enlightened hundreds of residents in our locality about basic consumer rights and legal aid procedures. Truly inspiring work!' },
    { title: 'Adv. Amit K. (Young Advocate)', description: 'A visionary platform bridging theory and real-world legal advocacy. The Trust is fostering an ethical, dedicated network of young legal professionals across India.' }
  ],
  team: [
    { title: 'Adv. Paramhansh Upadhyay', role: 'Founder & Chairman', photo: 'assets/paramhansh-upadhyay.png', description: 'Founder of Safar Legal Trust, leading the vision to bridge law and society through education, legal awareness, and youth empowerment.' },
    { title: 'Adv. Ananya Mehra', role: 'Head of Legal Aid & Research', photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80', description: 'Oversees community legal outreach, constitutional rights research, and pro bono legal assistance for marginalized individuals.' },
    { title: 'Rohan Kapoor', role: 'Director of Youth & Student Mentorship', photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80', description: 'Leads nationwide student bootcamps, court observation initiatives, and skill development programs for aspiring legal professionals.' }
  ],
  education: [],
  experience: [],
  stats: [
    { value: '10,000+', label: 'Students & Citizens Reached', description: 'Across workshops & awareness drives', order: '1' },
    { value: 'Pan-India', label: 'Community Outreach', description: 'Active youth and advocate network', order: '2' },
    { value: '4 Pillars', label: 'Core Commitments', description: 'Knowledge • Justice • Opportunity • Impact', order: '3' }
  ],
  media: [
    {
      name: 'gallery-library.jpg',
      data: 'assets/gallery-library.jpg',
      caption: "Advocate's Association Library & Case Law Analysis",
      tag: 'Research & Precedent'
    },
    {
      name: 'gallery-drafting.jpg',
      data: 'assets/gallery-drafting.jpg',
      caption: 'Chamber Drafting Masterclass & Petition Review',
      tag: 'Procedural Lab'
    },
    {
      name: 'gallery-community.jpg',
      data: 'assets/gallery-community.jpg',
      caption: 'Constitutional Literacy & Citizen Rights Workshop',
      tag: 'Grassroots Outreach'
    },
    {
      name: 'hero-courtroom.jpg',
      data: 'assets/hero-courtroom.jpg',
      caption: 'Chambers & Trial Courtroom Decorum Study',
      tag: 'Courtroom Procedure'
    }
  ],
  messages: [],
  announcements: [
    '🚨 Admissions Open for Chamber Mentorship Program 2026!',
    'Upcoming Constitutional Literacy Camp in Delhi',
    'Register for Drafting & Pleadings Intensive Workshop'
  ],
  settings: {
    title: 'Safar Legal Trust | Empowering Law. Inspiring Change.',
    email: 'contact@safarlegaltrust.org',
    phone: '+91 98765 43210',
    address: 'New Delhi, India',
    footer: 'Knowledge • Justice • Opportunity • Social Impact. Empowering Law. Inspiring Change.',
    logo: '',
    heroImage: 'assets/hero-courtroom.jpg',
    aboutImage: 'assets/gallery-library.jpg',
    mapEmbed: '',
    visionText: '“To build a stronger and more inclusive legal community where knowledge of law becomes a tool for empowerment and positive social change.”',
    visionSlogan: 'Join the Safar. Shape the Future.',
    teamSliderMode: 'auto',
    teamSliderSpeed: '35s',
    gallerySort: 'custom',
    galleryMaxRows: '2',
    announcementEnabled: 'true',
    announcementText: '🚨 Admissions Open for Chamber Mentorship Program 2026!\nUpcoming Constitutional Literacy Camp in Delhi\nRegister for Drafting & Pleadings Intensive Workshop',
    announcementSeparator: '•',
    announcementSpeed: '25s'
  },
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
  },
  activity: []
};

function mergeDefaults(saved, def) {
  const out = {};
  for (const k in def) {
    if (Array.isArray(def[k])) {
      // Respect a saved array even when EMPTY — an empty section means the admin
      // deleted every item in it, so it must not silently repopulate from defaults.
      // Only fall back to defaults when the section is genuinely absent/corrupt.
      out[k] = Array.isArray(saved && saved[k]) ? saved[k] : JSON.parse(JSON.stringify(def[k]));
    } else if (def[k] && typeof def[k] === 'object') {
      out[k] = Object.assign(JSON.parse(JSON.stringify(def[k])), (saved && saved[k]) || {});
    } else {
      out[k] = (saved && saved[k] !== undefined && saved[k] !== null && saved[k] !== '') ? saved[k] : def[k];
    }
  }
  return out;
}

// Start with cached data — server sync in init() will overwrite.
// A corrupt or oversized localStorage cache must NEVER abort this script: if it
// did, every function below (nav wiring, and each Delete/Edit handler) would go
// unwired and the whole panel would look dead. Parse defensively and self-heal
// by discarding a bad cache so the next save() rewrites a clean one.
function readCache() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    try { localStorage.removeItem(KEY); } catch (_) {}
    return null;
  }
}
let data = mergeDefaults(readCache(), defaults);

// ---------------------------------------------------------------------------
// Server API layer — talks to the authenticated backend (see server/server.js)
// ---------------------------------------------------------------------------
let csrfToken = '';

async function fetchCsrf() {
  try {
    const r = await fetch('/api/csrf', { credentials: 'same-origin' });
    if (r.ok) { const j = await r.json(); csrfToken = j.csrfToken || ''; }
  } catch (e) { /* offline — mutations will surface an error */ }
  return csrfToken;
}

// Wrapper around fetch that attaches the session cookie, injects the CSRF
// token on mutating requests, bounces to the login page on 401, and retries
// once with a fresh token on 403 (a stale token after the session rotated).
async function api(path, options = {}, _retried = false) {
  const opts = Object.assign({ credentials: 'same-origin' }, options);
  opts.headers = Object.assign({}, options.headers || {});
  const method = (opts.method || 'GET').toUpperCase();
  const mutating = method !== 'GET' && method !== 'HEAD';
  if (mutating) {
    if (!csrfToken) await fetchCsrf();
    opts.headers['x-csrf-token'] = csrfToken;
  }
  const res = await fetch(path, opts);
  if (res.status === 401) {
    window.location.href = '/admin/login';
    throw new Error('Your session has expired. Please sign in again.');
  }
  if (res.status === 403 && mutating && !_retried) {
    await fetchCsrf();
    return api(path, options, true);
  }
  return res;
}

async function save() {
  // Cache locally for instant feedback — but a full or oversized cache (e.g. large
  // base64 media blobs hitting the ~5MB localStorage quota) must NOT abort save(),
  // or the server sync and the re-render below would never run and a delete/edit
  // would silently appear to do nothing. The server PUT is the real source of truth.
  try {
    localStorage.setItem(KEY, JSON.stringify(data));
  } catch (e) { /* quota exceeded / storage unavailable — server PUT still persists */ }
  const status = document.getElementById('saveStatus');
  if (status) status.textContent = '● Saving…';

  try {
    const res = await api('/api/admin/content', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (status) status.textContent = res.ok ? '● Saved & synced' : '● Saved locally (sync failed)';
  } catch (e) {
    if (status) status.textContent = '● Saved locally (offline)';
  }

  setTimeout(() => {
    if (status) status.textContent = '● All changes saved';
  }, 1400);

  render();
}

function esc(s = '') {
  return String(s == null ? '' : s).replace(/[&<>'"]/g, c => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
  }[c]));
}

function toast(msg) {
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 1800);
}

const labels = {
  dashboard: 'Advocate Dashboard',
  profile: 'Profile Management',
  images: 'Website Images & Visual Assets',
  pillars: 'Core Pillars & Principles',
  practice: 'Practice Areas',
  cases: 'Articles & Legal Insights',
  testimonials: 'Feedback',
  team: 'Team Members & Slider Options',
  media: 'Institutional Gallery & Media Library',
  announcements: 'Announcement Marquee Bar',
  messages: 'Contact Messages & Enquiries',
  settings: 'Website Settings',
  stats: 'Impact Statistics',
  sections: 'Section Headings & Taglines'
};

function openSection(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.toggle('active-page', p.id === id));
  document.querySelectorAll('.nav-item').forEach(b => b.classList.toggle('active', b.dataset.section === id));
  const pt = document.getElementById('pageTitle');
  if (pt) pt.textContent = labels[id] || 'Dashboard';
  window.scrollTo({ top: 0, behavior: 'smooth' });
  render();
}

document.querySelectorAll('.nav-item').forEach(b => b.addEventListener('click', () => openSection(b.dataset.section)));
document.querySelectorAll('[data-go]').forEach(b => b.addEventListener('click', () => openSection(b.dataset.go)));

function addActivity(text) {
  data.activity.unshift({ text, time: new Date().toLocaleString() });
  data.activity = data.activity.slice(0, 8);
}

function mapEmbedSrc() {
  if (data.settings.mapEmbed) return data.settings.mapEmbed;
  if (data.settings.address) return 'https://www.google.com/maps?q=' + encodeURIComponent(data.settings.address) + '&output=embed';
  return '';
}

const FIELD_CONFIG = {
  pillars: {
    label: 'Core Pillar',
    fields: [
      { key: 'title', label: 'Pillar Title (e.g. Knowledge, Justice)' },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'tags', label: 'Tags / Focus Areas (optional)' }
    ]
  },
  practice: {
    label: 'Practice Area',
    fields: [
      { key: 'title', label: 'Practice Area Title' },
      { key: 'description', label: 'Description', type: 'textarea' }
    ]
  },
  cases: {
    label: 'Article',
    fields: [
      { key: 'title', label: 'Article Title' },
      { key: 'tag', label: 'Label / Tag (e.g. Constitutional Law)' },
      { key: 'image', label: 'Article Photo', type: 'file' },
      { key: 'description', label: 'Description / Summary', type: 'textarea' }
    ]
  },
  testimonials: {
    label: 'Feedback',
    fields: [
      { key: 'title', label: 'Client Name / Label' },
      { key: 'role', label: 'Role / Affiliation (optional)' },
      { key: 'description', label: 'Client Feedback', type: 'textarea' }
    ]
  },
  team: {
    label: 'Team Member',
    fields: [
      { key: 'title', label: 'Full Name' },
      { key: 'role', label: 'Role / Designation' },
      { key: 'photo', label: 'Profile Photo URL' },
      { key: 'description', label: 'Short Biography', type: 'textarea' }
    ]
  },
  stats: {
    label: 'Statistic',
    fields: [
      { key: 'value', label: 'Display Value (e.g. 10,000+)' },
      { key: 'label', label: 'Label (e.g. Citizens Reached)' },
      { key: 'description', label: 'Description (optional)' },
      { key: 'order', label: 'Display Order (1, 2, 3…)' }
    ]
  }
};

function itemTitle(x) {
  return x.title || x.name || x.value || 'Untitled';
}

function itemSubtitle(x) {
  return x.role || x.tag || x.label || x.description || 'No description added yet.';
}

function render() {
  // Stats
  const statPil = document.getElementById('statPillars');
  if (statPil) statPil.textContent = (data.pillars || []).length;
  const statP = document.getElementById('statPractice');
  if (statP) statP.textContent = (data.practice || []).length;
  const statC = document.getElementById('statCases');
  if (statC) statC.textContent = (data.cases || []).length;
  const statT = document.getElementById('statTeam');
  if (statT) statT.textContent = (data.team || []).length;
  const statM = document.getElementById('statMessages');
  if (statM) statM.textContent = (data.messages || []).length;
  const statMed = document.getElementById('statMedia');
  if (statMed) statMed.textContent = (data.media || []).length;
  const mcd = document.getElementById('mediaCountDisplay');
  if (mcd) mcd.textContent = (data.media || []).length;

  const dn = document.getElementById('dashName');
  if (dn) dn.textContent = data.profile.name || 'Adv. Paramhansh Upadhyay';
  const dd = document.getElementById('dashDesignation');
  if (dd) dd.textContent = data.profile.designation || 'Founder, Safar Legal Trust';

  // Activity
  const act = document.getElementById('activity');
  if (act) {
    act.innerHTML = data.activity.length ? data.activity.map(a => `
      <div class="item">
        <div class="item-main">
          <strong>${esc(a.text)}</strong>
          <span>${esc(a.time)}</span>
        </div>
      </div>
    `).join('') : '<div class="empty">No activity yet. Your edits will appear here.</div>';
  }

  // Lists
  list('pillarList', data.pillars, 'Core Pillar', 'pillars');
  list('practiceList', data.practice, 'Practice Area', 'practice');
  list('caseList', data.cases, 'Article', 'cases');
  list('testimonialList', data.testimonials, 'Feedback', 'testimonials');
  list('teamList', data.team, 'Team Member', 'team');
  list('statsList', data.stats, 'Statistic', 'stats');

  // Media Gallery Cards
  const ml = document.getElementById('mediaList');
  if (ml) {
    // Sync gallery display controls if present
    const curSort = data.settings.gallerySort || 'custom';
    const curRows = data.settings.galleryMaxRows || '2';
    ['mediaGallerySort', 'sGallerySort'].forEach(id => {
      const el = document.getElementById(id);
      if (el && el.value !== curSort) el.value = curSort;
    });
    ['mediaGalleryMaxRows', 'sGalleryMaxRows'].forEach(id => {
      const el = document.getElementById(id);
      if (el && el.value !== curRows) el.value = curRows;
    });

    ml.innerHTML = (data.media && data.media.length) ? data.media.map((m, i) => {
      const orderNum = (m.order !== undefined && m.order !== null && m.order !== '') ? m.order : (i + 1);
      return `
      <div class="media-card" style="display:flex; flex-direction:column; justify-content:space-between; position:relative; background:#111019; border:1px solid #2c2a38; border-radius:8px; overflow:hidden;">
        <div style="position:relative; width:100%; aspect-ratio:4/3; background:#0e0d15; overflow:hidden;">
          <img src="${esc(m.data)}" alt="${esc(m.caption || m.name || '')}" style="width:100%; height:100%; object-fit:cover; display:block;">
          
          <div style="position:absolute; top:8px; left:8px; display:flex; gap:6px; align-items:center; flex-wrap:wrap;">
            <span style="background:rgba(18,22,34,0.92); color:#ffd166; font-size:11px; font-weight:800; text-transform:uppercase; letter-spacing:0.8px; padding:3px 8px; border-radius:4px; border:1px solid rgba(255,209,102,0.4); backdrop-filter:blur(4px);">#${orderNum}</span>
            ${m.tag ? `<span style="background:rgba(18,22,34,0.92); color:#82a5ff; font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:0.8px; padding:3px 8px; border-radius:4px; border:1px solid rgba(130,165,255,0.3); backdrop-filter:blur(4px);">${esc(m.tag)}</span>` : ''}
          </div>

          <!-- Quick Move Up / Down Buttons -->
          <div style="position:absolute; top:8px; right:8px; display:flex; gap:4px;">
            <button onclick="moveMediaUp(${i})" type="button" title="Move Up in sequence" ${i === 0 ? 'disabled' : ''} style="background:rgba(18,22,34,0.88); color:#fff; border:1px solid #3d3b4e; width:28px; height:28px; border-radius:4px; cursor:${i === 0 ? 'not-allowed' : 'pointer'}; opacity:${i === 0 ? '0.35' : '1'}; display:flex; align-items:center; justify-content:center; font-size:12px; font-weight:bold;">▲</button>
            <button onclick="moveMediaDown(${i})" type="button" title="Move Down in sequence" ${i === data.media.length - 1 ? 'disabled' : ''} style="background:rgba(18,22,34,0.88); color:#fff; border:1px solid #3d3b4e; width:28px; height:28px; border-radius:4px; cursor:${i === data.media.length - 1 ? 'not-allowed' : 'pointer'}; opacity:${i === data.media.length - 1 ? '0.35' : '1'}; display:flex; align-items:center; justify-content:center; font-size:12px; font-weight:bold;">▼</button>
          </div>
        </div>

        <div class="media-card-body" style="padding:12px; display:flex; flex-direction:column; gap:8px; flex:1;">
          <strong style="color:#fff; font-size:13px; line-height:1.4; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;" title="${esc(m.caption || m.name || '')}">
            ${esc(m.caption || m.name || 'Untitled Photo')}
          </strong>

          <!-- Order Setting Row -->
          <div style="display:flex; align-items:center; justify-content:space-between; margin-top:4px; padding-top:6px; border-top:1px solid #201f2d; font-size:11.5px; color:#8c8a9c;">
            <span>Display Sequence:</span>
            <div style="display:flex; align-items:center; gap:6px;">
              <span style="font-size:11px; color:#aaa;">Order</span>
              <input type="number" min="1" max="999" value="${orderNum}" onchange="changeMediaOrder(${i}, this.value)" style="width:48px; padding:3px 4px; font-size:11.5px; background:#191724; border:1px solid #3e3b52; color:#ffd166; border-radius:4px; text-align:center; font-weight:700;" title="Type custom order number and press Enter">
            </div>
          </div>

          <div style="display:flex; justify-content:space-between; align-items:center; margin-top:auto; padding-top:8px; border-top:1px solid #282635;">
            <button class="admin-btn" onclick="editMediaItem(${i})" type="button" style="padding:5px 10px; font-size:11px; font-weight:600; color:#6f9cff; border-color:#353e5e; display:flex; align-items:center; gap:4px; cursor:pointer;">
              ✏️ Edit / Modify
            </button>
            <div style="display:flex; gap:6px;">
              <button onclick="copyMediaUrl(${i})" type="button" title="Copy Image URL / Path" style="background:none; border:1px solid #353344; color:#aaa; cursor:pointer; font-size:11px; padding:4px 8px; border-radius:4px;">Copy</button>
              <button onclick="removeMedia(${i})" type="button" title="Delete photo from gallery" style="background:none; border:1px solid #552828; color:#ff8b8b; cursor:pointer; font-size:11px; padding:4px 8px; border-radius:4px;">Delete</button>
            </div>
          </div>
        </div>
      </div>
      `;
    }).join('') : '<div class="empty full" style="grid-column:1/-1;">No photos in gallery yet. Use the editor above to add a photo or quick upload photos.</div>';
  }

  // Messages / Enquiries
  const mlist = document.getElementById('messageList');
  const mcount = document.getElementById('messageCountDisplay');
  if (mcount) mcount.textContent = (data.messages || []).length;
  if (mlist) {
    mlist.innerHTML = data.messages.length ? data.messages.map((m, i) => {
      const p = parseEnquiryMessage(m.message);
      const isApp = p.institution || p.year;
      return `
      <div class="item enquiry-item" onclick="viewEnquiryDetails(${i})" title="Click to view complete details for ${esc(m.name || 'this enquiry')}">
        <div class="item-main" style="flex:1;">
          <div style="display:flex; align-items:center; gap:8px; margin-bottom:4px; flex-wrap:wrap;">
            <strong style="margin:0; font-size:15px; color:#fff;">${esc(m.name || 'Unknown Candidate')}</strong>
            <span style="color:#78a6ff; font-size:13px; font-weight:600;">${esc(m.email || '')}</span>
            ${isApp ? `<span class="role-badge" style="background:#1d293d; color:#79b8ff; border:1px solid #2b456e; font-size:10px; padding:2px 7px;">Mentorship Application</span>` : `<span class="role-badge" style="background:#28231a; color:#ffd166; border:1px solid #574626; font-size:10px; padding:2px 7px;">General Enquiry</span>`}
          </div>
          
          <div style="font-size:12.5px; color:#c5c3d2; line-height:1.45; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; margin:4px 0;">
            ${isApp ? `<strong>${esc(p.institution || '')}</strong> ${p.year ? `(${esc(p.year)})` : ''} &bull; ` : ''}
            ${esc(p.intent || m.message || 'No statement provided.')}
          </div>

          <div style="display:flex; gap:14px; font-size:11px; color:#858390; margin-top:6px; flex-wrap:wrap;">
            ${m.phone ? `<span>📞 <strong>${esc(m.phone)}</strong></span>` : ''}
            <span>🕒 ${esc(m.time || 'Date unavailable')}</span>
          </div>
        </div>

        <div class="item-actions" onclick="event.stopPropagation()">
          <button class="admin-btn" type="button" onclick="viewEnquiryDetails(${i})" style="color:#6f9cff; border-color:#353e5e; display:inline-flex; align-items:center; gap:5px; font-weight:600;">
            👁️ View Details
          </button>
          <button class="danger" type="button" onclick="removeMessage(${i})">Delete</button>
        </div>
      </div>
      `;
    }).join('') : '<div class="empty">No enquiries yet. Website form submissions will appear here.</div>';
  }

  // Previews
  const pPrev = document.getElementById('pPhotoPreview');
  if (pPrev) {
    pPrev.innerHTML = data.profile.photo ? `<img src="${esc(data.profile.photo)}" alt="">` : '<span>No photo</span>';
  }
  const sPrev = document.getElementById('sLogoPreview');
  if (sPrev) {
    sPrev.innerHTML = data.settings.logo ? `<img src="${esc(data.settings.logo)}" alt="">` : '<span>P<i>U</i></span>';
  }
  const mapPrev = document.getElementById('sMapPreview');
  if (mapPrev) {
    const src = mapEmbedSrc();
    mapPrev.innerHTML = src ? `<iframe src="${esc(src)}" loading="lazy"></iframe>` : 'Add an office address or paste an embed link above to preview the map.';
  }

  // Render Team Member Editor panel
  renderTeamEditor();

  // Render Announcement Editor panel
  renderAnnouncementEditor();

  // Render Section Headings & Taglines editor panel
  renderSectionsEditor();

  // Render Website Images & Visuals panel
  renderImagesSection();
}

function list(id, arr, type, key) {
  const el = document.getElementById(id);
  if (!el) return;
  el.innerHTML = (arr && arr.length) ? arr.map((x, i) => `
    <div class="item">
      <div class="item-main">
        <strong>${esc(itemTitle(x))}</strong>
        <span>${esc(itemSubtitle(x))}</span>
      </div>
      <div class="item-actions">
        ${key === 'cases' ? `<button onclick="moveItem('cases', ${i}, -1)" title="Move up (earlier / higher priority)" ${i === 0 ? 'disabled style="opacity:.3;cursor:default;"' : ''}>↑</button><button onclick="moveItem('cases', ${i}, 1)" title="Move down (later)" ${i === arr.length - 1 ? 'disabled style="opacity:.3;cursor:default;"' : ''}>↓</button>` : ''}
        ${key === 'cases' ? `<button onclick="toggleFeatured(${i})" title="Show on homepage" style="color:${x.featured ? '#e0a93a' : '#8a8a9a'};">${x.featured ? '★ Featured' : '☆ Feature'}</button>` : ''}
        ${key === 'team' ? `<button onclick="selectTeamMemberForEdit(${i})" style="color:#5d8eff;">✏️ Edit</button>` : `<button onclick="editItem('${key}', ${i})">Edit</button>`}
        <button class="danger" onclick="removeItem('${key}', ${i})">Delete</button>
      </div>
    </div>
  `).join('') : `<div class="empty">No ${type.toLowerCase()} added yet. Click "＋ Add" to create one.</div>`;
}

// Modal handling for generic items
function showModal(title, fields, onSave) {
  const modal = document.getElementById('modal'), content = document.getElementById('modalContent');
  content.innerHTML = `
    <h2>${esc(title)}</h2>
    <div class="modal-form">
      ${fields.map(f => `
        <label>${esc(f.label)}
          ${f.type === 'textarea' ? `<textarea id="mf_${f.key}" rows="5">${esc(f.value || '')}</textarea>` :
            f.type === 'file' ? `<input id="mf_${f.key}" type="file" accept="${esc(f.accept || 'image/*')}">${f.value ? `<img src="${esc(f.value)}" alt="" style="display:block;width:72px;height:72px;object-fit:cover;border-radius:8px;margin-top:8px">` : ''}` :
            `<input id="mf_${f.key}" value="${esc(f.value || '')}" placeholder="${esc(f.placeholder || '')}">`
          }
        </label>
      `).join('')}
      <div class="buttons">
        <button class="admin-btn" id="cancelModal">Cancel</button>
        <button class="primary" id="confirmModal">Save</button>
      </div>
    </div>
  `;
  modal.classList.remove('hidden');
  document.getElementById('cancelModal').onclick = closeModal;
  document.getElementById('confirmModal').onclick = async () => {
    const out = {};
    for (const f of fields) {
      const input = document.getElementById('mf_' + f.key);
      out[f.key] = f.type === 'file' ? (input.files[0] ? await readAsDataURL(input.files[0]) : f.value || '') : input.value.trim();
    }
    onSave(out);
    closeModal();
    save();
    toast('Saved successfully');
  };
}

function closeModal() {
  const modal = document.getElementById('modal');
  if (modal) modal.classList.add('hidden');
}
const cmBtn = document.getElementById('closeModal');
if (cmBtn) cmBtn.onclick = closeModal;

// In-page confirmation dialog. The native confirm() is unreliable — browsers
// suppress it after "Prevent this page from creating additional dialogs", and
// many embedded/webview contexts block it entirely, which silently returned
// false and made every Delete button appear dead. This reuses the existing
// #modal shell and resolves a Promise<boolean>, with a native-confirm fallback.
function uiConfirm(message, confirmLabel) {
  return new Promise(resolve => {
    const modal = document.getElementById('modal');
    const content = document.getElementById('modalContent');
    if (!modal || !content) { resolve(window.confirm(message)); return; }
    content.innerHTML = `
      <h2>Please confirm</h2>
      <div class="modal-form">
        <p style="color:#c9c9d4;line-height:1.55;margin:0;">${esc(message)}</p>
        <div class="buttons">
          <button class="admin-btn" id="confirmNo" type="button">Cancel</button>
          <button class="primary" id="confirmYes" type="button" style="background:#e5484d;border-color:#e5484d;">${esc(confirmLabel || 'Delete')}</button>
        </div>
      </div>`;
    modal.classList.remove('hidden');
    let done = false;
    const finish = (val) => { if (done) return; done = true; modal.classList.add('hidden'); resolve(val); };
    const yes = document.getElementById('confirmYes');
    const no = document.getElementById('confirmNo');
    if (yes) yes.onclick = () => finish(true);
    if (no) no.onclick = () => finish(false);
  });
}

function addItem(key) {
  const cfg = FIELD_CONFIG[key];
  if (!cfg) return;
  showModal('Add ' + cfg.label, cfg.fields.map(f => ({ ...f, value: '' })), v => {
    if (!data[key]) data[key] = [];
    data[key].push(v);
    addActivity(`${cfg.label} added: ${itemTitle(v)}`);
  });
}

function editItem(key, i) {
  const cfg = FIELD_CONFIG[key];
  if (!cfg) return;
  const x = data[key][i];
  showModal('Edit ' + cfg.label, cfg.fields.map(f => ({ ...f, value: x[f.key] })), v => {
    // Merge over the existing item so non-form fields (e.g. the `featured`
    // homepage flag on articles) survive a modal edit.
    data[key][i] = { ...data[key][i], ...v };
    addActivity(`${cfg.label} updated: ${itemTitle(v)}`);
  });
}

// Toggle whether an article is featured on the homepage preview grid.
window.toggleFeatured = function (i) {
  if (!data.cases || !data.cases[i]) return;
  data.cases[i].featured = !data.cases[i].featured;
  const on = data.cases[i].featured;
  addActivity(`Article ${on ? 'featured on homepage' : 'unfeatured'}: ${itemTitle(data.cases[i])}`);
  save();
  toast(on ? 'Featured on homepage' : 'Removed from homepage');
};

// Reorder an item within its array. dir = -1 (up) or +1 (down). The saved
// order controls how articles appear on the site (and which of the first
// three show on the homepage when none are explicitly featured).
window.moveItem = function (key, i, dir) {
  const arr = data[key];
  if (!Array.isArray(arr)) return;
  const j = i + dir;
  if (j < 0 || j >= arr.length) return;
  const tmp = arr[i];
  arr[i] = arr[j];
  arr[j] = tmp;
  addActivity(`Reordered: ${itemTitle(arr[j])} moved ${dir < 0 ? 'up' : 'down'}`);
  save();
  toast('Order updated');
};

async function removeItem(key, i) {
  if (!data[key] || !data[key][i]) return;
  const cfg = FIELD_CONFIG[key];
  const name = itemTitle(data[key][i]);
  if (!(await uiConfirm(`Delete “${name}” from ${cfg ? cfg.label : key}? This cannot be undone.`, 'Delete'))) return;
  data[key].splice(i, 1);
  // Removing a team member reindexes data.team; a team edit in progress would
  // then save over the wrong member, so reset that editor.
  if (key === 'team' && typeof resetTeamForm === 'function' && document.getElementById('tmIndex')) {
    resetTeamForm();
  }
  addActivity(`${cfg ? cfg.label : key} deleted: ${name}`);
  save();
  toast('Deleted');
}

window.editItem = editItem;
window.removeItem = removeItem;
window.removeMedia = async function(i) {
  if (!data.media || !data.media[i]) return;
  const name = data.media[i].caption || data.media[i].name || 'this photo';
  if (!(await uiConfirm(`Delete “${name}” from the gallery? This cannot be undone.`, 'Delete'))) return;
  data.media.splice(i, 1);
  addActivity(`Gallery photo deleted: ${name}`);
  save();
  render();
  toast('Photo deleted from gallery');
  // Any in-progress edit now has a stale index (the splice shifted the array),
  // so reset the editor to avoid saving over the wrong photo.
  if (parseInt(document.getElementById('editingMediaIndex')?.value ?? '-1', 10) >= 0) {
    resetMediaForm();
  }
};

window.editMediaItem = function(i) {
  const item = data.media && data.media[i];
  if (!item) return;

  const editingInput = document.getElementById('editingMediaIndex');
  if (editingInput) editingInput.value = i;

  const titleEl = document.getElementById('mediaEditorTitle');
  if (titleEl) titleEl.textContent = `Modify Photo: ${item.caption || item.name || 'Photo #' + (i + 1)}`;

  const kickerEl = document.getElementById('mediaEditorKicker');
  if (kickerEl) kickerEl.textContent = 'MODIFY GALLERY PHOTO';

  const captionInput = document.getElementById('mediaCaption');
  if (captionInput) captionInput.value = item.caption || item.name || '';

  const tagInput = document.getElementById('mediaTag');
  if (tagInput) tagInput.value = item.tag || '';

  const orderInput = document.getElementById('mediaOrder');
  if (orderInput) orderInput.value = item.order || (i + 1);

  const urlInput = document.getElementById('mediaUrlInput');
  if (urlInput) urlInput.value = item.data || '';

  const prev = document.getElementById('mediaPhotoPreview');
  if (prev) {
    prev.innerHTML = item.data ? `<img src="${esc(item.data)}" alt="" style="width:100%;height:100%;object-fit:cover;">` : '<span style="font-size:12px;color:#68667a;">No image</span>';
  }

  const cancelBtn = document.getElementById('mediaCancelBtn');
  if (cancelBtn) cancelBtn.style.display = 'inline-block';

  const resetBtn = document.getElementById('newPhotoBtn');
  if (resetBtn) resetBtn.style.display = 'inline-block';

  const saveBtn = document.getElementById('saveMediaBtn');
  if (saveBtn) saveBtn.textContent = 'Update Gallery Photo';

  const formStatus = document.getElementById('mediaFormStatus');
  if (formStatus) formStatus.textContent = `Editing photo #${i + 1} (Order #${item.order || (i + 1)})`;

  const ed = document.getElementById('mediaEditorPanel');
  if (ed) ed.scrollIntoView({ behavior: 'smooth' });
};

window.resetMediaForm = function() {
  const editingInput = document.getElementById('editingMediaIndex');
  if (editingInput) editingInput.value = '-1';

  const titleEl = document.getElementById('mediaEditorTitle');
  if (titleEl) titleEl.textContent = 'Add New Photo to Gallery';

  const kickerEl = document.getElementById('mediaEditorKicker');
  if (kickerEl) kickerEl.textContent = 'GALLERY PHOTO EDITOR';

  const captionInput = document.getElementById('mediaCaption');
  if (captionInput) captionInput.value = '';

  const tagInput = document.getElementById('mediaTag');
  if (tagInput) tagInput.value = '';

  const orderInput = document.getElementById('mediaOrder');
  if (orderInput) orderInput.value = (data.media && data.media.length) ? (data.media.length + 1) : 1;

  const urlInput = document.getElementById('mediaUrlInput');
  if (urlInput) urlInput.value = '';

  const fileInput = document.getElementById('mediaFileInput');
  if (fileInput) fileInput.value = '';

  const fileNameDisplay = document.getElementById('mediaUploadFileName');
  if (fileNameDisplay) fileNameDisplay.textContent = '';

  const prev = document.getElementById('mediaPhotoPreview');
  if (prev) prev.innerHTML = '<span style="font-size:12px; color:#68667a; text-align:center; padding:6px;">No image selected</span>';

  const cancelBtn = document.getElementById('mediaCancelBtn');
  if (cancelBtn) cancelBtn.style.display = 'none';

  const resetBtn = document.getElementById('newPhotoBtn');
  if (resetBtn) resetBtn.style.display = 'none';

  const saveBtn = document.getElementById('saveMediaBtn');
  if (saveBtn) saveBtn.textContent = 'Save Photo to Gallery';

  const formStatus = document.getElementById('mediaFormStatus');
  if (formStatus) formStatus.textContent = '';
};

window.saveMediaItem = function() {
  const caption = (document.getElementById('mediaCaption')?.value || '').trim();
  const tag = (document.getElementById('mediaTag')?.value || '').trim();
  const url = (document.getElementById('mediaUrlInput')?.value || '').trim();
  const orderRaw = parseInt(document.getElementById('mediaOrder')?.value, 10);
  const idx = parseInt(document.getElementById('editingMediaIndex')?.value ?? '-1', 10);

  if (!url) {
    toast('Please choose an image file or provide an image URL');
    return;
  }
  if (!caption) {
    toast('Please enter a caption / title for the photo');
    return;
  }

  if (!Array.isArray(data.media)) data.media = [];

  const assignedOrder = !isNaN(orderRaw) && orderRaw > 0 ? orderRaw : (idx >= 0 ? (data.media[idx].order || (idx + 1)) : (data.media.length + 1));

  if (idx >= 0 && data.media[idx]) {
    data.media[idx].caption = caption;
    data.media[idx].tag = tag || 'Documentation';
    data.media[idx].data = url;
    data.media[idx].order = assignedOrder;
    if (!data.media[idx].name) data.media[idx].name = caption;
    addActivity(`Gallery photo updated: ${caption} (Order #${assignedOrder})`);
    toast('Gallery photo updated');
  } else {
    data.media.push({
      name: caption,
      data: url,
      caption: caption,
      tag: tag || 'Documentation',
      order: assignedOrder
    });
    addActivity(`Gallery photo added: ${caption} (Order #${assignedOrder})`);
    toast('Photo added to gallery');
  }

  // Sort and re-index sequentially if custom order
  if ((data.settings.gallerySort || 'custom') === 'custom') {
    data.media.sort((a, b) => (Number(a.order) || 999) - (Number(b.order) || 999));
    data.media.forEach((m, i) => { m.order = i + 1; });
  }

  save();
  render();
  resetMediaForm();
};

window.moveMediaUp = function(i) {
  if (!Array.isArray(data.media) || i <= 0 || i >= data.media.length) return;
  const temp = data.media[i];
  data.media[i] = data.media[i - 1];
  data.media[i - 1] = temp;
  data.media.forEach((m, idx) => { m.order = idx + 1; });
  addActivity(`Reordered gallery: moved "${temp.caption || temp.name}" up to #${i}`);
  save();
  render();
  // Reordering shifts indices; cancel any in-progress edit so a later save
  // doesn't overwrite the wrong photo.
  if (parseInt(document.getElementById('editingMediaIndex')?.value ?? '-1', 10) >= 0) resetMediaForm();
  toast(`Moved "${temp.caption || 'Photo'}" to #${i}`);
};

window.moveMediaDown = function(i) {
  if (!Array.isArray(data.media) || i < 0 || i >= data.media.length - 1) return;
  const temp = data.media[i];
  data.media[i] = data.media[i + 1];
  data.media[i + 1] = temp;
  data.media.forEach((m, idx) => { m.order = idx + 1; });
  addActivity(`Reordered gallery: moved "${temp.caption || temp.name}" down to #${i + 2}`);
  save();
  render();
  // Reordering shifts indices; cancel any in-progress edit so a later save
  // doesn't overwrite the wrong photo.
  if (parseInt(document.getElementById('editingMediaIndex')?.value ?? '-1', 10) >= 0) resetMediaForm();
  toast(`Moved "${temp.caption || 'Photo'}" to #${i + 2}`);
};

window.changeMediaOrder = function(i, newOrder) {
  if (!Array.isArray(data.media) || !data.media[i]) return;
  const targetOrder = parseInt(newOrder, 10);
  if (isNaN(targetOrder) || targetOrder < 1) return;
  
  const item = data.media[i];
  item.order = targetOrder;
  
  // Sort array and re-index
  data.media.sort((a, b) => {
    const ordA = (a.order !== undefined && a.order !== null) ? Number(a.order) : 999;
    const ordB = (b.order !== undefined && b.order !== null) ? Number(b.order) : 999;
    return ordA - ordB;
  });
  data.media.forEach((m, idx) => { m.order = idx + 1; });
  
  addActivity(`Changed order for "${item.caption || 'Photo'}" to #${targetOrder}`);
  save();
  render();
  toast(`Order updated for "${item.caption || 'Photo'}"`);
};

window.copyMediaUrl = function(i) {
  const m = data.media[i];
  if (!m || !m.data) return;
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(m.data).then(() => toast('Image copied to clipboard!'), () => toast('Failed to copy'));
  } else {
    const el = document.createElement('textarea');
    el.value = m.data;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    el.remove();
    toast('Image copied to clipboard!');
  }
};

window.removeMessage = async function(i) {
  const msg = data.messages[i];
  if (!msg) return;
  if (!(await uiConfirm('Delete this enquiry? This cannot be undone.', 'Delete'))) return;
  try {
    if (msg.id) {
      const res = await api('/api/admin/messages/' + encodeURIComponent(msg.id), { method: 'DELETE' });
      if (!res.ok) { toast('Could not delete enquiry on the server.'); return; }
    }
  } catch (e) {
    toast('Delete failed — check your connection.');
    return;
  }
  data.messages.splice(i, 1);
  addActivity('Enquiry deleted');
  save();
  toast('Enquiry deleted');
};

// -------------------------------------------------------------
// Enquiry Parsing, Dossier Modal, and Data Export Engine
// -------------------------------------------------------------

function parseEnquiryMessage(raw) {
  if (!raw || typeof raw !== 'string') {
    return { institution: '', year: '', intent: '', isStructured: false };
  }
  const instMatch = raw.match(/Institution:\s*([^\r\n]+)/i);
  const yearMatch = raw.match(/Year \/ Status:\s*([^\r\n]+)/i);
  const intentMatch = raw.match(/Statement of Intent:\s*([\s\S]*)$/i);

  if (instMatch || yearMatch || intentMatch) {
    return {
      institution: instMatch ? instMatch[1].trim() : '',
      year: yearMatch ? yearMatch[1].trim() : '',
      intent: intentMatch ? intentMatch[1].trim() : (raw.replace(/\[Application Details\]/i, '').trim()),
      isStructured: true
    };
  }

  return {
    institution: '',
    year: '',
    intent: raw.trim(),
    isStructured: false
  };
}
window.parseEnquiryMessage = parseEnquiryMessage;

function downloadFile(filename, content, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    if (a.parentElement) document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 300);
}
window.downloadFile = downloadFile;

function csvEscape(val) {
  if (val === undefined || val === null) return '""';
  const str = String(val).replace(/"/g, '""');
  return `"${str}"`;
}

window.copyToClipboard = function(text, successMsg = 'Copied to clipboard!') {
  if (!text) return;
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(
      () => toast(successMsg),
      () => fallbackCopy(text, successMsg)
    );
  } else {
    fallbackCopy(text, successMsg);
  }
};

function fallbackCopy(text, successMsg) {
  const el = document.createElement('textarea');
  el.value = text;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  el.select();
  try {
    document.execCommand('copy');
    toast(successMsg);
  } catch (err) {
    toast('Copy failed. Please copy manually.');
  }
  if (el.parentElement) document.body.removeChild(el);
}

window.copyDossierText = function(i) {
  const m = data.messages && data.messages[i];
  if (!m) return;
  const p = parseEnquiryMessage(m.message);
  const text = `=====================================================
SAFAR LEGAL TRUST • CANDIDATE DOSSIER
=====================================================
Full Name:        ${m.name || 'N/A'}
Email Address:    ${m.email || 'N/A'}
Phone Number:     ${m.phone || 'N/A'}
Submission Type:  ${p.isStructured ? 'Mentorship Program Application' : 'General Enquiry'}
Institution:      ${p.institution || 'N/A'}
Academic Year:    ${p.year || 'N/A'}
Date Received:    ${m.time || 'N/A'}

STATEMENT OF INTENT / MESSAGE:
${p.intent || m.message || 'No statement provided.'}
=====================================================`;
  window.copyToClipboard(text, 'Full candidate dossier copied to clipboard!');
};

// Copy an enquiry's email by index. Looking it up by numeric index avoids
// interpolating attacker-controlled text into an inline onclick handler, which
// was a stored-XSS vector (a crafted email in the public contact form could
// break out of the JS string and execute in the admin panel).
window.copyEnquiryEmail = function(i) {
  const m = data.messages && data.messages[i];
  if (m && m.email) window.copyToClipboard(m.email, 'Email copied!');
};

window.viewEnquiryDetails = function(i) {
  const m = data.messages && data.messages[i];
  if (!m) return;
  const p = parseEnquiryMessage(m.message);
  const isApp = p.isStructured || !!(p.institution || p.year);

  const cleanPhone = (m.phone || '').replace(/[^0-9+]/g, '');
  const waPhone = cleanPhone.replace(/^\+/, '');

  const modal = document.getElementById('modal');
  const content = document.getElementById('modalContent');
  if (!modal || !content) return;

  content.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:16px; border-bottom:1px solid #2d2b3b; padding-bottom:14px; gap:12px; flex-wrap:wrap;">
      <div>
        <div style="display:flex; align-items:center; gap:8px; margin-bottom:4px; flex-wrap:wrap;">
          <h2 style="margin:0; font-size:20px; color:#fff;">${esc(m.name || 'Anonymous Applicant')}</h2>
          ${isApp ? `<span class="role-badge" style="background:#1d293d; color:#79b8ff; border:1px solid #2b456e; font-size:11px; padding:3px 9px;">Mentorship Application</span>` : `<span class="role-badge" style="background:#28231a; color:#ffd166; border:1px solid #574626; font-size:11px; padding:3px 9px;">General Inquiry</span>`}
        </div>
        <p style="margin:0; font-size:12px; color:#8d8b9d;">Received on: <strong style="color:#c5c3d2;">${esc(m.time || 'Date unavailable')}</strong></p>
      </div>

      <!-- Quick Export Buttons for this Single Dossier -->
      <div style="display:flex; gap:6px; flex-wrap:wrap;">
        <button class="btn-export btn-export--excel" type="button" onclick="exportSingleEnquiry(${i}, 'excel')" title="Export this candidate to Excel (.csv)" style="padding:6px 10px; font-size:11px;">📊 Excel</button>
        <button class="btn-export btn-export--doc" type="button" onclick="exportSingleEnquiry(${i}, 'doc')" title="Export this candidate to Word (.doc)" style="padding:6px 10px; font-size:11px;">📄 Docs</button>
        <button class="btn-export btn-export--pdf" type="button" onclick="exportSingleEnquiry(${i}, 'pdf')" title="Print / PDF this dossier" style="padding:6px 10px; font-size:11px;">📑 Print / PDF</button>
      </div>
    </div>

    <!-- Candidate Info Grid -->
    <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(210px, 1fr)); gap:12px; margin-bottom:18px;">
      <div style="background:#111019; border:1px solid #262433; border-radius:6px; padding:12px;">
        <span style="font-size:10.5px; text-transform:uppercase; letter-spacing:0.8px; color:#7d7a8d; font-weight:700; display:block; margin-bottom:4px;">Email Address</span>
        <div style="display:flex; align-items:center; justify-content:space-between; gap:6px;">
          <a href="mailto:${esc(m.email || '')}" style="color:#78a6ff; font-weight:600; font-size:13px; text-decoration:none; word-break:break-all;">${esc(m.email || 'None provided')}</a>
          ${m.email ? `<button onclick="copyEnquiryEmail(${i})" type="button" style="background:#1c1a27; border:1px solid #363447; color:#bbb; border-radius:4px; padding:2px 6px; font-size:10.5px; cursor:pointer;" title="Copy Email">Copy</button>` : ''}
        </div>
      </div>

      <div style="background:#111019; border:1px solid #262433; border-radius:6px; padding:12px;">
        <span style="font-size:10.5px; text-transform:uppercase; letter-spacing:0.8px; color:#7d7a8d; font-weight:700; display:block; margin-bottom:4px;">Phone Number</span>
        <div style="display:flex; align-items:center; justify-content:space-between; gap:6px;">
          <span style="color:#fff; font-weight:600; font-size:13px;">${esc(m.phone || 'None provided')}</span>
          <div style="display:flex; gap:4px;">
            ${cleanPhone ? `<a href="tel:${cleanPhone}" style="background:#1c1a27; border:1px solid #363447; color:#77c69b; border-radius:4px; padding:2px 7px; font-size:10.5px; text-decoration:none;" title="Call candidate">📞 Call</a>` : ''}
            ${waPhone ? `<a href="https://wa.me/${waPhone}" target="_blank" rel="noopener" style="background:#1c1a27; border:1px solid #2b4c38; color:#4ade80; border-radius:4px; padding:2px 7px; font-size:10.5px; text-decoration:none;" title="Message on WhatsApp">💬 WA</a>` : ''}
          </div>
        </div>
      </div>

      <div style="background:#111019; border:1px solid #262433; border-radius:6px; padding:12px;">
        <span style="font-size:10.5px; text-transform:uppercase; letter-spacing:0.8px; color:#7d7a8d; font-weight:700; display:block; margin-bottom:4px;">Institution / University</span>
        <span style="color:#ffd166; font-weight:600; font-size:13px;">${esc(p.institution || 'Not specified')}</span>
      </div>

      <div style="background:#111019; border:1px solid #262433; border-radius:6px; padding:12px;">
        <span style="font-size:10.5px; text-transform:uppercase; letter-spacing:0.8px; color:#7d7a8d; font-weight:700; display:block; margin-bottom:4px;">Year of Study / Standing</span>
        <span style="color:#fff; font-weight:600; font-size:13px;">${esc(p.year || 'Not specified')}</span>
      </div>
    </div>

    <!-- Statement of Intent / Full Message -->
    <div style="margin-bottom:20px;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
        <label style="font-size:11.5px; font-weight:700; color:#c5c3d2; text-transform:uppercase; letter-spacing:0.7px;">${isApp ? 'Statement of Intent / Application Details' : 'Message Contents'}</label>
        <button onclick="copyToClipboard(document.getElementById('enquiryMsgText').innerText, 'Message text copied!')" type="button" style="background:none; border:none; color:#78a6ff; font-size:11.5px; cursor:pointer; text-decoration:underline;">Copy Text</button>
      </div>
      <div id="enquiryMsgText" style="background:#0e0d14; border:1px solid #282638; border-radius:6px; padding:14px; font-size:13px; color:#e0dfe8; line-height:1.65; white-space:pre-wrap; max-height:240px; overflow-y:auto; font-family:inherit;">${esc(p.intent || m.message || 'No text provided.')}</div>
    </div>

    <!-- Modal Footer Actions -->
    <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid #2d2b3b; padding-top:14px; flex-wrap:wrap; gap:10px;">
      <div style="display:flex; gap:8px;">
        <button class="danger" type="button" onclick="deleteEnquiryFromModal(${i})" style="font-size:12px; padding:7px 14px;">🗑️ Delete Enquiry</button>
        <button class="admin-btn" type="button" onclick="copyDossierText(${i})" style="font-size:12px; padding:7px 14px; border-color:#3d3a4e;">📋 Copy Full Dossier</button>
      </div>

      <div style="display:flex; gap:8px;">
        ${m.email ? `<a href="mailto:${esc(m.email)}?subject=Regarding your application to Safar Legal Trust" class="admin-btn" style="color:#78a6ff; border-color:#35446a; text-decoration:none; display:inline-flex; align-items:center; gap:5px; font-size:12px; padding:7px 14px;">✉️ Reply via Email</a>` : ''}
        <button class="primary" type="button" onclick="closeModal()" style="font-size:12px; padding:7px 18px;">Done</button>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');
};

window.deleteEnquiryFromModal = async function(i) {
  closeModal();
  await window.removeMessage(i);
};

window.exportMessages = function(format) {
  const msgs = data.messages || [];
  if (!msgs.length) {
    alert('There are no visitor enquiries or applications to export.');
    return;
  }

  const dateStr = new Date().toISOString().slice(0, 10);

  if (format === 'excel') {
    // Generate CSV with UTF-8 BOM
    const headers = ['No.', 'Full Name', 'Email', 'Phone', 'Category', 'Institution', 'Year / Standing', 'Statement of Intent / Message', 'Submission Date'];
    const rows = msgs.map((m, idx) => {
      const p = parseEnquiryMessage(m.message);
      const category = p.isStructured ? 'Mentorship Application' : 'General Enquiry';
      return [
        idx + 1,
        m.name || '',
        m.email || '',
        m.phone || '',
        category,
        p.institution || '',
        p.year || '',
        p.intent || m.message || '',
        m.time || ''
      ].map(csvEscape).join(',');
    });

    const csvContent = '\uFEFF' + [headers.map(csvEscape).join(','), ...rows].join('\r\n');
    downloadFile(`Safar_Legal_Trust_Enquiries_${dateStr}.csv`, csvContent, 'text/csv;charset=utf-8;');
    toast(`Exported ${msgs.length} enquiries to Excel (.csv)`);
  } else if (format === 'doc') {
    // Generate Word-compatible HTML Document (.doc)
    const docHtml = `<!DOCTYPE html>
<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head>
  <meta charset='utf-8'>
  <title>Safar Legal Trust - Enquiries Dossier</title>
  <style>
    body { font-family: 'Segoe UI', Calibri, Arial, sans-serif; color: #1a1a24; margin: 30pt; line-height: 1.5; }
    h1 { color: #0b1a30; font-size: 24pt; border-bottom: 2pt solid #c5a059; padding-bottom: 6pt; margin-bottom: 4pt; }
    .header-sub { font-size: 11pt; color: #555; margin-bottom: 20pt; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 25pt; font-size: 10pt; }
    th { background-color: #0b1a30; color: #ffffff; text-align: left; padding: 8pt; border: 1pt solid #0b1a30; }
    td { padding: 7pt; border: 1pt solid #ddd; vertical-align: top; }
    tr:nth-child(even) { background-color: #f7f9fc; }
    .card { border: 1pt solid #c5a059; border-radius: 4pt; padding: 14pt; margin-bottom: 16pt; background-color: #fafbfc; page-break-inside: avoid; }
    .card-title { font-size: 13pt; font-weight: bold; color: #0b1a30; margin-bottom: 3pt; }
    .badge { display: inline-block; padding: 2pt 6pt; font-size: 8.5pt; font-weight: bold; border-radius: 3pt; background: #0b1a30; color: #fff; }
    .card-meta { font-size: 9.5pt; color: #555; margin: 6pt 0 8pt 0; }
    .meta-item { display: inline-block; margin-right: 14pt; }
    .statement-box { background: #ffffff; border-left: 3pt solid #c5a059; padding: 9pt 12pt; font-size: 10pt; color: #222; margin-top: 6pt; white-space: pre-wrap; }
    .footer { font-size: 8.5pt; color: #888; text-align: center; border-top: 1pt solid #ddd; padding-top: 10pt; margin-top: 30pt; }
  </style>
</head>
<body>
  <h1>SAFAR LEGAL TRUST</h1>
  <div class="header-sub">
    <strong>Visitor Enquiries & Mentorship Applications Dossier</strong><br>
    Export Date: ${new Date().toLocaleString()} &bull; Total Submissions: ${msgs.length} &bull; Advocate Paramhansh Upadhyay Chambers
  </div>

  <h2>Summary Index</h2>
  <table>
    <thead>
      <tr>
        <th style="width:30pt;">#</th>
        <th>Applicant Name</th>
        <th>Email</th>
        <th>Phone</th>
        <th>Category</th>
        <th>Institution</th>
        <th>Date</th>
      </tr>
    </thead>
    <tbody>
      ${msgs.map((m, idx) => {
        const p = parseEnquiryMessage(m.message);
        return `
        <tr>
          <td><strong>${idx + 1}</strong></td>
          <td><strong>${esc(m.name || 'Anonymous')}</strong></td>
          <td>${esc(m.email || '—')}</td>
          <td>${esc(m.phone || '—')}</td>
          <td>${p.isStructured ? 'Mentorship Application' : 'General Enquiry'}</td>
          <td>${esc(p.institution || '—')}</td>
          <td>${esc(m.time || '—')}</td>
        </tr>`;
      }).join('')}
    </tbody>
  </table>

  <h2>Detailed Candidate Profiles</h2>
  ${msgs.map((m, idx) => {
    const p = parseEnquiryMessage(m.message);
    const category = p.isStructured ? 'Mentorship Application' : 'General Enquiry';
    return `
    <div class="card">
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <span class="card-title">#${idx + 1}. ${esc(m.name || 'Anonymous Applicant')}</span>
        <span class="badge">${category}</span>
      </div>
      <div class="card-meta">
        <span class="meta-item"><strong>Email:</strong> ${esc(m.email || 'N/A')}</span>
        <span class="meta-item"><strong>Phone:</strong> ${esc(m.phone || 'N/A')}</span>
        <span class="meta-item"><strong>Date:</strong> ${esc(m.time || 'N/A')}</span>
        ${p.institution ? `<span class="meta-item"><strong>Institution:</strong> ${esc(p.institution)}</span>` : ''}
        ${p.year ? `<span class="meta-item"><strong>Year/Standing:</strong> ${esc(p.year)}</span>` : ''}
      </div>
      <div style="font-size:9.5pt; font-weight:bold; color:#0b1a30; margin-top:8pt;">STATEMENT OF INTENT / MESSAGE:</div>
      <div class="statement-box">${esc(p.intent || m.message || 'No text provided.')}</div>
    </div>`;
  }).join('')}

  <div class="footer">
    Confidential Administrative Document &bull; Safar Legal Trust &bull; Advocate Paramhansh Upadhyay
  </div>
</body>
</html>`;

    downloadFile(`Safar_Legal_Trust_Enquiries_${dateStr}.doc`, docHtml, 'application/msword;charset=utf-8');
    toast(`Exported ${msgs.length} enquiries to Word Document (.doc)`);
  } else if (format === 'pdf') {
    // Print window for 1-click PDF generation
    const printWin = window.open('', '_blank');
    if (!printWin) {
      alert('Pop-up window blocked. Please allow pop-ups for this site to export PDF.');
      return;
    }

    const printHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Safar Legal Trust - Enquiries Dossier (PDF)</title>
  <style>
    @media print {
      @page { margin: 15mm; size: A4; }
      .no-print { display: none !important; }
      body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    }
    body { font-family: 'Segoe UI', Calibri, Arial, sans-serif; color: #111; margin: 0; padding: 24px; background: #fff; line-height: 1.45; }
    .no-print { background: #0b1a30; color: #fff; padding: 12px 20px; border-radius: 6px; margin-bottom: 24px; display: flex; justify-content: space-between; align-items: center; }
    .print-btn { background: #c5a059; color: #0b1a30; font-weight: bold; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; font-size: 13px; }
    .close-btn { background: transparent; color: #bbb; border: 1px solid #444; padding: 8px 14px; border-radius: 4px; cursor: pointer; font-size: 13px; }
    .header { border-bottom: 2px solid #c5a059; padding-bottom: 12px; margin-bottom: 18px; }
    .header h1 { margin: 0 0 4px 0; color: #0b1a30; font-size: 22px; text-transform: uppercase; letter-spacing: 1px; }
    .header .subtitle { color: #666; font-size: 12px; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 11px; }
    th { background: #0b1a30; color: #fff; text-align: left; padding: 8px; border: 1px solid #0b1a30; }
    td { padding: 6px 8px; border: 1px solid #ddd; vertical-align: top; }
    tr:nth-child(even) { background: #f8f9fa; }
    .card { border: 1px solid #ddd; border-left: 4px solid #c5a059; border-radius: 4px; padding: 12px 14px; margin-bottom: 14px; page-break-inside: avoid; background: #fafafa; }
    .card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; }
    .card-title { font-size: 14px; font-weight: bold; color: #0b1a30; }
    .badge { font-size: 10px; font-weight: bold; background: #0b1a30; color: #fff; padding: 2px 7px; border-radius: 3px; }
    .card-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 8px; font-size: 11px; color: #444; margin-bottom: 8px; }
    .statement-box { background: #fff; border: 1px solid #e0e0e0; border-radius: 4px; padding: 8px 10px; font-size: 11px; line-height: 1.5; color: #222; white-space: pre-wrap; }
    .footer { text-align: center; font-size: 10px; color: #888; border-top: 1px solid #ddd; padding-top: 10pt; margin-top: 24px; }
  </style>
</head>
<body>
  <div class="no-print">
    <span>📑 <strong>Ready to print or save as PDF</strong> (${msgs.length} submissions)</span>
    <div style="display:flex; gap:10px;">
      <button class="print-btn" onclick="window.print()">🖨️ Print / Save as PDF</button>
      <button class="close-btn" onclick="window.close()">✖ Close</button>
    </div>
  </div>

  <div class="header">
    <h1>SAFAR LEGAL TRUST</h1>
    <div class="subtitle">
      <strong>OFFICIAL CANDIDATE ENQUIRIES & MENTORSHIP APPLICATIONS ARCHIVE</strong><br>
      Chambers of Advocate Paramhansh Upadhyay &bull; Generated: ${new Date().toLocaleString()} &bull; Total: ${msgs.length} Submissions
    </div>
  </div>

  <h3 style="color:#0b1a30; margin:16px 0 8px 0; font-size:14px;">Summary Register</h3>
  <table>
    <thead>
      <tr>
        <th style="width:24px;">#</th>
        <th>Full Name</th>
        <th>Email</th>
        <th>Phone</th>
        <th>Category</th>
        <th>Institution</th>
        <th>Date</th>
      </tr>
    </thead>
    <tbody>
      ${msgs.map((m, idx) => {
        const p = parseEnquiryMessage(m.message);
        return `
        <tr>
          <td><strong>${idx + 1}</strong></td>
          <td><strong>${esc(m.name || 'Anonymous')}</strong></td>
          <td>${esc(m.email || '—')}</td>
          <td>${esc(m.phone || '—')}</td>
          <td>${p.isStructured ? 'Mentorship Application' : 'General Enquiry'}</td>
          <td>${esc(p.institution || '—')}</td>
          <td>${esc(m.time || '—')}</td>
        </tr>`;
      }).join('')}
    </tbody>
  </table>

  <h3 style="color:#0b1a30; margin:20px 0 10px 0; font-size:14px;">Applicant Dossiers</h3>
  ${msgs.map((m, idx) => {
    const p = parseEnquiryMessage(m.message);
    const category = p.isStructured ? 'Mentorship Application' : 'General Enquiry';
    return `
    <div class="card">
      <div class="card-header">
        <span class="card-title">#${idx + 1}. ${esc(m.name || 'Anonymous Applicant')}</span>
        <span class="badge">${category}</span>
      </div>
      <div class="card-grid">
        <div><strong>Email:</strong> ${esc(m.email || 'None')}</div>
        <div><strong>Phone:</strong> ${esc(m.phone || 'None')}</div>
        <div><strong>Institution:</strong> ${esc(p.institution || 'None')}</div>
        <div><strong>Year/Status:</strong> ${esc(p.year || 'None')}</div>
        <div><strong>Date:</strong> ${esc(m.time || 'None')}</div>
      </div>
      <div style="font-weight:bold; font-size:10.5px; color:#0b1a30; margin-bottom:4px;">STATEMENT OF INTENT / MESSAGE:</div>
      <div class="statement-box">${esc(p.intent || m.message || 'No text provided.')}</div>
    </div>`;
  }).join('')}

  <div class="footer">
    Confidential Administrative Document &bull; Safar Legal Trust &bull; Advocate Paramhansh Upadhyay
  </div>

  <script>
    window.onload = function() {
      setTimeout(function() { window.print(); }, 400);
    };
  <\/script>
</body>
</html>`;

    printWin.document.open();
    printWin.document.write(printHtml);
    printWin.document.close();
    toast('PDF print window opened!');
  }
};

window.exportSingleEnquiry = function(i, format) {
  const m = data.messages && data.messages[i];
  if (!m) return;
  const p = parseEnquiryMessage(m.message);
  const cleanName = (m.name || 'Candidate').replace(/[^a-zA-Z0-9_-]/g, '_');
  const dateStr = new Date().toISOString().slice(0, 10);
  const category = p.isStructured ? 'Mentorship Application' : 'General Enquiry';

  if (format === 'excel') {
    const headers = ['Candidate Name', 'Email', 'Phone', 'Category', 'Institution', 'Year / Standing', 'Statement of Intent / Message', 'Submission Date'];
    const row = [
      m.name || '',
      m.email || '',
      m.phone || '',
      category,
      p.institution || '',
      p.year || '',
      p.intent || m.message || '',
      m.time || ''
    ].map(csvEscape).join(',');

    const csvContent = '\uFEFF' + [headers.map(csvEscape).join(','), row].join('\r\n');
    downloadFile(`Candidate_${cleanName}_${dateStr}.csv`, csvContent, 'text/csv;charset=utf-8;');
    toast(`Exported dossier for ${m.name || 'candidate'} to Excel (.csv)`);
  } else if (format === 'doc') {
    const docHtml = `<!DOCTYPE html>
<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head>
  <meta charset='utf-8'>
  <title>Safar Legal Trust - Dossier - ${esc(m.name || 'Candidate')}</title>
  <style>
    body { font-family: 'Segoe UI', Calibri, Arial, sans-serif; color: #1a1a24; margin: 30pt; line-height: 1.5; }
    h1 { color: #0b1a30; font-size: 22pt; border-bottom: 2pt solid #c5a059; padding-bottom: 6pt; margin-bottom: 4pt; }
    .header-sub { font-size: 10pt; color: #555; margin-bottom: 20pt; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 20pt; font-size: 10.5pt; }
    th { background-color: #f0f2f5; color: #0b1a30; text-align: left; padding: 8pt; border: 1pt solid #ddd; width: 30%; }
    td { padding: 8pt; border: 1pt solid #ddd; }
    .statement-box { background: #fafbfc; border-left: 3pt solid #c5a059; padding: 12pt; font-size: 11pt; color: #222; margin-top: 10pt; white-space: pre-wrap; line-height: 1.6; }
    .footer { font-size: 8.5pt; color: #888; text-align: center; border-top: 1pt solid #ddd; padding-top: 10pt; margin-top: 30pt; }
  </style>
</head>
<body>
  <h1>SAFAR LEGAL TRUST</h1>
  <div class="header-sub">
    <strong>Official Candidate Dossier</strong> &bull; Chambers of Advocate Paramhansh Upadhyay &bull; Generated: ${new Date().toLocaleString()}
  </div>

  <table>
    <tr><th>Full Name</th><td><strong>${esc(m.name || 'Anonymous')}</strong></td></tr>
    <tr><th>Submission Category</th><td>${category}</td></tr>
    <tr><th>Email Address</th><td>${esc(m.email || 'Not provided')}</td></tr>
    <tr><th>Phone Number</th><td>${esc(m.phone || 'Not provided')}</td></tr>
    <tr><th>Institution / College</th><td><strong>${esc(p.institution || 'Not provided')}</strong></td></tr>
    <tr><th>Year / Academic Status</th><td>${esc(p.year || 'Not provided')}</td></tr>
    <tr><th>Date & Time Received</th><td>${esc(m.time || 'Not provided')}</td></tr>
  </table>

  <h3 style="color:#0b1a30; margin-top:20pt;">STATEMENT OF INTENT / APPLICATION DETAILS:</h3>
  <div class="statement-box">${esc(p.intent || m.message || 'No statement provided.')}</div>

  <div class="footer">
    Confidential Administrative Document &bull; Safar Legal Trust &bull; Advocate Paramhansh Upadhyay
  </div>
</body>
</html>`;

    downloadFile(`Candidate_${cleanName}_${dateStr}.doc`, docHtml, 'application/msword;charset=utf-8');
    toast(`Exported dossier for ${m.name || 'candidate'} to Word (.doc)`);
  } else if (format === 'pdf') {
    const printWin = window.open('', '_blank');
    if (!printWin) {
      alert('Pop-up window blocked. Please allow pop-ups for this site to export PDF.');
      return;
    }

    const printHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Candidate Dossier - ${esc(m.name || 'Applicant')} (PDF)</title>
  <style>
    @media print {
      @page { margin: 15mm; size: A4; }
      .no-print { display: none !important; }
      body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    }
    body { font-family: 'Segoe UI', Calibri, Arial, sans-serif; color: #111; margin: 0; padding: 24px; background: #fff; line-height: 1.5; }
    .no-print { background: #0b1a30; color: #fff; padding: 12px 20px; border-radius: 6px; margin-bottom: 24px; display: flex; justify-content: space-between; align-items: center; }
    .print-btn { background: #c5a059; color: #0b1a30; font-weight: bold; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; font-size: 13px; }
    .close-btn { background: transparent; color: #bbb; border: 1px solid #444; padding: 8px 14px; border-radius: 4px; cursor: pointer; font-size: 13px; }
    .header { border-bottom: 2px solid #c5a059; padding-bottom: 12px; margin-bottom: 20px; }
    .header h1 { margin: 0 0 4px 0; color: #0b1a30; font-size: 22px; text-transform: uppercase; letter-spacing: 1px; }
    .header .subtitle { color: #666; font-size: 12px; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 13px; }
    th { background: #f4f5f8; color: #0b1a30; text-align: left; padding: 9px; border: 1px solid #ddd; width: 32%; }
    td { padding: 9px; border: 1px solid #ddd; }
    .statement-box { background: #fafafa; border: 1px solid #e0e0e0; border-left: 4px solid #c5a059; border-radius: 4px; padding: 14px; font-size: 13px; line-height: 1.6; color: #222; white-space: pre-wrap; margin-top: 8px; }
    .footer { text-align: center; font-size: 10px; color: #888; border-top: 1px solid #ddd; padding-top: 10pt; margin-top: 30pt; }
  </style>
</head>
<body>
  <div class="no-print">
    <span>📑 <strong>Candidate Dossier:</strong> ${esc(m.name || 'Applicant')}</span>
    <div style="display:flex; gap:10px;">
      <button class="print-btn" onclick="window.print()">🖨️ Print / Save as PDF</button>
      <button class="close-btn" onclick="window.close()">✖ Close</button>
    </div>
  </div>

  <div class="header">
    <h1>SAFAR LEGAL TRUST</h1>
    <div class="subtitle">
      <strong>OFFICIAL CANDIDATE APPLICATION DOSSIER</strong><br>
      Chambers of Advocate Paramhansh Upadhyay &bull; Generated: ${new Date().toLocaleString()}
    </div>
  </div>

  <table>
    <tr><th>Full Name</th><td><strong>${esc(m.name || 'Anonymous')}</strong></td></tr>
    <tr><th>Submission Category</th><td>${category}</td></tr>
    <tr><th>Email Address</th><td>${esc(m.email || 'Not provided')}</td></tr>
    <tr><th>Phone Number</th><td>${esc(m.phone || 'Not provided')}</td></tr>
    <tr><th>Institution / College</th><td><strong>${esc(p.institution || 'Not provided')}</strong></td></tr>
    <tr><th>Year / Academic Status</th><td>${esc(p.year || 'Not provided')}</td></tr>
    <tr><th>Submission Date & Time</th><td>${esc(m.time || 'Not provided')}</td></tr>
  </table>

  <h3 style="color:#0b1a30; margin-top:20px; font-size:14px;">STATEMENT OF INTENT / APPLICATION DETAILS:</h3>
  <div class="statement-box">${esc(p.intent || m.message || 'No statement provided.')}</div>

  <div class="footer">
    Confidential Administrative Document &bull; Safar Legal Trust &bull; Advocate Paramhansh Upadhyay
  </div>

  <script>
    window.onload = function() {
      setTimeout(function() { window.print(); }, 400);
    };
  <\/script>
</body>
</html>`;

    printWin.document.open();
    printWin.document.write(printHtml);
    printWin.document.close();
    toast('Candidate PDF print window opened!');
  }
};

window.exportAllWebsiteData = function(format) {
  const dateStr = new Date().toISOString().slice(0, 10);

  if (format === 'json') {
    const jsonStr = JSON.stringify(data, null, 2);
    downloadFile(`Safar_Legal_Trust_Full_Data_${dateStr}.json`, jsonStr, 'application/json;charset=utf-8;');
    toast('Exported full database to JSON!');
    return;
  }

  if (format === 'excel') {
    const lines = [];
    lines.push('\uFEFF"SAFAR LEGAL TRUST - COMPLETE INSTITUTIONAL DATA EXPORT"');
    lines.push(`"Export Date",${csvEscape(new Date().toLocaleString())}`);
    lines.push('');

    // Profile
    lines.push('"--- SECTION 1: INSTITUTIONAL PROFILE ---"');
    lines.push(['Field', 'Value'].map(csvEscape).join(','));
    const prof = data.profile || {};
    lines.push(['Name', prof.name || ''].map(csvEscape).join(','));
    lines.push(['Designation', prof.designation || ''].map(csvEscape).join(','));
    lines.push(['Tagline', prof.tagline || ''].map(csvEscape).join(','));
    lines.push(['Experience', prof.experience || ''].map(csvEscape).join(','));
    lines.push(['Email', data.settings?.email || ''].map(csvEscape).join(','));
    lines.push(['Phone', data.settings?.phone || ''].map(csvEscape).join(','));
    lines.push(['Address', data.settings?.address || ''].map(csvEscape).join(','));
    lines.push(['Vision Text', data.settings?.visionText || ''].map(csvEscape).join(','));
    lines.push('');

    // Team
    lines.push('"--- SECTION 2: LEADERSHIP & ADVOCATES TEAM ---"');
    lines.push(['No.', 'Name', 'Role', 'Biography'].map(csvEscape).join(','));
    (data.team || []).forEach((t, idx) => {
      lines.push([idx + 1, t.title || t.name || '', t.role || '', t.description || ''].map(csvEscape).join(','));
    });
    lines.push('');

    // Practice Areas
    lines.push('"--- SECTION 3: PRACTICE AREAS ---"');
    lines.push(['No.', 'Practice Area', 'Description'].map(csvEscape).join(','));
    (data.practice || []).forEach((p, idx) => {
      lines.push([idx + 1, p.title || '', p.description || ''].map(csvEscape).join(','));
    });
    lines.push('');

    // Cases & Articles
    lines.push('"--- SECTION 4: ARTICLES & LEGAL INSIGHTS ---"');
    lines.push(['No.', 'Title', 'Category', 'Description', 'Featured'].map(csvEscape).join(','));
    (data.cases || []).forEach((c, idx) => {
      lines.push([idx + 1, c.title || '', c.subtitle || c.role || '', c.description || '', c.featured ? 'Yes' : 'No'].map(csvEscape).join(','));
    });
    lines.push('');

    // Statistics
    lines.push('"--- SECTION 5: IMPACT METRICS ---"');
    lines.push(['Metric Title', 'Value / Number'].map(csvEscape).join(','));
    (data.stats || []).forEach(s => {
      lines.push([s.title || '', s.description || ''].map(csvEscape).join(','));
    });
    lines.push('');

    // Gallery
    lines.push('"--- SECTION 6: INSTITUTIONAL GALLERY ---"');
    lines.push(['Display Order', 'Caption / Title', 'Tag / Category'].map(csvEscape).join(','));
    (data.media || []).forEach((m, idx) => {
      lines.push([m.order || idx + 1, m.caption || m.name || '', m.tag || ''].map(csvEscape).join(','));
    });
    lines.push('');

    // Enquiries
    lines.push('"--- SECTION 7: VISITOR ENQUIRIES & APPLICATIONS ---"');
    lines.push(['No.', 'Name', 'Email', 'Phone', 'Category', 'Institution', 'Year', 'Statement / Message', 'Date'].map(csvEscape).join(','));
    (data.messages || []).forEach((m, idx) => {
      const p = parseEnquiryMessage(m.message);
      lines.push([
        idx + 1,
        m.name || '',
        m.email || '',
        m.phone || '',
        p.isStructured ? 'Mentorship Application' : 'General Enquiry',
        p.institution || '',
        p.year || '',
        p.intent || m.message || '',
        m.time || ''
      ].map(csvEscape).join(','));
    });

    downloadFile(`Safar_Legal_Trust_Complete_Records_${dateStr}.csv`, lines.join('\r\n'), 'text/csv;charset=utf-8;');
    toast('Exported complete website records to Excel (.csv)');
  } else if (format === 'doc') {
    const prof = data.profile || {};
    const team = data.team || [];
    const practice = data.practice || [];
    const cases = data.cases || [];
    const stats = data.stats || [];
    const media = data.media || [];
    const msgs = data.messages || [];

    const docHtml = `<!DOCTYPE html>
<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head>
  <meta charset='utf-8'>
  <title>Safar Legal Trust - Comprehensive Institutional Records</title>
  <style>
    body { font-family: 'Segoe UI', Calibri, Arial, sans-serif; color: #1a1a24; margin: 30pt; line-height: 1.5; }
    h1 { color: #0b1a30; font-size: 24pt; border-bottom: 2pt solid #c5a059; padding-bottom: 6pt; margin-bottom: 4pt; }
    h2 { color: #0b1a30; font-size: 16pt; border-bottom: 1pt solid #ddd; padding-bottom: 4pt; margin-top: 24pt; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 16pt; font-size: 10pt; }
    th { background-color: #0b1a30; color: #ffffff; text-align: left; padding: 7pt; border: 1pt solid #0b1a30; }
    td { padding: 6pt 7pt; border: 1pt solid #ddd; vertical-align: top; }
    tr:nth-child(even) { background-color: #f7f9fc; }
    .card { border: 1pt solid #ddd; border-left: 3pt solid #c5a059; padding: 10pt 12pt; margin-bottom: 10pt; background: #fafbfc; page-break-inside: avoid; }
    .footer { font-size: 8.5pt; color: #888; text-align: center; border-top: 1pt solid #ddd; padding-top: 10pt; margin-top: 30pt; }
  </style>
</head>
<body>
  <h1>SAFAR LEGAL TRUST</h1>
  <p style="color:#555; font-size:10.5pt; margin-bottom:20pt;">
    <strong>Comprehensive Institutional Records & Website Database</strong><br>
    Chambers of Advocate Paramhansh Upadhyay &bull; Generated: ${new Date().toLocaleString()}
  </p>

  <h2>1. Institutional Profile</h2>
  <table>
    <tr><th style="width:25%;">Advocate Name</th><td><strong>${esc(prof.name || 'Advocate Paramhansh Upadhyay')}</strong></td></tr>
    <tr><th>Designation</th><td>${esc(prof.designation || 'Supreme Court of India')}</td></tr>
    <tr><th>Experience</th><td>${esc(prof.experience || '25+ Years')}</td></tr>
    <tr><th>Email</th><td>${esc(data.settings?.email || '—')}</td></tr>
    <tr><th>Phone</th><td>${esc(data.settings?.phone || '—')}</td></tr>
    <tr><th>Address</th><td>${esc(data.settings?.address || '—')}</td></tr>
    <tr><th>Vision & Slogan</th><td>${esc(data.settings?.visionSlogan || 'Empowering Law. Inspiring Change.')}</td></tr>
  </table>

  <h2>2. Leadership & Team Directory (${team.length} Members)</h2>
  <table>
    <thead><tr><th style="width:30pt;">#</th><th>Name</th><th>Role</th><th>Biography</th></tr></thead>
    <tbody>
      ${team.map((t, i) => `<tr><td>${i + 1}</td><td><strong>${esc(t.title || t.name)}</strong></td><td>${esc(t.role)}</td><td>${esc(t.description)}</td></tr>`).join('')}
    </tbody>
  </table>

  <h2>3. Practice Areas (${practice.length} Areas)</h2>
  <table>
    <thead><tr><th style="width:30pt;">#</th><th>Practice Area</th><th>Description</th></tr></thead>
    <tbody>
      ${practice.map((p, i) => `<tr><td>${i + 1}</td><td><strong>${esc(p.title)}</strong></td><td>${esc(p.description)}</td></tr>`).join('')}
    </tbody>
  </table>

  <h2>4. Articles & Legal Insights (${cases.length} Articles)</h2>
  <table>
    <thead><tr><th style="width:30pt;">#</th><th>Title</th><th>Category</th><th>Overview</th></tr></thead>
    <tbody>
      ${cases.map((c, i) => `<tr><td>${i + 1}</td><td><strong>${esc(c.title)}</strong></td><td>${esc(c.subtitle || c.role)}</td><td>${esc(c.description)}</td></tr>`).join('')}
    </tbody>
  </table>

  <h2>5. Institutional Gallery Archive (${media.length} Photos)</h2>
  <table>
    <thead><tr><th style="width:30pt;">Order</th><th>Photo Caption</th><th>Category / Tag</th></tr></thead>
    <tbody>
      ${media.map((m, i) => `<tr><td>#${m.order || i + 1}</td><td>${esc(m.caption || m.name)}</td><td>${esc(m.tag || 'Documentation')}</td></tr>`).join('')}
    </tbody>
  </table>

  <h2>6. Visitor Submissions & Enquiries (${msgs.length} Enquiries)</h2>
  <table>
    <thead><tr><th style="width:30pt;">#</th><th>Candidate Name</th><th>Contact</th><th>Institution</th><th>Statement / Message</th></tr></thead>
    <tbody>
      ${msgs.map((m, i) => {
        const p = parseEnquiryMessage(m.message);
        return `<tr>
          <td>${i + 1}</td>
          <td><strong>${esc(m.name)}</strong><br><small>${p.isStructured ? 'Mentorship' : 'General'}</small></td>
          <td>${esc(m.email)}<br>${esc(m.phone)}</td>
          <td>${esc(p.institution || '—')}<br><small>${esc(p.year || '')}</small></td>
          <td>${esc(p.intent || m.message)}</td>
        </tr>`;
      }).join('')}
    </tbody>
  </table>

  <div class="footer">
    Confidential Comprehensive Record &bull; Safar Legal Trust &bull; Advocate Paramhansh Upadhyay
  </div>
</body>
</html>`;

    downloadFile(`Safar_Legal_Trust_Complete_Records_${dateStr}.doc`, docHtml, 'application/msword;charset=utf-8');
    toast('Exported complete website records to Word Document (.doc)');
  } else if (format === 'pdf') {
    const printWin = window.open('', '_blank');
    if (!printWin) {
      alert('Pop-up window blocked. Please allow pop-ups for this site to export PDF.');
      return;
    }

    const prof = data.profile || {};
    const team = data.team || [];
    const practice = data.practice || [];
    const cases = data.cases || [];
    const msgs = data.messages || [];

    const printHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Safar Legal Trust - Complete Institutional Records (PDF)</title>
  <style>
    @media print {
      @page { margin: 15mm; size: A4; }
      .no-print { display: none !important; }
      body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    }
    body { font-family: 'Segoe UI', Calibri, Arial, sans-serif; color: #111; margin: 0; padding: 24px; background: #fff; line-height: 1.45; }
    .no-print { background: #0b1a30; color: #fff; padding: 12px 20px; border-radius: 6px; margin-bottom: 24px; display: flex; justify-content: space-between; align-items: center; }
    .print-btn { background: #c5a059; color: #0b1a30; font-weight: bold; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; font-size: 13px; }
    .close-btn { background: transparent; color: #bbb; border: 1px solid #444; padding: 8px 14px; border-radius: 4px; cursor: pointer; font-size: 13px; }
    .header { border-bottom: 2px solid #c5a059; padding-bottom: 12px; margin-bottom: 20px; }
    .header h1 { margin: 0 0 4px 0; color: #0b1a30; font-size: 22px; text-transform: uppercase; letter-spacing: 1px; }
    h2 { color: #0b1a30; font-size: 14px; margin-top: 20px; border-bottom: 1px solid #ddd; padding-bottom: 4px; text-transform: uppercase; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 16px; font-size: 10.5px; }
    th { background: #0b1a30; color: #fff; text-align: left; padding: 6px 8px; border: 1px solid #0b1a30; }
    td { padding: 6px 8px; border: 1px solid #ddd; vertical-align: top; }
    tr:nth-child(even) { background: #f8f9fa; }
    .footer { text-align: center; font-size: 9.5px; color: #888; border-top: 1px solid #ddd; padding-top: 10pt; margin-top: 24px; }
  </style>
</head>
<body>
  <div class="no-print">
    <span>📑 <strong>Complete Website Database Records</strong></span>
    <div style="display:flex; gap:10px;">
      <button class="print-btn" onclick="window.print()">🖨️ Print / Save as PDF</button>
      <button class="close-btn" onclick="window.close()">✖ Close</button>
    </div>
  </div>

  <div class="header">
    <h1>SAFAR LEGAL TRUST</h1>
    <div style="color:#555; font-size:11.5px;">
      <strong>OFFICIAL INSTITUTIONAL RECORDS & ENQUIRIES DOSSIER</strong><br>
      Advocate Paramhansh Upadhyay Chambers &bull; Generated: ${new Date().toLocaleString()}
    </div>
  </div>

  <h2>1. Institutional Overview</h2>
  <table>
    <tr><th style="width:25%;">Advocate Name</th><td><strong>${esc(prof.name || 'Advocate Paramhansh Upadhyay')}</strong></td></tr>
    <tr><th>Designation</th><td>${esc(prof.designation || 'Supreme Court of India')}</td></tr>
    <tr><th>Contact</th><td>${esc(data.settings?.email || '')} &bull; ${esc(data.settings?.phone || '')}</td></tr>
    <tr><th>Chambers Address</th><td>${esc(data.settings?.address || '')}</td></tr>
  </table>

  <h2>2. Leadership & Team (${team.length} Members)</h2>
  <table>
    <thead><tr><th style="width:20px;">#</th><th>Name</th><th>Role</th><th>Description</th></tr></thead>
    <tbody>
      ${team.map((t, i) => `<tr><td>${i + 1}</td><td><strong>${esc(t.title || t.name)}</strong></td><td>${esc(t.role)}</td><td>${esc(t.description)}</td></tr>`).join('')}
    </tbody>
  </table>

  <h2>3. Practice Areas (${practice.length} Areas)</h2>
  <table>
    <thead><tr><th style="width:20px;">#</th><th>Practice Area</th><th>Description</th></tr></thead>
    <tbody>
      ${practice.map((p, i) => `<tr><td>${i + 1}</td><td><strong>${esc(p.title)}</strong></td><td>${esc(p.description)}</td></tr>`).join('')}
    </tbody>
  </table>

  <h2>4. Enquiries & Mentorship Applications (${msgs.length} Records)</h2>
  <table>
    <thead><tr><th style="width:20px;">#</th><th>Name</th><th>Contact</th><th>Category & Details</th></tr></thead>
    <tbody>
      ${msgs.map((m, i) => {
        const p = parseEnquiryMessage(m.message);
        return `<tr>
          <td>${i + 1}</td>
          <td><strong>${esc(m.name)}</strong></td>
          <td>${esc(m.email)}<br>${esc(m.phone)}</td>
          <td>${p.isStructured ? 'Mentorship' : 'General'}${p.institution ? ` &bull; ${esc(p.institution)}` : ''}<br><small>${esc(p.intent || m.message)}</small></td>
        </tr>`;
      }).join('')}
    </tbody>
  </table>

  <div class="footer">
    Confidential Administrative Document &bull; Safar Legal Trust &bull; Advocate Paramhansh Upadhyay
  </div>

  <script>
    window.onload = function() {
      setTimeout(function() { window.print(); }, 400);
    };
  <\/script>
</body>
</html>`;

    printWin.document.open();
    printWin.document.write(printHtml);
    printWin.document.close();
    toast('Website records PDF print window opened!');
  }
};

// Wire Add buttons
['addPillar', 'addPractice', 'addCase', 'addTestimonial', 'addTeam', 'addStat'].forEach(id => {
  const el = document.getElementById(id);
  if (el) {
    el.onclick = () => {
      const map = {
        addPillar: 'pillars',
        addPractice: 'practice',
        addCase: 'cases',
        addTestimonial: 'testimonials',
        addTeam: 'team',
        addStat: 'stats'
      };
      if (id === 'addTeam') {
        resetTeamForm();
        const ed = document.getElementById('teamEditorPanel');
        if (ed) ed.scrollIntoView({ behavior: 'smooth' });
      } else {
        addItem(map[id]);
      }
    };
  }
});

// Profile & Settings
const spBtn = document.getElementById('saveProfile');
if (spBtn) {
  spBtn.onclick = () => {
    ['Name', 'Designation', 'Tagline', 'Experience', 'Bio', 'Facebook', 'Instagram', 'Youtube', 'Twitter', 'Linkedin'].forEach(k => {
      const el = document.getElementById('p' + k);
      if (el) data.profile[k.toLowerCase()] = el.value.trim();
    });
    addActivity('Profile information updated');
    save();
    toast('Profile saved');
  };
}

const ssBtn = document.getElementById('saveSettings');
if (ssBtn) {
  ssBtn.onclick = () => {
    data.settings.title = document.getElementById('sTitle').value.trim();
    data.settings.email = document.getElementById('sEmail').value.trim();
    data.settings.phone = document.getElementById('sPhone').value.trim();
    data.settings.address = document.getElementById('sAddress').value.trim();
    data.settings.footer = document.getElementById('sFooter').value.trim();
    data.settings.mapEmbed = document.getElementById('sMapEmbed').value.trim();
    data.settings.visionText = document.getElementById('sVisionText').value.trim();
    data.settings.visionSlogan = document.getElementById('sVisionSlogan').value.trim();

    const heroVal = document.getElementById('sHeroImage')?.value || document.getElementById('heroImageUrl')?.value;
    if (heroVal) data.settings.heroImage = heroVal.trim();
    const aboutVal = document.getElementById('sAboutImage')?.value || document.getElementById('aboutImageUrl')?.value;
    if (aboutVal) data.settings.aboutImage = aboutVal.trim();
    
    const sortVal = document.getElementById('sGallerySort')?.value || document.getElementById('mediaGallerySort')?.value || 'custom';
    const rowsVal = document.getElementById('sGalleryMaxRows')?.value || document.getElementById('mediaGalleryMaxRows')?.value || '2';
    data.settings.gallerySort = sortVal;
    data.settings.galleryMaxRows = rowsVal;

    addActivity('Website settings updated');
    save();
    toast('Settings saved');
  };
}

// Dedicated Gallery Options save button in Media section
const saveGalOptBtn = document.getElementById('saveGalleryOptionsBtn');
if (saveGalOptBtn) {
  saveGalOptBtn.onclick = () => {
    const sortVal = document.getElementById('mediaGallerySort')?.value || 'custom';
    const rowsVal = document.getElementById('mediaGalleryMaxRows')?.value || '2';
    data.settings.gallerySort = sortVal;
    data.settings.galleryMaxRows = rowsVal;

    const sSort = document.getElementById('sGallerySort');
    if (sSort) sSort.value = sortVal;
    const sRows = document.getElementById('sGalleryMaxRows');
    if (sRows) sRows.value = rowsVal;

    addActivity(`Gallery display updated: ${sortVal} order, ${rowsVal} rows`);
    save();
    toast('Gallery display options saved');
  };
}

// Helper for responsive high-res compression
function resizeImageIfNeeded(file, maxDimension = 1600, quality = 0.85) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;
        if (width <= maxDimension && height <= maxDimension) {
          resolve(e.target.result);
          return;
        }
        if (width > height) {
          if (width > maxDimension) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          }
        } else {
          if (height > maxDimension) {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL(file.type === 'image/png' ? 'image/png' : 'image/jpeg', quality));
      };
      img.onerror = () => resolve(e.target.result);
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// Media & Gallery Form Wiring
const saveMediaBtn = document.getElementById('saveMediaBtn');
if (saveMediaBtn) saveMediaBtn.onclick = () => saveMediaItem();

const mediaCancelBtn = document.getElementById('mediaCancelBtn');
if (mediaCancelBtn) mediaCancelBtn.onclick = () => resetMediaForm();

const newPhotoBtn = document.getElementById('newPhotoBtn');
if (newPhotoBtn) newPhotoBtn.onclick = () => resetMediaForm();

const mediaAddScrollBtn = document.getElementById('mediaAddScrollBtn');
if (mediaAddScrollBtn) {
  mediaAddScrollBtn.onclick = () => {
    resetMediaForm();
    const ed = document.getElementById('mediaEditorPanel');
    if (ed) ed.scrollIntoView({ behavior: 'smooth' });
  };
}

const mediaFileInput = document.getElementById('mediaFileInput');
if (mediaFileInput) {
  mediaFileInput.addEventListener('change', async e => {
    const file = e.target.files[0];
    if (!file) return;
    const nameDisplay = document.getElementById('mediaUploadFileName');
    if (nameDisplay) nameDisplay.textContent = file.name;
    const dataUrl = await resizeImageIfNeeded(file);
    const urlInput = document.getElementById('mediaUrlInput');
    if (urlInput) urlInput.value = dataUrl;
    const prev = document.getElementById('mediaPhotoPreview');
    if (prev) {
      prev.innerHTML = `<img src="${esc(dataUrl)}" alt="" style="width:100%;height:100%;object-fit:cover;">`;
    }
    const captionInput = document.getElementById('mediaCaption');
    if (captionInput && !captionInput.value) {
      const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
      captionInput.value = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);
    }
  });
}

const mediaUrlInput = document.getElementById('mediaUrlInput');
if (mediaUrlInput) {
  mediaUrlInput.addEventListener('input', e => {
    const val = e.target.value.trim();
    const prev = document.getElementById('mediaPhotoPreview');
    if (prev) {
      prev.innerHTML = val ? `<img src="${esc(val)}" alt="" style="width:100%;height:100%;object-fit:cover;" onerror="this.parentElement.innerHTML='<span style=\\'color:#ff8b8b;font-size:11px;\\'>Invalid image URL</span>'">` : '<span style="font-size:12px; color:#68667a;">No image</span>';
    }
  });
}

// Quick Multi-Upload
const muInput = document.getElementById('mediaUpload');
if (muInput) {
  muInput.addEventListener('change', async e => {
    const files = [...e.target.files];
    if (!files.length) return;
    toast(`Uploading ${files.length} image(s)...`);
    for (const file of files) {
      const dataUrl = await resizeImageIfNeeded(file);
      const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
      const caption = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);
      data.media.push({
        name: file.name,
        data: dataUrl,
        caption: caption,
        tag: 'Field Documentation'
      });
    }
    addActivity(`Uploaded ${files.length} image(s) to gallery`);
    save();
    render();
    toast(`${files.length} image(s) added to gallery!`);
    e.target.value = '';
  });
}

function readAsDataURL(file) {
  return new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(r.result);
    r.onerror = rej;
    r.readAsDataURL(file);
  });
}

const ppUpload = document.getElementById('pPhotoUpload');
if (ppUpload) {
  ppUpload.addEventListener('change', async e => {
    const file = e.target.files[0];
    if (!file) return;
    data.profile.photo = await readAsDataURL(file);
    addActivity('Profile photo updated');
    save();
    toast('Photo updated');
    e.target.value = '';
  });
}

const ppRemove = document.getElementById('pPhotoRemove');
if (ppRemove) {
  ppRemove.addEventListener('click', () => {
    if (!data.profile.photo) return;
    data.profile.photo = '';
    addActivity('Profile photo removed');
    save();
    toast('Photo removed');
  });
}

const slUpload = document.getElementById('sLogoUpload');
if (slUpload) {
  slUpload.addEventListener('change', async e => {
    const file = e.target.files[0];
    if (!file) return;
    data.settings.logo = await resizeImageIfNeeded(file, 800, 0.9);
    addActivity('Site logo updated');
    save();
    toast('Logo updated');
    e.target.value = '';
  });
}

const slRemove = document.getElementById('sLogoRemove');
if (slRemove) {
  slRemove.addEventListener('click', () => {
    if (!data.settings.logo) return;
    data.settings.logo = '';
    addActivity('Site logo removed');
    save();
    toast('Logo removed');
  });
}

// Map live preview
const smeInput = document.getElementById('sMapEmbed');
if (smeInput) {
  smeInput.addEventListener('input', () => {
    const addr = document.getElementById('sAddress');
    const val = smeInput.value.trim() || (addr && addr.value.trim() ? ('https://www.google.com/maps?q=' + encodeURIComponent(addr.value.trim()) + '&output=embed') : '');
    const mp = document.getElementById('sMapPreview');
    if (mp) mp.innerHTML = val ? `<iframe src="${esc(val)}" loading="lazy"></iframe>` : 'Add an office address or paste an embed link above to preview the map.';
  });
}

// -------------------------------------------------------------
// Dedicated Team Member Editor Panel & Sliding Options Logic
// -------------------------------------------------------------
function renderTeamEditor() {
  const team = data.team || [];
  const select = document.getElementById('teamMemberSelect');
  const countDisplay = document.getElementById('teamCountDisplay');
  if (countDisplay) countDisplay.textContent = team.length;

  if (select) {
    const currentVal = select.value;
    select.innerHTML = '<option value="new">＋ Create New Team Member</option>' + team.map((m, i) => `
      <option value="${i}">${i + 1}. ${esc(m.title || m.name || 'Member ' + (i + 1))} (${esc(m.role || 'Advocate / Associate')})</option>
    `).join('');

    if (currentVal && (currentVal === 'new' || team[parseInt(currentVal, 10)])) {
      select.value = currentVal;
    }
  }

  const modeSel = document.getElementById('teamSliderMode');
  if (modeSel && data.settings.teamSliderMode) {
    modeSel.value = data.settings.teamSliderMode;
  }
  const speedSel = document.getElementById('teamSliderSpeed');
  if (speedSel && data.settings.teamSliderSpeed) {
    speedSel.value = data.settings.teamSliderSpeed;
  }
}

function selectTeamMemberForEdit(index) {
  openSection('team');
  const team = data.team || [];
  const member = team[index];
  if (!member) return;

  const select = document.getElementById('teamMemberSelect');
  if (select) select.value = String(index);

  document.getElementById('tmIndex').value = String(index);
  document.getElementById('tmName').value = member.title || member.name || '';
  document.getElementById('tmRole').value = member.role || '';
  document.getElementById('tmPhotoUrl').value = member.photo || '';
  document.getElementById('tmBio').value = member.description || member.bio || '';

  const heading = document.getElementById('teamFormHeading');
  if (heading) heading.textContent = `Edit Member: ${member.title || member.name || 'Team Member'}`;
  const badge = document.getElementById('teamFormBadge');
  if (badge) badge.textContent = `Editing Member #${index + 1}`;
  const saveBtn = document.getElementById('saveTeamMemberBtn');
  if (saveBtn) saveBtn.textContent = 'Save Member Changes';
  const cancelBtn = document.getElementById('teamCancelBtn');
  if (cancelBtn) cancelBtn.style.display = 'inline-block';

  updatePhotoPreview(member.photo, member.title || member.name);

  const panel = document.getElementById('teamEditorPanel');
  if (panel) panel.scrollIntoView({ behavior: 'smooth' });
}
window.selectTeamMemberForEdit = selectTeamMemberForEdit;

function resetTeamForm() {
  const select = document.getElementById('teamMemberSelect');
  if (select) select.value = 'new';

  document.getElementById('tmIndex').value = 'new';
  document.getElementById('tmName').value = '';
  document.getElementById('tmRole').value = '';
  document.getElementById('tmPhotoUrl').value = '';
  document.getElementById('tmBio').value = '';

  const heading = document.getElementById('teamFormHeading');
  if (heading) heading.textContent = 'Add New Team Member';
  const badge = document.getElementById('teamFormBadge');
  if (badge) badge.textContent = 'Creating New Member';
  const saveBtn = document.getElementById('saveTeamMemberBtn');
  if (saveBtn) saveBtn.textContent = '＋ Add Member to Team';
  const cancelBtn = document.getElementById('teamCancelBtn');
  if (cancelBtn) cancelBtn.style.display = 'none';

  updatePhotoPreview('', '');
}

function updatePhotoPreview(url, name) {
  const thumb = document.getElementById('tmPhotoPreview');
  if (!thumb) return;
  if (url) {
    thumb.innerHTML = `<img src="${esc(url)}" alt="" style="width:100%;height:100%;object-fit:cover;">`;
  } else {
    const initials = (name || 'PU').trim().split(/\s+/).map(w => w[0]).join('').slice(0, 2).toUpperCase() || 'PU';
    thumb.innerHTML = `<span class="avatar-initials">${esc(initials)}</span>`;
  }
}

// Wire Team Editor Events
const tmSelect = document.getElementById('teamMemberSelect');
if (tmSelect) {
  tmSelect.addEventListener('change', () => {
    if (tmSelect.value === 'new') {
      resetTeamForm();
    } else {
      selectTeamMemberForEdit(parseInt(tmSelect.value, 10));
    }
  });
}

const tmResetBtn = document.getElementById('teamResetBtn');
if (tmResetBtn) tmResetBtn.addEventListener('click', resetTeamForm);

const tmCancelBtn = document.getElementById('teamCancelBtn');
if (tmCancelBtn) tmCancelBtn.addEventListener('click', resetTeamForm);

const tmPhotoUrl = document.getElementById('tmPhotoUrl');
if (tmPhotoUrl) {
  tmPhotoUrl.addEventListener('input', () => {
    updatePhotoPreview(tmPhotoUrl.value.trim(), document.getElementById('tmName').value);
  });
}

const tmPhotoUpload = document.getElementById('tmPhotoUpload');
if (tmPhotoUpload) {
  tmPhotoUpload.addEventListener('change', async e => {
    const file = e.target.files[0];
    if (!file) return;
    const dataUrl = await readAsDataURL(file);
    if (tmPhotoUrl) tmPhotoUrl.value = dataUrl;
    const fnLabel = document.getElementById('tmUploadFileName');
    if (fnLabel) fnLabel.textContent = file.name;
    updatePhotoPreview(dataUrl, document.getElementById('tmName').value);
  });
}

const saveTmBtn = document.getElementById('saveTeamMemberBtn');
if (saveTmBtn) {
  saveTmBtn.addEventListener('click', () => {
    const name = document.getElementById('tmName').value.trim();
    const role = document.getElementById('tmRole').value.trim();
    const photo = document.getElementById('tmPhotoUrl').value.trim();
    const bio = document.getElementById('tmBio').value.trim();
    const idxVal = document.getElementById('tmIndex').value;

    if (!name || !role) {
      alert('Please provide both Full Name and Role.');
      return;
    }

    const memberObj = {
      title: name,
      role: role,
      photo: photo,
      description: bio
    };

    if (idxVal === 'new') {
      data.team.push(memberObj);
      addActivity(`Added new team member: ${name}`);
      toast('Team member added');
    } else {
      const idx = parseInt(idxVal, 10);
      data.team[idx] = memberObj;
      addActivity(`Updated team member: ${name}`);
      toast('Team member updated');
    }

    save();
    resetTeamForm();
  });
}

const saveSlideBtn = document.getElementById('saveSliderOptionsBtn');
if (saveSlideBtn) {
  saveSlideBtn.addEventListener('click', () => {
    const mode = document.getElementById('teamSliderMode').value;
    const speed = document.getElementById('teamSliderSpeed').value;
    data.settings.teamSliderMode = mode;
    data.settings.teamSliderSpeed = speed;
    addActivity(`Updated team slider options: ${mode} (${speed})`);
    save();
    toast('Slider options saved');
  });
}

// -------------------------------------------------------------
// Announcement Bar / Marquee Ticker Editor Logic
// -------------------------------------------------------------
function renderAnnouncementEditor() {
  const linesEl = document.getElementById('announcementLines');
  const enabledEl = document.getElementById('announcementEnabled');
  const sepEl = document.getElementById('announcementSeparator');
  const speedEl = document.getElementById('announcementSpeed');

  let list = [];
  if (Array.isArray(data.announcements) && data.announcements.length) {
    list = data.announcements;
  } else if (data.settings && data.settings.announcementText) {
    list = data.settings.announcementText.split(/\r?\n/).map(t => t.trim()).filter(Boolean);
  } else {
    list = [
      '🚨 Admissions Open for Chamber Mentorship Program 2026!',
      'Upcoming Constitutional Literacy Camp in Delhi',
      'Register for Drafting & Pleadings Intensive Workshop'
    ];
  }

  if (linesEl && document.activeElement !== linesEl) {
    linesEl.value = list.join('\n');
  }

  const enabledVal = (data.settings && data.settings.announcementEnabled !== undefined) ? String(data.settings.announcementEnabled) : 'true';
  if (enabledEl) enabledEl.value = enabledVal;

  const sepVal = (data.settings && data.settings.announcementSeparator) || '•';
  if (sepEl && document.activeElement !== sepEl) sepEl.value = sepVal;

  const speedVal = (data.settings && data.settings.announcementSpeed) || '25s';
  if (speedEl) speedEl.value = speedVal;

  updateAdminMarqueePreview();
}

function updateAdminMarqueePreview() {
  const prevEl = document.getElementById('adminMarqueePreview');
  if (!prevEl) return;
  const linesEl = document.getElementById('announcementLines');
  const sepEl = document.getElementById('announcementSeparator');
  const rawText = linesEl ? linesEl.value : '';
  const sep = sepEl ? (sepEl.value.trim() || '•') : '•';

  const items = rawText.split(/\r?\n/).map(t => t.trim()).filter(Boolean);
  if (items.length) {
    prevEl.innerHTML = items.map(t => `${esc(t)} <span style="color:#d4af37; margin:0 8px;">${esc(sep)}</span> `).join('');
  } else {
    prevEl.innerHTML = '<span style="color:#aaa; font-style:italic; text-transform:none;">No announcement notices entered yet. Type notices above to display ticker.</span>';
  }
}

function saveAnnouncements() {
  const linesEl = document.getElementById('announcementLines');
  const enabledEl = document.getElementById('announcementEnabled');
  const sepEl = document.getElementById('announcementSeparator');
  const speedEl = document.getElementById('announcementSpeed');
  const statusEl = document.getElementById('announcementSaveStatus');

  const raw = linesEl ? linesEl.value : '';
  const items = raw.split(/\r?\n/).map(t => t.trim()).filter(Boolean);
  const enabled = enabledEl ? enabledEl.value : 'true';
  const sep = sepEl ? (sepEl.value.trim() || '•') : '•';
  const speed = speedEl ? speedEl.value : '25s';

  data.announcements = items;
  if (!data.settings) data.settings = {};
  data.settings.announcementText = items.join('\n');
  data.settings.announcementEnabled = enabled;
  data.settings.announcementSeparator = sep;
  data.settings.announcementSpeed = speed;

  addActivity(`Updated announcement ticker (${items.length} notices)`);
  save();
  toast('Announcement bar updated and published!');
  if (statusEl) {
    statusEl.textContent = '✓ Saved & published to website!';
    setTimeout(() => { if (statusEl) statusEl.textContent = ''; }, 3000);
  }
}

const saBtn1 = document.getElementById('saveAnnouncementsBtn');
if (saBtn1) saBtn1.onclick = saveAnnouncements;

const saBtn2 = document.getElementById('saveAnnouncementsBtn2');
if (saBtn2) saBtn2.onclick = saveAnnouncements;

const aLines = document.getElementById('announcementLines');
if (aLines) aLines.addEventListener('input', updateAdminMarqueePreview);

const aSep = document.getElementById('announcementSeparator');
if (aSep) aSep.addEventListener('input', updateAdminMarqueePreview);

// ---------------------------------------------------------------------------
// Section Headings & Taglines editor — edits the label/heading/tagline shown at
// the top of each website section. Stored under the top-level `sections` key so
// the frontend (site.js renderSectionHeads) can paint them. A blank field is
// saved empty; site.js's setText skips empty values, leaving the original
// on-page text untouched.
// ---------------------------------------------------------------------------
const SECTION_HEAD_META = [
  { key: 'pillars', name: 'The Four Pillars' },
  { key: 'practice', name: 'Practice Areas' },
  { key: 'team', name: 'Our Team' },
  { key: 'articles', name: 'Articles & Legal Insights' },
  { key: 'gallery', name: 'Institutional Gallery' },
  { key: 'testimonials', name: 'Student & Community Perspectives' },
  { key: 'contact', name: 'Contact & Trust Secretariat' }
];

function renderSectionsEditor() {
  const wrap = document.getElementById('sectionHeadsList');
  if (!wrap) return;
  // Never rebuild while the admin is typing in one of these fields (it would
  // reset the input and drop focus mid-edit).
  const af = document.activeElement;
  if (af && af.id && af.id.indexOf('sec_') === 0 && wrap.dataset.built === '1') return;
  const sections = (data && data.sections) || {};
  const fieldStyle = 'width:100%; margin-top:4px; padding:8px 10px; background:#191724; border:1px solid #3e3b52; color:#eee; border-radius:5px; font-size:13px;';
  const lblStyle = 'display:block; font-size:12px; color:#9a98aa; margin-bottom:2px;';
  wrap.innerHTML = SECTION_HEAD_META.map(m => {
    const cfg = sections[m.key] || {};
    return `
    <div class="item" style="flex-direction:column; align-items:stretch; gap:12px;">
      <strong style="font-size:14px; color:#ffd166; letter-spacing:.3px;">${esc(m.name)}</strong>
      <label style="${lblStyle}">Small Label / Eyebrow
        <input id="sec_${m.key}_eyebrow" type="text" value="${esc(cfg.eyebrow || '')}" style="${fieldStyle}">
      </label>
      <label style="${lblStyle}">Main Heading
        <input id="sec_${m.key}_title" type="text" value="${esc(cfg.title || '')}" style="${fieldStyle}">
      </label>
      <label style="${lblStyle}">Tagline / Sub-text
        <textarea id="sec_${m.key}_tagline" rows="2" style="${fieldStyle} resize:vertical;">${esc(cfg.tagline || '')}</textarea>
      </label>
    </div>`;
  }).join('');
  wrap.dataset.built = '1';
}

function saveSectionHeads() {
  if (!data.sections || typeof data.sections !== 'object' || Array.isArray(data.sections)) data.sections = {};
  SECTION_HEAD_META.forEach(m => {
    const eEl = document.getElementById('sec_' + m.key + '_eyebrow');
    const tEl = document.getElementById('sec_' + m.key + '_title');
    const gEl = document.getElementById('sec_' + m.key + '_tagline');
    data.sections[m.key] = {
      eyebrow: eEl ? eEl.value.trim() : '',
      title: tEl ? tEl.value.trim() : '',
      tagline: gEl ? gEl.value.trim() : ''
    };
  });
  addActivity('Updated section headings & taglines');
  save();
  toast('Section headings updated and published!');
}

const sshBtn = document.getElementById('saveSectionHeads');
if (sshBtn) sshBtn.onclick = saveSectionHeads;

// -------------------------------------------------------------
// Website Key Images & Banners Studio (Hero, About, Avatar)
// -------------------------------------------------------------
function renderImagesSection() {
  const heroImg = data.settings.heroImage || 'assets/hero-courtroom.jpg';
  const aboutImg = data.settings.aboutImage || 'assets/gallery-library.jpg';
  const avatarImg = data.profile.photo || 'assets/paramhansh-upadhyay.png';
  const founderName = data.profile.name || 'Adv. Paramhansh Upadhyay';
  const founderRole = data.profile.designation || 'Founder, Safar Legal Trust';

  // Hero Image (Courtroom / Chambers)
  const heroPrev = document.getElementById('heroImgPreview');
  if (heroPrev) heroPrev.src = heroImg;
  const heroInp = document.getElementById('heroImageUrl');
  if (heroInp && document.activeElement !== heroInp) heroInp.value = heroImg;
  const sHeroInp = document.getElementById('sHeroImage');
  if (sHeroInp && document.activeElement !== sHeroInp) sHeroInp.value = heroImg;

  // Hero Badge Overlay in live preview
  const heroBadgeName = document.getElementById('heroBadgeName');
  if (heroBadgeName) heroBadgeName.textContent = founderName;
  const heroBadgeRole = document.getElementById('heroBadgeRole');
  if (heroBadgeRole) heroBadgeRole.textContent = founderRole;
  const heroBadgeAvatar = document.querySelector('#heroBadgeAvatarPreview img');
  if (heroBadgeAvatar) heroBadgeAvatar.src = avatarImg;

  // About Image (Law Library & Study Hall)
  const aboutPrev = document.getElementById('aboutImgPreview');
  if (aboutPrev) aboutPrev.src = aboutImg;
  const aboutInp = document.getElementById('aboutImageUrl');
  if (aboutInp && document.activeElement !== aboutInp) aboutInp.value = aboutImg;
  const sAboutInp = document.getElementById('sAboutImage');
  if (sAboutInp && document.activeElement !== sAboutInp) sAboutInp.value = aboutImg;

  // Founder Avatar
  const avatarPrev = document.querySelector('#founderAvatarPreview img');
  if (avatarPrev) avatarPrev.src = avatarImg;
  const avatarInp = document.getElementById('founderAvatarUrl');
  if (avatarInp && document.activeElement !== avatarInp) avatarInp.value = data.profile.photo || '';
  const pPhotoUrlInp = document.getElementById('pPhotoUrl');
  if (pPhotoUrlInp && document.activeElement !== pPhotoUrlInp) pPhotoUrlInp.value = data.profile.photo || '';
}

function setupImagesSection() {
  // 1. Hero Image File Upload
  const hiUpload = document.getElementById('heroImageUpload');
  if (hiUpload) {
    hiUpload.addEventListener('change', async e => {
      const file = e.target.files[0];
      if (!file) return;
      const fn = document.getElementById('heroImageFileName');
      if (fn) fn.textContent = file.name;
      const dataUrl = await resizeImageIfNeeded(file, 1600, 0.88);
      const urlInp = document.getElementById('heroImageUrl');
      if (urlInp) urlInp.value = dataUrl;
      const prev = document.getElementById('heroImgPreview');
      if (prev) prev.src = dataUrl;
      const sHero = document.getElementById('sHeroImage');
      if (sHero) sHero.value = dataUrl;
      const st = document.getElementById('heroImageStatus');
      if (st) st.textContent = 'Image loaded! Click "Save Hero Image" to apply.';
    });
  }

  // Hero Image URL typing
  const hiUrl = document.getElementById('heroImageUrl');
  if (hiUrl) {
    hiUrl.addEventListener('input', e => {
      const val = e.target.value.trim() || 'assets/hero-courtroom.jpg';
      const prev = document.getElementById('heroImgPreview');
      if (prev) prev.src = val;
      const sHero = document.getElementById('sHeroImage');
      if (sHero) sHero.value = val;
    });
  }

  // Hero Image Reset to Default
  const hiReset = document.getElementById('heroImageReset');
  if (hiReset) {
    hiReset.addEventListener('click', () => {
      const def = 'assets/hero-courtroom.jpg';
      const urlInp = document.getElementById('heroImageUrl');
      if (urlInp) urlInp.value = def;
      const prev = document.getElementById('heroImgPreview');
      if (prev) prev.src = def;
      const fn = document.getElementById('heroImageFileName');
      if (fn) fn.textContent = '';
      const sHero = document.getElementById('sHeroImage');
      if (sHero) sHero.value = def;
      const st = document.getElementById('heroImageStatus');
      if (st) st.textContent = 'Reset to default chambers image. Click Save to apply.';
    });
  }

  // Hero Image Save Handler
  const saveHero = () => {
    const val = (document.getElementById('heroImageUrl')?.value || '').trim() || 'assets/hero-courtroom.jpg';
    data.settings.heroImage = val;
    const sHero = document.getElementById('sHeroImage');
    if (sHero) sHero.value = val;
    addActivity('Hero courtroom chamber image updated');
    save();
    toast('Hero section image saved successfully!');
    const st = document.getElementById('heroImageStatus');
    if (st) {
      st.textContent = '✅ Saved live to website!';
      setTimeout(() => { if (st) st.textContent = ''; }, 3500);
    }
  };
  const saveHiBtn = document.getElementById('saveHeroImageBtn');
  if (saveHiBtn) saveHiBtn.addEventListener('click', saveHero);
  const saveHiBtn2 = document.getElementById('saveHeroImageBtn2');
  if (saveHiBtn2) saveHiBtn2.addEventListener('click', saveHero);

  // 2. About Image File Upload
  const aiUpload = document.getElementById('aboutImageUpload');
  if (aiUpload) {
    aiUpload.addEventListener('change', async e => {
      const file = e.target.files[0];
      if (!file) return;
      const fn = document.getElementById('aboutImageFileName');
      if (fn) fn.textContent = file.name;
      const dataUrl = await resizeImageIfNeeded(file, 1600, 0.88);
      const urlInp = document.getElementById('aboutImageUrl');
      if (urlInp) urlInp.value = dataUrl;
      const prev = document.getElementById('aboutImgPreview');
      if (prev) prev.src = dataUrl;
      const sAbout = document.getElementById('sAboutImage');
      if (sAbout) sAbout.value = dataUrl;
      const st = document.getElementById('aboutImageStatus');
      if (st) st.textContent = 'Image loaded! Click "Save About Image" to apply.';
    });
  }

  // About Image URL typing
  const aiUrl = document.getElementById('aboutImageUrl');
  if (aiUrl) {
    aiUrl.addEventListener('input', e => {
      const val = e.target.value.trim() || 'assets/gallery-library.jpg';
      const prev = document.getElementById('aboutImgPreview');
      if (prev) prev.src = val;
      const sAbout = document.getElementById('sAboutImage');
      if (sAbout) sAbout.value = val;
    });
  }

  // About Image Reset to Default
  const aiReset = document.getElementById('aboutImageReset');
  if (aiReset) {
    aiReset.addEventListener('click', () => {
      const def = 'assets/gallery-library.jpg';
      const urlInp = document.getElementById('aboutImageUrl');
      if (urlInp) urlInp.value = def;
      const prev = document.getElementById('aboutImgPreview');
      if (prev) prev.src = def;
      const fn = document.getElementById('aboutImageFileName');
      if (fn) fn.textContent = '';
      const sAbout = document.getElementById('sAboutImage');
      if (sAbout) sAbout.value = def;
      const st = document.getElementById('aboutImageStatus');
      if (st) st.textContent = 'Reset to default library image. Click Save to apply.';
    });
  }

  // About Image Save Handler
  const saveAbout = () => {
    const val = (document.getElementById('aboutImageUrl')?.value || '').trim() || 'assets/gallery-library.jpg';
    data.settings.aboutImage = val;
    const sAbout = document.getElementById('sAboutImage');
    if (sAbout) sAbout.value = val;
    addActivity('About section library image updated');
    save();
    toast('About section image saved successfully!');
    const st = document.getElementById('aboutImageStatus');
    if (st) {
      st.textContent = '✅ Saved live to website!';
      setTimeout(() => { if (st) st.textContent = ''; }, 3500);
    }
  };
  const saveAiBtn = document.getElementById('saveAboutImageBtn');
  if (saveAiBtn) saveAiBtn.addEventListener('click', saveAbout);
  const saveAiBtn2 = document.getElementById('saveAboutImageBtn2');
  if (saveAiBtn2) saveAiBtn2.addEventListener('click', saveAbout);

  // 3. Founder Avatar File Upload
  const faUpload = document.getElementById('founderAvatarUpload');
  if (faUpload) {
    faUpload.addEventListener('change', async e => {
      const file = e.target.files[0];
      if (!file) return;
      const fn = document.getElementById('founderAvatarFileName');
      if (fn) fn.textContent = file.name;
      const dataUrl = await resizeImageIfNeeded(file, 800, 0.9);
      const urlInp = document.getElementById('founderAvatarUrl');
      if (urlInp) urlInp.value = dataUrl;
      const pUrl = document.getElementById('pPhotoUrl');
      if (pUrl) pUrl.value = dataUrl;
      const prev = document.querySelector('#founderAvatarPreview img');
      if (prev) prev.src = dataUrl;
      const badgePrev = document.querySelector('#heroBadgeAvatarPreview img');
      if (badgePrev) badgePrev.src = dataUrl;
      const pPrev = document.getElementById('pPhotoPreview');
      if (pPrev) pPrev.innerHTML = `<img src="${esc(dataUrl)}" alt="">`;
      const st = document.getElementById('founderAvatarStatus');
      if (st) st.textContent = 'Avatar loaded! Click "Save Avatar Photo" to apply.';
    });
  }

  // Founder Avatar URL typing
  const faUrl = document.getElementById('founderAvatarUrl');
  if (faUrl) {
    faUrl.addEventListener('input', e => {
      const val = e.target.value.trim() || 'assets/paramhansh-upadhyay.png';
      const prev = document.querySelector('#founderAvatarPreview img');
      if (prev) prev.src = val;
      const badgePrev = document.querySelector('#heroBadgeAvatarPreview img');
      if (badgePrev) badgePrev.src = val;
      const pUrl = document.getElementById('pPhotoUrl');
      if (pUrl) pUrl.value = val;
    });
  }

  // Founder Avatar Reset
  const faReset = document.getElementById('founderAvatarReset');
  if (faReset) {
    faReset.addEventListener('click', () => {
      const def = 'assets/paramhansh-upadhyay.png';
      const urlInp = document.getElementById('founderAvatarUrl');
      if (urlInp) urlInp.value = def;
      const pUrl = document.getElementById('pPhotoUrl');
      if (pUrl) pUrl.value = def;
      const prev = document.querySelector('#founderAvatarPreview img');
      if (prev) prev.src = def;
      const badgePrev = document.querySelector('#heroBadgeAvatarPreview img');
      if (badgePrev) badgePrev.src = def;
      const fn = document.getElementById('founderAvatarFileName');
      if (fn) fn.textContent = '';
      const st = document.getElementById('founderAvatarStatus');
      if (st) st.textContent = 'Reset to default avatar. Click Save to apply.';
    });
  }

  // Founder Avatar Remove
  const faRemove = document.getElementById('founderAvatarRemove');
  if (faRemove) {
    faRemove.addEventListener('click', () => {
      const urlInp = document.getElementById('founderAvatarUrl');
      if (urlInp) urlInp.value = '';
      const pUrl = document.getElementById('pPhotoUrl');
      if (pUrl) pUrl.value = '';
      data.profile.photo = '';
      addActivity('Founder profile avatar removed');
      save();
      toast('Avatar removed');
    });
  }

  // Founder Avatar Save Handler
  const saveAvatar = () => {
    const val = (document.getElementById('founderAvatarUrl')?.value || '').trim() || 'assets/paramhansh-upadhyay.png';
    data.profile.photo = val;
    const pUrl = document.getElementById('pPhotoUrl');
    if (pUrl) pUrl.value = val;
    addActivity('Founder profile avatar updated');
    save();
    toast('Founder avatar saved successfully!');
    const st = document.getElementById('founderAvatarStatus');
    if (st) {
      st.textContent = '✅ Saved live to website!';
      setTimeout(() => { if (st) st.textContent = ''; }, 3500);
    }
  };
  const saveFaBtn = document.getElementById('saveFounderAvatarBtn');
  if (saveFaBtn) saveFaBtn.addEventListener('click', saveAvatar);
  const saveFaBtn2 = document.getElementById('saveFounderAvatarBtn2');
  if (saveFaBtn2) saveFaBtn2.addEventListener('click', saveAvatar);

  // 4. Save All Images in one button
  const saveAllBtn = document.getElementById('saveAllImagesBtn');
  if (saveAllBtn) {
    saveAllBtn.addEventListener('click', () => {
      const hVal = (document.getElementById('heroImageUrl')?.value || '').trim() || 'assets/hero-courtroom.jpg';
      const aVal = (document.getElementById('aboutImageUrl')?.value || '').trim() || 'assets/gallery-library.jpg';
      const avVal = (document.getElementById('founderAvatarUrl')?.value || '').trim() || 'assets/paramhansh-upadhyay.png';
      data.settings.heroImage = hVal;
      data.settings.aboutImage = aVal;
      data.profile.photo = avVal;
      addActivity('All website images and visual assets updated');
      save();
      toast('All website images saved successfully!');
    });
  }

  // Direct sync from Settings inputs
  const sHeroInp = document.getElementById('sHeroImage');
  if (sHeroInp) {
    sHeroInp.addEventListener('input', () => {
      const val = sHeroInp.value.trim();
      const heroInp = document.getElementById('heroImageUrl');
      if (heroInp) heroInp.value = val;
      const prev = document.getElementById('heroImgPreview');
      if (prev) prev.src = val || 'assets/hero-courtroom.jpg';
    });
  }
  const sAboutInp = document.getElementById('sAboutImage');
  if (sAboutInp) {
    sAboutInp.addEventListener('input', () => {
      const val = sAboutInp.value.trim();
      const aboutInp = document.getElementById('aboutImageUrl');
      if (aboutInp) aboutInp.value = val;
      const prev = document.getElementById('aboutImgPreview');
      if (prev) prev.src = val || 'assets/gallery-library.jpg';
    });
  }
}

// Credentials & Auth
const credForm = document.getElementById('credForm');
if (credForm) {
  credForm.addEventListener('submit', async e => {
    e.preventDefault();
    const currentPassword = document.getElementById('ccCurrent').value;
    const newEmail = document.getElementById('ccEmail').value.trim();
    const newPassword = document.getElementById('ccPassword').value;
    const msg = document.getElementById('credMsg');

    try {
      const res = await api('/api/auth/change-credentials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newEmail, newPassword })
      });
      const result = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(result.error || 'Failed to update credentials.');
      msg.hidden = false;
      msg.style.color = '#77c69b';
      msg.textContent = 'Credentials updated successfully.' + (result.email ? ' Signed in as ' + result.email + '.' : '');
      credForm.reset();
      const em = document.getElementById('adminEmail');
      if (em && result.email) em.textContent = result.email;
    } catch(err) {
      msg.hidden = false;
      msg.style.color = '#ff8b8b';
      msg.textContent = err.message;
    }
  });
}

// Wire password show/hide toggles (both login.html and admin credential form)
document.querySelectorAll('.pw-toggle[data-toggle]').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = document.getElementById(btn.dataset.toggle);
    if (!target) return;
    const show = target.type === 'password';
    target.type = show ? 'text' : 'password';
    btn.textContent = show ? 'Hide' : 'Show';
    btn.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
    target.focus();
  });
});

const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', async () => {
    try {
      await api('/api/auth/logout', { method: 'POST' });
    } catch(e) { /* api() already redirects on 401; ignore other errors */ }
    window.location.href = '/admin/login';
  });
}

// Load initial profile data into form fields
function loadProfile() {
  const p = data.profile;
  [
    ['pName', 'name'],
    ['pDesignation', 'designation'],
    ['pTagline', 'tagline'],
    ['pExperience', 'experience'],
    ['pBio', 'bio'],
    ['pFacebook', 'facebook'],
    ['pInstagram', 'instagram'],
    ['pYoutube', 'youtube'],
    ['pTwitter', 'twitter'],
    ['pLinkedin', 'linkedin']
  ].forEach(([id, k]) => {
    const el = document.getElementById(id);
    if (el) el.value = p[k] || '';
  });

  const s = data.settings;
  [
    ['sTitle', 'title'],
    ['sEmail', 'email'],
    ['sPhone', 'phone'],
    ['sAddress', 'address'],
    ['sFooter', 'footer'],
    ['sMapEmbed', 'mapEmbed'],
    ['sVisionText', 'visionText'],
    ['sVisionSlogan', 'visionSlogan']
  ].forEach(([id, k]) => {
    const el = document.getElementById(id);
    if (el) el.value = s[k] || '';
  });

  const heroImg = s.heroImage || 'assets/hero-courtroom.jpg';
  const aboutImg = s.aboutImage || 'assets/gallery-library.jpg';
  ['heroImageUrl', 'sHeroImage'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = heroImg;
  });
  ['aboutImageUrl', 'sAboutImage'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = aboutImg;
  });
  ['founderAvatarUrl', 'pPhotoUrl'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = p.photo || '';
  });

  const gs = data.settings.gallerySort || 'custom';
  const gmr = data.settings.galleryMaxRows || '2';
  ['sGallerySort', 'mediaGallerySort'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = gs;
  });
  ['sGalleryMaxRows', 'mediaGalleryMaxRows'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = gmr;
  });
}

// Load contact-form submissions from the server (server/data/messages.json)
async function loadMessages() {
  try {
    const res = await api('/api/admin/messages');
    if (res.ok) {
      const msgs = await res.json();
      if (Array.isArray(msgs)) data.messages = msgs;
    }
  } catch (e) { /* keep whatever is cached locally */ }
}

// Initial sync from the server — server is the source of truth
async function init() {
  // Grab a CSRF token up front so the first save/delete works immediately.
  await fetchCsrf();

  // Full content (auth-protected: includes media + activity the public feed omits).
  try {
    const res = await api('/api/admin/content');
    if (res.ok) {
      const serverData = await res.json();
      if (serverData && typeof serverData === 'object') {
        data = mergeDefaults(serverData, defaults);
        localStorage.setItem(KEY, JSON.stringify(data));
      }
    }
  } catch (e) { /* fall back to the locally cached copy */ }

  // Contact enquiries live in their own store, loaded separately.
  await loadMessages();

  // Who am I? (shown in the header)
  try {
    const authRes = await fetch('/api/auth/me', { credentials: 'same-origin' });
    if (authRes.ok) {
      const me = await authRes.json();
      const em = document.getElementById('adminEmail');
      if (em && me.email) em.textContent = me.email;
    }
  } catch (e) {}

  setupImagesSection();
  loadProfile();
  render();
}

document.addEventListener('DOMContentLoaded', init);
