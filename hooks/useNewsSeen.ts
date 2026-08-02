"use client";

import { useCallback, useSyncExternalStore } from "react";
import { useHydration } from "hooks/useHydration";

const STORAGE_KEY = "mysverse:news-seen";

const listeners = new Set<() => void>();

function subscribe(onStoreChange: () => void) {
  listeners.add(onStoreChange);
  // Keep two tabs in step.
  window.addEventListener("storage", onStoreChange);
  return () => {
    listeners.delete(onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

function getSnapshot() {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    // Private mode / storage disabled — treat as never seen.
    return null;
  }
}

/**
 * Tracks whether the visitor has opened the news since it last changed, keyed on
 * the feed's ISO `Timestamp`.
 *
 * `unread` stays false until hydration: localStorage isn't readable on the
 * server, so without the gate every visitor would get a badge in the SSR markup
 * and returning visitors would watch it vanish.
 */
export function useNewsSeen(updatedAt: string | null, notify: boolean) {
  const hydrated = useHydration();
  const seen = useSyncExternalStore(subscribe, getSnapshot, () => null);

  const markSeen = useCallback(() => {
    if (!updatedAt) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, updatedAt);
    } catch {
      // Nothing to do — the badge just reappears next visit.
    }
    listeners.forEach((listener) => listener());
  }, [updatedAt]);

  const unread = hydrated && notify && !!updatedAt && seen !== updatedAt;

  return { unread, markSeen };
}
