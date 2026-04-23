# Development runbook — Monorepo overview

## Prerequisites

- Node.js 18+ (recommended)
- pnpm (8+ recommended)
- Git

## Install

From repository root:

```bash
pnpm install
```

This installs all workspace dependencies.

## Start all services (recommended order)

1. Start Convex backend (server-side functions and AI integrations):

```bash
cd packages/backend
pnpm dev
```

2. Start frontends (in separate terminals):

```bash
# Web (main frontend)
cd apps/web
pnpm dev

# Widget (optional)
cd apps/widget
pnpm dev
```

Alternatively, use workspace filtering from the root:

```bash
pnpm --filter ./packages/backend dev
pnpm --filter ./apps/web dev
```

## Cleaning & Next.js version mismatch

If you suspect mixed Next versions or stale build artifacts:

```bash
# Remove build artifacts
rm -rf apps/*/.next
# Optional: remove top-level node_modules and lockfile and reinstall
rm -rf node_modules
rm -f pnpm-lock.yaml
pnpm install
```

Then re-run `pnpm dev`.

## Common commands

- `pnpm --filter ./apps/web dev` — start `apps/web` locally
- `pnpm --filter ./apps/widget dev` — start `apps/widget` locally
- `pnpm --filter ./packages/backend dev` — start Convex dev server
- `pnpm -w lint` — run workspace linter
- `pnpm -w build` — build all packages (depends on `turbo` config)

## Environment variables

See `.env.example` at repo root and `packages/backend/.env.example` for the set of environment variables used across packages.

## Notes & next steps

- Add CI steps to run `pnpm -w lint`, `pnpm -w build`, and tests.
- Add `pnpm -w test` or Playwright test tasks if tests are added.
- Consider a short `dev:all` script at root that starts the backend and frontends in parallel (e.g. with `concurrently`) if useful for local development.
