import { Pair } from '@/lib/i18n';
import { Category, ProjectFilter } from '@/data/project-types';

/**
 * ALL bilingual site copy lives here as `{ th, en }` pairs.
 * Components never hard-code strings — they consume this file only.
 */

// ------------------------------------------------------------------ identity

export const brand = {
  name: 'CHISA.dev',
  person: 'Chisanupong Kongchang',
  email: 'chisanupongk.work@gmail.com',
  githubUrl: 'https://github.com/chisa00a',
  githubHandle: 'chisa00a',
  instagramUrl: 'https://www.instagram.com/axmsin.__',
  instagramHandle: 'axmsin.__',
  phone: '065-019-9081',
} as const;

export const siteMetadata = {
  title: 'CHISA.dev — Chisanupong Kongchang',
  description:
    'Portfolio of Chisanupong Kongchang — Computer Engineering student at PSRU, back-end & API architect, AI & audio-tech enthusiast, and Post-Rock / Shoegaze guitarist.',
  rolePairs: [
    { th: 'นักพัฒนาซอฟต์แวร์', en: 'Software Developer' },
    { th: 'สถาปนิก Back-end & API', en: 'Back-end & API Architect' },
    { th: 'ผู้สนใจ AI & Audio-Tech', en: 'AI & Audio-Tech Enthusiast' },
    { th: 'มือกีตาร์ Post-Rock / Shoegaze', en: 'Post-Rock / Shoegaze Guitarist' },
    { th: 'นักพัฒนาเว็บ Full-Stack', en: 'Full-Stack Web Developer' },
  ] as Pair[],
  canonicalUrl: 'https://chisa.dev',
} as const;

export const signalLabel: Pair = { th: 'สัญญาณสด', en: 'live signal' };
export const signalPill: Pair = { th: 'DROPDOII // OPEN D', en: 'DROPDOII // OPEN D' };

// ------------------------------------------------------------------ navigation

export type NavItem = { href: string; label: Pair };

export const navItems: NavItem[] = [
  { href: '#profile', label: { th: 'ประวัติ', en: 'Profile' } },
  { href: '#skills', label: { th: 'ทักษะ', en: 'Skills' } },
  { href: '#projects', label: { th: 'ผลงาน', en: 'Projects' } },
  { href: '#timeline-section', label: { th: 'เส้นทาง', en: 'Journey' } },
  { href: '#certificates', label: { th: 'ใบประกาศ', en: 'Certificates' } },
  { href: '#project-gallery', label: { th: 'ภาพรวมผลงาน', en: 'Showcase' } },
  { href: '#hobbies', label: { th: 'กิจกรรม', en: 'Activities' } },
];

export const ui = {
  openMenu: { th: 'เปิดเมนู', en: 'Open menu' },
  closeMenu: { th: 'ปิดเมนู', en: 'Close menu' },
  toggleTheme: { th: 'สลับโหมดมืด/สว่าง', en: 'Toggle dark / light mode' },
  toggleSignal: { th: 'พัก/เล่นสัญญาณคลื่นเสียง', en: 'Pause / resume the live signal' },
  languageToggle: { th: 'สลับภาษา', en: 'Switch language' },
  backToTop: { th: 'กลับขึ้นด้านบน', en: 'Back to top' },
  viewProjects: { th: 'ดูผลงาน', en: 'View Projects' },
  downloadCV: { th: 'ดาวน์โหลด CV', en: 'Download CV' },
  contact: { th: 'ติดต่อ', en: 'Contact' },
  email: { th: 'อีเมล', en: 'Email' },
  visitLink: { th: 'เปิดลิงก์', en: 'Open link' },
  readArticle: { th: 'อ่านบทความเพิ่มเติม', en: 'Read the full article' },
  viewPdf: { th: 'ดู PDF', en: 'View PDF' },
  all: { th: 'ทั้งหมด', en: 'All' },
} as const;

// ------------------------------------------------------------------ hero

