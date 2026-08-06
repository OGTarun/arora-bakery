"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface Particle {
  size: string;
  pos: string;
  dur: number;
  gold: boolean;
  idx: number;
}

/* Orbiting / drifting particles — slow, desynced, elegant. Brown shards and gold flakes. */
const orbit: Particle[] = [
  { size: "h-3 w-3", pos: "top-[12%] left-[8%]", dur: 7, gold: true, idx: 0 },
  { size: "h-2 w-2", pos: "top-[30%] right-[6%]", dur: 9, gold: false, idx: 1 },
  { size: "h-2.5 w-2.5", pos: "bottom-[22%] left-[14%]", dur: 8, gold: false, idx: 2 },
  { size: "h-1.5 w-1.5", pos: "bottom-[10%] right-[18%]", dur: 6, gold: true, idx: 3 },
  { size: "h-2 w-2", pos: "top-[58%] right-[30%]", dur: 10, gold: true, idx: 4 },
  { size: "h-1 w-1", pos: "top-[16%] right-[40%]", dur: 7.5, gold: false, idx: 5 },
  { size: "h-2.5 w-2.5", pos: "top-[8%] right-[24%]", dur: 11, gold: false, idx: 6 },
  { size: "h-1.5 w-1.5", pos: "bottom-[30%] right-[8%]", dur: 8.5, gold: false, idx: 7 },
  { size: "h-2 w-2", pos: "top-[46%] left-[22%]", dur: 9.5, gold: false, idx: 8 },
  { size: "h-1 w-1", pos: "top-[70%] left-[6%]", dur: 6.5, gold: false, idx: 9 },
  { size: "h-3 w-3", pos: "bottom-[6%] left-[26%]", dur: 10.5, gold: false, idx: 10 },
  { size: "h-1.5 w-1.5", pos: "top-[24%] left-[34%]", dur: 8, gold: false, idx: 11 },
  { size: "h-2 w-2", pos: "top-[4%] left-[48%]", dur: 7, gold: true, idx: 12 },
  { size: "h-1.5 w-1.5", pos: "bottom-[44%] right-[38%]", dur: 9, gold: false, idx: 13 },
  { size: "h-2.5 w-2.5", pos: "top-[62%] left-[38%]", dur: 11.5, gold: false, idx: 14 },
  { size: "h-1 w-1", pos: "bottom-[18%] right-[44%]", dur: 7.5, gold: false, idx: 15 },
];

export function Particles() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      {orbit.map((p) => (
        <motion.span
          key={p.idx}
          className={cn(
            "absolute rounded-full",
            p.pos,
            p.size,
            p.gold
              ? "bg-[#ecc27e]"
              : "bg-[#8a5a3b]"
          )}
          animate={{
            y: [0, -14, 0],
            x: [0, 6, 0],
            opacity: [0.5, 1, 0.5],
            scale: [0.9, 1.1, 0.9],
          }}
          transition={{
            duration: p.dur,
            ease: "easeInOut",
            repeat: Infinity,
            delay: p.idx * 0.6,
          }}
          style={{ boxShadow: "0 0 8px rgba(232,183,117,0.4)" }}
        />
      ))}
    </div>
  );
}