// Every claim on the site comes from this file. Sources: the two resumes
// (Sep 2026), the GitHub profile README and the public repositories' READMEs.
// Keep it that way: no numbers or companies that can't be traced back.

export const profile = {
  name: 'Jithu J George',
  location: 'Kerala, India',
  email: 'jithu10052001@gmail.com',
  github: 'https://github.com/jithu2001',
  linkedin: 'https://www.linkedin.com/in/jithu2001/',
  resume: '/resume/Jithu-J-George-Resume.pdf',
  resumeFde: '/resume/Jithu-J-George-Resume-FDE.pdf',
  openTo: ['Forward-deployed engineering', 'Backend engineering', 'Product roles', 'Freelance & contract'],
}

export const heroStats = [
  { value: '3+ yrs', label: 'shipping production systems' },
  { value: '5+', label: 'enterprise sites deployed on-site' },
  { value: '99%', label: 'uptime across deployments' },
  { value: '100%', label: 'dashboard adoption after rollout' },
]

export const clients = ['Coca-Cola', 'ITC', 'Unilever', 'Saint-Gobain', 'Godrej', 'Hyundai', 'Kia']

export type Capability = {
  id: string
  title: string
  kicker: string
  body: string
  evidence: string[]
  tags: string[]
}

export const capabilities: Capability[] = [
  {
    id: 'backend',
    kicker: 'Build',
    title: 'Backend engineering',
    body: 'Go services that stay boring in production: clean APIs, sensible schemas, auth done properly, and a deployment story that fits the customer.',
    evidence: [
      'Go backend for an IELTS exam platform: REST, PostgreSQL, JWT, evaluator queues, shipped on GCP',
      'SSH remote diagnostics and WebSocket streaming for monitoring deployed systems',
      'Single-binary deployments with go:embed for on-premise installs',
    ],
    tags: ['Go', 'Gin', 'Chi', 'Django', 'PostgreSQL', 'WebSockets'],
  },
  {
    id: 'fde',
    kicker: 'Deploy',
    title: 'Forward-deployed engineering',
    body: 'I go to where the software actually runs. That means plant floors, legacy systems, PLCs and edge boxes. I make it work there, then make sure people use it.',
    evidence: [
      'Led on-site rollouts of AI monitoring at Coca-Cola, ITC, Unilever, Hyundai, Kia and more',
      'Primary technical liaison between clients, product and engineering',
      '10+ client training sessions, resulting in 100% dashboard adoption',
    ],
    tags: ['On-site deployment', 'PLC / Modbus', 'Jetson', 'Client onboarding'],
  },
  {
    id: 'product',
    kicker: 'Decide',
    title: 'Product thinking',
    body: 'Before I build anything, I want to know what problem it solves and how we\'ll know it worked. I write PRDs, define metrics, and cut scope when it isn\'t needed.',
    evidence: [
      'NextLeap Product Management Fellowship (2026, in progress)',
      'PRD + interactive prototype for re-engaging ChatGPT Voice users',
      'Turned shop-floor requirements into engineering tasks across 5+ accounts',
    ],
    tags: ['PRDs', 'Metrics', 'Experiment design', 'Discovery'],
  },
  {
    id: 'ai',
    kicker: 'Apply',
    title: 'Applied AI & computer vision',
    body: 'Models are only useful once they\'re in a product. I\'ve fine-tuned detectors for edge devices and built LLM features that stay grounded in real data.',
    evidence: [
      'Fine-tuned YOLOv5 for PPE, vehicles and activity on 20K–100K+ image datasets',
      'TensorRT + FP16 quantization for on-device inference on Jetson',
      'FaceShape AI: MediaPipe + Gemini hybrid pipeline for eyewear recommendations',
    ],
    tags: ['YOLOv5', 'TensorRT', 'OpenCV', 'MediaPipe', 'Gemini', 'RAG'],
  },
]

export type Step = {
  id: string
  label: string
  title: string
  what: string
  example: string
}

