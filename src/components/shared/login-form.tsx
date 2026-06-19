"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth";
import type { Role } from "@/types";

const ROLES: Role[] = ["student", "staff", "admin"];

export function LoginForm() {
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("student");
  const [loading, setLoading] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Enter your email and password");
      return;
    }
    setLoading(true);
    // No backend wiring yet — demo sign-in that seeds the auth store.
    setUser({
      id: "demo",
      name: email.split("@")[0] || "Guest",
      email,
      role,
    });
    toast.success("Signed in");
    router.push("/menu");
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="you@campus.edu"
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
      <div className="space-y-2">
        <Label>Sign in as</Label>
        <div className="grid grid-cols-3 gap-2">
          {ROLES.map((r) => (
            <button
              type="button"
              key={r}
              onClick={() => setRole(r)}
              className={cn(
                "rounded-md border px-3 py-2 text-xs font-bold capitalize transition-colors",
                role === r
                  ? "border-primary bg-accent text-foreground"
                  : "border-border text-muted-foreground hover:bg-muted"
              )}
            >
              {r}
            </button>
          ))}
        </div>
      </div>
      <Button type="submit" size="lg" className="w-full" disabled={loading}>
        Sign in
      </Button>
    </form>
  );
}
