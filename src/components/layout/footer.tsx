import Link from "next/link";
import { Wordmark } from "@/components/shared/wordmark";

const COLUMNS: { title: string; links: [string, string][] }[] = [
  {
    title: "Quick Links",
    links: [
      ["Menu", "/menu"],
      ["Orders", "/orders"],
      ["Billing", "/billing"],
    ],
  },
  {
    title: "Categories",
    links: [
      ["Breakfast", "/menu"],
      ["Lunch", "/menu"],
      ["Dinner", "/menu"],
      ["Snacks", "/menu"],
    ],
  },
  {
    title: "About",
    links: [
      ["About Hall Canteen", "#"],
      ["Contact", "#"],
      ["Help & Support", "#"],
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-8 border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Wordmark />
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              Fresh campus food, delivered to your block in minutes.
            </p>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="mb-3 text-sm font-extrabold text-foreground">{col.title}</h3>
              <ul className="space-y-2">
                {col.links.map(([label, href]) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 pb-6 text-xs text-muted-foreground">
        © 2026 Hall Canteen · Crafted for campus.
      </div>
      <div className="h-1 w-full bg-brand" />
    </footer>
  );
}
