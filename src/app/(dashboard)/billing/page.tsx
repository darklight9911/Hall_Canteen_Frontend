"use client";

import { Download, IndianRupee, Receipt, Clock } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatCard } from "@/components/shared/stat-card";
import { PageHeader } from "@/components/shared/page-header";
import { mockInvoices } from "@/lib/mock";
import { formatCurrency, formatDateTime } from "@/lib/format";

export default function BillingPage() {
  const total = mockInvoices.reduce((n, i) => n + i.amount, 0);

  function exportCsv() {
    const header = ["Invoice", "Order", "Amount", "Issued"];
    const rows = mockInvoices.map((i) => [i.id, i.orderId, String(i.amount), i.issuedAt]);
    const csv = [header, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "invoices.csv";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Exported invoices.csv");
  }

  return (
    <div>
      <PageHeader
        title="Billing"
        description="Invoices and revenue"
        action={
          <Button variant="secondary" onClick={exportCsv}>
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
        }
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard label="Total invoiced" value={formatCurrency(total)} icon={IndianRupee} hint="+12% vs last month" />
        <StatCard label="Invoices" value={String(mockInvoices.length)} icon={Receipt} />
        <StatCard label="Outstanding" value={formatCurrency(0)} icon={Clock} hint="All settled" />
      </div>

      <Card className="overflow-hidden p-0">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Invoice</TableHead>
              <TableHead>Order</TableHead>
              <TableHead>Issued</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockInvoices.map((inv) => (
              <TableRow key={inv.id}>
                <TableCell className="font-bold">{inv.id}</TableCell>
                <TableCell className="text-muted-foreground">#{inv.orderId}</TableCell>
                <TableCell className="text-muted-foreground">{formatDateTime(inv.issuedAt)}</TableCell>
                <TableCell className="text-right font-extrabold">{formatCurrency(inv.amount)}</TableCell>
                <TableCell className="text-right">
                  <Badge variant="success">Paid</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
