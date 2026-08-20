export const experience = {
  role: "IT Consultant (Contractor)",
  company: "Novatec Solutions, Auckland",
  dates: "February 2026 – Present",
  blurb:
    "An MSP for small-to-medium businesses. Primary technical contractor, full-time, working alongside the owner across software development and infrastructure.",
  software: [
    "Built an invoicing automation system integrating Pax8 (cloud billing) and Xero (accounting) via Windmill — fuzzy-matches customers across systems and drafts invoices with LLM-assisted content cleanup.",
    "Built a Python HTTP server exposing Microsoft 365 (mail, calendar, OneDrive, tasks) via per-user OAuth — deployed and in active use.",
    "Own the infrastructure for a live, multi-tenant SaaS product — Docker/Terraform VM provisioning, secrets management, and identity/auth design.",
    "Operate that infrastructure in production — diagnosing and fixing live incidents, building its observability layer (structured audit logging + Prometheus monitoring), and leading incident response to a leaked credential (rotation plus git-history remediation).",
  ],
  infra: [
    "Designed and stood up a self-hosted client-hosting platform (Coolify on on-prem, UPS-backed ESXi VMs), migrating client sites off third-party hosting and eliminating its recurring cost.",
    "Built novatec.co.nz end to end — site, DNS configuration, and Cloudflare Tunnels.",
    "Hands-on VM administration (ESXi/vSphere) and core networking (WAPs, switches, routers, DHCP).",
  ],
} as const;

export type ProjectStatus = "LIVE" | "FIRMWARE" | "FORK" | "CLIENT";

export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  title: string;
  status: ProjectStatus;
  description: string;
  stack: string[];
  links: ProjectLink[];
  note?: string;
}

export const projects: Project[] = [
  {
    title: "PromptTech AI Sandbox",
    status: "CLIENT",
    description:
      "Capstone project for an industry client, graded A. Dockerised full-stack app for comparing prompts and parameters across generative AI models. AWS Bedrock and Cognito (plus Google OAuth), deployed on EC2; REST API in Node.js/Express with a React front end.",
    stack: ["React", "Node.js", "Express", "AWS Bedrock", "AWS Cognito", "Docker"],
    links: [],
    note: "Client work — no public repo",
  },
  {
    title: "Multi-Tenant SaaS Infrastructure",
    status: "CLIENT",
    description:
      "Own and operate the infrastructure for a live, multi-tenant SaaS product at Novatec — an AI assistant that performs real actions and takes initiative (managing calendars, integrating with other software, and more, not just chatting) over Telegram/Slack and a self-serve web console. VM provisioning, secrets management, and identity/auth design, plus production operations: diagnosing and fixing live incidents and building the observability layer that keeps it running.",
    stack: ["Docker", "Terraform", "Observability", "Identity/auth"],
    links: [],
    note: "Employer work — Novatec Solutions",
  },
  {
    title: "Recipe Web App",
    status: "LIVE",
    description:
      "Full rewrite of an earlier recipe app: Astro + React islands, Drizzle ORM/Postgres, Docker Compose, unit/end-to-end/visual-regression tests gated by CI. Self-hosted on a personal Proxmox home lab (VLAN-segmented, Tailscale-only admin access), deployed via Coolify and Cloudflare Tunnel — the same hosting stack built professionally at Novatec, run independently at home.",
    stack: ["Astro", "React", "Drizzle ORM", "PostgreSQL", "Docker", "Proxmox", "Coolify"],
    links: [
      { label: "willscookbook.nz", href: "https://willscookbook.nz" },
      { label: "repo", href: "https://github.com/QuickWaller/recipe-website-v2" },
    ],
  },
  {
    title: "Hiking Data Logger / Weather Pod",
    status: "FIRMWARE",
    description:
      "Low-power field logger: GPS, barometric/weather sensing, e-ink display, rule-based and ML forecasting. Production-scale ML pipeline — LightGBM trained on ERA5-Land reanalysis against GPM satellite rainfall, ~31M training rows, skill-scored against a climatology baseline (Brier/CRPS) rather than treated as a lab demo — deployed to the pod's firmware.",
    stack: ["C++", "LightGBM", "Python", "GPS", "e-ink", "sensor integration"],
    links: [{ label: "repo", href: "https://github.com/QuickWaller/hiking-weather-pod" }],
  },
  {
    title: "ESP32 FM Synthesiser",
    status: "FIRMWARE",
    description:
      "Real-time FM audio synthesis on ESP32, streamed over Bluetooth A2DP — table-lookup oscillator, ADSR envelope, multi-voice mixing. A separate fixed-point rework builds a from-scratch Q16.16/Q32.0 ADSR envelope generator, working around the absence of hardware floating point.",
    stack: ["C++", "ESP32", "Bluetooth A2DP", "fixed-point DSP"],
    links: [
      { label: "esp32-fm-synth", href: "https://github.com/QuickWaller/esp32-fm-synth" },
      {
        label: "fixed-point rework (WIP)",
        href: "https://github.com/QuickWaller/esp32-synth-fixed-point-wip",
      },
    ],
  },
  {
    title: "Vintage Story Game Server",
    status: "FORK",
    description:
      "Enhanced fork adding automated mod management (40+ mods), Coolify deployment, and structured logging.",
    stack: ["C#", "Docker", "Coolify"],
    links: [{ label: "repo", href: "https://github.com/QuickWaller/vintage-story-server" }],
  },
];

