"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useFoodCart } from "@/store/food-cart";
import { cartCount } from "@/lib/restaurants";
import { useMounted } from "@/hooks/use-mounted";

const NAV: { href: string; label: string; icon: string; badge?: boolean; match: (p: string) => boolean }[] = [
  { href: "/", label: "Home", icon: "🏠", match: (p) => p === "/" },
  { href: "/search", label: "Search", icon: "🔍", match: (p) => p.startsWith("/search") },
  { href: "/cart", label: "Cart", icon: "🛒", badge: true, match: (p) => p.startsWith("/cart") },
  { href: "/my-orders", label: "Orders", icon: "🧾", match: (p) => p.startsWith("/my-orders") },
  { href: "/account", label: "Account", icon: "👤", match: (p) => p.startsWith("/account") },
];

/** Mobile bottom navigation (hidden on desktop). */
export function BottomNav() {
  const pathname = usePathname();
  const mounted = useMounted();
  const count = useFoodCart((s) => cartCount(s.cart));

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 flex border-t border-border bg-background px-1.5 pb-2 pt-1.5 md:hidden">
      {NAV.map((n) => {
        const active = n.match(pathname);
        return (
          <Link
            key={n.href}
            href={n.href}
            className="flex flex-1 flex-col items-center gap-0.5 py-1"
            style={{ color: active ? "#0C831F" : "#9a9ba6" }}
          >
            <span className="relative text-[21px] leading-none">
              {n.icon}
              {n.badge && mounted && count > 0 && (
                <span className="absolute -right-2.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-success px-1 text-[9px] font-extrabold text-primary-foreground">
                  {count}
                </span>
              )}
            </span>
            <span className="text-[10px] font-bold">{n.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
