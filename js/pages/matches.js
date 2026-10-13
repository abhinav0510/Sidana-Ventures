/* =====================================================================
   Investor Matches – filters, list and detail panel
   ===================================================================== */
const MATCH = { sel: 1, onlyUnlocked: false, view: 'list', tab: 'overview', saved: new Set([1]), sort: 'match', stage: 'Series A' };
PAGES.matches = {
  render(sub){
    if(sub && /^\d+$/.test(sub)) MATCH.sel = +sub;
    let list = DB.investors.filter(i=>!MATCH.onlyUnlocked||i.unlocked);
    if(MATCH.sort==='name') list=[...list].sort((a,b)=>a.n.localeCompare(b.n)); if(MATCH.sort==='cheque') list=[...list].reverse();
    const inv = DB.investors.find(i=>i.id===MATCH.sel)||DB.investors[0];
    return `
    ${crumbs([['Investor Matches']])}
    <div class="page-head"><div><h1>Investor Matches</h1><div class="sub">Discover and connect with the right investors for your startup. Our AI matches investors based on your profile, thesis fit and funding goals.</div></div></div>
    <div class="promo" style="padding:20px 26px"><div><h2 style="font-size:19px">Get matched with the most relevant investors</h2><p class="small">We analyze your startup profile, sector, stage, funding needs and investor theses to find the best matches using AI and real data.</p><div class="ck"><span>${I('check-circle-2')}Relevant & verified investors</span><span>${I('check-circle-2')}AI-powered compatibility score</span><span>${I('check-circle-2')}Updated from latest thesis data</span></div></div>
      <div class="row gap16" style="justify-content:flex-end"><div class="card center" style="padding:14px 22px"><b style="font-size:26px">${DB.investors.length}</b><div class="xs muted">Top Matches</div><div class="row mt8" style="justify-content:center;gap:-4px">${DB.investors.slice(0,4).map(i=>avatar(i.ini,i.c,'sm')).join('')}</div></div>
      <div class="col gap8 small">${[['sparkles','Smart matching using AI'],['layers','Sector, stage and thesis alignment'],['shield-check','Verified investor data'],['unlock','Unlock contact details using credits']].map(x=>`<div class="row gap8"><span class="ico-box sm">${I(x[0])}</span>${x[1]}</div>`).join('')}</div></div></div>

    <div class="filters mt16">
      ${[['Stage',['All Stages','Pre-Seed','Seed','Series A','Series B'],MATCH.stage],['Sector',['All Sectors','AI/ML','Logistics','B2B SaaS','Fintech']],['Investor Type',['All Types','Venture Capital','Angel','Family Office','Corporate VC']],['Geography',['All Regions','India','Southeast Asia','US','Global']],['Cheque Size',['Any','< ₹1 Cr','₹1 – 10 Cr','₹10 – 50 Cr','> ₹50 Cr']]].map(f=>`<div class="field"><label>${f[0]}</label><select class="select m-filter">${f[1].map(o=>`<option ${o===f[2]?'selected':''}>${o}</option>`).join('')}</select></div>`).join('')}
      <button class="btn btn-secondary" id="m-more">${I('sliders-horizontal')} More Filters</button>
      <div class="grow"></div>
      <div class="field"><label>Sort by</label><select class="select" id="m-sort"><option value="match" ${MATCH.sort==='match'?'selected':''}>Best Match</option><option value="name" ${MATCH.sort==='name'?'selected':''}>Name A–Z</option><option value="cheque" ${MATCH.sort==='cheque'?'selected':''}>Cheque size</option></select></div>
    </div>

    <div class="split wide mt16">
      <div>
        <div class="row between mb12"><div><b style="font-size:17px">Top Investor Matches</b><div class="small muted">Showing ${list.length} relevant investors for your startup</div></div><div class="row gap12"><label class="row gap8 small"><span class="toggle ${MATCH.onlyUnlocked?'on':''}" id="m-only"></span> Show only unlocked</label><div class="seg"><button class="${MATCH.view==='list'?'active':''}" data-view="list">${I('list')}</button><button class="${MATCH.view==='grid'?'active':''}" data-view="grid">${I('layout-grid')}</button></div></div></div>
        ${MATCH.view==='list'? list.map(i=>`<div class="investor-row ${i.id===MATCH.sel?'sel':''}" data-id="${i.id}">
          <div class="logo-mark" style="background:${i.c};color:#fff">${i.ini}</div>
          <div><div class="nm">${i.n} ${I('badge-check')}</div><div class="mt">${i.t} <span>${I('map-pin')} ${i.geo}</span></div><div class="tags">${i.tags.map(t=>`<span class="tag">${t}</span>`).join('')}</div></div>
          <span class="match-pct">${i.match}% Match</span>
          <div class="fact">${I('banknote')}<div><b>${i.cheque}</b><span>Typical Cheque</span></div></div>
          <div class="fact">${I('briefcase')}<div><b>${i.port}</b><span>Portfolio</span></div></div>
          <div class="row gap8"><button class="btn btn-icon m-save" data-id="${i.id}" style="color:${MATCH.saved.has(i.id)?'var(--brand)':''}">${I(MATCH.saved.has(i.id)?'bookmark-check':'bookmark')}</button>${i.unlocked?`<button class="btn btn-soft btn-sm" data-go="matches/${i.id}">${I('check')} Unlocked</button>`:`<button class="btn btn-solid btn-sm m-unlock" data-id="${i.id}">${I('unlock')} Unlock Contact<br><span class="xs" style="font-weight:500">(${i.cost} credits)</span></button>`}</div>
        </div>`).join('')
        : `<div class="three">${list.map(i=>`<div class="card investor-card ${i.id===MATCH.sel?'sel':''}" data-id="${i.id}" style="cursor:pointer"><div class="row between"><div class="logo-mark" style="background:${i.c};color:#fff">${i.ini}</div><span class="match-pct">${i.match}%</span></div><b class="mt12" style="display:block;font-size:15px">${i.n}</b><div class="xs muted">${i.t} · ${i.geo}</div><div class="row gap4 wrap mt8">${i.tags.slice(0,2).map(t=>`<span class="tag">${t}</span>`).join('')}</div><div class="xs muted mt8">${i.cheque}</div>${i.unlocked?`<button class="btn btn-soft btn-sm btn-block mt12">${I('check')} Unlocked</button>`:`<button class="btn btn-solid btn-sm btn-block mt12 m-unlock" data-id="${i.id}">${I('unlock')} Unlock (${i.cost})</button>`}</div>`).join('')}</div>`}
        ${list.length===0?`<div class="empty"><span class="ico-box">${I('lock')}</span>No unlocked investors yet. Unlock a contact to see them here.</div>`:''}
      </div>

      <div class="card" style="position:sticky;top:80px;align-self:start">
        <div class="row between mb12"><div class="row gap10"><div class="logo-mark" style="background:${inv.c};color:#fff">${inv.ini}</div><div><b style="font-size:15px">${inv.n} ${I('badge-check')}</b><div class="xs muted">${inv.t} · ${inv.geo}</div></div></div><span class="match-pct">${inv.match}% Match</span></div>
        <div class="tabs" style="margin-bottom:12px">${[['overview','Overview'],['thesis','Thesis Fit'],['portfolio','Portfolio'],['team','Team'],['recent','Recent Investments']].map(t=>`<button class="${MATCH.tab===t[0]?'active':''}" data-itab="${t[0]}" style="padding:9px 10px;font-size:12.5px">${t[1]}</button>`).join('')}</div>
        ${MATCH.tab==='overview'?`<b class="small">About</b><p class="small muted mt4">${inv.about}</p>
          <div class="col gap8 mt12 small">${[['banknote','Typical Cheque Size',inv.cheque],['layers','Preferred Stage',inv.stages],['pie-chart','Preferred Sectors',inv.sectors],['map-pin','Preferred Geography',inv.pgeo],['briefcase','Portfolio Companies',inv.portc],['globe','Website',`<a href="#">${inv.web}</a>`]].map(x=>`<div class="row gap8" style="align-items:flex-start">${I(x[0])}<span class="muted" style="width:140px;flex:none">${x[1]}</span><b style="font-weight:600">${x[2]}</b></div>`).join('')}</div>
          <div class="card pad-sm mt12" style="background:var(--brand-50);border-color:var(--brand-100)"><b class="small">${I('sparkles')} Why it's a good match</b><div class="col gap6 mt8 small">${inv.why.map(w=>`<div class="row gap6">${I('check-circle-2')}<span>${w}</span></div>`).join('')}</div></div>`:''}
        ${MATCH.tab==='thesis'?`<div class="score"><div class="big">${inv.match}</div><div><b>Strong fit</b><div class="small muted">Compared against ${inv.n}'s public thesis and last 24 months of deals.</div></div></div><div class="mt12">${[['Sector alignment',95],['Stage fit',90],['Cheque size fit',85],['Geography',80],['Business model',88],['Timing (active now)',92]].map(s=>`<div class="score-bar"><span class="lb">${s[0]}</span><div class="progress thin green"><span style="width:${s[1]}%"></span></div><span class="n">${s[1]}</span></div>`).join('')}</div>`:''}
        ${MATCH.tab==='portfolio'?`<div class="col gap8">${[['Delhivery','Logistics','Series C'],['Shiprocket','Logistics SaaS','Series B'],['Zetwerk','B2B manufacturing','Series A'],['OfBusiness','SME supply chain','Seed'],['Locus','Logistics AI','Series A']].map(p=>`<div class="list-item"><div class="avatar sm" style="background:#e8ecf4;color:var(--ink-2)">${p[0][0]}</div><div class="t grow"><b>${p[0]}</b><span>${p[1]}</span></div><span class="badge badge-gray">${p[2]}</span></div>`).join('')}</div>`:''}
        ${MATCH.tab==='team'?`<div class="col gap8">${[['Prayank Swaroop','Partner · Leads logistics & SaaS'],['Anand Daniel','Partner · Consumer & fintech'],['Shekhar Kirani','Partner · SaaS'],['Riya Mehta','Principal · B2B']].map((p,i)=>`<div class="list-item">${avatar(initials(p[0]),['#15348a','#7c3aed','#0d9488','#db2777'][i],'sm')}<div class="t grow"><b>${p[0]}</b><span>${p[1]}</span></div>${inv.unlocked?`<a class="btn btn-xs btn-soft" href="#">${I('linkedin')}</a>`:`<span class="badge badge-gray">${I('lock')}</span>`}</div>`).join('')}</div>`:''}
        ${MATCH.tab==='recent'?`<div class="col gap8">${[['Sep 2026','FleetIQ','Series A · ₹32 Cr'],['Jul 2026','RouteMate','Seed · ₹6 Cr'],['May 2026','Cargoflow','Series B · ₹85 Cr'],['Feb 2026','SupplyAI','Seed · ₹4 Cr']].map(r=>`<div class="list-item"><span class="badge badge-blue">${r[0]}</span><div class="t grow"><b>${r[1]}</b><span>${r[2]}</span></div></div>`).join('')}</div>`:''}
        ${inv.unlocked?`<div class="card pad-sm mt12" style="background:var(--green-50);border-color:var(--green-100)"><b class="small">${I('unlock')} Contact details</b><div class="col gap6 mt8 small">${[['mail','partners@'+inv.web.replace('https://www.','').replace('https://','')],['linkedin','linkedin.com/company/'+inv.n.toLowerCase().replace(/\s+/g,'')],['clock','Best time: Tue–Thu, 10 AM – 1 PM IST'],['message-square','Preferred intro: warm email with deck']].map(x=>`<div class="row gap8">${I(x[0])}<span>${x[1]}</span></div>`).join('')}</div></div>
          <div class="row gap8 mt12"><button class="btn btn-primary grow" data-go="outreach/new">${I('send')} Start Outreaching</button><button class="btn btn-secondary" id="m-meet">${I('calendar-plus')} Meeting</button></div>`
          :`<div class="row gap8 mt12"><button class="btn btn-primary grow m-unlock" data-id="${inv.id}">${I('lock')} Unlock Contact Details (${inv.cost} credits)</button><button class="btn btn-secondary btn-icon m-save" data-id="${inv.id}" style="width:40px;height:40px;color:${MATCH.saved.has(inv.id)?'var(--brand)':''}">${I(MATCH.saved.has(inv.id)?'bookmark-check':'bookmark')}</button></div>`}
      </div>
    </div>`;
  },
  after(){
    $$('.investor-row,.investor-card').forEach(r=>r.onclick=e=>{ if(e.target.closest('button')) return; MATCH.sel=+r.dataset.id; renderPage(); });
    $$('.m-unlock').forEach(b=>b.onclick=e=>{ e.stopPropagation(); unlockContactModal(DB.investors.find(i=>i.id==b.dataset.id)); });
    $$('.m-save').forEach(b=>b.onclick=e=>{ e.stopPropagation(); const id=+b.dataset.id; if(MATCH.saved.has(id)){ MATCH.saved.delete(id); toast('Removed from saved','info'); } else { MATCH.saved.add(id); toast('Investor saved to your list'); } renderPage(); });
    $$('[data-itab]').forEach(b=>b.onclick=()=>{ MATCH.tab=b.dataset.itab; renderPage(); });
    $$('[data-view]').forEach(b=>b.onclick=()=>{ MATCH.view=b.dataset.view; renderPage(); });
    $('#m-only').onclick=()=>{ MATCH.onlyUnlocked=!MATCH.onlyUnlocked; renderPage(); };
    $('#m-sort').onchange=e=>{ MATCH.sort=e.target.value; renderPage(); };
    $$('.m-filter').forEach(s=>s.onchange=()=>{ MATCH.stage=$$('.m-filter')[0].value; toast('Filters applied · '+DB.investors.length+' investors match','info'); });
    const mm=$('#m-meet'); if(mm) mm.onclick=()=>scheduleMeetingModal(DB.investors.find(i=>i.id===MATCH.sel));
    $('#m-more').onclick=()=>openModal(`${modalHead('More Filters','Narrow down investors by thesis signals.')}<div class="modal-body"><div class="form-grid"><div class="field"><label>Last investment</label><select class="select"><option>Any time</option><option>Last 3 months</option><option>Last 6 months</option><option>Last 12 months</option></select></div><div class="field"><label>Lead / Follow</label><select class="select"><option>Both</option><option>Leads rounds</option><option>Follows only</option></select></div><div class="field"><label>Fund size</label><select class="select"><option>Any</option><option>< ₹500 Cr</option><option>₹500 – 2000 Cr</option><option>> ₹2000 Cr</option></select></div><div class="field"><label>Portfolio overlap</label><select class="select"><option>Any</option><option>No competing portfolio</option></select></div></div>
      <div class="mt16">${[['Only actively investing','Deployed capital in the last 6 months',true],['Has invested in logistics before','Thesis signal from portfolio',true],['Verified contacts only','Hide investors without verified emails',false],['Exclude already contacted','Skip investors in your outreach history',true]].map(x=>`<div class="setting-row" style="padding:8px 0"><div><b>${x[0]}</b><span>${x[1]}</span></div><span class="toggle ${x[2]?'on':''}"></span></div>`).join('')}</div></div>
      <div class="modal-foot"><button class="btn btn-ghost" data-close>Reset</button><button class="btn btn-primary" id="mf-apply">Apply filters</button></div>`,{onOpen:o=>{ $$('.toggle',o).forEach(t=>t.onclick=()=>t.classList.toggle('on')); $('#mf-apply',o).onclick=()=>{ closeModal(); toast('Filters applied'); }; }});
  }
};