export const hero = {
  status: { th: 'SYS.ONLINE // PHITSANULOK, TH // VERCEL EDGE', en: 'SYS.ONLINE // PHITSANULOK, TH // VERCEL EDGE' },
  eyebrow: { th: 'Software Developer · Audio-Tech · Guitarist', en: 'Software Developer · Audio-Tech · Guitarist' },
  nameTh: 'ชิษณุพงศ์ คงช้าง',
  nameEn: 'Chisanupong Kongchang',
  bio: {
    th: 'นักศึกษาวิศวกรรมคอมพิวเตอร์ มหาวิทยาลัยราชภัฏพิบูลสงคราม มุ่งมั่นศึกษาด้านสถาปัตยกรรมซอฟต์แวร์ (Back-end), การประมวลผลข้อมูล และการบูรณาการปัญญาประดิษฐ์ ผสานความหลงใหลในซาวด์ดนตรี Post-Rock และ Shoegaze',
    en: 'Computer Engineering student at Pibulsongkram Rajabhat University, passionate about Back-end software architecture, data processing, and AI integration — fused with an obsession for Post-Rock & Shoegaze sonic textures.',
  } as Pair,
  typing: { th: 'กำลังพิมพ์', en: 'typing' }, // aria-live label
  portraitAlt: {
    th: 'ภาพหลักของ Chisanupong Kongchang ในกรอบสัญญาณรีเวิร์บแบบหมุน',
    en: 'Portrait of Chisanupong Kongchang framed by a rotating reverb halo',
  } as Pair,
} as const;

// ------------------------------------------------------------------ section headers

export const sectionHeaders = {
  skills: {
    index: '01',
    eyebrow: { th: '// 01 — Technical Skills', en: '// 01 — Technical Skills' },
    title: { th: 'ทักษะทางเทคนิค & ความรู้', en: 'Technical Skills & Knowledge' },
    subtitle: {
      th: 'เครื่องมือที่ผมใช้จัดเวทีเสียงประจำวัน — จาก API และฐานข้อมูล ไปจนถึง UI และระบบ AI',
      en: 'The pedals on my signal chain — from APIs and databases to UI and AI systems.',
    } as Pair,
  },
  projects: {
    index: '02',
    eyebrow: { th: '// 02 — Project Experience', en: '// 02 — Project Experience' },
    title: { th: 'ผลงานที่ผ่านมา', en: 'Project Experience' },
    subtitle: {
      th: 'จากแชทบอท AI ภายในคณะ ไปจนถึงเกมม็อดและแอปจัดการหอพักแบบ Full-Stack',
      en: 'From an in-department AI chatbot to a game mod and a full-stack apartment system.',
    } as Pair,
  },
  timeline: {
    index: '02.5',
    eyebrow: { th: '// 02.5 — Education & Timeline', en: '// 02.5 — Education & Timeline' },
    title: { th: 'เส้นทางการศึกษา', en: 'Education & Timeline' },
    subtitle: {
      th: 'โน้ตตัวโน้ตบนทางเดินของผม — ตั้งแต่ห้องเรียนมัธยมจนถึงหลักสูตรวิศวกรรมคอมพิวเตอร์',
      en: 'The fretboard of my journey — from secondary school to Computer Engineering.',
    } as Pair,
  },
  certificates: {
    index: '03',
    eyebrow: { th: '// 03 — Certifications', en: '// 03 — Certifications' },
    title: { th: 'ใบประกาศ & หลักสูตร', en: 'Certifications' },
    subtitle: {
      th: 'เกมส์เวิร์กเสริมเสียง — หลักสูตรที่คมชัดขึ้นทีละช่วงคลื่น',
      en: 'Tuning the signal — courses that sharpened the tone.',
    } as Pair,
  },
  gallery: {
    index: '04',
    eyebrow: { th: '// 04 — Visual Project Showcase', en: '// 04 — Visual Project Showcase' },
    title: { th: 'ภาพรวมผลงาน', en: 'Visual Project Showcase' },
    subtitle: {
      th: 'คลิกภาพใดก็ได้เพื่อเปิดดูแบบเต็มจอ — สไลด์ตัวอย่างการทำงานจริง',
      en: 'Click any image to open the fullscreen lightbox — real work, real signal.',
    } as Pair,
  },
  hobbies: {
    index: '05',
    eyebrow: { th: '// 05 — Activities, Sonic Art & Hobbies', en: '// 05 — Activities, Sonic Art & Hobbies' },
    title: { th: 'กิจกรรม & ศิลปะแห่งเสียง', en: 'Activities, Sonic Art & Hobbies' },
    subtitle: {
      th: 'ชีวิตข้างเวที — ตั้งแต่กระดาน mini-conf ไปจนถึงเวทีแนว Post-Rock และ Shoegaze',
      en: 'Life between sets — from mini-conf boards to Post-Rock / Shoegaze stages.',
    } as Pair,
  },
  contact: {
    index: '06',
    eyebrow: { th: '// 06 — Initiate Signal', en: '// 06 — Initiate Signal' },
    title: { th: 'มาร่วมงานกัน', en: "Let's Work Together" },
    subtitle: {
      th: 'เปิดรับโอกาสฝึกงานและความร่วมมือด้าน Back-end, Full Stack, AI และ Web Development',
      en: 'Open to internships and collaborations in Back-end, Full Stack, AI and Web Development.',
    } as Pair,
  },
} as const;

