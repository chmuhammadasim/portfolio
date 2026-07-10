import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Page Not Found | Muhammad Asim Chattha",
  description: "The page you're looking for doesn't exist.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-gray-200 font-sans antialiased flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        {/* Terminal-style 404 */}
        <div className="mb-8 bg-[#0d1117] border border-gray-700/50 rounded-xl overflow-hidden shadow-2xl neon-glow-green inline-block">
          <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-900/80 border-b border-gray-700/50">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="ml-2 text-xs font-mono text-gray-500">terminal — error</span>
          </div>
          <div className="p-6 text-left font-mono">
            <p>
              <span className="text-[#00ff41]">$</span>{" "}
              <span className="text-gray-300">curl https://chmuhammadasim.site/page</span>
            </p>
            <p className="text-red-400 ml-4 mt-1 font-bold text-lg">
              HTTP/1.1 404 Not Found
            </p>
            <p className="text-gray-500 ml-4">
              Error: The requested resource was not found on this server.
            </p>
            <p className="mt-4">
              <span className="text-[#00ff41]">$</span>{" "}
              <span className="text-gray-300">
                echo &quot;Let&apos;s get you back on track.&quot;
              </span>
            </p>
            <p className="text-emerald-400 ml-4">
              Let&apos;s get you back on track.
            </p>
          </div>
        </div>

        {/* Navigation help */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-cyan-600 rounded-xl font-mono font-semibold text-white hover:shadow-[0_0_30px_rgba(0,255,65,0.3)] transition-all duration-300 border border-emerald-400/30"
          >
            $ cd ~/home
          </Link>
          <Link
            href="/blogs"
            className="px-6 py-3 border border-[#00d4ff]/40 rounded-xl font-mono font-semibold text-[#00d4ff] hover:bg-[#00d4ff]/10 hover:shadow-[0_0_30px_rgba(0,212,255,0.2)] transition-all duration-300"
          >
            $ cat /var/log/blogs
          </Link>
        </div>
      </div>
    </div>
  );
}
