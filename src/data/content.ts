export const experience = {
  role: "Technical Consultant",
  company: "Novatec Solutions, Auckland",
  dates: "February 2026 – Present",
  blurb:
    "An MSP for small-to-medium businesses. Work varies between management of client systems and self-managed projects.",
  // Wording is Will's own, verbatim from CV v5.1. Don't paraphrase it.
  groups: [
    {
      title:
        "Designed and built company-hosted infrastructure, migrated existing client Wordpress sites and ended the company's third-party hosting costs",
      items: [
        {
          label: "Physical / Data Link",
          text: "Installed physical host machines, UPS backups, switches, WAPs and routers",
        },
        {
          label: "Network",
          text: "Connected VMs across restricted networks with a Tailscale mesh VPN, also used for secure remote access.",
        },
        {
          label: "Virtualisation",
          text: "Managed ESXi/Proxmox infrastructure, using Ubuntu/Debian VMs for production and development hosting",
        },
        {
          label: "Network Ingress",
          text: "Configured DNS and Cloudflare Access to connect origin servers and reverse-proxies to public internet via tunnels without opening inbound ports",
        },
      ],
    },
    {
      title: "Developed and deployed new client sites (including company website https://novatec.co.nz)",
      link: { text: "https://novatec.co.nz", href: "https://novatec.co.nz" },
      items: [
        { label: "Containerisation", text: "Designed reproducible Docker services deployed via CD" },
        {
          label: "Front-end",
          text: "Used custom Claude Code harnesses to rapidly build static React front-ends.",
        },
        {
          label: "Back-end",
          text: "Deployed a lightweight backend, forwarding customer contact forms to client inboxes.",
        },
      ],
    },
    {
      title: "Built integration and AI technologies into existing workflows.",
      items: [
        {
          label: "N8N / MCP",
          text: "Developed custom N8N flows, integrating Xero's client invoice records and supplier-side invoicing into MCP tools for easier access and manipulation via AI agents",
        },
        {
          label: "Microsoft Graph / MCP",
          text: "Used FastMCP to wrap Microsoft Graph endpoints to produce experimental custom workflows related to email, calendar and OneDrive",
        },
        {
          label: "Agent Management",
          text: "Developed custom agents using Hermes/Openclaw for streamlining business logic",
        },
      ],
    },
    {
      title: "Administered client systems.",
      items: [
        { label: "Microsoft Admin Centre", text: "Reviewed users, user groups and roles" },
        { label: "Microsoft Purview", text: "Investigated potentially malicious/phishing activity" },
        {
          label: "Domains / DNS",
          text: "Managed client domains and DNS records including email authentication (DKIM, SPF)",
        },
      ],
    },
  ],
};

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
      "A full-stack application for comparing LLM responses across models, providers and settings. Designed overall architecture and co-developed the project.",
    stack: ["FastAPI", "React", "PostgreSQL", "AWS", "Docker"],
    links: [],
    note: "Capstone Project (Industry Client), 2025, graded A. No public repo.",
  },
  {
    title: "Home Lab Infrastructure",
    status: "LIVE",
    description:
      "A two-node Proxmox cluster hosting my own projects. No open inbound ports: Cloudflare Tunnel for public traffic, Tailscale for admin. Each AI agent gets its own locked-down resource pool and API token.",
    stack: ["Proxmox VE", "Tailscale", "Cloudflare Tunnel"],
    links: [],
    note: "Personal infrastructure. Private repo, no public link.",
  },
  {
    title: "Hiking Data Logger / Weather Pod",
    status: "FIRMWARE",
    description:
      "A low-power hiking logger with GPS, weather sensors and an e-ink display. Forecasts rain with a LightGBM model trained on ~31M rows of satellite and reanalysis data.",
    stack: ["C++", "Python", "LightGBM"],
    links: [{ label: "repo", href: "https://github.com/QuickWaller/hiking-weather-pod" }],
  },
  {
    title: "ESP32 FM Synthesiser",
    status: "FIRMWARE",
    description:
      "Developed real-time FM synthesis on an ESP32 microcontroller, supporting polyphony across a multi-octave chromatic scale. Began a fixed-point rework, starting with a Q16.16 ADSR envelope generator for chips without hardware floating point.",
    stack: ["C++", "ESP32", "DSP"],
    links: [
      { label: "esp32-fm-synth", href: "https://github.com/QuickWaller/esp32-fm-synth" },
      {
        label: "fixed-point rework (WIP)",
        href: "https://github.com/QuickWaller/esp32-synth-fixed-point-wip",
      },
    ],
  },
  {
    title: "Claude Code Harness & Repository Template",
    status: "TOOLING",
    description:
      "A repository template designed for agentic development, with a decision register, live state tracking and an indexed memory store. Hub and spoke orchestration via parallel subagents, each isolated in its own git worktree.",
    stack: ["Claude Code", "PowerShell", "Git"],
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
      "A dedicated game server run through natural language with custom Claude Code skills, plus automated backups and push-to-deploy via Coolify. Forked from quartzar/vintage-story-server.",
    stack: ["Docker", "Coolify", "Claude Code", "Bash"],
    links: [{ label: "repo", href: "https://github.com/QuickWaller/vintage-story-server" }],
  },
  {
    title: "Dwarf Fortress Autonomous Agent",
    status: "LIVE",
    description:
      "A language model plays a real Dwarf Fortress colony through DFHack without ever seeing the map: spatial facts are computed in code and given to it as text. Runs in a locked-down VM on my home lab.",
    stack: ["Python", "DFHack", "Lua", "Proxmox VE"],
    links: [
      { label: "watch live", href: "https://dwarf-fortress.willsmith.nz" },
      { label: "repo", href: "https://github.com/QuickWaller/df-overseer" },
    ],
  },
];

export const education = {
  institution: "University of Auckland",
  degree: "Conjoint degree",
  dates: "2021 – 2026, graduated",
  highlights: ["Bachelor of Science, Computer Science", "Bachelor of Commerce, Economics"],
};

export const contact = {
  email: "willsmithnz365@gmail.com",
  github: "https://github.com/QuickWaller",
  githubLabel: "github.com/QuickWaller",
  linkedin: "https://www.linkedin.com/in/will-smith-1b5068294",
  linkedinLabel: "linkedin.com/in/will-smith-1b5068294",
  repo: "https://github.com/QuickWaller/willsmith-portfolio",
};
