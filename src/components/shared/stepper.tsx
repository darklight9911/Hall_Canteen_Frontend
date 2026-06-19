"use client";

import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepperProps {
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
  className?: string;
}

/** Solid-green quantity control shown once an item is in the cart (Blinkit style). */
export function Stepper({ value, onIncrement, onDecrement, className }: StepperProps) {
  return (
    <div
      className={cn(
        "inline-flex h-9 items-center justify-between rounded-lg bg-primary text-primary-foreground",
        className
      )}
    >
      <button
        type="button"
        onClick={onDecrement}
        aria-label="Decrease quantity"
        className="flex h-full w-8 items-center justify-center rounded-l-lg transition-colors hover:bg-primary/85"
      >
        <Minus className="h-4 w-4" />
      </button>
      <span className="min-w-6 text-center text-sm font-extrabold tabular-nums">{value}</span>
      <button
        type="button"
        onClick={onIncrement}
        aria-label="Increase quantity"
        className="flex h-full w-8 items-center justify-center rounded-r-lg transition-colors hover:bg-primary/85"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}
