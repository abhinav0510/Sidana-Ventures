/* =====================================================================
   Sedana – mock data store (in-memory, persisted lightly to localStorage)
   ===================================================================== */
const DB = {
  user: { name: 'Rahul Sharma', first: 'Rahul', role: 'Founder', email: 'rahul@technova.ai', initials: 'R' },
  startup: {
    name: 'TechNova', tagline: 'AI-powered logistics platform for SMEs', verified: true,
    type: 'medium',            // pre | medium | established
    sector: 'Logistics & Supply Chain', model: 'SaaS', stage: 'Series A', team: '11 – 50',
    hq: 'Bangalore, India', website: 'https://technova.ai', founded: '2023',
    desc: 'AI-powered logistics platform that helps SMEs manage last-mile delivery, route optimization and fleet operations efficiently.',
    tags: ['AI / ML', 'Logistics', 'B2B SaaS', 'Series A'],
    completion: 60,
    socials: { website: 'https://technova.ai', linkedin: 'https://linkedin.com/company/technova', x: 'https://x.com/technova', youtube: 'https://youtube.com/@technova' }
  },
  credits: 250,
  fin: {
    revenue: 2000000, burn: 1200000, runway: 18, target: 50000000, targetUsd: '$5M', arr: '₹2.1 Cr',
    customers: '500+', arpc: '₹5,000', margin: '60%', churn: '8%', yoy: '3.2x', ebitda: '22%', mom: '25%', retention: '98%',
    useOfFunds: [['Product Development',40,'#2f5bea'],['Team Expansion',25,'#3b82f6'],['Market Expansion',20,'#16a34a'],['Sales & Marketing',10,'#f59e0b'],['Operations & Others',5,'#c4b5fd']],
    closure: 'Q3 2026', investors: 'VCs, Growth Funds, Strategic Investors',
    months: [['Jan',4],['Feb',5],['Mar',5.5],['Apr',6.5],['May',8],['Jun',9],['Jul',10.5],['Aug',12],['Sep',14],['Oct',16],['Nov',18],['Dec',20]]
  },
  team: [
    { n: 'Rahul Sharma', r: 'Founder', e: 'rahul@technova.ai', c: '#15348a' },
    { n: 'Sneha Patel', r: 'Co-Founder', e: 'sneha@technova.ai', c: '#7c3aed' },
    { n: 'Vikram Desai', r: 'CTO', e: 'vikram@technova.ai', c: '#0d9488' }
  ],
  investors: [
    { id: 1, n: 'Y Combinator', t: 'Early Stage VC', geo: 'Global', match: 92, cost: 30, cheque: '₹50L – ₹8Cr', port: '100+', stages: 'Pre-Seed – Series A', tags: ['Pre-Seed - Series A','AI/ML','Enterprise SaaS'], c: '#f97316', ini: 'Y', unlocked: false,
      about: 'Y Combinator is a leading global accelerator and early-stage investor, known for backing transformative startups across various sectors. They provide capital, mentorship and access to a strong network of investors.', sectors: 'AI/ML, SaaS, Fintech, Deep Tech', pgeo: 'Global (US, India, Europe)', portc: '100+ (Airbnb, Stripe, Dropbox, etc.)', web: 'https://www.ycombinator.com',
      why: ['Invests in AI/ML and B2B SaaS startups','Active in early stage (Pre-Seed to Series A)','Strong interest in logistics and supply chain technology','Has backed similar business models in the past'] },
    { id: 2, n: 'Accel', t: 'Venture Capital', geo: 'India, US', match: 88, cost: 30, cheque: '₹5Cr – ₹50Cr', port: '300+', stages: 'Series A – Series C', tags: ['Series A - Series C','Enterprise SaaS','Supply Chain'], c: '#111827', ini: 'A', unlocked: true,
      about: 'Accel is a global venture capital firm that partners with exceptional founders from seed to growth stage. Strong India presence with a focus on SaaS, consumer and logistics.', sectors: 'SaaS, Logistics, Fintech, Consumer', pgeo: 'India, US, Europe', portc: '300+ (Flipkart, Freshworks, Swiggy)', web: 'https://www.accel.com',
      why: ['Deep logistics & supply chain thesis in India','Leads Series A rounds of ₹20–50 Cr','Portfolio synergies with Flipkart & Swiggy','Recently invested in AI-first B2B startups'] },
    { id: 3, n: 'Blume Ventures', t: 'Venture Capital', geo: 'India', match: 85, cost: 25, cheque: '₹50L – ₹15Cr', port: '250+', stages: 'Seed – Series A', tags: ['Seed - Series A','B2B','SaaS'], c: '#0f172a', ini: '✳', unlocked: false,
      about: 'Blume Ventures is an early-stage venture fund that backs founders building for India and global markets, with strong theses in B2B SaaS and logistics.', sectors: 'B2B SaaS, Logistics, Fintech', pgeo: 'India', portc: '250+ (Unacademy, Dunzo, Purplle)', web: 'https://blume.vc',
      why: ['Seed to Series A focus matches your stage','Backed Dunzo and other logistics plays','Strong India B2B SaaS portfolio','Actively investing this quarter'] },
    { id: 4, n: 'Elevation Capital', t: 'Venture Capital', geo: 'India, SEA', match: 82, cost: 25, cheque: '₹10Cr – ₹75Cr', port: '200+', stages: 'Series A – Series B', tags: ['Series A - Series B','B2B','Consumer Tech'], c: '#1e293b', ini: '▲', unlocked: false,
      about: 'Elevation Capital is a leading venture capital firm investing in early-stage Indian startups across consumer, SaaS, fintech and logistics.', sectors: 'SaaS, Consumer, Fintech, Logistics', pgeo: 'India, Southeast Asia', portc: '200+ (Paytm, Swiggy, Meesho)', web: 'https://elevationcapital.com',
      why: ['Series A lead investor in India','Logistics & mobility thesis','Large cheque size for scale','Portfolio synergy with Swiggy'] },
    { id: 5, n: 'Matrix Partners India', t: 'Venture Capital', geo: 'India', match: 78, cost: 25, cheque: '₹5Cr – ₹30Cr', port: '400+', stages: 'Seed – Series A', tags: ['Seed - Series A','AI/ML','B2B SaaS'], c: '#334155', ini: 'm', unlocked: false,
      about: 'Matrix Partners India invests in early-stage companies across B2B, consumer, fintech and SaaS with a hands-on approach.', sectors: 'B2B SaaS, AI/ML, Fintech', pgeo: 'India', portc: '400+ (Ola, Razorpay, OfBusiness)', web: 'https://matrixpartners.in',
      why: ['AI/ML B2B SaaS portfolio','Backed OfBusiness in SME supply chain','Seed to Series A focus','Hands-on operating support'] },
    { id: 6, n: 'Sequoia Capital India', t: 'Venture Capital', geo: 'India, SEA', match: 76, cost: 30, cheque: '₹10Cr – ₹100Cr', port: '400+', stages: 'Seed – Series C', tags: ['Seed - Series C','B2B SaaS','Logistics'], c: '#14532d', ini: 'S', unlocked: false,
      about: 'Sequoia Capital India (Peak XV) is one of the most active venture firms in India and Southeast Asia, partnering with founders from seed to growth.', sectors: 'SaaS, Logistics, Consumer, Fintech', pgeo: 'India, Southeast Asia', portc: '400+ (Zomato, Byju\'s, Freshworks)', web: 'https://www.peakxv.com',
      why: ['Active across Seed to Series C','Large logistics portfolio','Strong SEA expansion support','AI-first thesis in 2026'] },
    { id: 7, n: 'Peak XV Partners', t: 'Growth VC', geo: 'India, SEA', match: 74, cost: 30, cheque: '₹20Cr – ₹150Cr', port: '350+', stages: 'Series A – Growth', tags: ['Series A - Growth','SaaS','Logistics'], c: '#7c2d12', ini: 'P', unlocked: false,
      about: 'Peak XV Partners backs category-defining companies in India and Southeast Asia from Series A to growth.', sectors: 'SaaS, Logistics, Fintech', pgeo: 'India, Southeast Asia', portc: '350+', web: 'https://www.peakxv.com',
      why: ['Growth capital for SEA expansion','Logistics thesis','SaaS depth','Active investor'] },
    { id: 8, n: 'Tiger Global', t: 'Growth VC', geo: 'Global', match: 71, cost: 30, cheque: '₹50Cr – ₹500Cr', port: '800+', stages: 'Series B – Growth', tags: ['Series B - Growth','SaaS','Global'], c: '#0f172a', ini: 'T', unlocked: false,
      about: 'Tiger Global is a global investment firm focused on internet, software and fintech companies across stages.', sectors: 'Software, Internet, Fintech', pgeo: 'Global', portc: '800+', web: 'https://www.tigerglobal.com',
      why: ['Global scale capital','Software depth','Fast decision making','India active'] },
    { id: 9, n: 'Nexus Venture Partners', t: 'Venture Capital', geo: 'India, US', match: 70, cost: 25, cheque: '₹5Cr – ₹40Cr', port: '150+', stages: 'Seed – Series B', tags: ['Seed - Series B','B2B SaaS','AI/ML'], c: '#1d4ed8', ini: 'N', unlocked: false,
      about: 'Nexus Venture Partners is a leading India-US venture fund investing in early-stage technology companies.', sectors: 'B2B SaaS, AI, Infra', pgeo: 'India, US', portc: '150+ (Postman, Delhivery, Zepto)', web: 'https://nexusvp.com',
      why: ['Backed Delhivery in logistics','India-US SaaS thesis','Seed to Series B','AI infrastructure focus'] },
    { id: 10, n: 'Chiratae Ventures', t: 'Venture Capital', geo: 'India', match: 68, cost: 25, cheque: '₹3Cr – ₹25Cr', port: '120+', stages: 'Seed – Series A', tags: ['Seed - Series A','Deep Tech','SaaS'], c: '#9f1239', ini: 'C', unlocked: false,
      about: 'Chiratae Ventures is a technology venture capital fund backing Indian startups across consumer, SaaS, deep tech and health.', sectors: 'Deep Tech, SaaS, Consumer', pgeo: 'India', portc: '120+ (Lenskart, Myntra, FirstCry)', web: 'https://chiratae.com',
      why: ['Deep tech & AI thesis','India SME focus','Seed to Series A','Strong network'] },
    { id: 11, n: 'Lightspeed India', t: 'Venture Capital', geo: 'India, SEA', match: 66, cost: 25, cheque: '₹5Cr – ₹60Cr', port: '180+', stages: 'Seed – Series B', tags: ['Seed - Series B','B2B','Logistics'], c: '#0369a1', ini: 'L', unlocked: false,
      about: 'Lightspeed India invests in early and growth-stage startups across consumer, enterprise and fintech.', sectors: 'Enterprise, Consumer, Logistics', pgeo: 'India, SEA', portc: '180+ (OYO, Udaan, ShareChat)', web: 'https://lsvp.com',
      why: ['Backed Udaan in B2B supply chain','Enterprise thesis','Series A lead capacity','SEA network'] },
    { id: 12, n: 'Kalaari Capital', t: 'Venture Capital', geo: 'India', match: 64, cost: 25, cheque: '₹2Cr – ₹20Cr', port: '100+', stages: 'Seed – Series A', tags: ['Seed - Series A','AI/ML','B2B'], c: '#4c1d95', ini: 'K', unlocked: false,
      about: 'Kalaari Capital is an early-stage, technology-focused venture capital firm based in Bangalore.', sectors: 'AI/ML, B2B, Consumer', pgeo: 'India', portc: '100+ (Dream11, Cure.fit)', web: 'https://kalaari.com',
      why: ['Bangalore-based early stage','AI/ML interest','B2B focus','Founder friendly'] }
  ],
  documents: [
    { n: 'TechNova_Pitch_Deck.pdf', type: 'PDF', size: '4.2 MB', date: '18 Mar 2026', time: '10:30 AM', primary: true },
    { n: 'TechNova_Teaser.pdf', type: 'PDF', size: '1.1 MB', date: '16 Mar 2026', time: '02:15 PM' },
    { n: 'Financial_Model.xlsx', type: 'XLSX', size: '1.8 MB', date: '12 Mar 2026', time: '04:20 PM' },
    { n: 'Product_Demo.mp4', type: 'MP4', size: '12.5 MB', date: '10 Mar 2026', time: '11:45 AM' },
    { n: 'Company_One_Pager.pdf', type: 'PDF', size: '0.9 MB', date: '8 Mar 2026', time: '01:10 PM' },
    { n: 'Incorporation_Certificate.pdf', type: 'PDF', size: '0.4 MB', date: '5 Mar 2026', time: '09:20 AM' },
    { n: 'Team_Bio.pdf', type: 'PDF', size: '1.2 MB', date: '2 Mar 2026', time: '05:30 PM' }
  ],
  transactions: [
    { d: '10 Oct 2026', t: '2:30 PM', type: 'Credit Purchase', desc: 'Purchased 500 credits (Starter Plan)', c: 500, bal: 750, ico: 'shopping-cart', col: 'blue' },
    { d: '10 Oct 2026', t: '1:15 PM', type: 'Investor Outreach', desc: 'Sent 10 personalized investor emails', c: -50, bal: 250, ico: 'send', col: 'violet' },
    { d: '9 Oct 2026', t: '4:40 PM', type: 'Unlock Contact', desc: 'Unlocked contact – Accel', c: -30, bal: 300, ico: 'users', col: 'amber' },
    { d: '8 Oct 2026', t: '11:20 AM', type: 'Pitch Deck Maker', desc: 'Generated AI pitch deck', c: -50, bal: 330, ico: 'file-text', col: 'blue' },
    { d: '7 Oct 2026', t: '3:15 PM', type: 'Teaser Maker', desc: 'Generated AI teaser', c: -20, bal: 380, ico: 'file', col: 'pink' },
    { d: '5 Oct 2026', t: '10:10 AM', type: 'Credit Purchase', desc: 'Welcome bonus credits', c: 400, bal: 400, ico: 'gift', col: 'green' }
  ],
  activity: [
    { ico: 'upload', col: 'blue', t: 'Pitch deck uploaded', d: 'Your deck "TechNova_Deck.pdf" has been analyzed.', tm: '2 hours ago' },
    { ico: 'sparkles', col: 'amber', t: 'Profile details extracted', d: 'AI has extracted 12 key details. Please verify.', tm: '3 hours ago' },
    { ico: 'target', col: 'green', t: '3 new investor matches found', d: 'Based on your updated profile.', tm: '5 hours ago' },
    { ico: 'file-check', col: 'violet', t: 'Teaser generated successfully', d: '"TechNova_Teaser.pdf" is ready for download.', tm: '1 day ago' },
    { ico: 'calendar', col: 'pink', t: 'Meeting scheduled', d: 'Call with Accel on 15 Oct 2026, 4:00 PM.', tm: '2 days ago' },
    { ico: 'send', col: 'teal', t: 'Outreach started', d: '"Series A Outreach – India & SEA" sent to 68 investors.', tm: '3 days ago' },
    { ico: 'coins', col: 'amber', t: 'Credits purchased', d: '500 credits added to your wallet.', tm: '4 days ago' }
  ],
  notifications: [
    { ico: 'mail', col: 'green', t: 'Y Combinator replied', d: '"Interested in a call" – Series A Outreach', tm: '10 min ago', unread: true },
    { ico: 'calendar', col: 'violet', t: 'Meeting reminder', d: 'Accel intro call tomorrow at 4:00 PM', tm: '1 hour ago', unread: true },
    { ico: 'target', col: 'blue', t: '3 new investor matches', d: 'Blume, Elevation and Matrix match your profile', tm: '5 hours ago', unread: true },
    { ico: 'file-check', col: 'pink', t: 'Teaser ready', d: 'TechNova_Teaser.pdf is ready to download', tm: '1 day ago' },
    { ico: 'coins', col: 'amber', t: 'Low credit alert', d: 'You have 250 credits left. Top up to keep outreaching.', tm: '2 days ago' }
  ],
  meetings: [
    { id: 1, with: 'Accel', who: 'Prayank Swaroop, Partner', title: 'Introductory Call', date: '15 Oct 2026', day: '15', mon: 'Oct', time: '4:00 PM – 4:30 PM', type: 'Google Meet', status: 'Confirmed', c: '#111827', ini: 'A' },
    { id: 2, with: 'Y Combinator', who: 'Visiting Partner', title: 'Office Hours', date: '18 Oct 2026', day: '18', mon: 'Oct', time: '9:30 PM – 10:00 PM', type: 'Zoom', status: 'Pending', c: '#f97316', ini: 'Y' },
    { id: 3, with: 'Matrix Partners India', who: 'Rajat Agarwal, MD', title: 'Deck walkthrough', date: '22 Oct 2026', day: '22', mon: 'Oct', time: '11:00 AM – 11:45 AM', type: 'Google Meet', status: 'Confirmed', c: '#334155', ini: 'm' },
    { id: 4, with: 'Sedana Team', who: 'Onboarding specialist', title: 'Platform demo & strategy', date: '8 Oct 2026', day: '08', mon: 'Oct', time: '3:00 PM – 3:30 PM', type: 'Google Meet', status: 'Completed', c: '#2f5bea', ini: 'S' }
  ],
  campaigns: [
    { id: 1, n: 'Series A Outreach', d: 'Targeting Series A investors in India & SEA', tags: ['Series A','India, SEA','120 Investors'], sent: 68, total: 120, status: 'Active', replies: 18, meetings: 7 },
    { id: 2, n: 'Logistics & Supply Chain VCs', d: 'Sector focused outreach for logistics VCs', tags: ['Seed - Series B','Global','80 Investors'], sent: 32, total: 80, status: 'Active', replies: 9, meetings: 3 },
    { id: 3, n: 'Follow-up Outreach', d: 'Follow-ups for previous outreach', tags: ['All Stages','Global','60 Investors'], sent: 45, total: 60, status: 'Paused', replies: 5, meetings: 2 }
  ],
  outreachLog: [
    { inv: 'Y Combinator', ini: 'Y', c: '#f97316', ch: 'Email', camp: 'Series A Outreach', st: 'Replied', resp: 'Interested in a call', d: '10 Oct 2026', t: '2:30 PM' },
    { inv: 'Accel', ini: 'A', c: '#111827', ch: 'LinkedIn', camp: 'Logistics VCs', st: 'Meeting Scheduled', resp: 'Meeting on 15 Oct', d: '9 Oct 2026', t: '5:10 PM' },
    { inv: 'Matrix Partners', ini: 'm', c: '#334155', ch: 'Email', camp: 'Series A Outreach', st: 'Replied', resp: 'Requested deck', d: '8 Oct 2026', t: '11:20 AM' },
    { inv: 'Sequoia Capital', ini: 'S', c: '#14532d', ch: 'LinkedIn', camp: 'Follow-up Outreach', st: 'Not Interested', resp: 'Not a current focus', d: '7 Oct 2026', t: '4:45 PM' },
    { inv: 'Peak XV', ini: 'P', c: '#7c2d12', ch: 'Email', camp: 'Logistics VCs', st: 'Opened', resp: '-', d: '6 Oct 2026', t: '3:15 PM' },
    { inv: 'Tiger Global', ini: 'T', c: '#0f172a', ch: 'LinkedIn', camp: 'Series A Outreach', st: 'No Response', resp: '-', d: '5 Oct 2026', t: '1:40 PM' }
  ],
  creations: [
    { n: 'TechNova Pitch Deck v2', t: 'Pitch Deck · 12 slides', tm: '2 hours ago', th: '' },
    { n: 'Investor Teaser – Clean', t: 'Teaser · 1 page', tm: '1 day ago', th: 'light' },
    { n: 'Logistics Sector Deck', t: 'Pitch Deck · 14 slides', tm: '3 days ago', th: 'dark' },
    { n: 'Series A Teaser', t: 'Teaser · 1 page', tm: '5 days ago', th: 'pink' }
  ],
  templates: ['Modern Clean','Minimal','Dark Professional','Investor Focused','Data Driven','Indian Market','SaaS Style','Bold Gradient'],
  plans: [
    { id: 'starter', n: 'Starter', cr: 500, pr: 2999, d: 'Best for early stage startups', pop: true },
    { id: 'growth', n: 'Growth', cr: 1500, pr: 7999, d: 'Most popular for active users' },
    { id: 'scale', n: 'Scale', cr: 5000, pr: 19999, d: 'For high volume outreach & campaigns' }
  ]
};

