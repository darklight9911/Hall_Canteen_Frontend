"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft, MapPin, Search, ShoppingCart } from "lucide-react";
import { FoodLogo } from "./food-logo";
import { useFoodCart } from "@/store/food-cart";
import { cartCount } from "@/lib/restaurants";
import { useAuthStore } from "@/store/auth";
import { useMounted } from "@/hooks/use-mounted";

export function FoodHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const mounted = useMounted();
  const count = useFoodCart((s) => cartCount(s.cart));
  const user = useAuthStore((s) => s.user);
  const isHome = pathname === "/";

  return (
    <>
      {/* ===== Web header ===== */}
      <header className="sticky top-0 z-50 hidden border-b border-border bg-background shadow-header md:block">
        <div className="mx-auto flex max-w-[1240px] items-center gap-6 px-7 py-3.5">
          <Link href="/" aria-label="Hall Canteen home">
            <FoodLogo className="text-[25px]" />
          </Link>
          <Link href="/search" className="flex items-center gap-2 border-l border-border pl-[18px]">
            <MapPin className="h-5 w-5 text-success" />
            <span className="leading-tight">
              <span className="block text-sm font-extrabold text-foreground">Hostel Block A ▾</span>
              <span className="block text-xs text-muted-foreground">Room 214 · Campus</span>
            </span>
          </Link>
          <Link
            href="/search"
            className="flex flex-1 items-center gap-2.5 rounded-full border border-border bg-muted px-5 py-3 text-sm text-muted-foreground transition-colors hover:bg-secondary"
          >
            <Search className="h-[18px] w-[18px]" />
            Search “tehari”, “biryani”, “cha”…
          </Link>
          {mounted && user ? (
            <Link href="/account" className="flex items-center gap-2 text-sm font-bold text-foreground">
              <span className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-success font-extrabold text-primary-foreground">
                {user.name.charAt(0).toUpperCase()}
              </span>
              {user.name}
            </Link>
          ) : (
            <Link href="/login" className="text-[15px] font-bold text-foreground">
              Login
            </Link>
          )}
          <Link
            href="/cart"
            className="flex items-center gap-2 rounded-[14px] bg-brand px-[22px] py-3 text-[15px] font-extrabold text-brand-foreground shadow-card"
          >
            <ShoppingCart className="h-5 w-5" /> My Cart
            {mounted && count > 0 && (
              <span className="rounded-full bg-success px-2 py-0.5 text-xs text-primary-foreground">{count}</span>
            )}
          </Link>
        </div>
      </header>

      {/* ===== Mobile header ===== */}
      <header className="sticky top-0 z-50 border-b border-border bg-background px-4 pb-3 pt-2.5 md:hidden">
        <div className="flex items-center justify-between gap-2.5">
          {!isHome && (
            <button
              onClick={() => router.back()}
              aria-label="Back"
              className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full bg-muted"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
          )}
          <Link href="/search" className="flex min-w-0 flex-1 items-center gap-2">
            <MapPin className="h-[18px] w-[18px] shrink-0 text-success" />
            <span className="min-w-0 leading-tight">
              <span className="block text-sm font-extrabold text-foreground">Hostel Block A ▾</span>
              <span className="block truncate text-[11px] text-muted-foreground">Room 214 · Campus</span>
            </span>
          </Link>
          <Link
            href="/cart"
            aria-label="Cart"
            className="relative flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-[13px] bg-brand"
          >
            <ShoppingCart className="h-5 w-5 text-brand-foreground" />
            {mounted && count > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-[19px] min-w-[19px] items-center justify-center rounded-full bg-success px-1 text-[11px] font-extrabold text-primary-foreground">
                {count}
              </span>
            )}
          </Link>
        </div>
      </header>
    </>
  );
}
