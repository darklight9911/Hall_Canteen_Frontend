"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { FoodLogo } from "@/components/food/food-logo";
import { useManageUI } from "@/store/manage-ui";
import { ManageSidebar } from "./manage-sidebar";

/** Console layout for partner/developer features: a collapsible, grouped sidebar. */
export function ManageShell({ children }: { children: React.ReactNode }) {
  const collapsed = useManageUI((s) => s.collapsed);
  const toggle = useManageUI((s) => s.toggle);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-muted">
      {/* Desktop sidebar (fixed, full height) */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 hidden border-r border-border bg-background transition-[width] duration-200 md:block",
          collapsed ? "w-[72px]" : "w-60"
        )}
      >
        <ManageSidebar collapsed={collapsed} onToggleCollapse={toggle} />
      </aside>

      {/* Mobile top bar */}
      <div className="sticky top-0 z-30 flex items-center gap-3 border-b border-border bg-background px-4 py-3 md:hidden">
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
          className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-muted"
        >
          <Menu className="h-5 w-5" />
        </button>
        <FoodLogo className="text-xl" />
      </div>

      {/* Mobile drawer */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" title="Navigation" className="w-64 p-0">
          <ManageSidebar collapsed={false} onNavigate={() => setMobileOpen(false)} />
        </SheetContent>
      </Sheet>

      {/* Content — fills the width between the sidebar and the right edge, 10px gutters */}
      <main
        className={cn(
          "px-[10px] py-6 transition-[margin] duration-200 md:py-8",
          collapsed ? "md:ml-[72px]" : "md:ml-60"
        )}
      >
        {children}
      </main>
    </div>
  );
}
