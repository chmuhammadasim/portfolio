import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PersonJsonLd, WebSiteJsonLd } from "@/components/JsonLd";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://chmuhammadasim.site"),
  title: {
    default: "Muhammad Asim Chattha | Software Developer & Cybersecurity Engineer",
    template: "%s | Muhammad Asim Chattha",
  },
  description:
    "Muhammad Asim Chattha is a software developer focused on cybersecurity, secure infrastructure, backend engineering, networking, and building scalable software systems.",
  applicationName: "Muhammad Asim Chattha — Portfolio",
  authors: [{ name: "Muhammad Asim Chattha", url: "https://chmuhammadasim.site" }],
  creator: "Muhammad Asim Chattha",
  keywords: [
    "Muhammad Asim Chattha",
    "Software Developer",
    "Cybersecurity",
    "Secure Infrastructure",
    "Backend Developer Pakistan",
    "Software Developer Pakistan",
    "Software Engineer Islamabad",
    "Privileged Access Management developer",
    "DNS security",
    "VPN infrastructure",
  ],
  alternates: {
    canonical: "https://chmuhammadasim.site",
    types: {
      "application/rss+xml": "https://chmuhammadasim.site/rss.xml",
    },
  },
  openGraph: {
    title: "Muhammad Asim Chattha | Software Developer & Cybersecurity Engineer",
    description:
      "Software developer focused on cybersecurity, secure infrastructure, backend engineering, and networking — building scalable, secure software systems.",
    url: "https://chmuhammadasim.site",
    siteName: "Muhammad Asim Chattha",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/api/og?title=Muhammad+Asim+Chattha&subtitle=Software+Developer+%26+Cybersecurity+Engineer&tags=Cybersecurity,Secure+Infrastructure,Backend",
        width: 1200,
        height: 630,
        alt: "Muhammad Asim Chattha — Software Developer & Cybersecurity Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Asim Chattha | Software Developer & Cybersecurity Engineer",
    description:
      "Software developer focused on cybersecurity, secure infrastructure, backend engineering, and networking.",
    images: [
      "/api/og?title=Muhammad+Asim+Chattha&subtitle=Software+Developer+%26+Cybersecurity+Engineer&tags=Cybersecurity,Secure+Infrastructure,Backend",
    ],
  },
  robots: {
    index: true,
    follow: true,
    "max-video-preview": -1,
    "max-image-preview": "large",
    "max-snippet": -1,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_VERIFICATION_CODE || "YOUR_GOOGLE_VERIFICATION_CODE",
  },
  category: "technology",
  referrer: "strict-origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
  ],
  width: "device-width",
  initialScale: 1,
};

/**
 * Inline theme bootstrap: applies the saved theme (or system
 * preference) before first paint to avoid a flash of wrong theme.
 */
const themeScript = `(function(){try{var s=localStorage.getItem("theme");var d=s?s==="light"?"light":"dark":(window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark");document.documentElement.setAttribute("data-theme",d);}catch(e){document.documentElement.setAttribute("data-theme","dark");}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Muhammad Asim Chattha — Tech Blog RSS"
          href="/rss.xml"
        />
        <link rel="preconnect" href="https://avatars.githubusercontent.com" />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-0WPM8S5RV5"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-0WPM8S5RV5');
          `}
        </Script>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <PersonJsonLd />
        <WebSiteJsonLd />
        {children}
      </body>
    </html>
  );
}
