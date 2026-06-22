"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  UtensilsCrossed,
  ReceiptText,
  CreditCard,
  BarChart3,
  Palette,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth";
import { useMounted } from "@/hooks/use-mounted";

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  adminOnly?: boolean;
}

const NAV: NavItem[] = [
  { href: "/menu", label: "Menu", icon: UtensilsCrossed },
  { href: "/orders", label: "Orders", icon: ReceiptText },
  { href: "/billing", label: "Billing", icon: CreditCard },
  { href: "/reports", label: "Reports", icon: BarChart3, adminOnly: true },
  { href: "/styleguide", label: "Style Guide", icon: Palette, adminOnly: true },
];

export function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const mounted = useMounted();
  const role = useAuthStore((s) => s.user?.role);
  const items = NAV.filter((n) => !n.adminOnly || (mounted && role === "developer"));

  return (
    <nav className="space-y-1">
      {items.map(({ href, label, icon: Icon }) => {
        const active = pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-md border-l-4 px-3 py-2.5 text-sm transition-colors",
              active
                ? "border-primary bg-accent font-extrabold text-primary"
                : "border-transparent font-semibold text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <Icon className="h-5 w-5 shrink-0" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

export function Sidebar() {
  return (
    <aside className="hidden w-56 shrink-0 md:block">
      <div className="sticky top-24">
        <SidebarNav />
      </div>
    </aside>
  );
}
