"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Clock,
  LayoutDashboard,
  Store,
  User,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth";
import { useMounted } from "@/hooks/use-mounted";
import { FoodLogo } from "@/components/food/food-logo";

interface Item {
  icon: LucideIcon;
  label: string;
  href: string;
}
interface Group {
  label: string;
  items: Item[];
}

interface Props {
  collapsed: boolean;
  onToggleCollapse?: () => void;
  onNavigate?: () => void;
}

export function ManageSidebar({ collapsed, onToggleCollapse, onNavigate }: Props) {
  const pathname = usePathname();
  const mounted = useMounted();
  const role = useAuthStore((s) => s.user?.role);
  const isDeveloper = mounted && role === "developer";
  const isPartner = mounted && (role === "partner" || role === "developer");

  const groups: Group[] = [
    ...(isDeveloper
      ? [{ label: "Developer", items: [{ icon: ClipboardCheck, label: "Applications", href: "/developer/applications" }] }]
      : []),
    ...(isPartner
      ? [{
          label: "Partner",
          items: [
            { icon: LayoutDashboard, label: "Dashboard", href: "/partner" },
            { icon: Clock, label: "Delivery Slots", href: "/partner/slots" },
          ],
        }]
      : []),
    {
      label: "General",
      items: [
        { icon: User, label: "Account", href: "/account" },
        { icon: Store, label: "Back to store", href: "/" },
      ],
    },
  ];

  return (
    <div className="flex h-full flex-col">
      {/* Header: logo + collapse toggle */}
      <div
        className={cn(
          "flex h-16 items-center border-b border-border px-3",
          collapsed ? "justify-center" : "justify-between"
        )}
      >
        {!collapsed && (
          <Link href="/" onClick={onNavigate} className="pl-1" aria-label="Hall Canteen home">
            <FoodLogo className="text-xl" />
          </Link>
        )}
        {onToggleCollapse && (
          <button
            type="button"
            onClick={onToggleCollapse}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          </button>
        )}
      </div>

      {/* Grouped nav */}
      <nav className="scrollbar-hide flex-1 space-y-5 overflow-y-auto px-3 py-4">
        {groups.map((group) => (
          <div key={group.label}>
            {!collapsed && (
              <div className="mb-2 px-2 text-[11px] font-extrabold uppercase tracking-wider text-muted-foreground">
                {group.label}
              </div>
            )}
            <div className="space-y-1">
              {group.items.map(({ icon: Icon, label, href }) => {
                const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={onNavigate}
                    title={collapsed ? label : undefined}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-bold transition-colors",
                      collapsed && "justify-center px-0",
                      active
                        ? "bg-success/10 text-success"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <Icon className="h-5 w-5 shrink-0" />
                    {!collapsed && <span className="truncate">{label}</span>}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </div>
  );
}
