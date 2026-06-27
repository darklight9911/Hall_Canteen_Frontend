import { api } from "@/lib/api";
import type { Role, User } from "@/types";

// Shape returned by the backend (FastAPI UserRead).
interface BackendUser {
  id: string;
  email: string;
  full_name: string;
  role: Role;
  avatar?: string | null;
}

const AUTH = "/api/v1/auth";

function toUser(u: BackendUser): User {
  return {
    id: u.id,
    name: u.full_name || u.email.split("@")[0],
    email: u.email,
    role: u.role,
    avatar: u.avatar ?? undefined,
  };
}

export function loginWithGoogleToken(idToken: string): Promise<User> {
  return api.post<BackendUser>(`${AUTH}/login/google`, { id_token: idToken }).then(toUser);
}

export function loginWithEmail(email: string, password: string): Promise<User> {
  return api.post<BackendUser>(`${AUTH}/login`, { email, password }).then(toUser);
}

export function registerWithEmail(
  email: string,
  password: string,
  fullName: string
): Promise<User> {
  return api
    .post<BackendUser>(`${AUTH}/register`, { email, password, full_name: fullName })
    .then(toUser);
}

/** Returns the signed-in user from the session cookie, or null if not authenticated. */
export async function fetchMe(): Promise<User | null> {
  try {
    return toUser(await api.get<BackendUser>(`${AUTH}/me`));
  } catch {
    return null;
  }
}

export function updateProfile(input: {
  fullName?: string;
  avatar?: string;
}): Promise<User> {
  return api
    .patch<BackendUser>(`${AUTH}/me`, {
      full_name: input.fullName ?? null,
      avatar: input.avatar ?? null,
    })
    .then(toUser);
}

export async function logoutBackend(): Promise<void> {
  try {
    await api.post(`${AUTH}/logout`, {});
  } catch {
    // ignore — clear local state regardless
  }
}
