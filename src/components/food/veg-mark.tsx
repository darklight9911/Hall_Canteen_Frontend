import { vegColor } from "@/lib/restaurants";

/** The veg / non-veg square indicator (green for veg, red for non-veg). */
export function VegMark({ veg, size = 15 }: { veg: boolean; size?: number }) {
  const color = vegColor(veg);
  const dot = Math.round(size * 0.47);
  return (
    <span
      className="inline-flex shrink-0 items-center justify-center rounded-[3px] border-2 bg-white"
      style={{ width: size, height: size, borderColor: color }}
      aria-label={veg ? "Vegetarian" : "Non-vegetarian"}
    >
      <span className="block rounded-full" style={{ width: dot, height: dot, background: color }} />
    </span>
  );
}
