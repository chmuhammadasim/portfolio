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
  title: "ProtFolio | Muhammad Asim Chattha",
  description: "ProtFolio is the personal portfolio of Muhammad Asim Chattha, showcasing projects, skills, and experience in web development.",
  applicationName: "ProtFolio",
  generator: "Next.js",
  metadataBase: new URL("https://chmuhammadasim.site"),
  themeColor: "#ffffff",
  colorScheme: "light dark",
  manifest: "/manifest.json",
  keywords: [
    "Muhammad Asim Chattha",
    "ProtFolio",
    "Portfolio",
    "Web Developer",
    "Frontend Developer",
    "React",
    "Next.js",
    "JavaScript",
    "TypeScript",
    "Projects",
    "Programming",
    "Web Design",
    "Software Engineer",
    "Web Development",
    "Personal Website",
    "Tech Portfolio",
    "Developer Portfolio",
    "Full Stack Developer",
    "UI/UX Design",
    "Coding Portfolio",
    "Software Development",
    "Web Applications",
    "Open Source",
    "GitHub",
    "Tech Enthusiast",
    "Web Technologies",
    "Portfolio Website",
    "Professional Portfolio",
    "Web Projects",
    "Creative Portfolio",
    "Digital Portfolio",
  ],
  authors: [{ name: "Muhammad Asim Chattha" }],
  creator: "Muhammad Asim Chattha",
  openGraph: {
    title: "ProtFolio | Muhammad Asim Chattha",
    description: "Explore the portfolio of Muhammad Asim Chattha, a passionate web developer.",
    url: "https://chmuhammadasim.site",
    siteName: "ProtFolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    title: "ProtFolio | Muhammad Asim Chattha",
    description: "Explore the portfolio of Muhammad Asim Chattha, a passionate web developer.",
  
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#ffffff" />
        <link rel="canonical" href="https://chmuhammadasim.site" />
        <link rel="icon" href="/favicon.ico" />
        
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
