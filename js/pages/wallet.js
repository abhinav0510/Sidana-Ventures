/* =====================================================================
   Credit Wallet
   ===================================================================== */
const WAL = { filter: 'all', plan: 'starter' };
PAGES.wallet = {
  render(){
    const tx = DB.transactions.filter(t=>WAL.filter==='all'||(WAL.filter==='purchase'?t.c>0:t.c<0));
    const used = DB.transactions.filter(t=>t.c<0).reduce((a,t)=>a-t.c,0);
    return `
    ${crumbs([['Credit Wallet']])}
    <div class="page-head"><div><h1>Credit Wallet</h1><div class="sub">Manage your credits to use Sedana's AI tools and investor outreach services.</div></div></div>
    <div class="split">
      <div class="col gap16">
        <div class="wallet-hero"><div class="coin">${I('coins')}</div><div class="grow"><div class="small" style="opacity:.85;font-weight:600">Current Balance</div><div class="bal">${DB.credits.toLocaleString('en-IN')} <small>Credits</small></div><div class="xs mt8" style="opacity:.8">Last updated: 12 Oct 2026, just now</div></div><div class="col gap8"><button class="btn btn-white" id="w-buy">${I('shopping-cart')} Buy Credits</button><button class="btn btn-outline-white" id="w-hist">${I('file-text')} View Transaction History</button></div></div>
        <div class="card"><div class="card-title mb4"><span class="ico">${I('layers')}</span><div>Credit Usage<div class="card-sub">Credits are used across different features and services.</div></div></div>
          <div class="four mt12" style="grid-template-columns:repeat(5,1fr);gap:10px">${[['presentation','blue','Pitch Deck Maker','50 credits','per generation','aistudio/deck'],['file','pink','Teaser Maker','20 credits','per generation','aistudio/teaser'],['users','green','Unlock Investor Contact','25 – 30 credits','per contact','matches'],['send','violet','Investor Outreach','5 – 10 credits','per email / message','outreach/new'],['scan-search','amber','Deck Analyzer','Free','unlimited','documents/analysis']].map(u=>`<button class="usage-tile" data-go="${u[5]}"><span class="ico-box ${u[1]}">${I(u[0])}</span><b>${u[2]}</b><div class="c">${u[3]}</div><span>${u[4]}</span></button>`).join('')}</div></div>
        <div class="card pad-0"><div class="row between" style="padding:16px 18px 10px"><div><b style="font-size:15px">Transaction History</b><div class="small muted">View all your credit purchases and usage across Sedana.</div></div><div class="row gap8"><select class="select" id="w-filter" style="width:170px"><option value="all" ${WAL.filter==='all'?'selected':''}>All Transactions</option><option value="purchase" ${WAL.filter==='purchase'?'selected':''}>Purchases</option><option value="usage" ${WAL.filter==='usage'?'selected':''}>Usage</option></select><button class="btn btn-secondary btn-sm" id="w-export">${I('download')} Export</button></div></div>
          <table class="table"><thead><tr><th>Date</th><th>Type</th><th>Description</th><th class="num">Credits</th><th class="num">Balance</th></tr></thead><tbody>${tx.map(t=>`<tr><td><div class="small">${t.d}</div><div class="xs muted">${t.t}</div></td><td><div class="row gap8"><span class="ico-box sm ${t.col}">${I(t.ico)}</span>${t.type}</div></td><td class="muted">${t.desc}</td><td class="num"><span class="badge ${t.c>0?'badge-green':'badge-red'}">${t.c>0?'+':''}${t.c}</span></td><td class="num strong">${t.bal}</td></tr>`).join('')}</tbody></table></div>
      </div>
      <div class="col gap16">
        <div class="card"><div class="card-title mb4">Buy Credits</div><div class="small muted mb12">Choose a plan that fits your needs.</div>
          <div class="col gap10">${DB.plans.map(p=>`<div class="plan ${WAL.plan===p.id?'sel':''}" data-plan="${p.id}">${p.pop?'<span class="pop">Popular</span>':''}<span class="rd"></span><div><span class="xs strong muted">${p.n}</span><b>${p.cr.toLocaleString('en-IN')} Credits</b><span>${p.d}</span></div><div class="pr">₹${p.pr.toLocaleString('en-IN')}</div></div>`).join('')}</div>
          <button class="btn btn-primary btn-block mt12" id="w-buy2">Buy Credits Now ${I('arrow-right')}</button></div>
        <div class="card"><div class="row between mb12"><b>Credit Usage Overview</b><select class="select" style="width:130px;padding:6px 28px 6px 10px;font-size:12px"><option>This Month</option><option>Last Month</option><option>All time</option></select></div>
          <div class="row gap16">${donut([[24,'#16a34a'],[32,'#f59e0b'],[19,'#2f5bea'],[10,'#7c3aed'],[15,'#db2777']],used,'Credits Used')}<div class="legend">${[['Investor Outreach','#16a34a','45 (24%)'],['Unlock Contacts','#f59e0b','60 (32%)'],['Pitch Deck Maker','#2f5bea','35 (19%)'],['Teaser Maker','#7c3aed','18 (10%)'],['Other','#db2777','30 (15%)']].map(l=>`<div><i style="background:${l[1]}"></i>${l[0]}<span class="v">${l[2]}</span></div>`).join('')}</div></div></div>
        <div class="card" style="background:var(--brand-50);border-color:var(--brand-100)"><div class="row gap12"><span class="ico-box">${I('headphones')}</span><div><b class="small">Need More Credits?</b><div class="xs muted mt4">Need a custom plan for your team? Get in touch with our sales team for bulk credits and enterprise plans.</div><button class="btn btn-secondary btn-sm mt10" id="w-sales">Contact Sales ${I('arrow-right')}</button></div></div></div>
        <div class="card"><div class="card-title mb8"><span class="ico amber">${I('bell')}</span>Low balance alert</div><div class="setting-row" style="padding:6px 0"><div><b>Notify me below 100 credits</b><span>Email + in-app notification</span></div><span class="toggle on"></span></div><div class="setting-row" style="padding:6px 0"><div><b>Auto top-up Starter pack</b><span>When balance drops below 50</span></div><span class="toggle"></span></div></div>
      </div>
    </div>`;
  },
  after(){
    ['#w-buy','#w-buy2'].forEach(s=>$(s).onclick=()=>buyCreditsModal(WAL.plan));
    $$('.plan').forEach(p=>p.onclick=()=>{ WAL.plan=p.dataset.plan; $$('.plan').forEach(x=>x.classList.toggle('sel',x===p)); });
    $('#w-filter').onchange=e=>{ WAL.filter=e.target.value; renderPage(); };
    $('#w-hist').onclick=()=>{ $('.table').scrollIntoView({behavior:'smooth',block:'center'}); };
    $('#w-export').onclick=()=>toast('Transaction history exported as CSV','info');
    $('#w-sales').onclick=()=>openModal(`${modalHead('Contact Sales','Bulk credits, enterprise plans and managed fundraising services.')}<div class="modal-body"><div class="form-grid"><div class="field"><label>Name</label><input class="input" value="${DB.user.name}"></div><div class="field"><label>Work email</label><input class="input" value="${DB.user.email}"></div><div class="field"><label>Expected monthly credits</label><select class="select"><option>5,000 – 10,000</option><option>10,000 – 25,000</option><option>25,000+</option></select></div><div class="field"><label>Interested in</label><select class="select"><option>Bulk credits</option><option>Enterprise plan</option><option>Managed outreach by Sedana agents</option></select></div><div class="field span-2"><label>Message</label><textarea class="textarea">We're planning a 300-investor Series A outreach across India and SEA.</textarea></div></div></div><div class="modal-foot"><button class="btn btn-secondary" data-close>Cancel</button><button class="btn btn-primary" id="cs-go">${I('send')} Send request</button></div>`,{onOpen:o=>$('#cs-go',o).onclick=()=>{ closeModal(); toast('Sales team will reach out within 1 business day'); }});
    $$('.toggle').forEach(t=>t.onclick=()=>t.classList.toggle('on'));
  }
};
