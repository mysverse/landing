"use client";

import { useEffect, useId, useRef } from "react";

export default function TurnstileWidget({
  onToken
}: {
  onToken: (token: string) => void;
}) {
  const id = useId().replace(/:/g, "");
  const container = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  useEffect(() => {
    if (!siteKey || !container.current) return;
    let cancelled = false;

    const render = () => {
      if (cancelled || !container.current || widgetId.current || !window.turnstile)
        return;
      widgetId.current = window.turnstile.render(container.current, {
        sitekey: siteKey,
        theme: "auto",
        size: "flexible",
        callback: onToken,
        "expired-callback": () => onToken(""),
        "error-callback": () => onToken("")
      });
    };

    if (window.turnstile) {
      render();
    } else {
      const existing = document.querySelector<HTMLScriptElement>(
        'script[data-mysverse-turnstile="true"]'
      );
      const script = existing || document.createElement("script");
      if (!existing) {
        script.src =
          "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
        script.async = true;
        script.defer = true;
        script.dataset.mysverseTurnstile = "true";
        document.head.appendChild(script);
      }
      script.addEventListener("load", render, { once: true });
    }

    return () => {
      cancelled = true;
      if (widgetId.current && window.turnstile) {
        window.turnstile.remove(widgetId.current);
        widgetId.current = null;
      }
    };
  }, [onToken, siteKey]);

  if (!siteKey) return null;
  return <div id={`turnstile-${id}`} ref={container} className="min-h-16" />;
}