// ------------------------------------------------------------------ skills

export type SkillCard = {
  title: Pair;
  description: Pair;
  items: string[];
};

export const skillCards: SkillCard[] = [
  {
    title: { th: 'Back-End & API', en: 'Back-End & API' },
    description: {
      th: 'พัฒนาระบบ Back-end และ REST API ด้วย Python, Flask, FastAPI รวมถึง Node.js',
      en: 'Building back-end systems and REST APIs with Python, Flask, FastAPI, and Node.js',
    },
    items: ['Python', 'Flask', 'FastAPI', 'Node.js'],
  },
  {
    title: { th: 'Front-End & UI', en: 'Front-End & UI' },
    description: {
      th: 'สร้าง UI ด้วย HTML, CSS, JavaScript, TypeScript และ Bootstrap 5 / Tailwind',
      en: 'Building UI with HTML, CSS, JavaScript, TypeScript, and Bootstrap 5 / Tailwind',
    },
    items: ['HTML', 'CSS', 'JS', 'TypeScript', 'Bootstrap 5', 'Tailwind'],
  },
  {
    title: { th: 'Database & DevOps', en: 'Database & DevOps' },
    description: {
      th: 'ออกแบบ Database, ทดสอบ API ผ่าน Bruno และใช้ Docker, Git, GitHub',
      en: 'Database design, API testing with Bruno, plus Docker, Git, and GitHub',
    },
    items: ['PostgreSQL', 'MongoDB', 'Docker', 'Git', 'GitHub'],
  },
  {
    title: { th: 'AI & Systems', en: 'AI & Systems' },
    description: {
      th: 'พัฒนาระบบ AI/LLM ด้วย Python และ C# WinForms สำหรับ Desktop App',
      en: 'Developing AI/LLM systems with Python and C# WinForms desktop apps',
    },
    items: ['AI Systems', 'C#', 'WinForms', 'LLM'],
  },
];

export type ProficiencyColumn = {
  level: Pair;
  tone: 'emerald' | 'violet' | 'cyan';
  items: { name: string; note: Pair }[];
};

