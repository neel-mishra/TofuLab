import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: "TofuLab - Marketing AI Agent",
  description: "Mia Agent works alongside your marketers to plan, analyze, optimize, and report across Meta, Google, TikTok, and Amazon with deep API integration and end-to-end actions.",
  icons: {
    icon: ["/images/tofulab-logo.png"],
    apple: ["/images/tofulab-logo.png"],
  },
  manifest: "/manifest.json",
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-[#1a1a1a] text-white antialiased`}>{children}</body>
    </html>
  );
}
