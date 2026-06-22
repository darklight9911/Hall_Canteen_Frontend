"use client";

import { FoodHeader } from "./food-header";
import { FoodFooter } from "./food-footer";
import { BottomNav } from "./bottom-nav";
import { FloatingCartBar } from "./floating-cart-bar";
import { CartFab } from "./cart-fab";
import { ItemDetailModal } from "./item-detail-modal";

/** Marketplace chrome: responsive header, footer (web), bottom nav (mobile), cart bar + item sheet. */
export function FoodShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-muted">
      <FoodHeader />
      <main className="mx-auto w-full max-w-[1240px] flex-1 px-4 pb-28 pt-4 md:px-7 md:pb-10 md:pt-6">
        {children}
      </main>
      <FoodFooter />
      <CartFab />
      <FloatingCartBar />
      <BottomNav />
      <ItemDetailModal />
    </div>
  );
}
