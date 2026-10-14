/* =====================================================================
   Dashboard – cleaner hierarchy than the reference: one hero (profile
   completion), one KPI row, then three balanced columns, then a compact
   bottom row. Every button routes to a page or opens a popup.
   ===================================================================== */
PAGES.dashboard = {
  render(){
    const s = DB.startup, f = DB.fin;
    const top = DB.investors.slice(0,5);
    const steps = [['Pitch Deck Uploaded','done'],['Verify Details','done'],['Basic Information','done'],['Financial Details', s.completion >= 80 ? 'done' : 'cur'],['Profile Complete', s.completion >= 100 ? 'done' : 'cur']];
    const upcoming = DB.meetings.filter(m=>m.status!=='Completed');
    const active = DB.campaigns.filter(c=>c.status==='Active');
    return `
    <div class="page-head" style="margin-bottom:16px">
      <div><h1>Welcome back, ${DB.user.first}! 👋</h1><div class="sub">Here's an overview of your fundraising journey with Sedana.</div></div>
      <div class="row gap10">
        <div class="card pad-sm row gap10" style="padding:10px 14px"><span class="ico-box sm">${I('calendar')}</span><div><b class="small">Monday, 12 Oct 2026</b><div class="xs muted">Keep building. Great startups raise together.</div></div></div>
        <button class="btn btn-secondary" id="d-tour">${I('play-circle')} Take a tour</button>
      </div>
    </div>

    ${s.completion<100?`
    <div class="hero-banner" data-tour="hero">
      <div>
        <div class="t"><span class="ico-box">${I('clipboard-check')}</span><div><h3>Complete your startup profile</h3><p>Finish setting up to get better matches and more investor interest.</p></div></div>
        <div class="steps">${steps.map((st,i)=>`${i?`<span class="ln ${st[1]==='done'||steps[i-1][1]==='done'?'done':''}"></span>`:''}<div class="st ${st[1]}"><b>${st[1]==='done'?I('check'):i+1}</b><span>${st[0]}</span></div>`).join('')}</div>
      </div>
      <div class="hero-right">
        <div class="pc">${s.completion}% complete</div><div class="progress"><span style="width:${s.completion}%"></span></div>
        <button class="btn btn-white mt8" data-go="financials">${s.completion >= 80 ? 'Manage Financial Details' : 'Continue to Financial Details'} ${I('arrow-right')}</button>
        <span class="skip" id="d-skip">Dismiss</span>
      </div>
    </div>`:''}

    <div class="stat-grid" data-tour="stats">
      <div class="stat"><span class="ico-box green">${I('user-check')}</span><div class="grow"><div class="lb">Profile Completion</div><div class="vl">${s.completion}% <span class="badge badge-green">+20%</span></div><div class="progress green thin"><span style="width:${s.completion}%"></span></div></div></div>
      <div class="stat"><span class="ico-box amber">${I('coins')}</span><div><div class="lb">Credits Available</div><div class="vl">${DB.credits}</div><button class="btn-link small act" id="d-buy">Buy Credits ${I('arrow-right')}</button></div></div>
      <div class="stat"><span class="ico-box">${I('target')}</span><div><div class="lb">Investor Matches</div><div class="vl">${DB.investors.length} <span class="badge badge-green">+3 new</span></div><button class="btn-link small act" data-go="matches">View Matches ${I('arrow-right')}</button></div></div>
      <div class="stat"><span class="ico-box violet">${I('send')}</span><div><div class="lb">Active Outreach</div><div class="vl">${active.length}</div><button class="btn-link small act" data-go="outreach/new">Start Outreaching ${I('arrow-right')}</button></div></div>
      <div class="stat"><span class="ico-box pink">${I('calendar')}</span><div><div class="lb">Upcoming Meetings</div><div class="vl">${upcoming.length}</div><button class="btn-link small act" data-go="meetings">View Calendar ${I('arrow-right')}</button></div></div>
    </div>

    <div class="dash-grid">
      <!-- Column 1 -->
      <div class="card" data-tour="matches">
        <div class="card-head"><div class="card-title"><span class="ico">${I('target')}</span><div>Your Investor Matches<div class="card-sub">Top investors most likely to be interested in your startup.</div></div></div><button class="btn-link small" data-go="matches">View all ${I('arrow-right')}</button></div>
        ${top.map(i=>`<div class="match-row"><div class="logo-mark sm" style="background:${i.c};color:#fff">${i.ini}</div><div class="grow"><div class="nm">${i.n}</div><div class="tags">${i.tags.slice(0,2).map(t=>`<span class="tag">${t}</span>`).join('')}</div></div><span class="match-pct">${i.match}% Match</span>${i.unlocked?`<button class="btn btn-soft btn-sm" data-go="matches/${i.id}">${I('check')} Unlocked</button>`:`<button class="btn btn-solid btn-sm" data-unlock="${i.id}">${I('unlock')} Unlock (${i.cost})</button>`}</div>`).join('')}
      </div>

      <!-- Column 2 -->
      <div class="card" data-tour="aistudio">
        <div class="card-head"><div class="card-title"><span class="ico violet">${I('sparkles')}</span><div>AI Studio<div class="card-sub">Create professional fundraising materials using AI.</div></div></div><button class="btn-link small" data-go="aistudio">Open ${I('arrow-right')}</button></div>
        <div class="col gap12">
          <div class="tool-card" data-go="aistudio/deck"><span class="ico-box">${I('presentation')}</span><div class="grow"><b>Pitch Deck Maker</b><p>Turn your idea into an investor-ready pitch deck using AI.</p><div class="cost">Cost: 50 credits</div></div>${I('chevron-right')}</div>
          <div class="tool-card" data-go="aistudio/teaser"><span class="ico-box pink">${I('file')}</span><div class="grow"><b>Teaser Maker</b><p>Create a concise teaser to grab investor attention.</p><div class="cost">Cost: 20 credits</div></div>${I('chevron-right')}</div>
          <div class="tool-card" data-go="documents/analysis"><span class="ico-box green">${I('scan-search')}</span><div class="grow"><b>Deck Analyzer</b><p>Get an investor-readiness score and slide-by-slide feedback.</p><div class="cost">Free</div></div>${I('chevron-right')}</div>
        </div>
      </div>

      <!-- Column 3 -->
      <div class="card">
        <div class="card-head"><div class="card-title"><span class="ico amber">${I('history')}</span><div>Recent Activity</div></div><button class="btn-link small" id="d-activity">View all ${I('arrow-right')}</button></div>
        ${DB.activity.slice(0,5).map(a=>`<div class="activity"><span class="ico-box ${a.col}">${I(a.ico)}</span><div><b>${a.t}</b><p>${a.d}</p></div><span class="tm">${a.tm}</span></div>`).join('')}
      </div>

      <!-- Row 2 -->
      <div class="card" data-tour="wallet">
        <div class="card-head"><div class="card-title"><span class="ico amber">${I('wallet')}</span><div>Credit Wallet<div class="card-sub">Credits power AI tools and outreach.</div></div></div><button class="btn-link small" data-go="wallet">View details ${I('arrow-right')}</button></div>
        <div class="row gap16" style="align-items:flex-start">
          <div style="min-width:150px"><div style="font-size:34px;font-weight:800;line-height:1">${DB.credits}</div><div class="muted small">Credits available</div><button class="btn btn-primary btn-sm mt12" id="d-buy2">${I('plus')} Buy Credits</button></div>
          <div class="grow list">${DB.transactions.slice(0,4).map(t=>`<div class="list-item" style="padding:7px 0"><span class="ico-box sm ${t.col}">${I(t.ico)}</span><div class="t grow"><b>${t.type}</b><span>${t.d}</span></div><span class="amt ${t.c>0?'pos':'neg'}">${t.c>0?'+':''}${t.c}</span></div>`).join('')}</div>
        </div>
      </div>

      <div class="card">
        <div class="card-head"><div class="card-title"><span class="ico">${I('bar-chart-3')}</span><div>Financial Details & Funding Goals<div class="card-sub">Add financial information to get more relevant matches.</div></div></div><span class="badge badge-gray">Optional</span></div>
        <div class="kv">
          ${[['Current Revenue',fmtINR(f.revenue)+' / month','rev'],['Target Raise',f.targetUsd+' ('+fmtINR(f.target)+')','target'],['Runway',f.runway+' months','runway'],['Use of Funds','Product, Team, Market Expansion','use']].map(k=>`<div><div class="k">${k[0]}</div><div class="v">${k[1]} <button class="btn btn-xs" data-edit="${k[2]}">${I('pencil')} Edit</button></div></div>`).join('')}
        </div>
        <button class="btn btn-secondary btn-sm btn-block mt16" data-go="financials">${I('bar-chart-3')} Open Financial Details</button>
      </div>

      <div class="card">
        <div class="card-head"><div class="card-title"><span class="ico teal">${I('lightbulb')}</span><div>Investor Engagement Insights<div class="card-sub">Based on recent investor interactions.</div></div></div><span class="btn btn-icon" title="How we compute these">${I('info')}</span></div>
        ${[['pie-chart','Most interest from','B2B SaaS, Logistics, Supply Chain'],['layers','Typical stage fit','Seed to Series A'],['map-pin','Preferred regions','India, Southeast Asia'],['message-square','Common investor feedback','Strong interest in unit economics and GTM strategy']].map(x=>`<div class="insight"><span class="ico-box teal">${I(x[0])}</span><div><div class="k">${x[1]}</div><div class="v">${x[2]}</div></div></div>`).join('')}
      </div>
    </div>

    <div class="four mt16" data-tour="bottom">
      <div class="card">
        <div class="card-head"><div class="card-title"><span class="ico pink">${I('calendar')}</span><div>Upcoming Meetings<div class="card-sub">${upcoming.length} scheduled</div></div></div><button class="btn-link small" data-go="meetings">View all</button></div>
        ${upcoming.slice(0,2).map(m=>`<div class="list-item">${avatar(m.ini,m.c,'sm')}<div class="t grow"><b>${m.with}</b><span>${m.title} · ${m.date}, ${m.time.split(' – ')[0]}</span></div><button class="btn btn-soft btn-xs" data-join="${m.id}">${I('video')} Join</button></div>`).join('')}
      </div>
      <div class="card">
        <div class="card-head"><div class="card-title"><span class="ico violet">${I('send')}</span><div>Active Outreach<div class="card-sub">${active.length} running</div></div></div><button class="btn-link small" data-go="outreach">View all</button></div>
        ${active.length?active.map(c=>`<div class="list-item"><div class="t grow"><b>${c.n}</b><span>${c.sent} / ${c.total} contacted · ${c.replies} replies</span><div class="progress thin mt8" style="width:100%"><span style="width:${Math.round(c.sent/c.total*100)}%"></span></div></div></div>`).join(''):`<div class="empty"><span class="ico-box violet">${I('send')}</span>No active outreach yet.</div>`}
        <button class="btn btn-soft btn-sm btn-block mt12" data-go="outreach/new">${I('rocket')} Start Outreaching</button>
      </div>
      <div class="card">
        <div class="card-head"><div class="card-title"><span class="ico">${I('folder')}</span><div>Documents<div class="card-sub">${DB.documents.length} total documents</div></div></div><button class="btn-link small" data-go="documents">View all</button></div>
        ${DB.documents.slice(0,3).map(d=>`<div class="doc-row"><span class="file-ico ${d.type.toLowerCase()}">${d.type}</span><span class="grow" style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${d.n}</span><span class="xs muted">${d.date}</span></div>`).join('')}
        <button class="btn btn-secondary btn-sm btn-block mt12" id="d-upload">${I('upload')} Upload document</button>
      </div>
      <div class="card">
        <div class="card-head"><div class="card-title"><span class="ico amber">${I('receipt')}</span><div>Recent Credit Usage</div></div><button class="btn-link small" data-go="wallet">View all</button></div>
        ${DB.transactions.filter(t=>t.c<0).slice(0,3).map(t=>`<div class="doc-row"><span class="ico-box sm ${t.col}">${I(t.ico)}</span><span class="grow">${t.type}</span><span class="amt neg">${t.c}</span><span class="xs muted">${t.d}</span></div>`).join('')}
      </div>
    </div>`;
  },
  after(){
    $('#d-tour').onclick=()=>startTour();
    const sk=$('#d-skip'); if(sk) sk.onclick=()=>{ $('.hero-banner').style.display='none'; toast('You can complete your profile anytime from My Profile','info'); };
    ['#d-buy','#d-buy2'].forEach(s=>{ const b=$(s); if(b) b.onclick=()=>buyCreditsModal(); });
    $('#d-activity').onclick=activityDrawer;
    $('#d-upload').onclick=()=>uploadDocModal(()=>renderPage());
    $$('[data-unlock]').forEach(b=>b.onclick=()=>unlockContactModal(DB.investors.find(i=>i.id==b.dataset.unlock)));
    $$('[data-join]').forEach(b=>b.onclick=()=>joinCallModal(DB.meetings.find(m=>m.id==b.dataset.join)));
    $$('[data-edit]').forEach(b=>b.onclick=()=>{
      const k=b.dataset.edit;
      const map={ rev:[{label:'Monthly revenue (₹)',k:'revenue',v:DB.fin.revenue}], target:[{label:'Target raise (₹)',k:'target',v:DB.fin.target},{label:'Stage',k:'stage',type:'select',opts:['Seed','Series A','Series B'],v:'Series A'}], runway:[{label:'Runway (months)',k:'runway',v:DB.fin.runway},{label:'Monthly burn (₹)',k:'burn',v:DB.fin.burn}], use:[{label:'Use of funds',k:'use',type:'textarea',v:'Product, Team, Market Expansion',span:true}] };
      editFieldModal('Edit '+b.parentElement.previousElementSibling.textContent, map[k], vals=>{ if(vals.revenue) DB.fin.revenue=+String(vals.revenue).replace(/\D/g,'')||DB.fin.revenue; if(vals.target) DB.fin.target=+String(vals.target).replace(/\D/g,'')||DB.fin.target; if(vals.runway) DB.fin.runway=+vals.runway||DB.fin.runway; renderPage(); });
    });
  }
};

