/* =====================================================================
   Sedana – app shell, hash router, sidebar/topbar and guided tour
   ===================================================================== */
const NAV = [
  { r:'dashboard', l:'Dashboard', i:'layout-dashboard' },
  { r:'profile', l:'My Profile', i:'user' },
  { r:'documents', l:'Pitch Deck & Documents', i:'file-text' },
  { r:'financials', l:'Financial Details', i:'bar-chart-3' },
  { r:'aistudio', l:'AI Studio', i:'sparkles', sub:[['aistudio/deck','Pitch Deck Maker'],['aistudio/teaser','Teaser Maker'],['aistudio/tools','Other Tools'],['aistudio/creations','My Creations']] },
  { r:'matches', l:'Investor Matches', i:'target', cnt:()=>DB.investors.length },
  { r:'outreach', l:'Start Outreaching', i:'rocket' },
  { r:'meetings', l:'Meetings', i:'calendar', cnt:()=>DB.meetings.filter(m=>m.status!=='Completed').length },
  { r:'wallet', l:'Credit Wallet', i:'wallet' },
  { r:'settings', l:'Settings', i:'settings' }
];
const TITLES = { dashboard:'Dashboard', profile:'My Profile', documents:'Pitch Deck & Documents', financials:'Financial Details', aistudio:'AI Studio', matches:'Investor Matches', outreach:'Start Outreaching', meetings:'Meetings', wallet:'Credit Wallet', settings:'Settings' };
let CUR = { page:'dashboard', sub:'' };