export interface OtherWork {
  title: string;
  meta: string;
  description: string;
}

export const otherWork: OtherWork[] = [
  {
    title: "ESP32-CAM Face Detection",
    meta: "Personal project",
    description:
      "Low-cost microcontroller streaming video over WebSocket to a FastAPI/YOLOv8 backend for real-time face detection, with backpressure-aware streaming (bounded queue, drop-oldest-frame) to handle network variability.",
  },
];

export const skills: { group: string; items: string[] }[] = [
  { group: "Languages", items: ["C", "C++", "C#", "Python", "Java", "TypeScript/JavaScript", "HTML/CSS"] },
  {
    group: "Frameworks",
    items: ["React", "Node.js", "Express", "FastAPI", "Flask", ".NET", "Arduino/PlatformIO", "Godot", "Unity"],
  },
  {
    group: "Cloud & infrastructure",
    items: [
      "AWS (EC2, Cognito, Bedrock)",
      "Docker",
      "Terraform",
      "Coolify",
      "VMware ESXi/vSphere",
      "Proxmox VE",
      "Cloudflare Tunnels",
      "Tailscale",
      "Linux administration",
      "Git",
      "Networking (VLANs, DHCP, routing)",
    ],
  },
  { group: "Data & APIs", items: ["PostgreSQL", "REST", "WebSockets", "OAuth", "Stripe"] },
  {
    group: "Embedded",
    items: ["ESP32/ESP32-CAM", "Fixed-point arithmetic", "Real-time audio DSP", "Low-power design", "Sensor integration"],
  },
  {
    group: "AI/ML",
    items: ["Generative AI API integration", "Applied ML forecasting (LightGBM)", "Embedded computer vision"],
  },
];

export const education = {
  institution: "University of Auckland",
  degree: "Bachelor of Commerce / Bachelor of Science (Conjoint), Computer Science & Economics",
  dates: "2021 – 2026, graduated",
  highlights: [
    "COMPSCI 399 Capstone: Computer Science — A (industry-client project for PromptTech)",
    "COMPSCI 361 Machine Learning — A",
    "COMPSCI 235 Software Development Methodologies — A-",
  ],
};

export const contact = {
  email: "willsmith2507@gmail.com",
  github: "https://github.com/QuickWaller",
  githubLabel: "github.com/QuickWaller",
  linkedin: "https://www.linkedin.com/in/will-smith-1b5068294",
  linkedinLabel: "linkedin.com/in/will-smith-1b5068294",
  cv: "/Will-Smith-CV.pdf",
  repo: "https://github.com/QuickWaller/willsmith-portfolio",
};
