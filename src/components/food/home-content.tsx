"use client";

import { useState } from "react";
import Link from "next/link";
import {
  restaurants,
  items,
  MEALS,
  PROMOS,
  WHY_CARDS,
  mealLabel,
  type Meal,
} from "@/lib/restaurants";
import { cn } from "@/lib/utils";
import { RestaurantCard } from "./restaurant-card";
import { DishCard } from "./dish-card";

export function HomeContent() {
  const [meal, setMeal] = useState<Meal | "all">("all");

  const visibleRest = restaurants.filter((r) => meal === "all" || r.meals.includes(meal));
  let popSource = items.filter((i) => i.popular);
  if (meal !== "all") {
    const ids = visibleRest.map((r) => r.id);
    const f = popSource.filter((i) => ids.includes(i.rid));
    if (f.length) popSource = f;
  }
  const popularDishes = popSource.slice(0, 8);

  return (
    <div className="animate-content-in space-y-7">
      {/* HERO */}
      <section
        className="relative overflow-hidden rounded-2xl px-6 py-10 md:px-14 md:py-16"
        style={{ background: "linear-gradient(115deg,#0C831F 0%,#0a6f1a 60%,#0b7d1d 100%)" }}
      >
        <div className="relative z-10 max-w-xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand px-3 py-1.5 text-xs font-extrabold text-brand-foreground">
            🕐 Delivered to your room in minutes
          </span>
          <h1 className="my-4 text-[30px] font-black leading-[1.05] tracking-tight text-white md:text-[46px]">
            Campus food,
            <br />
            delivered to your block
          </h1>
          <p className="mb-5 max-w-md text-sm leading-relaxed text-white/85 md:text-[17px]">
            Breakfast, lunch, supper &amp; dinner from restaurants around campus — fresh, affordable,
            and at your door. No login needed to browse.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#restaurants"
              className="flex items-center gap-2 rounded-[14px] bg-brand px-6 py-3.5 text-base font-extrabold text-brand-foreground"
            >
              Explore restaurants →
            </a>
            <Link
              href="/login"
              className="rounded-[14px] border-[1.5px] border-white/45 bg-white/10 px-6 py-3.5 text-base font-bold text-white"
            >
              Sign in
            </Link>
          </div>
        </div>
        <div className="pointer-events-none absolute right-[5%] top-1/2 hidden -translate-y-1/2 text-[150px] opacity-95 md:block">🍛</div>
        <div className="pointer-events-none absolute right-[24%] top-[22%] hidden text-[64px] md:block">🍗</div>
        <div className="pointer-events-none absolute bottom-[14%] right-[17%] hidden text-[58px] md:block">☕</div>
      </section>

      {/* MEAL TABS */}
      <div className="scrollbar-hide flex gap-2.5 overflow-x-auto pb-1">
        {MEALS.map((m) => (
          <button
            key={m.key}
            onClick={() => setMeal(m.key)}
            className={cn(
              "flex flex-none items-center gap-1.5 rounded-full border-[1.5px] px-[18px] py-2.5 text-sm font-bold transition-colors",
              meal === m.key
                ? "border-success bg-success text-primary-foreground"
                : "border-border bg-card text-foreground hover:bg-muted"
            )}
          >
            <span className="text-[17px]">{m.emoji}</span>
            {m.label}
          </button>
        ))}
      </div>

      {/* PROMO STRIP */}
      <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
        {PROMOS.map((p) => (
          <button
            key={p.title}
            onClick={() => setMeal(p.meal)}
            className="relative min-h-24 overflow-hidden rounded-2xl px-5 py-[18px] text-left"
            style={{ background: p.bg }}
          >
            <div className="relative z-10">
              <div className="text-base font-extrabold text-foreground">{p.title}</div>
              <div className="mb-2.5 text-[13px] text-muted-foreground">{p.sub}</div>
              <span className="text-[13px] font-extrabold text-success">Order now →</span>
            </div>
            <div className="absolute bottom-2 right-3.5 text-[46px] opacity-95">{p.emoji}</div>
          </button>
        ))}
      </div>

      {/* RESTAURANTS */}
      <section id="restaurants" className="scroll-mt-24 space-y-4">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-xl font-extrabold tracking-tight text-foreground md:text-2xl">
            {meal === "all" ? "Restaurants near your hall" : `${mealLabel(meal)} near your hall`}
          </h2>
          <span className="shrink-0 text-sm font-bold text-success">{visibleRest.length} open now</span>
        </div>
        <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
          {visibleRest.map((r) => (
            <RestaurantCard key={r.id} r={r} />
          ))}
        </div>
      </section>

      {/* POPULAR DISHES */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold tracking-tight text-foreground md:text-2xl">Popular right now</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {popularDishes.map((d) => (
            <DishCard key={d.id} item={d} />
          ))}
        </div>
      </section>

      {/* WHY */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold tracking-tight text-foreground md:text-2xl">Why Hall Canteen?</h2>
        <div className="grid grid-cols-2 gap-3.5 lg:grid-cols-4">
          {WHY_CARDS.map((w) => (
            <div key={w.title} className="rounded-2xl border border-border bg-card p-5">
              <div className="mb-3 flex h-[42px] w-[42px] items-center justify-center rounded-xl bg-[#FBF4DA] text-xl">
                {w.icon}
              </div>
              <div className="mb-1 text-[15px] font-extrabold text-foreground">{w.title}</div>
              <div className="text-[13px] leading-snug text-muted-foreground">{w.sub}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
