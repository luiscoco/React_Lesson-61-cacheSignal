import Link from "next/link";
import { headers } from "next/headers";

async function getOrigin() {
  const h = await headers();
  const proto = h.get("x-forwarded-proto") ?? "http";
  const host = h.get("host") ?? "localhost:3000";
  return `${proto}://${host}`;
}

export default async function ReturnNullDemo() {
  const url = `${await getOrigin()}/api/check-signal`;
  const res = await fetch(url, { cache: "no-store" });
  const data = await res.json();

  return (
    <main>
      <p>
        <Link href="/">← Home</Link>
      </p>

      <h1 style={{ marginTop: 0 }}>cacheSignal returns null outside rendering</h1>
      <p>
        The API route calls <code>cacheSignal()</code> outside of any React render.
        Per the docs, it should return null.
      </p>

      <h2>Result</h2>
      <pre style={{ padding: 12, background: "#f6f6f6", borderRadius: 8, overflowX: "auto" }}>
        {JSON.stringify({ url, ...data }, null, 2)}
      </pre>
    </main>
  );
}
