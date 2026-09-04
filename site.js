(function(){
const KEY='paramhanshCMS';
const defaults={
 profile:{name:'Paramhansh Upadhyay',designation:'Advocate',tagline:'',experience:'',bio:'',photo:'',facebook:'https://www.facebook.com/ParamIAS700',instagram:'https://www.instagram.com/paramhanshupadhyay/',youtube:'https://www.youtube.com/@paramhanshupadhyay',twitter:'',linkedin:''},
 practice:[],cases:[],articles:[],testimonials:[],media:[],messages:[],
 settings:{title:'Paramhansh Upadhyay | Advocate',email:'',phone:'',address:'',footer:'',logo:'',mapEmbed:''},
 activity:[]
};
function mergeDefaults(saved,def){
 const out={};
 for(const k in def){
  if(Array.isArray(def[k])) out[k]=Array.isArray(saved&&saved[k])?saved[k]:JSON.parse(JSON.stringify(def[k]));
  else if(def[k]&&typeof def[k]==='object') out[k]=Object.assign(JSON.parse(JSON.stringify(def[k])),(saved&&saved[k])||{});
  else out[k]=(saved&&saved[k]!==undefined&&saved[k]!==null&&saved[k]!=='')?saved[k]:def[k];
 }
 return out;
}
function loadData(){
 let saved=null;
 try{saved=JSON.parse(localStorage.getItem(KEY)||'null');}catch(e){saved=null;}
 return mergeDefaults(saved,defaults);
}
function esc(s){return String(s==null?'':s).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));}

function mapEmbedSrc(settings){
 if(settings.mapEmbed) return settings.mapEmbed;
 if(settings.address) return 'https://www.google.com/maps?q='+encodeURIComponent(settings.address)+'&output=embed';
 return '';
}

