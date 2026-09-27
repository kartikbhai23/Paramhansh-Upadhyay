const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'index.html');
let html = fs.readFileSync(file, 'utf8');

const replacements = [
  ['Â§', '§'],
  ['ðŸš¨', '🚨'],
  ['â€¢', '•'],
  ['â€œ', '“'],
  ['â€\x9D', '”'],
  ['â€”', '—'],
  ['â€™', '’'],
  ['â€“', '–']
];

for (const [from, to] of replacements) {
  html = html.split(from).join(to);
}

fs.writeFileSync(file, html, 'utf8');
console.log('Successfully cleaned corrupted UTF-8 sequences in index.html');
