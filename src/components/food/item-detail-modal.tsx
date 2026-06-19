"use client";

import { X, Minus, Plus } from "lucide-react";
import { useFoodUI } from "@/store/food-ui";
import { useFoodCart } from "@/store/food-cart";
import { dishTint, formatTaka, itemById, restaurantById } from "@/lib/restaurants";
import { cn } from "@/lib/utils";
import { VegMark } from "./veg-mark";

/** Item-detail sheet: portion variants + quantity, mounted once in the shell. */
export function ItemDetailModal() {
  const id = useFoodUI((s) => s.detailItemId);
  const variant = useFoodUI((s) => s.detailVariant);
  const qty = useFoodUI((s) => s.detailQty);
  const setVariant = useFoodUI((s) => s.setVariant);
  const incQty = useFoodUI((s) => s.incQty);
  const decQty = useFoodUI((s) => s.decQty);
  const closeItem = useFoodUI((s) => s.closeItem);
  const addItem = useFoodCart((s) => s.addItem);

  const item = id ? itemById(id) : undefined;
  if (!item) return null;

  const restaurant = restaurantById(item.rid);
  const variants = item.half
    ? ([
        { key: "full" as const, label: "Full", price: item.price },
        { key: "half" as const, label: "Half", price: item.half },
      ])
    : [{ key: "full" as const, label: "Regular", price: item.price }];
  const sel = variants.find((v) => v.key === variant) ?? variants[0];

  function onAdd() {
    if (!item) return;
    addItem(item.id, sel.key, qty);
    closeItem();
  }

  return (
    <div
      onClick={closeItem}
      className="fixed inset-0 z-[300] flex items-end justify-center bg-foreground/50 sm:items-center sm:p-6"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-h-[90vh] w-full animate-slide-up overflow-y-auto rounded-t-[26px] bg-background pb-[18px] sm:w-[460px] sm:animate-content-in sm:rounded-[22px]"
      >
        <div
          className="relative flex h-[170px] items-center justify-center"
          style={{ background: dishTint(item.veg) }}
        >
          <span className="text-[74px]">{item.emoji}</span>
          <button
            onClick={closeItem}
            aria-label="Close"
            className="absolute right-3.5 top-3.5 flex h-[34px] w-[34px] items-center justify-center rounded-full bg-white/90 shadow-card"
          >
            <X className="h-[17px] w-[17px]" />
          </button>
        </div>

        <div className="px-[22px] pt-5">
          <div className="mb-1.5 flex items-center gap-2">
            <VegMark veg={item.veg} />
            <span className="text-xs font-semibold text-muted-foreground">{restaurant?.name}</span>
          </div>
          <h2 className="text-[22px] font-extrabold tracking-tight text-foreground">{item.name}</h2>
          <p className="mb-[18px] mt-2 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>

          {item.half && (
            <>
              <div className="mb-2.5 text-[13px] font-extrabold text-foreground">Choose portion</div>
              <div className="mb-5 flex gap-2.5">
                {variants.map((v) => (
                  <button
                    key={v.key}
                    onClick={() => setVariant(v.key)}
                    className={cn(
                      "flex-1 rounded-xl border-[1.5px] px-2.5 py-3 text-center text-sm font-extrabold transition-colors",
                      variant === v.key
                        ? "border-success bg-[#EAF6EC] text-success"
                        : "border-border bg-background text-foreground"
                    )}
                  >
                    {v.label}
                    <span className="mt-0.5 block text-xs font-semibold opacity-75">
                      {formatTaka(v.price)}
                    </span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="flex items-center gap-3.5 px-[22px] pb-1.5">
          <div className="flex items-center rounded-[13px] border-[1.5px] border-success">
            <button onClick={decQty} aria-label="Decrease" className="flex h-[50px] w-[42px] items-center justify-center text-success">
              <Minus className="h-5 w-5" />
            </button>
            <span className="min-w-6 text-center text-[17px] font-extrabold text-success">{qty}</span>
            <button onClick={incQty} aria-label="Increase" className="flex h-[50px] w-[42px] items-center justify-center text-success">
              <Plus className="h-5 w-5" />
            </button>
          </div>
          <button
            onClick={onAdd}
            className="flex-1 rounded-[13px] bg-success py-[15px] text-base font-extrabold text-primary-foreground shadow-card-hover"
          >
            Add {qty} · {formatTaka(sel.price * qty)}
          </button>
        </div>
      </div>
    </div>
  );
}
