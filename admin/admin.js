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
const labels={dashboard:'Good afternoon, Paramhansh',profile:'Profile Management',practice:'Practice Areas',cases:'Case Studies',articles:'Articles & Legal Insights',testimonials:'Testimonials',media:'Media Library',messages:'Contact Messages',settings:'Website Settings'};
function openSection(id){document.querySelectorAll('.page').forEach(p=>p.classList.toggle('active-page',p.id===id));document.querySelectorAll('.nav-item').forEach(b=>b.classList.toggle('active',b.dataset.section===id));document.getElementById('pageTitle').textContent=labels[id];window.scrollTo({top:0,behavior:'smooth'});render();}
document.querySelectorAll('.nav-item').forEach(b=>b.addEventListener('click',()=>openSection(b.dataset.section)));
document.querySelectorAll('[data-go]').forEach(b=>b.addEventListener('click',()=>openSection(b.dataset.go)));
function addActivity(text){data.activity.unshift({text,time:new Date().toLocaleString()});data.activity=data.activity.slice(0,8)}

function mapEmbedSrc(){
 if(data.settings.mapEmbed) return data.settings.mapEmbed;
 if(data.settings.address) return 'https://www.google.com/maps?q='+encodeURIComponent(data.settings.address)+'&output=embed';
 return '';
}

function render(){
 document.getElementById('statArticles').textContent=data.articles.length;document.getElementById('statCases').textContent=data.cases.length;document.getElementById('statTestimonials').textContent=data.testimonials.length;document.getElementById('statMessages').textContent=data.messages.length;
 document.getElementById('dashName').textContent=data.profile.name||'Paramhansh Upadhyay';document.getElementById('dashDesignation').textContent=data.profile.designation||'Advocate';
 const act=document.getElementById('activity');act.innerHTML=data.activity.length?data.activity.map(a=>`<div class="item"><div class="item-main"><strong>${esc(a.text)}</strong><span>${esc(a.time)}</span></div></div>`).join(''):'<div class="empty">No activity yet. Your edits will appear here.</div>';
 list('practiceList',data.practice,'Practice Area','practice');list('caseList',data.cases,'Case Study','cases');list('articleList',data.articles,'Article','articles');list('testimonialList',data.testimonials,'Testimonial','testimonials');
 const ml=document.getElementById('mediaList');ml.innerHTML=data.media.length?data.media.map((m,i)=>`<div class="media-card"><img src="${m.data}" alt=""><div>${esc(m.name)} <button onclick="removeMedia(${i})" style="float:right;background:none;border:0;color:#ff8b8b;cursor:pointer">Delete</button></div></div>`).join(''):'<div class="empty">No media uploaded yet.</div>';
 const mlist=document.getElementById('messageList');mlist.innerHTML=data.messages.length?data.messages.map((m,i)=>`<div class="item"><div class="item-main"><strong>${esc(m.name||'Unknown')} — ${esc(m.email||'')}</strong><span>${esc(m.message||'')}</span></div><div class="item-actions"><button class="danger" onclick="removeMessage(${i})">Delete</button></div></div>`).join(''):'<div class="empty">No enquiries yet. Website contact-form submissions will appear here.</div>';

 const pPrev=document.getElementById('pPhotoPreview');pPrev.innerHTML=data.profile.photo?`<img src="${data.profile.photo}" alt="">`:'<span>No photo</span>';
 const sPrev=document.getElementById('sLogoPreview');sPrev.innerHTML=data.settings.logo?`<img src="${data.settings.logo}" alt="">`:'<span>P<i>U</i></span>';
 const mapPrev=document.getElementById('sMapPreview');const src=mapEmbedSrc();mapPrev.innerHTML=src?`<iframe src="${esc(src)}" loading="lazy"></iframe>`:'Add an office address or paste an embed link above to preview the map.';
}
function list(id,arr,type,key){const el=document.getElementById(id);el.innerHTML=arr.length?arr.map((x,i)=>`<div class="item"><div class="item-main"><strong>${esc(x.title||x.name||'Untitled')}</strong><span>${esc(x.description||x.excerpt||x.text||'No description added yet.')}</span></div><div class="item-actions"><button onclick="editItem('${key}',${i})">Edit</button><button class="danger" onclick="removeItem('${key}',${i})">Delete</button></div></div>`).join(''):`<div class="empty">No ${type.toLowerCase()} added yet. Click “＋ Add” to create one.</div>`}
function showModal(title,fields,onSave){const modal=document.getElementById('modal'),content=document.getElementById('modalContent');content.innerHTML=`<h2>${title}</h2><div class="modal-form">${fields.map(f=>`<label>${f.label}${f.type==='textarea'?`<textarea id="mf_${f.key}" rows="5">${esc(f.value||'')}</textarea>`:`<input id="mf_${f.key}" value="${esc(f.value||'')}" placeholder="${esc(f.placeholder||'')}">`}</label>`).join('')}<div class="buttons"><button class="admin-btn" id="cancelModal">Cancel</button><button class="primary" id="confirmModal">Save</button></div></div>`;modal.classList.remove('hidden');document.getElementById('cancelModal').onclick=closeModal;document.getElementById('confirmModal').onclick=()=>{const out={};fields.forEach(f=>out[f.key]=document.getElementById('mf_'+f.key).value.trim());onSave(out);closeModal();save();toast('Saved successfully');};}
function closeModal(){document.getElementById('modal').classList.add('hidden')}document.getElementById('closeModal').onclick=closeModal;
function addItem(key){const cfg={practice:{title:'Add Practice Area',fields:[['title','Name'],['description','Description']],seed:{title:'',description:''}},cases:{title:'Add Case Study',fields:[['title','Case title'],['description','Summary / outcome','textarea']],seed:{title:'',description:''}},articles:{title:'Create Article',fields:[['title','Article title'],['description','Article content','textarea']],seed:{title:'',description:''}},testimonials:{title:'Add Testimonial',fields:[['title','Client name / label'],['description','Testimonial','textarea']],seed:{title:'',description:''}}}[key];showModal(cfg.title,cfg.fields.map(([key,label,type])=>({key,label,type,value:cfg.seed[key]})),v=>{data[key].push(v);addActivity(`${cfg.title.replace('Add ','').replace('Create ','')} created: ${v.title}`)});}
function editItem(key,i){const x=data[key][i];const fields=key==='testimonials'?[{key:'title',label:'Client name / label',value:x.title},{key:'description',label:'Testimonial',type:'textarea',value:x.description}]:key==='articles'?[{key:'title',label:'Article title',value:x.title},{key:'description',label:'Article content',type:'textarea',value:x.description}]:[{key:'title',label:key==='cases'?'Case title':'Name',value:x.title},{key:'description',label:key==='cases'?'Summary / outcome':'Description',type:key==='cases'?'textarea':'textarea',value:x.description}];showModal('Edit',fields,v=>{data[key][i]=v;addActivity(`Updated ${key}: ${v.title}`)});}
function removeItem(key,i){if(confirm('Delete this item?')){const name=data[key][i].title;data[key].splice(i,1);addActivity(`Deleted ${key}: ${name}`);save();toast('Deleted');}}
function removeMedia(i){if(confirm('Delete this image?')){data.media.splice(i,1);addActivity('Media deleted');save();}}
function removeMessage(i){if(confirm('Delete this enquiry?')){data.messages.splice(i,1);addActivity('Enquiry deleted');save();}}
['addPractice','addCase','addArticle','addTestimonial'].forEach(id=>document.getElementById(id).onclick=()=>addItem({addPractice:'practice',addCase:'cases',addArticle:'articles',addTestimonial:'testimonials'}[id]));
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
