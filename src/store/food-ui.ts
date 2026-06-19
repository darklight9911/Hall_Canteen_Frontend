import { create } from "zustand";
import type { Variant } from "@/lib/restaurants";

interface FoodUIState {
  detailItemId: string | null;
  detailVariant: Variant;
  detailQty: number;
  openItem: (id: string) => void;
  closeItem: () => void;
  setVariant: (v: Variant) => void;
  incQty: () => void;
  decQty: () => void;
}

// Drives the item-detail bottom sheet / modal.
export const useFoodUI = create<FoodUIState>((set) => ({
  detailItemId: null,
  detailVariant: "full",
  detailQty: 1,
  openItem: (id) => set({ detailItemId: id, detailVariant: "full", detailQty: 1 }),
  closeItem: () => set({ detailItemId: null }),
  setVariant: (v) => set({ detailVariant: v }),
  incQty: () => set((s) => ({ detailQty: s.detailQty + 1 })),
  decQty: () => set((s) => ({ detailQty: Math.max(1, s.detailQty - 1) })),
}));
