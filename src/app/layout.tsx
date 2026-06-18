import type { Metadata, Viewport } from "next";
import { Nunito_Sans } from "next/font/google";
import "@/styles/globals.css";
import { Toaster } from "sonner";

const nunito = Nunito_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Hall Canteen — Campus Food in Minutes",
    template: "%s · Hall Canteen",
  },
  description:
    "Order breakfast, lunch, dinner & snacks from your campus canteen. Fast, fresh, on-campus delivery.",
};

export const viewport: Viewport = {
  themeColor: "#F8CB46",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${nunito.variable} font-sans antialiased`}>
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
