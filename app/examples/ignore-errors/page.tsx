import Link from "next/link";
import { cacheSignal } from "react";

async function maybeFails(signal: AbortSignal | null) {
  // Simulate a task that may throw if it gets cancelled
  await new Promise<void>((resolve, reject) => {
    const t = setTimeout(() => resolve(), 400);

    signal?.addEventListener(
      "abort",
      () => {
        clearTimeout(t);
        reject(new Error("Cancelled"));
      },
      { once: true }
    );
  });

  return { ok: true };
}

async function getData() {
  try {
    return await maybeFails(cacheSignal());
  } catch (err) {
    // Ignore errors that were due to cancellation.
    if (!cacheSignal()?.aborted) {
      console.error("Real error:", err);
    }
    return null;
  }
}

export default async function IgnoreErrorsAfterRender() {
  const data = await getData();

  return (
    <main>
      <p>
        <Link href="/">← Home</Link>
      </p>

      <h1 style={{ marginTop: 0 }}>Ignore cancellation errors after render</h1>
      <p>
        This example shows the pattern: in a catch block, check whether
        <code> cacheSignal()?.aborted</code> is true before logging.
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
        {JSON.stringify(data, null, 2)}
      </pre>

      <p style={{ fontSize: 14, opacity: 0.85 }}>
        Note: It is hard to force a cancellation on demand in a tiny demo, but
        this is the exact structure you’d use around fetch/database calls.
      </p>
    </main>
  );
}
