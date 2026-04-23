# packages/ui — Shared UI components

**Purpose**

Shared React components used by `apps/web` and `apps/widget`. Exposes components via the `@workspace/ui` workspace alias.

## Usage

From other packages in the monorepo (example in `apps/web`):

```ts
import { Button } from "@workspace/ui";
```

## Development

- No special dev server; run the consuming app (e.g. `apps/web`) and changes to `packages/ui` will be picked up by the bundler / workspace linker.
- If you add build steps here, document them in this README.

## Notes

- Keep components small and well-documented in code comments.
- Prefer exporting types and components so apps can import them using the workspace alias.
