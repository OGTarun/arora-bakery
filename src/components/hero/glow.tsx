"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";

import { cn } from "@/lib/utils";

interface GlowProps {
  x: MotionValue<number>;
  y: MotionValue<number>;
  className?: string;
}

/* Golden under-glow + glossy shine that tracks the cursor. */
export function Glow({ x, y, className }: GlowProps) {
  /* Lighting shifts with the cursor. */
  const glowX = useTransform(x, (v) => 50 + v * 34);
  const glowY = useTransform(y, (v) => 60 + v * 20);

  const background = useTransform(
    [glowX, glowY] as never,
    ([gx, gy]: number[]) =>
      `radial-gradient(circle at ${gx}% ${gy}%, rgb(232 183 101 / 0.28), transparent 68%)`
  );

  return (
    <motion.div
      style={{ background }}
      className={cn(
        "absolute top-1/2 left-1/2 h-[110%] w-[175%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px]",
        className
      )}
      aria-hidden="true"
    />
  );
}