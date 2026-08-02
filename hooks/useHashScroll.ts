import { useCallback, useEffect } from "react";

function getHashTarget() {
  const hash = window.location.hash.slice(1);
  if (!hash) return null;

  let id = hash;
  try {
    id = decodeURIComponent(hash);
  } catch {
    id = hash;
  }

  return (
    document.getElementById(id) ??
    (document.getElementsByName(id)[0] as HTMLElement | undefined) ??
    null
  );
}

/**
 * Scrolls to the element named by the URL hash: once after mount, because the
 * browser's own anchor handling runs before client-rendered content exists,
 * and again on every later hash change.
 */
export function useHashScroll() {
  const scrollToHash = useCallback((behavior: ScrollBehavior = "auto") => {
    getHashTarget()?.scrollIntoView({ block: "start", behavior });
  }, []);

  useEffect(() => {
    // Two frames: the first lets the freshly mounted subtree lay out, the
    // second lets that layout settle before we measure the target.
    let second = 0;
    const first = window.requestAnimationFrame(() => {
      second = window.requestAnimationFrame(() => scrollToHash());
    });

    const handleHashChange = () => {
      window.requestAnimationFrame(() => scrollToHash("smooth"));
    };
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.cancelAnimationFrame(first);
      window.cancelAnimationFrame(second);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [scrollToHash]);
}
