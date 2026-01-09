import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1 style={{ marginTop: 0 }}>cacheSignal Playground</h1>
      <p>
        This is a tiny Next.js App Router project (React Server Components) meant
        to host the cacheSignal snippets.
      </p>

      <h2>Examples</h2>
      <ul>
        <li>
          <Link href="/examples/cancel">Cancel in-flight fetch (cache + cacheSignal)</Link>
        </li>
        <li>
          <Link href="/examples/ignore-errors">Ignore cancellation errors after render</Link>
        </li>
        <li>
          <Link href="/examples/return-null">cacheSignal returns null outside rendering</Link>
        </li>
      </ul>

      <h2>Where the snippets live</h2>
      <p>
        Open <code>lib/snippets.ts</code> to see the full set of code samples
        organized by lesson section.
      </p>

      <hr />
      <p style={{ fontSize: 14, opacity: 0.8 }}>
        Note: cacheSignal is documented as React Server Components-only at the
        moment.
      </p>
    </main>
  );
}
