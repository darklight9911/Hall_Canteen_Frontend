"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MapPin, Wallet, Smartphone, CreditCard } from "lucide-react";
import { toast } from "sonner";
import { FoodShell } from "@/components/food/food-shell";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useFoodCart } from "@/store/food-cart";
import {
  cartLines,
  cartSubtotal,
  deliveryFee,
  packFee,
  grandTotal,
  formatTaka,
} from "@/lib/restaurants";

const PAYMENTS = [
  { key: "cod", label: "Cash on delivery", icon: Wallet },
  { key: "bkash", label: "bKash / Nagad", icon: Smartphone },
  { key: "card", label: "Card", icon: CreditCard },
];

export default function CheckoutPage() {
  const router = useRouter();
  const cart = useFoodCart((s) => s.cart);
  const clear = useFoodCart((s) => s.clear);
  const [payment, setPayment] = useState("cod");

  const lines = cartLines(cart);
  const total = grandTotal(cart);

  function placeOrder() {
    clear();
    toast.success("Order placed!");
    router.push("/track");
  }

  if (lines.length === 0) {
    return (
      <FoodShell>
        <div className="rounded-2xl border border-dashed border-border bg-card py-16 text-center">
          <h3 className="text-base font-extrabold text-foreground">Nothing to check out</h3>
          <Button asChild className="mt-4">
            <Link href="/">Browse restaurants</Link>
          </Button>
        </div>
      </FoodShell>
    );
  }

  return (
    <FoodShell>
      <h1 className="mb-5 text-2xl font-extrabold tracking-tight text-foreground">Checkout</h1>
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          {/* Address */}
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="mb-1 flex items-center gap-2 text-sm font-extrabold text-foreground">
              <MapPin className="h-4 w-4 text-success" /> Delivery address
            </div>
            <p className="text-sm text-muted-foreground">Hostel Block A · Room 214 · Campus</p>
          </div>

          {/* Payment */}
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="mb-3 text-sm font-extrabold text-foreground">Payment method</div>
            <div className="space-y-2.5">
              {PAYMENTS.map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setPayment(key)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl border-[1.5px] px-4 py-3 text-sm font-bold transition-colors",
                    payment === key
                      ? "border-success bg-success/5 text-foreground"
                      : "border-border bg-background text-muted-foreground hover:bg-muted"
                  )}
                >
                  <Icon className="h-5 w-5 text-success" />
                  {label}
                  <span
                    className={cn(
                      "ml-auto h-4 w-4 rounded-full border-2",
                      payment === key ? "border-success bg-success" : "border-border"
                    )}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="space-y-3 rounded-2xl border border-border bg-card p-5">
            <h2 className="text-base font-extrabold text-foreground">Order summary</h2>
            <div className="space-y-2">
              {lines.map((l) => (
                <div key={l.key} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {l.qty}× {l.item.name}
                    {l.variant === "half" ? " (Half)" : ""}
                  </span>
                  <span className="font-bold text-foreground">{formatTaka(l.line)}</span>
                </div>
              ))}
            </div>
            <div className="space-y-1.5 border-t border-border pt-3 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Item total</span>
                <span>{formatTaka(cartSubtotal(cart))}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Delivery</span>
                <span>{deliveryFee(cart) === 0 ? "Free" : formatTaka(deliveryFee(cart))}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Packaging</span>
                <span>{formatTaka(packFee(cart))}</span>
              </div>
            </div>
            <div className="flex items-center justify-between border-t border-border pt-3">
              <span className="font-extrabold text-foreground">To pay</span>
              <span className="text-lg font-extrabold text-foreground">{formatTaka(total)}</span>
            </div>
            <Button onClick={placeOrder} size="lg" className="w-full">
              Place order · {formatTaka(total)}
            </Button>
          </div>
        </div>
      </div>
    </FoodShell>
  );
}
