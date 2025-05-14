// components/ReloadingScript.tsx
"use client";

import { useEffect } from "react";

interface Props extends Partial<HTMLScriptElement> {
  src: string;
  strategy?: "afterInteractive" | "lazyOnload" | "beforeInteractive" | "worker";
}

export default function ReloadingScript({ src, ...attrs }: Props) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = src;

    // copy any extra props (async, id, data-*, etc)
    Object.entries(attrs).forEach(([key, value]) => {
      if (value != null) script.setAttribute(key, String(value));
    });

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [src]); // re-runs only if src changes

  return null;
}
