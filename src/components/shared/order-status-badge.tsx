import { Badge, type BadgeProps } from "@/components/ui/badge";
import type { OrderStatus } from "@/types";

const STATUS_MAP: Record<
  OrderStatus,
  { label: string; variant: BadgeProps["variant"] }
> = {
  pending: { label: "Pending", variant: "warning" },
  confirmed: { label: "Confirmed", variant: "info" },
  ready: { label: "Ready", variant: "outline" },
  delivered: { label: "Delivered", variant: "success" },
  cancelled: { label: "Cancelled", variant: "destructive" },
};

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  const { label, variant } = STATUS_MAP[status];
  return (
    <Badge variant={variant} className="rounded-full px-2.5 py-1">
      {label}
    </Badge>
  );
}
