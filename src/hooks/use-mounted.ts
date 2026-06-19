"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * Returns true only after client-side hydration. Uses useSyncExternalStore so
 * the server snapshot is `false` and the client snapshot is `true` — hydration-safe
 * with no setState-in-effect. Gate reads of persisted client state (e.g. the
 * Zustand auth store) on this to avoid hydration mismatches.
 */
export function useMounted() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}
