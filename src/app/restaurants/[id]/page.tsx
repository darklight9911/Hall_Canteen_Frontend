import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FoodShell } from "@/components/food/food-shell";
import { MenuItemRow } from "@/components/food/menu-item-row";
import { restaurantById, itemsByRestaurant } from "@/lib/restaurants";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const r = restaurantById(id);
  return { title: r ? r.name : "Restaurant" };
}

export default async function RestaurantPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const r = restaurantById(id);
  if (!r) notFound();

  const its = itemsByRestaurant(r.id);
  const cats: string[] = [];
  its.forEach((i) => {
    if (!cats.includes(i.cat)) cats.push(i.cat);
  });
  const groups = cats.map((cat) => ({ cat, items: its.filter((i) => i.cat === cat) }));

  return (
    <FoodShell>
      <div className="animate-content-in">
        <Link
          href="/"
          className="mb-4 hidden rounded-[10px] border border-border bg-card px-4 py-2.5 text-sm font-bold text-foreground md:inline-block"
        >
          ← Back to restaurants
        </Link>

        {/* Banner */}
        <div
          className="mb-5 flex items-center gap-5 overflow-hidden rounded-[20px] p-5 md:p-6"
          style={{ background: r.bannerBg }}
        >
          <div className="flex h-[72px] w-[72px] flex-none items-center justify-center rounded-[20px] bg-white text-[40px] shadow-card md:h-[84px] md:w-[84px] md:text-[44px]">
            {r.emoji}
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="text-xl font-black tracking-tight text-foreground md:text-2xl">{r.name}</h1>
            <p className="my-1.5 text-[13px] leading-snug text-foreground/70 md:text-sm">{r.desc}</p>
            <div className="flex flex-wrap gap-2">
              <span className="flex items-center gap-1 rounded-lg bg-success px-2.5 py-1.5 text-[13px] font-extrabold text-primary-foreground">
                {r.rating} ★
              </span>
              <span className="flex items-center gap-1.5 rounded-lg bg-white px-2.5 py-1.5 text-[13px] font-bold text-foreground">
                🕐 {r.eta}
              </span>
              <span className="flex items-center gap-1.5 rounded-lg bg-white px-2.5 py-1.5 text-[13px] font-bold text-foreground">
                📍 {r.distance}
              </span>
              <span className="rounded-lg bg-info px-2.5 py-1.5 text-[13px] font-extrabold text-info-foreground">
                {r.discount}
              </span>
            </div>
          </div>
        </div>

        {/* Menu groups */}
        <div className="space-y-2">
          {groups.map((g) => (
            <div key={g.cat}>
              <div className="my-3 flex items-center gap-2.5">
                <h2 className="text-lg font-extrabold text-foreground">{g.cat}</h2>
                <span className="text-[13px] font-semibold text-muted-foreground">({g.items.length})</span>
                <div className="h-px flex-1 bg-border" />
              </div>
              <div className="flex flex-col gap-2.5">
                {g.items.map((it) => (
                  <MenuItemRow key={it.id} item={it} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </FoodShell>
  );
}
