const SP = `You are BC CourseFinder™, a premium AI career guidance assistant for Belgium Campus iTversity in South Africa. Help Matric (Grade 12) students make informed IT study decisions.

SCOPE: Only assist with IT career paths, Belgium Campus programmes, Matric subject prerequisites, skills for IT careers, diploma/degree differences, learnerships/internships in SA, and comparing IT fields.

OUT OF SCOPE: If asked anything unrelated, politely explain your focus and redirect.

ETHICS: Never guarantee employment. Be warm and encouraging. Recommend a Belgium Campus advisor for personalised decisions. Be inclusive and supportive regardless of background.

TONE: Friendly, encouraging, clear for 17-18 year old South African Matric students. Use **bold** and bullet points for readability.

KNOWLEDGE BASE:

PROGRAMMES AT BELGIUM CAMPUS:
- Higher Certificate in IT (NQF 5) - 1 year, foundation level, articulates to diploma
- Diploma in IT (NQF 6) - 3 years, practical and vocational
- BSc in IT (NQF 7) - 3-year degree, theoretical + practical
Specialisations: Software Development, Data Science, Network Engineering, Cybersecurity, Cloud Computing, UI/UX Design

MATRIC REQUIREMENTS:
- **Pure Mathematics** (NOT Mathematical Literacy) required for BSc IT and Diploma IT
- English Home or First Additional Language required
- Physical Science beneficial for networking/hardware fields
- APS requirements vary - contact Belgium Campus for exact scores

MATHS vs MATHEMATICAL LITERACY:
- Pure Maths: Required for most IT programmes. Covers algebra, calculus, trigonometry, statistics - builds the analytical thinking IT demands.
- Mathematical Literacy: NOT accepted for BSc IT or Diploma IT at Belgium Campus. Students with Math Lit should seriously consider upgrading or exploring a Higher Certificate as a bridge.

DIPLOMA vs DEGREE:
- Higher Certificate (NQF 5, 1 yr): Foundation; stepping stone to diploma
- Diploma (NQF 6, 3 yrs): Practical and workplace-ready; respected across SA's IT industry
- BSc Degree (NQF 7, 3 yrs): Academic breadth; required for postgrad, senior roles, management, and research
- Both are valued in SA; degrees open more long-term doors

CAREERS WITH MATHS & PHYSICAL SCIENCE:
Software Developer, Software Engineer, Data Scientist, Data Analyst, Network Engineer, Cybersecurity Analyst, Cloud Architect, Systems Analyst, AI/ML Engineer, Database Administrator, DevOps Engineer, IT Project Manager

SKILLS FOR SOFTWARE DEVELOPMENT:
- Technical: Python, Java, JavaScript, C#, HTML/CSS, Data Structures & Algorithms, Git/GitHub, SQL, REST APIs, SDLC, problem-solving
- Soft skills: Logical thinking, attention to detail, teamwork, communication, continuous learning mindset, resilience

IT FIELD COMPARISONS:
- Software Development: Building apps, websites, systems. Creative + logical. Very high global demand.
- Data Science: Analysing datasets, ML models. Requires strong maths. One of the fastest-growing fields worldwide.
- Network Engineering: Network and IT infrastructure. Hardware-focused. Cisco (CCNA) and CompTIA certifications.
- Cybersecurity: Protecting systems, ethical hacking, digital forensics. Rapidly growing in SA.
- Cloud Computing: AWS, Azure, Google Cloud. Extremely high demand globally.

LEARNERSHIPS & INTERNSHIPS:
- MICT SETA IT learnerships - paid experience combining theory and workplace learning
- Belgium Campus Work-Integrated Learning (WIL) is built into programmes
- SA companies: Standard Bank, Capitec, Discovery, Accenture, EOH offer graduate programmes
- Check belgium.ac.za and mict.org.za

Always end with encouragement and invite follow-up questions.`;

let hist = [];
let busy = false;
let activePathKey = null;

