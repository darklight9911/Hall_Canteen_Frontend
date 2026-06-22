"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { Check, X, ShieldCheck } from "lucide-react";
import { FoodShell } from "@/components/food/food-shell";
import { Button } from "@/components/ui/button";
import { Badge, type BadgeProps } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useAuthStore } from "@/store/auth";
import { useMounted } from "@/hooks/use-mounted";
import { formatDateTime } from "@/lib/format";
import {
  approveApplication,
  listApplications,
  rejectApplication,
  type ApplicationStatus,
  type PartnerApplication,
} from "@/lib/partner-api";

const TABS: ApplicationStatus[] = ["pending", "approved", "rejected"];

const STATUS_VARIANT: Record<ApplicationStatus, BadgeProps["variant"]> = {
  pending: "warning",
  approved: "success",
  rejected: "destructive",
};

export default function DeveloperApplicationsPage() {
  const mounted = useMounted();
  const role = useAuthStore((s) => s.user?.role);
  const isDev = mounted && role === "developer";

  const [tab, setTab] = useState<ApplicationStatus>("pending");
  const [apps, setApps] = useState<PartnerApplication[]>([]);
  const [busy, setBusy] = useState(false);

  const refresh = useCallback(async (status: ApplicationStatus) => {
    try {
      setApps(await listApplications(status));
    } catch {
      setApps([]);
    }
  }, []);

  useEffect(() => {
    if (!isDev) return;
    let active = true;
    void (async () => {
      try {
        const data = await listApplications(tab);
        if (active) setApps(data);
      } catch {
        if (active) setApps([]);
      }
    })();
    return () => {
      active = false;
    };
  }, [isDev, tab]);

  async function onApprove(id: string) {
    setBusy(true);
    try {
      await approveApplication(id);
      toast.success("Approved — the partner can now manage their shop");
      await refresh(tab);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not approve");
    } finally {
      setBusy(false);
    }
  }

  async function onReject(id: string) {
    setBusy(true);
    try {
      await rejectApplication(id);
      toast.success("Application rejected");
      await refresh(tab);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not reject");
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

  if (!isDev) {
    return (
      <FoodShell>
        <div className="mx-auto max-w-md rounded-2xl border border-border bg-card p-8 text-center">
          <ShieldCheck className="mx-auto h-10 w-10 text-muted-foreground" />
          <h1 className="mt-3 text-xl font-extrabold text-foreground">Developers only</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            You need a developer account to review partner applications.
          </p>
        </div>
      </FoodShell>
    );
  }

  return (
    <FoodShell>
      <div className="mb-5 flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent">
          <ShieldCheck className="h-6 w-6 text-success" />
        </span>
        <h1 className="text-2xl font-extrabold tracking-tight text-foreground">Partner applications</h1>
      </div>

      <Tabs value={tab} onValueChange={(v) => setTab(v as ApplicationStatus)}>
        <TabsList className="mb-5">
          {TABS.map((t) => (
            <TabsTrigger key={t} value={t} className="capitalize">
              {t}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value={tab}>
          {apps.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-border bg-card py-12 text-center text-sm text-muted-foreground">
              No {tab} applications.
            </p>
          ) : (
            <div className="space-y-3">
              {apps.map((app) => (
                <div key={app.id} className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-4 sm:flex-row">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={app.photo}
                    alt={app.shop_name}
                    className="h-40 w-full shrink-0 rounded-xl border border-border object-cover sm:h-28 sm:w-40"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="truncate text-lg font-extrabold text-foreground">{app.shop_name}</h3>
                      <Badge variant={STATUS_VARIANT[app.status]} className="capitalize">{app.status}</Badge>
                    </div>
                    <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                      <Info label="Owner" value={app.full_name} />
                      <Info label="Phone" value={app.phone} />
                      <Info label="Location" value={app.location} />
                      <Info label="Applied" value={formatDateTime(app.created_at)} />
                    </div>
                  </div>
                  {app.status === "pending" && (
                    <div className="flex gap-2 sm:flex-col sm:justify-center">
                      <Button onClick={() => onApprove(app.id)} disabled={busy} className="flex-1">
                        <Check className="h-4 w-4" />
                        Approve
                      </Button>
                      <Button onClick={() => onReject(app.id)} disabled={busy} variant="outline" className="flex-1 border-destructive text-destructive hover:bg-destructive/10">
                        <X className="h-4 w-4" />
                        Reject
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </FoodShell>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <dt className="text-xs font-semibold text-muted-foreground">{label}</dt>
      <dd className="truncate font-bold text-foreground">{value}</dd>
    </div>
  );
}
