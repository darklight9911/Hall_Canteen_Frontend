import { cn } from "@/lib/utils";

/**
 * "hallcanteen." wordmark — gold "hall", dark "canteen", green dot.
 * Original mark in the campus-marketplace style. Size via text-* classes.
 */
export function FoodLogo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex select-none items-baseline text-2xl font-extrabold leading-none tracking-tight",
        className
      )}
    >
      <span className="text-gold">hall</span>
      <span className="text-foreground">canteen</span>
      <span className="ml-px text-[1.25em] leading-[0] text-success">.</span>
    </span>
  );
}
