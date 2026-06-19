import Link from "next/link";
import { mealLabel, type Restaurant } from "@/lib/restaurants";

export function RestaurantCard({ r }: { r: Restaurant }) {
  return (
    <Link
      href={`/restaurants/${r.id}`}
      className="group block overflow-hidden rounded-[18px] border border-border bg-card shadow-card transition-all hover:-translate-y-0.5 hover:border-[#e4e4ec] hover:shadow-card-hover"
    >
      <div className="relative flex h-[118px] items-center justify-center" style={{ background: r.bannerBg }}>
        <span className="text-[54px] drop-shadow-md">{r.emoji}</span>
        <span className="absolute left-3 top-3 rounded-lg bg-info px-2.5 py-1.5 text-[11px] font-extrabold leading-none text-info-foreground">
          {r.discount}
        </span>
        <span className="absolute -bottom-3 left-3 flex items-center gap-1 rounded-full bg-foreground px-2.5 py-1.5 text-[11px] font-extrabold leading-none text-background">
          🕐 {r.eta}
        </span>
      </div>
      <div className="px-4 pb-4 pt-5">
        <div className="flex items-start justify-between gap-2.5">
          <h3 className="text-[17px] font-extrabold leading-tight text-foreground">{r.name}</h3>
          <span className="flex shrink-0 items-center gap-0.5 rounded-[7px] bg-success px-2 py-0.5 text-xs font-extrabold text-primary-foreground">
            {r.rating} ★
          </span>
        </div>
        <p className="my-1.5 text-[13px] text-muted-foreground">
          {r.cuisine} · {r.distance}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {r.meals.map((m) => (
            <span
              key={m}
              className="rounded-[7px] border border-border bg-muted px-2.5 py-1 text-[11px] font-bold text-muted-foreground"
            >
              {mealLabel(m)}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
