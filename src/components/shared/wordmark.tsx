import { cn } from "@/lib/utils";

/**
 * "Hall Canteen" wordmark — an original mark in Blinkit's *style*
 * (lowercase, heavy weight, brand yellow + dark, with a green accent dot).
 * This is NOT Blinkit's trademarked logo. Sizing is driven by `text-*` classes.
 */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex select-none items-baseline text-2xl font-black leading-none tracking-tight",
        className
      )}
    >
      <span className="text-brand">hall</span>
      <span className="text-foreground">canteen</span>
      <span
        className="ml-0.5 h-[0.35em] w-[0.35em] self-end rounded-full bg-success"
        aria-hidden
      />
    </span>
  );
}

/** Compact square mark (matches the favicon) for collapsed/mobile contexts. */
export function WordmarkMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-lg bg-brand text-base font-black tracking-tight text-brand-foreground",
        className
      )}
      aria-hidden
    >
      hc
    </span>
  );
}