const PATHS = {
  software: {
    title: "Software Development",
    tagline: "Build apps, websites, and systems people use every day.",
    accent: "teal",
    ask: "I want to go into Software Development. Please explain what I do day-to-day, what I should learn first in Grade 12, and which Belgium Campus programme fits me best.",
    illus: `
      <svg viewBox="0 0 520 220" width="520" height="220" aria-hidden="true">
        <defs>
          <linearGradient id="sdg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="#0DC4BE" stop-opacity=".95" />
            <stop offset="1" stop-color="#0898A0" stop-opacity=".85" />
          </linearGradient>
        </defs>
        <rect x="16" y="22" width="310" height="176" rx="26" fill="rgba(255,255,255,.72)" stroke="rgba(13,196,190,.28)"/>
        <rect x="340" y="40" width="164" height="140" rx="26" fill="rgba(13,196,190,.10)" stroke="rgba(13,196,190,.24)"/>
        <path d="M56 80h210" stroke="rgba(17,18,20,.10)" stroke-width="10" stroke-linecap="round"/>
        <path d="M56 110h170" stroke="rgba(17,18,20,.09)" stroke-width="10" stroke-linecap="round"/>
        <path d="M56 140h190" stroke="rgba(17,18,20,.08)" stroke-width="10" stroke-linecap="round"/>
        <path d="M84 168l38-38 26 26 66-66" fill="none" stroke="url(#sdg)" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
        <rect x="364" y="64" width="116" height="20" rx="10" fill="rgba(196,24,112,.16)"/>
        <rect x="364" y="96" width="92" height="20" rx="10" fill="rgba(13,196,190,.18)"/>
        <rect x="364" y="128" width="106" height="20" rx="10" fill="rgba(196,24,112,.12)"/>
      </svg>
    `,
    sections: [
      { h: "What you do", items: ["Design and build websites, apps, and software features", "Fix bugs and improve performance", "Work in teams using Git and project boards", "Test your work and deploy updates"] },
      { h: "Skills you’ll need", items: ["Programming (start with Python or JavaScript)", "Problem-solving + logical thinking", "Databases (SQL basics)", "Git/GitHub, teamwork, communication"] },
      { h: "Good Matric subjects", items: ["Pure Mathematics (strongly recommended)", "English (for reading/writing specs)", "Physical Science (nice-to-have)"] },
      { h: "Careers you can grow into", items: ["Software Developer / Engineer", "Web Developer", "Mobile App Developer", "QA / Test Automation", "UI Engineer"] }
    ],
    roadmap: ["Start: HTML + CSS basics (build a simple portfolio page)", "Then: JavaScript fundamentals + small projects", "Add: Git/GitHub + deploy a site", "Next: Learn Python or C# + SQL basics"]
  },
  data: {
    title: "Data Science",
    tagline: "Use data to find patterns, build models, and make decisions.",
    accent: "pink",
    ask: "I want to go into Data Science. Please explain what I do day-to-day, how important Maths is, what I should learn first, and which Belgium Campus programme fits me.",
    illus: `
      <svg viewBox="0 0 520 220" width="520" height="220" aria-hidden="true">
        <defs>
          <linearGradient id="dsg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="#C41870" stop-opacity=".95" />
            <stop offset="1" stop-color="#0DC4BE" stop-opacity=".75" />
          </linearGradient>
        </defs>
        <rect x="18" y="22" width="484" height="176" rx="30" fill="rgba(255,255,255,.72)" stroke="rgba(196,24,112,.22)"/>
        <path d="M74 164V86" stroke="rgba(17,18,20,.12)" stroke-width="12" stroke-linecap="round"/>
        <path d="M136 164V64" stroke="rgba(17,18,20,.11)" stroke-width="12" stroke-linecap="round"/>
        <path d="M198 164V110" stroke="rgba(17,18,20,.10)" stroke-width="12" stroke-linecap="round"/>
        <path d="M260 164V50" stroke="rgba(17,18,20,.11)" stroke-width="12" stroke-linecap="round"/>
        <path d="M322 164V92" stroke="rgba(17,18,20,.10)" stroke-width="12" stroke-linecap="round"/>
        <path d="M104 128c30-40 66-60 98-40s48 60 98 52 76-50 126-74" fill="none" stroke="url(#dsg)" stroke-width="10" stroke-linecap="round"/>
        <circle cx="104" cy="128" r="8" fill="rgba(13,196,190,.55)"/>
        <circle cx="202" cy="88" r="8" fill="rgba(196,24,112,.6)"/>
        <circle cx="300" cy="140" r="8" fill="rgba(13,196,190,.45)"/>
        <circle cx="426" cy="78" r="8" fill="rgba(196,24,112,.5)"/>
      </svg>
    `,
    sections: [
      { h: "What you do", items: ["Clean and analyse datasets", "Build dashboards or predictive models", "Explain findings to non-technical people", "Test models and improve accuracy over time"] },
      { h: "Skills you’ll need", items: ["Python (Pandas) + spreadsheets", "Statistics + basic probability", "SQL + data visualisation", "Clear communication and critical thinking"] },
      { h: "Good Matric subjects", items: ["Pure Mathematics (very important)", "Physical Science (helps with problem-solving)", "English (for reporting)"] },
      { h: "Careers you can grow into", items: ["Data Analyst", "Data Scientist", "BI Analyst", "Machine Learning Engineer (later)", "AI/ML Specialist (later)"] }
    ],
    roadmap: ["Start: Excel/Sheets basics + charts", "Then: Python basics + Pandas", "Add: SQL (SELECT, JOIN, GROUP BY)", "Next: Intro stats + a small data project (e.g., SA youth unemployment dataset)"]
  },
  networking: {
    title: "Networking",
    tagline: "Build and manage the networks that keep organisations connected.",
    accent: "teal",
    ask: "I want to go into Networking. Please explain what network engineers do, what I should learn first, and which Belgium Campus programme fits.",
    illus: `
      <svg viewBox="0 0 520 220" width="520" height="220" aria-hidden="true">
        <rect x="18" y="22" width="484" height="176" rx="30" fill="rgba(255,255,255,.72)" stroke="rgba(13,196,190,.22)"/>
        <rect x="74" y="70" width="96" height="64" rx="18" fill="rgba(13,196,190,.10)" stroke="rgba(13,196,190,.28)"/>
        <rect x="350" y="70" width="96" height="64" rx="18" fill="rgba(196,24,112,.08)" stroke="rgba(196,24,112,.20)"/>
        <rect x="212" y="118" width="96" height="64" rx="18" fill="rgba(17,18,20,.04)" stroke="rgba(17,18,20,.10)"/>
        <path d="M170 102h42" stroke="rgba(13,196,190,.65)" stroke-width="10" stroke-linecap="round"/>
        <path d="M308 102h42" stroke="rgba(196,24,112,.55)" stroke-width="10" stroke-linecap="round"/>
        <path d="M260 118V102" stroke="rgba(17,18,20,.10)" stroke-width="10" stroke-linecap="round"/>
        <path d="M260 182V166" stroke="rgba(17,18,20,.10)" stroke-width="10" stroke-linecap="round"/>
        <circle cx="122" cy="102" r="8" fill="rgba(13,196,190,.75)"/>
        <circle cx="398" cy="102" r="8" fill="rgba(196,24,112,.6)"/>
        <circle cx="260" cy="150" r="8" fill="rgba(13,196,190,.45)"/>
      </svg>
    `,
    sections: [
      { h: "What you do", items: ["Set up and troubleshoot Wi‑Fi, routers, switches, and firewalls", "Monitor network performance and outages", "Secure networks and manage access", "Document configurations and backups"] },
      { h: "Skills you’ll need", items: ["Basic networking (IP, DNS, routing)", "Linux basics", "Security fundamentals", "Careful troubleshooting + patience"] },
      { h: "Good Matric subjects", items: ["Pure Mathematics (recommended)", "Physical Science (helpful)", "English (documentation)"] },
      { h: "Careers you can grow into", items: ["Network Engineer", "Systems Administrator", "IT Support (start)", "Network Security Engineer (later)", "Cloud Network Engineer (later)"] }
    ],
    roadmap: ["Start: learn how the internet works (IP, DNS, Wi‑Fi)", "Then: build a small home lab (router settings + VLAN concepts)", "Add: Linux basics + command line", "Next: intro certifications (CCNA/CompTIA-style topics)"]
  },
  cyber: {
    title: "Cybersecurity",
    tagline: "Protect systems, networks, and people from cyber threats.",
    accent: "pink",
    ask: "I want to go into Cybersecurity. Please explain beginner steps, what I do day-to-day, and which Belgium Campus programme fits me.",
    illus: `
      <svg viewBox="0 0 520 220" width="520" height="220" aria-hidden="true">
        <defs>
          <linearGradient id="cyg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="#C41870" stop-opacity=".95" />
            <stop offset="1" stop-color="#8f0f55" stop-opacity=".85" />
          </linearGradient>
        </defs>
        <rect x="18" y="22" width="484" height="176" rx="30" fill="rgba(255,255,255,.72)" stroke="rgba(196,24,112,.22)"/>
        <path d="M260 58l130 50v38c0 46-32 82-130 96-98-14-130-50-130-96v-38l130-50z" fill="rgba(196,24,112,.08)" stroke="rgba(196,24,112,.22)" stroke-width="4"/>
        <path d="M260 104v54" stroke="url(#cyg)" stroke-width="10" stroke-linecap="round"/>
        <circle cx="260" cy="88" r="10" fill="url(#cyg)"/>
        <path d="M92 86h108" stroke="rgba(17,18,20,.10)" stroke-width="10" stroke-linecap="round"/>
        <path d="M320 86h108" stroke="rgba(17,18,20,.10)" stroke-width="10" stroke-linecap="round"/>
        <path d="M92 124h76" stroke="rgba(17,18,20,.09)" stroke-width="10" stroke-linecap="round"/>
        <path d="M352 124h76" stroke="rgba(17,18,20,.09)" stroke-width="10" stroke-linecap="round"/>
      </svg>
    `,
    sections: [
      { h: "What you do", items: ["Find and fix security weaknesses", "Monitor alerts and investigate incidents", "Set security rules and access controls", "Teach safe behaviour (phishing awareness)"] },
      { h: "Skills you’ll need", items: ["Networking basics + operating systems", "Security mindset + attention to detail", "Linux basics and scripting", "Ethics + strong documentation"] },
      { h: "Good Matric subjects", items: ["Pure Mathematics (recommended)", "Physical Science (helps)", "English (reports + policy)"] },
      { h: "Careers you can grow into", items: ["Security Analyst (SOC)", "Penetration Tester (later)", "Digital Forensics (later)", "Security Engineer (later)", "GRC / Compliance (option)"] }
    ],
    roadmap: ["Start: learn passwords, phishing, and basic safe habits", "Then: networking basics (IP/DNS) + Linux", "Add: try beginner labs (legal practice environments)", "Next: learn scripting basics (Python) + incident-response basics"]
  },
  cloud: {
    title: "Cloud / DevOps",
    tagline: "Deploy and run systems reliably using cloud platforms and automation.",
    accent: "teal",
    ask: "I want to go into Cloud/DevOps. Explain what it is, what I do day-to-day, what I should learn first, and which Belgium Campus programme fits me.",
    illus: `
      <svg viewBox="0 0 520 220" width="520" height="220" aria-hidden="true">
        <defs>
          <linearGradient id="clg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="#0DC4BE" stop-opacity=".95" />
            <stop offset="1" stop-color="#C41870" stop-opacity=".75" />
          </linearGradient>
        </defs>
        <rect x="18" y="22" width="484" height="176" rx="30" fill="rgba(255,255,255,.72)" stroke="rgba(13,196,190,.22)"/>
        <path d="M334 156a46 46 0 0 0 0-92 64 64 0 0 0-125 18 40 40 0 0 0 6 80h119z" fill="rgba(13,196,190,.12)" stroke="rgba(13,196,190,.22)" stroke-width="4"/>
        <path d="M160 146h70" stroke="rgba(17,18,20,.08)" stroke-width="10" stroke-linecap="round"/>
        <path d="M160 120h96" stroke="rgba(17,18,20,.10)" stroke-width="10" stroke-linecap="round"/>
        <path d="M276 116v70" stroke="url(#clg)" stroke-width="10" stroke-linecap="round"/>
        <path d="M246 158l30 30 30-30" fill="none" stroke="url(#clg)" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
        <rect x="372" y="74" width="96" height="26" rx="13" fill="rgba(196,24,112,.12)"/>
        <rect x="372" y="110" width="76" height="26" rx="13" fill="rgba(13,196,190,.14)"/>
      </svg>
    `,
    sections: [
      { h: "What you do", items: ["Deploy apps to cloud platforms (AWS/Azure)", "Automate builds and releases (CI/CD)", "Monitor systems and fix issues fast", "Improve reliability, speed, and security"] },
      { h: "Skills you’ll need", items: ["Linux + basic networking", "Scripting (Python/JS) and Git", "Cloud basics (compute, storage, databases)", "Automation mindset + problem-solving"] },
      { h: "Good Matric subjects", items: ["Pure Mathematics (recommended)", "Physical Science (helps)", "English (communication + docs)"] },
      { h: "Careers you can grow into", items: ["Cloud Engineer", "DevOps Engineer", "Site Reliability Engineer (later)", "Platform Engineer (later)", "Cloud Security (later)"] }
    ],
    roadmap: ["Start: Linux basics + command line", "Then: Git + basic scripting", "Add: simple web app + deployment concept", "Next: learn cloud basics (compute/storage) + monitoring"]
  }
};

