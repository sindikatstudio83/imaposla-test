import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { MobileNav } from "@/components/mobile-nav";
import { AuthProvider } from "@/lib/auth-context";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: { default: "imaposla.me - poslovi u Crnoj Gori", template: "%s | imaposla.me" },
  description: "Oglasi za posao, kandidati, firme i brzi angazmani u Crnoj Gori.",
  metadataBase: new URL("https://imaposla.me"),
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    siteName: "imaposla.me",
    locale: "sr_ME",
    type: "website",
    images: [
      {
        url: "/og-image?title=imaposla.me&subtitle=Poslovi+u+Crnoj+Gori",
        width: 1200,
        height: 630,
        alt: "imaposla.me - poslovi u Crnoj Gori",
      },
    ],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="sr-ME" data-theme="light">
      <body>
        <AuthProvider>
          <Header />
          <main className="site-shell">{children}</main>
          <MobileNav />
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
