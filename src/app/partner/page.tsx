"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Pencil, Trash2, Plus, X, Store } from "lucide-react";
import { FoodShell } from "@/components/food/food-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth";
import { useMounted } from "@/hooks/use-mounted";
import {
  createItem,
  deleteItem,
  fileToDataUrl,
  getMyRestaurant,
  listMyItems,
  updateItem,
  type PartnerFoodItem,
  type PartnerRestaurant,
} from "@/lib/partner-api";

const EMPTY = { name: "", description: "", price: "", category: "", image: null as string | null, is_available: true };

export default function PartnerDashboardPage() {
  const mounted = useMounted();
  const role = useAuthStore((s) => s.user?.role);
  const isPartner = mounted && (role === "partner" || role === "developer");

  const [restaurant, setRestaurant] = useState<PartnerRestaurant | null>(null);
  const [items, setItems] = useState<PartnerFoodItem[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ ...EMPTY });
  const [busy, setBusy] = useState(false);

  const refresh = useCallback(async () => {
    try {
      const [r, list] = await Promise.all([getMyRestaurant(), listMyItems()]);
      setRestaurant(r);
      setItems(list);
    } catch {
      setRestaurant(null);
    }
  }, []);

  useEffect(() => {
    if (!isPartner) return;
    let active = true;
    void (async () => {
      try {
        const [r, list] = await Promise.all([getMyRestaurant(), listMyItems()]);
        if (active) {
          setRestaurant(r);
          setItems(list);
        }
      } catch {
        if (active) setRestaurant(null);
      }
    })();
    return () => {
      active = false;
    };
  }, [isPartner]);

  function resetForm() {
    setForm({ ...EMPTY });
    setEditingId(null);
  }

  function startEdit(item: PartnerFoodItem) {
    setEditingId(item.id);
    setForm({
      name: item.name,
      description: item.description,
      price: String(item.price),
      category: item.category,
      image: item.image,
      is_available: item.is_available,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function onPhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setForm((f) => ({ ...f, image: "" }));
      const url = await fileToDataUrl(file);
      setForm((f) => ({ ...f, image: url }));
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not read the image");
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const price = Number.parseInt(form.price, 10);
    if (!form.name.trim() || Number.isNaN(price) || price < 0) {
      toast.error("Enter a name and a valid price");
      return;
    }
    setBusy(true);
    try {
      const body = {
        name: form.name,
        description: form.description,
        price,
        category: form.category,
        image: form.image,
        is_available: form.is_available,
      };
      if (editingId) {
        await updateItem(editingId, body);
        toast.success("Item updated");
      } else {
        await createItem(body);
        toast.success("Item added");
      }
      resetForm();
      await refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not save the item");
    } finally {
      setBusy(false);
    }
  }

  async function onDelete(id: string) {
    setBusy(true);
    try {
      await deleteItem(id);
      if (editingId === id) resetForm();
      await refresh();
      toast.success("Item removed");
    } catch {
      toast.error("Could not delete the item");
    } finally {
      setBusy(false);
    }
  }

  if (!mounted) {
    return (
      <FoodShell>
        <div className="h-40" />
      </FoodShell>
    );
  }

  if (!isPartner) {
    return (
      <FoodShell>
        <div className="mx-auto max-w-md rounded-2xl border border-border bg-card p-8 text-center">
          <Store className="mx-auto h-10 w-10 text-success" />
          <h1 className="mt-3 text-xl font-extrabold text-foreground">You&apos;re not a partner yet</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Apply to become a partner to list your food items.
          </p>
          <Button asChild className="mt-4">
            <Link href="/partner/apply">Become a partner</Link>
          </Button>
        </div>
      </FoodShell>
    );
  }

  return (
    <FoodShell>
      <div className="mb-6 flex items-center gap-3">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-2xl">🏪</span>
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
            {restaurant?.name ?? "Your restaurant"}
          </h1>
          {restaurant && <p className="text-sm text-muted-foreground">{restaurant.location}</p>}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
        {/* Add / edit form */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <form onSubmit={onSubmit} className="space-y-3 rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-extrabold text-foreground">
                {editingId ? "Edit item" : "Add a food item"}
              </h2>
              {editingId && (
                <button type="button" onClick={resetForm} className="text-muted-foreground" aria-label="Cancel edit">
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <div className="space-y-2">
              <Label>Name</Label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Chicken Tehari" />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Short description" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>Price (৳)</Label>
                <Input value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} inputMode="numeric" placeholder="120" />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="Rice" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Photo (optional)</Label>
              <input
                type="file"
                accept="image/*"
                onChange={onPhoto}
                className="block w-full text-sm text-muted-foreground file:mr-3 file:rounded-md file:border-0 file:bg-secondary file:px-3 file:py-2 file:text-sm file:font-bold file:text-foreground"
              />
              {form.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={form.image} alt="" className="mt-1 h-24 w-full rounded-lg border border-border object-cover" />
              )}
            </div>
            <label className="flex items-center gap-2 text-sm font-bold text-foreground">
              <input
                type="checkbox"
                checked={form.is_available}
                onChange={(e) => setForm({ ...form, is_available: e.target.checked })}
                className="h-4 w-4 accent-[#0C831F]"
              />
              Available
            </label>
            <Button type="submit" className="w-full" disabled={busy}>
              {editingId ? "Save changes" : <><Plus className="h-4 w-4" />Add item</>}
            </Button>
          </form>
        </div>

        {/* Item list */}
        <div className="space-y-3">
          <h2 className="text-lg font-extrabold text-foreground">Your items ({items.length})</h2>
          {items.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-border bg-card py-12 text-center text-sm text-muted-foreground">
              No items yet. Add your first dish on the left.
            </p>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3.5">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-muted text-2xl">
                  {item.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.image} alt="" className="h-full w-full object-cover" />
                  ) : (
                    "🍽️"
                  )}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="truncate font-bold text-foreground">{item.name}</span>
                    {!item.is_available && <Badge variant="destructive">Hidden</Badge>}
                  </div>
                  <p className="truncate text-xs text-muted-foreground">
                    ৳{item.price}
                    {item.category ? ` · ${item.category}` : ""}
                    {item.description ? ` · ${item.description}` : ""}
                  </p>
                </div>
                <button onClick={() => startEdit(item)} aria-label="Edit" className={cn("flex h-9 w-9 items-center justify-center rounded-lg hover:bg-muted", editingId === item.id && "bg-accent")}>
                  <Pencil className="h-4 w-4 text-foreground" />
                </button>
                <button onClick={() => onDelete(item.id)} disabled={busy} aria-label="Delete" className="flex h-9 w-9 items-center justify-center rounded-lg text-destructive hover:bg-destructive/10">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </FoodShell>
  );
}