const STARTUP_TYPES = {
  pre: { label: 'Pre-revenue', rev: 'No revenue yet', icon: 'rocket', col: 'violet', desc: 'Building the product, validating the idea or in early pilots.', pts: ['Idea / MVP / early pilots','Raise Pre-Seed or Seed','Matched with angels & micro-VCs'] },
  medium: { label: 'Medium size', rev: '₹50 Lakh – ₹5 Cr revenue', icon: 'trending-up', col: 'blue', desc: 'Product-market fit found and revenue growing month over month.', pts: ['Growing MRR / ARR','Raise Seed to Series A','Matched with VCs & growth funds'] },
  established: { label: 'Established', rev: '> ₹5 Cr revenue', icon: 'building-2', col: 'green', desc: 'Scaling operations with proven unit economics.', pts: ['Strong revenue & margins','Raise Series A and beyond','Matched with growth & strategic investors'] }
};

/* light persistence */
function saveState(){ try{ localStorage.setItem('sedana_state', JSON.stringify({ credits: DB.credits, startup: DB.startup, user: DB.user, unlocked: DB.investors.filter(i=>i.unlocked).map(i=>i.id) })); }catch(e){} }
function loadState(){ try{ const s = JSON.parse(localStorage.getItem('sedana_state')||'null'); if(!s) return; DB.credits = s.credits ?? DB.credits; Object.assign(DB.startup, s.startup||{}); Object.assign(DB.user, s.user||{}); (s.unlocked||[]).forEach(id=>{ const i=DB.investors.find(x=>x.id===id); if(i) i.unlocked=true; }); }catch(e){} }
loadState();
