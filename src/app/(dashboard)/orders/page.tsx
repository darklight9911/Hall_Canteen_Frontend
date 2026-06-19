"use client";

import { useState } from "react";
import { ReceiptText } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { OrderStatusBadge } from "@/components/shared/order-status-badge";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { mockOrders } from "@/lib/mock";
import { formatCurrency, formatDateTime } from "@/lib/format";
import type { OrderStatus } from "@/types";

const TABS = ["all", "active", "delivered", "cancelled"] as const;
const ACTIVE_STATUSES: OrderStatus[] = ["pending", "confirmed", "ready"];

export default function OrdersPage() {
  const [tab, setTab] = useState<string>("all");

  const filtered = mockOrders.filter((o) =>
    tab === "all"
      ? true
      : tab === "active"
        ? ACTIVE_STATUSES.includes(o.status)
        : o.status === tab
  );

  return (
    <div>
      <PageHeader title="Orders" description="Track and manage canteen orders" />

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="mb-6">
          {TABS.map((t) => (
            <TabsTrigger key={t} value={t} className="capitalize">
              {t}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={tab}>
          {filtered.length === 0 ? (
            <EmptyState
              icon={ReceiptText}
              title="No orders here"
              description="Orders matching this filter will show up here."
            />
          ) : (
            <div className="space-y-3">
              {filtered.map((o) => (
                <Card key={o.id} className="p-4 md:p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-foreground">#{o.id}</span>
                        <OrderStatusBadge status={o.status} />
                      </div>
                      <p className="line-clamp-1 text-sm text-muted-foreground">
                        {o.items.map((i) => `${i.quantity}× ${i.name}`).join(", ")}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatDateTime(o.createdAt)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-extrabold text-foreground">
                        {formatCurrency(o.total)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {o.items.reduce((n, i) => n + i.quantity, 0)} items
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
