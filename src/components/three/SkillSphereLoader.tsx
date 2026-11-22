"use client";

import dynamic from "next/dynamic";

const LazySkillSphere = dynamic(() => import("./SkillSphere"), { ssr: false });

export default function SkillSphereLoader({
  className = "",
}: {
  className?: string;
}) {
  return <LazySkillSphere className={className} />;
}
