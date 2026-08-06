"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTheme } from "app/_components/ThemeProvider";
import { ASSISTANT_COPY } from "lib/assistant/copy";
import {
  isAllowedAssistantOrigin,
  parseFrameMessage,
  type HostContextMessage
} from "lib/assistant/post-message";
import type { AssistantLocale } from "lib/assistant/types";

export default function AssistantHost({ locale }: { locale: AssistantLocale }) {
  const pathname = usePathname();
  const { resolvedTheme } = useTheme();
  const [available, setAvailable] = useState(false);
  const [open, setOpen] = useState(false);
  const iframe = useRef<HTMLIFrameElement>(null);
  const launcher = useRef<HTMLButtonElement>(null);
  const copy = ASSISTANT_COPY[locale];

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/assistant/session", { signal: controller.signal, cache: "no-store" })
      .then((response) => response.json())
      .then((result: { enabled?: boolean }) => setAvailable(result.enabled === true))
      .catch(() => setAvailable(false));
    return () => controller.abort();
  }, []);

  const sendContext = useCallback(() => {
    if (!iframe.current?.contentWindow) return;
    const message: HostContextMessage = {
      type: "mysverse:assistant:host-context",
      locale,
      theme: resolvedTheme,
      pageContext: {
        url: window.location.href,
        title: document.title,
        surface: "landing"
      }
    };
    iframe.current.contentWindow.postMessage(message, window.location.origin);
  }, [locale, resolvedTheme]);

  useEffect(() => {
    if (open) sendContext();
  }, [open, pathname, sendContext]);

  useEffect(() => {
    const receive = (event: MessageEvent) => {
      if (
        event.source !== iframe.current?.contentWindow ||
        !isAllowedAssistantOrigin(event.origin, window.location.origin)
      )
        return;
      const message = parseFrameMessage(event.data);
      if (!message) return;
      if (message.type === "mysverse:assistant:ready") sendContext();
      if (message.type === "mysverse:assistant:close") {
        setOpen(false);
        requestAnimationFrame(() => launcher.current?.focus());
      }
      if (message.type === "mysverse:assistant:disabled") setAvailable(false);
    };
    window.addEventListener("message", receive);
    return () => window.removeEventListener("message", receive);
  }, [sendContext]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        requestAnimationFrame(() => launcher.current?.focus());
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  if (!available || pathname.endsWith("/assistant")) return null;

  return (
    <>
      {open && (
        <section
          role="dialog"
          aria-modal="true"
          aria-label={copy.name}
          className="bg-surface-card border-edge fixed inset-0 z-100 overflow-hidden border shadow-2xl sm:inset-auto sm:right-5 sm:bottom-24 sm:h-[min(640px,calc(100vh-7rem))] sm:w-[400px] sm:rounded-2xl"
        >
          <iframe
            ref={iframe}
            src={`/assistant/embed/${locale}`}
            title={copy.name}
            className="h-full w-full border-0"
            sandbox="allow-scripts allow-forms allow-same-origin allow-popups allow-popups-to-escape-sandbox"
            onLoad={sendContext}
          />
        </section>
      )}
      <button
        ref={launcher}
        type="button"
        aria-expanded={open}
        aria-haspopup="dialog"
        onClick={() => setOpen((value) => !value)}
        className="bg-primary fixed right-4 bottom-4 z-90 flex min-h-12 items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white shadow-xl transition hover:brightness-95 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-red-500 motion-reduce:transition-none sm:right-5 sm:bottom-5"
      >
        <span aria-hidden="true" className="text-lg">{open ? "×" : "✦"}</span>
        <span>{open ? copy.close : copy.launcher}</span>
      </button>
    </>
  );
}
