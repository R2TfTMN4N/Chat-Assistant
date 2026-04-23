# packages/backend — Convex backend

**Purpose**

Backend functions, Convex queries/mutations, RAG/agent and AI tool integrations (OpenAI, Google AI), webhook handlers (Svix), and secrets management.

## Quick start (development)

1. Create a `.env.local` in `packages/backend/` (do **not** commit). See `packages/backend/.env.example` for required vars.

2. Install dependencies (repo root):

```bash
pnpm install
```

3. Start Convex locally:

```bash
cd packages/backend
pnpm dev
```

This runs `convex dev` (see `package.json`). The Convex dev server allows you to run and test functions locally and provides generated `_generated` types.

## Important environment variables

(See `packages/backend/.env.example` and repo `.env.example` for a consolidated list.)

- `OPENAI_API_KEY` — OpenAI key used by server AI tools
- `CLERK_SECRET_KEY` — Clerk server secret
- `CLERK_WEBHOOK_SECRET` — Clerk webhook secret (for verifying webhooks)
- `CLERK_JWT_ISSUER_DOMAIN` — Clerk JWT issuer domain
- `CONVEX_DEPLOYMENT` — Convex deployment id (for productioning deployments)
- `AWS_REGION`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY` — if AWS integrations are used
- `SVIX_SECRET` — svix webhook secret

> Keep `.env.local` out of git. `packages/backend/.gitignore` already lists `.env.local`.

## Notes

- Generated Convex types in `packages/backend/convex/_generated` are useful for local typechecking and for referencing DB schema.
- There are several AI integrations (OpenAI, Google AI) used by the RAG and agent code; ensure keys are present and correct.
- If you modify the Convex schema or functions, regenerate or rely on Convex tooling to update `_generated` types.
