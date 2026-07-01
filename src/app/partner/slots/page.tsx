"use client";

import { useCallback, useEffect, useState } from "react";
import { Clock, Plus, Pencil, Trash2, X, ToggleLeft, ToggleRight } from "lucide-react";
import { toast } from "sonner";
import { ManageShell } from "@/components/manage/manage-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth";
import { useMounted } from "@/hooks/use-mounted";
import {
  listSlots,
  createSlot,
  updateSlot,
  deleteSlot,
  type DeliverySlot,
} from "@/lib/partner-api";

const EMPTY = { label: "", start_time: "", end_time: "", max_orders: "", is_active: true };

/** Format "HH:MM:SS" from backend to "HH:MM" for display */
function fmtTime(t: string) {
  return t.slice(0, 5);
}

/** Format "HH:MM" to "h:mm AM/PM" */
function displayTime(t: string) {
  const [hStr, mStr] = t.split(":");
  const h = Number(hStr);
  const m = mStr ?? "00";
  const ampm = h < 12 ? "AM" : "PM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${m} ${ampm}`;
}

export default function DeliverySlotsPage() {
  const mounted = useMounted();
  const role = useAuthStore((s) => s.user?.role);
  const isPartner = mounted && (role === "partner" || role === "developer");

  const [slots, setSlots] = useState<DeliverySlot[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ ...EMPTY });
  const [busy, setBusy] = useState(false);

  const refresh = useCallback(async () => {
    try {
      setSlots(await listSlots());
    } catch {
      /* not a partner yet */
    }
  }, []);

  useEffect(() => {
    if (!isPartner) return;
    void refresh();
  }, [isPartner, refresh]);

  function resetForm() {
    setForm({ ...EMPTY });
    setEditingId(null);
  }

  function startEdit(slot: DeliverySlot) {
    setEditingId(slot.id);
    setForm({
      label: slot.label,
      start_time: fmtTime(slot.start_time),
      end_time: fmtTime(slot.end_time),
      max_orders: slot.max_orders != null ? String(slot.max_orders) : "",
      is_active: slot.is_active,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.label.trim() || !form.start_time || !form.end_time) {
      toast.error("Label, start time and end time are required");
      return;
    }
    if (form.start_time >= form.end_time) {
      toast.error("End time must be after start time");
      return;
    }
    const max_orders = form.max_orders ? Number.parseInt(form.max_orders, 10) : null;
    if (form.max_orders && (Number.isNaN(max_orders!) || max_orders! < 1)) {
      toast.error("Max orders must be a positive number");
      return;
    }
    setBusy(true);
    try {
      const body = {
        label: form.label.trim(),
        start_time: form.start_time,
        end_time: form.end_time,
        max_orders: max_orders ?? null,
        is_active: form.is_active,
      };
      if (editingId) {
        await updateSlot(editingId, body);
        toast.success("Slot updated");
      } else {
        await createSlot(body);
        toast.success("Slot added");
      }
      resetForm();
      await refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not save slot");
    } finally {
      setBusy(false);
    }
  }

  async function onDelete(id: string) {
    setBusy(true);
    try {
      await deleteSlot(id);
      if (editingId === id) resetForm();
      await refresh();
      toast.success("Slot removed");
    } catch {
      toast.error("Could not delete slot");
    } finally {
      setBusy(false);
    }
  }

  async function onToggleActive(slot: DeliverySlot) {
    setBusy(true);
    try {
      await updateSlot(slot.id, { is_active: !slot.is_active });
      await refresh();
    } catch {
      toast.error("Could not update slot");
    } finally {
      setBusy(false);
    }
  }

  if (!mounted) {
    return (
      <ManageShell>
        <div className="h-40" />
      </ManageShell>
    );
  }

  return (
    <ManageShell>
      <div className="mb-6 flex items-center gap-3">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent">
          <Clock className="h-6 w-6 text-success" />
        </span>
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground">Delivery Slots</h1>
          <p className="text-sm text-muted-foreground">
            Set the time windows when your restaurant accepts orders.
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
        {/* Add / edit form */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-extrabold text-foreground">
                {editingId ? "Edit slot" : "Add a slot"}
              </h2>
              {editingId && (
                <button type="button" onClick={resetForm} aria-label="Cancel" className="text-muted-foreground">
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="label">Label</Label>
              <Input
                id="label"
                placeholder="e.g. Lunch, Breakfast"
                value={form.label}
                onChange={(e) => setForm({ ...form, label: e.target.value })}
                maxLength={100}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="start">Start time</Label>
                <Input
                  id="start"
                  type="time"
                  value={form.start_time}
                  onChange={(e) => setForm({ ...form, start_time: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="end">End time</Label>
                <Input
                  id="end"
                  type="time"
                  value={form.end_time}
                  onChange={(e) => setForm({ ...form, end_time: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="max">Max orders (optional)</Label>
              <Input
                id="max"
                type="number"
                inputMode="numeric"
                min={1}
                placeholder="Unlimited"
                value={form.max_orders}
                onChange={(e) => setForm({ ...form, max_orders: e.target.value })}
              />
              <p className="text-xs text-muted-foreground">
                Leave blank to allow unlimited orders in this slot.
              </p>
            </div>

            <label className="flex items-center gap-2 text-sm font-bold text-foreground cursor-pointer select-none">
              <input
                type="checkbox"
                checked={form.is_active}
                onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
                className="h-4 w-4 accent-[#0C831F]"
              />
              Active (accepting orders)
            </label>

            <Button type="submit" className="w-full" disabled={busy}>
              {editingId ? "Save changes" : <><Plus className="h-4 w-4" />Add slot</>}
            </Button>
          </form>
        </div>

        {/* Slot list */}
        <div className="space-y-3">
          <h2 className="text-lg font-extrabold text-foreground">
            Your slots ({slots.length})
          </h2>

          {slots.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-border bg-card py-12 text-center text-sm text-muted-foreground">
              No slots yet. Add your first delivery window on the left.
            </p>
          ) : (
            slots.map((slot) => (
              <div
                key={slot.id}
                className={cn(
                  "flex items-center gap-4 rounded-2xl border bg-card p-4",
                  editingId === slot.id ? "border-success" : "border-border"
                )}
              >
                {/* Time block */}
                <div className="flex w-28 shrink-0 flex-col items-center justify-center rounded-xl bg-muted py-3 text-center">
                  <Clock className="mb-1 h-4 w-4 text-success" />
                  <span className="text-xs font-bold text-foreground">{displayTime(fmtTime(slot.start_time))}</span>
                  <span className="my-0.5 text-[10px] text-muted-foreground">to</span>
                  <span className="text-xs font-bold text-foreground">{displayTime(fmtTime(slot.end_time))}</span>
                </div>

                {/* Info */}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-extrabold text-foreground">{slot.label}</span>
                    <Badge variant={slot.is_active ? "success" : "outline"}>
                      {slot.is_active ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {slot.max_orders != null
                      ? `Max ${slot.max_orders} orders`
                      : "Unlimited orders"}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onToggleActive(slot)}
                    disabled={busy}
                    aria-label={slot.is_active ? "Deactivate" : "Activate"}
                    className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-muted"
                    title={slot.is_active ? "Deactivate" : "Activate"}
                  >
                    {slot.is_active
                      ? <ToggleRight className="h-5 w-5 text-success" />
                      : <ToggleLeft className="h-5 w-5 text-muted-foreground" />}
                  </button>
                  <button
                    onClick={() => startEdit(slot)}
                    aria-label="Edit"
                    className={cn(
                      "flex h-9 w-9 items-center justify-center rounded-lg hover:bg-muted",
                      editingId === slot.id && "bg-accent"
                    )}
                  >
                    <Pencil className="h-4 w-4 text-foreground" />
                  </button>
                  <button
                    onClick={() => onDelete(slot.id)}
                    disabled={busy}
                    aria-label="Delete"
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </ManageShell>
  );
}
