import Link from "next/link";
import { headers } from "next/headers";
import { cache, cacheSignal } from "react";

async function getOrigin() {
  const h = await headers();
  const proto = h.get("x-forwarded-proto") ?? "http";
  const host = h.get("host") ?? "localhost:3000";
  return `${proto}://${host}`;
}

const dedupedFetch = cache(async (url: string) => {
  const res = await fetch(url, {
    // The signal will be aborted when the render is finished/aborted/failed
    signal: cacheSignal() ?? undefined,
    cache: "no-store",
  });
  return res.json() as Promise<{ ok: boolean; tookMs: number; at: string }>;
});

export default async function CancelInFlight() {
  const url = `${await getOrigin()}/api/slow?ms=2000`;
  const data = await dedupedFetch(url);

  return (
    <main>
      <p>
        <Link href="/">← Home</Link>
      </p>

      <h1 style={{ marginTop: 0 }}>Cancel in-flight requests</h1>
      <p>
        This page calls a deduped fetch and passes <code>cacheSignal()</code> as the
        AbortSignal.
      </p>

      <h2>Result</h2>
      <pre
        style={{
          padding: 12,
          background: "#f6f6f6",
          borderRadius: 8,
          overflowX: "auto",
        }}
      >
        {JSON.stringify({ url, ...data }, null, 2)}
      </pre>

      <p style={{ fontSize: 14, opacity: 0.85 }}>
        Tip: during streaming or quick navigations, React may abort a render. In
        that case, fetch work tied to the signal can be canceled.
      </p>
    </main>
  );
}
