import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Geist, Geist_Mono, Orbitron } from "next/font/google";
import "./globals.css";
import { GlobalJsonLd } from "@/components/JsonLd";
import ScrollProgress from "@/components/ScrollProgress";
import { PROFILE, SITE_URL } from "@/lib/site-data";

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

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const DEFAULT_TITLE =
  "Muhammad Asim Chattha — Software Developer & Cybersecurity";
const DEFAULT_DESCRIPTION =
  "Muhammad Asim Chattha is a software developer building security platforms — DNS security, VPN, PAM — plus full-stack Go, Node.js, React, and Flutter products.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: "%s | Muhammad Asim Chattha",
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: "Muhammad Asim Chattha — Portfolio",
  authors: [{ name: PROFILE.name, url: SITE_URL }],
  creator: PROFILE.name,
  publisher: PROFILE.name,
  keywords: [
    "Muhammad Asim Chattha",
    "Muhammad Asim Chattha portfolio",
    "Muhammad Asim Chattha resume",
    "software developer Pakistan",
    "software engineer Islamabad",
    "cybersecurity engineer",
    "security platform developer",
    "backend developer",
    "privileged access management developer",
    "PAM engineer",
    "DNS security",
    "VPN infrastructure",
    "IP address management",
    "endpoint security",
    "Go developer",
    "Golang backend developer",
    "Node.js developer",
    "Next.js developer",
    "React developer",
    "Flutter developer",
    "full stack developer Islamabad",
    "IotaScales",
    "Atrios DNS Security",
    "OmniPriv PAM",
    "GenesisVPN",
    "CyberSentinel",
    "DeWall",
    "Civilex",
    "TheraLearn",
  ],
  category: "technology",
  classification: "Software Development, Cybersecurity, Portfolio",
  referrer: "strict-origin-when-cross-origin",
  alternates: {
    canonical: SITE_URL,
    types: {
      "application/rss+xml": `${SITE_URL}/rss.xml`,
    },
    languages: {
      en: SITE_URL,
    },
  },
  openGraph: {
    title: DEFAULT_TITLE,
    description:
      "Software developer focused on cybersecurity, secure infrastructure, backend engineering, and production-grade web and mobile products.",
    url: SITE_URL,
    siteName: PROFILE.name,
    locale: "en_US",
    type: "profile",
    firstName: "Muhammad Asim",
    lastName: "Chattha",
    username: "chmuhammadasim",
    images: [
      {
        url: "/api/og?title=Muhammad+Asim+Chattha&subtitle=Software+Developer+%26+Cybersecurity+Engineer&tags=Security+Platforms,Go+%26+Node.js,Full-Stack",
        width: 1200,
        height: 630,
        alt: "Muhammad Asim Chattha — Software Developer & Cybersecurity Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description:
      "Software developer focused on cybersecurity, secure infrastructure, backend engineering, and full-stack products.",
    images: [
      "/api/og?title=Muhammad+Asim+Chattha&subtitle=Software+Developer+%26+Cybersecurity+Engineer&tags=Security+Platforms,Go+%26+Node.js,Full-Stack",
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
  ...(process.env.GOOGLE_VERIFICATION_CODE
    ? { verification: { google: process.env.GOOGLE_VERIFICATION_CODE } }
    : {}),
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  appleWebApp: {
    capable: true,
    title: "Asim Chattha",
    statusBarStyle: "black-translucent",
  },
  other: {
    "theme-color": "#04060d",
    "application-name": "Muhammad Asim Chattha",
    "msapplication-TileColor": "#04060d",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#04060d" },
    { media: "(prefers-color-scheme: light)", color: "#f3f7fd" },
  ],
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark light",
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
        <noscript>
          <style>{`.reveal{opacity:1 !important;transform:none !important;filter:none !important}`}</style>
        </noscript>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icon.svg" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Muhammad Asim Chattha — Tech Blog RSS"
          href="/rss.xml"
        />
        <link rel="author" href="/humans.txt" />
        <link rel="me" href={PROFILE.socials.github} />
        <link rel="me" href={PROFILE.socials.linkedin} />
        <link rel="preconnect" href="https://avatars.githubusercontent.com" />
        <link rel="dns-prefetch" href="https://api.github.com" />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-0WPM8S5RV5"
          strategy="lazyOnload"
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
      <body className={`${geistSans.variable} ${geistMono.variable} ${orbitron.variable} antialiased`}>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <ScrollProgress />
        <GlobalJsonLd />
        <div className="site-backdrop" aria-hidden="true">
          <div className="cyber-dots" />
          <div className="cyber-floor" />
          <div className="cyber-scanlines" />
        </div>
        <div className="grain" aria-hidden="true" />
        <div id="top" className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
