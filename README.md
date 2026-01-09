# React 19.2 - Lesson 61 - cacheSignal

This is a tiny **Next.js App Router** repo that runs on **React Server Components**, so you can keep all the `cacheSignal()` examples in one place. `cacheSignal` is documented as **React Server Components-only** right now.

## 1. Features

- RSC-focused `cacheSignal()` snippets organized by lesson in `lib/snippets.ts`.
- Example pages that show cancellation, error handling, and the null return outside render.
- API routes that simulate slow work and validate `cacheSignal()` behavior.

<img width="1008" height="574" alt="image" src="https://github.com/user-attachments/assets/aafbca53-438e-4b03-a637-8880a9f14b10" />

<img width="1086" height="608" alt="image" src="https://github.com/user-attachments/assets/337ecaa4-070a-49f8-b5f7-fac20596dcc1" />

<img width="1163" height="537" alt="image" src="https://github.com/user-attachments/assets/c809cc25-ca61-4b6d-b963-4f41bc1ecb65" />

<img width="908" height="535" alt="image" src="https://github.com/user-attachments/assets/256c21a7-ac8a-4223-9e0e-c9427cc5cf93" />

## 2. Code snippets

### 2.1. Pass the render signal into `fetch`

```ts
import { cacheSignal } from "react";

export async function rsc_context_fetchUsers(url: string) {
  return fetch(url, { signal: cacheSignal() ?? undefined });
}
```

### 2.2. Deduped fetch + cancellation with `cache`

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

### 2.3. Ignore cancellation errors after render

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

## 3. Requirements

- Node.js 18+ (Node 20+ recommended)
- npm / pnpm / yarn

## 4. How to run

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

## 5. File map (purpose of every repo file)

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

## 6. Where to look

- `lib/snippets.ts` - all snippets organized by lesson section
- `app/examples/cancel` - `cache + cacheSignal` cancellation-friendly fetch
- `app/examples/ignore-errors` - ignore cancellation errors pattern
- `app/examples/return-null` - shows `cacheSignal()` returning `null` outside rendering

## 7. Notes

- Cancellation is easiest to observe in real apps where server renders can be superseded (streaming, rapid navigation, etc.). This playground focuses on **correct patterns** rather than forcing a deterministic abort.
