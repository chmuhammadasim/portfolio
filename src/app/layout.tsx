import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
    default: "Muhammad Asim Chattha — Software Dev & Cybersecurity Portfolio",
    template: "%s | Muhammad Asim Chattha",
  },
  description:
    "Portfolio of Muhammad Asim Chattha — Full Stack Developer, Cybersecurity Enthusiast, AI/ML Explorer, and OS Kernel Hacker. Showcasing projects, technical blogs, and expertise in penetration testing, malware analysis, and low-level systems.",
  applicationName: "ProtFolio",
  generator: "Next.js",
  metadataBase: new URL("https://chmuhammadasim.site"),
  keywords: [
    "Muhammad Asim Chattha",
    "Software Developer",
    "Cybersecurity",
    "Portfolio",
    "Full Stack Developer",
    "AI",
    "Machine Learning",
    "Operating Systems",
    "Kernel Development",
    "React",
    "Next.js",
    "TypeScript",
    "Blockchain",
    "Penetration Testing",
    "Malware Analysis",
    "Tech Blog",
    "Atrios DNS Security",
    "GenesisVPN",
    "Atrios IPAM",
    "OmniPriv PAM",
    "Astro Dome",
    "TheraLearn",
    "Dappcord",
    "MERN Stack",
    "Node.js",
    "Express",
    "MongoDB",
    "Docker",
    "Solidity",
    "Rust",
  ],
  authors: [{ name: "Muhammad Asim Chattha", url: "https://chmuhammadasim.site" }],
  creator: "Muhammad Asim Chattha",
  publisher: "Muhammad Asim Chattha",
  openGraph: {
    title: "Muhammad Asim Chattha — Software Dev & Cybersecurity",
    description:
      "Explore the portfolio of Muhammad Asim Chattha — software developer, cybersecurity researcher, and tech blogger specializing in AI, OS internals, and secure systems.",
    url: "https://chmuhammadasim.site",
    siteName: "ProtFolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/api/og?title=Muhammad+Asim+Chattha&subtitle=Software+Developer+%26+Cybersecurity&tags=Cybersecurity,AI,OS+Development",
        width: 1200,
        height: 630,
        alt: "Muhammad Asim Chattha — Software Dev & Cybersecurity Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Asim Chattha — Software Dev & Cybersecurity",
    description:
      "Explore the portfolio of Muhammad Asim Chattha — software developer, cybersecurity researcher, and tech blogger.",
    images: [
      "/api/og?title=Muhammad+Asim+Chattha&subtitle=Software+Developer+%26+Cybersecurity&tags=Cybersecurity,AI,OS+Development",
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
  alternates: {
    canonical: "https://chmuhammadasim.site",
    types: {
      "application/rss+xml": "https://chmuhammadasim.site/rss.xml",
    },
  },
  verification: {
    google: process.env.GOOGLE_VERIFICATION_CODE || "YOUR_GOOGLE_VERIFICATION_CODE",
  },
  category: "technology",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta name="theme-color" content="#0a0a0f" />
        <meta name="color-scheme" content="dark" />
        <link rel="canonical" href="https://chmuhammadasim.site" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Muhammad Asim Chattha — Tech Blog RSS"
          href="/rss.xml"
        />
        {/* Preconnect to external origins for performance */}
        <link rel="preconnect" href="https://avatars.githubusercontent.com" />
        <link rel="preconnect" href="https://api.github.com" />
        {/* JSON-LD Structured Data — Person */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Muhammad Asim Chattha",
              alternateName: "Asim",
              url: "https://chmuhammadasim.site",
              image: "https://avatars.githubusercontent.com/chmuhammadasim",
              description:
                "Full Stack Developer and Cybersecurity Enthusiast specializing in penetration testing, AI/ML, operating systems, and blockchain development.",
              sameAs: [
                "https://github.com/chmuhammadasim",
                "https://linkedin.com/in/muhammad-asim-chattha",
                "https://twitter.com/chmuhammadasim",
              ],
              jobTitle: "Software Developer & Cybersecurity Researcher",
              knowsAbout: [
                "Cybersecurity",
                "Penetration Testing",
                "Malware Analysis",
                "Artificial Intelligence",
                "Machine Learning",
                "Operating Systems",
                "Kernel Development",
                "Blockchain",
                "Full Stack Development",
                "DevOps",
              ],
            }),
          }}
        />
        {/* JSON-LD Structured Data — WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Muhammad Asim Chattha — Portfolio",
              url: "https://chmuhammadasim.site",
              description:
                "Personal portfolio and tech blog of Muhammad Asim Chattha — software developer, cybersecurity researcher, and AI/OS enthusiast.",
              author: {
                "@type": "Person",
                name: "Muhammad Asim Chattha",
              },
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate:
                    "https://chmuhammadasim.site/blogs?search={search_term_string}",
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0a0a0f] text-gray-200`}
      >
        {children}
      </body>
    </html>
  );
}