export const proficiency: ProficiencyColumn[] = [
  {
    level: { th: 'ใช้งานหลัก', en: 'Proficient' },
    tone: 'emerald',
    items: [
      {
        name: 'Python',
        note: {
          th: 'ภาษาหลักสำหรับ back-end, REST APIs และงานประมวลผลข้อมูล',
          en: ' Main driver for backend architecture, REST APIs, and data processing',
        },
      },
      {
        name: 'FastAPI',
        note: {
          th: 'API ประสิทธิภาพสูงพร้อม type-safe schema',
          en: ' High-performance, type-safe API schemas',
        },
      },
      {
        name: 'Flask',
        note: {
          th: 'บริการต้นแบบและ microservices ที่ยืดหยุ่น',
          en: ' Lean services and rapid prototypes',
        },
      },
    ],
  },
  {
    level: { th: 'ระดับกลาง', en: 'Intermediate' },
    tone: 'violet',
    items: [
      {
        name: 'Node.js',
        note: {
          th: 'เว็บแอป Full-stack และเซิร์ฟเวอร์แบบ real-time',
          en: ' Full-stack web apps and real-time servers',
        },
      },
      {
        name: 'JavaScript / TypeScript',
        note: {
          th: 'โลจิกฝั่ง client ที่ type-safe',
          en: ' Type-safe client logic',
        },
      },
      {
        name: 'PostgreSQL',
        note: {
          th: 'ออกแบบ schema เชิงสัมพันธ์และ query ที่ซับซ้อน',
          en: ' Relational schema design and complex queries',
        },
      },
      {
        name: 'C# (WinForms)',
        note: {
          th: 'ยูทิลิตี้เดสก์ท็อปแบบ async',
          en: ' Async desktop utilities',
        },
      },
    ],
  },
  {
    level: { th: 'คุ้นเคย & เครื่องมือ', en: 'Familiar & Tools' },
    tone: 'cyan',
    items: [
      {
        name: 'AI / LLM Integration',
        note: {
          th: 'เชื่อมต่อ workflow ของโมเดลเข้ากับผลิตภัณฑ์',
          en: ' Applied LLM workflows in products',
        },
      },
      {
        name: 'Docker',
        note: {
          th: 'จัดการและ containerize deployment ในเว็บแอปจริง',
          en: ' Containerization and real-world web app deployments',
        },
      },
      {
        name: 'Git / GitHub',
        note: {
          th: 'เวิร์กโฟลว์ version control ในทีม',
          en: ' Team version-control workflows',
        },
      },
      {
        name: 'HTML / CSS',
        note: {
          th: 'โครงสร้างและการจัดสไตล์หน้าเว็บ',
          en: ' Page structure and styling fundamentals',
        },
      },
    ],
  },
];

// ------------------------------------------------------------------ projects

export const projectFilterTabs: { filter: ProjectFilter; label: Pair }[] = [
  { filter: 'all', label: { th: 'ทั้งหมด', en: 'All' } },
  { filter: 'web', label: { th: 'Web', en: 'Web' } },
  { filter: 'ai', label: { th: 'AI', en: 'AI' } },
  { filter: 'game', label: { th: 'Game', en: 'Game' } },
];

export type Project = {
  code: string;
  title: Pair;
  categories: Category[];
  subtitle: Pair;
  description: Pair;
  tech: string[];
  link: string;
};

