"use client";

import { motion } from "framer-motion";
import { Candy } from "lucide-react";

/* Colorful candies scattered across the hero. */
const candies = [
  { pos: "left-[8%] top-[16%]", color: "#ff8fab", size: "h-6 w-6", dur: 5, delay: 0 },
  { pos: "right-[12%] top-[8%]", color: "#7ee3a8", size: "h-7 w-7", dur: 6, delay: 1 },
  { pos: "left-[22%] bottom-[10%]", color: "#ffd166", size: "h-6 w-6", dur: 5.5, delay: 0.5 },
  { pos: "right-[4%] top-[42%]", color: "#b38ef2", size: "h-5 w-5", dur: 6.5, delay: 1.5 },
  { pos: "left-[42%] top-[6%]", color: "#9fd3ff", size: "h-5 w-5", dur: 5, delay: 2 },
  { pos: "right-[30%] bottom-[6%]", color: "#ff9fb2", size: "h-6 w-6", dur: 6, delay: 0.8 },
  { pos: "left-[55%] top-[38%]", color: "#f6b8ff", size: "h-5 w-5", dur: 6.2, delay: 1.2 },
  { pos: "right-[20%] top-[70%]", color: "#ffe18a", size: "h-6 w-6", dur: 5.8, delay: 2.4 },
  { pos: "left-[70%] bottom-[20%]", color: "#96f0c8", size: "h-6 w-6", dur: 6.4, delay: 0.3 },
];

export function Candies() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {candies.map((c, i) => (
        <motion.span
          key={i}
          className={`absolute ${c.pos} ${c.size}`}
          style={{
            color: c.color,
            filter: "drop-shadow(0 0 6px rgba(255,255,255,0.3))",
          }}
          animate={{ y: [0, -14, 0], rotate: [0, 14, 0], scale: [0.9, 1.08, 0.9] }}
          transition={{
            duration: c.dur,
            ease: "easeInOut",
            repeat: Infinity,
            delay: c.delay,
          }}
        >
          <Candy className="h-full w-full" strokeWidth={1.5} />
        </motion.span>
      ))}
    </div>
  );
}