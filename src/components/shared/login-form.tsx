"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithPopup, signOut } from "firebase/auth";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { auth, googleProvider } from "@/lib/firebase";
import { loginWithEmail, loginWithGoogleToken, registerWithEmail } from "@/lib/auth-api";
import { EMAIL_POLICY_MESSAGE, isAllowedEmail } from "@/lib/email-policy";
import { useAuthStore } from "@/store/auth";

type Mode = "signin" | "register";

export function LoginForm() {
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);
  const [mode, setMode] = useState<Mode>("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  function message(err: unknown): string {
    return err instanceof Error && err.message ? err.message : "Something went wrong";
  }

  async function onGoogle() {
    if (!auth) {
      toast.error("Google sign-in isn't configured yet");
      return;
    }
    setLoading(true);
    try {
      const cred = await signInWithPopup(auth, googleProvider);
      if (!isAllowedEmail(cred.user.email ?? "")) {
        await signOut(auth);
        toast.error(EMAIL_POLICY_MESSAGE);
        return;
      }
      const idToken = await cred.user.getIdToken();
      // Exchange the Firebase token for a backend Redis session (httpOnly cookie).
      const user = await loginWithGoogleToken(idToken);
      setUser(user);
      toast.success("Signed in with Google");
      router.push("/");
    } catch (err) {
      const code = (err as { code?: string })?.code;
      if (code !== "auth/popup-closed-by-user" && code !== "auth/cancelled-popup-request") {
        toast.error(message(err));
      }
    } finally {
      setLoading(false);
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Enter your email and password");
      return;
    }
    if (!isAllowedEmail(email)) {
      toast.error(EMAIL_POLICY_MESSAGE);
      return;
    }
    if (mode === "register" && password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }
    setLoading(true);
    try {
      const user =
        mode === "register"
          ? await registerWithEmail(email, password, name)
          : await loginWithEmail(email, password);
      setUser(user);
      toast.success(mode === "register" ? "Account created" : "Signed in");
      router.push("/");
    } catch (err) {
      toast.error(message(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <Button
        type="button"
        variant="secondary"
        size="lg"
        className="w-full"
        onClick={onGoogle}
        disabled={loading}
      >
        <GoogleIcon />
        Continue with Google
      </Button>

      <div className="flex items-center gap-3">
        <span className="h-px flex-1 bg-border" />
        <span className="text-xs font-semibold text-muted-foreground">or continue with email</span>
        <span className="h-px flex-1 bg-border" />
      </div>

      {/* Sign in / Create account toggle */}
      <div className="grid grid-cols-2 gap-1 rounded-lg bg-muted p-1">
        {(["signin", "register"] as Mode[]).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className={cn(
              "rounded-md px-3 py-1.5 text-sm font-bold transition-colors",
              mode === m ? "bg-background text-foreground shadow-card" : "text-muted-foreground"
            )}
          >
            {m === "signin" ? "Sign in" : "Create account"}
          </button>
        ))}
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        {mode === "register" && (
          <div className="space-y-2">
            <Label htmlFor="name">Full name</Label>
            <Input
              id="name"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@diu.edu.bd"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button type="submit" size="lg" className="w-full" disabled={loading}>
          {mode === "register" ? "Create account" : "Sign in"}
        </Button>
        <p className="text-center text-xs text-muted-foreground">{EMAIL_POLICY_MESSAGE}</p>
      </form>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}