export const projects: Project[] = [
  {
    code: 'P·01',
    title: {
      th: 'CPE AI CHAT BOT — ระบบตอบคำถามอัตโนมัติภาควิชา CPE',
      en: 'CPE AI CHAT BOT — CPE Department AI Chatbot',
    },
    categories: ['ai', 'web'],
    subtitle: { th: 'AI Integration · LLM', en: 'AI Integration · LLM' },
    description: {
      th: 'พัฒนาแชทบอทเฉพาะทางด้วย Python, FastAPI และ LLM (Mistral-7B + Unsloth) เชื่อมต่อ Knowledge base ของมหาวิทยาลัย ทำงานร่วมกับทีมด้าน Back-end และ Front-end UI',
      en: 'Domain-specific academic chatbot built with Python, FastAPI, and a fine-tuned LLM (Mistral-7B + Unsloth) connected to the university knowledge base — working with the team on back-end and front-end UI.',
    },
    tech: ['Python', 'FastAPI', 'LLM', 'Flask'],
    link: 'https://github.com/chisa00a/CPE-AI-CHAT-BOT-',
  },
  {
    code: 'P·02',
    title: {
      th: 'Item Spawner ROMESTEAD by CHISA — Mod สำหรับเกม Romestead',
      en: 'Item Spawner ROMESTEAD by CHISA — Romestead Game Mod Utility',
    },
    categories: ['game'],
    subtitle: { th: 'C# WinForms · Nexus Mods', en: 'C# WinForms · Nexus Mods' },
    description: {
      th: 'พัฒนา Modding App ด้วย C# WinForms บนแพลตฟอร์ม Nexus Mods ใช้ Asynchronous Data Loading และ Virtual Rendering จัดการไอเทมกว่า 790 รายการได้รวดเร็ว',
      en: 'C# WinForms modding app on Nexus Mods using Asynchronous Data Loading and Virtual Rendering to handle 790+ items quickly.',
    },
    tech: ['C#', 'WinForms', 'Async', 'UI/UX'],
    link: 'https://www.nexusmods.com/romestead/mods/14',
  },
  {
    code: 'P·03',
    title: {
      th: 'Dormi Apartment Management',
      en: 'Dormi Apartment Management',
    },
    categories: ['web'],
    subtitle: { th: 'Full Stack · Database Design', en: 'Full Stack · Database Design' },
    description: {
      th: 'พัฒนาเว็บจัดการอพาทเมนต์ ระบบ Ticket ปัญหาฝั่ง Owner/Tenant ด้วย Node.js, PostgreSQL, Bruno API Testing ออกแบบ UI Frontend เชื่อมต่อ Backend Logic บริหารงานผ่าน GitHub + Clickup',
      en: 'Full-stack apartment management web app with an Owner/Tenant issue-ticketing system built with Node.js, PostgreSQL, and Bruno API testing — designed the UI frontend connected to backend logic, managed via GitHub + ClickUp.',
    },
    tech: ['Node.js', 'PostgreSQL', 'Bruno', 'Full Stack'],
    link: 'https://dormi-linkandrent.com/login?redirect=%2Fdashboard',
  },
];

export const codeLink: Pair = { th: 'ดูโค้ด & รายละเอียด', en: 'View code & details' };

// ------------------------------------------------------------------ timeline

export type TimelineEntry = {
  years: string;
  title: Pair;
  detail: Pair;
  tone: 'violet' | 'cyan' | 'magenta';
};

export const timeline: TimelineEntry[] = [
  {
    years: '2022 — Present',
    title: {
      th: 'วิศวกรรมศาสตรบัณฑิต สาขาวิชาวิศวกรรมคอมพิวเตอร์ (การพัฒนาซอฟต์แวร์)',
      en: 'Bachelor of Engineering in Computer Engineering (Software Development)',
    },
    detail: {
      th: 'มหาวิทยาลัยราชภัฏพิบูลสงคราม (ม.ราชภัฏพิบูลสงคราม) — ออกแบบและพัฒนาระบบซอฟต์แวร์อย่างเป็นระบบ จาก Back-end ถึง AI',
      en: 'Pibulsongkram Rajabhat University (PSRU) — designing and building software systems end-to-end, from Back-end to AI.',
    },
    tone: 'violet',
  },
  {
    years: '2022',
    title: { th: 'ระดับมัธยมศึกษาตอนปลาย — แผนการเรียนวิทยาศาสตร์-คณิตศาสตร์', en: 'Upper Secondary Education — Science & Mathematics Program' },
    detail: {
      th: 'จุดเริ่มต้นความสนใจด้านการเขียนโปรแกรม',
      en: 'Where the interest in programming began — foundations in logic and computing.',
    },
    tone: 'cyan',
  },
  {
    years: '2019',
    title: { th: 'ระดับมัธยมศึกษาตอนต้น', en: 'Lower Secondary Education — Junior High School' },
    detail: {
      th: 'เริ่มชอบคอมพิวเตอร์และเทคโนโลยี',
      en: 'Where the interest in computers and technology began.',
    },
    tone: 'magenta',
  },
];

export const gpaCard = {
  title: { th: 'บัตรสรุปผลการเรียน', en: 'Education GPA Card' },
  gpaxLabel: { th: 'เกรดเฉลี่ยรวม', en: 'GPAX' },
  majorLabel: { th: 'เกรดเฉลี่ยเฉพาะสาขา', en: 'Major GPA' },
  gpax: '2.91',
  major: '2.97',
} as const;

// ------------------------------------------------------------------ certificates

