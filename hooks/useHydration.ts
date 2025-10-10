import { useSyncExternalStore } from "react";

function subscribe() {
  return () => {};
}

export function useHydration() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}
