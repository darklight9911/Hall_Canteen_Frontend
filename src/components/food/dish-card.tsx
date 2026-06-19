"use client";

import Link from "next/link";
import { Minus, Plus } from "lucide-react";
import { useFoodCart } from "@/store/food-cart";
import {
  dishTint,
  formatTaka,
  keyOf,
  restaurantById,
  type FoodItem,
} from "@/lib/restaurants";
import { VegMark } from "./veg-mark";

/** Compact dish card used in the "Popular right now" grid. Adds the full variant directly. */
export function DishCard({ item }: { item: FoodItem }) {
  const key = keyOf(item.id, "full");
  const qty = useFoodCart((s) => s.cart[key] ?? 0);
  const addItem = useFoodCart((s) => s.addItem);
  const incKey = useFoodCart((s) => s.incKey);
  const decKey = useFoodCart((s) => s.decKey);

  const restaurant = restaurantById(item.rid);
  const discount = item.mrp ? Math.round((1 - item.price / item.mrp) * 100) : 0;

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card">
      <Link
        href={`/restaurants/${item.rid}`}
        className="relative flex h-[130px] items-center justify-center"
        style={{ background: dishTint(item.veg) }}
      >
        <span className="text-[46px]">{item.emoji}</span>
        {discount > 0 && (
          <span className="absolute left-2.5 top-2.5 rounded-md bg-info px-1.5 py-1 text-[10px] font-extrabold text-info-foreground">
            {discount}% OFF
          </span>
        )}
        <span className="absolute bottom-2.5 left-2.5 rounded-full bg-foreground/85 px-2 py-1 text-[10px] font-bold text-background">
          🕐 {restaurant?.eta}
        </span>
        <span className="absolute right-2.5 top-2.5">
          <VegMark veg={item.veg} />
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-3 pt-2.5">
        <Link
          href={`/restaurants/${item.rid}`}
          className="text-sm font-bold leading-tight text-foreground hover:text-success"
        >
          {item.name}
        </Link>
        <p className="mb-2.5 mt-0.5 text-[11px] text-muted-foreground">{restaurant?.name}</p>

        <div className="mt-auto flex items-end justify-between gap-2">
          <div className="leading-none">
            <span className="text-[15px] font-extrabold text-foreground">{formatTaka(item.price)}</span>{" "}
            {item.mrp && (
              <span className="text-xs text-muted-foreground line-through">{formatTaka(item.mrp)}</span>
            )}
          </div>
          {qty > 0 ? (
            <div className="flex animate-content-in items-center rounded-[9px] bg-success text-primary-foreground">
              <button onClick={() => decKey(key)} aria-label="Decrease" className="flex h-[34px] w-[30px] items-center justify-center">
                <Minus className="h-4 w-4" />
              </button>
              <span className="min-w-4 text-center text-sm font-extrabold">{qty}</span>
              <button onClick={() => incKey(key)} aria-label="Increase" className="flex h-[34px] w-[30px] items-center justify-center">
                <Plus className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => addItem(item.id, "full")}
              className="rounded-[9px] border-[1.5px] border-success bg-background px-[18px] py-2 text-[13px] font-extrabold text-success shadow-card"
            >
              ADD
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
