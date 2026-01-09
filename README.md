# React 19.2 - Lesson 61 - cacheSignal

This is a tiny **Next.js App Router** repo that runs on **React Server Components**, so you can keep all the `cacheSignal()` examples in one place. `cacheSignal` is documented as **React Server Components-only** right now.

## Features

- RSC-focused `cacheSignal()` snippets organized by lesson in `lib/snippets.ts`.
- Example pages that show cancellation, error handling, and the null return outside render.
- API routes that simulate slow work and validate `cacheSignal()` behavior.

## Code snippets

### Pass the render signal into `fetch`

```ts
import { cacheSignal } from "react";

export async function rsc_context_fetchUsers(url: string) {
  return fetch(url, { signal: cacheSignal() ?? undefined });
}
```

### Deduped fetch + cancellation with `cache`

```tsx
import { cache, cacheSignal } from "react";

const dedupedFetch = cache(async (url: string) => {
  const res = await fetch(url, {
    signal: cacheSignal() ?? undefined,
    cache: "no-store",
  });
  return res.json();
});
```

### Ignore cancellation errors after render

```ts
import { cacheSignal } from "react";

try {
  return await maybeFails(cacheSignal());
} catch (err) {
  if (!cacheSignal()?.aborted) {
    console.error("Real error:", err);
  }
  return null;
}
```

## Requirements

- Node.js 18+ (Node 20+ recommended)
- npm / pnpm / yarn

## How to run

```bash
npm install
npm run dev
```

Open:
- `http://localhost:3000`

Optional production run:

```bash
npm run build
npm run start
```

## File map (purpose of every repo file)

- `README.md` - project overview, usage, and documentation.
- `package.json` - scripts, dependencies, and project metadata.
- `package-lock.json` - npm lockfile for repeatable installs.
- `next.config.mjs` - Next.js configuration.
- `next-env.d.ts` - Next.js TypeScript env typings.
- `tsconfig.json` - TypeScript compiler settings.
- `app/layout.tsx` - root layout and HTML shell for all pages.
- `app/page.tsx` - home page with links to examples.
- `app/examples/cancel/page.tsx` - deduped fetch with `cache` + `cacheSignal` cancellation.
- `app/examples/ignore-errors/page.tsx` - ignore cancellation errors pattern.
- `app/examples/return-null/page.tsx` - shows `cacheSignal()` returning `null` outside render.
- `app/api/slow/route.ts` - slow API endpoint to test cancellation timing.
- `app/api/check-signal/route.ts` - API endpoint that calls `cacheSignal()` outside render.
- `lib/snippets.ts` - all lesson snippets used by the README and examples.

## Where to look

- `lib/snippets.ts` - all snippets organized by lesson section
- `app/examples/cancel` - `cache + cacheSignal` cancellation-friendly fetch
- `app/examples/ignore-errors` - ignore cancellation errors pattern
- `app/examples/return-null` - shows `cacheSignal()` returning `null` outside rendering

## Notes

- Cancellation is easiest to observe in real apps where server renders can be superseded (streaming, rapid navigation, etc.). This playground focuses on **correct patterns** rather than forcing a deterministic abort.
