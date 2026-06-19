// Centralized chart palette so recharts stays on-brand everywhere.
export const chartColors = {
  green: "#0C831F",
  yellow: "#F8CB46",
  blue: "#256FEF",
  red: "#D7263D",
  grid: "hsl(240 22% 95%)",
  muted: "#7E808C",
} as const;

export const chartPalette = [
  chartColors.green,
  chartColors.yellow,
  chartColors.blue,
  chartColors.red,
  chartColors.muted,
] as const;

export const chartTooltipStyle = {
  borderRadius: 12,
  border: "1px solid hsl(240 22% 95%)",
  boxShadow: "0 6px 20px rgba(0,0,0,0.10)",
  fontSize: 12,
  fontWeight: 600,
} as const;
