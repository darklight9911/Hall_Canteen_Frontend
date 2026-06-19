import Link from "next/link";
import {
  ArrowRight,
  Truck,
  Leaf,
  Wallet,
  BellRing,
  Clock,
  type LucideIcon,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { CategoryTile } from "@/components/shared/category-tile";
import { MenuItemCard } from "@/components/shared/menu-item-card";
import { categoryMeta, menuItems } from "@/lib/mock";
import type { MenuCategory } from "@/types";

const CATEGORIES: MenuCategory[] = ["breakfast", "lunch", "dinner", "snacks"];

const FEATURED_IDS = ["m6", "m7", "m2", "m13", "m9", "m16", "m1", "m15"];
const featured = FEATURED_IDS
  .map((id) => menuItems.find((m) => m.id === id))
  .filter((m): m is (typeof menuItems)[number] => Boolean(m));

const PROMOS: { title: string; sub: string; emoji: string; className: string }[] = [
  { title: "Breakfast combos", sub: "Start your day for less", emoji: "🥞", className: "bg-accent" },
  { title: "Late-night cravings", sub: "Snacks till midnight", emoji: "🍟", className: "bg-info/10" },
  { title: "Bulk orders for events", sub: "Feeding the whole hall?", emoji: "🍱", className: "bg-success/10" },
];

const VALUE_PROPS: { icon: LucideIcon; title: string; sub: string }[] = [
  { icon: Truck, title: "10-minute delivery", sub: "Hot food, straight to your block" },
  { icon: Leaf, title: "Fresh & hygienic", sub: "Cooked to order in the campus kitchen" },
  { icon: Wallet, title: "Student-friendly prices", sub: "Honest pricing, no surprises" },
  { icon: BellRing, title: "Live order tracking", sub: "Know exactly when it's ready" },
];

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="mx-auto w-full max-w-7xl flex-1 space-y-12 px-4 py-8">
        {/* Hero */}
        <section className="relative overflow-hidden rounded-xl bg-success text-success-foreground">
          <div className="absolute -right-10 -top-10 hidden h-72 w-72 rounded-full bg-brand/25 blur-2xl md:block" />
          <div className="relative grid gap-6 px-6 py-10 md:grid-cols-2 md:items-center md:px-12 md:py-16">
            <div className="space-y-5">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand px-3 py-1 text-xs font-extrabold text-brand-foreground">
                <Clock className="h-3.5 w-3.5" />
                Delivery in 10 minutes
              </span>
              <h1 className="text-3xl font-black leading-tight tracking-tight md:text-5xl">
                Campus food,
                <br />
                delivered in minutes
              </h1>
              <p className="max-w-md text-sm text-success-foreground/90 md:text-base">
                Breakfast, lunch, dinner & snacks from your hall canteen — fresh,
                affordable and at your door. No login needed to browse.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button asChild variant="cart" size="lg">
                  <Link href="/menu">
                    Explore menu
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
                <Link
                  href="/login"
                  className="inline-flex h-12 items-center justify-center rounded-lg border border-white/40 px-6 text-base font-bold text-white transition-colors hover:bg-white/10"
                >
                  Sign in
                </Link>
              </div>
            </div>
            <div className="relative hidden justify-end md:flex">
              <div className="flex items-center justify-center text-[9rem] leading-none drop-shadow-lg">
                🍛
              </div>
              <div className="absolute left-0 top-2 text-6xl">🍔</div>
              <div className="absolute bottom-0 left-16 text-5xl">🥗</div>
              <div className="absolute right-2 top-0 text-5xl">☕</div>
            </div>
          </div>
        </section>

        {/* Shop by category */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-extrabold text-foreground">Shop by category</h2>
            <Link href="/menu" className="text-sm font-bold text-primary hover:underline">
              see all
            </Link>
          </div>
          <div className="scrollbar-hide flex gap-3 overflow-x-auto pb-1">
            {CATEGORIES.map((c) => (
              <CategoryTile key={c} label={c} emoji={categoryMeta[c].emoji} href="/menu" />
            ))}
          </div>
        </section>

        {/* Promo cards */}
        <section className="grid gap-4 sm:grid-cols-3">
          {PROMOS.map((p) => (
            <Link
              key={p.title}
              href="/menu"
              className={`group flex items-center justify-between gap-3 rounded-lg border border-border p-5 transition-shadow hover:shadow-card-hover ${p.className}`}
            >
              <div>
                <h3 className="text-base font-extrabold text-foreground">{p.title}</h3>
                <p className="mt-0.5 text-sm text-muted-foreground">{p.sub}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-primary">
                  Order now
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
              <span className="text-5xl">{p.emoji}</span>
            </Link>
          ))}
        </section>

        {/* Best sellers */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-extrabold text-foreground">Best sellers</h2>
            <Link href="/menu" className="text-sm font-bold text-primary hover:underline">
              see all
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {featured.map((m) => (
              <MenuItemCard key={m.id} item={m} mrp={m.mrp} emoji={m.emoji} />
            ))}
          </div>
        </section>

        {/* Why Hall Canteen */}
        <section className="space-y-4">
          <h2 className="text-lg font-extrabold text-foreground">Why Hall Canteen?</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {VALUE_PROPS.map(({ icon: Icon, title, sub }) => (
              <div key={title} className="rounded-lg border border-border bg-card p-5 shadow-card">
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent">
                  <Icon className="h-6 w-6 text-success" />
                </span>
                <h3 className="mt-3 text-base font-extrabold text-foreground">{title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{sub}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA band */}
        <section className="flex flex-col items-center justify-between gap-4 rounded-xl bg-brand px-6 py-8 text-center text-brand-foreground sm:flex-row sm:text-left">
          <div>
            <h2 className="text-2xl font-black tracking-tight">Hungry already?</h2>
            <p className="mt-1 text-sm font-semibold text-brand-foreground/80">
              Browse the full menu and order in seconds — no account required.
            </p>
          </div>
          <Button asChild size="lg" className="shrink-0">
            <Link href="/menu">
              Order now
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </section>
      </main>

      <Footer />
    </div>
  );
}