// The loop, illustrated with what actually happened on the Perleybrook deployments
// and the freelance work at Krisko.
export const processSteps: Step[] = [
  {
    id: 'problem',
    label: 'User problem',
    title: 'Start on the floor, not in the spec',
    what: 'I talk to the people who will live with the software: plant managers, safety officers, business owners.',
    example: 'At enterprise manufacturing sites, I gathered requirements directly from shop-floor teams before anything was scoped.',
  },
  {
    id: 'discovery',
    label: 'Discovery',
    title: 'Find out what is really in the way',
    what: 'I separate what people ask for from what they need, and check the constraints: legacy systems, hardware, connectivity.',
    example: 'Each site had different legacy infrastructure. Mapping PLCs, edge devices and networks early decided what was possible.',
  },
  {
    id: 'decision',
    label: 'Product decision',
    title: 'Choose what not to build',
    what: 'I pick the smallest thing that solves the problem and write down what success looks like.',
    example: 'For a lodge billing tool, owners needed something they could install themselves, so it shipped as one desktop binary, not a hosted service.',
  },
  {
    id: 'prototype',
    label: 'Prototype',
    title: 'Make it real enough to react to',
    what: 'A clickable flow or a working spike, so the conversation moves from opinions to evidence.',
    example: 'Built an interactive, state-machine-driven prototype of four ChatGPT Voice re-engagement flows to test the product hypothesis.',
  },
  {
    id: 'engineering',
    label: 'Engineering',
    title: 'Build it properly',
    what: 'Clean architecture, tests where they matter, and performance work where users will notice it.',
    example: 'Fine-tuned YOLOv5 detectors, accelerated them with TensorRT on Jetson, and built the Go services streaming results over WebSockets.',
  },
  {
    id: 'deployment',
    label: 'Deployment',
    title: 'Ship it where it lives',
    what: 'On-site installs, CI/CD, remote diagnostics. Getting to production is part of the job, not an afterthought.',
    example: 'Led on-site deployments across 5+ enterprise sites with 99% uptime, integrated with PLCs (Modbus, Siemens LOGO!) and existing systems.',
  },
  {
    id: 'iterate',
    label: 'Measure & improve',
    title: 'Adoption is the real launch',
    what: 'Train the users, watch what they ignore, and feed it back into the next iteration.',
    example: 'Ran 10+ training sessions (100% dashboard adoption) and automated 100+ daily client reports via AWS SES, cutting manual reporting by 90%.',
  },
]

export type Role = {
  company: string
  role: string
  type: string
  period: string
  location: string
  summary: string
  highlights: { title?: string; text: string }[]
  stack: string[]
}

export const experience: Role[] = [
  {
    company: 'Krisko',
    role: 'Product Developer',
    type: 'Freelance',
    period: 'Nov 2025 – Present',
    location: 'Remote',
    summary: 'I scope, build and ship client products end-to-end on my own, from the first call to the installed binary.',
    highlights: [
      {
        title: 'FaceShape AI',
        text: 'Real-time web app (React, MediaPipe, Django) that combines computer vision with Google Gemini in a hybrid ML pipeline to analyse facial features and recommend eyewear.',
      },
      {
        title: 'IELTS exam platform',
        text: 'Go backend with REST APIs, PostgreSQL and JWT covering exam delivery, evaluator queues, analytics, a cached YouTube RSS proxy and weekly streaks. Shipped with Docker on GCP with Cloud Storage for media.',
      },
      {
        title: 'Econ',
        text: 'Lodge management system in Go (GORM/SQLite) with GST-compliant billing and a React frontend, packaged as a single desktop binary so non-technical owners can install it themselves.',
      },
    ],
    stack: ['Go', 'Gin', 'PostgreSQL', 'React', 'Django', 'MediaPipe', 'Gemini', 'Docker', 'GCP'],
  },
  {
    company: 'Perleybrook Labs',
    role: 'Software Engineer',
    type: 'Full-time',
    period: 'Aug 2023 – Nov 2025',
    location: 'Kerala, India',
    summary: 'I built and deployed AI-powered monitoring systems for enterprise manufacturers, both on-site and in production.',
    highlights: [
      { text: 'Led end-to-end, on-site deployment at Coca-Cola, ITC, Saint-Gobain, Unilever, Godrej, Hyundai and Kia, keeping 99% uptime while integrating with each client\'s legacy infrastructure.' },
      { text: 'Primary technical liaison between clients, product and engineering. Turned shop-floor requirements into engineering tasks and ran 10+ training sessions, reaching 100% adoption of the AI dashboards.' },
      { text: 'Fine-tuned YOLOv5 for PPE compliance, vehicle detection and activity recognition on 20K–100K+ image datasets. Accelerated on-device inference on Jetson with TensorRT and FP16.' },
      { text: 'Built SSH remote diagnostics and WebSocket streaming in Go. Automated 100+ daily client notifications via AWS SES, cutting manual reporting by 90%.' },
      { text: 'Migrated a 50K+ line Qt application from Qt5 to Qt6 (10% faster). Built real-time C++ detection modules with spatial-temporal event triggers.' },
      { text: 'Engineered PLC integrations (Modbus, Siemens LOGO!) and SDK work for edge AI hardware (Jetson, Rockchip), including custom Buildroot OS builds. Managed Jenkins CI/CD for staging and production.' },
    ],
    stack: ['Go', 'C++', 'Qt6', 'Python', 'YOLOv5', 'TensorRT', 'PostgreSQL', 'AWS', 'Jenkins'],
  },
]

