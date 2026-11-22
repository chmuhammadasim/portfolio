import type { NextConfig } from "next";

// React 19's development runtime uses `eval` (for error/source-map handling),
// so `next dev` requires 'unsafe-eval' in the CSP. Production builds do not
// use eval, so the strict policy stays in place there.
const isDev = process.env.NODE_ENV === "development";
const scriptSrc = isDev
  ? "'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com"
  : "'self' 'unsafe-inline' https://www.googletagmanager.com";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,

  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "github.com",
      },
    ],
  },

  async redirects() {
    return [
      { source: "/cv", destination: "/resume", permanent: true },
      { source: "/work", destination: "/projects", permanent: true },
      { source: "/about", destination: "/experience", permanent: true },
      { source: "/favicon.ico", destination: "/icon.svg", permanent: false },
      {
        source: "/Asim_SE_CV.pdf",
        destination: "/Muhammad_Asim_Chattha_Resume.pdf",
        permanent: true,
      },
    ];
  },

  // SEO, security & performance headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-Permitted-Cross-Domain-Policies",
            value: "none",
          },
          {
            key: "Content-Security-Policy",
            // Inline theme script + JSON-LD require 'unsafe-inline'; the dev
            // server additionally needs 'unsafe-eval' for React's dev runtime.
            value: `default-src 'self'; script-src ${scriptSrc}; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://avatars.githubusercontent.com https://github.com https://www.google-analytics.com https://www.googletagmanager.com; font-src 'self' data:; connect-src 'self' https://api.github.com https://www.google-analytics.com https://region1.google-analytics.com https://www.googletagmanager.com; frame-src 'none'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'`,
          },
        ],
      },
      // Cache static assets aggressively
      {
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // Cache public assets
      {
        source: "/(.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|woff2|woff|ttf|pdf))",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=2592000, must-revalidate",
          },
        ],
      },
      // Plain-text discovery files
      {
        source: "/(llms\\.txt|humans\\.txt|robots\\.txt)",
        headers: [
          {
            key: "Content-Type",
            value: "text/plain; charset=utf-8",
          },
        ],
      },
      // Keep the old CV out of the index if its redirect is ever bypassed.
      {
        source: "/Asim_SE_CV.pdf",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
