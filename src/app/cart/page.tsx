"use client";

import Link from "next/link";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { FoodShell } from "@/components/food/food-shell";
import { Button } from "@/components/ui/button";
import { useFoodCart } from "@/store/food-cart";
import {
  cartLines,
  cartSavings,
  cartSubtotal,
  deliveryFee,
  packFee,
  grandTotal,
  formatTaka,
  restaurantById,
} from "@/lib/restaurants";

export default function CartPage() {
  const cart = useFoodCart((s) => s.cart);
  const cartRestaurant = useFoodCart((s) => s.cartRestaurant);
  const incKey = useFoodCart((s) => s.incKey);
  const decKey = useFoodCart((s) => s.decKey);

  const lines = cartLines(cart);
  const restaurant = cartRestaurant ? restaurantById(cartRestaurant) : null;
  const subtotal = cartSubtotal(cart);
  const savings = cartSavings(cart);
  const delivery = deliveryFee(cart);
  const pack = packFee(cart);
  const total = grandTotal(cart);
  const toFree = Math.max(0, 199 - subtotal);

  return (
    <FoodShell>
      <h1 className="mb-5 text-2xl font-extrabold tracking-tight text-foreground">Your cart</h1>

      {lines.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card py-16 text-center">
          <span className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-muted">
            <ShoppingBag className="h-7 w-7 text-muted-foreground" />
          </span>
          <h3 className="text-base font-extrabold text-foreground">Your cart is empty</h3>
          <p className="mt-1 max-w-xs text-sm text-muted-foreground">
            Browse restaurants around your hall and add a few dishes.
          </p>
          <Button asChild className="mt-4">
            <Link href="/">Explore restaurants</Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          {/* Items */}
          <div className="space-y-3">
            {restaurant && (
              <Link
                href={`/restaurants/${restaurant.id}`}
                className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4"
              >
                <span className="text-3xl">{restaurant.emoji}</span>
                <div>
                  <div className="font-extrabold text-foreground">{restaurant.name}</div>
                  <div className="text-xs text-muted-foreground">{restaurant.eta} · {restaurant.distance}</div>
                </div>
              </Link>
            )}
            {lines.map((l) => (
              <div key={l.key} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3.5">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted text-2xl">
                  {l.item.emoji}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-bold text-foreground">{l.item.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {l.variant === "half" ? "Half" : l.item.half ? "Full" : l.item.sub} · {formatTaka(l.price)}
                  </div>
                </div>
                <div className="flex items-center rounded-[10px] bg-success text-primary-foreground">
                  <button onClick={() => decKey(l.key)} aria-label="Decrease" className="flex h-8 w-8 items-center justify-center">
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="min-w-5 text-center text-sm font-extrabold">{l.qty}</span>
                  <button onClick={() => incKey(l.key)} aria-label="Increase" className="flex h-8 w-8 items-center justify-center">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <div className="w-16 text-right text-sm font-extrabold text-foreground">{formatTaka(l.line)}</div>
              </div>
            ))}
          </div>

          {/* Bill summary */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="space-y-3 rounded-2xl border border-border bg-card p-5">
              <h2 className="text-base font-extrabold text-foreground">Bill details</h2>
              {toFree > 0 ? (
                <p className="rounded-lg bg-accent px-3 py-2 text-xs font-bold text-brand-foreground">
                  Add {formatTaka(toFree)} more for free delivery
                </p>
              ) : (
                <p className="rounded-lg bg-success/10 px-3 py-2 text-xs font-bold text-success">
                  🎉 You&apos;ve unlocked free delivery
                </p>
              )}
              <Row label="Item total" value={formatTaka(subtotal)} />
              {savings > 0 && <Row label="Savings" value={`− ${formatTaka(savings)}`} accent />}
              <Row label="Delivery fee" value={delivery === 0 ? "Free" : formatTaka(delivery)} />
              <Row label="Packaging" value={formatTaka(pack)} />
              <div className="border-t border-border pt-3">
                <Row label="To pay" value={formatTaka(total)} bold />
              </div>
              <Button asChild size="lg" className="w-full">
                <Link href="/checkout">Proceed to checkout</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </FoodShell>
  );
}

function Row({ label, value, bold, accent }: { label: string; value: string; bold?: boolean; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className={bold ? "font-extrabold text-foreground" : "text-muted-foreground"}>{label}</span>
      <span className={accent ? "font-bold text-success" : bold ? "text-lg font-extrabold text-foreground" : "font-bold text-foreground"}>
        {value}
      </span>
    </div>
  );
}
