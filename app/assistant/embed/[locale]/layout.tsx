import "styles/globals.css";
import type { ReactNode } from "react";
import { isAssistantLocale } from "lib/assistant/types";

export default async function AssistantEmbedLayout({
  children,
  params
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <html lang={isAssistantLocale(locale) ? locale : "en"} suppressHydrationWarning>
      <head>
        <script
          defer
          data-domain="mysver.se"
          src="https://plausible.yan.gg/js/script.js"
        />
      </head>
      <body className="bg-surface-card h-dvh overflow-hidden font-sans">
        {children}
      </body>
    </html>
  );
}
