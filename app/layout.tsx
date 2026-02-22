import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Use relative import to avoid "@/..." path alias issues in TS/VSCode
import { organizationJsonLd, websiteJsonLd } from "../lib/schema";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "City Law Guide",
    template: "%s | City Law Guide",
  },
  description:
    "Public-first, city-by-city legal information. Neutral, educational resources organized by location and practice area.",
  metadataBase: new URL("https://citylawguide.com"),
  alternates: { canonical: "/" },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  // Pre-stringify JSON-LD to keep TS + runtime happy
  const orgLd = JSON.stringify(organizationJsonLd());
  const siteLd = JSON.stringify(websiteJsonLd());

  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body
        className={[
          geistSans.variable,
          geistMono.variable,
          "h-full antialiased",
          "bg-white text-neutral-900",
        ].join(" ")}
      >
        {/* Global JSON-LD: Organization + WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: orgLd }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: siteLd }}
        />

        <div className="min-h-full">
          <header className="border-b border-neutral-200 bg-white/80 backdrop-blur">
            <div className="mx-auto max-w-5xl px-6 py-4 flex items-center justify-between gap-6">
              <Link href="/" className="flex items-center gap-2">
                <span className="text-sm font-semibold tracking-wide text-neutral-900">
                  City Law Guide
                </span>
              </Link>

              <nav className="flex items-center gap-4 text-sm text-neutral-700">
                <Link href="/dui-lawyer" className="hover:text-neutral-900">
                  DUI
                </Link>
                <Link
                  href="/personal-injury-lawyer"
                  className="hover:text-neutral-900"
                >
                  Personal Injury
                </Link>
                <Link
                  href="/editorial-policy"
                  className="hover:text-neutral-900"
                >
                  Editorial Policy
                </Link>
                <Link
                  href="/sponsorship-disclosure"
                  className="hover:text-neutral-900"
                >
                  Disclosure
                </Link>
              </nav>
            </div>
          </header>

          <div className="mx-auto max-w-5xl px-6">
            <div className="py-10">{children}</div>
          </div>

          <footer className="border-t border-neutral-200 bg-white">
            <div className="mx-auto max-w-5xl px-6 py-8 text-sm text-neutral-600">
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                <Link
                  href="/editorial-policy"
                  className="hover:text-neutral-900"
                >
                  Editorial Policy
                </Link>
                <Link
                  href="/sponsorship-disclosure"
                  className="hover:text-neutral-900"
                >
                  Sponsorship Disclosure
                </Link>
                <Link href="/contact" className="hover:text-neutral-900">
                  Contact
                </Link>
              </div>

              <p className="mt-4 text-xs text-neutral-500">
                City Law Guide provides general legal information for educational
                purposes only. It is not legal advice and does not create an
                attorney-client relationship.
              </p>

              <p className="mt-4 text-xs text-neutral-500">
                © {new Date().getFullYear()} CityLawGuide.com
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}