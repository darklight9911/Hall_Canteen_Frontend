"use client";

import { cn } from "@/lib/utils";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useManageUI } from "@/store/manage-ui";
import { ManageSidebar } from "./manage-sidebar";

/** Console layout for partner/developer features: a collapsible, grouped sidebar. */
export function ManageShell({ children }: { children: React.ReactNode }) {
  const collapsed = useManageUI((s) => s.collapsed);
  const toggle = useManageUI((s) => s.toggle);
  const mobileOpen = useManageUI((s) => s.mobileOpen);
  const setMobileOpen = useManageUI((s) => s.setMobileOpen);

  return (
    <div className="min-h-screen bg-muted">
      {/* Desktop sidebar — starts below GlobalNav (top-14 = 56px) */}
      <aside
        className={cn(
          "fixed bottom-0 left-0 top-14 z-40 hidden border-r border-border bg-background transition-[width] duration-200 md:block",
          collapsed ? "w-[72px]" : "w-60"
        )}
      >
        <ManageSidebar collapsed={collapsed} onToggleCollapse={toggle} />
      </aside>

      {/* Mobile drawer — opened by GlobalNav hamburger via shared store */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" title="Navigation" className="w-64 p-0">
          <ManageSidebar collapsed={false} onNavigate={() => setMobileOpen(false)} />
        </SheetContent>
      </Sheet>

      {/* Content */}
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
