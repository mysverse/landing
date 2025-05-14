"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";

export default function GhostProviderClient(props: {
  slug?: string;
  children: ReactNode;
}) {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, []);
  return props.children;
}
