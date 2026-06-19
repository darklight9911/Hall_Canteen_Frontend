import { create } from "zustand";
import { itemById, keyOf, type Cart, type Variant } from "@/lib/restaurants";

interface FoodCartState {
  cart: Cart;
  cartRestaurant: string | null;
  /** Add `qty` of an item/variant; switching restaurants clears the cart first. */
  addItem: (id: string, variant?: Variant, qty?: number) => void;
  incKey: (key: string) => void;
  decKey: (key: string) => void;
  clear: () => void;
}

// Frontend-only cart (no backend). Not persisted → starts empty on server and
// client alike, so there is no hydration mismatch.
export const useFoodCart = create<FoodCartState>((set) => ({
  cart: {},
  cartRestaurant: null,
  addItem: (id, variant = "full", qty = 1) =>
    set((s) => {
      const item = itemById(id);
      if (!item) return s;
      let cart = s.cart;
      // Only one restaurant's items at a time.
      if (s.cartRestaurant && s.cartRestaurant !== item.rid) cart = {};
      const key = keyOf(id, variant);
      return {
        cart: { ...cart, [key]: (cart[key] ?? 0) + qty },
        cartRestaurant: item.rid,
      };
    }),
  incKey: (key) =>
    set((s) => ({ cart: { ...s.cart, [key]: (s.cart[key] ?? 0) + 1 } })),
  decKey: (key) =>
    set((s) => {
      const next = { ...s.cart };
      const v = (next[key] ?? 0) - 1;
      if (v <= 0) delete next[key];
      else next[key] = v;
      return {
        cart: next,
        cartRestaurant: Object.keys(next).length ? s.cartRestaurant : null,
      };
    }),
  clear: () => set({ cart: {}, cartRestaurant: null }),
}));
