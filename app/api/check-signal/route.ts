import { cacheSignal } from "react";

export async function GET() {
  const signal = cacheSignal();

  return Response.json({
    cacheSignalType: signal === null ? "null" : Object.prototype.toString.call(signal),
    aborted: signal?.aborted ?? null,
    note: "cacheSignal() returns null when called outside of rendering",
  });
}
