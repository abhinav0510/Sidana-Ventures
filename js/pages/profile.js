/* =====================================================================
   My Profile – Overview + tabbed sections
   ===================================================================== */
PAGES.profile = {
  tabs: [['overview','Overview','eye'],['company','Company Details','building-2'],['team','Team','users'],['financials','Financial Details','bar-chart-3'],['funding','Funding & Goals','flag'],['documents','Pitch Deck & Documents','file-text'],['social','Social Links','link'],['preferences','Preferences','settings-2']],
  render(sub){
    const s=DB.startup, f=DB.fin, tab=sub||'overview';
    const checklist=[['Basic Information',true],['Company Details',true],['Team Details',true],['Financial Details',false,'financials'],['Funding & Goals',false,'funding'],['Pitch Deck & Documents',false,'documents'],['Social Links',false,'social'],['Preferences',false,'preferences']];
    return `
    ${crumbs([['My Profile']])}
    <div class="page-head"><div><h1>My Profile</h1><div class="sub">Manage your startup information, team, documents and fundraising details.</div></div><button class="btn btn-primary" id="p-preview">Preview Public Profile ${I('external-link')}</button></div>
    <div class="tabs">${this.tabs.map(t=>`<button class="${tab===t[0]?'active':''}" data-tab="${t[0]}">${I(t[2])}${t[1]}</button>`).join('')}</div>
    ${tab==='overview'?`
    <div class="profile-grid">
      <div>
        <div class="profile-hero">
          <div class="logo-mark lg" style="background:#fff;color:var(--brand);font-size:28px">${s.name[0]}</div>
          <div class="grow"><h2>${s.name} <button class="btn btn-icon" style="color:#fff" id="p-editname">${I('pencil')}</button> ${s.verified?`<span class="badge badge-green">Verified</span>`:''}</h2>
            <div class="tags">${s.tags.map(t=>`<span class="tag">${t}</span>`).join('')}</div>
            <p>${s.desc}</p>
            <div class="meta"><span>${I('globe')} ${s.website}</span><span>${I('map-pin')} ${s.hq}</span><span>${I('calendar')} Founded ${s.founded}</span></div></div>
          <button class="btn btn-white" id="p-video">${I('play')} Watch Intro (1 min)</button>
        </div>
        <div class="two mt16">
          <div class="card"><div class="card-head"><div class="card-title"><span class="ico">${I('building-2')}</span><div>Company Details<div class="card-sub">Core information about your startup.</div></div></div><button class="btn btn-secondary btn-sm" data-tab="company">${I('pencil')} Edit</button></div>
            <div class="info-grid">${[['Company Name',s.name],['Tagline',s.tagline],['Industry / Sector',s.sector],['Business Model',s.model],['Stage',s.stage],['Team Size',s.team],['Headquarters',s.hq],['Website',s.website]].map(x=>`<div><div class="k">${x[0]}</div><div class="v">${x[1]}</div></div>`).join('')}</div></div>
          <div class="card"><div class="card-head"><div class="card-title"><span class="ico violet">${I('users')}</span><div>Team (${DB.team.length} members)<div class="card-sub">Manage founders and team members.</div></div></div><button class="btn btn-secondary btn-sm" data-tab="team">Manage</button></div>
            ${DB.team.map(m=>`<div class="member">${avatar(initials(m.n),m.c)}<div class="grow"><b>${m.n} <span class="badge badge-blue">${m.r}</span></b><span>${m.e}</span></div><button class="btn btn-icon member-menu">${I('more-vertical')}</button></div>`).join('')}
            <button class="btn btn-secondary btn-sm btn-block mt12" id="p-invite">${I('plus')} Invite Team Member</button></div>
        </div>
        <div class="card mt16"><div class="card-head"><div class="card-title"><span class="ico">${I('bar-chart-3')}</span><div>Financial Details<div class="card-sub">Add or update your financial information.</div></div></div><div class="row gap8"><span class="badge badge-gray">Optional</span><button class="btn btn-soft btn-sm" data-go="financials">Fill Details</button></div></div>
          <div class="four">${[['$20K','Monthly Revenue','green','trending-up'],[f.runway+' months','Runway','amber','clock'],[f.targetUsd,'Target Raise','violet','target'],[f.margin,'Gross Margin','blue','percent']].map(x=>`<div class="mini-stat"><span class="ico-box ${x[2]} sm">${I(x[3])}</span><div><b>${x[0]}</b><span>${x[1]}</span></div></div>`).join('')}</div></div>
        <div class="card mt16"><div class="card-head"><div class="card-title"><span class="ico green">${I('flag')}</span><div>Funding Goals<div class="card-sub">Help investors understand your fundraising plans.</div></div></div><div class="row gap8"><span class="badge badge-gray">Optional</span><button class="btn btn-secondary btn-sm" data-tab="funding">${I('pencil')} Edit</button></div></div>
          <div class="four">${[['Target Raise',f.targetUsd+' ('+fmtINR(f.target)+')'],['Use of Funds','Product, Team, Market Expansion'],['Target Investors',f.investors],['Expected Closure',f.closure]].map(x=>`<div><div class="k xs muted">${x[0]}</div><div class="strong small mt4">${x[1]}</div></div>`).join('')}</div></div>
      </div>
      <div class="col gap16">
        <div class="card"><div class="card-title mb12"><span class="ico green">${I('pie-chart')}</span>Profile Completion</div>
          <div class="row gap16"><div class="ring">${ring(s.completion,'var(--amber)')}<div class="c">${s.completion}%</div></div><div><b>Almost there!</b><div class="small muted">Complete remaining sections to get better investor matches.</div></div></div>
          <div class="checklist mt12">${checklist.map(c=>`<div><span class="ck ${c[1]?'done':''}">${c[1]?I('check'):''}</span>${c[0]}<span class="badge ${c[1]?'badge-green':'badge-amber'}" style="margin-left:auto">${c[1]?'Completed':'Pending'}</span>${c[1]?'':`<button class="btn-link go" data-tab="${c[2]}">Go ${I('arrow-right')}</button>`}</div>`).join('')}</div></div>
        <div class="card"><div class="card-head"><div class="card-title"><span class="ico">${I('list')}</span>Quick Summary</div><button class="btn btn-secondary btn-sm" data-tab="company">Edit</button></div>
          <div class="col gap10">${[['layers','Stage',s.stage+' · '+s.sector],['box','Business Model',s.model],['target','Target Raise',f.targetUsd+' ('+fmtINR(f.target)+')'],['users','Team Size',s.team+' · '+s.hq]].map(x=>`<div class="row gap10 small"><span class="ico-box sm">${I(x[0])}</span><span class="muted" style="width:110px">${x[1]}</span><b>${x[2]}</b></div>`).join('')}</div></div>
        <div class="card"><div class="card-head"><div class="card-title"><span class="ico">${I('link')}</span>Social Links</div><button class="btn btn-secondary btn-sm" data-tab="social">Edit</button></div>
          <div class="two social" style="gap:4px 12px">${[['globe','Website',s.socials.website],['linkedin','LinkedIn',s.socials.linkedin],['twitter','X (Twitter)',s.socials.x],['youtube','YouTube',s.socials.youtube]].map(x=>`<div><span class="ico-box sm">${I(x[0])}</span><div style="min-width:0"><b>${x[1]}</b><span style="display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${x[2]}</span></div></div>`).join('')}</div></div>
      </div>
    </div>`:''}

    ${tab==='company'?`<div class="card" style="max-width:900px"><div class="card-head"><div class="card-title"><span class="ico">${I('building-2')}</span><div>Company Details<div class="card-sub">Core information shown to investors.</div></div></div></div>
      <div class="form-grid">${[['Company name','name'],['Tagline','tagline'],['Website','website'],['Headquarters','hq'],['Founded year','founded']].map(x=>`<div class="field"><label>${x[0]}</label><input class="input" data-f="${x[1]}" value="${esc(s[x[1]])}"></div>`).join('')}
        <div class="field"><label>Industry / Sector</label><select class="select" data-f="sector">${['Logistics & Supply Chain','AI / ML','Fintech','Healthtech','SaaS','Consumer'].map(o=>`<option ${o===s.sector?'selected':''}>${o}</option>`).join('')}</select></div>
        <div class="field"><label>Business model</label><select class="select" data-f="model">${['SaaS','Marketplace','Transactional','Subscription'].map(o=>`<option ${o===s.model?'selected':''}>${o}</option>`).join('')}</select></div>
        <div class="field"><label>Stage</label><select class="select" data-f="stage">${['Pre-Seed','Seed','Series A','Series B'].map(o=>`<option ${o===s.stage?'selected':''}>${o}</option>`).join('')}</select></div>
        <div class="field"><label>Team size</label><select class="select" data-f="team">${['1 – 10','11 – 50','51 – 200','200+'].map(o=>`<option ${o===s.team?'selected':''}>${o}</option>`).join('')}</select></div>
        <div class="field"><label>Startup type</label><select class="select"><option ${s.type==='pre'?'selected':''}>Pre-revenue</option><option ${s.type==='medium'?'selected':''}>Medium size (₹50L – ₹5Cr)</option><option ${s.type==='established'?'selected':''}>Established (> ₹5Cr)</option></select></div>
        <div class="field span-2"><label>Description</label><textarea class="textarea" data-f="desc">${esc(s.desc)}</textarea></div></div>
      <div class="row mt20" style="justify-content:flex-end"><button class="btn btn-secondary" data-tab="overview">Cancel</button><button class="btn btn-primary" id="p-save">${I('save')} Save changes</button></div></div>`:''}

    ${tab==='team'?`<div class="card" style="max-width:900px"><div class="card-head"><div class="card-title"><span class="ico violet">${I('users')}</span><div>Team Members<div class="card-sub">Investors love strong teams. Add founders and key hires.</div></div></div><button class="btn btn-primary btn-sm" id="p-invite">${I('plus')} Invite Team Member</button></div>
      <table class="table"><thead><tr><th>Member</th><th>Role</th><th>Email</th><th>Access</th><th>Status</th><th></th></tr></thead><tbody>${DB.team.map(m=>`<tr><td><div class="row gap10">${avatar(initials(m.n),m.c,'sm')}<b>${m.n}</b></div></td><td><span class="badge badge-blue">${m.r}</span></td><td class="muted">${m.e}</td><td>${m.r==='Founder'?'Owner':'Editor'}</td><td><span class="badge ${m.pending?'badge-amber':'badge-green'}">${m.pending?'Invite pending':'Active'}</span></td><td><button class="btn btn-icon member-menu">${I('more-vertical')}</button></td></tr>`).join('')}</tbody></table></div>`:''}

    ${tab==='financials'?`<div class="card"><div class="row between"><div class="card-title"><span class="ico">${I('bar-chart-3')}</span><div>Financial Details<div class="card-sub">Managed on the dedicated Financial Details page.</div></div></div><button class="btn btn-primary" data-go="financials">Open Financial Details ${I('arrow-right')}</button></div></div>`:''}

    ${tab==='funding'?`<div class="card" style="max-width:900px"><div class="card-head"><div class="card-title"><span class="ico green">${I('flag')}</span><div>Funding & Goals<div class="card-sub">What you're raising and how you'll use it.</div></div></div></div>
      <div class="form-grid"><div class="field"><label>Target raise (₹)</label><input class="input" value="5,00,00,000"></div><div class="field"><label>Round</label><select class="select"><option>Seed</option><option selected>Series A</option><option>Series B</option></select></div>
        <div class="field"><label>Minimum cheque size (₹)</label><input class="input" value="50,00,000"></div><div class="field"><label>Expected closure</label><select class="select"><option>Q4 2026</option><option selected>Q3 2026</option><option>Q1 2027</option></select></div>
        <div class="field span-2"><label>Target investors</label><div class="row gap8 wrap">${['VCs','Growth Funds','Strategic Investors','Angels','Family Offices','Accelerators'].map((x,i)=>`<label class="pill"><input type="checkbox" ${i<3?'checked':''}> ${x}</label>`).join('')}</div></div>
        <div class="field span-2"><label>Use of funds</label><div class="col gap8">${f.useOfFunds.map(u=>`<div class="row gap10"><span style="width:160px" class="small">${u[0]}</span><div class="progress grow"><span style="width:${u[1]}%;background:${u[2]}"></span></div><input class="input" style="width:70px;padding:6px 8px" value="${u[1]}%"></div>`).join('')}</div></div>
        <div class="field span-2"><label>Previous funding</label><textarea class="textarea" placeholder="e.g. Seed round of ₹4 Cr from Blume Ventures in 2024">Seed – ₹4 Cr (2024) led by angel syndicate</textarea></div></div>
      <div class="row mt20" style="justify-content:flex-end"><button class="btn btn-secondary" data-tab="overview">Cancel</button><button class="btn btn-primary" id="p-save">${I('save')} Save changes</button></div></div>`:''}

    ${tab==='documents'?`<div class="card"><div class="row between"><div class="card-title"><span class="ico">${I('file-text')}</span><div>Pitch Deck & Documents<div class="card-sub">${DB.documents.length} documents · primary deck: ${DB.documents.find(d=>d.primary)?.n||'none'}</div></div></div><button class="btn btn-primary" data-go="documents">Manage Documents ${I('arrow-right')}</button></div></div>`:''}

    ${tab==='social'?`<div class="card" style="max-width:720px"><div class="card-head"><div class="card-title"><span class="ico">${I('link')}</span><div>Social Links<div class="card-sub">Links are shown on your public profile and in outreach emails.</div></div></div></div>
      <div class="col gap12">${[['globe','Website','website'],['linkedin','LinkedIn','linkedin'],['twitter','X (Twitter)','x'],['youtube','YouTube','youtube']].map(x=>`<div class="field"><label>${x[1]}</label><div class="input-icon">${I(x[0])}<input class="input" value="${s.socials[x[2]]}"></div></div>`).join('')}<div class="field"><label>Crunchbase (optional)</label><div class="input-icon">${I('database')}<input class="input" placeholder="https://crunchbase.com/organization/…"></div></div></div>
      <div class="row mt20" style="justify-content:flex-end"><button class="btn btn-secondary" data-tab="overview">Cancel</button><button class="btn btn-primary" id="p-save">${I('save')} Save changes</button></div></div>`:''}

    ${tab==='preferences'?`<div class="card" style="max-width:760px"><div class="card-head"><div class="card-title"><span class="ico">${I('settings-2')}</span><div>Matching Preferences<div class="card-sub">Tune how Sedana finds and ranks investors for you.</div></div></div></div>
      <div class="form-grid"><div class="field"><label>Preferred investor types</label><div class="row gap8 wrap">${['Venture Capital','Angel','Family Office','Corporate VC','Accelerator'].map((x,i)=>`<label class="pill"><input type="checkbox" ${i<2?'checked':''}> ${x}</label>`).join('')}</div></div>
        <div class="field"><label>Preferred geographies</label><div class="row gap8 wrap">${['India','Southeast Asia','US','Europe','Middle East'].map((x,i)=>`<label class="pill"><input type="checkbox" ${i<2?'checked':''}> ${x}</label>`).join('')}</div></div></div>
      <div class="mt16">${[['Show me only actively investing funds','Hide investors with no deals in the last 12 months',true],['Include strategic / corporate investors','Corporates in logistics, mobility and commerce',true],['Allow investors to discover my profile','Verified investors can find TechNova in Sedana search',true],['Weekly match digest email','Every Monday morning',false]].map(x=>`<div class="setting-row"><div><b>${x[0]}</b><span>${x[1]}</span></div><span class="toggle ${x[2]?'on':''}"></span></div>`).join('')}</div>
      <div class="row mt20" style="justify-content:flex-end"><button class="btn btn-primary" id="p-save">${I('save')} Save preferences</button></div></div>`:''}`;
  },
  after(sub){
    $$('[data-tab]').forEach(b=>b.onclick=()=>go('profile/'+b.dataset.tab));
    $('#p-preview').onclick=publicProfileModal;
    const inv=$('#p-invite'); if(inv) inv.onclick=inviteMemberModal;
    const vid=$('#p-video'); if(vid) vid.onclick=()=>openModal(`${modalHead('TechNova – Intro video')}<div class="modal-body"><div class="preview-box" style="min-height:360px;align-items:center;justify-content:center"><span class="ico-box" style="width:72px;height:72px;border-radius:50%;background:rgba(255,255,255,.2);color:#fff">${I('play')}</span></div></div>`,{size:'lg'});
    const en=$('#p-editname'); if(en) en.onclick=()=>editFieldModal('Edit company name',[{label:'Company name',k:'name',v:DB.startup.name},{label:'Tagline',k:'tagline',v:DB.startup.tagline}],v=>{ DB.startup.name=v.name; DB.startup.tagline=v.tagline; saveState(); renderShell(); });
    const sv=$('#p-save'); if(sv) sv.onclick=()=>{ $$('[data-f]').forEach(el=>DB.startup[el.dataset.f]=el.value); saveState(); toast('Profile updated'); renderShell(); go('profile'); };
    $$('.member-menu').forEach(b=>b.onclick=e=>{ e.stopPropagation(); const d=dropdown(b, menuItems([{ico:'pencil',label:'Edit role'},{ico:'mail',label:'Resend invite'},{ico:'shield',label:'Change access'},'-',{ico:'user-minus',label:'Remove from team',danger:true}])); $$('.item',d).forEach(it=>it.onclick=()=>{ closeDropdowns(); toast(it.textContent.trim()+' – done','info'); }); });
    $$('.toggle').forEach(t=>t.onclick=()=>t.classList.toggle('on'));
  }
};

