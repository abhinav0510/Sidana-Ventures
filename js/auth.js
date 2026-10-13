/* =====================================================================
   Sedana – Auth (login / signup / forgot) + Onboarding (startup type,
   business details or pitch-deck upload with AI extraction)
   ===================================================================== */
const AUTH = {};

const brandPanel = () => `
<div class="auth-brand">
  <div>
    <div class="logo">${I('mountain')} Sedana</div>
    <h1>Raise your next round with AI on your side.</h1>
    <p class="lead">Sedana matches your startup with the right investors, builds your pitch materials and runs personalised outreach — all from one dashboard.</p>
    <div class="feat">
      <div>${I('check-circle-2')}<span>AI-matched investors with thesis-fit scores</span></div>
      <div>${I('check-circle-2')}<span>Pitch decks & teasers generated in minutes</span></div>
      <div>${I('check-circle-2')}<span>Personalised email & LinkedIn outreach, tracked end-to-end</span></div>
    </div>
  </div>
  <div class="float">
    <div class="row gap10"><div class="logo-mark sm" style="background:var(--brand-50);color:var(--brand)">N</div><div><b class="small">TechNova</b><div class="xs muted">Series A · Logistics</div></div><span class="badge badge-green" style="margin-left:auto">92% match</span></div>
    <div class="mt12 small muted">Y Combinator replied: <b style="color:var(--ink)">"Interested in a call next week"</b></div>
    <div class="progress thin mt12"><span style="width:72%"></span></div>
    <div class="row between xs muted mt8"><span>87 investors contacted</span><span>12 meetings</span></div>
  </div>
  <div class="foot"><span>2,400+ startups</span><span>1,100+ verified investors</span><span>₹850 Cr+ raised</span></div>
</div>`;

AUTH.login = () => `
<div class="auth">${brandPanel()}
  <div class="auth-panel"><div class="auth-box">
    <h2>Welcome back</h2><div class="sub">Log in to continue your fundraising journey.</div>
    <button class="btn-google" id="g-login"><svg width="18" height="18" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.5l6.7-6.7C35.6 2.6 30.2 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.8 6C12.3 13.5 17.7 9.5 24 9.5z"/><path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4 7.1-10 7.1-17.5z"/><path fill="#FBBC05" d="M10.4 28.8A14.5 14.5 0 0 1 9.5 24c0-1.7.3-3.3.8-4.8l-7.8-6A24 24 0 0 0 0 24c0 3.9.9 7.5 2.6 10.8l7.8-6z"/><path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.5-5.8c-2.1 1.4-4.9 2.3-8.4 2.3-6.3 0-11.7-4-13.6-9.7l-7.8 6C6.5 42.6 14.6 48 24 48z"/></svg> Continue with Google</button>
    <div class="divider">or continue with email</div>
    <form id="login-form">
      <div class="field"><label>Email address</label><div class="input-icon">${I('mail')}<input class="input" type="email" value="rahul@technova.ai" required></div></div>
      <div class="field"><label>Password</label><div class="input-icon">${I('lock')}<input class="input" type="password" value="••••••••••" required id="pw"></div></div>
      <div class="row between mb16"><label class="check"><input type="checkbox" checked> Remember me</label><a href="#/forgot" class="small strong">Forgot password?</a></div>
      <button class="btn btn-primary btn-block btn-lg" type="submit">Log in ${I('arrow-right')}</button>
    </form>
    <div class="auth-foot">New to Sedana? <a href="#/signup" class="strong">Create an account</a></div>
  </div></div>
</div>
${walkBadge(0)}`;

