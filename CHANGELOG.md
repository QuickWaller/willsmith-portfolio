# Changelog

Notable changes to [willsmith.nz](https://willsmith.nz).

Versioning: **major** for a redesign or a new section, **minor** for content
or feature changes, **patch** for fixes. The version in `package.json` should
match the latest release here.

---

## [1.4.0] — 2026-09-14

### Removed

- **ESP32-CAM Face Detection** dropped from Other Work (unlinkable private
  repo, matching the same call already made on the CV). The section is now
  empty, so its heading and grid were removed from `Projects.tsx` rather than
  left rendering nothing; the now-dead `.other-work*` CSS rules were removed
  too.
- **`.NET`** and **Stripe** dropped from Technical Skills: no real `.NET`
  work was ever found beyond an abandoned template, and Will wrote 0 of 200
  lines of the capstone's Stripe module.

### Changed

- **Cloud & infrastructure**: `AWS (EC2, Cognito, Bedrock)` → `AWS (EC2,
  Bedrock)`. Cognito stays as project-specific context on the PromptTech card
  rather than a general skill claim.
- **Embedded**: `ESP32/ESP32-CAM` → `ESP32` (the ESP32 FM Synthesiser card
  still uses it; the CAM half went with the Other Work entry above).
- **AI/ML**: `Embedded computer vision` → `MCP servers and agent tooling`,
  re-sourced now that ESP32-CAM (its only basis) is gone, matching the CV's
  current AI/ML line.
- **PromptTech AI Sandbox card**: `Caddy reverse proxy` → `AWS Cognito auth`,
  and added "worked on the Cognito auth flow's dev/prod configuration",
  matching the CV's current capstone bullet.
- CV download refreshed to the 2026-09-03 build (CV `v4.0`).

---

## [1.3.0] — 2026-09-14

### Added

- **Dwarf Fortress Autonomous Agent** project card (`LIVE`): a language model
  plays a real Dwarf Fortress colony via DFHack and is never shown a rendered
  map, running inside a pool-scoped Proxmox sandbox that is the reference
  instance of the least-privilege design behind the Home Lab Infrastructure
  card. Two independently-verified decision-to-mutation loops (a real build,
  a real dig) with no raw coordinate ever exposed to the deciding process.
  Grid goes 8 → 9; the last card now spans both columns so an odd count
  doesn't leave a lopsided row.

---

## [1.2.0] — 2026-09-03

### Added

- **Home Lab Infrastructure** project card (`LIVE`): a self-built two-node
  Proxmox cluster with live inter-node VM migration and a least-privilege
  Proxmox API role/ACL system giving each automated AI agent its own
  restricted resource pool, service account, and scoped token. Grid goes
  7 → 8 cards, landing as a clean 2×4.

---

## [1.1.0] — 2026-08-24

### Added

- **Agent Tooling & Claude Code Harness** project card, with a new `TOOLING`
  status badge and matching style rule. The card leads with the mechanism — a
  permission request racing a desktop popup against a Telegram bot, first
  answer winning, fail-closed on every error path — rather than describing it
  as a repo template, which undersold it.

### Changed

- **PromptTech card corrected.** It claimed a Node.js/Express REST API and AWS
  Cognito. The capstone backend is FastAPI/Python with no Express anywhere, and
  the Cognito integration was a teammate's work. Rewritten around what the
  repo's file-creation history actually shows: architecture and
  containerisation, the FastAPI service skeleton, the initial Bedrock
  integration, the pytest harness, and the Paramiko deployment pipeline.
- **Vintage Story card rewritten** from a one-line mod-management summary to
  the agent-driven ops story — four custom Claude Code skills, the ops script
  suite, and Coolify push-to-deploy CI/CD. Dropped the `C#` stack tag; the game
  is written in C# but none of the code in that repo is.
- **"Multi-Tenant SaaS Infrastructure" → "Multi-Tenant AI Agent Platform"**,
  and "own and operate" → "designed and built end to end", which is what
  actually happened. Stack tags gained FastAPI and React.
- CV download refreshed to the 2026-08-24 build (CV `v3.0`).

---

## [1.0.0] — 2026-08-20

Initial public release. Built and shipped in a single day.

### Added

- React + Vite + TypeScript site with a bespoke CSS design system, no UI
  framework.
- Sections: Hero, Experience, Projects, Skills, Education, Contact.
- **Activity section** — a merged GitHub commit-activity heatmap spanning all
  three of Will's accounts, each queried with its own `read:user` token via a
  scheduled Action, since private-repo counts only appear when queried as that
  account's own `viewer`. Plus a weekly lines-added/removed chart on a log
  scale, because bulk data-file commits run two to three orders of magnitude
  above a normal week.
- Downloadable CV.
- Branded "WS" favicon replacing Vite's default.
- OpenGraph and Twitter card tags with a generated preview image.

### Fixed

Following a review pass with real screenshots:

- A light-mode contrast failure.
- Six dangling `aria-labelledby` references.
- Date-alignment bug in Experience and Education.
- The Vintage Story card rendering an empty void.
- The mobile heatmap being unreadable at roughly 1.8px cells — now scrollable
  at a legible size.

### Infrastructure

- GitHub Pages deployment via Actions, custom domain `willsmith.nz` through
  Cloudflare.

---

## Known gaps

- **HTTPS enforcement** in the repo's Pages settings still needs switching on
  once GitHub's own Let's Encrypt certificate finishes issuing. HTTPS already
  works via Cloudflare's edge certificate in the meantime.
- **The lines-added/removed chart is built but switched off**
  (`SHOW_CODE_CHANGES = false` in `Activity.tsx`). The script, component and
  styling all work; it is disabled because the `CONTRIB_READ_TOKEN*` secrets
  are scoped `read:user`, so `fetch-code-changes.mjs` 403/404s on private
  repos and would silently report public repos only. Flip it on once those
  tokens are widened to `repo` / Contents:Read.
  **This does not affect the heatmap**, which is the only activity graph the
  site actually renders: `fetch-contributions.mjs` queries each account as
  `viewer` with that account's own token, and that *does* include private
  contribution counts. The heatmap is complete.
- **The `TOOLING` badge has not been visually verified** — typecheck, build and
  lint pass and the strings are confirmed present in the bundle, but no
  screenshot was taken.
