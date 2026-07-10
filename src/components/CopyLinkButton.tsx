"use client";
import { useState } from "react";

export default function CopyLinkButton({ slug }: { slug: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        `https://chmuhammadasim.site/blogs/${slug}`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="text-sm font-mono text-gray-500 hover:text-[#00ff41] transition-colors"
      title="Copy link to clipboard"
    >
      {copied ? "✅ Copied!" : "🔗 Copy Link"}
    </button>
  );
}
