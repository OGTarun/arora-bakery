"use client";

import { cn } from "@/lib/utils";

interface FogProps {
  className?: string;
}

const blobs = [
  { left: "-10%", top: "16%", w: "62%", h: "44%", dur: 18, delay: 0, c: "rgb(232 183 101 / 0.10)" },
  { left: "28%", top: "4%", w: "56%", h: "46%", dur: 24, delay: -6, c: "rgb(201 135 58 / 0.08)" },
  { left: "52%", top: "58%", w: "62%", h: "42%", dur: 21, delay: -12, c: "rgb(232 183 101 / 0.06)" },
];

/* Slow ambient mist drifting behind the cake. */
export function Fog({ className }: FogProps) {
  return (
    <div className={cn("pointer-events-none absolute inset-0", className)} aria-hidden="true">
      {blobs.map((b, i) => (
        <div
          key={i}
          className="absolute blur-[70px]"
          style={{
            left: b.left,
            top: b.top,
            width: b.w,
            height: b.h,
            background: `radial-gradient(ellipse at center, ${b.c}, transparent 70%)`,
            animation: `fog-drift ${b.dur}s ease-in-out ${b.delay}s infinite alternate`,
          }}
        />
      ))}
    </div>
  );
}