export const education = [
  {
    school: 'NextLeap',
    detail: 'Product Management Fellowship',
    period: '2026 · In progress',
  },
  {
    school: 'Sathyabama Institute of Science and Technology',
    detail: 'B.E. Computer Science & Engineering · CGPA 8.57',
    period: '2019 – 2023',
  },
]

export const certifications = ['Python (Coursera)', 'Flutter Framework Training', 'JPMorgan Chase Excel Skills (Forage)']

export type Project = {
  id: string
  name: string
  tagline: string
  category: 'Backend' | 'AI' | 'Product' | 'Mobile' | 'Systems'
  problem: string
  solution: string
  contribution: string
  detail: { title: string; text: string }
  stack: string[]
  repo: string
  demo?: string
  flow: string[]
  accent: 'blue' | 'violet' | 'teal' | 'amber' | 'rose' | 'sky'
}

export const projects: Project[] = [
  {
    id: 'wholeflow',
    name: 'WholeFlow',
    tagline: 'Outstanding balances from TallyPrime, synced to the cloud for a wholesale business owner\'s phone.',
    category: 'Backend',
    problem: 'A wholesale business tracks shop credit in TallyPrime on one office PC. The owner and staff can\'t see who owes what while they\'re out, and nobody can risk the accounting data being changed.',
    solution: 'A single Go executable that runs as a Windows service, reads Tally over its XML port, serves a local admin web app and syncs shops, balances and transactions to Supabase. A Flutter app then gives owners and staff read-only access.',
    contribution: 'Designed and built the sync service, the Supabase schema with row-level security, and the spec for the Flutter mobile app.',
    detail: {
      title: 'Read-only, enforced in code',
      text: 'Every request to Tally passes through one function and an allow-list. Only Export/Collection requests and five read-only functions are allowed. Anything write-shaped is refused with TALLY_WRITE_BLOCKED, and tests prove it.',
    },
    stack: ['Go', 'Supabase', 'PostgreSQL', 'RLS', 'Flutter', 'Windows service'],
    repo: 'https://github.com/jithu2001/Credit-track',
    flow: ['TallyPrime', 'wholeflow.exe', 'Supabase', 'Mobile app'],
    accent: 'blue',
  },
  {
    id: 'powerup',
    name: 'Mutual Fund FAQ Assistant',
    tagline: 'A RAG assistant that answers only from official sources, cites one, and refuses everything else.',
    category: 'AI',
    problem: 'Investors ask simple factual questions (expense ratio, exit load, lock-in), but generic chatbots hallucinate numbers and drift into investment advice.',
    solution: 'A facts-only assistant over 24 official AMC/AMFI documents for five PPFAS schemes. It classifies every question, refuses advice and personal data before any LLM call, and attaches exactly one official citation.',
    contribution: 'Built the full pipeline: ingestion, chunking, hybrid retrieval, answer validation, FastAPI backend, React UI and the evaluation harness.',
    detail: {
      title: 'The LLM never chooses the source',
      text: 'Answers containing a number that isn\'t in the retrieved context are rejected. Below a 0.70 relevance score, the LLM is never called. The citation always comes from the source registry, never from the model. Latest eval: 31/31 classification, 20/20 citations.',
    },
    stack: ['Python', 'FastAPI', 'ChromaDB', 'Groq', 'Ollama', 'React', 'TypeScript'],
    repo: 'https://github.com/jithu2001/NL-chatbot-FAQ',
    flow: ['Question', 'PII + intent gate', 'Hybrid retrieval', 'Validated answer'],
    accent: 'violet',
  },
  {
    id: 'voice',
    name: 'ChatGPT Voice Rediscovery',
    tagline: 'PRD + high-fidelity prototype: four flows to bring lapsed users back to Voice.',
    category: 'Product',
    problem: 'Users who tried Voice once may still believe it can\'t understand Indian accents or Hinglish, even if it has improved. Low usage might be a perception gap, not a quality gap.',
    solution: 'Four contextual entry points (re-engagement nudge, suggestion while typing, task-led discovery, home-screen widget) with adaptive suppression so prompts stop when ignored.',
    contribution: 'Wrote the PRD (problem, metrics, non-goals, experiment plan) and built the interactive prototype, with each flow as its own state machine.',
    detail: {
      title: 'Optimise for repeat use, not clicks',
      text: 'The primary metric is repeat Voice usage, with dismissals and opt-outs as guardrails. Prompt click-through is easy to inflate and doesn\'t mean anything was solved.',
    },
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'PRD'],
    repo: 'https://github.com/jithu2001/Prototype_milestone-3_ChatGPT',
    demo: 'https://prototype-milestone-3-chat-gpt.vercel.app',
    flow: ['Signal', 'Contextual nudge', 'Voice trial', 'Repeat use'],
    accent: 'teal',
  },
  {
    id: 'attic',
    name: 'Attic',
    tagline: 'Self-hosted photos, music and movies, streamed from your own hardware over Tailscale.',
    category: 'Systems',
    problem: 'Personal media lives on paid cloud services. Self-hosted alternatives are usually either fragile or a full-time job to run.',
    solution: 'One Go server binary (API, scanner, background jobs, streaming) shipped as a single Docker image with Postgres and Caddy, plus a single Flutter app for Android, iOS and Android TV.',
    contribution: 'Solo build: server, schema, auth, library scanner and the Flutter client. The music streamer works today; photos and video are next.',
    detail: {
      title: 'Auth details that usually get skipped',
      text: 'Refresh tokens rotate in one conditional UPDATE, so replays and races both fail. Unknown usernames take as long as known ones, so timing can\'t reveal accounts. Media tokens are scoped to media routes only.',
    },
    stack: ['Go', 'PostgreSQL', 'Docker', 'Caddy', 'Flutter', 'Tailscale'],
    repo: 'https://github.com/jithu2001/Attic',
    flow: ['Library', 'Go scanner', 'Postgres', 'Flutter client'],
    accent: 'amber',
  },
  {
    id: 'fieldstaff',
    name: 'Field Staff Verification',
    tagline: 'Location-verified attendance for small field-service businesses, without running a backend.',
    category: 'Mobile',
    problem: 'Small businesses with staff on the road have no reliable way to confirm site visits, and they can\'t afford to run servers.',
    solution: 'Owners pin sites with a GPS radius. Staff can only check in when their live position falls inside it, and every attempt, including rejected ones, is recorded as evidence.',
    contribution: 'Designed the Firestore data model and security rules, and built the Flutter app with role-based routing.',
    detail: {
      title: 'Security rules are the backend',
      text: 'A visit\'s document ID is its assignment ID, and staff may create but never update visits, so Firestore itself rejects a second check-in. Staff roles are derived from invite documents, so clients can\'t grant themselves owner rights.',
    },
    stack: ['Flutter', 'Dart', 'Firebase Auth', 'Firestore rules', 'Riverpod'],
    repo: 'https://github.com/jithu2001/Field-Staff-Verification-app',
    flow: ['Owner pins site', 'Staff GPS', 'Radius check', 'Evidence log'],
    accent: 'rose',
  },
  {
    id: 'onvif',
    name: 'ONVIF Camera Discovery',
    tagline: 'A native desktop tool that finds IP cameras on a network and pulls their RTSP streams.',
    category: 'Systems',
    problem: 'Finding the RTSP URL for every camera on a site is slow, manual work, and it\'s the first step of every vision deployment.',
    solution: 'A cross-platform native app that discovers cameras via WS-Discovery multicast, authenticates with WS-Security and lists every profile\'s stream, resolution, FPS and codec.',
    contribution: 'Built it end-to-end in Go with the Fyne UI toolkit, implementing the ONVIF protocol calls in pure Go.',
    detail: {
      title: 'Born from deployment work',
      text: 'Camera discovery came up on every on-site rollout. This turns a manual process into a one-click scan, and returned stream URLs come with credentials stripped.',
    },
    stack: ['Go', 'Fyne', 'ONVIF', 'WS-Discovery', 'SOAP'],
    repo: 'https://github.com/jithu2001/Onvif-Finder',
    flow: ['UDP multicast', 'WS-Security', 'GetProfiles', 'RTSP URL'],
    accent: 'sky',
  },
]