function ring(pct,color){ const r=36,c=2*Math.PI*r; return `<svg width="84" height="84" viewBox="0 0 84 84"><circle cx="42" cy="42" r="${r}" fill="none" stroke="#e8ecf4" stroke-width="8"/><circle cx="42" cy="42" r="${r}" fill="none" stroke="${color}" stroke-width="8" stroke-linecap="round" stroke-dasharray="${c}" stroke-dashoffset="${c*(1-pct/100)}" transform="rotate(-90 42 42)"/></svg>`; }
function crumbs(items){ return `<div class="crumbs"><a href="#/dashboard">${I('home')}</a>${items.map(i=>`${I('chevron-right')}${i[1]?`<a href="#/${i[1]}">${i[0]}</a>`:`<b>${i[0]}</b>`}`).join('')}</div>`; }

function publicProfileModal(){
  const s=DB.startup;
  openModal(`${modalHead('Public Profile Preview','This is what verified investors see when they discover TechNova on Sedana.')}
    <div class="modal-body"><div class="profile-hero"><div class="logo-mark lg" style="background:#fff;color:var(--brand);font-size:28px">${s.name[0]}</div><div><h2>${s.name} <span class="badge badge-green">Verified</span></h2><div class="tags">${s.tags.map(t=>`<span class="tag">${t}</span>`).join('')}</div><p>${s.desc}</p></div></div>
      <div class="four mt16">${[['Stage',s.stage],['Monthly revenue','₹20L'],['Raising',DB.fin.targetUsd],['Team',s.team]].map(x=>`<div class="mini-stat"><div><span>${x[0]}</span><b>${x[1]}</b></div></div>`).join('')}</div>
      <div class="row gap8 mt16"><span class="badge badge-gray">${I('eye')} Viewed by 38 investors this month</span><span class="badge badge-gray">${I('bookmark')} Saved by 6</span></div></div>
    <div class="modal-foot"><button class="btn btn-secondary" id="pp-copy">${I('copy')} Copy profile link</button><button class="btn btn-primary" data-close>Done</button></div>`, { size:'lg', onOpen:o=> $('#pp-copy',o).onclick=()=>toast('Profile link copied') });
}
