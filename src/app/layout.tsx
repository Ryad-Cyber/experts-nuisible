import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import PlausibleProvider from "next-plausible";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyCallBar } from "@/components/layout/StickyCallBar";
import { PhoneClickTracker } from "@/components/analytics/PhoneClickTracker";
import { siteConfig } from "@/config/site";
import "./globals.css";

const plausibleSrc = process.env.NEXT_PUBLIC_PLAUSIBLE_SRC;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const content = (
    <>
      <PhoneClickTracker />
      <Header />
      <main className="flex-1 pb-20 md:pb-0">{children}</main>
      <Footer />
      <StickyCallBar />
    </>
  );

  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        {plausibleSrc ? (
          <PlausibleProvider src={plausibleSrc}>{content}</PlausibleProvider>
        ) : (
          content
        )}
      </body>
    </html>
  );
}
