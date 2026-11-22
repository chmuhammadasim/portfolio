import * as THREE from "three";

/**
 * Builds a crisp HUD label texture for 3D sprites: a dark glass plate,
 * accent rule, status dot, and monospaced text. Browser-only.
 */
export function makeLabelTexture(
  text: string,
  accent = "#22d3ee"
): THREE.CanvasTexture {
  const width = 512;
  const height = 128;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  const texture = new THREE.CanvasTexture(canvas);

  if (!ctx) return texture;

  ctx.clearRect(0, 0, width, height);

  // Glass plate
  const x = 10;
  const y = 24;
  const w = width - 20;
  const h = 80;
  const r = 10;
  ctx.beginPath();
  if (typeof ctx.roundRect === "function") {
    ctx.roundRect(x, y, w, h, r);
  } else {
    ctx.rect(x, y, w, h);
  }
  ctx.fillStyle = "rgba(4, 10, 20, 0.76)";
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = accent;
  ctx.globalAlpha = 0.6;
  ctx.stroke();
  ctx.globalAlpha = 1;

  // Accent rule + dot
  ctx.fillStyle = accent;
  ctx.beginPath();
  ctx.arc(x + 26, y + h / 2, 6, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillRect(x + 42, y + h / 2 - 1, 26, 2);

  // Label
  ctx.font =
    "600 38px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#e6f7ff";
  ctx.fillText(text, x + 82, y + h / 2 + 2);

  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.needsUpdate = true;
  return texture;
}
