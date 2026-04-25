import type { Metadata } from "next";
import "./globals.css";
import { PreStandardBanner } from "@/components/PreStandardBanner";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "TrueEV — Standardized real-world EV metrics",
  description:
    "Normalized EV comparison data: highway range and charging times measured against a single, transparent specification. Pre-standard release uses modeled estimates.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-paper text-ink antialiased">
        <PreStandardBanner />
        <SiteHeader />
        <main className="mx-auto w-full max-w-6xl px-4 py-10">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
