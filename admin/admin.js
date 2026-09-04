const KEY='paramhanshCMS';
const defaults={
 profile:{name:'Paramhansh Upadhyay',designation:'Advocate',tagline:'',experience:'',bio:'',photo:'',facebook:'https://www.facebook.com/ParamIAS700',instagram:'https://www.instagram.com/paramhanshupadhyay/',youtube:'https://www.youtube.com/@paramhanshupadhyay',twitter:'',linkedin:''},
 practice:[],cases:[],articles:[],testimonials:[],education:[],experience:[],stats:[{value:'24/7',label:'Client Support',description:'Communicates accessibility',order:'1'}],media:[],messages:[],
 settings:{title:'Paramhansh Upadhyay | Advocate',email:'',phone:'',address:'',footer:'',logo:'',mapEmbed:''},
 activity:[]
};
function mergeDefaults(saved,def){
 const out={};
 for(const k in def){
  if(Array.isArray(def[k])) out[k]=Array.isArray(saved?.[k])?saved[k]:structuredClone(def[k]);
  else if(def[k]&&typeof def[k]==='object') out[k]=Object.assign(structuredClone(def[k]),saved?.[k]||{});
  else out[k]=(saved&&saved[k]!==undefined)?saved[k]:def[k];
 }
 return out;
}
let data=mergeDefaults(JSON.parse(localStorage.getItem(KEY)||'null'),defaults);
function save(){localStorage.setItem(KEY,JSON.stringify(data));document.getElementById('saveStatus').textContent='● Saved';setTimeout(()=>document.getElementById('saveStatus').textContent='● Local changes saved',900);render();}
function esc(s=''){return String(s).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));}
function toast(msg){const t=document.createElement('div');t.className='toast';t.textContent=msg;document.body.appendChild(t);setTimeout(()=>t.remove(),1800)}
const labels={dashboard:'Good afternoon, Paramhansh',profile:'Profile Management',education:'Education',experience:'Experience',stats:'Stat Cards',practice:'Practice Areas',cases:'Case Studies',articles:'Articles & Legal Insights',testimonials:'Testimonials',media:'Media Library',messages:'Contact Messages',settings:'Website Settings'};
function openSection(id){document.querySelectorAll('.page').forEach(p=>p.classList.toggle('active-page',p.id===id));document.querySelectorAll('.nav-item').forEach(b=>b.classList.toggle('active',b.dataset.section===id));document.getElementById('pageTitle').textContent=labels[id];window.scrollTo({top:0,behavior:'smooth'});render();}
document.querySelectorAll('.nav-item').forEach(b=>b.addEventListener('click',()=>openSection(b.dataset.section)));
document.querySelectorAll('[data-go]').forEach(b=>b.addEventListener('click',()=>openSection(b.dataset.go)));
function addActivity(text){data.activity.unshift({text,time:new Date().toLocaleString()});data.activity=data.activity.slice(0,8)}

function mapEmbedSrc(){
 if(data.settings.mapEmbed) return data.settings.mapEmbed;
 if(data.settings.address) return 'https://www.google.com/maps?q='+encodeURIComponent(data.settings.address)+'&output=embed';
 return '';
}

// ---- Generic field configuration for every add/edit-able content type ----
const FIELD_CONFIG={
 practice:{label:'Practice Area',fields:[{key:'title',label:'Name'},{key:'description',label:'Description',type:'textarea'}]},
 cases:{label:'Case Study',fields:[{key:'title',label:'Case title'},{key:'description',label:'Summary / outcome',type:'textarea'}]},
 articles:{label:'Article',fields:[{key:'title',label:'Article title'},{key:'description',label:'Article content',type:'textarea'}]},
 testimonials:{label:'Testimonial',fields:[{key:'title',label:'Client name / label'},{key:'description',label:'Testimonial',type:'textarea'}]},
 education:{label:'Education',fields:[
  {key:'qualification',label:'Qualification',placeholder:'e.g. B.Tech Computer Science'},
  {key:'institution',label:'Institution',placeholder:'e.g. Quantum University, Roorkee'},
  {key:'degree',label:'Degree / Specialization',placeholder:'e.g. AI & ML specialization'},
  {key:'year',label:'Year',placeholder:'e.g. 2023 – 2027'},
  {key:'description',label:'Description',type:'textarea'},
  {key:'order',label:'Display order (lower number shows first)',placeholder:'e.g. 1'}
 ]},
 experience:{label:'Experience',fields:[
  {key:'position',label:'Job / Position',placeholder:'e.g. Technical Associate'},
  {key:'organization',label:'Organization',placeholder:'e.g. Caelius Consulting'},
  {key:'startYear',label:'Start year',placeholder:'e.g. 2026'},
  {key:'endYear',label:'End year (or "Present")',placeholder:'e.g. Present'},
  {key:'description',label:'Description',type:'textarea'},
  {key:'order',label:'Display order (lower number shows first)',placeholder:'e.g. 1'}
 ]},
 stats:{label:'Stat Card',fields:[
  {key:'value',label:'Value / Number',placeholder:'e.g. 24/7'},
  {key:'label',label:'Label',placeholder:'e.g. Client Support'},
  {key:'description',label:'Short description (optional)',placeholder:'e.g. Communicates accessibility'},
  {key:'order',label:'Display order (lower number shows first)',placeholder:'e.g. 1'}
 ]}
};
function itemTitle(x){return x.title||x.qualification||x.position||x.value||x.name||'Untitled';}
function itemSubtitle(x){return x.description||x.institution||x.organization||x.label||x.excerpt||x.text||'No description added yet.';}

