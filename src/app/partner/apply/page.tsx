"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { signInWithPopup } from "firebase/auth";
import { toast } from "sonner";
import { CheckCircle2, Clock, Store } from "lucide-react";
import { FoodShell } from "@/components/food/food-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { auth, googleProvider } from "@/lib/firebase";
import {
  applyPartner,
  fileToDataUrl,
  getMyApplication,
  type PartnerApplication,
} from "@/lib/partner-api";

export default function PartnerApplyPage() {
  const [idToken, setIdToken] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [shopName, setShopName] = useState("");
  const [location, setLocation] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [existing, setExisting] = useState<PartnerApplication | null>(null);

  useEffect(() => {
    getMyApplication().then((a) => {
      if (a) setExisting(a);
    });
  }, []);

  async function onGoogle() {
    if (!auth) {
      toast.error("Google sign-in isn't configured yet");
      return;
    }
    setLoading(true);
    try {
      const cred = await signInWithPopup(auth, googleProvider);
      setIdToken(await cred.user.getIdToken());
      setEmail(cred.user.email ?? "");
      setFullName(cred.user.displayName ?? "");
    } catch (err) {
      const code = (err as { code?: string })?.code;
      if (code !== "auth/popup-closed-by-user" && code !== "auth/cancelled-popup-request") {
        toast.error("Google sign-in failed");
      }
    } finally {
      setLoading(false);
    }
  }

  async function onPhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setPhoto(await fileToDataUrl(file));
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not read the image");
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!idToken) return;
    if (!fullName || !phone || !shopName || !location || !photo) {
      toast.error("Fill every field and add a store photo");
      return;
    }
    setLoading(true);
    try {
      const application = await applyPartner({ idToken, phone, fullName, shopName, location, photo });
      setExisting(application);
      toast.success("Application submitted!");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Submission failed");
    } finally {
      setLoading(false);
    }
  }

  // Already applied (pending/approved) → show status, no re-apply.
  const blocked = existing && existing.status !== "rejected";

  return (
    <FoodShell>
      <div className="mx-auto max-w-xl">
        <div className="mb-6 text-center">
          <span className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent">
            <Store className="h-6 w-6 text-success" />
          </span>
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground">Become a partner</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Sell your food on Hall Canteen. Verify with Google, tell us about your shop, and a
            developer will review it.
          </p>
        </div>

        {blocked ? (
          <StatusCard application={existing!} />
        ) : (
          <div className="rounded-2xl border border-border bg-card p-6">
            {existing?.status === "rejected" && (
              <p className="mb-4 rounded-lg bg-destructive/10 px-3 py-2 text-sm font-bold text-destructive">
                Your previous application wasn&apos;t approved. You can submit a new one below.
              </p>
            )}

            {!idToken ? (
              <div className="space-y-3 text-center">
                <p className="text-sm text-muted-foreground">
                  Partners verify with a Google account (a personal gmail is fine — DIU email not
                  required).
                </p>
                <Button size="lg" className="w-full" onClick={onGoogle} disabled={loading}>
                  Continue with Google
                </Button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-4">
                <p className="rounded-lg bg-success/10 px-3 py-2 text-xs font-bold text-success">
                  ✓ Verified as {email}
                </p>
                <Field label="Full name">
                  <Input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Your name" />
                </Field>
                <Field label="Phone number">
                  <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="01XXXXXXXXX" inputMode="tel" />
                </Field>
                <Field label="Shop / restaurant name">
                  <Input value={shopName} onChange={(e) => setShopName(e.target.value)} placeholder="e.g. Shapla Bhojonaloy" />
                </Field>
                <Field label="Location">
                  <Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. Near Gate 2, Campus" />
                </Field>
                <Field label="Front photo of your store">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={onPhoto}
                    className="block w-full text-sm text-muted-foreground file:mr-3 file:rounded-md file:border-0 file:bg-secondary file:px-3 file:py-2 file:text-sm file:font-bold file:text-foreground"
                  />
                  {photo && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={photo} alt="Store preview" className="mt-2 h-40 w-full rounded-lg border border-border object-cover" />
                  )}
                </Field>
                <Button type="submit" size="lg" className="w-full" disabled={loading}>
                  Submit application
                </Button>
              </form>
            )}
          </div>
        )}

        <p className="mt-4 text-center text-xs text-muted-foreground">
          Looking to order food?{" "}
          <Link href="/login" className="font-bold text-success">
            Sign in as a student
          </Link>
        </p>
      </div>
    </FoodShell>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {children}
    </div>
  );
}

function StatusCard({ application }: { application: PartnerApplication }) {
  if (application.status === "approved") {
    return (
      <div className="rounded-2xl border border-border bg-card p-6 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-success" />
        <h2 className="mt-3 text-lg font-extrabold text-foreground">You&apos;re a partner!</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Your application for <b>{application.shop_name}</b> was approved.
        </p>
        <Button asChild className="mt-4">
          <Link href="/partner">Go to your dashboard</Link>
        </Button>
      </div>
    );
  }
  return (
    <div className="rounded-2xl border border-border bg-card p-6 text-center">
      <Clock className="mx-auto h-10 w-10 text-brand" />
      <h2 className="mt-3 text-lg font-extrabold text-foreground">Application under review</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        We received your application for <b>{application.shop_name}</b>. A developer will review it
        soon — you&apos;ll be able to manage your menu once approved.
      </p>
    </div>
  );
}