AUTH.signup = () => `
<div class="auth">${brandPanel()}
  <div class="auth-panel"><div class="auth-box">
    <h2>Create your account</h2><div class="sub">Start raising smarter in under 5 minutes.</div>
    <button class="btn-google" id="g-login"><svg width="18" height="18" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.5l6.7-6.7C35.6 2.6 30.2 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.8 6C12.3 13.5 17.7 9.5 24 9.5z"/><path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4 7.1-10 7.1-17.5z"/><path fill="#FBBC05" d="M10.4 28.8A14.5 14.5 0 0 1 9.5 24c0-1.7.3-3.3.8-4.8l-7.8-6A24 24 0 0 0 0 24c0 3.9.9 7.5 2.6 10.8l7.8-6z"/><path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.5-5.8c-2.1 1.4-4.9 2.3-8.4 2.3-6.3 0-11.7-4-13.6-9.7l-7.8 6C6.5 42.6 14.6 48 24 48z"/></svg> Sign up with Google</button>
    <div class="divider">or sign up with email</div>
    <form id="signup-form">
      <div class="form-grid"><div class="field"><label>First name</label><input class="input" value="Rahul" required></div><div class="field"><label>Last name</label><input class="input" value="Sharma" required></div></div>
      <div class="field mt12"><label>Work email</label><div class="input-icon">${I('mail')}<input class="input" type="email" value="rahul@technova.ai" required></div></div>
      <div class="field"><label>Password</label><div class="input-icon">${I('lock')}<input class="input" type="password" placeholder="Min. 8 characters" required></div><div class="progress thin mt8"><span style="width:0%" id="pw-str"></span></div></div>
      <label class="check mb16"><input type="checkbox" checked required> I agree to the <a href="#">Terms</a> and <a href="#">Privacy Policy</a></label>
      <button class="btn btn-primary btn-block btn-lg" type="submit">Create account ${I('arrow-right')}</button>
    </form>
    <div class="auth-foot">Already have an account? <a href="#/login" class="strong">Log in</a></div>
  </div></div>
</div>
${walkBadge(0)}`;

AUTH.forgot = () => `
<div class="auth">${brandPanel()}
  <div class="auth-panel"><div class="auth-box">
    <a href="#/login" class="row gap6 small strong mb20">${I('arrow-left')} Back to login</a>
    <h2>Reset your password</h2><div class="sub">We'll email you a secure link to set a new password.</div>
    <form id="forgot-form"><div class="field"><label>Email address</label><div class="input-icon">${I('mail')}<input class="input" type="email" value="rahul@technova.ai" required></div></div>
    <button class="btn btn-primary btn-block btn-lg" type="submit">Send reset link ${I('send')}</button></form>
  </div></div>
</div>`;

function walkBadge(step){
  const steps=['Login','Startup type','Business details','Dashboard'];
  return `<div class="walk-badge">${I('route')} <span>Walkthrough · ${steps[step]}</span><div class="dots">${steps.map((s,i)=>`<span class="${i<step?'done':i===step?'cur':''}" title="${s}"></span>`).join('')}</div></div>`;
}

function googleChooser(){
  openModal(`<div class="modal-body" style="padding:28px">
    <div class="row gap10 mb20"><svg width="22" height="22" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.5l6.7-6.7C35.6 2.6 30.2 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.8 6C12.3 13.5 17.7 9.5 24 9.5z"/><path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4 7.1-10 7.1-17.5z"/><path fill="#FBBC05" d="M10.4 28.8A14.5 14.5 0 0 1 9.5 24c0-1.7.3-3.3.8-4.8l-7.8-6A24 24 0 0 0 0 24c0 3.9.9 7.5 2.6 10.8l7.8-6z"/><path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.5-5.8c-2.1 1.4-4.9 2.3-8.4 2.3-6.3 0-11.7-4-13.6-9.7l-7.8 6C6.5 42.6 14.6 48 24 48z"/></svg><b>Sign in with Google</b></div>
    <h3 style="font-size:20px">Choose an account</h3><p class="muted small mt8 mb16">to continue to <b>Sedana</b></p>
    ${[['R','Rahul Sharma','rahul@technova.ai','#15348a'],['R','Rahul Sharma','rahul.sharma@gmail.com','#0d9488']].map(a=>`<button class="row gap12 g-acc" style="width:100%;padding:12px 10px;border-radius:10px;text-align:left">${avatar(a[0],a[3])}<div><b class="small">${a[1]}</b><div class="xs muted">${a[2]}</div></div></button>`).join('')}
    <button class="row gap12" style="width:100%;padding:12px 10px;border-radius:10px;text-align:left"><span class="avatar" style="background:#f1f4f9;color:var(--ink-3)">${I('user')}</span><span class="small">Use another account</span></button>
    <p class="xs muted mt16">To continue, Google will share your name, email address and profile picture with Sedana.</p>
  </div>`, { size:'sm', onOpen:o=> $$('.g-acc',o).forEach(b=>b.onclick=()=>{ closeModal(); afterLogin(); }) });
}

