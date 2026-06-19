"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReceiptText, MapPin, HelpCircle, LogOut, LogIn, ChevronRight } from "lucide-react";
import { FoodShell } from "@/components/food/food-shell";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth";
import { useMounted } from "@/hooks/use-mounted";

const MENU = [
  { icon: ReceiptText, label: "Your orders", href: "/my-orders" },
  { icon: MapPin, label: "Saved addresses", href: "#" },
  { icon: HelpCircle, label: "Help & support", href: "#" },
];

export default function AccountPage() {
  const mounted = useMounted();
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const setUser = useAuthStore((s) => s.setUser);

  if (!mounted) {
    return (
      <FoodShell>
        <div className="h-40" />
      </FoodShell>
    );
  }

  if (!user) {
    return (
      <FoodShell>
        <div className="mx-auto max-w-md rounded-2xl border border-border bg-card p-8 text-center">
          <div className="text-5xl">👋</div>
          <h1 className="mt-3 text-xl font-extrabold text-foreground">You&apos;re browsing as a guest</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Sign in to see your orders, saved addresses and more.
          </p>
          <Button asChild size="lg" className="mt-5 w-full">
            <Link href="/login">
              <LogIn className="h-5 w-5" />
              Sign in
            </Link>
          </Button>
        </div>
      </FoodShell>
    );
  }

  return (
    <FoodShell>
      <h1 className="mb-5 text-2xl font-extrabold tracking-tight text-foreground">Account</h1>

      <div className="mb-4 flex items-center gap-4 rounded-2xl border border-border bg-card p-5">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-success text-2xl font-black text-primary-foreground">
          {user.name.charAt(0).toUpperCase()}
        </span>
        <div>
          <div className="text-lg font-extrabold text-foreground">{user.name}</div>
          <div className="text-sm text-muted-foreground">{user.email}</div>
          <span className="mt-1 inline-block rounded-full bg-accent px-2 py-0.5 text-[11px] font-bold capitalize text-brand-foreground">
            {user.role}
          </span>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        {MENU.map((m) => (
          <Link
            key={m.label}
            href={m.href}
            className="flex items-center gap-3 border-b border-border px-5 py-4 text-sm font-bold text-foreground last:border-0 hover:bg-muted"
          >
            <m.icon className="h-5 w-5 text-success" />
            {m.label}
            <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground" />
          </Link>
        ))}
      </div>

      <Button
        variant="outline"
        className="mt-4 w-full"
        onClick={() => {
          setUser(null);
          router.push("/");
        }}
      >
        <LogOut className="h-4 w-4" />
        Log out
      </Button>
    </FoodShell>
  );
}
