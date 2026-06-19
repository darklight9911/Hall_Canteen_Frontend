import Link from "next/link";
import { FoodLogo } from "./food-logo";

const COLUMNS: { title: string; links: string[] }[] = [
  { title: "Quick Links", links: ["Menu", "Orders", "Billing"] },
  { title: "Meals", links: ["Breakfast", "Lunch", "Supper", "Dinner"] },
  { title: "About", links: ["About Hall Canteen", "For Restaurants", "Help & Support"] },
];

/** Web footer (hidden on mobile, where the bottom nav takes over). */
export function FoodFooter() {
  return (
    <footer className="mt-8 hidden border-t border-border bg-background md:block">
      <div className="mx-auto grid max-w-[1240px] grid-cols-[1.4fr_1fr_1fr_1fr] gap-8 px-7 pb-7 pt-10">
        <div>
          <FoodLogo className="mb-2.5 text-[22px]" />
          <p className="max-w-[230px] text-[13px] leading-relaxed text-muted-foreground">
            Fresh campus food from restaurants around your hall, delivered to your block in minutes.
          </p>
        </div>
        {COLUMNS.map((col) => (
          <div key={col.title}>
            <div className="mb-3 text-sm font-extrabold text-foreground">{col.title}</div>
            <div className="flex flex-col gap-2.5 text-[13px] text-muted-foreground">
              {col.links.map((l) => (
                <Link key={l} href="/" className="transition-colors hover:text-foreground">
                  {l}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-[1240px] px-7 py-4 text-xs text-muted-foreground">
          © 2026 Hall Canteen · Crafted for campus.
        </div>
      </div>
    </footer>
  );
}
