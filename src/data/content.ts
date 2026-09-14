export const experience = {
  role: "IT Consultant (Contractor)",
  company: "Novatec Solutions, Auckland",
  dates: "February 2026 – Present",
  blurb:
    "An MSP for small-to-medium businesses. Primary technical contractor, full-time, working alongside the owner across software development and infrastructure.",
  software: [
    "Built an invoicing automation system integrating Pax8 (cloud billing) and Xero (accounting) via Windmill; fuzzy-matches customers across systems and drafts invoices with LLM-assisted content cleanup.",
    "Built a Python HTTP server exposing Microsoft 365 (mail, calendar, OneDrive, tasks) via per-user OAuth; deployed and in active use.",
    "Designed and built a live, multi-tenant AI agent platform end to end: per-tenant isolation, Docker/Terraform VM provisioning, secrets management, and identity/auth design.",
    "Operate and maintain it: root-causing and fixing faults, building its observability layer (structured audit logging + Prometheus monitoring), and running a security-incident response (credential rotation plus git-history remediation).",
  ],
  infra: [
    "Designed and stood up a self-hosted client-hosting platform (Coolify on on-prem, UPS-backed ESXi VMs), migrating client sites off third-party hosting and eliminating its recurring cost.",
    "Built novatec.co.nz end to end: site, DNS configuration, and Cloudflare Tunnels.",
    "Hands-on VM administration (ESXi/vSphere) and core networking (WAPs, switches, routers, DHCP).",
  ],
} as const;

