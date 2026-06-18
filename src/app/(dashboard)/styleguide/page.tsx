"use client";

import { Clock, Lock, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { MenuItemCard } from "@/components/shared/menu-item-card";
import { OrderStatusBadge } from "@/components/shared/order-status-badge";
import { useAuthStore } from "@/store/auth";
import { useMounted } from "@/hooks/use-mounted";
import { menuItems } from "@/lib/mock";
import type { OrderStatus } from "@/types";

const SWATCHES: { name: string; className: string; hex: string }[] = [
  { name: "brand (yellow)", className: "bg-brand", hex: "#F8CB46" },
  { name: "primary / success (green)", className: "bg-primary", hex: "#0C831F" },
  { name: "info (blue)", className: "bg-info", hex: "#256FEF" },
  { name: "foreground", className: "bg-foreground", hex: "#1C1C1C" },
  { name: "muted", className: "bg-muted border border-border", hex: "#F7F7F8" },
  { name: "accent", className: "bg-accent border border-border", hex: "#FEF6DD" },
  { name: "border", className: "bg-border", hex: "#EFEFF4" },
  { name: "destructive", className: "bg-destructive", hex: "#D7263D" },
];

const STATUSES: OrderStatus[] = ["pending", "confirmed", "ready", "delivered", "cancelled"];

export default function StyleguidePage() {
  const mounted = useMounted();
  const role = useAuthStore((s) => s.user?.role);
  const allowed = role === "admin" || process.env.NODE_ENV !== "production";

  if (!mounted) return null;
  if (!allowed) {
    return <EmptyState icon={Lock} title="Admins only" description="The style guide is available to admins." />;
  }

  return (
    <div className="space-y-10">
      <PageHeader title="Style Guide" description="Blinkit-inspired design tokens & components" />

      <Section title="Colors">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {SWATCHES.map((s) => (
            <div key={s.name} className="space-y-2">
              <div className={`h-16 w-full rounded-lg ${s.className}`} />
              <div className="text-xs">
                <p className="font-bold text-foreground">{s.name}</p>
                <p className="text-muted-foreground">{s.hex}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Typography (Nunito Sans)">
        <div className="space-y-1">
          <p className="text-2xl font-extrabold">Heading · 2xl / extrabold</p>
          <p className="text-lg font-extrabold">Section · lg / extrabold</p>
          <p className="text-base font-bold">Body bold · base / bold</p>
          <p className="text-sm text-muted-foreground">Muted body · sm / muted-foreground</p>
          <p className="text-base font-extrabold">Price · ₹120 / extrabold</p>
        </div>
      </Section>

      <Section title="Buttons">
        <div className="flex flex-wrap items-center gap-3">
          <Button>Primary</Button>
          <Button variant="add" size="add">Add</Button>
          <Button variant="cart" size="lg"><ShoppingCart className="h-5 w-5" />My Cart</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="link">Link</Button>
        </div>
      </Section>

      <Section title="Badges">
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="time"><Clock className="h-3 w-3" />10 MINS</Badge>
          <Badge variant="discount">25% OFF</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="info">Info</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
      </Section>

      <Section title="Order status badges">
        <div className="flex flex-wrap items-center gap-3">
          {STATUSES.map((s) => (
            <OrderStatusBadge key={s} status={s} />
          ))}
        </div>
      </Section>

      <Section title="Menu item card">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {menuItems.slice(0, 4).map((m) => (
            <MenuItemCard key={m.id} item={m} mrp={m.mrp} emoji={m.emoji} />
          ))}
        </div>
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
