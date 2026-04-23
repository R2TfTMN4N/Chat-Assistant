# CI Guide — GitHub Actions & Test Recommendations ✅

This document describes recommended CI workflows, Playwright E2E guidance, caching, and secrets to make PRs reliable and fast.

---

## Goals

- Run lint, typecheck, and build on every PR ✅
- Run unit / integration tests (when present) ✅
- Run Playwright E2E tests against a deployed preview or temporary server ✅
- Cache pnpm installs and build artifacts for speed ✅

---

## Recommended checks (set as required on the branch protection rule)

- `ci/lint-and-build` — lint + typecheck + build
- `ci/unit-tests` — (if unit tests exist)
- `ci/playwright` — Playwright E2E (only on certain branches or PRs)

---

## Secrets to add to GitHub repository settings

- `OPENAI_API_KEY` (only if tests rely on AI calls — prefer mocking)
- `CLERK_SECRET_KEY` / `CLERK_WEBHOOK_SECRET`
- `CONVEX_DEPLOYMENT` (if using a test Convex deployment)
- `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY` / `AWS_REGION`
- `SVIX_SECRET`
- `SENTRY_DSN` (optional)

Do not add production secrets to PR-run workflows; use a dedicated test account where possible.

---

## Example: `ci/lint-and-build` workflow (recommended)

Path: `.github/workflows/ci-lint-build.yml`

```yaml
name: CI — Lint & Build
on: [push, pull_request]

jobs:
  lint-build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "pnpm"
      - name: Install pnpm
        run: corepack enable && corepack prepare pnpm@latest --activate
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
      - name: Lint
        run: pnpm -w lint
      - name: Typecheck
        run: pnpm -w typecheck
      - name: Build (all)
        run: pnpm -w build --silent
      - name: Upload build artifacts (optional)
        uses: actions/upload-artifact@v4
        with:
          name: build-artifacts
          path: |
            apps/web/.next
            apps/widget/.next
```

Notes:

- Use `pnpm -w` workspace commands to run across the monorepo.
- Use `--frozen-lockfile` to ensure CI reproducible installs.

---

## Example: Playwright E2E workflow

Path: `.github/workflows/playwright.yml`

```yaml
name: E2E — Playwright
on:
  pull_request:
    branches: [main]

jobs:
  e2e:
    runs-on: ubuntu-latest
    services: {}

    steps:
      - uses: actions/checkout@v4
      - name: Setup Node & pnpm
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "pnpm"
      - name: Install pnpm
        run: corepack enable && corepack prepare pnpm@latest --activate
      - name: Install deps
        run: pnpm install --frozen-lockfile
      - name: Build web app
        run: pnpm --filter ./apps/web build
      - name: Start server in background
        run: pnpm --filter ./apps/web start &
      - name: Wait for app
        run: npx wait-on http://localhost:3000 --timeout 120000
      - name: Install Playwright browsers
        run: pnpm dlx playwright install --with-deps
      - name: Run Playwright tests
        run: pnpm --filter ./packages/backend test:e2e || pnpm --filter ./apps/web test:e2e
```

Notes:

- Prefer running Playwright against a **deployed preview** (Vercel preview URL in PR) for realistic integration tests. If using deployed preview, use `VERCEL_URL` or `PR_DEPLOY_URL` environment variable.
- If backend functions are required, either deploy a test Convex instance or mock services in tests. Add `CONVEX_DEPLOYMENT` secret for the test deployment where needed.

---

## Caching tips

- Use Node/pnpm caching (actions/setup-node cache: 'pnpm') and `pnpm store` caching for faster installs.
- Cache build outputs selectively if you have heavy builds; avoid caching `.next` between different Node/Next versions.

---

## Playwright specifics & recommendations

- Keep E2E tests deterministic; mock heavy external calls (OpenAI) when possible.
- For tests that require the real AI stack, provision a dedicated **test** OpenAI key and set it as a GitHub secret with rate and cost limits in mind.
- Set `PWDEBUG=1` locally for debugging failing tests and use `npx playwright show-report` to view reports artifacted by CI.
- Upload Playwright report artifacts (screenshots, trace, videos) on failure using `actions/upload-artifact`.

Example (upload trace on failure):

```yaml
- name: Upload Playwright report
  if: failure()
  uses: actions/upload-artifact@v4
  with:
    name: playwright-report
    path: playwright-report
```

---

## Recommendations & next steps

- Add CI checks to branch protection and require passing `ci-lint-build` before merging. ✅
- Add a lightweight Playwright matrix for `firefox/chromium/webkit` runs only on main branch or nightly to reduce PR latency. ✅
- Add a short `CI.md` to this repository (this file) and consider adding example workflow files in `.github/workflows/` as needed.

---

If you want, I can also:

- Add example workflow YAML files directly under `.github/workflows/` in this repo, or
- Create a `ci/` folder with a `Makefile` or helper scripts to standardize starting a local test server for Playwright.

Which would you prefer next?
