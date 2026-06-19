"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface CategoryTileProps {
  label: string;
  emoji: string;
  active?: boolean;
  onClick?: () => void;
  /** When set, the tile renders as a link instead of a filter button. */
  href?: string;
}

export function CategoryTile({ label, emoji, active, onClick, href }: CategoryTileProps) {
  const className = cn(
    "flex w-20 shrink-0 flex-col items-center gap-2 rounded-lg border p-3 text-center transition-colors",
    active ? "border-primary bg-accent" : "border-border bg-card hover:bg-muted"
  );

  const inner = (
    <>
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-muted text-3xl">
        {emoji}
      </span>
      <span className="text-xs font-bold capitalize text-foreground">{label}</span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={className}>
        {inner}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={className}>
      {inner}
    </button>
  );
}