function afterLogin(){
  localStorage.setItem('sedana_logged','1');
  toast(`Welcome back, ${DB.user.first}!`);
  location.hash = localStorage.getItem('sedana_onboarded') ? '#/dashboard' : '#/onboarding/type';
}

AUTH.wire = (route) => {
  const g=$('#g-login'); if(g) g.onclick=googleChooser;
  const lf=$('#login-form'); if(lf) lf.onsubmit=e=>{ e.preventDefault(); const b=$('button[type=submit]',lf); b.innerHTML=`${I('loader-2','spin')} Logging in…`; refreshIcons(); setTimeout(afterLogin,700); };
  const sf=$('#signup-form'); if(sf){ sf.onsubmit=e=>{ e.preventDefault(); localStorage.removeItem('sedana_onboarded'); afterLogin(); }; const pw=$('input[type=password]',sf); pw.oninput=()=>{ const s=Math.min(pw.value.length*12,100); const b=$('#pw-str'); b.style.width=s+'%'; b.style.background=s<40?'var(--red)':s<80?'var(--amber)':'var(--green)'; }; }
  const ff=$('#forgot-form'); if(ff) ff.onsubmit=e=>{ e.preventDefault(); toast('Reset link sent to rahul@technova.ai'); setTimeout(()=>location.hash='#/login',1200); };
};

/* =====================================================================
   ONBOARDING
   ===================================================================== */
const ONB = { type: DB.startup.type || null, mode: 'form', extracted: false };

const onbTop = (step) => `
<div class="onb-top"><div class="logo">${I('mountain')} Sedana</div>
  <div class="onb-steps">
    <div class="s done"><b>${I('check')}</b> Account</div><div class="ln"></div>
    <div class="s ${step===1?'active':'done'}"><b>${step===1?'2':I('check')}</b> Startup type</div><div class="ln"></div>
    <div class="s ${step===2?'active':''}"><b>3</b> Business details</div><div class="ln"></div>
    <div class="s"><b>4</b> Dashboard</div>
  </div>
  <div class="row gap10">${avatar(DB.user.initials,'#15348a','sm')}<span class="small strong">${DB.user.name}</span></div>
</div>`;

AUTH.onbType = () => `
<div class="onb">${onbTop(1)}
  <div class="onb-body"><div class="onb-wrap">
    <h1>What type of startup are you?</h1>
    <p class="lead">This helps us tailor investor matches, outreach templates and the information we ask for.</p>
    <div class="type-grid">
      ${Object.entries(STARTUP_TYPES).map(([k,t])=>`<div class="type-card ${ONB.type===k?'selected':''}" data-type="${k}"><span class="chk">${I('check')}</span><div class="ico-box ${t.col}">${I(t.icon)}</div><h3>${t.label}</h3><div class="rev">${t.rev}</div><p>${t.desc}</p><ul>${t.pts.map(p=>`<li>${I('check-circle-2')}${p}</li>`).join('')}</ul></div>`).join('')}
    </div>
    <div class="onb-actions"><a href="#/login" class="btn btn-ghost">${I('arrow-left')} Back</a><button class="btn btn-primary btn-lg" id="onb-next" ${ONB.type?'':'disabled'}>Continue ${I('arrow-right')}</button></div>
  </div></div>
</div>${walkBadge(1)}`;