function go(route){ location.hash = '#/'+route; }
function route(){
  const h = (location.hash||'#/login').replace(/^#\//,'');
  const [page, ...rest] = h.split('/'); const sub = rest.join('/');
  const logged = localStorage.getItem('sedana_logged');
  if(['login','signup','forgot'].includes(page)){ render(); return; }
  if(!logged){ location.replace('platform.html'); return; }
  if(page==='onboarding'){ render(); return; }
  if(!localStorage.getItem('sedana_onboarded')){ location.hash='#/onboarding/type'; return; }
  if(!PAGES[page]){ location.hash='#/dashboard'; return; }
  CUR = { page, sub };
  if(!$('#app-shell')) renderShell();
  renderPage();
}
function render(){
  const h=(location.hash||'#/login').replace(/^#\//,''); const root=$('#root'); closeModal(); closeDropdowns(); closeCmdk(); stopTour();
  if(h==='login') root.innerHTML=AUTH.login(); else if(h==='signup') root.innerHTML=AUTH.signup(); else if(h==='forgot') root.innerHTML=AUTH.forgot();
  else if(h==='onboarding/type') root.innerHTML=AUTH.onbType(); else if(h==='onboarding/details') root.innerHTML=AUTH.onbDetails(); else if(h==='onboarding/financials') root.innerHTML=AUTH.onbFinancials();
  refreshIcons(); AUTH.wire(h); AUTH.wireOnb(h); window.scrollTo(0,0);
}
function renderShell(){
  const s=DB.startup, u=DB.user;
  $('#root').innerHTML = `<div class="app" id="app-shell">
    <aside class="sidebar" data-tour="sidebar">
      <div class="brand">${I('mountain')} Sedana</div>
      <div class="startup-card"><div class="logo-mark sm" style="background:#fff;color:var(--brand)">${s.name[0]}</div><div><div class="nm">${s.name} ${s.verified?'<span class="badge badge-green" style="padding:1px 7px;font-size:10px">Verified</span>':''}</div><div class="ds">${s.tagline}</div></div></div>
      <nav class="nav" id="nav"></nav>
      <div class="help-card"><div class="t"><span class="ico-box sm" style="background:rgba(255,255,255,.15);color:#fff">${I('headphones')}</span><div><b>Need Help?</b><span>Talk to our team or book a demo call.</span></div></div><button class="btn" id="nav-book">Book a Call</button></div>
    </aside>
    <div class="main">
      <header class="topbar" data-tour="topbar">
        <div class="search" id="top-search">${I('search')}<input class="input" placeholder="Search investors, features, or help…" readonly><span class="kbd">Ctrl K</span></div>
        <div class="sp"></div>
        <button class="credit-pill" id="top-credits"><span class="coin">${I('coins')}</span><span id="top-credit-n">${DB.credits}</span> Credits</button>
        <button class="btn btn-primary btn-sm" id="top-buy">${I('shopping-cart')} Buy Credits</button>
        <div class="dd-wrap"><button class="btn btn-icon bell" id="top-bell">${I('bell')}${DB.notifications.some(n=>n.unread)?'<span class="dot"></span>':''}</button></div>
        <div class="dd-wrap"><button class="user-btn" id="top-user">${avatar(u.initials,'#15348a')}<div><div class="nm">${u.name}</div><div class="rl">${u.role} · ${s.name}</div></div>${I('chevron-down','chev')}</button></div>
      </header>
      <main class="content" id="content"></main>
    </div></div>
    <button class="tour-fab hidden" id="tour-fab">${I('route')} Walkthrough</button>`;
  refreshIcons(); renderNav();
  $('#top-search').onclick=openCmdk; $('#top-buy').onclick=()=>buyCreditsModal(); $('#top-credits').onclick=()=>go('wallet');
  $('#top-bell').onclick=e=>{ e.stopPropagation(); notificationsDropdown(e.currentTarget); };
  $('#top-user').onclick=e=>{ e.stopPropagation(); userMenu(e.currentTarget); };
  $('#nav-book').onclick=bookCallModal; $('#tour-fab').onclick=startTour;
}
function renderNav(){
  const nav=$('#nav'); if(!nav) return;
  nav.innerHTML = `<div class="nav-sec">Main</div>` + NAV.map(n=>{
    const active = CUR.page===n.r; const cnt = n.cnt?`<span class="cnt">${n.cnt()}</span>`:'';
    if(n.sub) return `<a href="#/${n.r}" class="${active?'active':''} ${active?'open':''}" data-nav="${n.r}">${I(n.i)}<span>${n.l}</span>${I('chevron-right','arr')}</a><div class="sub ${active?'open':''}">${n.sub.map(s=>`<a href="#/${s[0]}" class="${active&&CUR.sub===s[0].split('/')[1]?'active':''}">${s[1]}</a>`).join('')}</div>`;
    return `<a href="#/${n.r}" class="${active?'active':''}" data-nav="${n.r}" ${n.r==='outreach'?'data-tour="nav-outreach"':''}>${I(n.i)}<span>${n.l}</span>${cnt}</a>`;
  }).join('');
  refreshIcons();
}
function renderPage(){
  const p = PAGES[CUR.page]; if(!p) return;
  closeDropdowns();
  document.title = `${TITLES[CUR.page]} – Sedana`;
  $('#content').innerHTML = p.render(CUR.sub);
  refreshIcons(); renderNav();
  p.after && p.after(CUR.sub);
  const sh=$('#app-shell'); if(sh){ const u=DB.user, s=DB.startup; $('#top-user .nm').textContent=u.name; $('#top-user .rl').textContent=`${u.role} · ${s.name}`; $('.startup-card .nm').childNodes[0].textContent=s.name+' '; }
  updateCredits();
  if(CUR.page==='dashboard' && sessionStorage.getItem('sedana_tour')){ sessionStorage.removeItem('sedana_tour'); setTimeout(startTour, 500); }
  $('#tour-fab').classList.toggle('hidden', CUR.page!=='dashboard');
}
function updateCredits(){ const n=$('#top-credit-n'); if(n) n.textContent=DB.credits; }
/* global delegated navigation for any [data-go] */
document.addEventListener('click', e=>{ const t=e.target.closest('[data-go]'); if(t && !t.closest('.modal') && !t.closest('.dd')){ e.preventDefault(); go(t.dataset.go); } });
window.addEventListener('hashchange', ()=>{ const prev=CUR.page; route(); if(prev!==CUR.page) window.scrollTo(0,0); });
window.addEventListener('load', route);

/* =====================================================================
   Guided tour (spotlight + tooltip)
   ===================================================================== */
const TOUR = [
  { t:'sidebar', h:'Your navigation', p:'Everything lives here: profile, documents, financials, AI Studio, investor matches, outreach, meetings and your credit wallet.' },
  { t:'hero', h:'Finish your profile', p:'A complete profile gets 2.3× more investor replies. Follow the steps here — next up is Financial Details.' },
  { t:'stats', h:'Your fundraising at a glance', p:'Profile completion, credits, matches, active outreach and upcoming meetings. Each card links to its page.' },
  { t:'matches', h:'AI investor matches', p:'Investors ranked by thesis fit. Unlock a contact with credits to see verified emails and start a conversation.' },
  { t:'aistudio', h:'AI Studio', p:'Generate a pitch deck (50 credits) or a one-page teaser (20 credits) from your profile, then edit and export.' },
  { t:'wallet', h:'Credits power everything', p:'Buy credits in Starter, Growth or Scale packs. Every AI generation, unlock and outreach message is charged here.' },
  { t:'nav-outreach', h:'Start Outreaching', p:'Launch a personalised email + LinkedIn outreach in 5 steps. Sedana follows up and books meetings for you.' },
  { t:'topbar', h:'Search, credits & notifications', p:'Press Ctrl K to jump anywhere. Replies, new matches and meeting reminders show up under the bell.' }
];
let tourIdx=-1;
function startTour(){ if(CUR.page!=='dashboard'){ sessionStorage.setItem('sedana_tour','1'); go('dashboard'); return; } tourIdx=0; showTourStep(); }
function stopTour(){ tourIdx=-1; $('#tour-mask')?.remove(); $('#tour-tip')?.remove(); }
function showTourStep(){
  $('#tour-mask')?.remove(); $('#tour-tip')?.remove();
  if(tourIdx<0||tourIdx>=TOUR.length){ stopTour(); toast('Tour complete – explore freely!'); return; }
  const st=TOUR[tourIdx]; const el=document.querySelector(`[data-tour="${st.t}"]`); if(!el){ tourIdx++; showTourStep(); return; }
  el.scrollIntoView({behavior:'smooth',block:'center'});
  setTimeout(()=>{
    const r=el.getBoundingClientRect(); const pad=8;
    const mask=document.createElement('div'); mask.className='tour-mask'; mask.id='tour-mask';
    mask.innerHTML=`<div class="tour-spot" style="left:${r.left-pad}px;top:${r.top-pad}px;width:${r.width+pad*2}px;height:${r.height+pad*2}px"></div>`;
    document.body.appendChild(mask);
    const tip=document.createElement('div'); tip.className='tour-tip'; tip.id='tour-tip';
    tip.innerHTML=`<div class="n">Step ${tourIdx+1} of ${TOUR.length}</div><h4>${st.h}</h4><p>${st.p}</p><div class="acts"><button class="btn-link small" id="tour-skip">Skip tour</button><div class="row gap6"><button class="btn btn-secondary btn-sm" id="tour-prev" ${tourIdx===0?'disabled':''}>Back</button><button class="btn btn-primary btn-sm" id="tour-next">${tourIdx===TOUR.length-1?'Finish':'Next'}</button></div></div>`;
    document.body.appendChild(tip);
    let left=r.right+16, top=r.top; if(left+330>window.innerWidth){ left=Math.max(16,r.left); top=r.bottom+14; } if(top+200>window.innerHeight) top=Math.max(16,window.innerHeight-220); if(st.t==='sidebar'){ left=r.right+16; top=120; }
    tip.style.left=left+'px'; tip.style.top=top+'px';
    $('#tour-skip').onclick=stopTour; $('#tour-prev').onclick=()=>{ tourIdx--; showTourStep(); }; $('#tour-next').onclick=()=>{ tourIdx++; showTourStep(); };
  }, 350);
}
window.addEventListener('resize', ()=>{ if(tourIdx>=0) showTourStep(); });