export type SkillGroup = { id: string; label: string; blurb: string; items: string[] }

export const skillGroups: SkillGroup[] = [
  { id: 'lang', label: 'Languages', blurb: 'Go for services, C++ for real-time, Python for ML.', items: ['Go', 'Python', 'C++', 'SQL', 'JavaScript', 'TypeScript', 'Dart'] },
  { id: 'backend', label: 'Backend', blurb: 'APIs and services built to be run, not demoed.', items: ['Gin', 'Chi', 'Django', 'FastAPI', 'REST', 'WebSockets', 'JWT', 'GORM'] },
  { id: 'frontend', label: 'Frontend & apps', blurb: 'Enough UI to ship the whole product.', items: ['React', 'Qt5 / Qt6', 'Flutter', 'Tailwind CSS', 'Electron'] },
  { id: 'data', label: 'Data', blurb: 'Relational first, vector when it earns it.', items: ['PostgreSQL', 'SQLite', 'Firebase', 'Supabase', 'ChromaDB'] },
  { id: 'cloud', label: 'Cloud & DevOps', blurb: 'From CI to the client\'s own machine.', items: ['AWS EC2', 'AWS SES', 'GCP', 'Docker', 'Jenkins', 'Linux', 'SSH', 'Git'] },
  { id: 'ai', label: 'AI & edge', blurb: 'Models that run on the device in front of you.', items: ['YOLOv5', 'TensorRT', 'FP16 quantization', 'OpenCV', 'MediaPipe', 'Gemini', 'RAG', 'Jetson', 'Rockchip', 'Buildroot'] },
  { id: 'industrial', label: 'Industrial', blurb: 'Where software meets the plant floor.', items: ['PLC', 'Modbus', 'Siemens LOGO!', 'ONVIF / RTSP', 'Embedded Linux'] },
  { id: 'product', label: 'Product & delivery', blurb: 'The part that decides whether any of it matters.', items: ['PRDs', 'Success metrics', 'Experiment design', 'Requirement gathering', 'Client onboarding', 'Technical writing', 'Agile', 'Jira', 'Confluence'] },
]

export const voiceCase = {
  reframe: { from: 'Voice is inaccurate', to: 'Voice is under-discovered and under-trusted' },
  evidence: [
    { stat: '85%', text: 'of survey respondents (N=32, ages 19–39) worried Voice would misread Indian accents or Hinglish.' },
    { stat: 'But', text: 'The survey measured how people perceive Voice, not how accurate it is today. That gap is the hypothesis.' },
  ],
  northStar: 'Repeat Voice usage',
  funnel: ['Suggestion exposure', 'Suggestion → trial', 'Task completion', 'Repeat usage'],
  guardrails: ['Dismissals', 'Opt-outs', 'Negative feedback', 'Overall engagement'],
  nonGoals: ['Rebuilding the speech model first', 'Prompting every user regardless of context', 'Implying typing is the inferior option'],
  experiment: { control: 'Existing ChatGPT experience', treatment: 'Voice Rediscovery interventions', scale: 'Scale only if repeat usage rises without hurting guardrails' },
}

export const faqScope = {
  does: ['Expense ratio, exit load, SIP minimums', 'ELSS lock-in, riskometer, benchmark', 'Where to find statements and factsheets'],
  doesNot: ['Recommend, rank or compare funds', 'Predict returns', 'Handle personal or account data'],
}
