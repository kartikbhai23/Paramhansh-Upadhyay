const http = require('http');
const path = require('path');
const fs = require('fs');

process.env.PORT = '3098';
require('../server/server.js');

setTimeout(async () => {
  let hasErrors = false;
  const routes = [
    '/',
    '/articles',
    '/gallery',
    '/article?a=pan-india-legal-literacy-drive',
    '/article?a=youth-advocacy-mentorship-bootcamps',
    '/article?a=grassroots-community-aid-support',
    '/index.html',
    '/articles.html',
    '/gallery.html'
  ];

  function get(url, headers = {}) {
    return new Promise((resolve) => {
      http.get({
        hostname: 'localhost',
        port: 3098,
        path: url,
        headers
      }, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: data }));
      }).on('error', err => resolve({ error: err }));
    });
  }

  console.log('====================================================');
  console.log('       SAFAR LEGAL TRUST TECHNICAL AUDIT SUITE      ');
  console.log('====================================================\n');

  console.log('--- 1. AUDITING 9 PRIMARY ROUTES & EMBEDDED RESOURCES ---');
  for (const r of routes) {
    const res = await get(r);
    if (res.status !== 200) {
      console.error(`[FAIL] Route ${r} returned status ${res.status}`);
      hasErrors = true;
      continue;
    }
    console.log(`[PASS] Route ${r} returned 200 OK (Cache-Control: ${res.headers['cache-control'] || 'none'})`);

    const html = res.body || '';
    const imgMatches = [...html.matchAll(/<img[^>]+src=["']([^"']*)["']/gi)].map(m => m[1]);
    const linkMatches = [...html.matchAll(/<link[^>]+href=["']([^"']*)["']/gi)].map(m => m[1]);
    const scriptMatches = [...html.matchAll(/<script[^>]+src=["']([^"']*)["']/gi)].map(m => m[1]);
    const iframeMatches = [...html.matchAll(/<iframe[^>]+src=["']([^"']*)["']/gi)].map(m => m[1]);
    const ogImgMatches = [...html.matchAll(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']*)["']/gi)].map(m => m[1]);
    const twImgMatches = [...html.matchAll(/<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']*)["']/gi)].map(m => m[1]);

    const resources = [
      ...imgMatches.map(u => ({ type: 'img', url: u })),
      ...linkMatches.map(u => ({ type: 'link', url: u })),
      ...scriptMatches.map(u => ({ type: 'script', url: u })),
      ...iframeMatches.map(u => ({ type: 'iframe', url: u })),
      ...ogImgMatches.map(u => ({ type: 'og:image', url: u })),
      ...twImgMatches.map(u => ({ type: 'twitter:image', url: u }))
    ];

    for (const item of resources) {
      let testUrl = item.url;
      if (!testUrl || testUrl.trim() === '') {
        console.error(`  [FAIL] Broken empty resource (${item.type}) on ${r}`);
        hasErrors = true;
        continue;
      }
      if (testUrl.startsWith('data:')) continue;
      if (testUrl.startsWith('http://') || testUrl.startsWith('https://')) {
        if (testUrl.includes('safarlegaltrust.in')) {
          testUrl = testUrl.replace(/https?:\/\/safarlegaltrust\.in/, '');
        } else {
          // External resource like fonts or google maps embed
          continue;
        }
      }
      if (!testUrl.startsWith('/')) testUrl = '/' + testUrl;

      const subRes = await get(testUrl);
      if (subRes.status !== 200) {
        console.error(`  [FAIL] Broken resource ${item.type}: ${item.url} -> HTTP ${subRes.status} on ${r}`);
        hasErrors = true;
      }
    }
  }

  console.log('\n--- 2. AUDITING STATIC ASSETS CACHE HEADERS ---');
  const staticChecks = [
    { url: '/assets/hero-courtroom.jpg', minDays: 7 },
    { url: '/assets/gallery-library.jpg', minDays: 7 },
    { url: '/assets/paramhansh-upadhyay.png', minDays: 7 },
    { url: '/styles.css', minDays: 1 },
    { url: '/site.js', minDays: 1 },
    { url: '/favicon.ico', minDays: 7 },
    { url: '/favicon.svg', minDays: 7 }
  ];

  for (const s of staticChecks) {
    const res = await get(s.url);
    const cc = res.headers['cache-control'] || '';
    if (res.status === 200 && cc.includes('public') && (cc.includes('max-age=604800') || cc.includes('max-age=86400'))) {
      console.log(`[PASS] ${s.url} -> 200 OK (Cache-Control: ${cc})`);
    } else {
      console.error(`[FAIL] ${s.url} -> Status ${res.status}, Cache-Control: ${cc}`);
      hasErrors = true;
    }
  }

  console.log('\n--- 3. AUDITING WEBP CONTENT NEGOTIATION ---');
  const webpRes = await get('/assets/hero-courtroom.jpg', { accept: 'image/webp,*/*' });
  if (webpRes.status === 200 && webpRes.headers['content-type'] === 'image/webp') {
    console.log(`[PASS] WebP negotiation succeeded! /assets/hero-courtroom.jpg served as image/webp`);
  } else {
    console.error(`[FAIL] WebP negotiation failed. Content-Type: ${webpRes.headers['content-type']}`);
    hasErrors = true;
  }

  console.log('\n--- 4. AUDITING API CACHE POLICY ---');
  const apiRes = await get('/api/content');
  const apiCc = apiRes.headers['cache-control'] || '';
  if (apiRes.status === 200 && apiCc.includes('no-store') && apiCc.includes('no-cache')) {
    console.log(`[PASS] /api/content -> 200 OK (Cache-Control: ${apiCc}) [Sensitive/dynamic content not cached]`);
  } else {
    console.error(`[FAIL] /api/content cache policy insecure: ${apiCc}`);
    hasErrors = true;
  }

  console.log('\n--- 5. AUDITING GALLERY META DESCRIPTION ---');
  const galleryRes = await get('/gallery');
  const matchDesc = galleryRes.body.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i);
  if (matchDesc) {
    const desc = matchDesc[1];
    console.log(`Gallery Description: "${desc}" (${desc.length} chars)`);
    if (desc.length <= 160 && desc.length >= 120) {
      console.log(`[PASS] Gallery description length is optimal (${desc.length} chars, <= 160)`);
    } else {
      console.error(`[FAIL] Gallery description length sub-optimal: ${desc.length}`);
      hasErrors = true;
    }
  } else {
    console.error(`[FAIL] Gallery meta description missing!`);
    hasErrors = true;
  }

  console.log('\n--- 6. AUDITING ASSET SIZES ---');
  const assetDir = 'assets';
  fs.readdirSync(assetDir).forEach(f => {
    const stat = fs.statSync(path.join(assetDir, f));
    if (stat.isFile()) {
      console.log(`  - ${f}: ${Math.round(stat.size / 1024)} KB`);
    }
  });

  console.log('\n====================================================');
  if (hasErrors) {
    console.error('AUDIT COMPLETED WITH FAILURES');
    process.exit(1);
  } else {
    console.log('AUDIT COMPLETED: 100% PASSING — ALL VERIFIED ISSUES FIXED');
    process.exit(0);
  }
}, 1000);
