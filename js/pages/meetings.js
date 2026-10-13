/* =====================================================================
   Meetings – calendar + upcoming / past lists
   ===================================================================== */
const MEET = { tab: 'upcoming' };
PAGES.meetings = {
  render(sub){
    if(sub) MEET.tab=sub;
    const up=DB.meetings.filter(m=>m.status!=='Completed'), past=DB.meetings.filter(m=>m.status==='Completed');
    const evDays=new Set(DB.meetings.map(m=>+m.day));
    const days=[]; for(let i=0;i<4;i++) days.push({d:28+i,dim:true}); for(let d=1;d<=31;d++) days.push({d}); while(days.length%7) days.push({d:days.length-34,dim:true});
    return `
    ${crumbs([['Meetings']])}
    <div class="page-head"><div><h1>Meetings</h1><div class="sub">All investor calls and Sedana sessions in one calendar. We coordinate the scheduling for you.</div></div><div class="row gap8"><button class="btn btn-secondary" id="mt-sync">${I('calendar')} Sync Google Calendar</button><button class="btn btn-primary" id="mt-new">${I('calendar-plus')} Schedule Meeting</button></div></div>
    <div class="stat-grid" style="grid-template-columns:repeat(4,1fr);margin-top:0">${[['calendar','blue',up.length,'Upcoming'],['check-circle-2','green',past.length,'Completed'],['clock','amber',up.filter(m=>m.status==='Pending').length,'Awaiting confirmation'],['handshake','pink',4,'In discussion']].map(x=>`<div class="stat"><span class="ico-box ${x[1]}">${I(x[0])}</span><div><div class="vl">${x[2]}</div><div class="lb">${x[3]}</div></div></div>`).join('')}</div>
    <div class="split mt16">
      <div>
        <div class="tabs">${[['upcoming','Upcoming'],['past','Past'],['requests','Requests']].map(t=>`<button class="${MEET.tab===t[0]?'active':''}" data-mtab="${t[0]}">${t[1]}</button>`).join('')}</div>
        <div class="col gap12">
        ${MEET.tab==='upcoming'?up.map(m=>meetingCard(m)).join(''):''}
        ${MEET.tab==='past'?past.map(m=>meetingCard(m)).join('')+`<div class="meeting"><div class="dt"><b>02</b><span>Oct</span></div>${avatar('B','#0f172a')}<div class="t grow"><b>Blume Ventures – Intro call</b><span>Completed · Notes: strong interest, asked for cohort data</span></div><button class="btn btn-secondary btn-sm mt-notes">${I('file-text')} Notes</button></div>`:''}
        ${MEET.tab==='requests'?`<div class="meeting"><div class="dt"><b>?</b><span>TBD</span></div>${avatar('E','#1e293b')}<div class="t grow"><b>Elevation Capital requested a meeting</b><span>Via Series A Outreach · proposed 3 slots next week</span></div><div class="row gap6"><button class="btn btn-secondary btn-sm mt-decl">Decline</button><button class="btn btn-primary btn-sm mt-acc">${I('check')} Pick a slot</button></div></div><div class="empty">Sedana agents follow up on every pending request within 24 hours.</div>`:''}
        </div>
      </div>
      <div class="col gap16">
        <div class="card"><div class="row between mb12"><button class="btn btn-icon">${I('chevron-left')}</button><b>October 2026</b><button class="btn btn-icon">${I('chevron-right')}</button></div>
          <div class="cal">${['Mo','Tu','We','Th','Fr','Sa','Su'].map(d=>`<div class="d h">${d}</div>`).join('')}${days.map(d=>`<div class="d ${d.dim?'dim':''} ${!d.dim&&d.d===12?'today':''} ${!d.dim&&evDays.has(d.d)?'ev':''}" data-day="${d.dim?'':d.d}">${d.d}</div>`).join('')}</div>
          <div class="row gap12 xs muted mt12"><span class="row gap4"><i style="width:8px;height:8px;border-radius:50%;background:var(--brand);display:inline-block"></i> Today</span><span class="row gap4"><i style="width:8px;height:8px;border-radius:50%;background:var(--violet);display:inline-block"></i> Meeting</span></div></div>
        <div class="card"><div class="card-title mb12"><span class="ico">${I('settings-2')}</span>Availability</div><p class="small muted">Investors can only book inside these hours.</p><div class="col gap8 mt12 small">${[['Mon – Fri','10:00 AM – 6:00 PM IST'],['Buffer','15 min between meetings'],['Timezone','Asia/Kolkata']].map(x=>`<div class="row between"><span class="muted">${x[0]}</span><b>${x[1]}</b></div>`).join('')}</div><button class="btn btn-secondary btn-sm btn-block mt12" id="mt-avail">${I('pencil')} Edit availability</button></div>
        <div class="card" style="background:var(--violet-50);border-color:#e9d5ff"><b class="small">${I('sparkles')} AI meeting prep</b><p class="small mt4">Before every call, Sedana prepares investor notes, likely questions and your key talking points.</p></div>
      </div>
    </div>`;
  },
  after(){
    $$('[data-mtab]').forEach(b=>b.onclick=()=>{ MEET.tab=b.dataset.mtab; renderPage(); });
    $('#mt-new').onclick=()=>scheduleMeetingModal();
    $('#mt-sync').onclick=()=>confirmModal({title:'Connect Google Calendar?',text:'Sedana will read your availability and add confirmed meetings to your calendar. You can disconnect anytime from Settings.',ok:'Connect',onOk:()=>toast('Google Calendar connected')});
    $('#mt-avail').onclick=()=>editFieldModal('Edit availability',[{label:'Working days',k:'d',type:'select',opts:['Mon – Fri','Mon – Sat','Custom'],v:'Mon – Fri'},{label:'Timezone',k:'tz',type:'select',opts:['Asia/Kolkata','Asia/Singapore','UTC'],v:'Asia/Kolkata'},{label:'Start time',k:'s',v:'10:00 AM'},{label:'End time',k:'e',v:'6:00 PM'}]);
    $$('[data-join]').forEach(b=>b.onclick=()=>joinCallModal(DB.meetings.find(m=>m.id==b.dataset.join)));
    $$('.mt-menu').forEach(b=>b.onclick=e=>{ e.stopPropagation(); const m=DB.meetings.find(x=>x.id==b.dataset.id); const d=dropdown(b,menuItems([{ico:'calendar-clock',label:'Reschedule',act:'re'},{ico:'file-text',label:'Prep notes',act:'notes'},{ico:'link',label:'Copy meeting link',act:'copy'},'-',{ico:'x-circle',label:'Cancel meeting',act:'cancel',danger:true}])); $$('.item',d).forEach(it=>it.onclick=()=>{ closeDropdowns(); const a=it.dataset.act; if(a==='re') scheduleMeetingModal(); else if(a==='notes') joinCallModal(m); else if(a==='copy') toast('Meeting link copied'); else confirmModal({title:'Cancel meeting?',text:`We'll notify ${m.with} and offer to reschedule.`,ok:'Cancel meeting',danger:true,onOk:()=>{ DB.meetings.splice(DB.meetings.indexOf(m),1); renderPage(); toast('Meeting cancelled'); }}); }); });
    $$('.mt-notes').forEach(b=>b.onclick=()=>openModal(`${modalHead('Meeting notes','Blume Ventures · 2 Oct 2026')}<div class="modal-body"><ul style="padding-left:18px;display:grid;gap:8px;color:var(--ink-2)"><li>Strong interest in SME logistics thesis.</li><li>Asked for cohort retention data and CAC by channel.</li><li>Next step: share data room link and schedule partner meeting.</li></ul><div class="row gap8 mt16"><span class="badge badge-green">Positive</span><span class="badge badge-blue">Follow-up due 16 Oct</span></div></div><div class="modal-foot"><button class="btn btn-primary" data-close>Close</button></div>`));
    $$('.mt-acc').forEach(b=>b.onclick=()=>scheduleMeetingModal(DB.investors[3])); $$('.mt-decl').forEach(b=>b.onclick=()=>confirmModal({title:'Decline request?',text:'Elevation Capital will be notified politely.',ok:'Decline',danger:true,onOk:()=>toast('Request declined')}));
    $$('.cal .d[data-day]').forEach(d=>{ if(d.dataset.day) d.onclick=()=>{ const ms=DB.meetings.filter(m=>+m.day===+d.dataset.day); if(ms.length) joinCallModal(ms[0]); else scheduleMeetingModal(); }; });
  }
};
function meetingCard(m){ return `<div class="meeting"><div class="dt"><b>${m.day}</b><span>${m.mon}</span></div>${avatar(m.ini,m.c)}<div class="t grow"><b>${m.with} – ${m.title}</b><span>${m.who} · ${m.time} · ${m.type}</span></div><span class="badge ${m.status==='Confirmed'?'badge-green':m.status==='Pending'?'badge-amber':'badge-gray'}">${m.status}</span>${m.status!=='Completed'?`<button class="btn btn-soft btn-sm" data-join="${m.id}">${I('video')} Join</button>`:''}<button class="btn btn-icon mt-menu" data-id="${m.id}">${I('more-vertical')}</button></div>`; }
