"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import TurnstileWidget from "./TurnstileWidget";
import { ASSISTANT_COPY } from "lib/assistant/copy";
import {
  isAllowedAssistantOrigin,
  parseHostContextMessage
} from "lib/assistant/post-message";
import {
  truncateHistory,
  sanitizePageContext
} from "lib/assistant/validation";
import type {
  AssistantChatResponse,
  AssistantLocale,
  AssistantMessage,
  AssistantPageContext
} from "lib/assistant/types";

const STORAGE_PREFIX = "mysverse-assistant:v1";

function safeAssistantHref(href: string | undefined): string | null {
  if (!href) return null;
  try {
    const url = new URL(href);
    return url.protocol === "https:" &&
      ["mysver.se", "www.mysver.se", "mys.wiki", "www.mys.wiki"].includes(
        url.hostname
      )
      ? url.toString()
      : null;
  } catch {
    return null;
  }
}

function track(
  event: "open" | "send" | "success" | "error" | "citation-click",
  locale: AssistantLocale,
  surface: string
) {
  window.plausible?.("askMysverse", {
    props: { action: event, locale, surface }
  });
}

export default function AssistantApp({
  locale: initialLocale,
  mode
}: {
  locale: AssistantLocale;
  mode: "embed" | "page";
}) {
  const [locale, setLocale] = useState(initialLocale);
  const copy = ASSISTANT_COPY[locale];
  const storageKey = `${STORAGE_PREFIX}:${locale}`;
  const [loaded, setLoaded] = useState(false);
  const [available, setAvailable] = useState<boolean | null>(null);
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [ageChecked, setAgeChecked] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [sessionToken, setSessionToken] = useState("");
  const [messages, setMessages] = useState<AssistantMessage[]>([]);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [remaining, setRemaining] = useState<number | null>(null);
  const [pageContext, setPageContext] = useState<AssistantPageContext>(() => ({
    url: "https://mysver.se",
    title: "MYSverse",
    surface: mode === "page" ? "full-page" : "landing"
  }));
  const listEnd = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLTextAreaElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const parentOrigin = useRef<string | null>(null);
  const openTracked = useRef(false);

  const surface = pageContext.surface;

  useEffect(() => {
    fetch("/api/assistant/session", { cache: "no-store" })
      .then((response) => response.json())
      .then((result: { enabled?: boolean }) => {
        const enabled = result.enabled === true;
        setAvailable(enabled);
        if (!enabled && mode === "embed" && parentOrigin.current)
          window.parent.postMessage(
            { type: "mysverse:assistant:disabled" },
            parentOrigin.current
          );
      })
      .catch(() => setAvailable(false));
  }, [mode]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      try {
        const stored = JSON.parse(
          sessionStorage.getItem(storageKey) || "{}"
        ) as {
          ageConfirmed?: boolean;
          sessionToken?: string;
          messages?: AssistantMessage[];
        };
        setAgeConfirmed(stored.ageConfirmed === true);
        setAgeChecked(stored.ageConfirmed === true);
        setSessionToken(
          typeof stored.sessionToken === "string" ? stored.sessionToken : ""
        );
        setMessages(
          Array.isArray(stored.messages) ? truncateHistory(stored.messages) : []
        );
      } catch {
        sessionStorage.removeItem(storageKey);
      }
      setLoaded(true);
    });
    return () => cancelAnimationFrame(frame);
  }, [locale, storageKey]);

  useEffect(() => {
    if (
      !loaded ||
      openTracked.current ||
      (mode === "embed" && pageContext.url === "https://mysver.se")
    )
      return;
    openTracked.current = true;
    track("open", locale, surface);
  }, [loaded, locale, mode, pageContext.url, surface]);

  useEffect(() => {
    if (!loaded) return;
    sessionStorage.setItem(
      storageKey,
      JSON.stringify({
        ageConfirmed,
        sessionToken,
        messages: truncateHistory(messages)
      })
    );
  }, [ageConfirmed, loaded, messages, sessionToken, storageKey]);

  useEffect(() => {
    listEnd.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, busy]);

  useEffect(() => {
    if (mode !== "embed") {
      const frame = requestAnimationFrame(() =>
        setPageContext(
          sanitizePageContext({
            url: window.location.href,
            title: document.title,
            surface: "full-page"
          })
        )
      );
      return () => cancelAnimationFrame(frame);
    }

    try {
      const referrerOrigin = new URL(document.referrer).origin;
      if (isAllowedAssistantOrigin(referrerOrigin, window.location.origin))
        parentOrigin.current = referrerOrigin;
    } catch {
      parentOrigin.current = null;
    }
    if (parentOrigin.current)
      window.parent.postMessage(
        { type: "mysverse:assistant:ready" },
        parentOrigin.current
      );
    const receive = (event: MessageEvent) => {
      if (!isAllowedAssistantOrigin(event.origin, window.location.origin)) return;
      const hostMessage = parseHostContextMessage(event.data);
      if (!hostMessage) return;
      parentOrigin.current = event.origin;
      setLocale(hostMessage.locale);
      setPageContext(hostMessage.pageContext);
      document.documentElement.classList.toggle(
        "dark",
        hostMessage.theme === "dark"
      );
    };
    window.addEventListener("message", receive);
    closeButton.current?.focus();
    const trapFocus = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (parentOrigin.current)
          window.parent.postMessage(
            { type: "mysverse:assistant:close" },
            parentOrigin.current
          );
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = Array.from(
        document.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      ).filter((element) => !element.hasAttribute("hidden"));
      const first = focusable[0];
      const last = focusable.at(-1);
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", trapFocus);
    return () => {
      window.removeEventListener("message", receive);
      document.removeEventListener("keydown", trapFocus);
    };
  }, [mode]);

  useEffect(() => {
    if (mode !== "embed") return;
    const observer = new ResizeObserver(() => {
      if (parentOrigin.current)
        window.parent.postMessage(
          {
            type: "mysverse:assistant:resize",
            height: document.documentElement.scrollHeight
          },
          parentOrigin.current
        );
    });
    observer.observe(document.body);
    return () => observer.disconnect();
  }, [mode]);

  const close = () => {
    if (mode === "embed" && parentOrigin.current)
      window.parent.postMessage(
        { type: "mysverse:assistant:close" },
        parentOrigin.current
      );
  };

  const beginSession = useCallback(async () => {
    if (!ageChecked || !turnstileToken) return;
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/assistant/session", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ageConfirmed: true, turnstileToken })
      });
      if (!response.ok) throw new Error(copy.genericError);
      const result = (await response.json()) as { token: string };
      setSessionToken(result.token);
      setAgeConfirmed(true);
      requestAnimationFrame(() => input.current?.focus());
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : copy.genericError);
      track("error", locale, surface);
    } finally {
      setBusy(false);
    }
  }, [ageChecked, copy.genericError, locale, surface, turnstileToken]);

  const send = useCallback(async () => {
    const content = message.trim();
    if (!content || busy || !sessionToken) return;
    setBusy(true);
    setError("");
    setMessage("");
    const history = truncateHistory(messages);
    setMessages((current) => truncateHistory([...current, { role: "user", content }]));
    track("send", locale, surface);

    try {
      const response = await fetch("/api/assistant/chat", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${sessionToken}`
        },
        body: JSON.stringify({
          message: content,
          history,
          locale,
          pageContext
        })
      });
      const result = (await response.json()) as AssistantChatResponse & {
        error?: { code?: string; message?: string };
      };
      if (!response.ok) {
        if (response.status === 401) {
          setSessionToken("");
          setAgeConfirmed(false);
          setTurnstileToken("");
        }
        throw new Error(
          response.status === 429
            ? copy.rateLimited
            : result.error?.message || copy.genericError
        );
      }
      setMessages((current) =>
        truncateHistory([
          ...current,
          {
            role: "assistant",
            content: result.answerMarkdown,
            sources: result.sources
          }
        ])
      );
      setRemaining(result.remainingQuota.day);
      track("success", locale, surface);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : copy.genericError);
      track("error", locale, surface);
    } finally {
      setBusy(false);
      requestAnimationFrame(() => input.current?.focus());
    }
  }, [
    busy,
    copy.genericError,
    copy.rateLimited,
    locale,
    message,
    messages,
    pageContext,
    sessionToken,
    surface
  ]);

  const fullPageUrl = useMemo(() => `https://mysver.se/${locale}/assistant`, [locale]);

  if (!loaded || available === null)
    return (
      <div className="text-body grid h-full place-items-center p-6" role="status">
        {copy.searching}
      </div>
    );

  if (!available)
    return (
      <div className="text-body grid h-full place-items-center p-8 text-center">
        <p>{copy.unavailable}</p>
      </div>
    );

  return (
    <div className="bg-surface-card text-strong flex h-full min-h-0 flex-col">
      <header className="border-edge flex shrink-0 items-center justify-between gap-3 border-b px-4 py-3">
        <div className="min-w-0">
          <h1 className="truncate text-base font-bold">{copy.name}</h1>
          <p className="text-muted truncate text-xs">{copy.tagline}</p>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          {mode === "embed" && (
            <a
              href={fullPageUrl}
              target="_blank"
              rel="noreferrer"
              className="text-body hover:bg-surface-raised rounded-lg px-2 py-1 text-xs font-semibold"
            >
              {copy.openFullPage}
            </a>
          )}
          {mode === "embed" && (
            <button
              ref={closeButton}
              type="button"
              onClick={close}
              aria-label={copy.close}
              className="hover:bg-surface-raised grid size-9 place-items-center rounded-lg text-xl"
            >
              ×
            </button>
          )}
        </div>
      </header>

      {!ageConfirmed || !sessionToken ? (
        <main className="flex min-h-0 flex-1 flex-col justify-center overflow-y-auto p-6">
          <div className="mx-auto w-full max-w-md">
            <div className="bg-primary/10 text-primary mb-4 grid size-11 place-items-center rounded-xl text-xl" aria-hidden="true">
              ✦
            </div>
            <h2 className="text-xl font-bold">{copy.ageTitle}</h2>
            <p className="text-body mt-2 text-sm leading-6">{copy.ageBody}</p>
            <label className="border-edge mt-5 flex cursor-pointer items-start gap-3 rounded-xl border p-3 text-sm leading-5">
              <input
                type="checkbox"
                checked={ageChecked}
                onChange={(event) => setAgeChecked(event.target.checked)}
                className="accent-primary mt-0.5 size-4"
              />
              <span>{copy.ageConfirm}</span>
            </label>
            <div className="mt-4">
              <TurnstileWidget onToken={setTurnstileToken} />
            </div>
            <button
              type="button"
              disabled={!ageChecked || !turnstileToken || busy}
              onClick={beginSession}
              className="bg-primary mt-4 w-full rounded-xl px-4 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              {busy ? copy.turnstileWaiting : copy.ageContinue}
            </button>
            <p className="text-muted mt-3 text-center text-xs">{copy.privacyNote}</p>
            {error && <p className="mt-3 text-sm text-red-600" role="alert">{error}</p>}
          </div>
        </main>
      ) : (
        <>
          <main className="min-h-0 flex-1 overflow-y-auto px-4 py-4" aria-label={copy.name}>
            <div className="mx-auto flex max-w-2xl flex-col gap-4">
              {messages.length === 0 && (
                <div className="bg-surface-raised text-body rounded-2xl rounded-tl-sm p-4 text-sm leading-6">
                  {copy.welcome}
                </div>
              )}
              {messages.map((item, index) => (
                <article
                  key={`${item.role}-${index}`}
                  className={
                    item.role === "user"
                      ? "bg-primary ml-auto max-w-[88%] rounded-2xl rounded-br-sm px-4 py-3 text-sm leading-6 text-white"
                      : "bg-surface-raised mr-auto max-w-[95%] rounded-2xl rounded-tl-sm px-4 py-3 text-sm leading-6"
                  }
                >
                  {item.role === "assistant" ? (
                    <ReactMarkdown
                      allowedElements={["p", "ul", "ol", "li", "strong", "em", "a", "code", "br"]}
                      components={{
                        a: ({ href, children }) => {
                          const safeHref = safeAssistantHref(href);
                          return safeHref ? (
                            <a
                              href={safeHref}
                              target="_blank"
                              rel="noreferrer"
                              className="text-primary font-semibold underline underline-offset-2"
                            >
                              {children}
                            </a>
                          ) : (
                            <span>{children}</span>
                          );
                        }
                      }}
                    >
                      {item.content}
                    </ReactMarkdown>
                  ) : (
                    item.content
                  )}
                  {item.sources && item.sources.length > 0 && (
                    <div className="border-edge mt-3 border-t pt-3">
                      <p className="text-muted mb-2 text-xs font-semibold uppercase tracking-wide">{copy.sources}</p>
                      <div className="flex flex-wrap gap-2">
                        {item.sources.map((source) => (
                          <a
                            key={source.fileId}
                            href={source.url}
                            target="_blank"
                            rel="noreferrer"
                            onClick={() => track("citation-click", locale, surface)}
                            className="border-edge bg-surface-card text-strong hover:border-primary rounded-full border px-3 py-1 text-xs font-semibold"
                          >
                            {source.title}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </article>
              ))}
              {busy && (
                <div className="bg-surface-raised text-body mr-auto rounded-2xl rounded-tl-sm px-4 py-3 text-sm" role="status">
                  {copy.searching}
                </div>
              )}
              <div ref={listEnd} />
            </div>
          </main>
          <footer className="border-edge shrink-0 border-t p-3">
            <div className="mx-auto max-w-2xl">
              {error && <p className="mb-2 text-sm text-red-600" role="alert">{error}</p>}
              <div className="border-edge bg-surface-card focus-within:border-primary flex items-end gap-2 rounded-2xl border p-2">
                <textarea
                  ref={input}
                  value={message}
                  maxLength={1000}
                  rows={1}
                  aria-label={copy.placeholder}
                  placeholder={copy.placeholder}
                  disabled={busy}
                  onChange={(event) => setMessage(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && !event.shiftKey) {
                      event.preventDefault();
                      void send();
                    }
                  }}
                  className="text-strong placeholder:text-muted max-h-32 min-h-10 flex-1 resize-none bg-transparent px-2 py-2 text-sm outline-none"
                />
                <button
                  type="button"
                  disabled={!message.trim() || busy}
                  onClick={() => void send()}
                  className="bg-primary min-h-10 rounded-xl px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
                >
                  {copy.send}
                </button>
              </div>
              <div className="text-muted mt-1 flex justify-between px-1 text-[11px]">
                <span>{copy.privacyNote}</span>
                <span>{remaining === null ? `${message.length}/1000` : copy.remaining.replace("{count}", String(remaining))}</span>
              </div>
              <div className="sr-only" aria-live="polite">{busy ? copy.searching : error}</div>
            </div>
          </footer>
        </>
      )}
    </div>
  );
}
