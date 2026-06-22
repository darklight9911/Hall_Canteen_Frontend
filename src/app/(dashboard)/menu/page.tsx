"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { MenuItemCard } from "@/components/shared/menu-item-card";
import { CategoryTile } from "@/components/shared/category-tile";
import { Button } from "@/components/ui/button";
import { categoryMeta, menuItems } from "@/lib/mock";
import { useAuthStore } from "@/store/auth";
import { useMounted } from "@/hooks/use-mounted";
import type { MenuCategory } from "@/types";

const CATEGORIES: MenuCategory[] = ["breakfast", "lunch", "dinner", "snacks"];

export default function MenuPage() {
  const mounted = useMounted();
  const role = useAuthStore((s) => s.user?.role);
  const canManage = mounted && (role === "developer" || role === "partner");
  const [active, setActive] = useState<MenuCategory | "all">("all");

  const shown = active === "all" ? CATEGORIES : [active];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Menu"
        description="Fresh from the campus kitchen — ready in minutes"
        action={
          canManage ? (
            <Button>
              <Plus className="h-4 w-4" />
              Add item
            </Button>
          ) : undefined
        }
      />

      {/* Category strip */}
      <div className="scrollbar-hide flex gap-3 overflow-x-auto pb-1">
        <CategoryTile
          label="All"
          emoji="🍴"
          active={active === "all"}
          onClick={() => setActive("all")}
        />
        {CATEGORIES.map((c) => (
          <CategoryTile
            key={c}
            label={c}
            emoji={categoryMeta[c].emoji}
            active={active === c}
            onClick={() => setActive(c)}
          />
        ))}
      </div>

      {shown.map((cat) => {
        const items = menuItems.filter((m) => m.category === cat);
        if (items.length === 0) return null;
        return (
          <section key={cat} className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{categoryMeta[cat].emoji}</span>
              <h2 className="text-lg font-extrabold capitalize text-foreground">{cat}</h2>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {items.map((m) => (
                <MenuItemCard key={m.id} item={m} mrp={m.mrp} emoji={m.emoji} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
