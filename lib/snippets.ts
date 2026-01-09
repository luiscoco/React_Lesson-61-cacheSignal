import { cache, cacheSignal } from "react";

// =========================
// Lesson: cacheSignal
// =========================

// Introduction: basic usage inside an RSC render.
export async function intro_basicFetch(url: string) {
  const signal = cacheSignal();
  const res = await fetch(url, { signal: signal ?? undefined });
  return res;
}

// React Server Components context: same idea, but shown as a Server Component helper.
export async function rsc_context_fetchUsers(url: string) {
  return fetch(url, { signal: cacheSignal() ?? undefined });
}

// What cacheSignal provides: returns AbortSignal during rendering, null outside.
export function what_returns() {
  return cacheSignal();
}

// Core idea: pass the render-lifetime signal down into helpers.
export async function core_passDown(url: string) {
  const signal = cacheSignal();
  return helper(url, signal);
}

async function helper(url: string, signal: AbortSignal | null) {
  return fetch(url, { signal: signal ?? undefined });
}

// Usage: cancelling in-flight requests (dedupe + cancel).
export const cancel_dedupedFetch = cache(async (url: string) => {
  const res = await fetch(url, { signal: cacheSignal() ?? undefined });
  return res;
});

// Important pitfall: DO NOT start async work outside of rendering if you expect cancellation.
// This is intentionally kept as a function (not top-level) so it doesn't execute automatically.
export function pitfall_outsideRender_startWorkTooEarly(url: string) {
  const request = fetch(url, { signal: cacheSignal() ?? undefined });
  return request;
}

// Usage: ignoring errors after rendering finishes.
export async function ignoreErrors_pattern<T>(work: () => Promise<T>) {
  try {
    return await work();
  } catch (err) {
    if (!cacheSignal()?.aborted) {
      // Only log if it's a real error (not due to cancellation)
      console.error(err);
    }
    return null;
  }
}

// Parameters: none.
export function parameters_none() {
  return cacheSignal();
}

// Return value: AbortSignal during rendering, otherwise null.
export function returnValue_demo() {
  const signal = cacheSignal();
  return { isNull: signal === null, aborted: signal?.aborted ?? null };
}

// Caveats: in Client Components this is currently null; don't hard-code that assumption forever.
export function caveats_clientComponentNote() {
  const signal = cacheSignal();
  return signal;
}
