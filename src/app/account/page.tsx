"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReceiptText, MapPin, HelpCircle, LogOut, LogIn, ChevronRight, Pencil, Camera } from "lucide-react";
import { signOut } from "firebase/auth";
import { toast } from "sonner";
import { FoodShell } from "@/components/food/food-shell";
import { ManageShell } from "@/components/manage/manage-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserAvatar } from "@/components/ui/user-avatar";
import { auth } from "@/lib/firebase";
import { logoutBackend, updateProfile } from "@/lib/auth-api";
import { fileToDataUrl } from "@/lib/partner-api";
import { useAuthStore } from "@/store/auth";
import { useMounted } from "@/hooks/use-mounted";

const MENU = [
  { icon: ReceiptText, label: "Your orders", href: "/my-orders" },
  { icon: MapPin, label: "Saved addresses", href: "#" },
  { icon: HelpCircle, label: "Help & support", href: "#" },
];

export default function AccountPage() {
  const mounted = useMounted();
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const setUser = useAuthStore((s) => s.setUser);

  const [editing, setEditing] = useState(false);
  const [fullName, setFullName] = useState("");
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarDataUrl, setAvatarDataUrl] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  if (!mounted) {
    return (
      <FoodShell>
        <div className="h-40" />
      </FoodShell>
    );
  }

  if (!user) {
    return (
      <FoodShell>
        <div className="mx-auto max-w-md rounded-2xl border border-border bg-card p-8 text-center">
          <div className="text-5xl">👋</div>
          <h1 className="mt-3 text-xl font-extrabold text-foreground">You&apos;re browsing as a guest</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Sign in to see your orders, saved addresses and more.
          </p>
          <Button asChild size="lg" className="mt-5 w-full">
            <Link href="/login">
              <LogIn className="h-5 w-5" />
              Sign in
            </Link>
          </Button>
        </div>
      </FoodShell>
    );
  }

  const isManager = user.role === "developer" || user.role === "partner";
  const Shell = isManager ? ManageShell : FoodShell;

  function openEdit() {
    setFullName(user!.name);
    setAvatarPreview(user!.avatar ?? null);
    setAvatarDataUrl(null);
    setEditing(true);
  }

  async function onAvatarPick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const dataUrl = await fileToDataUrl(file, 5_000_000);
      setAvatarPreview(dataUrl);
      setAvatarDataUrl(dataUrl);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not read the image");
    }
  }

  async function handleSave() {
    if (!user) return;
    setSaving(true);
    try {
      const updated = await updateProfile({
        fullName: fullName.trim() !== user.name ? fullName.trim() : undefined,
        avatar: avatarDataUrl ?? undefined,
      });
      setUser({ ...user, ...updated });
      setEditing(false);
      toast.success("Profile updated");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Shell>
      <h1 className="mb-5 text-2xl font-extrabold tracking-tight text-foreground">Account</h1>

      {/* ── Profile card ── */}
      <div className="mb-4 flex items-center gap-4 rounded-2xl border border-border bg-card p-5">
        <UserAvatar name={user.name} avatar={user.avatar} size={64} className="text-2xl font-black" />
        <div className="flex-1 min-w-0">
          <div className="text-lg font-extrabold text-foreground">{user.name}</div>
          <div className="text-sm text-muted-foreground">{user.email}</div>
          <span className="mt-1 inline-block rounded-full bg-accent px-2 py-0.5 text-[11px] font-bold capitalize text-brand-foreground">
            {user.role}
          </span>
        </div>
        <Button variant="outline" size="sm" onClick={openEdit}>
          <Pencil className="h-4 w-4" />
          Edit
        </Button>
      </div>

      {/* ── Edit panel (inline, slides in) ── */}
      {editing && (
        <div className="mb-4 rounded-2xl border border-border bg-card p-5 space-y-4">
          <h2 className="font-extrabold text-foreground">Edit profile</h2>

          {/* Avatar picker */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <UserAvatar
                name={fullName || user.name}
                avatar={avatarPreview ?? undefined}
                size={72}
                className="text-2xl font-black"
              />
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-background bg-success text-primary-foreground shadow"
              >
                <Camera className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="text-sm text-muted-foreground">
              <p className="font-semibold text-foreground">Profile photo</p>
              <p>JPG, PNG, WebP — max 5 MB</p>
            </div>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onAvatarPick}
            />
          </div>

          {/* Name field */}
          <div className="space-y-1.5">
            <Label htmlFor="full-name">Full name</Label>
            <Input
              id="full-name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              maxLength={255}
            />
          </div>

          <div className="flex gap-2 pt-1">
            <Button onClick={handleSave} disabled={saving} className="flex-1">
              {saving ? "Saving…" : "Save changes"}
            </Button>
            <Button variant="outline" onClick={() => setEditing(false)} disabled={saving}>
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* ── Menu items ── */}
      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        {MENU.map((m) => (
          <Link
            key={m.label}
            href={m.href}
            className="flex items-center gap-3 border-b border-border px-5 py-4 text-sm font-bold text-foreground last:border-0 hover:bg-muted"
          >
            <m.icon className="h-5 w-5 text-success" />
            {m.label}
            <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground" />
          </Link>
        ))}
      </div>

      <Button
        variant="outline"
        className="mt-4 w-full"
        onClick={async () => {
          await logoutBackend();
          if (auth) {
            try {
              await signOut(auth);
            } catch {
              // ignore — clear local session regardless
            }
          }
          setUser(null);
          router.push("/");
        }}
      >
        <LogOut className="h-4 w-4" />
        Log out
      </Button>
    </Shell>
  );
}
