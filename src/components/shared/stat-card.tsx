import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string;
  icon?: LucideIcon;
  hint?: string;
  trend?: "up" | "down";
}

export function StatCard({ label, value, icon: Icon, hint, trend = "up" }: StatCardProps) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <p className="text-sm font-semibold text-muted-foreground">{label}</p>
          <p className="text-2xl font-extrabold tracking-tight text-foreground">{value}</p>
          {hint && (
            <p
              className={cn(
                "text-xs font-bold",
                trend === "down" ? "text-destructive" : "text-success"
              )}
            >
              {hint}
            </p>
          )}
        </div>
        {Icon && (
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent">
            <Icon className="h-5 w-5 text-success" />
          </span>
        )}
      </div>
    </Card>
  );
}
