#!/usr/bin/env node
// Creates (or, with --force, resets) the admin account in server/data/admin.json
// from ADMIN_EMAIL / ADMIN_PASSWORD in your .env file.
//
//   npm run seed            # create the admin if it does not exist yet
//   npm run seed -- --force # overwrite the existing admin credentials
require('dotenv').config();
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');

const DATA_DIR = path.join(__dirname, '..', 'server', 'data');
const ADMIN_FILE = path.join(DATA_DIR, 'admin.json');
const BCRYPT_ROUNDS = 12;
const force = process.argv.includes('--force');

function fail(msg) { console.error('Error: ' + msg); process.exit(1); }

const email = (process.env.ADMIN_EMAIL || '').trim().toLowerCase();
const password = process.env.ADMIN_PASSWORD || '';

if (!email || !password) fail('Set ADMIN_EMAIL and ADMIN_PASSWORD in .env first.');
if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) fail('ADMIN_EMAIL is not a valid email address.');
if (password.length < 8 || !/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) {
  fail('ADMIN_PASSWORD must be at least 8 characters and include a letter and a number.');
}

if (fs.existsSync(ADMIN_FILE) && !force) {
  console.log('An admin account already exists. Re-run with "npm run seed -- --force" to overwrite it.');
  process.exit(0);
}

if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
const passwordHash = bcrypt.hashSync(password, BCRYPT_ROUNDS);
fs.writeFileSync(ADMIN_FILE, JSON.stringify({ email, passwordHash, updatedAt: new Date().toISOString() }, null, 2));
console.log((force ? 'Reset' : 'Created') + ' admin account for ' + email + '.');
console.log('Sign in at /admin/login, then change the password from the panel.');
