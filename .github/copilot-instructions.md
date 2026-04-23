# Copilot / AI Agent Instructions for this repository

Purpose: give AI coding agents the essentials to be productive quickly — high-level architecture, key workflows, conventions, and where to look for agent/RAG logic.

## Quick start (what to run locally)
- pnpm install (from repo root) — this uses pnpm workspaces and the `pnpm-lock.yaml`.
- Start services:
  - Convex backend: `cd packages/backend && pnpm dev` (runs Convex dev server)
  - Web frontend: `cd apps/web && pnpm dev` (Next.js app router, port 3000)
  - Widget: `cd apps/widget && pnpm dev` (optional embedded widget)
  - Or from root use workspace filtering: `pnpm --filter ./packages/backend dev` etc.
- Environment: copy `packages/backend/.env.example` to `packages/backend/.env.local` and set keys (OPENAI_API_KEY, CLERK_*, CONVEX_DEPLOYMENT, AWS_*, SVIX_SECRET).

## Big picture architecture (short)
- Monorepo (pnpm workspace + Turbo). Root scripts are in `package.json` and use `turbo` for build/dev pipelines.
- Frontends: `apps/web` (main Next 16 app router) and `apps/widget` (embeddable widget). UI primitives live in `packages/ui` and are imported as `@workspace/ui`.
- Backend: Convex functions live under `packages/backend/convex` — server-side logic, RAG, and AI agents. Deployments are driven by the Convex CLI (`convex`).
- AI stack: uses `@convex-dev/agent` + `@convex-dev/rag` + third-party providers (OpenAI / Google AI) to implement RAG + LLM agents.

## Where agent & RAG behavior lives (most important files)
- Core agent setup & prompts: `packages/backend/convex/system/ai/agents/supportAgent.ts` and `packages/backend/convex/system/ai/constants.ts` (edit prompts or instruction text here).
- RAG configuration: `packages/backend/convex/system/ai/rag.ts` (where RAG instance is configured and namespaces/embedding providers are wired).
- Tools the agent calls: `packages/backend/convex/system/ai/tools/*.ts` (examples: `search.ts`, `resolveConversation.ts`, `escalateConversation.ts`). Use `createTool` to add new tools.
- File management & embeddings: `packages/backend/convex/private/files.ts` (upload, delete, and index knowledge base documents; interacts with `ctx.storage`).
- Public endpoints / triggers: `packages/backend/convex/public/*.ts` (incoming messages, threads, and webhook handlers).

## Common patterns & conventions
- Use Convex `query`/`mutation` functions in `convex/` and prefer server-side logic in `private/` for sensitive tasks.
- Agent operations use the Convex Agent helpers: e.g., `supportAgent.generateText(...)`, `saveMessage(ctx, components.agent, { ... })`, `supportAgent.createThread(ctx, {...})`.
- Prompts are kept as constants (single-paragraph guidance in `constants.ts`) — edit that file for prompt tuning and keep formatting expectations in comments.
- UI imports use package exports: `import { Button } from "@workspace/ui/components/button"` and global styles at `@workspace/ui/globals.css`.
- Authentication: Clerk is used in web/frontend (`@clerk/nextjs`) — server-only secrets are in `packages/backend/.env.local`.

## Build, lint, CI and tests
- Monorepo commands (root):
  - `pnpm -w build` — builds all packages (turbo-driven)
  - `pnpm -w lint` — workspace lint
  - `pnpm -w format` — prettier
- CI examples and expectations are in `CI.md`. CI runs `pnpm -w lint`, `pnpm -w typecheck` and `pnpm -w build`.
- No unit test harness is present currently — add tests under `packages/*` or `apps/*` and update CI if you add tests.

## Helpful code pointers (quick examples)
- Edit prompt text: `packages/backend/convex/system/ai/constants.ts`
- Add a search tool (example pattern): `createTool({...})` inside `packages/backend/convex/system/ai/tools/search.ts`
- Add document to RAG: see `private/files.ts` — it stores file in `ctx.storage`, calls `rag.add()` and writes a `KnowledgeDocument` entry.

## PR guidance for agents
- Keep changes small and focused (edit prompt or tools in one PR).
- Run Convex dev locally (`pnpm --filter ./packages/backend dev`) and exercise the UI (`apps/web`) to validate agent behavior.
- If editing prompts, include a short test scenario in the PR description demonstrating before/after behavior (example inputs + expected outputs).

## Signals & gotchas for AI agents
- Env keys are required for LLM calls. Local dev without keys: agent calls will fail — add a short note or a mock implementation when writing tests.
- Agents rely on Convex storage & RAG indices. If indexing fails, verify `CONVEX_DEPLOYMENT` and storage permissions.
- Keep prompts concise and single-paragraph where the constant enforces it — the code assumes paragraph-based formatting in some places.

---
If any part of this guidance looks incomplete or you'd like me to add short code examples / PR checklist items, say which section and I will iterate.
