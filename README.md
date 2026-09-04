# Paramhansh Upadhyay — Advocate Website Prototype

This is a responsive frontend prototype based on the supplied dark advocate portfolio UI reference.

## Included
- `index.html` — public website
- `styles.css` — responsive public-site styling
- `admin/index.html` — separate CMS/dashboard UI prototype
- `admin/admin.css` — dashboard styling
- `assets/ui-reference.jpg` — supplied UI reference

## How content updates work (important)
`admin/admin.js` and `site.js` both read/write the same browser `localStorage` key (`paramhanshCMS`). Anything you save in the admin dashboard is written there, and `site.js` renders it on the public site on page load.

**This only works if the admin panel and the public site are opened from the same origin.** Opening the HTML files directly by double-clicking them (`file://...`) can behave inconsistently across browsers for `localStorage`. For reliable results, serve the folder with a simple local server, e.g.:

```
cd paramhansh_advocate_site
python3 -m http.server 8000
```

Then open `http://localhost:8000/admin/index.html` to edit, and `http://localhost:8000/index.html` to view the public site — in the **same browser**, since this prototype has no real backend/database and data lives only in that browser's storage.

## What's included in the admin panel
- Profile: name, designation, tagline, years of experience, biography, social links, and a **profile photo** upload (shown in the hero section).
- Settings: site title, email, phone, office address, footer text, a **site logo** upload (shown in the header), and a **Google Map** — either auto-generated from the office address, or a precise embed link pasted from Google Maps → Share → Embed a map.
- Practice Areas, Case Studies, Articles, Testimonials: full add/edit/delete, all rendered live on the public site.
- Media Library: general image uploads.
- Messages: enquiries submitted through the public contact form appear here.

## Social profiles
Facebook: https://www.facebook.com/ParamIAS700
Instagram: https://www.instagram.com/paramhanshupadhyay/
YouTube: https://www.youtube.com/@paramhanshupadhyay

## Next development step
This prototype still has no real backend — all data lives in one browser's local storage, so it won't sync across devices/visitors and clearing browser data resets it. For a production site, connect the admin dashboard to a real database and authentication so content is stored centrally and enquiries are delivered reliably (e.g. by email).