function render(){
 const data=loadData();
 const p=data.profile, s=data.settings;

 // Title & logo
 if(s.title){document.title=s.title;const mt=document.getElementById('metaTitle');if(mt)mt.textContent=s.title;}
 const logoEl=document.getElementById('siteLogo');
 if(logoEl){ if(s.logo) logoEl.innerHTML=`<img src="${s.logo}" alt="Logo" class="logo-img">`; else logoEl.innerHTML='P<span>U</span>'; }

 // Hero
 const heroName=document.getElementById('heroName');
 if(heroName && p.name){
  const parts=p.name.trim().split(/\s+/);
  if(parts.length>1){const last=parts.pop();heroName.innerHTML=`${esc(parts.join(' '))}<br><span>${esc(last)}</span>`;}
  else heroName.textContent=p.name;
 }
 const tag=document.getElementById('heroTagline');
 if(tag && p.tagline) tag.textContent=p.tagline;
 const portrait=document.getElementById('heroPortrait');
 if(portrait){
  if(p.photo){portrait.classList.add('has-photo');portrait.innerHTML=`<img src="${p.photo}" alt="${esc(p.name||'Portrait')}">`;}
  else {portrait.classList.remove('has-photo');const initials=(p.name||'PU').trim().split(/\s+/).map(w=>w[0]).join('').slice(0,2).toUpperCase();portrait.textContent=initials||'PU';}
 }

 // About
 const bioEl=document.getElementById('aboutBio');
 if(bioEl && p.bio) bioEl.textContent=p.bio;
 const expEl=document.getElementById('aboutExperience');
 if(expEl) expEl.textContent=p.experience?(p.experience+'+'):'—';

 // Practice / cases / articles / testimonials — only override defaults if CMS has entries
 fillGrid('practiceGrid',data.practice,(x,i)=>`<article><b>${String(i+1).padStart(2,'0')}</b><h3>${esc(x.title||'Untitled')}</h3><p>${esc(x.description||'')}</p></article>`);
 fillGrid('caseGrid',data.cases,(x,i)=>`<div class="case"><span>CASE ${String(i+1).padStart(2,'0')}</span><h3>${esc(x.title||'Untitled')}</h3><p>${esc(x.description||'')}</p></div>`);
 fillGrid('articleGrid',data.articles,(x)=>`<article><span>ARTICLE</span><h3>${esc(x.title||'Untitled')}</h3><p>${esc(x.description||'')}</p><a href="#contact">Read more →</a></article>`);
 fillGrid('testimonialGrid',data.testimonials,(x)=>`<div class="case"><span>TESTIMONIAL</span><p>“${esc(x.description||'')}”</p><h3>— ${esc(x.title||'Client')}</h3></div>`);

 // Contact info — icon cards
 const icons={
  email:'<path d="M3 5h18v14H3z"/><path d="M3 6l9 7 9-7"/>',
  phone:'<path d="M4 4h4l2 5-2.5 2A11 11 0 0014 17.5l2-2.5 5 2v4a2 2 0 01-2 2C10 23 1 14 1 4a2 2 0 012-2z" fill-rule="evenodd" clip-rule="evenodd"/>',
  office:'<path d="M12 21s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>'
 };
 function iconSvg(name){return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${icons[name]}</svg>`;}
 const info=document.getElementById('contactInfo');
 if(info){
  const rows=[];
  if(s.email) rows.push(`<div class="info-item"><div class="info-icon">${iconSvg('email')}</div><div><span>Email</span><a href="mailto:${esc(s.email)}">${esc(s.email)}</a></div></div>`);
  if(s.phone) rows.push(`<div class="info-item"><div class="info-icon">${iconSvg('phone')}</div><div><span>Phone</span><a href="tel:${esc(s.phone)}">${esc(s.phone)}</a></div></div>`);
  if(s.address) rows.push(`<div class="info-item"><div class="info-icon">${iconSvg('office')}</div><div><span>Office</span><p>${esc(s.address)}</p></div></div>`);
  info.innerHTML=rows.join('');
 }
 const intro=document.getElementById('contactIntro');
 if(intro && (s.email||s.phone||s.address)) intro.textContent='Reach out directly using the details below, or send an enquiry using the form.';

 // Socials — icon buttons, only show links that are set
 const socialIcons={
  facebook:'<path d="M13.5 21v-7h2.4l.4-3H13.5V9c0-.87.24-1.46 1.5-1.46H16.5V5.1c-.27-.04-1.2-.11-2.28-.11-2.26 0-3.8 1.38-3.8 3.9V11H8v3h2.42v7h3.08z"/>',
  instagram:'<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="1"/>',
  youtube:'<path d="M22 8.4s-.2-1.5-.8-2.1c-.8-.8-1.7-.8-2.1-.9C16.4 5.2 12 5.2 12 5.2h0s-4.4 0-7.1.2c-.4 0-1.3.1-2.1.9C2.2 6.9 2 8.4 2 8.4S1.8 10.2 1.8 12v1.9c0 1.8.2 3.6.2 3.6s.2 1.5.8 2.1c.8.8 1.8.8 2.3.9 1.7.2 7 .2 7 .2s4.4 0 7.1-.2c.4-.1 1.3-.1 2.1-.9.6-.6.8-2.1.8-2.1s.2-1.8.2-3.6V12c0-1.8-.2-3.6-.2-3.6z"/><path d="M9.9 15.4V9.6l5.4 2.9-5.4 2.9z" fill="var(--bg)" stroke="none"/>',
  twitter:'<path d="M20 5.9c-.6.3-1.3.5-2 .6.7-.4 1.3-1.1 1.6-2-.7.4-1.5.7-2.3.9A3.6 3.6 0 0015 4.2c-2 0-3.6 1.7-3.6 3.7 0 .3 0 .6.1.8-3-.1-5.6-1.6-7.4-3.9-.3.6-.5 1.2-.5 1.9 0 1.3.6 2.4 1.6 3.1-.6 0-1.1-.2-1.6-.4v.1c0 1.8 1.2 3.3 2.9 3.6-.3.1-.6.1-.9.1-.2 0-.4 0-.6-.1.4 1.5 1.7 2.5 3.2 2.5A7.2 7.2 0 014 17.5a10.1 10.1 0 005.5 1.6c6.6 0 10.2-5.6 10.2-10.5v-.5c.7-.5 1.3-1.1 1.8-1.8-.6.3-1.3.5-2 .6z" stroke="none" fill="currentColor"/>',
  linkedin:'<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M7.5 10.5v6M7.5 7.7v.02M11 16.5v-3.5c0-1.2.8-2 2-2s2 .8 2 2v3.5M11 10.5v6" stroke="var(--bg)" stroke-width="1.4"/>'
 };
 function socialIcon(name,fillMode){return `<svg viewBox="0 0 24 24" ${fillMode==='fill'?'fill="currentColor" stroke="none"':'fill="none" stroke="currentColor" stroke-width="1.6"'} stroke-linecap="round" stroke-linejoin="round">${socialIcons[name]}</svg>`;}
 const soc=document.getElementById('socials');
 if(soc){
  const links=[];
  if(p.facebook) links.push(`<a href="${esc(p.facebook)}" target="_blank" rel="noopener" aria-label="Facebook" title="Facebook">${socialIcon('facebook','fill')}</a>`);
  if(p.instagram) links.push(`<a href="${esc(p.instagram)}" target="_blank" rel="noopener" aria-label="Instagram" title="Instagram">${socialIcon('instagram')}</a>`);
  if(p.youtube) links.push(`<a href="${esc(p.youtube)}" target="_blank" rel="noopener" aria-label="YouTube" title="YouTube">${socialIcon('youtube','fill')}</a>`);
  if(p.twitter) links.push(`<a href="${esc(p.twitter)}" target="_blank" rel="noopener" aria-label="Twitter" title="Twitter">${socialIcon('twitter','fill')}</a>`);
  if(p.linkedin) links.push(`<a href="${esc(p.linkedin)}" target="_blank" rel="noopener" aria-label="LinkedIn" title="LinkedIn">${socialIcon('linkedin')}</a>`);
  soc.innerHTML=links.join('');
 }

 // Google Map
 const mapEl=document.getElementById('mapEmbed');
 if(mapEl){
  const src=mapEmbedSrc(s);
  mapEl.innerHTML=src?`<iframe src="${esc(src)}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`:'';
  mapEl.style.display=src?'block':'none';
 }

 // Footer
 const fb=document.getElementById('footerBrand');
 if(fb) fb.textContent=(p.name||'Paramhansh Upadhyay').toUpperCase();
 const ft=document.getElementById('footerText');
 if(ft) ft.textContent=s.footer||('© '+new Date().getFullYear()+'. All rights reserved.');
}

