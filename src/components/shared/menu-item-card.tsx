"use client";

import Image from "next/image";
import { Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Stepper } from "@/components/shared/stepper";
import { useCartStore } from "@/store/cart";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/format";
import type { MenuItem } from "@/types";

interface MenuItemCardProps {
  item: MenuItem;
  /** Original price; when higher than `item.price` a discount badge is shown. */
  mrp?: number;
  /** Emoji placeholder used when the item has no image. */
  emoji?: string;
}

export function MenuItemCard({ item, mrp, emoji }: MenuItemCardProps) {
  const quantity = useCartStore((s) => s.lines[item.id]?.quantity ?? 0);
  const add = useCartStore((s) => s.add);
  const increment = useCartStore((s) => s.increment);
  const decrement = useCartStore((s) => s.decrement);

  const discount = mrp && mrp > item.price ? Math.round(((mrp - item.price) / mrp) * 100) : 0;

  return (
    <div
      className={cn(
        "group flex flex-col rounded-lg border border-border bg-card p-3 shadow-card transition-shadow hover:shadow-card-hover",
        !item.available && "opacity-60"
      )}
    >
      <div className="relative mb-3 aspect-square overflow-hidden rounded-md bg-gradient-to-br from-accent to-muted">
        {discount > 0 && (
          <Badge variant="discount" className="absolute left-0 top-2 rounded-l-none">
            {discount}% OFF
          </Badge>
        )}
        {item.imageUrl ? (
          <Image
            src={item.imageUrl}
            alt={item.name}
            fill
            className="object-cover transition-transform duration-200 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, 200px"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-5xl">
            {emoji ?? "🍽️"}
          </div>
        )}
        {!item.available && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/55">
            <span className="rounded-md bg-foreground/80 px-2 py-1 text-xs font-bold text-background">
              Out of stock
            </span>
          </div>
        )}
      </div>

      <Badge variant="time" className="mb-2 w-fit">
        <Clock className="h-3 w-3" />
        10 MINS
      </Badge>

      <h3 className="line-clamp-2 text-sm font-bold leading-snug text-foreground">{item.name}</h3>
      <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">{item.description}</p>

      <div className="mt-auto flex items-end justify-between gap-2 pt-3">
        <div className="flex flex-col leading-tight">
          <span className="text-sm font-extrabold text-foreground">{formatCurrency(item.price)}</span>
          {discount > 0 && (
            <span className="text-xs text-muted-foreground line-through">{formatCurrency(mrp!)}</span>
          )}
        </div>
        {item.available && quantity > 0 ? (
          <Stepper
            value={quantity}
            onIncrement={() => increment(item.id)}
            onDecrement={() => decrement(item.id)}
          />
        ) : (
          <Button
            variant="add"
            size="add"
            disabled={!item.available}
            onClick={() => add(item)}
          >
            Add
          </Button>
        )}
      </div>
    </div>
  );
}
