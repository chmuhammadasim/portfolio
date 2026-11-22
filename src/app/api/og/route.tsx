import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

/**
 * Branded 1200x630 social preview image in the site's cyber palette:
 * deep-space canvas, cyan/violet glow, HUD grid, orbital signal, title,
 * subtitle, and up to three tags.
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get("title") || "Muhammad Asim Chattha";
    const subtitle =
      searchParams.get("subtitle") || "Software Developer & Cybersecurity";
    const tags = searchParams.get("tags") || "";

    const tagList = tags.split(",").filter(Boolean).slice(0, 3);

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            backgroundColor: "#04060d",
            padding: "56px 72px",
            fontFamily:
              "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Grid */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "linear-gradient(rgba(80,160,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(80,160,255,0.07) 1px, transparent 1px)",
              backgroundSize: "46px 46px",
              display: "flex",
            }}
          />

          {/* Cyan glow */}
          <div
            style={{
              position: "absolute",
              top: -220,
              left: -180,
              width: 640,
              height: 640,
              borderRadius: 9999,
              background:
                "radial-gradient(circle, rgba(34, 211, 238, 0.2) 0%, rgba(34, 211, 238, 0.06) 42%, rgba(4, 6, 13, 0) 70%)",
              display: "flex",
            }}
          />
          {/* Violet glow */}
          <div
            style={{
              position: "absolute",
              bottom: -260,
              right: -160,
              width: 700,
              height: 700,
              borderRadius: 9999,
              background:
                "radial-gradient(circle, rgba(167, 139, 250, 0.2) 0%, rgba(167, 139, 250, 0.06) 42%, rgba(4, 6, 13, 0) 70%)",
              display: "flex",
            }}
          />

          {/* Orbital signal */}
          <div
            style={{
              position: "absolute",
              top: 120,
              right: 78,
              width: 330,
              height: 330,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                position: "absolute",
                width: 330,
                height: 330,
                borderRadius: 9999,
                border: "1px solid rgba(34, 211, 238, 0.24)",
                display: "flex",
              }}
            />
            <div
              style={{
                position: "absolute",
                width: 240,
                height: 240,
                borderRadius: 9999,
                border: "1px solid rgba(167, 139, 250, 0.32)",
                display: "flex",
              }}
            />
            <div
              style={{
                position: "absolute",
                width: 150,
                height: 150,
                borderRadius: 9999,
                border: "1px solid rgba(244, 114, 182, 0.24)",
                display: "flex",
              }}
            />
            <div
              style={{
                width: 68,
                height: 68,
                borderRadius: 9999,
                border: "1px solid rgba(34, 211, 238, 0.7)",
                background:
                  "radial-gradient(circle at 40% 35%, rgba(34,211,238,0.7), rgba(8,20,38,0.9) 70%)",
                display: "flex",
              }}
            />
          </div>

          {/* Top bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              position: "relative",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 8,
                  border: "1px solid rgba(34, 211, 238, 0.5)",
                  backgroundColor: "rgba(34, 211, 238, 0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#22d3ee",
                  fontSize: 19,
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                }}
              >
                AC
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <div style={{ color: "#e9f2ff", fontSize: 18, fontWeight: 600 }}>
                  Muhammad Asim Chattha
                </div>
                <div
                  style={{
                    color: "#6c7f99",
                    fontSize: 12,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                  }}
                >
                  Software / Security / Systems
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                color: "#6c7f99",
                fontSize: 15,
              }}
            >
              <div
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: 9999,
                  backgroundColor: "#22d3ee",
                  display: "flex",
                }}
              />
              chmuhammadasim.site
            </div>
          </div>

          {/* Content */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 14,
              position: "relative",
              maxWidth: 880,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                color: "#22d3ee",
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              <div
                style={{
                  width: 28,
                  height: 1,
                  background: "#22d3ee",
                  display: "flex",
                }}
              />
              Portfolio // Engineering
            </div>

            <div
              style={{
                color: "#e9f2ff",
                fontSize: title.length > 42 ? 42 : 54,
                fontWeight: 700,
                letterSpacing: "-0.03em",
                lineHeight: 1.08,
                maxWidth: 900,
              }}
            >
              {title}
            </div>

            <div
              style={{
                color: "#a3b5cc",
                fontSize: 22,
                lineHeight: 1.35,
                maxWidth: 760,
              }}
            >
              {subtitle}
            </div>

            {tagList.length > 0 && (
              <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
                {tagList.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      padding: "5px 14px",
                      borderRadius: 4,
                      border: "1px solid rgba(34, 211, 238, 0.24)",
                      backgroundColor: "rgba(34, 211, 238, 0.06)",
                      color: "#9fc8d8",
                      fontSize: 14,
                      display: "flex",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Bottom rule */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderTop: "1px solid rgba(120, 190, 255, 0.14)",
              paddingTop: 16,
              position: "relative",
            }}
          >
            <div
              style={{
                color: "#3d4e66",
                fontSize: 11,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              Security platforms · Backend systems · Full-stack products
            </div>
            <div
              style={{
                color: "#22d3ee",
                fontSize: 11,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              Islamabad, PK
            </div>
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
