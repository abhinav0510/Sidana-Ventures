/* =====================================================================
   Sedana – shared UI helpers: icons, modals, drawers, dropdowns, toasts,
   command palette and the common popups used across pages.
   ===================================================================== */
const PAGES = {};
const I = (name, cls='') => `<i data-lucide="${name}" class="${cls}"></i>`;
const $ = (sel, root=document) => root.querySelector(sel);
const $$ = (sel, root=document) => [...root.querySelectorAll(sel)];
function refreshIcons(){ if(window.lucide) lucide.createIcons(); }
function fmtINR(n){ if(n>=10000000) return '₹'+(n/10000000).toFixed(n%10000000?1:0)+' Cr'; if(n>=100000) return '₹'+(n/100000).toFixed(n%100000?1:0)+'L'; return '₹'+n.toLocaleString('en-IN'); }
function fmtFull(n){ return '₹'+n.toLocaleString('en-IN'); }
function avatar(ini, c, cls=''){ return `<div class="avatar ${cls}" style="background:${c}">${ini}</div>`; }
function initials(n){ return n.split(' ').map(x=>x[0]).join('').slice(0,2).toUpperCase(); }
function esc(s){ return String(s).replace(/[&<>"]/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])); }

/* ------------------------------ Toasts ------------------------------ */
function toast(msg, type='ok'){
  const t = document.createElement('div');
  t.className = 'toast '+(type==='err'?'err':type==='info'?'info':'');
  t.innerHTML = `${I(type==='err'?'x-circle':type==='info'?'info':'check-circle-2')}<span>${msg}</span>`;
  $('#toasts').appendChild(t); refreshIcons();
  setTimeout(()=>{ t.style.opacity='0'; t.style.transition='.3s'; setTimeout(()=>t.remove(),300); }, 3200);
}

/* ------------------------------ Modals ------------------------------ */
function openModal(html, {size='', onOpen}={}){
  closeModal();
  const o = document.createElement('div'); o.className='overlay'; o.id='overlay';
  o.innerHTML = `<div class="modal ${size}">${html}</div>`;
  o.addEventListener('click', e=>{ if(e.target===o) closeModal(); });
  $('#modal-root').appendChild(o); refreshIcons();
  $$('[data-close]', o).forEach(b=>b.addEventListener('click', closeModal));
  if(onOpen) onOpen(o);
  return o;
}
function openDrawer(html, {onOpen}={}){
  closeModal();
  const o = document.createElement('div'); o.className='overlay'; o.id='overlay'; o.style.justifyContent='flex-end'; o.style.padding='0';
  o.innerHTML = `<div class="drawer">${html}</div>`;
  o.addEventListener('click', e=>{ if(e.target===o) closeModal(); });
  $('#modal-root').appendChild(o); refreshIcons();
  $$('[data-close]', o).forEach(b=>b.addEventListener('click', closeModal));
  if(onOpen) onOpen(o);
  return o;
}
function closeModal(){ const o=$('#overlay'); if(o) o.remove(); }
function modalHead(title, sub=''){ return `<div class="modal-head"><div><h3>${title}</h3>${sub?`<p>${sub}</p>`:''}</div><button class="btn btn-icon" data-close>${I('x')}</button></div>`; }
document.addEventListener('keydown', e=>{ if(e.key==='Escape'){ closeModal(); closeDropdowns(); closeCmdk(); } });

function confirmModal({title, text, ok='Confirm', danger=false, onOk}){
  openModal(`${modalHead(title)}<div class="modal-body"><p style="color:var(--ink-2)">${text}</p></div>
    <div class="modal-foot"><button class="btn btn-secondary" data-close>Cancel</button><button class="btn ${danger?'btn-danger':'btn-primary'}" id="cf-ok">${ok}</button></div>`, {size:'sm',
    onOpen: o=> $('#cf-ok',o).onclick=()=>{ closeModal(); onOk&&onOk(); } });
}

/* ------------------------------ Dropdowns --------------------------- */
function closeDropdowns(){ $$('.dd').forEach(d=>d.remove()); }
function dropdown(anchor, html, {wide=false, align='right'}={}){
  const existing = anchor.parentElement.querySelector('.dd');
  closeDropdowns();
  if(existing) return;
  const d = document.createElement('div'); d.className='dd'+(wide?' wide':''); d.innerHTML=html;
  if(align==='left'){ d.style.right='auto'; d.style.left='0'; d.style.transformOrigin='top left'; }
  anchor.parentElement.style.position='relative';
  anchor.parentElement.appendChild(d); refreshIcons();
  setTimeout(()=>document.addEventListener('click', function h(e){ if(!d.contains(e.target) && e.target!==anchor && !anchor.contains(e.target)){ d.remove(); document.removeEventListener('click',h);} }),0);
  return d;
}
function menuItems(items){
  return items.map(it=> it==='-' ? `<div class="sep"></div>` : it.hd ? `<div class="hd">${it.hd}</div>` :
    `<button class="item ${it.danger?'danger':''}" data-act="${it.act||''}">${I(it.ico)}<span>${it.label}</span>${it.right?`<span style="margin-left:auto;font-size:11px;color:var(--ink-4)">${it.right}</span>`:''}</button>`).join('');
}

/* ------------------------------ Command palette -------------------- */
function closeCmdk(){ const c=$('#cmdk'); if(c) c.remove(); }
function openCmdk(){
  closeCmdk();
  const items = [
    {hd:'Pages'},
    {ico:'layout-dashboard',label:'Dashboard',go:'dashboard'},{ico:'user',label:'My Profile',go:'profile'},{ico:'file-text',label:'Pitch Deck & Documents',go:'documents'},
    {ico:'bar-chart-3',label:'Financial Details',go:'financials'},{ico:'sparkles',label:'AI Studio',go:'aistudio'},{ico:'target',label:'Investor Matches',go:'matches'},
    {ico:'send',label:'Start Outreaching',go:'outreach'},{ico:'calendar',label:'Meetings',go:'meetings'},{ico:'wallet',label:'Credit Wallet',go:'wallet'},{ico:'settings',label:'Settings',go:'settings'},
    {hd:'Quick actions'},
    {ico:'coins',label:'Buy credits',fn:()=>buyCreditsModal()},{ico:'upload',label:'Upload a document',fn:()=>uploadDocModal()},{ico:'presentation',label:'Create pitch deck with AI',go:'aistudio/deck'},
    {ico:'rocket',label:'Start a new outreach',go:'outreach/new'},{ico:'calendar-plus',label:'Schedule a meeting',fn:()=>scheduleMeetingModal()},{ico:'phone',label:'Book a call with Sedana team',fn:()=>bookCallModal()},
    {hd:'Investors'},
    ...DB.investors.slice(0,6).map(i=>({ico:'building',label:i.n,go:'matches/'+i.id,right:i.match+'% match'}))
  ];
  const c = document.createElement('div'); c.className='cmdk'; c.id='cmdk';
  c.innerHTML = `<div class="cmdk-box"><div class="in">${I('search')}<input id="cmdk-in" placeholder="Search investors, pages, actions…"><span class="kbd" style="position:static;transform:none">Esc</span></div><div class="cmdk-list" id="cmdk-list"></div></div>`;
  c.addEventListener('click', e=>{ if(e.target===c) closeCmdk(); });
  document.body.appendChild(c);
  const list = $('#cmdk-list', c), inp = $('#cmdk-in', c);
  const render = q => {
    const f = q ? items.filter(i=>i.label && i.label.toLowerCase().includes(q.toLowerCase())) : items;
    list.innerHTML = f.length ? f.map(i=> i.hd ? `<div class="hd">${i.hd}</div>` : `<div class="it" data-go="${i.go||''}">${I(i.ico)}<span>${i.label}</span>${i.right?`<span class="k">${i.right}</span>`:''}</div>`).join('') : `<div class="empty">No results for "${esc(q)}"</div>`;
    refreshIcons();
    $$('.it', list).forEach((el,idx)=> el.onclick=()=>{ const it=f.filter(x=>!x.hd)[idx]; closeCmdk(); if(it.go) go(it.go); else if(it.fn) it.fn(); });
  };
  render(''); inp.focus(); inp.oninput = e=>render(e.target.value);
}
document.addEventListener('keydown', e=>{ if((e.ctrlKey||e.metaKey) && e.key.toLowerCase()==='k'){ e.preventDefault(); if($('#app-shell')) openCmdk(); } });

/* =====================================================================
   Shared popups
   ===================================================================== */
function buyCreditsModal(preselect='starter'){
  let sel = preselect;
  const render = () => `${modalHead('Buy Credits','Choose a plan that fits your fundraising needs. Credits never expire.')}
  <div class="modal-body">
    <div class="col gap12">${DB.plans.map(p=>`<div class="plan ${sel===p.id?'sel':''}" data-id="${p.id}">${p.pop?'<span class="pop">POPULAR</span>':''}<span class="rd"></span><div><b>${p.cr.toLocaleString('en-IN')} Credits</b><span>${p.n} · ${p.d}</span></div><div class="pr">₹${p.pr.toLocaleString('en-IN')}</div></div>`).join('')}</div>
    <div class="mt16 card pad-sm" style="background:#fafbfe">
      <div class="row between small"><span class="muted">What can you do with credits?</span></div>
      <div class="four mt8" style="gap:8px">
        ${[['presentation','Pitch deck','50'],['file','Teaser','20'],['unlock','Unlock contact','25–30'],['send','Outreach email','5']].map(x=>`<div class="row gap8 small"><span class="ico-box sm">${I(x[0])}</span><div><b>${x[2]}</b><br><span class="muted xs">${x[1]}</span></div></div>`).join('')}
      </div>
    </div>
    <div class="mt16"><label class="small strong">Payment method</label>
      <div class="three mt8" style="gap:8px">
        ${[['credit-card','Card'],['smartphone','UPI'],['landmark','Net banking']].map((m,i)=>`<div class="opt-card ${i===0?'sel':''} pm">${I(m[0])}<b>${m[1]}</b><span class="chk">${I('check')}</span></div>`).join('')}
      </div></div>
  </div>
  <div class="modal-foot"><button class="btn btn-secondary" data-close>Cancel</button><button class="btn btn-primary" id="buy-go">${I('lock')} Pay ₹${DB.plans.find(p=>p.id===sel).pr.toLocaleString('en-IN')} securely</button></div>`;
  const o = openModal(render(), {onOpen: wire});
  function wire(o){
    $$('.plan', o).forEach(p=>p.onclick=()=>{ sel=p.dataset.id; $('.modal',o).innerHTML=render(); refreshIcons(); wire(o); $$('[data-close]',o).forEach(b=>b.onclick=closeModal); });
    $$('.pm', o).forEach(p=>p.onclick=()=>{ $$('.pm',o).forEach(x=>x.classList.remove('sel')); p.classList.add('sel'); });
    $('#buy-go', o).onclick = ()=>{
      const plan = DB.plans.find(p=>p.id===sel);
      $('.modal',o).innerHTML = `<div class="modal-body center" style="padding:40px"><div class="ico-box" style="width:56px;height:56px;margin:0 auto 14px">${I('loader-2','spin')}</div><h3>Processing payment…</h3><p class="muted mt8">Connecting to secure payment gateway</p></div>`; refreshIcons();
      setTimeout(()=>{
        DB.credits += plan.cr; saveState();
        DB.transactions.unshift({ d: '12 Oct 2026', t: 'Just now', type: 'Credit Purchase', desc: `Purchased ${plan.cr} credits (${plan.n} Plan)`, c: plan.cr, bal: DB.credits, ico:'shopping-cart', col:'blue' });
        $('.modal',o).innerHTML = `<div class="modal-body center" style="padding:40px"><div class="ico-box green" style="width:64px;height:64px;margin:0 auto 14px;border-radius:50%">${I('check')}</div><h3>Payment successful!</h3><p class="muted mt8">${plan.cr.toLocaleString('en-IN')} credits have been added to your wallet.</p><div class="mt16" style="font-size:32px;font-weight:800">${DB.credits.toLocaleString('en-IN')} <span class="muted" style="font-size:14px">credits</span></div><div class="row mt20" style="justify-content:center"><button class="btn btn-secondary" data-close>Close</button><button class="btn btn-primary" id="buy-wallet">View wallet</button></div></div>`;
        refreshIcons(); $$('[data-close]',o).forEach(b=>b.onclick=closeModal); $('#buy-wallet',o).onclick=()=>{ closeModal(); go('wallet'); };
        updateCredits(); toast(`${plan.cr} credits added to your wallet`);
      }, 1400);
    };
  }
}

function unlockContactModal(inv){
  if(inv.unlocked){ go('matches/'+inv.id); return; }
  openModal(`${modalHead('Unlock Investor Contact','Get verified contact details and start a conversation.')}
    <div class="modal-body">
      <div class="row gap12" style="padding:14px;border:1px solid var(--line);border-radius:12px">${avatar(inv.ini, inv.c, 'lg')}<div><b style="font-size:15px">${inv.n}</b><div class="muted small">${inv.t} · ${inv.geo}</div></div><span class="match-pct" style="margin-left:auto">${inv.match}% Match</span></div>
      <div class="mt16 col gap8 small">
        ${['Verified partner email & LinkedIn','Preferred intro channel and best time to reach','Thesis notes & recent deal activity','Add directly to an outreach list'].map(x=>`<div class="row gap8">${I('check-circle-2')}<span>${x}</span></div>`).join('')}
      </div>
      <div class="cost-box mt16"><div><span>Unlock cost</span><b>${inv.cost} credits</b></div><div><span>Your balance</span><b>${DB.credits} credits</b></div><div><span>Balance after unlock</span><span>${DB.credits-inv.cost} credits</span></div></div>
      ${DB.credits<inv.cost?`<div class="mt12 badge badge-red">Insufficient credits — top up to unlock</div>`:''}
    </div>
    <div class="modal-foot"><button class="btn btn-secondary" data-close>Cancel</button>${DB.credits<inv.cost?`<button class="btn btn-primary" id="ul-buy">${I('coins')} Buy credits</button>`:`<button class="btn btn-primary" id="ul-go">${I('unlock')} Unlock for ${inv.cost} credits</button>`}</div>`,
    { onOpen: o=>{
      const b=$('#ul-go',o); if(b) b.onclick=()=>{ DB.credits-=inv.cost; inv.unlocked=true; saveState(); updateCredits();
        DB.transactions.unshift({ d:'12 Oct 2026', t:'Just now', type:'Unlock Contact', desc:`Unlocked contact – ${inv.n}`, c:-inv.cost, bal:DB.credits, ico:'users', col:'amber' });
        DB.activity.unshift({ ico:'unlock', col:'green', t:`Unlocked ${inv.n}`, d:'Contact details are now available.', tm:'Just now' });
        closeModal(); toast(`${inv.n} contact unlocked`); go('matches/'+inv.id); };
      const bb=$('#ul-buy',o); if(bb) bb.onclick=()=>buyCreditsModal();
    }});
}

function uploadDocModal(onDone){
  openModal(`${modalHead('Upload Document','PDF, PPTX, XLSX, DOCX or MP4 up to 50 MB.')}
    <div class="modal-body">
      <div class="drop" id="up-drop"><div class="ico-box">${I('upload-cloud')}</div><h4>Drag & drop your file here</h4><p>or <a href="#">browse from your computer</a></p></div>
      <div class="form-grid mt16"><div class="field"><label>Document type</label><select class="select"><option>Pitch Deck</option><option>Teaser</option><option>Financial Model</option><option>Product Demo</option><option>Legal / Compliance</option><option>Other</option></select></div>
      <div class="field"><label>Visibility</label><select class="select"><option>Investors with unlocked access</option><option>Anyone with share link</option><option>Private (only me)</option></select></div></div>
      <label class="check mt12"><input type="checkbox" checked> Let Sedana AI analyze this document and update my profile</label>
    </div>
    <div class="modal-foot"><button class="btn btn-secondary" data-close>Cancel</button><button class="btn btn-primary" id="up-go">${I('upload')} Upload</button></div>`,
    { onOpen: o=>{ const d=$('#up-drop',o); d.onclick=()=>{ d.innerHTML=`<div class="ico-box green">${I('file-check')}</div><h4>New_Document.pdf</h4><p>2.4 MB · ready to upload</p>`; refreshIcons(); };
      $('#up-go',o).onclick=()=>{ $('.modal',o).innerHTML=`<div class="modal-body center" style="padding:40px"><div class="ico-box" style="width:56px;height:56px;margin:0 auto 14px">${I('loader-2','spin')}</div><h3>Uploading & analyzing…</h3><div class="progress mt16" style="max-width:260px;margin:16px auto 0"><span id="up-p" style="width:10%"></span></div></div>`; refreshIcons();
        let p=10; const iv=setInterval(()=>{ p+=18; const el=$('#up-p'); if(el) el.style.width=Math.min(p,100)+'%'; if(p>=100){ clearInterval(iv);
          DB.documents.unshift({ n:'New_Document.pdf', type:'PDF', size:'2.4 MB', date:'12 Oct 2026', time:'Just now' });
          DB.activity.unshift({ ico:'upload', col:'blue', t:'Document uploaded', d:'"New_Document.pdf" has been analyzed.', tm:'Just now' });
          closeModal(); toast('Document uploaded and analyzed'); if(onDone) onDone(); } }, 220); }; } });
}

function inviteMemberModal(){
  openModal(`${modalHead('Invite Team Member','Team members can edit the profile and manage outreach.')}
    <div class="modal-body"><div class="form-grid"><div class="field"><label>Full name <span class="req">*</span></label><input class="input" placeholder="e.g. Priya Nair"></div><div class="field"><label>Work email <span class="req">*</span></label><input class="input" placeholder="priya@technova.ai"></div>
    <div class="field"><label>Role / Title</label><input class="input" placeholder="Head of Growth"></div><div class="field"><label>Access level</label><select class="select"><option>Editor – edit profile & outreach</option><option>Viewer – read only</option><option>Admin – full access incl. billing</option></select></div></div>
    <div class="field mt12"><label>Personal message (optional)</label><textarea class="textarea" placeholder="Hey! Join our Sedana workspace to help with the Series A raise."></textarea></div></div>
    <div class="modal-foot"><button class="btn btn-secondary" data-close>Cancel</button><button class="btn btn-primary" id="inv-go">${I('send')} Send invite</button></div>`,
    { onOpen:o=> $('#inv-go',o).onclick=()=>{ const n=$$('input',o)[0].value||'New member'; DB.team.push({ n, r:$$('input',o)[2].value||'Team member', e:$$('input',o)[1].value||'pending@invite', c:'#0369a1', pending:true }); closeModal(); toast(`Invite sent to ${n}`); go('profile/team'); } });
}

function scheduleMeetingModal(inv){
  openModal(`${modalHead('Schedule a Meeting', inv?`Request a meeting with ${inv.n}. Sedana coordinates the time on your behalf.`:'Create a meeting with an investor or the Sedana team.')}
    <div class="modal-body"><div class="form-grid">
      <div class="field span-2"><label>With</label><select class="select">${inv?`<option>${inv.n}</option>`:''}${DB.investors.filter(i=>i.unlocked && (!inv||i.id!==inv.id)).map(i=>`<option>${i.n}</option>`).join('')}<option>Sedana Team</option></select></div>
      <div class="field"><label>Meeting title</label><input class="input" value="${inv?`Intro call – TechNova x ${inv.n}`:'Intro call'}"></div>
      <div class="field"><label>Duration</label><select class="select"><option>30 minutes</option><option>45 minutes</option><option>60 minutes</option></select></div>
      <div class="field"><label>Preferred date</label><input class="input" type="date" value="2026-10-20"></div>
      <div class="field"><label>Preferred time</label><input class="input" type="time" value="16:00"></div>
      <div class="field span-2"><label>Platform</label><div class="three" style="gap:8px">${[['video','Google Meet'],['video','Zoom'],['phone','Phone call']].map((m,i)=>`<div class="opt-card ${i===0?'sel':''} pm">${I(m[0])}<b>${m[1]}</b><span class="chk">${I('check')}</span></div>`).join('')}</div></div>
      <div class="field span-2"><label>Agenda / notes</label><textarea class="textarea" placeholder="Quick intro, product demo and discuss Series A round."></textarea></div>
    </div></div>
    <div class="modal-foot"><button class="btn btn-secondary" data-close>Cancel</button><button class="btn btn-primary" id="sm-go">${I('calendar-plus')} Send request</button></div>`,
    { onOpen:o=>{ $$('.pm',o).forEach(p=>p.onclick=()=>{ $$('.pm',o).forEach(x=>x.classList.remove('sel')); p.classList.add('sel'); });
      $('#sm-go',o).onclick=()=>{ const w=$('select',o).value; DB.meetings.unshift({ id:Date.now(), with:w, who:'Partner', title:$('input',o).value, date:'20 Oct 2026', day:'20', mon:'Oct', time:'4:00 PM – 4:30 PM', type:'Google Meet', status:'Pending', c:'#2f5bea', ini:w[0] }); closeModal(); toast('Meeting request sent'); go('meetings'); }; } });
}

function bookCallModal(){
  openModal(`${modalHead('Book a Call with Sedana','Talk to our team for a demo or fundraising strategy session. Free for all founders.')}
    <div class="modal-body">
      <div class="three" style="gap:10px">${[['presentation','Platform demo','20 min walkthrough'],['lightbulb','Fundraising strategy','45 min with an expert'],['headphones','Support','Help with any issue']].map((m,i)=>`<div class="opt-card ${i===0?'sel':''} pm">${I(m[0])}<div><b>${m[1]}</b><span>${m[2]}</span></div><span class="chk">${I('check')}</span></div>`).join('')}</div>
      <div class="form-grid mt16"><div class="field"><label>Date</label><input class="input" type="date" value="2026-10-14"></div><div class="field"><label>Time slot</label><select class="select"><option>10:00 AM – 10:30 AM</option><option>12:00 PM – 12:30 PM</option><option>3:00 PM – 3:30 PM</option><option>5:00 PM – 5:30 PM</option></select></div>
      <div class="field span-2"><label>What would you like to discuss?</label><textarea class="textarea" placeholder="e.g. Which investors should I prioritise for my Series A?"></textarea></div></div>
    </div>
    <div class="modal-foot"><button class="btn btn-secondary" data-close>Cancel</button><button class="btn btn-primary" id="bc-go">${I('phone')} Book call</button></div>`,
    { onOpen:o=>{ $$('.pm',o).forEach(p=>p.onclick=()=>{ $$('.pm',o).forEach(x=>x.classList.remove('sel')); p.classList.add('sel'); }); $('#bc-go',o).onclick=()=>{ closeModal(); toast('Call booked – calendar invite sent to your email'); }; } });
}

function editFieldModal(title, fields, onSave){
  openModal(`${modalHead(title)}<div class="modal-body"><div class="form-grid">${fields.map(f=>`<div class="field ${f.span?'span-2':''}"><label>${f.label}</label>${f.type==='select'?`<select class="select" data-k="${f.k}">${f.opts.map(o=>`<option ${o===f.v?'selected':''}>${o}</option>`).join('')}</select>`:f.type==='textarea'?`<textarea class="textarea" data-k="${f.k}">${esc(f.v||'')}</textarea>`:`<input class="input" data-k="${f.k}" value="${esc(f.v||'')}">`}</div>`).join('')}</div></div>
    <div class="modal-foot"><button class="btn btn-secondary" data-close>Cancel</button><button class="btn btn-primary" id="ef-go">${I('save')} Save changes</button></div>`,
    { onOpen:o=> $('#ef-go',o).onclick=()=>{ const vals={}; $$('[data-k]',o).forEach(el=>vals[el.dataset.k]=el.value); closeModal(); toast('Changes saved'); onSave&&onSave(vals); } });
}

function activityDrawer(){
  openDrawer(`${modalHead('All Activity','Everything that happened in your workspace.')}<div class="modal-body">
    <div class="seg mb16"><button class="active">All</button><button>Investors</button><button>Documents</button><button>Credits</button></div>
    ${DB.activity.map(a=>`<div class="activity"><span class="ico-box ${a.col}">${I(a.ico)}</span><div><b>${a.t}</b><p>${a.d}</p></div><span class="tm">${a.tm}</span></div>`).join('')}
    ${[['mail','blue','Outreach email opened','Peak XV opened your Series A email.','5 days ago'],['user-plus','teal','Team member added','Vikram Desai joined as CTO.','1 week ago'],['shield-check','green','Startup verified','Your startup profile has been verified by Sedana.','1 week ago'],['log-in','gray','Account created','Welcome to Sedana!','2 weeks ago']].map(a=>`<div class="activity"><span class="ico-box ${a[1]}">${I(a[0])}</span><div><b>${a[2]}</b><p>${a[3]}</p></div><span class="tm">${a[4]}</span></div>`).join('')}
  </div>`, { onOpen:o=> $$('.seg button',o).forEach(b=>b.onclick=()=>{ $$('.seg button',o).forEach(x=>x.classList.remove('active')); b.classList.add('active'); }) });
}

function docPreviewModal(doc){
  openModal(`${modalHead(doc.n, `${doc.type} · ${doc.size} · Updated ${doc.date}`)}
    <div class="modal-body"><div class="preview-box" style="min-height:300px"><b>TechNova</b><span>AI-powered logistics for SMEs · Smarter deliveries. Stronger businesses.</span></div>
      <div class="row gap8 mt16 wrap"><span class="tag">Viewed by 14 investors</span><span class="tag">Avg. time 3m 40s</span><span class="tag">Version 3</span></div></div>
    <div class="modal-foot"><button class="btn btn-secondary" id="dp-share">${I('link')} Create share link</button><button class="btn btn-secondary" id="dp-dl">${I('download')} Download</button><button class="btn btn-primary" id="dp-ai">${I('sparkles')} Analyze with AI</button></div>`,
    { size:'lg', onOpen:o=>{ $('#dp-share',o).onclick=()=>{ closeModal(); shareLinkModal(doc); }; $('#dp-dl',o).onclick=()=>toast('Download started','info'); $('#dp-ai',o).onclick=()=>{ closeModal(); go('documents/analysis'); }; } });
}

function shareLinkModal(doc){
  const link = `https://app.sedana.in/s/${Math.random().toString(36).slice(2,9)}`;
  openModal(`${modalHead('Share Document','Create a secure, trackable link to share with investors.')}
    <div class="modal-body"><div class="row gap8" style="padding:10px 12px;border:1px solid var(--line);border-radius:10px;background:#fafbfe"><span class="file-ico pdf">PDF</span><b class="small">${doc?doc.n:'TechNova_Pitch_Deck.pdf'}</b></div>
      <div class="field mt16"><label>Share link</label><div class="row"><input class="input" value="${link}" readonly id="sl-in"><button class="btn btn-secondary" id="sl-copy">${I('copy')} Copy</button></div></div>
      <div class="mt16 col gap12">${[['Require email to view','Investors must enter their email before viewing',true],['Allow download','Let viewers download the file',false],['Expire after 30 days','Link stops working after 30 days',true],['Notify me on view','Get notified when someone opens the link',true]].map(s=>`<div class="setting-row" style="padding:8px 0"><div><b>${s[0]}</b><span>${s[1]}</span></div><span class="toggle ${s[2]?'on':''}"></span></div>`).join('')}</div></div>
    <div class="modal-foot"><button class="btn btn-secondary" data-close>Close</button><button class="btn btn-primary" id="sl-done">${I('check')} Done</button></div>`,
    { onOpen:o=>{ $$('.toggle',o).forEach(t=>t.onclick=()=>t.classList.toggle('on')); $('#sl-copy',o).onclick=()=>{ navigator.clipboard?.writeText(link); toast('Link copied to clipboard'); }; $('#sl-done',o).onclick=()=>{ closeModal(); toast('Share link created'); }; } });
}

function notificationsDropdown(anchor){
  dropdown(anchor, `<div class="row between" style="padding:10px 10px 6px"><b>Notifications</b><button class="btn-link small" id="nf-read">Mark all read</button></div>
    ${DB.notifications.map(n=>`<div class="notif ${n.unread?'unread':''}"><span class="ico-box ${n.col}">${I(n.ico)}</span><div><b>${n.t}</b><p>${n.d}</p><div class="tm">${n.tm}</div></div></div>`).join('')}
    <div class="sep"></div><button class="item" id="nf-all">${I('history')} View all activity</button>`, {wide:true});
  $('#nf-read').onclick=()=>{ DB.notifications.forEach(n=>n.unread=false); closeDropdowns(); $('.bell .dot')?.remove(); toast('All notifications marked as read','info'); };
  $('#nf-all').onclick=()=>{ closeDropdowns(); activityDrawer(); };
}

function userMenu(anchor){
  const d = dropdown(anchor, `<div style="padding:10px 10px 8px" class="row gap10">${avatar(DB.user.initials,'#15348a')}<div><b class="small">${DB.user.name}</b><div class="xs muted">${DB.user.email}</div></div></div><div class="sep"></div>
    ${menuItems([{ico:'user',label:'My Profile',act:'profile'},{ico:'building-2',label:'Startup settings',act:'settings'},{ico:'wallet',label:'Credit Wallet',act:'wallet',right:DB.credits+' cr'},{ico:'bell',label:'Notification preferences',act:'settings/notifications'},'-',{ico:'life-buoy',label:'Help & support',act:'help'},{ico:'play-circle',label:'Restart walkthrough tour',act:'tour'},'-',{ico:'log-out',label:'Log out',act:'logout',danger:true}])}`);
  $$('.item', d).forEach(b=>b.onclick=()=>{ closeDropdowns(); const a=b.dataset.act; if(a==='logout') confirmModal({title:'Log out?',text:'You will be returned to the login screen of the walkthrough.',ok:'Log out',danger:true,onOk:()=>{ localStorage.removeItem('sedana_logged'); location.href='platform.html'; }}); else if(a==='help') bookCallModal(); else if(a==='tour') startTour(); else go(a); });
}
