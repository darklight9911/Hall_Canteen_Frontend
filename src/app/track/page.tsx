"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { FoodShell } from "@/components/food/food-shell";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const STEPS = [
  { title: "Order placed", sub: "We've received your order" },
  { title: "Preparing your food", sub: "The kitchen is on it" },
  { title: "Out for delivery", sub: "Your rider is on the way" },
  { title: "Delivered", sub: "Enjoy your meal!" },
];

export default function TrackPage() {
  const [step, setStep] = useState(1);

  useEffect(() => {
    const timers = [2, 3, 4].map((s, i) => setTimeout(() => setStep(s), (i + 1) * 2600));
    return () => timers.forEach(clearTimeout);
  }, []);

  const delivered = step >= STEPS.length;

  return (
    <FoodShell>
      <div className="mx-auto max-w-xl">
        {/* Status header */}
        <div className="mb-6 overflow-hidden rounded-2xl bg-success p-7 text-center text-primary-foreground">
          <div className="text-5xl">{delivered ? "🎉" : "🛵"}</div>
          <h1 className="mt-3 text-2xl font-black tracking-tight">
            {delivered ? "Delivered!" : "On the way"}
          </h1>
          <p className="mt-1 text-sm font-semibold text-primary-foreground/85">
            {delivered ? "Hope you enjoy your meal" : "Estimated arrival in 12–15 min"}
          </p>
        </div>

        {/* Timeline */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="space-y-0">
            {STEPS.map((s, i) => {
              const reached = step >= i + 1;
              const current = step === i + 1 && !delivered;
              const last = i === STEPS.length - 1;
              return (
                <div key={s.title} className="flex gap-3.5">
                  <div className="flex flex-col items-center">
                    <span
                      className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-full border-2 transition-colors",
                        reached
                          ? "border-success bg-success text-primary-foreground"
                          : "border-border bg-background text-muted-foreground"
                      )}
                    >
                      {reached ? <Check className="h-4 w-4" /> : <span className="text-xs font-bold">{i + 1}</span>}
                    </span>
                    {!last && (
                      <span className={cn("my-1 w-0.5 flex-1", reached && step > i + 1 ? "bg-success" : "bg-border")} style={{ minHeight: 28 }} />
                    )}
                  </div>
                  <div className={cn("pb-6", last && "pb-0")}>
                    <div className={cn("text-sm font-extrabold", reached ? "text-foreground" : "text-muted-foreground")}>
                      {s.title}
                      {current && <span className="ml-2 inline-block h-2 w-2 animate-pulse rounded-full bg-success align-middle" />}
                    </div>
                    <div className="text-xs text-muted-foreground">{s.sub}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-5 flex gap-3">
          <Button asChild variant="secondary" className="flex-1">
            <Link href="/my-orders">View orders</Link>
          </Button>
          <Button asChild className="flex-1">
            <Link href="/">Back to home</Link>
          </Button>
        </div>
      </div>
    </FoodShell>
  );
}
