import type { Metadata, Viewport } from "next";
import { Lexend } from "next/font/google";
import "@/styles/globals.css";
import { Toaster } from "sonner";
import { AuthBootstrap } from "@/components/auth/auth-bootstrap";
import { GlobalNav } from "@/components/shared/global-nav";

const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-lexend",
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
      <body className={`${lexend.variable} font-sans antialiased`} suppressHydrationWarning>
        <AuthBootstrap />
        <GlobalNav />
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