function guardrailReply(text){
  const msg = text.toLowerCase();

  // IT + Belgium Campus related keywords
  const itKeywords = [
        "it", "information technology", "software", "programming",
        "coding", "developer", "data science", "cybersecurity",
        "network", "cloud", "database", "artificial intelligence",
        "ai", "computer", "bcomp", "bit", "diploma",
        "higher certificate", "belgium campus", "requirements",
        "maths", "math literacy", "aps", "qualification",
        "apply", "application", "admission", "career",
        "degree", "course", "study", "student",
        "matric", "grade 12", "learnership",
        "internship", "nqf", "bsc"
  ];

  // Clearly off-topic keywords
    const offTopicKeywords = [
        "food", "recipe", "music", "movie",
        "sport", "soccer", "weather",
        "politics", "dating", "relationship",
        "loan", "money", "celebrity"
  ];

  // Prompt injection / jailbreak attempts
    const blockedPhrases = [
        "ignore previous instructions",
        "ignore all instructions",
        "act as",
        "pretend to be",
        "system prompt",
        "jailbreak"
  ];

  const isITRelated =
        itKeywords.some(word => msg.includes(word));

  const isOffTopic =
        offTopicKeywords.some(word => msg.includes(word));

  const isPromptAttack =
        blockedPhrases.some(word => msg.includes(word));

  // Block off-topic or malicious prompts
  if((isPromptAttack || isOffTopic || !isITRelated)) {
    return  `
    I can only assist with:

  • IT careers
  • Belgium Campus qualifications
  • Admission requirements
  • Matric subject guidance
  • Technology-related career paths

  You can ask me questions such as:

  • Which IT qualification can I apply for?
  • What are the requirements for the Diploma in IT?
  • Can I study IT with Maths Literacy?
  • What career paths are available in software development?
        `;
  }

  // VALID QUESTION
  return null;
    
}

