/* =========================================================
   Content for the portfolio — every fact here comes from
   Akshara's résumés, certificates, GitHub or Haveloc profile.
   Edit this file to update the site.
   ========================================================= */
window.SITE = (() => {
  const W = 'assets/w/';
  const GH = 'https://github.com/aksharaagarwal21/';

  /* ---------- Projects ---------- */
  const projects = [
    { id: 'seatsync', title: 'SeatSync', line: 'Ticket booking built on one guarantee: two people can never book the same seat.', cat: 'Full Stack', year: 2026,
      stack: ['Java', 'Spring Boot', 'React', 'PostgreSQL', 'Docker', 'GitHub Actions'], gh: GH + 'SeatSync', img: W + 'seatsync-seat-selection.webp', case: '#f-seatsync', row: true },
    { id: 'paclab', title: 'PAC-LAB', line: 'A gamified virtual ML lab: ten algorithms you learn by playing them.', cat: 'AI / ML · Full Stack', year: 2026,
      stack: ['React', 'Node.js', 'MySQL', 'Machine Learning', 'Vercel'], gh: GH + 'Pac-lab---Gamified-Virtual-Machine-Learning', live: 'https://pac-lab-steel.vercel.app/', img: W + 'paclab-d.webp', mob: W + 'paclab-m.webp', case: '#f-paclab', row: true },
    { id: 'stockout', title: 'Stockout Forecasting', line: 'Recovering demand hidden by empty shelves: 12–21% lower simulated ordering cost.', cat: 'Research · Data', year: 2026,
      stack: ['Python', 'LightGBM', 'PyTorch', 'Data Analytics'], gh: GH + 'stockout-aware-demand-forecasting', img: W + 'profile-stockout.webp', row: true },
    { id: 'bloodwing', title: 'Bloodwing', line: 'Mental-health platform with a RAG companion that detects crisis messages.', cat: 'Gen AI · Full Stack', year: 2026,
      stack: ['React', 'FastAPI', 'MongoDB', 'RAG', 'LLMs', 'Vercel'], gh: GH + 'Mental-Health-Care-Web', live: 'https://bloodwing-mentalcare.vercel.app/', img: W + 'bloodwing-d.webp', mob: W + 'bloodwing-m.webp', case: '#f-bloodwing', row: true },
    { id: 'aimatch', title: 'AI Match Maker', line: 'Embedding-based expert matching with LLM jargon translation. Foundathon 2026.', cat: 'Gen AI', year: 2026,
      stack: ['Python', 'FastAPI', 'LangChain', 'LLMs', 'Next.js'], gh: GH + 'ai-match-maker', img: W + 'poster-aimatch.webp', row: true },
    { id: 'facemask', title: 'Face Mask Detection', line: 'Real-time 3-class mask compliance from image, video or webcam.', cat: 'AI / ML', year: 2026,
      stack: ['Python', 'TensorFlow', 'OpenCV', 'Flask'], gh: GH + 'Face-mask-detection', img: W + 'poster-facemask.webp', row: true },
    { id: 'posture', title: 'PostureVision', line: 'In-browser pose tracking with joint-angle posture analysis and rep counting.', cat: 'AI / ML', year: 2026,
      stack: ['MediaPipe', 'OpenCV', 'Machine Learning'], gh: GH + 'PostureVision', img: W + 'poster-posture.webp', row: true },
    { id: 'deepscholar', title: 'DeepScholar AI', line: 'A research assistant built phase by phase, toward agentic retrieval.', cat: 'Agentic AI · Research', year: 2026,
      stack: ['Python', 'LLMs', 'RAG', 'Agents'], gh: GH + 'DeepScholarAI', img: W + 'poster-deepscholar.webp', row: true },
    { id: 'rfid', title: 'RFID Smart Campus', line: 'Attendance, exams, mess and security running on live RFID scans.', cat: 'Full Stack · IoT', year: 2025,
      stack: ['Node.js', 'MongoDB', 'React'], gh: GH + 'RFIDManagement', live: 'https://frontendddd-seven.vercel.app', img: W + 'rfid-d.webp', mob: W + 'rfid-m.webp', row: true },
    { id: 'smarthome', title: 'Smart Home Monitor', line: 'ESP32 sensor simulator driving lights, relay and buzzer.', cat: 'IoT', year: 2026,
      stack: ['IoT', 'Vercel'], gh: GH + 'Smart-home-automation-monitor', live: 'https://smart-home-automation-monitor.vercel.app', img: W + 'smarthome-d.webp', mob: W + 'smarthome-m.webp', row: true },

    { id: 'wastevision', title: 'WasteVision AI', line: 'MobileNetV2 CNN sorting waste into six classes with a live dashboard.', cat: 'AI / ML', year: 2026,
      stack: ['Python', 'TensorFlow', 'Machine Learning'], gh: GH + 'wastevision-ai', img: W + 'poster-waste.webp' },
    { id: 'fraud', title: 'FraudShield AI', line: 'Transaction graphs, fraud alerts and ML vs GNN model comparison.', cat: 'AI / ML · Data', year: 2026,
      stack: ['Machine Learning', 'Data Analytics'], gh: GH + 'Smart-Credit-Card-Fraud-Detection', img: W + 'poster-fraud.webp' },
    { id: 'skillforge', title: 'SkillForge', line: 'Skill-assessment platform with timed tests, courses and certificates.', cat: 'Frontend', year: 2026,
      stack: ['React', 'TypeScript', 'Vercel'], gh: GH + 'Learningapp_UI', live: 'https://learningapp-ui.vercel.app', img: W + 'skillforge-d.webp', mob: W + 'skillforge-m.webp' },
    { id: 'railmedic', title: 'RailMedic', line: 'Rail medical-emergency response prototype with four role dashboards.', cat: 'Frontend', year: 2026,
      stack: ['React', 'Vercel'], gh: GH + 'Medical-care-System', live: 'https://medical-care-system-ruddy.vercel.app', img: W + 'railmedic-d.webp', mob: W + 'railmedic-m.webp' },
    { id: 'ignisia', title: 'IGNISIA 2025', line: 'Event site for the GeeksforGeeks SRMIST placement & DSA workshop.', cat: 'Community', year: 2026,
      stack: ['React', 'Vercel'], gh: GH + 'Event2-Frontend', live: 'https://event2-frontend.vercel.app', img: W + 'ignisia-d.webp', mob: W + 'ignisia-m.webp' },
    { id: 'educonnect', title: 'EduConnect', line: 'Learning app with quizzes, leaderboards and Hindi/Telugu support.', cat: 'Frontend', year: 2025,
      stack: ['React', 'TypeScript', 'Vercel'], gh: GH + 'EduConnect', live: 'https://edu-connect-amber-nine.vercel.app', img: W + 'educonnect-d.webp', mob: W + 'educonnect-m.webp' },
    { id: 'blogspace', title: 'BlogSpace', line: 'Full-stack blogging with JWT + Google OAuth, comments and likes.', cat: 'Full Stack', year: 2025,
      stack: ['React', 'Node.js', 'MongoDB'], gh: GH + 'blogspace-1', live: 'https://blogspace-1-one.vercel.app', img: W + 'blogspace-d.webp', mob: W + 'blogspace-m.webp' },
    { id: 'javaverse', title: 'Java Verse', line: 'Website for a coding event: React, Tailwind and Framer Motion.', cat: 'Community', year: 2026,
      stack: ['React', 'Vercel'], gh: GH + 'Event-Frontend', live: 'https://event-frontend-six-zeta.vercel.app', img: W + 'javaverse-d.webp', mob: W + 'javaverse-m.webp' }
  ];

  /* ---------- 01 / Currently building (reels) ---------- */
  const stories = [
    { key: ['BUILDING', 'AI SYSTEMS'], desc: 'Embedding expert profiles with MiniLM, ranking by cosine similarity, and letting Gemini + LangChain translate jargon between domains.',
      tag: 'AI MATCH MAKER · FOUNDATHON', year: '2026', tech: 'FastAPI · LangChain · Gemini', visual: { type: 'img', src: W + 'poster-aimatch.webp', pos: '72% 50%' } },
    { key: ['EXPERIMENTING', 'WITH AGENTS'], desc: 'Three local LLMs (7B–8B) on Dockerised Ollama, wired to n8n and PostgreSQL. 20+ workflow steps automated, 95% success on 1,000+ test requests.',
      tag: 'BRAINMINT · BEST INTERN', year: '2025–26', tech: 'n8n · Ollama · Docker · PostgreSQL', visual: { type: 'flow' } },
    { key: ['TRAINING', 'ML MODELS'], desc: 'Quantile LightGBM with conformal calibration on 4.5M retail rows, against TimesNet, TFT and Kaplan–Meier baselines.',
      tag: 'STOCKOUT RESEARCH', year: '2026', tech: 'LightGBM · PyTorch · pandas', visual: { type: 'img', src: W + 'profile-stockout.webp', pos: '50% 50%', contain: true } },
    { key: ['SHIPPING', 'FULL STACK'], desc: 'Optimistic + pessimistic locking, a live seat map over SSE, emailed two-step verification. 100 concurrent requests for one seat: exactly one wins.',
      tag: 'SEATSYNC', year: '2026', tech: 'Spring Boot · React · PostgreSQL', visual: { type: 'img', src: W + 'seatsync-seat-selection.webp', pos: '30% 60%' } },
    { key: ['LEARNING', 'DEVOPS'], desc: 'Dockerised services, GitHub Actions CI, Vercel deploys with hosted MySQL, a daily cron health check. Straight from my commit log.',
      tag: 'SHIP IT', year: '2026', tech: 'Docker · GitHub Actions · Vercel', visual: { type: 'log' } },
    { key: ['LEADING', 'TEAMS'], desc: 'Led four interns through 5+ client AI/ML projects with 100% on-time delivery. Now Technical Director of the GeeksforGeeks club at SRM.',
      tag: 'CURIOUS WINGS · GFG SRMIST', year: '2025–26', tech: 'Scoping · Reviews · Releases', visual: { type: 'img', src: W + 'presenting.webp', pos: '55% 40%' } },
    { key: ['RESEARCHING', 'BETTER SYSTEMS'], desc: 'Clear baselines, honest evaluation, protocols locked before final scoring. Building DeepScholar AI phase by phase toward agentic retrieval.',
      tag: 'DEEPSCHOLAR AI', year: '2026', tech: 'LLMs · RAG · Agents', visual: { type: 'img', src: W + 'techtalk.webp', pos: '50% 30%' } }
  ];

  /* ---------- 03 / Toolbox constellation ---------- */
  const tech = {
    'Python': ['Stockout Forecasting', 'Face Mask Detection', 'AI Match Maker', 'DeepScholar AI', 'WasteVision AI'],
    'Java': ['SeatSync', 'EnterpriseFlow (résumé)', 'TrackBuddy (résumé)'],
    'Spring Boot': ['SeatSync', 'JobPortal', 'EnterpriseFlow (résumé)'],
    'React': ['SeatSync', 'PAC-LAB', 'Bloodwing', 'RFID Smart Campus', 'SkillForge'],
    'Next.js': ['AI Match Maker', 'Mental Health Companion'],
    'Node.js': ['PAC-LAB', 'RFID Smart Campus', 'BlogSpace', 'University ERP'],
    'FastAPI': ['AI Match Maker', 'Bloodwing'],
    'Machine Learning': ['PAC-LAB', 'FraudShield AI', 'MineSafe AI', 'EcoSoil AI'],
    'TensorFlow': ['Face Mask Detection', 'WasteVision AI'],
    'PyTorch': ['Stockout Forecasting (TimesNet · TFT baselines)'],
    'OpenCV': ['Face Mask Detection', 'Smart Attendance'],
    'MediaPipe': ['PostureVision'],
    'LightGBM': ['Stockout Forecasting'],
    'LLMs': ['Bloodwing', 'AI Match Maker', 'DeepScholar AI', 'BrainMint automations'],
    'RAG': ['Bloodwing', 'Mental Health Companion'],
    'Agents': ['BrainMint automations', 'DeepScholar AI'],
    'LangChain': ['AI Match Maker', 'Mental Health Companion'],
    'n8n': ['BrainMint automations'],
    'Docker': ['SeatSync', 'BrainMint automations'],
    'GitHub Actions': ['SeatSync CI', 'GitHub profile stats'],
    'Git / GitHub': ['43 public repositories'],
    'Linux': ['Dockerised services'],
    'Vercel': ['PAC-LAB', 'Bloodwing', 'SkillForge', 'IGNISIA 2025'],
    'SQL': ['Saila Shipping data work', 'University ERP'],
    'PostgreSQL': ['SeatSync', 'BrainMint automations'],
    'MySQL': ['PAC-LAB', 'JobPortal', 'University ERP'],
    'MongoDB': ['Bloodwing', 'RFID Smart Campus', 'BlogSpace'],
    'Kafka': ['EnterpriseFlow (résumé)', 'TrackBuddy (résumé)'],
    'Data Analytics': ['Stockout Forecasting', 'Saila Shipping · 15k+ records', 'FraudShield AI']
  };

  /* ---------- Timeline ---------- */
  const timeline = [
    { year: '2024', title: 'STARTED BUILDING', lead: 'Class XII at DPS Ranchi (90%), then B.Tech CSE with Big Data Analytics at SRM IST, Chennai.',
      items: [['edu', 'Joined SRM IST · CSE (Big Data Analytics)'], ['edu', 'DPS Ranchi · Class XII · 90%'], ['edu', 'DAV Simdega · Class X · 92.8%']], photos: [W + 'd-shelves.webp'] },
    { year: '2025', title: 'ML / DATA / FULL STACK', lead: 'The first public repos, the first internship, and the first leadership roles.',
      items: [['project', 'BlogSpace · EduConnect · RFID Smart Campus'], ['work', 'AI/ML Intern at BrainMint (Oct)'], ['award', 'Best Performer of the Month · A++'], ['lead', 'Technical Director · GeeksforGeeks SRMIST'], ['lead', 'Corporate Member · PLACFV'], ['lead', 'AARUUSH CSI fresher enrolment volunteer']],
      photos: [W + 'cert-brainmint-best-performer.webp', W + 'cert-brainmint-internship.webp'] },
    { year: '2026', title: 'AI / AGENTS / RESEARCH / DEVOPS', lead: 'Team lead, research, and a lot of shipping. CGPA 9.94.',
      items: [['work', 'AI/ML Team Lead at Curious Wings (Feb–May)'], ['project', 'AI Match Maker · Foundathon 2026'], ['lead', 'Qeagle hiring desk · Internship Fair'], ['work', 'Data Management Intern · Saila Shipping (May–Jul)'], ['project', 'SeatSync · PAC-LAB · Stockout research'], ['award', 'Client Appreciation Letter · Curious Wings'], ['award', '₹76,875 performance scholarship (granted Jan)']],
      photos: [W + 'cert-curious-wings-internship.webp', W + 'presenting.webp', W + 'cert-curious-wings-appreciation.webp'] }
  ];

  /* ---------- Achievements wall ---------- */
  const wall = [
    { t: 'img', src: W + 'cert-brainmint-best-performer.webp', cap: 'Best Performer · BrainMint' },
    { t: 'txt', big: '9.94', cap: 'CGPA · SRM IST' },
    { t: 'txt', big: 'TOP 5', cap: 'Tech Mesh Futurix Hackathon' },
    { t: 'img', src: W + 'cert-curious-wings-internship.webp', cap: 'AI & ML Team Lead · Curious Wings' },
    { t: 'txt', big: 'TOP 7', cap: 'HACKCELER8 · national finalist' },
    { t: 'txt', big: '₹76,875', cap: 'Performance scholarship · SRM' },
    { t: 'img', src: W + 'cert-curious-wings-appreciation.webp', cap: 'Client appreciation letter' },
    { t: 'txt', big: 'JUDGE', cap: 'HACKIT Hackathon · SRMIST' },
    { t: 'txt', big: 'TOP 100', cap: 'Schneider HMI Innovation Marathon' },
    { t: 'img', src: W + 'cert-brainmint-internship.webp', cap: 'AI/ML internship · grade A++' },
    { t: 'txt', big: 'GFG', cap: 'Technical Director · SRMIST club' },
    { t: 'txt', big: 'NPTEL', cap: 'DBMS · Advanced OOP' },
    { t: 'img', src: W + 'techtalk.webp', cap: 'Presenting at SRM' },
    { t: 'txt', big: '100+', cap: 'Students in placement drives · PLACFV' },
    { t: 'txt', big: '5+', cap: 'Client projects deployed & sold' },
    { t: 'img', src: W + 'd-pitch.webp', cap: 'Pitching in Computing Lab A' }
  ];

  /* ---------- Photo reel ---------- */
  const polaroids = [
    { src: W + 'presenting.webp', cap: 'computing lab A, mid-pitch' },
    { src: W + 'bookstore.webp', cap: 'the bookstore detour' },
    { src: W + 'd-stack.webp', cap: 'somewhere between debugging and coffee' },
    { src: W + 'candid.webp', cap: 'off-duty (briefly)' },
    { src: W + 'cert-brainmint-best-performer.webp', cap: 'another idea that somehow became a project' }
  ];
  const film = [
    { src: W + 'ignisia-d.webp', cap: 'IGNISIA 2025 · GFG SRMIST' },
    { src: W + 'presenting.webp', cap: 'the pitch' },
    { src: W + 'paclab-d.webp', cap: 'PAC-LAB, live' },
    { src: W + 'd-labsign.webp', cap: 'computing lab A' },
    { src: W + 'seatsync-admin-overview.webp', cap: 'SeatSync admin' },
    { src: W + 'bookstore.webp', cap: 'weekend' },
    { src: W + 'javaverse-d.webp', cap: 'Java Verse event site' },
    { src: W + 'techtalk.webp', cap: 'the stack slide' },
    { src: W + 'smarthome-d.webp', cap: 'ESP32 dashboard' },
    { src: W + 'candid.webp', cap: 'somewhere in Chennai' }
  ];
  const hoverWords = [
    { w: 'HACKATHONS', src: W + 'techtalk.webp', note: 'Top 5 · Top 7 · Top 100 · a judge\'s seat' },
    { w: 'RESEARCH', src: W + 'profile-stockout.webp', note: 'stockout-aware forecasting' },
    { w: 'BUILDING', src: W + 'seatsync-admin-overview.webp', note: '43 public repos' },
    { w: 'CLUB', src: W + 'ignisia-d.webp', note: 'GeeksforGeeks · SRMIST' },
    { w: 'LATE NIGHTS', src: W + 'paclab-d.webp', note: 'the arcade I built for ML' },
    { w: 'LEARNING', src: W + 'bookstore.webp', note: 'the bookstore detour' }
  ];
  const scatter = [
    { src: W + 'presenting.webp', x: 6, y: 4, w: 22, r: -8, d: 1.4, z: 3 },
    { src: W + 'paclab-m.webp', x: 72, y: 0, w: 14, r: 7, d: .6, z: 1 },
    { src: W + 'bookstore.webp', x: 58, y: 38, w: 24, r: 5, d: 1.8, z: 3 },
    { src: W + 'd-labsign.webp', x: 2, y: 52, w: 20, r: 6, d: .8, z: 1 },
    { src: W + 'bloodwing-m.webp', x: 34, y: 62, w: 13, r: -6, d: 1.2, z: 3 },
    { src: W + 'seatsync-events.webp', x: 30, y: 8, w: 24, r: 3, d: .5, z: 1 },
    { src: W + 'candid.webp', x: 82, y: 58, w: 15, r: -10, d: 1.6, z: 3 },
    { src: W + 'ignisia-m.webp', x: 48, y: 82, w: 12, r: 9, d: .9, z: 1 }
  ];

  const statuses = ['probably coding.', 'probably debugging.', 'probably building something unnecessary but cool.', 'probably reading a README.', 'probably renaming a variable for the fourth time.', 'probably in a placement drive.'];

  return { projects, stories, tech, timeline, wall, polaroids, film, hoverWords, scatter, statuses, GH };
})();
