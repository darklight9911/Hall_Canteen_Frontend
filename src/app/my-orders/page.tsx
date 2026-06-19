import type { Metadata } from "next";
import Link from "next/link";
import { FoodShell } from "@/components/food/food-shell";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { pastOrders, formatTaka } from "@/lib/restaurants";

export const metadata: Metadata = { title: "Your Orders" };

export default function MyOrdersPage() {
  return (
    <FoodShell>
      <h1 className="mb-5 text-2xl font-extrabold tracking-tight text-foreground">Your orders</h1>
      <div className="space-y-3">
        {pastOrders.map((o) => (
          <div key={o.id} className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-muted text-2xl">
              {o.emoji}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="truncate font-extrabold text-foreground">{o.rest}</span>
                <span
                  className={cn(
                    "shrink-0 rounded-full px-2 py-0.5 text-[11px] font-bold capitalize",
                    o.status === "delivered" ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
                  )}
                >
                  {o.status}
                </span>
              </div>
              <p className="truncate text-sm text-muted-foreground">{o.items}</p>
              <p className="text-xs text-muted-foreground">{o.id} · {o.date}</p>
            </div>
            <div className="shrink-0 text-right font-extrabold text-foreground">{formatTaka(o.total)}</div>
          </div>
        ))}
      </div>
      <Button asChild variant="secondary" className="mt-5">
        <Link href="/">Order again</Link>
      </Button>
    </FoodShell>
  );
}
