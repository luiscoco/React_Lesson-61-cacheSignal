import type { ReactNode } from "react";

export const metadata = {
  title: "cacheSignal Playground",
  description: "Tiny playground for React 19.2 cacheSignal in React Server Components",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "sans-serif", margin: 0, padding: 24 }}>
        {children}
      </body>
    </html>
  );
}