function fillGrid(id,arr,tpl){
 const el=document.getElementById(id);
 if(!el || !arr || !arr.length) return; // keep the existing placeholder markup
 el.innerHTML=arr.map(tpl).join('');
}

// Contact form -> saves enquiry into the same CMS data the admin panel reads
function wireForm(){
 const form=document.getElementById('contactForm');
 if(!form) return;
 form.addEventListener('submit',e=>{
  e.preventDefault();
  const data=loadData();
  data.messages.unshift({
   name:document.getElementById('cfName').value.trim(),
   email:document.getElementById('cfEmail').value.trim(),
   phone:document.getElementById('cfPhone').value.trim(),
   message:document.getElementById('cfMessage').value.trim(),
   time:new Date().toLocaleString()
  });
  data.activity.unshift({text:'New enquiry received from '+(document.getElementById('cfName').value.trim()||'a visitor'),time:new Date().toLocaleString()});
  data.activity=data.activity.slice(0,8);
  localStorage.setItem(KEY,JSON.stringify(data));
  form.reset();
  let note=form.querySelector('.form-note');
  if(!note){note=document.createElement('p');note.className='form-note';form.appendChild(note);}
  note.textContent='Thank you — your enquiry has been sent. We will get back to you shortly.';
 });
}

document.addEventListener('DOMContentLoaded',()=>{render();wireForm();});
})();
