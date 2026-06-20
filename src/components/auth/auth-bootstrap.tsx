"use client";

import { useEffect } from "react";
import { fetchMe } from "@/lib/auth-api";
import { useAuthStore } from "@/store/auth";

/**
 * Hydrates the auth store from the backend session cookie on load.
 * The backend (Redis-backed httpOnly session) is the source of truth — not
 * client state — so we ask `/auth/me` who we are and set/clear accordingly.
 */
export function AuthBootstrap() {
  const setUser = useAuthStore((s) => s.setUser);

  useEffect(() => {
    let active = true;
    fetchMe().then((user) => {
      if (active) setUser(user);
    });
    return () => {
      active = false;
    };
  }, [setUser]);

  return null;
}
