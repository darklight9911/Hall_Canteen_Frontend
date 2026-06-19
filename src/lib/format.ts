const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
] as const;

/** Indian Rupee, no decimals — matches the canteen storefront feel. */
export function formatCurrency(amount: number): string {
  return `₹${Math.round(amount).toLocaleString("en-IN")}`;
}

/**
 * Timezone-independent date/time formatter (uses UTC) so server and client
 * render identically and never trip a hydration mismatch.
 * e.g. "18 Jun, 09:30"
 */
export function formatDateTime(iso: string): string {
  const d = new Date(iso);
  const day = d.getUTCDate();
  const mon = MONTHS[d.getUTCMonth()];
  const h = String(d.getUTCHours()).padStart(2, "0");
  const m = String(d.getUTCMinutes()).padStart(2, "0");
  return `${day} ${mon}, ${h}:${m}`;
}
