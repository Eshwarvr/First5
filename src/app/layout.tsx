import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "First5 – AI Powered Hyperlocal Emergency Response",
  description:
    "First5 connects you with nearby verified community heroes during the critical first 5 minutes of an emergency. AI-powered, real-time, life-saving.",
  keywords: ["emergency", "SOS", "first aid", "volunteer", "safety", "AI", "community"],
  authors: [{ name: "First5 Team" }],
  openGraph: {
    title: "First5 – AI Emergency Response Network",
    description: "Community-powered emergency response in under 3 minutes",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
