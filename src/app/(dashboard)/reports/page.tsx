"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";
import { Lock, IndianRupee, ShoppingBag, TrendingUp, Star } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { StatCard } from "@/components/shared/stat-card";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { useAuthStore } from "@/store/auth";
import { useMounted } from "@/hooks/use-mounted";
import { popularItems, revenueByDay } from "@/lib/mock";
import { chartColors, chartPalette, chartTooltipStyle } from "@/lib/chart";
import { formatCurrency } from "@/lib/format";

export default function ReportsPage() {
  const mounted = useMounted();
  const role = useAuthStore((s) => s.user?.role);

  // Auth is client-side (persisted store), so gate on the client after mount.
  if (!mounted) return null;
  if (role !== "admin") {
    return (
      <EmptyState
        icon={Lock}
        title="Admins only"
        description="You need an admin account to view reports. Sign in as an admin to continue."
      />
    );
  }

  const revenue = revenueByDay.reduce((n, d) => n + d.revenue, 0);
  const orders = revenueByDay.reduce((n, d) => n + d.orders, 0);

  return (
    <div className="space-y-6">
      <PageHeader title="Reports" description="Revenue and performance insights" />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Revenue (7d)" value={formatCurrency(revenue)} icon={IndianRupee} hint="+8.2%" />
        <StatCard label="Orders (7d)" value={String(orders)} icon={ShoppingBag} hint="+5.1%" />
        <StatCard label="Avg order value" value={formatCurrency(Math.round(revenue / orders))} icon={TrendingUp} />
        <StatCard label="Top item" value={popularItems[0].name} icon={Star} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Revenue trend</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueByDay} margin={{ left: -8, right: 12, top: 8, bottom: 0 }}>
                <defs>
                  <linearGradient id="revFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={chartColors.green} stopOpacity={0.3} />
                    <stop offset="100%" stopColor={chartColors.green} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} vertical={false} />
                <XAxis dataKey="day" tickLine={false} axisLine={false} fontSize={12} stroke={chartColors.muted} />
                <YAxis tickLine={false} axisLine={false} fontSize={12} stroke={chartColors.muted} width={48} />
                <Tooltip
                  contentStyle={chartTooltipStyle}
                  formatter={(v: number) => [formatCurrency(v), "Revenue"]}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke={chartColors.green}
                  strokeWidth={2.5}
                  fill="url(#revFill)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Most popular items</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={popularItems} margin={{ left: -8, right: 12, top: 8, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} vertical={false} />
                <XAxis dataKey="name" tickLine={false} axisLine={false} fontSize={11} stroke={chartColors.muted} interval={0} />
                <YAxis tickLine={false} axisLine={false} fontSize={12} stroke={chartColors.muted} width={40} />
                <Tooltip cursor={{ fill: "hsl(240 9% 97%)" }} contentStyle={chartTooltipStyle} />
                <Bar dataKey="sold" radius={[6, 6, 0, 0]}>
                  {popularItems.map((_, i) => (
                    <Cell key={i} fill={chartPalette[i % chartPalette.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
