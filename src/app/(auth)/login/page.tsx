import type { Metadata } from "next";
import Link from "next/link";
import { Wordmark } from "@/components/shared/wordmark";
import { LoginForm } from "@/components/shared/login-form";

export const metadata: Metadata = { title: "Sign in" };

export default function LoginPage() {
  return (
    <main className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center bg-gradient-to-br from-brand/15 via-background to-accent px-4 py-10">
      <div className="w-full max-w-sm space-y-6 rounded-xl border border-border bg-card p-8 shadow-card-hover">
        <div className="flex flex-col items-center gap-2 text-center">
          <Wordmark className="text-3xl" />
          <h1 className="mt-2 text-xl font-extrabold tracking-tight">Welcome back</h1>
          <p className="text-sm text-muted-foreground">
            Sign in to order from your campus canteen
          </p>
        </div>
        <LoginForm />
        <div className="border-t border-border pt-4 text-center text-sm">
          <span className="text-muted-foreground">New to Hall Canteen? </span>
          <Link href="/partner/apply" className="font-extrabold text-success hover:underline">
            Apply to become a partner →
          </Link>
        </div>
      </div>
    </main>
  );
}
