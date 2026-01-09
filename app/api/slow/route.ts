function sleep(ms: number, signal?: AbortSignal) {
  return new Promise<void>((resolve, reject) => {
    const t = setTimeout(() => resolve(), ms);

    if (signal) {
      if (signal.aborted) {
        clearTimeout(t);
        reject(new Error("aborted"));
        return;
      }
      signal.addEventListener(
        "abort",
        () => {
          clearTimeout(t);
          reject(new Error("aborted"));
        },
        { once: true }
      );
    }
  });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ms = Number(searchParams.get("ms") ?? "1000");
  const started = Date.now();

  try {
    await sleep(ms, request.signal);
  } catch {
    // Even if the client aborts, the handler might still run depending on runtime.
  }

  return Response.json({
    ok: true,
    tookMs: Date.now() - started,
    at: new Date().toISOString(),
  });
}
