import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get("title") || "Muhammad Asim Chattha";
    const subtitle = searchParams.get("subtitle") || "Software Developer & Cybersecurity";
    const tags = searchParams.get("tags") || "";

    const tagList = tags
      .split(",")
      .filter(Boolean)
      .slice(0, 4);

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            backgroundColor: "#0a0a0f",
            padding: "80px",
            fontFamily: "monospace",
            position: "relative",
          }}
        >
          {/* Background effects */}
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: "400px",
              height: "400px",
              background: "radial-gradient(circle, rgba(0,212,255,0.1) 0%, transparent 70%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "400px",
              height: "400px",
              background: "radial-gradient(circle, rgba(0,255,65,0.08) 0%, transparent 70%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "60px",
              right: "80px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "#00ff41",
              fontSize: "20px",
            }}
          >
            <span style={{ color: "#00d4ff" }}>&gt;</span> asim@portfolio
            <span style={{ opacity: 0.6 }}>_</span>
          </div>

          {/* Bottom scanline */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "4px",
              background: "linear-gradient(90deg, #00ff41, #00d4ff, #b44dff)",
            }}
          />

          {/* Content */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "1000px" }}>
            <div
              style={{
                color: "#00ff41",
                fontSize: "24px",
                fontWeight: "bold",
              }}
            >
              $ cat /etc/title.txt
            </div>
            <div
              style={{
                color: "#e0e0e0",
                fontSize: title.length > 60 ? "42px" : "52px",
                fontWeight: "bold",
                lineHeight: 1.2,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {title}
            </div>
            <div
              style={{
                color: "#888",
                fontSize: "24px",
                marginTop: "8px",
              }}
            >
              {subtitle}
            </div>

            {/* Tags */}
            {tagList.length > 0 && (
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  marginTop: "16px",
                  flexWrap: "wrap",
                }}
              >
                {tagList.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      padding: "6px 16px",
                      backgroundColor: "rgba(0,255,65,0.1)",
                      border: "1px solid rgba(0,255,65,0.2)",
                      borderRadius: "8px",
                      color: "#00ff41",
                      fontSize: "18px",
                    }}
                  >
                    #{tag}
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
