"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft, Menu, ShoppingCart } from "lucide-react";
import { FoodLogo } from "@/components/food/food-logo";
import { UserAvatar } from "@/components/ui/user-avatar";
import { useAuthStore } from "@/store/auth";
import { useManageUI } from "@/store/manage-ui";
import { useFoodCart } from "@/store/food-cart";
import { cartCount } from "@/lib/restaurants";
import { useMounted } from "@/hooks/use-mounted";
import { cn } from "@/lib/utils";

const MANAGE_PREFIXES = ["/partner", "/developer", "/menu", "/orders", "/billing", "/reports", "/styleguide"];

function isManagePage(pathname: string) {
  return MANAGE_PREFIXES.some((p) => pathname.startsWith(p));
}

const CONSUMER_LINKS = [
  { href: "/", label: "Home", match: (p: string) => p === "/" },
  { href: "/search", label: "Search", match: (p: string) => p.startsWith("/search") },
  { href: "/my-orders", label: "My Orders", match: (p: string) => p.startsWith("/my-orders") },
];

const PARTNER_LINKS = [
  { href: "/", label: "Store", match: () => false },
  { href: "/partner", label: "Dashboard", match: (p: string) => p === "/partner" },
  { href: "/partner/slots", label: "Delivery Slots", match: (p: string) => p.startsWith("/partner/slots") },
];

const DEVELOPER_LINKS = [
  { href: "/", label: "Store", match: () => false },
  { href: "/developer/applications", label: "Applications", match: (p: string) => p.startsWith("/developer") },
  { href: "/partner", label: "Dashboard", match: (p: string) => p === "/partner" },
  { href: "/partner/slots", label: "Slots", match: (p: string) => p.startsWith("/partner/slots") },
];

export function GlobalNav() {
  const pathname = usePathname();
  const router = useRouter();
  const mounted = useMounted();
  const user = useAuthStore((s) => s.user);
  const toggleMobile = useManageUI((s) => s.toggleMobile);
  const count = useFoodCart((s) => cartCount(s.cart));

  const role = mounted ? user?.role : undefined;
  const onManagePage = isManagePage(pathname);
  const isHome = pathname === "/";
  const showCart = !onManagePage;

  const navLinks =
    role === "developer"
      ? DEVELOPER_LINKS
      : role === "partner"
      ? PARTNER_LINKS
      : CONSUMER_LINKS;

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background shadow-sm">
      <div className="mx-auto flex h-14 max-w-[1240px] items-center gap-2 px-4 md:gap-4 md:px-7">
        {/* Mobile left: hamburger (manage pages) or back button (consumer non-home) */}
        <div className="flex shrink-0 items-center md:hidden">
          {onManagePage ? (
            <button
              type="button"
              onClick={toggleMobile}
              aria-label="Open menu"
              className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-muted"
            >
              <Menu className="h-5 w-5" />
            </button>
          ) : !isHome ? (
            <button
              type="button"
              onClick={() => router.back()}
              aria-label="Back"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-muted"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
          ) : null}
        </div>

        {/* Logo */}
        <Link href="/" aria-label="Hall Canteen home" className="shrink-0">
          <FoodLogo className="text-[20px] md:text-[22px]" />
        </Link>

        {/* Desktop nav links */}
        <nav className="hidden flex-1 items-center gap-0.5 md:flex">
          {mounted &&
            navLinks.map(({ href, label, match }) => {
              const active = match(pathname);
              return (
                <Link
                  key={`${href}-${label}`}
                  href={href}
                  className={cn(
                    "rounded-lg px-3 py-1.5 text-sm font-bold transition-colors",
                    active
                      ? "bg-success/10 text-success"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  {label}
                </Link>
              );
            })}
        </nav>

        {/* Right: cart + user */}
        <div className="ml-auto flex items-center gap-1.5 md:ml-0">
          {/* Cart icon (consumer pages only) */}
          {mounted && showCart && (
            <Link
              href="/cart"
              aria-label={`Cart${count > 0 ? ` (${count})` : ""}`}
              className="relative flex h-9 w-9 items-center justify-center rounded-full hover:bg-muted"
            >
              <ShoppingCart className="h-[19px] w-[19px]" />
              {count > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-success px-1 text-[9px] font-extrabold text-primary-foreground">
                  {count}
                </span>
              )}
            </Link>
          )}

          {/* User avatar or Login */}
          {mounted && user ? (
            <Link
              href="/account"
              className="flex items-center gap-2 rounded-lg px-2 py-1 text-sm font-bold text-foreground hover:bg-muted"
            >
              <UserAvatar name={user.name} avatar={user.avatar} size={30} />
              <span className="hidden max-w-[120px] truncate md:block">{user.name}</span>
            </Link>
          ) : mounted ? (
            <Link
              href="/login"
              className="rounded-lg px-3 py-1.5 text-sm font-bold text-foreground hover:bg-muted hover:text-success"
            >
              Login
            </Link>
          ) : null}
        </div>
      </div>
    </header>
  );
}