AUTH.onbDetails = () => {
  const t = STARTUP_TYPES[ONB.type||'medium'];
  const s = DB.startup, ex = ONB.extracted;
  return `
<div class="onb">${onbTop(2)}
  <div class="onb-body"><div class="onb-wrap">
    <h1>Tell us about your business</h1>
    <p class="lead">Fill in the details manually or upload your pitch deck and let Sedana AI extract them for you.</p>
    <div class="row" style="justify-content:center;margin-bottom:24px"><div class="seg"><button class="${ONB.mode==='form'?'active':''}" data-mode="form">${I('pencil-line')} Fill details manually</button><button class="${ONB.mode==='upload'?'active':''}" data-mode="upload">${I('upload-cloud')} Upload pitch deck</button></div></div>

    ${ONB.mode==='upload' ? `
    <div class="onb-split">
      <div class="drop" id="onb-drop"><div class="ico-box">${I('upload-cloud')}</div><h4>Drop your pitch deck here</h4><p>PDF or PPTX · up to 50 MB · or <a href="#">browse files</a></p><div class="row gap8 mt16 wrap" style="justify-content:center"><span class="tag">Company details</span><span class="tag">Team</span><span class="tag">Traction</span><span class="tag">Financials</span><span class="tag">Ask</span></div></div>
      <div class="extract" id="onb-extract"><div class="row gap10 mb12"><span class="ico-box violet sm">${I('sparkles')}</span><div><b class="small">AI extraction</b><div class="xs muted">Waiting for a file…</div></div></div>
        ${['Reading slides & parsing text','Identifying company name, sector & stage','Extracting team members','Pulling traction & revenue metrics','Detecting funding ask & use of funds','Building your startup profile'].map(x=>`<div class="ln"><span class="st">${I('circle')}</span><span>${x}</span></div>`).join('')}
      </div>
    </div>
    <div id="onb-review" class="hidden mt24"></div>` : `
    <div class="card" style="padding:26px">${detailsForm(t, s, ex)}</div>`}

    <div class="onb-actions"><a href="#/onboarding/type" class="btn btn-ghost">${I('arrow-left')} Back</a><div class="row gap10"><button class="btn btn-secondary" id="onb-skip">Skip for now</button><button class="btn btn-primary btn-lg" id="onb-finish">Enter dashboard ${I('arrow-right')}</button></div></div>
  </div></div>
</div>${walkBadge(2)}`;
};

function detailsForm(t, s, ex){
  const pre = ONB.type==='pre';
  return `<div class="row between mb16"><div><b style="font-size:16px">Business details</b><div class="small muted">Selected type: <span class="badge badge-${t.col==='blue'?'blue':t.col==='violet'?'violet':'green'}">${t.label} · ${t.rev}</span></div></div>${ex?`<span class="badge badge-amber">${I('sparkles')} AI extracted — please verify</span>`:''}</div>
  <div class="form-grid cols-3">
    <div class="field"><label>Company name <span class="req">*</span></label><input class="input" data-f="name" value="${ex?s.name:''}" placeholder="e.g. TechNova"></div>
    <div class="field span-2"><label>Tagline</label><input class="input" data-f="tagline" value="${ex?s.tagline:''}" placeholder="One line that describes what you do"></div>
    <div class="field"><label>Website</label><input class="input" data-f="website" value="${ex?s.website:''}" placeholder="https://"></div>
    <div class="field"><label>Industry / Sector <span class="req">*</span></label><select class="select" data-f="sector">${['Logistics & Supply Chain','AI / ML','Fintech','Healthtech','Edtech','SaaS','Consumer','D2C','Climate','Other'].map(o=>`<option ${ex&&o===s.sector?'selected':''}>${o}</option>`).join('')}</select></div>
    <div class="field"><label>Business model</label><select class="select" data-f="model">${['SaaS','Marketplace','Transactional','Subscription','Hardware','Services'].map(o=>`<option ${ex&&o===s.model?'selected':''}>${o}</option>`).join('')}</select></div>
    <div class="field"><label>Stage you're raising</label><select class="select" data-f="stage">${['Pre-Seed','Seed','Series A','Series B','Series C+'].map(o=>`<option ${(ex&&o===s.stage)||(!ex&&pre&&o==='Pre-Seed')||(!ex&&!pre&&o==='Series A')?'selected':''}>${o}</option>`).join('')}</select></div>
    <div class="field"><label>Team size</label><select class="select" data-f="team">${['1 – 10','11 – 50','51 – 200','200+'].map(o=>`<option ${ex&&o===s.team?'selected':''}>${o}</option>`).join('')}</select></div>
    <div class="field"><label>Headquarters</label><input class="input" data-f="hq" value="${ex?s.hq:''}" placeholder="City, Country"></div>
    <div class="field"><label>Founded year</label><input class="input" data-f="founded" value="${ex?s.founded:''}" placeholder="2023"></div>
    ${pre?`<div class="field"><label>Current status</label><select class="select"><option>Idea stage</option><option>MVP built</option><option>Pilot customers</option></select></div><div class="field"><label>Target raise</label><input class="input" placeholder="₹2 Cr"></div>`:
      `<div class="field"><label>Monthly revenue (₹)</label><input class="input" data-f="rev" value="${ex?'20,00,000':''}" placeholder="20,00,000"></div><div class="field"><label>Target raise (₹)</label><input class="input" value="${ex?'5,00,00,000':''}" placeholder="5,00,00,000"></div>`}
    <div class="field"><label>Expected closure</label><select class="select"><option>Q4 2026</option><option>Q1 2027</option><option>Q2 2027</option></select></div>
    <div class="field span-2" style="grid-column:span 3"><label>What does your company do? <span class="req">*</span></label><textarea class="textarea" data-f="desc" placeholder="Describe your product, customers and why now.">${ex?s.desc:''}</textarea></div>
  </div>`;
}

