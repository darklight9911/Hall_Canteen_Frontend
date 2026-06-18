"use client";

import Link from "next/link";
import { MapPin, Search, ShoppingCart, ChevronDown, Menu as MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Wordmark } from "@/components/shared/wordmark";
import { useAuthStore } from "@/store/auth";
import { selectCartCount, useCartStore } from "@/store/cart";
import { useMounted } from "@/hooks/use-mounted";

export function Header({ onMenuClick }: { onMenuClick?: () => void }) {
  const mounted = useMounted();
  const user = useAuthStore((s) => s.user);
  const count = useCartStore(selectCartCount);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background shadow-header">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 md:h-20 md:gap-6">
        {onMenuClick && (
          <button
            type="button"
            onClick={onMenuClick}
            className="text-foreground md:hidden"
            aria-label="Open navigation"
          >
            <MenuIcon className="h-6 w-6" />
          </button>
        )}

        <Link href="/menu" aria-label="Hall Canteen home" className="shrink-0">
          <Wordmark className="text-xl md:text-2xl" />
        </Link>

        <button
          type="button"
          className="hidden items-center gap-1.5 text-left lg:flex"
        >
          <MapPin className="h-5 w-5 shrink-0 text-foreground" />
          <span className="flex flex-col leading-tight">
            <span className="text-sm font-extrabold text-foreground">Hostel Block A</span>
            <span className="flex items-center text-xs text-muted-foreground">
              Mess Hall, Campus <ChevronDown className="h-3 w-3" />
            </span>
          </span>
        </button>

        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder='Search "thali", "samosa", "tea"'
            aria-label="Search the menu"
            className="h-11 rounded-full bg-muted pl-12 md:h-12"
          />
        </div>

        {mounted && user ? (
          <span className="hidden whitespace-nowrap text-sm font-bold text-foreground sm:inline">
            Hi, {user.name}
          </span>
        ) : (
          <Button asChild variant="ghost" className="hidden sm:inline-flex">
            <Link href="/login">Login</Link>
          </Button>
        )}

        <Button variant="cart" size="lg" className="gap-2">
          <ShoppingCart className="h-5 w-5" />
          <span className="hidden sm:inline">My Cart</span>
          {mounted && count > 0 && (
            <span className="ml-0.5 rounded-full bg-brand-foreground/15 px-1.5 text-xs tabular-nums">
              {count}
            </span>
          )}
        </Button>
      </div>
    </header>
  );
}