function setSidebarActive(activeId) {
  const ids = [
    "navHome",
    "navProgrammes",
    "navRequirements",
    "navPaths",
    "navNextSteps",
    "navChat"
  ];

  for (const id of ids) {
    const el = document.getElementById(id);
    if (!el) continue;
    el.classList.toggle("active", id === activeId);
  }
}

function toView(v) {
  document.getElementById("vHome").style.display = v === "home" ? "" : "none";
  document.getElementById("vChat").style.display = v === "chat" ? "" : "none";
  const vPath = document.getElementById("vPath");
  if (vPath) vPath.style.display = v === "path" ? "" : "none";

  if (v === "chat") setSidebarActive("navChat");
  else if (v === "path") setSidebarActive("navPaths");
  else setSidebarActive("navHome");

  const mNavHome = document.getElementById("mNavHome");
  const mNavChat = document.getElementById("mNavChat");
  if (mNavHome && mNavChat) {
    mNavHome.classList.toggle("active", v === "home");
    mNavChat.classList.toggle("active", v === "chat");
  }
}

function goChat(t) {
  toView("chat");
  run(t);
}

function openPath(key) {
  const d = PATHS[key];
  if (!d) return;
  activePathKey = key;
  toView("path");

  const wrap = document.getElementById("pathWrap");
  if (wrap) wrap.className = "path-wrap " + (d.accent === "pink" ? "is-pink" : "is-teal");

  const root = document.getElementById("pathContent");
  if (!root) return;

  const heroClass = "path-hero " + (d.accent === "pink" ? "accent-pink" : "accent-teal");
  const numClass = d.accent === "pink" ? "road-num is-pink" : "road-num";

  root.innerHTML = `
    <div class="${heroClass}">
      <div class="path-hero-text">
        <div class="path-kicker">Career path</div>
        <h2 class="path-title">${escHtml(d.title)}</h2>
        <p class="path-tagline">${escHtml(d.tagline)}</p>
        <div class="path-actions">
          <button class="path-primary" onclick="pathAskChat()">Ask in chat</button>
          <button class="path-secondary" onclick="scrollToSection('secProgrammes')">See programmes</button>
        </div>
      </div>
      <div class="path-hero-illus">${d.illus}</div>
    </div>

    <div class="path-grid2">
      ${d.sections
        .map(
          (s) => `
          <div class="path-card">
            <div class="path-card-title">${escHtml(s.h)}</div>
            <ul class="path-list">
              ${s.items.map((it) => `<li>${escHtml(it)}</li>`).join("")}
            </ul>
          </div>
        `
        )
        .join("")}
    </div>

    <div class="path-card path-roadmap">
      <div class="path-card-title">Beginner roadmap (simple)</div>
      <div class="roadmap">
        ${d.roadmap.map((step, i) => `<div class="road-step"><div class="${numClass}">${i + 1}</div><div class="road-txt">${escHtml(step)}</div></div>`).join("")}
      </div>
    </div>
  `;
}

