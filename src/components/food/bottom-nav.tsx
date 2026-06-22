"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, ShoppingCart, ReceiptText, User, type LucideIcon } from "lucide-react";
import { useFoodCart } from "@/store/food-cart";
import { cartCount } from "@/lib/restaurants";
import { useMounted } from "@/hooks/use-mounted";

const NAV: {
  href: string;
  label: string;
  icon: LucideIcon;
  badge?: boolean;
  match: (p: string) => boolean;
}[] = [
  { href: "/", label: "Home", icon: Home, match: (p) => p === "/" },
  { href: "/search", label: "Search", icon: Search, match: (p) => p.startsWith("/search") },
  { href: "/cart", label: "Cart", icon: ShoppingCart, badge: true, match: (p) => p.startsWith("/cart") },
  { href: "/my-orders", label: "Orders", icon: ReceiptText, match: (p) => p.startsWith("/my-orders") },
  { href: "/account", label: "Account", icon: User, match: (p) => p.startsWith("/account") },
];

/** Mobile bottom navigation (hidden on desktop). */
export function BottomNav() {
  const pathname = usePathname();
  const mounted = useMounted();
  const count = useFoodCart((s) => cartCount(s.cart));

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 flex border-t border-border bg-background px-1.5 pb-2 pt-1.5 md:hidden">
      {NAV.map(({ href, label, icon: Icon, badge, match }) => {
        const active = match(pathname);
        return (
          <Link
            key={href}
            href={href}
            className="flex flex-1 flex-col items-center gap-1 py-1"
            style={{ color: active ? "#0C831F" : "#9a9ba6" }}
          >
            <span className="relative">
              <Icon className="h-[22px] w-[22px]" strokeWidth={active ? 2.4 : 2} />
              {badge && mounted && count > 0 && (
                <span className="absolute -right-2.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-success px-1 text-[9px] font-extrabold text-primary-foreground">
                  {count}
                </span>
              )}
            </span>
            <span className="text-[10px] font-bold">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