function render(){
 document.getElementById('statArticles').textContent=data.articles.length;document.getElementById('statCases').textContent=data.cases.length;document.getElementById('statTestimonials').textContent=data.testimonials.length;document.getElementById('statMessages').textContent=data.messages.length;
 document.getElementById('dashName').textContent=data.profile.name||'Paramhansh Upadhyay';document.getElementById('dashDesignation').textContent=data.profile.designation||'Advocate';
 const act=document.getElementById('activity');act.innerHTML=data.activity.length?data.activity.map(a=>`<div class="item"><div class="item-main"><strong>${esc(a.text)}</strong><span>${esc(a.time)}</span></div></div>`).join(''):'<div class="empty">No activity yet. Your edits will appear here.</div>';
 list('practiceList',data.practice,'Practice Area','practice');list('caseList',data.cases,'Case Study','cases');list('articleList',data.articles,'Article','articles');list('testimonialList',data.testimonials,'Testimonial','testimonials');
 list('educationList',data.education,'Education','education');list('experienceList',data.experience,'Experience','experience');list('statsList',data.stats,'Stat Card','stats');
 const ml=document.getElementById('mediaList');ml.innerHTML=data.media.length?data.media.map((m,i)=>`<div class="media-card"><img src="${m.data}" alt=""><div>${esc(m.name)} <button onclick="removeMedia(${i})" style="float:right;background:none;border:0;color:#ff8b8b;cursor:pointer">Delete</button></div></div>`).join(''):'<div class="empty">No media uploaded yet.</div>';
 const mlist=document.getElementById('messageList');mlist.innerHTML=data.messages.length?data.messages.map((m,i)=>`<div class="item"><div class="item-main"><strong>${esc(m.name||'Unknown')} — ${esc(m.email||'')}</strong><span>${esc(m.message||'')}</span></div><div class="item-actions"><button class="danger" onclick="removeMessage(${i})">Delete</button></div></div>`).join(''):'<div class="empty">No enquiries yet. Website contact-form submissions will appear here.</div>';

 const pPrev=document.getElementById('pPhotoPreview');pPrev.innerHTML=data.profile.photo?`<img src="${data.profile.photo}" alt="">`:'<span>No photo</span>';
 const sPrev=document.getElementById('sLogoPreview');sPrev.innerHTML=data.settings.logo?`<img src="${data.settings.logo}" alt="">`:'<span>P<i>U</i></span>';
 const mapPrev=document.getElementById('sMapPreview');const src=mapEmbedSrc();mapPrev.innerHTML=src?`<iframe src="${esc(src)}" loading="lazy"></iframe>`:'Add an office address or paste an embed link above to preview the map.';
}
function list(id,arr,type,key){const el=document.getElementById(id);el.innerHTML=arr.length?arr.map((x,i)=>`<div class="item"><div class="item-main"><strong>${esc(itemTitle(x))}</strong><span>${esc(itemSubtitle(x))}</span></div><div class="item-actions"><button onclick="editItem('${key}',${i})">Edit</button><button class="danger" onclick="removeItem('${key}',${i})">Delete</button></div></div>`).join(''):`<div class="empty">No ${type.toLowerCase()} added yet. Click “＋ Add” to create one.</div>`}
function showModal(title,fields,onSave){const modal=document.getElementById('modal'),content=document.getElementById('modalContent');content.innerHTML=`<h2>${title}</h2><div class="modal-form">${fields.map(f=>`<label>${f.label}${f.type==='textarea'?`<textarea id="mf_${f.key}" rows="5">${esc(f.value||'')}</textarea>`:`<input id="mf_${f.key}" value="${esc(f.value||'')}" placeholder="${esc(f.placeholder||'')}">`}</label>`).join('')}<div class="buttons"><button class="admin-btn" id="cancelModal">Cancel</button><button class="primary" id="confirmModal">Save</button></div></div>`;modal.classList.remove('hidden');document.getElementById('cancelModal').onclick=closeModal;document.getElementById('confirmModal').onclick=()=>{const out={};fields.forEach(f=>out[f.key]=document.getElementById('mf_'+f.key).value.trim());onSave(out);closeModal();save();toast('Saved successfully');};}
function closeModal(){document.getElementById('modal').classList.add('hidden')}document.getElementById('closeModal').onclick=closeModal;
function addItem(key){const cfg=FIELD_CONFIG[key];showModal('Add '+cfg.label,cfg.fields.map(f=>({...f,value:''})),v=>{data[key].push(v);addActivity(`${cfg.label} added: ${itemTitle(v)}`)});}
function editItem(key,i){const cfg=FIELD_CONFIG[key];const x=data[key][i];showModal('Edit '+cfg.label,cfg.fields.map(f=>({...f,value:x[f.key]})),v=>{data[key][i]=v;addActivity(`${cfg.label} updated: ${itemTitle(v)}`)});}
function removeItem(key,i){if(confirm('Delete this item?')){const cfg=FIELD_CONFIG[key];const name=itemTitle(data[key][i]);data[key].splice(i,1);addActivity(`${cfg.label} deleted: ${name}`);save();toast('Deleted');}}
function removeMedia(i){if(confirm('Delete this image?')){data.media.splice(i,1);addActivity('Media deleted');save();}}
function removeMessage(i){if(confirm('Delete this enquiry?')){data.messages.splice(i,1);addActivity('Enquiry deleted');save();}}
['addPractice','addCase','addArticle','addTestimonial','addEducation','addExperience','addStats'].forEach(id=>{const el=document.getElementById(id);if(el) el.onclick=()=>addItem({addPractice:'practice',addCase:'cases',addArticle:'articles',addTestimonial:'testimonials',addEducation:'education',addExperience:'experience',addStats:'stats'}[id]);});
document.getElementById('saveProfile').onclick=()=>{['Name','Designation','Tagline','Experience','Bio','Facebook','Instagram','Youtube','Twitter','Linkedin'].forEach(k=>data.profile[k.toLowerCase()]=document.getElementById('p'+k).value.trim());addActivity('Profile information updated');save();toast('Profile saved');};
document.getElementById('saveSettings').onclick=()=>{data.settings.title=sTitle.value.trim();data.settings.email=sEmail.value.trim();data.settings.phone=sPhone.value.trim();data.settings.address=sAddress.value.trim();data.settings.footer=sFooter.value.trim();data.settings.mapEmbed=sMapEmbed.value.trim();addActivity('Website settings updated');save();toast('Settings saved');};
mediaUpload.addEventListener('change',e=>{[...e.target.files].forEach(file=>{const r=new FileReader();r.onload=()=>{data.media.push({name:file.name,data:r.result});addActivity(`Uploaded media: ${file.name}`);save();};r.readAsDataURL(file)});e.target.value='';});

