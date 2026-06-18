import { create } from "zustand";
import type { MenuItem } from "@/types";

export interface CartLine {
  item: MenuItem;
  quantity: number;
}

interface CartState {
  lines: Record<string, CartLine>;
  add: (item: MenuItem) => void;
  increment: (id: string) => void;
  decrement: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
}

// Frontend-only cart (no backend wiring yet). Not persisted, so it starts
// empty on both server and client — no hydration mismatch.
export const useCartStore = create<CartState>((set) => ({
  lines: {},
  add: (item) =>
    set((s) => ({
      lines: {
        ...s.lines,
        [item.id]: { item, quantity: (s.lines[item.id]?.quantity ?? 0) + 1 },
      },
    })),
  increment: (id) =>
    set((s) => {
      const line = s.lines[id];
      if (!line) return s;
      return { lines: { ...s.lines, [id]: { ...line, quantity: line.quantity + 1 } } };
    }),
  decrement: (id) =>
    set((s) => {
      const line = s.lines[id];
      if (!line) return s;
      if (line.quantity <= 1) {
        const { [id]: _removed, ...rest } = s.lines;
        return { lines: rest };
      }
      return { lines: { ...s.lines, [id]: { ...line, quantity: line.quantity - 1 } } };
    }),
  remove: (id) =>
    set((s) => {
      const { [id]: _removed, ...rest } = s.lines;
      return { lines: rest };
    }),
  clear: () => set({ lines: {} }),
}));

export const selectCartCount = (s: CartState) =>
  Object.values(s.lines).reduce((n, l) => n + l.quantity, 0);

export const selectCartTotal = (s: CartState) =>
  Object.values(s.lines).reduce((n, l) => n + l.quantity * l.item.price, 0);
