"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import { useFoodCart } from "@/store/food-cart";
import { cartCount, cartSubtotal, formatTaka } from "@/lib/restaurants";
import { useMounted } from "@/hooks/use-mounted";

/** Sticky "View Cart" bar shown on restaurant/search screens when the cart has items (mobile). */
export function FloatingCartBar() {
  const mounted = useMounted();
  const pathname = usePathname();
  const cart = useFoodCart((s) => s.cart);
  const count = cartCount(cart);

  const onRelevant = pathname.startsWith("/restaurants") || pathname === "/search";
  if (!mounted || count === 0 || !onRelevant) return null;

  return (
    <div className="fixed inset-x-0 bottom-[70px] z-30 px-3.5 md:hidden">
      <Link
        href="/cart"
        className="flex animate-content-in items-center justify-between rounded-[15px] bg-success px-5 py-3.5 shadow-card-hover"
      >
        <span className="text-[13px] font-bold text-primary-foreground/90">
          {count} {count > 1 ? "items" : "item"} added ·{" "}
          <span className="font-extrabold">{formatTaka(cartSubtotal(cart))}</span>
        </span>
        <span className="flex items-center gap-1.5 text-[15px] font-extrabold text-primary-foreground">
          View Cart <ShoppingCart className="h-[18px] w-[18px]" />
        </span>
      </Link>
    </div>
  );
}
