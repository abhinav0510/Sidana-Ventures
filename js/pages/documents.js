/* =====================================================================
   Pitch Deck & Documents
   ===================================================================== */
let DOC_SEL = 0;
PAGES.documents = {
  render(sub){
    const tab = sub||'mine';
    const d = DB.documents[DOC_SEL]||DB.documents[0];
    return `
    ${crumbs([['Pitch Deck & Documents']])}
    <div class="page-head"><div><h1>Pitch Deck & Documents</h1><div class="sub">Manage your pitch deck, teasers and important documents. Use AI to create and improve investor-ready materials.</div></div></div>

    <div class="promo">
      <div><h2>Turn your idea into an <span class="grad">investor-ready pitch deck</span> using AI</h2><p>Create, improve or tailor your pitch deck and teaser for different investors with our AI. Professional, modern and data-driven.</p>
        <div class="acts"><button class="btn btn-primary" data-go="aistudio/deck">${I('presentation')} Create Pitch Deck <span class="badge" style="background:rgba(255,255,255,.2);color:#fff">50 credits</span></button><button class="btn btn-secondary" data-go="aistudio/teaser">${I('file')} Create Teaser <span class="badge badge-blue">20 credits</span></button></div></div>
      <div class="feats">${[['sparkles','AI-generated content & design','Professional and investor-focused slides'],['pencil','Edit and customize','Modify, regenerate or tailor for specific investors'],['file-output','Multiple formats','Export to PPTX and PDF'],['history','Save versions','Track and manage different versions']].map(x=>`<div><span class="ico-box sm">${I(x[0])}</span><div><b>${x[1]}</b><span>${x[2]}</span></div></div>`).join('')}</div>
    </div>

    ${tab==='analysis'?this.analysis():`
    <div class="row between mt20 mb12"><div class="tabs" style="margin:0;border:0">${[['mine','My Documents','file-text'],['ai','AI Generated','sparkles'],['templates','Templates','layout-template'],['shared','Shared Links','link']].map(t=>`<button class="${tab===t[0]?'active':''}" data-tab="${t[0]}">${I(t[2])}${t[1]}</button>`).join('')}</div><button class="btn btn-primary" id="doc-upload">${I('plus')} Upload Document</button></div>

    <div class="split">
      <div>
        ${tab==='mine'?`<div class="card pad-0"><table class="table"><thead><tr><th>Name</th><th>Type</th><th>Size</th><th>Updated</th><th>Actions</th></tr></thead><tbody>
          ${DB.documents.map((x,i)=>`<tr class="${i===DOC_SEL?'sel':''}" style="${i===DOC_SEL?'background:#f3f6ff':''}"><td><div class="row gap10"><span class="file-ico ${x.type.toLowerCase()}">${x.type}</span><b>${x.n}</b>${x.primary?`<span class="badge badge-blue">${I('star')} Primary</span>`:''}</div></td><td class="muted">${x.type}</td><td class="muted">${x.size}</td><td><div class="small">${x.date}</div><div class="xs muted">${x.time}</div></td><td><div class="row gap6"><button class="btn btn-soft btn-xs" data-view="${i}">View</button><button class="btn btn-icon doc-menu" data-i="${i}" style="width:28px;height:28px">${I('more-vertical')}</button></div></td></tr>`).join('')}
        </tbody></table></div>
        <div class="three mt16">${[['layout-template','Document Templates','Use proven templates designed for investors.','Browse Templates','templates'],['sparkles','AI Analysis','Get insights and feedback on your deck.','Analyze Document','analysis'],['history','Version History','Track changes and manage versions.','View History','history']].map(x=>`<div class="card"><div class="row gap10"><span class="ico-box ${x[4]==='analysis'?'violet':x[4]==='history'?'amber':''}">${I(x[0])}</span><div><b class="small">${x[1]}</b><div class="xs muted">${x[2]}</div></div></div><button class="btn btn-soft btn-sm mt12" data-tab="${x[4]}">${x[3]} ${I('arrow-right')}</button></div>`).join('')}</div>`:''}
        ${tab==='ai'?`<div class="four">${DB.creations.map(c=>`<div class="creation" data-go="aistudio/creations"><div class="th ${c.th}">${DB.startup.name}</div><div class="bd"><div><b>${c.n}</b><span>${c.t} · ${c.tm}</span></div>${I('more-vertical')}</div></div>`).join('')}</div>`:''}
        ${tab==='templates'?`<div class="four">${DB.templates.map((t,i)=>`<div class="tpl ${i===0?'sel':''}" data-tpl="${t}"><div class="th" style="background:${['linear-gradient(135deg,#1d44a6,#5b4be8)','#f1f4f9','linear-gradient(135deg,#0b1437,#1e3a8a)','linear-gradient(135deg,#e0e7ff,#fff)','linear-gradient(135deg,#fff,#dbeafe)','linear-gradient(135deg,#fde68a,#f59e0b)','linear-gradient(135deg,#d1fae5,#fff)','linear-gradient(135deg,#be185d,#7c3aed)'][i]}"></div><b>${t}</b></div>`).join('')}</div>`:''}
        ${tab==='shared'?`<div class="card pad-0"><table class="table"><thead><tr><th>Document</th><th>Link</th><th>Views</th><th>Expires</th><th></th></tr></thead><tbody>${[['TechNova_Pitch_Deck.pdf','sedana.in/s/a8k2x','14','29 days'],['TechNova_Teaser.pdf','sedana.in/s/q1m7z','22','12 days'],['Financial_Model.xlsx','sedana.in/s/p9d4c','3','Never']].map(r=>`<tr><td><b>${r[0]}</b></td><td><a href="#">${r[1]}</a></td><td>${r[2]}</td><td class="muted">${r[3]}</td><td><div class="row gap6"><button class="btn btn-xs btn-soft sl-copy">Copy</button><button class="btn btn-xs btn-secondary sl-rev">Revoke</button></div></td></tr>`).join('')}</tbody></table></div>`:''}
        ${tab==='history'?`<div class="card"><div class="card-title mb12"><span class="ico amber">${I('history')}</span>Version History – ${d.n}</div>${[['v3','18 Mar 2026','Current · Updated financials slide','Rahul Sharma'],['v2','12 Mar 2026','Added team & traction slides','Sneha Patel'],['v1','2 Mar 2026','Initial upload','Rahul Sharma']].map((v,i)=>`<div class="list-item"><span class="badge ${i===0?'badge-blue':'badge-gray'}">${v[0]}</span><div class="t grow"><b>${v[2]}</b><span>${v[1]} · ${v[3]}</span></div>${i?`<button class="btn btn-xs btn-secondary ver-restore">Restore</button>`:''}</div>`).join('')}</div>`:''}
      </div>

      <div class="col gap16">
        <div class="card"><div class="card-head"><div class="card-title"><span class="ico">${I('file-text')}</span>Document Preview</div><button class="btn-link small" id="doc-full">${I('maximize-2')} Full Screen</button></div>
          <div class="preview-box"><b>${DB.startup.name}</b><span>${DB.startup.tagline}</span><span class="xs mt8" style="opacity:.7">Smarter deliveries. Stronger businesses.</span></div>
          <div class="row gap10 mt12"><span class="file-ico ${d.type.toLowerCase()}">${d.type}</span><div class="grow"><b class="small">${d.n}</b><div class="xs muted">${d.size} · Updated ${d.date}</div></div><button class="btn btn-solid btn-sm" id="doc-replace">Replace Version</button></div></div>
        <div class="card"><div class="card-title mb12"><span class="ico violet">${I('sparkles')}</span>AI Tools for Selected Document</div>
          <div class="three" style="gap:8px">${[['wand-2','Improve Content','Enhance structure and messaging','aistudio/deck'],['palette','Change Design','Apply professional templates','aistudio/templates'],['user-cog','Tailor for Investor','Customize for specific investors','aistudio/tailor']].map(x=>`<div class="tool-card" style="flex-direction:column;gap:6px;padding:12px" data-go="${x[3]}"><span class="ico-box sm violet">${I(x[0])}</span><b class="small">${x[1]}</b><p class="xs">${x[2]}</p></div>`).join('')}</div></div>
        <div class="card"><div class="row gap10"><span class="ico-box">${I('link')}</span><div class="grow"><b class="small">Share Document</b><div class="xs muted">Create a secure link to share this document with investors.</div></div><button class="btn btn-secondary btn-sm" id="doc-share">Create Share Link</button></div></div>
      </div>
    </div>`}`;
  },
  analysis(){
    return `<div class="row between mt20 mb12"><button class="btn btn-ghost" data-tab="mine">${I('arrow-left')} Back to documents</button><span class="badge badge-violet">${I('sparkles')} Analyzed by Sedana AI · just now</span></div>
    <div class="split">
      <div class="col gap16">
        <div class="card"><div class="card-head"><div class="card-title"><span class="ico violet">${I('scan-search')}</span><div>Investor-Readiness Score<div class="card-sub">TechNova_Pitch_Deck.pdf · 12 slides</div></div></div></div>
          <div class="row gap24" style="align-items:flex-start"><div class="score"><div class="big">78</div><div><b>Good</b><div class="small muted">Above the average of 64 for Series A logistics decks.</div></div></div>
            <div class="grow">${[['Problem & Solution',92],['Market size',70],['Business model',85],['Traction',88],['Team',80],['Financials',58],['Ask & use of funds',72],['Design & clarity',81]].map(s=>`<div class="score-bar"><span class="lb">${s[0]}</span><div class="progress thin ${s[1]>=80?'green':s[1]<65?'':'violet'}"><span style="width:${s[1]}%${s[1]<65?';background:var(--amber)':''}"></span></div><span class="n">${s[1]}</span></div>`).join('')}</div></div></div>
        <div class="card"><div class="card-title mb12"><span class="ico amber">${I('alert-triangle')}</span>Top recommendations</div>
          ${[['Financials slide lacks a 3-year projection','Investors at Series A expect revenue, burn and margin projections. Add a projections table.','Fix with AI'],['Market size uses top-down only','Add a bottom-up TAM/SAM/SOM calculation for Indian SMEs.','Fix with AI'],['Competitive slide is missing','Add a 2x2 positioning map against Locus, Shipsy and FarEye.','Add slide'],['Ask slide should mention runway','State the 24-month runway the ₹5 Cr round gives you.','Fix with AI']].map(r=>`<div class="list-item" style="align-items:flex-start"><span class="ico-box sm amber">${I('lightbulb')}</span><div class="t grow"><b>${r[0]}</b><span>${r[1]}</span></div><button class="btn btn-soft btn-xs ai-fix">${I('sparkles')} ${r[2]}</button></div>`).join('')}</div>
      </div>
      <div class="col gap16">
        <div class="card"><div class="card-title mb12"><span class="ico green">${I('thumbs-up')}</span>What's working</div><ul class="small" style="padding-left:18px;color:var(--ink-2);display:grid;gap:6px"><li>Clear problem statement with SME pain points</li><li>Strong traction: 500+ customers, 25% MoM growth</li><li>Credible founding team with logistics background</li><li>Consistent, clean visual design</li></ul></div>
        <div class="card"><div class="card-title mb12"><span class="ico">${I('message-square')}</span>Ask the deck analyst</div>
          <div id="ana-chat"><div class="chat-msg"><span class="avatar sm" style="background:var(--violet)">AI</span><div class="bub">I've reviewed your 12 slides. Ask me anything — e.g. "How do I strengthen the financials slide?"</div></div></div>
          <div class="row mt8"><input class="input" id="ana-in" placeholder="Ask a question about your deck…"><button class="btn btn-primary btn-sm" id="ana-send">${I('send')}</button></div></div>
        <button class="btn btn-primary btn-block" data-go="aistudio/deck">${I('wand-2')} Improve this deck with AI (50 credits)</button>
      </div>
    </div>`;
  },
  after(sub){
    $$('[data-tab]').forEach(b=>b.onclick=()=>go('documents/'+b.dataset.tab));
    const up=$('#doc-upload'); if(up) up.onclick=()=>uploadDocModal(()=>renderPage());
    $$('[data-view]').forEach(b=>b.onclick=()=>{ DOC_SEL=+b.dataset.view; docPreviewModal(DB.documents[DOC_SEL]); });
    $$('.doc-menu').forEach(b=>b.onclick=e=>{ e.stopPropagation(); const i=+b.dataset.i; const d=dropdown(b, menuItems([{ico:'eye',label:'Preview',act:'view'},{ico:'star',label:'Set as primary deck',act:'primary'},{ico:'link',label:'Share link',act:'share'},{ico:'download',label:'Download',act:'dl'},{ico:'pencil',label:'Rename',act:'rename'},{ico:'sparkles',label:'Analyze with AI',act:'ana'},'-',{ico:'trash-2',label:'Delete',act:'del',danger:true}]));
      $$('.item',d).forEach(it=>it.onclick=()=>{ closeDropdowns(); const a=it.dataset.act, doc=DB.documents[i];
        if(a==='view'){ DOC_SEL=i; docPreviewModal(doc); } else if(a==='primary'){ DB.documents.forEach(x=>x.primary=false); doc.primary=true; toast(doc.n+' set as primary deck'); renderPage(); }
        else if(a==='share') shareLinkModal(doc); else if(a==='dl') toast('Download started','info'); else if(a==='ana') go('documents/analysis');
        else if(a==='rename') editFieldModal('Rename document',[{label:'File name',k:'n',v:doc.n,span:true}],v=>{ doc.n=v.n; renderPage(); });
        else if(a==='del') confirmModal({title:'Delete document?',text:`"${doc.n}" will be permanently removed and all share links revoked.`,ok:'Delete',danger:true,onOk:()=>{ DB.documents.splice(i,1); DOC_SEL=0; toast('Document deleted'); renderPage(); }}); }); });
    const sh=$('#doc-share'); if(sh) sh.onclick=()=>shareLinkModal(DB.documents[DOC_SEL]);
    const fs=$('#doc-full'); if(fs) fs.onclick=()=>docPreviewModal(DB.documents[DOC_SEL]);
    const rp=$('#doc-replace'); if(rp) rp.onclick=()=>uploadDocModal(()=>renderPage());
    $$('.sl-copy').forEach(b=>b.onclick=()=>toast('Link copied')); $$('.sl-rev').forEach(b=>b.onclick=()=>confirmModal({title:'Revoke link?',text:'Anyone with this link will lose access immediately.',ok:'Revoke',danger:true,onOk:()=>{ b.closest('tr').remove(); toast('Link revoked'); }}));
    $$('.ver-restore').forEach(b=>b.onclick=()=>toast('Version restored'));
    $$('.tpl').forEach(t=>t.onclick=()=>{ $$('.tpl').forEach(x=>x.classList.remove('sel')); t.classList.add('sel'); toast(`Template "${t.dataset.tpl}" selected – open AI Studio to apply`,'info'); });
    $$('.ai-fix').forEach(b=>b.onclick=()=>{ b.innerHTML=I('loader-2','spin')+' Working…'; refreshIcons(); setTimeout(()=>{ b.innerHTML=I('check')+' Applied'; b.classList.add('btn-secondary'); refreshIcons(); toast('Slide updated by AI'); },1200); });
    const send=$('#ana-send'); if(send){ const ask=()=>{ const v=$('#ana-in').value.trim(); if(!v) return; const c=$('#ana-chat'); c.insertAdjacentHTML('beforeend',`<div class="chat-msg me"><div class="bub">${esc(v)}</div></div>`); $('#ana-in').value=''; setTimeout(()=>{ c.insertAdjacentHTML('beforeend',`<div class="chat-msg"><span class="avatar sm" style="background:var(--violet)">AI</span><div class="bub">Good question. For a Series A logistics deck, I'd add a 3-year projection table (revenue, gross margin, burn) and tie the ₹5 Cr ask to 24 months of runway. Want me to draft that slide?</div></div>`); refreshIcons(); },700); }; send.onclick=ask; $('#ana-in').onkeydown=e=>{ if(e.key==='Enter') ask(); }; }
  }
};
