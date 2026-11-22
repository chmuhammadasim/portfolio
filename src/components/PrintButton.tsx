"use client";

export default function PrintButton({
  className = "btn btn-secondary",
}: {
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className={className}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
        <rect x="6" y="14" width="12" height="8" rx="1" />
      </svg>
      Print / save as PDF
    </button>
  );
}
