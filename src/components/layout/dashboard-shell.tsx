"use client";

import { Sidebar, SidebarNav } from "./sidebar";
import { Footer } from "./footer";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Wordmark } from "@/components/shared/wordmark";
import { useManageUI } from "@/store/manage-ui";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const mobileOpen = useManageUI((s) => s.mobileOpen);
  const setMobileOpen = useManageUI((s) => s.setMobileOpen);

  return (
    <div className="flex min-h-screen flex-col bg-muted">
      <div className="mx-auto flex w-full max-w-7xl flex-1 gap-6 px-4 py-6">
        <Sidebar />
        <main className="min-w-0 flex-1">{children}</main>
      </div>

      <Footer />

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" title="Navigation" className="w-64">
          <div className="mb-6">
            <Wordmark />
          </div>
          <SidebarNav onNavigate={() => setMobileOpen(false)} />
        </SheetContent>
      </Sheet>
    </div>
  );
}