export type ProjectStatus = "LIVE" | "FIRMWARE" | "FORK" | "CLIENT" | "TOOLING";

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
      "Capstone project for an industry client, graded A. Dockerised full-stack app for comparing prompts and parameters across generative AI models: FastAPI/Python backend, React front end, PostgreSQL, AWS Cognito auth, deployed on AWS EC2. I set up the project's architecture and containerisation, wrote the FastAPI service skeleton, the initial AWS Bedrock integration and the pytest harness, worked on the Cognito auth flow's dev/prod configuration, and built the deployment pipeline (Python/Paramiko: EC2 provisioning, image transfer over SFTP, remote Docker Compose) that the team shipped on for the rest of the project.",
    stack: ["FastAPI", "Python", "React", "PostgreSQL", "AWS Bedrock", "AWS EC2", "Docker"],
    links: [],
    note: "Client work — no public repo",
  },
  {
    title: "Multi-Tenant AI Agent Platform",
    status: "CLIENT",
    description:
      "Designed and built end to end at Novatec: a live, multi-tenant platform hosting an AI assistant that performs real actions and takes initiative (managing calendars, integrating with other software, and more, not just chatting) over Telegram/Slack and a self-serve web console. Per-tenant isolation, VM provisioning, secrets management and identity/auth design. I operate and maintain it: root-causing faults, and building its observability layer.",
    stack: ["Docker", "Terraform", "FastAPI", "React", "Observability", "Identity/auth"],
    links: [],
    note: "Employer work — Novatec Solutions",
  },
  {
    title: "Recipe Web App",
    status: "LIVE",
    description:
      "Full rewrite of an earlier recipe app: Astro + React islands, Drizzle ORM/Postgres, Docker Compose, unit/end-to-end/visual-regression tests gated by CI. Self-hosted on a personal Proxmox home lab (VLAN-segmented, Tailscale-only admin access), deployed via Coolify and Cloudflare Tunnel; the same hosting stack built professionally at Novatec, run independently at home.",
    stack: ["Astro", "React", "Drizzle ORM", "PostgreSQL", "Docker", "Proxmox", "Coolify"],
    links: [
      { label: "willscookbook.nz", href: "https://willscookbook.nz" },
      { label: "repo", href: "https://github.com/QuickWaller/recipe-website-v2" },
    ],
  },
  {
    title: "Home Lab Infrastructure",
    status: "LIVE",
    description:
      "A self-built two-node Proxmox cluster (Corosync-quorate, live VM migration between nodes) running this site's backing services, a game server, and an ML pipeline. Zero open inbound ports — Cloudflare Tunnel for public ingress, Tailscale for admin access — plus a least-privilege Proxmox API role/ACL system: each automated AI agent gets its own restricted resource pool, service account, and scoped token, tested to allow only in-pool actions and reject everything outside it. Next: a small remote relay VM to route mail and game traffic past the home connection's CGNAT.",
    stack: ["Proxmox VE", "Corosync", "Tailscale", "Cloudflare Tunnel", "SOPS/age", "API/ACL design"],
    links: [],
    note: "Personal infrastructure — private repo, no public link",
  },
  {
    title: "Hiking Data Logger / Weather Pod",
    status: "FIRMWARE",
    description:
      "Low-power field logger: GPS, barometric/weather sensing, e-ink display, rule-based and ML forecasting. Production-scale ML pipeline: LightGBM trained on ERA5-Land reanalysis against GPM satellite rainfall, ~31M training rows, skill-scored against a climatology baseline (Brier/CRPS) rather than treated as a lab demo, deployed to the pod's firmware.",
    stack: ["C++", "LightGBM", "Python", "GPS", "e-ink", "sensor integration"],
    links: [{ label: "repo", href: "https://github.com/QuickWaller/hiking-weather-pod" }],
  },
  {
    title: "ESP32 FM Synthesiser",
    status: "FIRMWARE",
    description:
      "Real-time FM audio synthesis on ESP32, streamed over Bluetooth A2DP: table-lookup oscillator, ADSR envelope, multi-voice mixing. A separate fixed-point rework builds a from-scratch Q16.16/Q32.0 ADSR envelope generator, working around the absence of hardware floating point.",
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
    title: "Agent Tooling & Claude Code Harness",
    status: "TOOLING",
    description:
      "A supervision harness for long-running AI coding sessions. When a session needs permission to act, the request races a local desktop popup against a Telegram bot and takes whichever answers first, so a decision can come from a phone instead of blocking until someone is back at the keyboard. Fail-closed by construction on every error path, never by timeout. Backed by a 72-assertion test suite that runs the real script as a subprocess against an isolated home directory, plus custom subagent definitions and a structured handoff workflow for dispatching parallel work.",
    stack: ["PowerShell", "Telegram Bot API", "Claude Code hooks", "WinForms"],
    links: [
      {
        label: "repo",
        href: "https://github.com/QuickWaller/claude-code-managed-repo-template",
      },
    ],
  },
  {
    title: "Vintage Story Game Server",
    status: "FORK",
    description:
      "A dedicated game server operated through natural language. Four custom Claude Code skills drive it: log monitoring (a cron job pre-filters errors server-side every minute; the skill reads and triages them over SSH), server management, playit.gg tunnel diagnostics, and repo maintenance, backed by a 600-line operations manual. Underneath sit real ops scripts (timestamped tar.gz save backups with failure cleanup, log rotation, a start guard) plus push-to-deploy CI/CD through Coolify, which rebuilds the image and redeploys on every commit. Forked from quartzar/vintage-story-server; the agent tooling, ops automation and 40+ mod management are mine.",
    stack: ["Claude Code skills", "Docker", "Coolify", "CI/CD", "Bash", "SSH"],
    links: [{ label: "repo", href: "https://github.com/QuickWaller/vintage-story-server" }],
  },
  {
    title: "Dwarf Fortress Autonomous Agent",
    status: "LIVE",
    description:
      "A language model autonomously plays a real Dwarf Fortress colony through DFHack, with one hard rule: it is never shown a rendered map. Every spatial fact (connectivity, chokepoints, diggable ground) is computed in code and asserted to the model as structured text instead, since vision-language models read tile maps poorly but reason well over explicit claims. It runs inside a Proxmox VM confined to a pool-scoped API token, the reference instance of the least-privilege sandbox-pool design behind this site's Home Lab Infrastructure project. Verified end to end: a model's own decisions have produced a real building and a real dig, with no raw coordinate ever shown to the deciding process.",
    stack: ["Python", "DFHack", "Lua", "Proxmox VE"],
    links: [
      { label: "watch live", href: "https://dwarf-fortress.willsmith.nz" },
      { label: "repo", href: "https://github.com/QuickWaller/df-overseer" },
    ],
  },
];

export interface OtherWork {
  title: string;
  meta: string;
  description: string;
}

export const otherWork: OtherWork[] = [];

export const skills: { group: string; items: string[] }[] = [
  { group: "Languages", items: ["C", "C++", "C#", "Python", "Java", "TypeScript/JavaScript", "HTML/CSS"] },
  {
    group: "Frameworks",
    items: ["React", "Node.js", "Express", "FastAPI", "Flask", "Arduino/PlatformIO", "Godot", "Unity"],
  },
  {
    group: "Cloud & infrastructure",
    items: [
      "AWS (EC2, Bedrock)",
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
  { group: "Data & APIs", items: ["PostgreSQL", "REST", "WebSockets", "OAuth"] },
  {
    group: "Embedded",
    items: ["ESP32", "Fixed-point arithmetic", "Real-time audio DSP", "Low-power design", "Sensor integration"],
  },
  {
    group: "AI/ML",
    items: ["Generative AI API integration", "Applied ML forecasting (LightGBM)", "MCP servers and agent tooling"],
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
