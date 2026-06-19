"use client";

import { Minus, Plus } from "lucide-react";
import { useFoodCart } from "@/store/food-cart";
import { useFoodUI } from "@/store/food-ui";
import { dishTint, formatTaka, keyOf, type FoodItem } from "@/lib/restaurants";
import { VegMark } from "./veg-mark";

/** A single dish row inside a restaurant's menu. Half-portion items open the detail sheet. */
export function MenuItemRow({ item }: { item: FoodItem }) {
  const cart = useFoodCart((s) => s.cart);
  const addItem = useFoodCart((s) => s.addItem);
  const incKey = useFoodCart((s) => s.incKey);
  const decKey = useFoodCart((s) => s.decKey);
  const openItem = useFoodUI((s) => s.openItem);

  const customisable = !!item.half;
  const qFull = cart[keyOf(item.id, "full")] ?? 0;
  const qHalf = cart[keyOf(item.id, "half")] ?? 0;
  const shownQty = customisable ? qFull + qHalf : qFull;

  const onAdd = () => (customisable ? openItem(item.id) : addItem(item.id, "full"));
  const onInc = () => (customisable ? openItem(item.id) : incKey(keyOf(item.id, "full")));
  const onDec = () => (customisable ? openItem(item.id) : decKey(keyOf(item.id, "full")));

  return (
    <div className="flex items-stretch gap-3.5 rounded-2xl border border-border bg-card p-3.5">
      <div className="min-w-0 flex-1">
        <div className="mb-0.5 flex items-center gap-2">
          <VegMark veg={item.veg} />
          {item.popular && (
            <span className="text-[10px] font-extrabold tracking-wide text-gold">★ POPULAR</span>
          )}
        </div>
        <div className="text-base font-bold leading-tight text-foreground">{item.name}</div>
        <div className="my-1.5 flex items-center gap-2">
          <span className="text-[15px] font-extrabold text-foreground">{formatTaka(item.price)}</span>
          {item.mrp && (
            <span className="text-[13px] text-muted-foreground line-through">{formatTaka(item.mrp)}</span>
          )}
        </div>
        <div className="text-xs leading-snug text-muted-foreground">{item.desc}</div>
        {customisable && (
          <div className="mt-1.5 text-[11px] font-bold text-success">
            ⚙ Full {formatTaka(item.price)} · Half {formatTaka(item.half!)}
          </div>
        )}
      </div>

      <div className="flex w-[114px] shrink-0 flex-col items-center gap-2">
        <button
          onClick={() => openItem(item.id)}
          aria-label={`View ${item.name}`}
          className="flex h-[90px] w-[108px] items-center justify-center rounded-2xl text-[40px]"
          style={{ background: dishTint(item.veg) }}
        >
          {item.emoji}
        </button>
        <div className="-mt-[26px]">
          {shownQty > 0 ? (
            <div className="flex animate-content-in items-center rounded-[11px] bg-success text-primary-foreground shadow-card-hover">
              <button onClick={onDec} aria-label="Decrease" className="flex h-[38px] w-8 items-center justify-center">
                <Minus className="h-[18px] w-[18px]" />
              </button>
              <span className="min-w-[18px] text-center text-[15px] font-extrabold">{shownQty}</span>
              <button onClick={onInc} aria-label="Increase" className="flex h-[38px] w-8 items-center justify-center">
                <Plus className="h-[18px] w-[18px]" />
              </button>
            </div>
          ) : (
            <button
              onClick={onAdd}
              className="w-24 rounded-[11px] border-[1.5px] border-success bg-background py-[9px] text-[15px] font-extrabold text-success shadow-card-hover"
            >
              ADD
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
