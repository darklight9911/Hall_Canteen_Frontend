"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useFoodCart } from "@/store/food-cart";
import { cartCount } from "@/lib/restaurants";
import { useMounted } from "@/hooks/use-mounted";

/**
 * Floating "My Cart" button, fixed to the bottom-right of the page (desktop).
 * Replaces the cart button that used to sit in the top-right of the header.
 * Hidden on mobile, where the bottom nav already provides cart access.
 */
export function CartFab() {
  const mounted = useMounted();
  const count = useFoodCart((s) => cartCount(s.cart));

  return (
    <Link
      href="/cart"
      aria-label="My Cart"
      className="fixed bottom-6 right-6 z-40 hidden items-center gap-2 rounded-full bg-brand px-5 py-3.5 text-[15px] font-extrabold text-brand-foreground shadow-card-hover transition-transform hover:-translate-y-0.5 md:flex"
    >
      <ShoppingCart className="h-5 w-5" />
      My Cart
      {mounted && count > 0 && (
        <span className="ml-0.5 flex h-6 min-w-6 items-center justify-center rounded-full bg-success px-1.5 text-xs text-primary-foreground">
          {count}
        </span>
      )}
    </Link>
  );
}
