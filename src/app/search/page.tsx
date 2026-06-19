"use client";

import { useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import { FoodShell } from "@/components/food/food-shell";
import { DishCard } from "@/components/food/dish-card";
import { RestaurantCard } from "@/components/food/restaurant-card";
import { items, restaurants, restaurantById } from "@/lib/restaurants";

export default function SearchPage() {
  const [q, setQ] = useState("");
  const query = q.trim().toLowerCase();

  const matchedDishes = query
    ? items.filter((i) => {
        const r = restaurantById(i.rid);
        return (
          i.name.toLowerCase().includes(query) ||
          i.desc.toLowerCase().includes(query) ||
          i.cat.toLowerCase().includes(query) ||
          (r?.name.toLowerCase().includes(query) ?? false)
        );
      })
    : items.filter((i) => i.popular);

  const matchedRestaurants = query
    ? restaurants.filter(
        (r) => r.name.toLowerCase().includes(query) || r.cuisine.toLowerCase().includes(query)
      )
    : [];

  return (
    <FoodShell>
      <h1 className="mb-4 text-2xl font-extrabold tracking-tight text-foreground">Search</h1>

      <div className="relative mb-6">
        <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <input
          autoFocus
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder='Search "tehari", "biryani", "cha"…'
          className="h-12 w-full rounded-full border border-border bg-card pl-12 pr-4 text-sm font-medium placeholder:font-normal placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </div>

      {matchedRestaurants.length > 0 && (
        <section className="mb-7 space-y-3">
          <h2 className="text-lg font-extrabold text-foreground">Restaurants</h2>
          <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
            {matchedRestaurants.map((r) => (
              <RestaurantCard key={r.id} r={r} />
            ))}
          </div>
        </section>
      )}

      <section className="space-y-3">
        <h2 className="text-lg font-extrabold text-foreground">
          {query ? `Dishes matching “${q.trim()}”` : "Popular dishes"}
        </h2>
        {matchedDishes.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-border bg-card py-12 text-center text-sm text-muted-foreground">
            No dishes found. Try “biryani”, “cha” or “burger”.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {matchedDishes.map((d) => (
              <DishCard key={d.id} item={d} />
            ))}
          </div>
        )}
      </section>
    </FoodShell>
  );
}