export type Certificate = {
  title: Pair;
  org: string;
  image: string;
  pdf: string;
};

export const certificates: Certificate[] = [
  {
    title: { th: 'NCSA MOOC 1', en: 'NCSA MOOC 1' },
    org: 'NCSA Mooc Cyber-Learning',
    image: '/images/pic3.png',
    pdf: '/images/cert2.pdf',
  },
  {
    title: { th: 'Fortinet CyberNet Pro', en: 'Fortinet CyberNet Pro' },
    org: 'Fortinet Training Institute',
    image: '/images/pic4.png',
    pdf: '/images/cert3.pdf',
  },
  {
    title: { th: 'Python Essentials 1', en: 'Python Essentials 1' },
    org: 'Cisco Networking Academy',
    image: '/images/pic2.png',
    pdf: '/images/cert1.pdf',
  },
];

// ------------------------------------------------------------------ showcase

export type ShowcaseSlide = { title: string; images: string[]; note?: Pair; wide?: boolean };

export const showcase: ShowcaseSlide[] = [
  {
    title: 'CPE AI CHAT BOT',
    images: ['/chatbot/chatbot1.png', '/chatbot/chatbot2.png', '/chatbot/chatbot3.png', '/chatbot/chatbot4.png'],
    note: {
      th: 'หน้าจอระบบตอบคำถามอัตโนมัติของภาควิชา CPE',
      en: 'Interfaces of the CPE department AI chatbot',
    },
  },
  {
    title: 'ITEM SPAWNER ROMESTEAD',
    images: ['/rome/rome1.png', '/rome/rome2.png', '/rome/rome3.png'],
    note: {
      th: 'ยูทิลิตี้ม็อด C# WinForms บน Nexus Mods',
      en: 'C# WinForms mod utility on Nexus Mods',
    },
  },
  {
    title: 'Dormi Apartment Management',
    images: ['/dormi/dormi1.png', '/dormi/dormi2.png', '/dormi/dormi3.png'],
    note: {
      th: 'แดชบอร์ดจัดการหอพักและระบบแจ้งซ่อม',
      en: 'Apartment management dashboard and ticketing',
    },
  },
  {
    title: 'FxGaze — AI-Powered Guitar Effect Analyzer',
    images: ['/fx-gaze/fxgaze3.png', '/fx-gaze/fxgaze2.png', '/fx-gaze/fxgaze1.png'],
    wide: true,
    note: {
      th: 'เว็บแอป AI วิเคราะห์ประเภทเอฟเฟกต์กีตาร์ พารามิเตอร์ และสายสัญญาณ จากคลื่นเสียงและฟิสิกส์เชิงเสียง',
      en: 'AI-powered web application detecting guitar effect types, parameters, and signal chains from audio waveforms and acoustic physics.',
    },
  },
];

export const showcaseImageAlt: Pair = { th: 'ภาพตัวอย่างผลงาน', en: 'Project showcase screenshot' };

// ------------------------------------------------------------------ hobbies

export type HobbyCard = {
  icon: 'music' | 'users' | 'mic' | 'shield' | 'code';
  title: Pair;
  description: Pair;
  images: string[];
  link?: { url: string; label: Pair };
};