AUTH.wireOnb = (route) => {
  if(route==='onboarding/type'){
    $$('.type-card').forEach(c=>c.onclick=()=>{ ONB.type=c.dataset.type; $$('.type-card').forEach(x=>x.classList.toggle('selected',x===c)); $('#onb-next').disabled=false; });
    $('#onb-next').onclick=()=>{ DB.startup.type=ONB.type; saveState(); location.hash='#/onboarding/details'; };
  }
  if(route==='onboarding/details'){
    $$('.seg button').forEach(b=>b.onclick=()=>{ ONB.mode=b.dataset.mode; render(); });
    const finish = ()=>{ $$('[data-f]').forEach(el=>{ if(el.value) { const k=el.dataset.f; if(k!=='rev') DB.startup[k]=el.value; } });
      if(DB.startup.name) DB.startup.name = DB.startup.name; localStorage.setItem('sedana_onboarded','1'); saveState(); sessionStorage.setItem('sedana_tour','1'); location.hash='#/dashboard'; };
    $('#onb-finish').onclick=()=>{ if(ONB.mode==='form' && !ONB.extracted && !$('[data-f=name]').value){ toast('Please enter at least your company name','err'); $('[data-f=name]').focus(); return; } finish(); };
    $('#onb-skip').onclick=()=>{ localStorage.setItem('sedana_onboarded','1'); sessionStorage.setItem('sedana_tour','1'); location.hash='#/dashboard'; };
    const drop=$('#onb-drop'); if(drop){
      ['dragenter','dragover'].forEach(ev=>drop.addEventListener(ev,e=>{e.preventDefault();drop.classList.add('over')}));
      ['dragleave','drop'].forEach(ev=>drop.addEventListener(ev,e=>{e.preventDefault();drop.classList.remove('over')}));
      drop.onclick = drop.ondrop = ()=>{
        drop.innerHTML=`<div class="ico-box green">${I('file-check')}</div><h4>TechNova_Pitch_Deck.pdf</h4><p>4.2 MB · 12 slides</p><div class="progress mt16" style="max-width:240px;margin:16px auto 0"><span id="onb-p" style="width:5%"></span></div>`; refreshIcons();
        const lines=$$('#onb-extract .ln'); $('#onb-extract .xs').textContent='Analyzing TechNova_Pitch_Deck.pdf…';
        let i=0; const step=()=>{ if(i>0){ lines[i-1].className='ln done'; lines[i-1].querySelector('.st').innerHTML=I('check'); } if(i<lines.length){ lines[i].className='ln run'; lines[i].querySelector('.st').innerHTML=I('loader-2','spin'); $('#onb-p').style.width=Math.round((i+1)/lines.length*100)+'%'; refreshIcons(); i++; setTimeout(step,650); } else { $('#onb-extract .xs').textContent='Done · 12 details extracted'; ONB.extracted=true;
          const r=$('#onb-review'); r.classList.remove('hidden'); r.innerHTML=`<div class="card" style="padding:26px">${detailsForm(STARTUP_TYPES[ONB.type||'medium'], DB.startup, true)}</div>`; refreshIcons(); r.scrollIntoView({behavior:'smooth'}); toast('Details extracted from your pitch deck'); } };
        step();
      };
    }
  }
};
