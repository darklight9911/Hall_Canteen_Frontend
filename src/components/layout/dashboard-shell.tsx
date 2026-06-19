"use client";

import { useState } from "react";
import { Header } from "./header";
import { Sidebar, SidebarNav } from "./sidebar";
import { Footer } from "./footer";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Wordmark } from "@/components/shared/wordmark";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-muted">
      <Header onMenuClick={() => setOpen(true)} />

      <div className="mx-auto flex w-full max-w-7xl flex-1 gap-6 px-4 py-6">
        <Sidebar />
        <main className="min-w-0 flex-1">{children}</main>
      </div>

      <Footer />

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" title="Navigation" className="w-64">
          <div className="mb-6">
            <Wordmark />
          </div>
          <SidebarNav onNavigate={() => setOpen(false)} />
        </SheetContent>
      </Sheet>
    </div>
  );
}