function joinCallModal(m){
  openModal(`${modalHead('Join Meeting', `${m.title} with ${m.with}`)}
    <div class="modal-body"><div class="row gap12 mb16">${avatar(m.ini,m.c,'lg')}<div><b>${m.with}</b><div class="small muted">${m.who}</div></div><span class="badge badge-${m.status==='Confirmed'?'green':'amber'}" style="margin-left:auto">${m.status}</span></div>
      <div class="info-grid"><div><div class="k">Date</div><div class="v">${m.date}</div></div><div><div class="k">Time</div><div class="v">${m.time}</div></div><div><div class="k">Platform</div><div class="v">${m.type}</div></div><div><div class="k">Meeting link</div><div class="v"><a href="#">meet.google.com/sed-ana-xyz</a></div></div></div>
      <div class="card pad-sm mt16" style="background:#fafbfe"><b class="small">AI prep notes</b><ul class="small muted mt8" style="padding-left:18px"><li>${m.with} recently invested in a logistics SaaS; highlight unit economics.</li><li>Expect questions on GTM and CAC payback.</li><li>Share the Series A teaser after the call.</li></ul></div></div>
    <div class="modal-foot"><button class="btn btn-secondary" id="jc-re">${I('calendar-clock')} Reschedule</button><button class="btn btn-primary" id="jc-go">${I('video')} Join ${m.type}</button></div>`,
    { onOpen:o=>{ $('#jc-go',o).onclick=()=>{ closeModal(); toast('Opening '+m.type+'…','info'); }; $('#jc-re',o).onclick=()=>{ closeModal(); scheduleMeetingModal(); }; } });
}
