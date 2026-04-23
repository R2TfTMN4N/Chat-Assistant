# Project Report — Chat-Assistants Monorepo

## 📌 Overview

This monorepo is a TypeScript pnpm workspace using Turbo. It includes two Next.js frontends (`apps/web`, `apps/widget`), a Convex backend (`packages/backend`), and shared UI components (`packages/ui`). Auth is handled via Clerk; AI features use OpenAI/Google AI; notifications and webhooks via Svix.

---

## 🗂️ Structure (short)

- apps/
  - web/ — main Next.js app (Next ^16.0.10, React ^19.1.1)
  - widget/ — widget Next.js app
- packages/
  - backend/ — Convex functions, AI integrations, webhook handlers
  - ui/ — shared React components
  - eslint-config, typescript-config — shared configs
- docs/ — DB schema & ERD
- root files: `DEVELOPMENT.md`, `CI.md`, `.env.example`, per-package READMEs

---

## 🚀 How to run locally (summary)

1. Install: `pnpm install` at repo root.
2. Start backend (Convex):
   - `cd packages/backend`
   - `pnpm dev` (runs `convex dev`)
3. Start frontend(s):
   - `cd apps/web` → `pnpm dev` (port 3000)
   - `cd apps/widget` → `pnpm dev` (if needed)

Notes: Start Convex before running full app flows that call server functions.

---

## 🔐 Environment variables (examples)

- Root `.env.example` enumerates commonly required vars:
  - `CONVEX_DEPLOYMENT`, `OPENAI_API_KEY`, `CLERK_SECRET_KEY`, `CLERK_WEBHOOK_SECRET`, `AWS_*`, `SVIX_SECRET`, `SENTRY_DSN`
- Backend-only: `packages/backend/.env.example` contains server secrets. Always copy to `.env.local` and never commit secrets.

---

## 🧪 Tests & CI

- `CI.md` contains recommended workflows and Playwright guidance.
- Suggested checks for branch protection: `ci/lint-and-build` (lint + typecheck + build), `ci/unit-tests`, `ci/playwright`.
- Playwright tips: prefer running against preview deployments; mock heavy external calls (OpenAI) where possible; upload artifacts on failure.

---

## ⚠️ Notable issues & observations

- Mixed Next.js artifacts present: `.next` folders and mapping files reference Next 15.x in some compiled artifacts despite `package.json` specifying Next ^16.0.10. Action: clean `.next`, verify lockfile, reinstall and rebuild to ensure consistent versions.
- No centralized test script for Playwright in `package.json` (Playwright appears in lockfile). Consider adding test scripts and a `test:e2e` command per package.

---

## ✅ Changes I added (docs)

- `apps/web/README.md` — dev/run/lint/build notes
- `apps/widget/README.md`
- `packages/backend/README.md`
- `packages/ui/README.md`
- `DEVELOPMENT.md` — monorepo runbook
- `.env.example` (root) and `packages/backend/.env.example`
- `CI.md` — CI guide with example GitHub Actions workflows

Files added at: repository root and relevant package folders.

---

## 🔧 Recommended next steps (prioritized)

1. Clean `.next` build artifacts and verify Next dependency versions across workspace (high priority).
2. Add example GitHub Actions workflows to `.github/workflows/` (lint/build and Playwright) and enable branch protection rules (medium priority).
3. Add `test:e2e` scripts and basic Playwright tests (low→medium priority).
4. Document required secrets and set test/dedicated keys in GitHub repository secrets (high priority for secure CI).

---

## 📍 Where to find the docs I created

- `PROJECT_REPORT.md` (this file)
- `DEVELOPMENT.md`
- `CI.md`
- `apps/web/README.md`
- `apps/widget/README.md`
- `packages/backend/README.md`
- `packages/ui/README.md`
- `.env.example` and `packages/backend/.env.example`

---

If you'd like, I can now add the example GitHub Actions workflow files under `.github/workflows/` and/or prepare a PR with these docs and workflows. Which would you prefer next?