export const hobbies: HobbyCard[] = [
  {
    icon: 'music',
    title: { th: 'Live Music Concert & Organize', en: 'Live Music Concert & Organize' },
    description: {
      th: 'มือกีตาร์วง Post-Rock/Shoegaze DROPDOII (เล่นทัวร์กรุงเทพฯ และเชียงใหม่) และเป็นผู้ร่วมจัดงานของคอลเลกทีฟ Post Ter Punk',
      en: 'Guitarist for the Post-Rock/Shoegaze band DROPDOII (toured Bangkok & Chiang Mai) and co-organizer with the Post Ter Punk collective.',
    },
    images: ['/images/dropdoii1.jpg'],
  },
  {
    icon: 'users',
    title: { th: 'Smo Techno — สโมสรนักศึกษา', en: 'Smo Techno — Student Union' },
    description: {
      th: 'สมาชิกเป็นนักเรียนของสโมสรนักศึกษาคณะเทคโนโลยีอุตสาหกรรม',
      en: 'Active member of the Faculty of Industrial Technology student union.',
    },
    images: ['/images/smo1.jpg'],
  },
  {
    icon: 'mic',
    title: { th: 'Lanner — สัมภาษณ์ซีนดนตรีนอกกระแส', en: 'Lanner — Underground Music Scene Interview' },
    description: {
      th: 'เสียงนอกกระแสในเมืองรอง ที่ซีนดนตรีทางเลือกยังไม่มีที่ยืนใน ‘พิษณุโลก’',
      en: 'Underground voices in a secondary city — where the alternative music scene is still fighting for a place in Phitsanulok.',
    },      images: ['/images/lanner/lanner3.jpg', '/images/lanner/lanner2.jpg', '/images/lanner/lanner1.jpg'],
    link: {
      url: 'https://lannernews.com/15022569-01/',
      label: { th: 'อ่านบทความเพิ่มเติม', en: 'Read the full article' },
    },
    // note: thumbnail intentionally leads with lanner3.jpg
  },
  {
    icon: 'shield',
    title: { th: 'อบรม Cyber Net Pro', en: 'Cyber Net Pro Workshop' },
    description: {
      th: 'กิจกรรมอบรมของทางสาขาวิศวกรรมคอมพิวเตอร์ เรื่องความปลอดภัยทางไซเบอร์',
      en: 'A Computer Engineering department workshop on cybersecurity fundamentals.',
    },
    images: ['/images/cyber/cyber1.jpg', '/images/cyber/cyber2.jpg'],
  },
  {
    icon: 'code',
    title: { th: 'การสัมมนาการฝึกสหกิจของรุ่นพี่ CPE PSRU', en: 'CPE PSRU Co-op Seminar' },
    description: {
      th: 'รับฟังการสัมมนาของพี่ๆ รหัส 65 ที่ออกฝึกสหกิจศึกษา',
      en: 'Attended a seminar by batch-65 seniors sharing their cooperative-education internship experiences.',
    },
    images: ['/images/converse/converse1.jpg', '/images/converse/converse2.jpg'],
  },
];

// Hobby captions are the Thai labels shown in the lightbox.
export const hobbyCaptions: Record<number, string> = {
  0: 'DROPDOII — Live',
  1: 'อบรม Smo Techno',
  2: 'Lanner เพจข่าวสารจากเชียงใหม่',
  3: 'อบรม Cyber Net Pro',
  4: 'การสัมมนาการฝึกสหกิจของรุ่นพี่ CPE PSRU',
};

// ------------------------------------------------------------------ contact

export const contact = {
  emailMe: { th: 'ส่งอีเมลถึงผม', en: 'Email Me' },
  form: {
    title: { th: 'หรือฝากข้อความไว้ที่นี่', en: 'Or leave a message here' },
    name: { th: 'ชื่อของคุณ', en: 'Your name' },
    namePlaceholder: { th: 'ชื่อ-นามสกุล', en: 'First and last name' },
    email: { th: 'อีเมลติดต่อกลับ', en: 'Your email' },
    emailPlaceholder: { th: 'you@example.com', en: 'you@example.com' },
    message: { th: 'ข้อความ', en: 'Message' },
    messagePlaceholder: { th: 'รายละเอียดที่อยากติดต่อ...', en: 'Tell me what this is about...' },
    required: { th: 'กรุณากรอกข้อมูลให้ครบถ้วน', en: 'Please fill in every field' },
    invalidEmail: { th: 'รูปแบบอีเมลไม่ถูกต้อง', en: 'Please enter a valid email address' },
    submit: { th: 'ส่งข้อความ', en: 'Send message' },
    submitting: { th: 'กำลังเปิดโปรแกรมอีเมลของคุณ...', en: 'Opening your email client...' },
  },
} as const;

// ------------------------------------------------------------------ footer

export const footerNote: Pair = {
  th: 'Engineered with atmospheric reverb & clean code.',
  en: 'Engineered with atmospheric reverb & clean code.',
};