function readAsDataURL(file){return new Promise((res,rej)=>{const r=new FileReader();r.onload=()=>res(r.result);r.onerror=rej;r.readAsDataURL(file);});}
document.getElementById('pPhotoUpload').addEventListener('change',async e=>{const file=e.target.files[0];if(!file)return;data.profile.photo=await readAsDataURL(file);addActivity('Profile photo updated');save();toast('Photo updated');e.target.value='';});
document.getElementById('pPhotoRemove').addEventListener('click',()=>{if(!data.profile.photo)return;data.profile.photo='';addActivity('Profile photo removed');save();toast('Photo removed');});
document.getElementById('sLogoUpload').addEventListener('change',async e=>{const file=e.target.files[0];if(!file)return;data.settings.logo=await readAsDataURL(file);addActivity('Site logo updated');save();toast('Logo updated');e.target.value='';});
document.getElementById('sLogoRemove').addEventListener('click',()=>{if(!data.settings.logo)return;data.settings.logo='';addActivity('Site logo removed');save();toast('Logo removed');});
document.getElementById('sMapEmbed').addEventListener('input',()=>{const val=sMapEmbed.value.trim()||(sAddress.value.trim()?('https://www.google.com/maps?q='+encodeURIComponent(sAddress.value.trim())+'&output=embed'):'');document.getElementById('sMapPreview').innerHTML=val?`<iframe src="${esc(val)}" loading="lazy"></iframe>`:'Add an office address or paste an embed link above to preview the map.';});
document.getElementById('sAddress')?.addEventListener('input',()=>{if(!sMapEmbed.value.trim()){const val=sAddress.value.trim()?('https://www.google.com/maps?q='+encodeURIComponent(sAddress.value.trim())+'&output=embed'):'';document.getElementById('sMapPreview').innerHTML=val?`<iframe src="${esc(val)}" loading="lazy"></iframe>`:'Add an office address or paste an embed link above to preview the map.';}});

function loadProfile(){
 const p=data.profile;[['pName','name'],['pDesignation','designation'],['pTagline','tagline'],['pExperience','experience'],['pBio','bio'],['pFacebook','facebook'],['pInstagram','instagram'],['pYoutube','youtube'],['pTwitter','twitter'],['pLinkedin','linkedin']].forEach(([id,k])=>document.getElementById(id).value=p[k]||'');
 const s=data.settings;[['sTitle','title'],['sEmail','email'],['sPhone','phone'],['sAddress','address'],['sFooter','footer'],['sMapEmbed','mapEmbed']].forEach(([id,k])=>document.getElementById(id).value=s[k]||'');
}
loadProfile();render();
