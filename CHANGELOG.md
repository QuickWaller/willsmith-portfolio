# Changelog

Notable changes to [willsmith.nz](https://willsmith.nz).

Versioning: **major** for a redesign or a new section, **minor** for content
or feature changes, **patch** for fixes. The version in `package.json` should
match the latest release here.

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
