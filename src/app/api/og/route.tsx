import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

/**
 * Branded 1200x630 social preview image.
 * Minimal: dark canvas, name, subtitle, accent rule, domain.
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get("title") || "Muhammad Asim Chattha";
    const subtitle =
      searchParams.get("subtitle") || "Software Developer & Cybersecurity";
    const tags = searchParams.get("tags") || "";

    const tagList = tags
      .split(",")
      .filter(Boolean)
      .slice(0, 3);

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            backgroundColor: "#09090b",
            padding: "72px 80px",
            fontFamily:
              "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif",
            position: "relative",
          }}
        >
          {/* Subtle grid */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
              maskImage:
                "radial-gradient(ellipse 70% 60% at 20% 0%, black 30%, transparent 75%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 70% 60% at 20% 0%, black 30%, transparent 75%)",
            }}
          />

          {/* Accent glow */}
          <div
            style={{
              position: "absolute",
              top: -120,
              left: -120,
              width: 420,
              height: 420,
              borderRadius: 9999,
              background: "rgba(99, 102, 241, 0.12)",
              filter: "blur(90px)",
            }}
          />

          {/* Monogram */}
          <div
            style={{
              position: "absolute",
              top: 64,
              left: 80,
              width: 48,
              height: 48,
              borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fafafa",
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            A
          </div>

          {/* Domain */}
          <div
            style={{
              position: "absolute",
              top: 76,
              right: 80,
              display: "flex",
              alignItems: "center",
              gap: 10,
              color: "#71717a",
              fontSize: 18,
            }}
          >
            chmuhammadasim.site
          </div>

          {/* Content */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                color: "#6366f1",
                fontSize: 16,
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
              }}
            >
              <div style={{ width: 22, height: 2, background: "#6366f1" }} />
              Portfolio
            </div>
            <div
              style={{
                color: "#fafafa",
                fontSize: title.length > 40 ? 44 : 52,
                fontWeight: 700,
                letterSpacing: "-0.02em",
                lineHeight: 1.15,
                maxWidth: 1000,
              }}
            >
              {title}
            </div>
            <div style={{ color: "#a1a1aa", fontSize: 24 }}>{subtitle}</div>

            {tagList.length > 0 && (
              <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
                {tagList.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      padding: "5px 14px",
                      borderRadius: 9999,
                      border: "1px solid rgba(255,255,255,0.12)",
                      color: "#a1a1aa",
                      fontSize: 15,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch {
    return new Response("Failed to generate OG image", { status: 500 });
  }
}