function closePath() {
  activePathKey = null;
  toView("home");
  const el = document.getElementById("secPaths");
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function pathAskChat() {
  const d = activePathKey ? PATHS[activePathKey] : null;
  goChat(d?.ask || "I want help choosing an IT career path. Please guide me based on my subjects and interests.");
}

function scrollToSection(id) {
  toView("home");
  const map = {
    secProgrammes: "navProgrammes",
    secRequirements: "navRequirements",
    secPaths: "navPaths",
    secNextSteps: "navNextSteps"
  };
  setSidebarActive(map[id] || "navHome");
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function chip(t) {
  run(t);
}

function chip(t) {
  if (t === 'What matric percentages do I need to gain admission to BC') {
    toggleApsCalculator(true);
  } else {
    run(t);
  }
}

function go() {
  const el = document.getElementById("inp");
  const t = el.value.trim();
  if (!t || busy) return;
  el.value = "";
  run(t);
}

function clearChat() {
  hist = [];
  busy = false;

  const sendBtn = document.getElementById("sbtn");
  if (sendBtn) sendBtn.disabled = false;

  const inp = document.getElementById("inp");
  if (inp) inp.value = "";

  hideTyp();

  const box = document.getElementById("msgBox");
  if (!box) return;

  box.innerHTML = `
    <div class="empty-state" id="empt">
      <div class="empty-icon">
        <svg width="56" height="56" viewBox="0 0 36 36">
          <ellipse cx="18" cy="18" rx="14" ry="6.5" fill="none" stroke="#0DC4BE" stroke-width="2.5" transform="rotate(-38 18 18)"></ellipse>
          <ellipse cx="18" cy="18" rx="14" ry="6.5" fill="none" stroke="#C41870" stroke-width="2.5" transform="rotate(38 18 18)"></ellipse>
          <circle cx="18" cy="4.5" r="2.8" fill="#0DC4BE"></circle>
          <circle cx="18" cy="18" r="4" fill="#9B9B9B" opacity=".65"></circle>
        </svg>
      </div>
      <h3>How can I help you today?</h3>
      <p>Ask about IT careers, qualifications,<br>or skills at Belgium Campus</p>
    </div>
  `;
}

function addMsg(role, txt) {
  const box = document.getElementById("msgBox");
  const em = document.getElementById("empt");
  if (em) em.remove();

  const row = document.createElement("div");
  row.className = "bc-row" + (role === "user" ? " u" : "");

  if (role !== "user") {
    const av = document.createElement("div");
    av.className = "bc-av";
    av.textContent = "BC";
    row.appendChild(av);
  }

  const b = document.createElement("div");
  b.className = "bc-bbl " + (role === "user" ? "us" : "ai");
  b.innerHTML = role === "user" ? escHtml(txt) : fmt(txt);
  row.appendChild(b);
  box.appendChild(row);
  box.scrollTop = box.scrollHeight;
}

function escHtml(t) {
  return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function fmt(t) {
  return t
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/^[•\-] (.+)$/gm, "<li>$1</li>")
    .replace(/(<li>.*<\/li>\n?)+/g, (m) => "<ul>" + m + "</ul>")
    .replace(/\n\n+/g, "</p><p>")
    .replace(/\n/g, "<br>")
    .replace(/^/, "<p>").replace(/$/, "</p>")
    .replace(/<p><\/p>/g, "");
}

function showTyp() {
  const box = document.getElementById("msgBox");
  const em = document.getElementById("empt");
  if (em) em.remove();

  const row = document.createElement("div");
  row.className = "bc-row";
  row.id = "typr";

  const av = document.createElement("div");
  av.className = "bc-av";
  av.textContent = "BC";

  const ty = document.createElement("div");
  ty.className = "bc-typing";
  ty.innerHTML = "<span></span><span></span><span></span>";

  row.appendChild(av);
  row.appendChild(ty);
  box.appendChild(row);
  box.scrollTop = box.scrollHeight;
}

function hideTyp() {
  const t = document.getElementById("typr");
  if (t) t.remove();
}

// APS CALCULATOR CONTROLLER

function toggleApsCalculator(show) {
  const modal = document.getElementById("apsModal");
  if (!modal) return;
  modal.style.display = show ? "flex" : "none";
  
  if (!show) {
    document.getElementById("apsResultDisplay").style.display = "none";
    const inputs = document.querySelectorAll(".aps-input");
    inputs.forEach(input => input.value = "");
  }
}

function getPointsFromPercentage(mark) {
  if (mark === "" || isNaN(mark) || mark < 0 || mark > 100) return 0;
  if (mark >= 80) return 7;
  if (mark >= 70) return 6;
  if (mark >= 60) return 5;
  if (mark >= 50) return 4;
  if (mark >= 40) return 3;
  if (mark >= 30) return 2;
  return 1;
}

function processApsCalculation() {
  const inputs = document.querySelectorAll(".aps-input");
  let totalPoints = 0;
  let mathMark = 0;
  let englishMark = 0;

  inputs.forEach(input => {
    const mark = parseInt(input.value);
    if (!isNaN(mark)) {
      //Life Orientation marks exclusion
      if (input.id === "apsLOInput") {
        totalPoints += 0; 
      } else {
        totalPoints += getPointsFromPercentage(mark);
      }

      if (input.getAttribute("data-subject") === "Mathematics") mathMark = mark;
      if (input.getAttribute("data-subject") === "English") englishMark = mark;
    }
  });

  document.getElementById("apsScoreValue").textContent = totalPoints;
  document.getElementById("apsResultDisplay").style.display = "block";

  setTimeout(() => {
    toggleApsCalculator(false); 
    
    let advice = `I've calculated your total score as **${totalPoints} APS Points** (excluding Life Orientation).\n\n`;
    
    if (mathMark < 50) {
      advice += `• Your **Pure Mathematics** mark is currently at *${mathMark}%*. Remember that explicit Pure Mathematics passes are mandatory for our NQF Level 6/7 Diploma & BSc streams. If you hold Math Lit, consider our *Higher Certificate in IT* path first!`;
    } else if (totalPoints >= 26) {
      advice += `• Excellent work! Your scores align well with foundational entry specifications across our **Diploma** and **BSc Degree in IT** qualifications.`;
    } else {
      advice += `• Explore our *Higher Certificate in IT (NQF 5)* layout options. It acts as an amazing 1-year bridge directly into full diploma qualifications!`;
    }
    
    addMsg("assistant", advice);
    hist.push({ role: "assistant", content: advice });
  }, 900);
}

window.toggleApsCalculator = toggleApsCalculator;
window.processApsCalculation = processApsCalculation;

async function run(text) {
  if (busy) return;

  const blockedReply = guardrailReply(text);

  if (blockedReply) {
    addMsg("user", text);
    addMsg("assistant", blockedReply);
    return;
  }

  busy = true;

  document.getElementById("sbtn").disabled = true;
  addMsg("user", text);
  hist.push({ role: "user", content: text });
  showTyp();

  try {
    const r = await fetch("http://localhost:3000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: hist
      })
    });
    const d = await r.json();
    hideTyp();
    const rep = d.reply || "Sorry, I could not get a response. Please try again.";
    addMsg("assistant", rep);
    hist.push({ role: "assistant", content: rep });
  } catch (e) {
    hideTyp();
    addMsg("assistant", "Something went wrong. Please check your connection and try again.");
  }

  busy = false;
  document.getElementById("sbtn").disabled = false;
}

window.toView = toView;
window.goChat = goChat;
window.openPath = openPath;
window.closePath = closePath;
window.pathAskChat = pathAskChat;
window.scrollToSection = scrollToSection;
window.chip = chip;
window.go = go;
window.clearChat = clearChat;
