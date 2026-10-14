/* =====================================================================
   Sidana Ventures – site behaviour: nav, reveals, count-ups, tilt,
   animated globe, platform login
   ===================================================================== */
(function(){
  const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
  if(window.lucide) lucide.createIcons();

  /* nav */
  const nav=$('.nav');
  const onScroll=()=>nav&&nav.classList.toggle('scrolled',scrollY>10); onScroll(); addEventListener('scroll',onScroll,{passive:true});
  const tg=$('.nav-toggle'); if(tg) tg.onclick=()=>$('.nav-links').classList.toggle('open');
  const here=location.pathname.split('/').pop()||'index.html';
  $$('.nav-links a').forEach(a=>{ if(a.getAttribute('href')===here) a.classList.add('active'); });

  /* word-by-word headline */
  $$('.words').forEach(h=>{ const nodes=[...h.childNodes]; h.innerHTML=''; let i=0; nodes.forEach(n=>{ if(n.nodeType===3){ n.textContent.split(/(\s+)/).forEach(w=>{ if(!w.trim()){ h.appendChild(document.createTextNode(' ')); return; } const s=document.createElement('span'); s.textContent=w; s.style.animationDelay=(i++*.09)+'s'; h.appendChild(s); }); } else { const wrap=document.createElement(n.tagName.toLowerCase()); wrap.className=n.className; n.textContent.split(/(\s+)/).forEach(w=>{ if(!w.trim()){ wrap.appendChild(document.createTextNode(' ')); return; } const s=document.createElement('span'); s.textContent=w; s.style.animationDelay=(i++*.09)+'s'; wrap.appendChild(s); }); h.appendChild(wrap); } }); });

  /* reveal on scroll */
  const io=new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in','in-view'); if(e.target.dataset.count) countUp(e.target); io.unobserve(e.target); } }),{threshold:.15});
  $$('.reveal,.stagger,[data-count],.steps-wrap').forEach(el=>io.observe(el));
  function countUp(el){ const end=parseFloat(el.dataset.count), suffix=el.dataset.suffix||'', prefix=el.dataset.prefix||'', dur=1400, t0=performance.now(); const step=t=>{ const p=Math.min(1,(t-t0)/dur), v=Math.round(end*(1-Math.pow(1-p,3))); el.textContent=prefix+v+suffix; if(p<1) requestAnimationFrame(step); }; requestAnimationFrame(step); }

  /* tilt on hover */
  $$('.tilt').forEach(el=>{ el.addEventListener('mousemove',e=>{ const r=el.getBoundingClientRect(), x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5; el.style.transform=`perspective(900px) rotateY(${x*8}deg) rotateX(${-y*8}deg) translateY(-4px)`; }); el.addEventListener('mouseleave',()=>el.style.transform=''); });

  /* parallax float cards against mouse */
  const hv=$('.hero-visual'); if(hv){ addEventListener('mousemove',e=>{ const x=(e.clientX/innerWidth-.5), y=(e.clientY/innerHeight-.5); $$('.float-card',hv).forEach((c,i)=>{ c.style.marginLeft=(x*(10+i*6))+'px'; c.style.marginTop=(y*(10+i*6))+'px'; }); $$('.photo',hv).forEach((c,i)=>{ c.style.translate=`${-x*(8+i*4)}px ${-y*(8+i*4)}px`; }); }); }

  /* ---------------------------------------------------------------
     Animated globe (canvas): dotted sphere with land-ish clusters,
     orbit rings, arcs between hubs and pulsing nodes
     --------------------------------------------------------------- */
  const cv=$('#globe'); if(cv){
    const ctx=cv.getContext('2d'); const DPR=Math.min(2,devicePixelRatio||1);
    let W,H,R; const resize=()=>{ const r=cv.getBoundingClientRect(); W=r.width;H=r.height; cv.width=W*DPR;cv.height=H*DPR; ctx.setTransform(DPR,0,0,DPR,0,0); R=Math.min(W,H)*.36; }; resize(); addEventListener('resize',resize);
    // points on sphere (fibonacci) – weight "land" via a few blobs so the globe is not uniform
    const N=2600, pts=[]; const blobs=[[20,78],[35,105],[48,10],[-25,25],[-15,-60],[40,-100],[-28,135],[60,-110],[10,-75],[30,40]];
    for(let i=0;i<N;i++){ const y=1-(i/(N-1))*2, r=Math.sqrt(1-y*y), th=i*2.39996; const x=Math.cos(th)*r, z=Math.sin(th)*r; const lat=Math.asin(y)*180/Math.PI, lon=Math.atan2(z,x)*180/Math.PI; let w=0; blobs.forEach(b=>{ const d=Math.hypot(lat-b[0],((lon-b[1]+540)%360-180)*Math.cos(lat*Math.PI/180)); w+=Math.exp(-d*d/700); }); pts.push({x,y,z,w:Math.min(1,w*1.6)}); }
    const hubs=[[20,78],[1,104],[25,55],[51,0],[40,-74],[-33,151],[35,139],[-1,37]].map(h=>{ const la=h[0]*Math.PI/180, lo=h[1]*Math.PI/180; return {x:Math.cos(la)*Math.cos(lo),y:Math.sin(la),z:Math.cos(la)*Math.sin(lo)}; });
    const arcs=[[0,3],[0,4],[0,5],[0,6],[1,2],[0,7],[2,3]];
    let rot=0, tilt=-0.35, t=0; const mouse={x:0,y:0}; addEventListener('mousemove',e=>{ mouse.x=(e.clientX/innerWidth-.5); mouse.y=(e.clientY/innerHeight-.5); });
    const proj=p=>{ // rotate around Y then tilt around X
      const cx=Math.cos(rot), sx=Math.sin(rot); let x=p.x*cx-p.z*sx, z=p.x*sx+p.z*cx, y=p.y; const ct=Math.cos(tilt), st=Math.sin(tilt); const y2=y*ct-z*st, z2=y*st+z*ct; return {x:W/2+x*R, y:H/2+y2*R, z:z2}; };
    function frame(){ t+=1/60; rot+=0.0032+mouse.x*0.002; tilt+=((-0.35+mouse.y*0.25)-tilt)*0.03; ctx.clearRect(0,0,W,H);
      // atmosphere
      const g=ctx.createRadialGradient(W/2-R*.3,H/2-R*.3,R*.2,W/2,H/2,R*1.15); g.addColorStop(0,'rgba(120,160,255,.55)'); g.addColorStop(.7,'rgba(31,91,255,.18)'); g.addColorStop(1,'rgba(31,91,255,0)'); ctx.fillStyle=g; ctx.beginPath(); ctx.arc(W/2,H/2,R*1.15,0,Math.PI*2); ctx.fill();
      const sg=ctx.createRadialGradient(W/2-R*.35,H/2-R*.35,R*.1,W/2,H/2,R); sg.addColorStop(0,'#dce7ff'); sg.addColorStop(.6,'#8fb0ff'); sg.addColorStop(1,'#2b5bff'); ctx.fillStyle=sg; ctx.beginPath(); ctx.arc(W/2,H/2,R,0,Math.PI*2); ctx.fill();
      // orbit rings
      ctx.save(); ctx.translate(W/2,H/2); for(let k=0;k<3;k++){ ctx.save(); ctx.rotate(-0.5+k*0.55); ctx.scale(1,0.32+k*0.08); ctx.beginPath(); ctx.arc(0,0,R*(1.25+k*0.12),0,Math.PI*2); ctx.strokeStyle=`rgba(31,91,255,${0.35-k*0.08})`; ctx.lineWidth=1; ctx.stroke(); const a=t*(0.5+k*0.2)+k; ctx.fillStyle='#1f5bff'; ctx.beginPath(); ctx.arc(Math.cos(a)*R*(1.25+k*0.12),Math.sin(a)*R*(1.25+k*0.12),4,0,Math.PI*2); ctx.fill(); ctx.restore(); } ctx.restore();
      // dots
      for(const p of pts){ const q=proj(p); if(q.z<0.02) continue; const a=q.z; const land=p.w>0.25; ctx.fillStyle=land?`rgba(255,255,255,${0.35+a*0.65})`:`rgba(255,255,255,${0.08+a*0.22})`; ctx.beginPath(); ctx.arc(q.x,q.y,land?1.7*a+0.6:1.1*a+0.3,0,Math.PI*2); ctx.fill(); }
      // arcs
      const H2=hubs.map(proj);
      arcs.forEach(([i,j],k)=>{ const a=H2[i], b=H2[j]; if(a.z<0&&b.z<0) return; const mx=(a.x+b.x)/2, my=(a.y+b.y)/2; const d=Math.hypot(b.x-a.x,b.y-a.y); const nx=-(b.y-a.y)/d, ny=(b.x-a.x)/d; const cxp=mx+nx*d*0.35-(W/2-mx)*0.1, cyp=my+ny*d*0.35-(H/2-my)*0.3; ctx.strokeStyle=`rgba(255,255,255,${0.45*Math.max(0.2,(a.z+b.z)/2+0.5)})`; ctx.lineWidth=1.2; ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.quadraticCurveTo(cxp,cyp,b.x,b.y); ctx.stroke();
        const u=(t*0.25+k*0.17)%1; const px=(1-u)*(1-u)*a.x+2*(1-u)*u*cxp+u*u*b.x, py=(1-u)*(1-u)*a.y+2*(1-u)*u*cyp+u*u*b.y; ctx.fillStyle='#fff'; ctx.shadowColor='#fff'; ctx.shadowBlur=8; ctx.beginPath(); ctx.arc(px,py,2.4,0,Math.PI*2); ctx.fill(); ctx.shadowBlur=0; });
      // hubs with pulses
      H2.forEach((h,i)=>{ if(h.z<0) return; const pulse=(t*0.9+i*0.4)%1; ctx.strokeStyle=`rgba(255,255,255,${(1-pulse)*0.8})`; ctx.lineWidth=1.5; ctx.beginPath(); ctx.arc(h.x,h.y,4+pulse*14,0,Math.PI*2); ctx.stroke(); ctx.fillStyle=i===0?'#fff':'#dbe5ff'; ctx.beginPath(); ctx.arc(h.x,h.y,i===0?4.5:3,0,Math.PI*2); ctx.fill(); });
      // rim highlight
      ctx.strokeStyle='rgba(255,255,255,.35)'; ctx.lineWidth=1; ctx.beginPath(); ctx.arc(W/2,H/2,R,0,Math.PI*2); ctx.stroke();
      requestAnimationFrame(frame); }
    frame();
  }

  /* ---------------------------------------------------------------
     Platform login page
     --------------------------------------------------------------- */
  const lf=$('#platform-login'); if(lf){
    const eye=$('#pw-eye'); eye.onclick=()=>{ const i=$('#pw'); i.type=i.type==='password'?'text':'password'; };
    lf.onsubmit=e=>{ e.preventDefault(); const b=$('button[type=submit]',lf); b.innerHTML='<i data-lucide="loader-2" class="spin"></i> Signing in…'; lucide.createIcons(); b.style.pointerEvents='none';
      localStorage.setItem('sedana_logged','1'); setTimeout(()=>{ location.href='app.html#/'+(localStorage.getItem('sedana_onboarded')?'dashboard':'onboarding/type'); },800); };
    $('#req-access').onclick=e=>{ e.preventDefault(); openModal(`<h3>Request platform access</h3><p>Tell us about your startup and we'll set up your workspace within one business day.</p><form id="req-form"><div class="grid-2"><div class="field"><label>Founder name</label><input class="input" required placeholder="Rahul Sharma"></div><div class="field"><label>Work email</label><input class="input" type="email" required placeholder="you@company.com"></div><div class="field"><label>Company</label><input class="input" required placeholder="TechNova"></div><div class="field"><label>Stage</label><select class="input"><option>Pre-revenue</option><option>Medium size (₹50L – ₹5Cr)</option><option>Established (> ₹5Cr)</option></select></div></div><div class="field"><label>What are you building?</label><textarea class="input" rows="3" placeholder="One or two lines"></textarea></div><div style="display:flex;gap:10px;justify-content:flex-end;margin-top:6px"><button type="button" class="btn btn-ghost" data-close>Cancel</button><button class="btn btn-primary" type="submit">Submit request</button></div></form>`); $('#req-form').onsubmit=ev=>{ ev.preventDefault(); closeModal(); toast('Request received – check your inbox for next steps'); }; };
    $('#forgot').onclick=e=>{ e.preventDefault(); openModal(`<h3>Reset your password</h3><p>We'll email you a secure link to set a new password.</p><form id="fp-form"><div class="field"><label>Email address</label><input class="input" type="email" required placeholder="you@company.com"></div><div style="display:flex;gap:10px;justify-content:flex-end"><button type="button" class="btn btn-ghost" data-close>Cancel</button><button class="btn btn-primary" type="submit">Send reset link</button></div></form>`); $('#fp-form').onsubmit=ev=>{ ev.preventDefault(); closeModal(); toast('Reset link sent'); }; };
  }
  window.openModal=function(html){ closeModal(); const o=document.createElement('div'); o.className='overlay'; o.id='overlay'; o.innerHTML=`<div class="modal">${html}</div>`; o.onclick=e=>{ if(e.target===o) closeModal(); }; document.body.appendChild(o); $$('[data-close]',o).forEach(b=>b.onclick=closeModal); if(window.lucide) lucide.createIcons(); };
  window.closeModal=function(){ $('#overlay')?.remove(); };
  window.toast=function(m){ const t=document.createElement('div'); t.className='toast'; t.textContent=m; document.body.appendChild(t); setTimeout(()=>t.remove(),3000); };
  document.addEventListener('keydown',e=>{ if(e.key==='Escape') closeModal(); });

  /* portfolio filters */
  $$('.filters button').forEach(b=>b.onclick=()=>{ $$('.filters button').forEach(x=>x.classList.remove('active')); b.classList.add('active'); const f=b.dataset.f; $$('.co').forEach(c=>{ c.style.display=(f==='all'||c.dataset.sector===f)?'':'none'; }); });
  $$('.co,.post').forEach(c=>c.onclick=()=>toast('Detail pages are not part of this walkthrough'));
  $$('.res .lnk').forEach(l=>l.onclick=e=>{ e.preventDefault(); toast('Download started'); });
  $$('[data-subscribe]').forEach(f=>f.onsubmit=e=>{ e.preventDefault(); toast('Subscribed – welcome to Sidana Insights'); f.reset(); });
})();
