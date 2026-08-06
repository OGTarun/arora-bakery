"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

import { ChocolateCake } from "./chocolate-cake";
import { cn } from "@/lib/utils";

interface FloatingCakeProps {
  className?: string;
}

const EASE = [0.22, 1, 0.36, 1] as const;

/* Orbiting / drifting particles — slow, desynced, elegant. */
const orbit = [
  { size: "h-3 w-3", pos: "top-[12%] left-[8%]", dur: 7, gold: true, idx: 0 },
  { size: "h-2 w-2", pos: "top-[30%] right-[6%]", dur: 9, gold: false, idx: 1 },
  { size: "h-2.5 w-2.5", pos: "bottom-[22%] left-[14%]", dur: 8, gold: false, idx: 2 },
  { size: "h-1.5 w-1.5", pos: "bottom-[10%] right-[18%]", dur: 6, gold: true, idx: 3 },
  { size: "h-2 w-2", pos: "top-[58%] right-[30%]", dur: 10, gold: true, idx: 4 },
  { size: "h-1 w-1", pos: "top-[16%] right-[40%]", dur: 7.5, gold: false, idx: 5 },
];

export function FloatingCake({ className }: FloatingCakeProps) {
  const wrapRef = useRef<HTMLDivElement>(null);

  /* Normalised cursor in [-1, 1] within the stage. */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 40, damping: 16, mass: 1.2 });
  const y = useSpring(my, { stiffness: 40, damping: 16, mass: 1.2 });

  /* Inertial translate — the cake lags behind the cursor. */
  const translateX = useTransform(x, (v) => v * 26);
  const translateY = useTransform(y, (v) => v * 18);

  /* Slight 3D tilt based on cursor position. */
  const rotateX = useTransform(y, (v) => v * -7);
  const rotateY = useTransform(x, (v) => v * 9);

  /* Lighting shifts with the cursor. */
  const glowX = useTransform(x, (v) => 50 + v * 34);
  const glowY = useTransform(y, (v) => 60 + v * 20);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
    my.set(((e.clientY - rect.top) / rect.height) * 2 - 1);
  };

  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <div
      ref={wrapRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn("relative flex items-center justify-center", className)}
    >
      {/* Cinematic light rays */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute top-0 left-[10%] h-full w-40 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent blur-2xl"
          style={{
            ["--ray-rot" as string]: "12deg",
            animation: "ray-sway 9s ease-in-out infinite",
          }}
        />
        <div
          className="absolute top-0 right-[12%] h-full w-32 bg-gradient-to-r from-transparent via-[#e8b765]/[0.07] to-transparent blur-2xl"
          style={{
            ["--ray-rot" as string]: "-6deg",
            animation: "ray-sway 11s ease-in-out infinite reverse",
          }}
        />
      </div>

      {/* Floating dust / bokeh */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {Array.from({ length: 10 }).map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white/30 backdrop-blur-sm"
            style={{
              width: 3 + (i % 3) * 2,
              height: 3 + (i % 3) * 2,
              left: `${5 + ((i * 17) % 90)}%`,
              top: `${8 + ((i * 29) % 84)}%`,
              opacity: 0.25 + (i % 4) * 0.12,
              animation: `dust-float ${6 + (i % 5)}s ease-in-out ${
                i * 0.6
              }s infinite alternate`,
            }}
          />
        ))}
      </div>

      {/* Golden under-glow */}
      <motion.div
        style={{
          background: useTransform(
            [glowX, glowY] as never,
            ([gx, gy]: number[]) =>
              `radial-gradient(circle at ${gx}% ${gy}%, rgb(232 183 101 / 0.4), transparent 60%)`
          ),
        }}
        className="absolute bottom-4 left-1/2 h-40 w-[70%] -translate-x-1/2 rounded-full blur-3xl"
        aria-hidden="true"
      />

      {/* The cake */}
      <motion.div
        style={{ x: translateX, y: translateY, rotateX, rotateY }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: EASE, delay: 0.35 }}
        className="relative z-10 will-change-transform [transform-style:preserve-3d]"
      >
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 5.5, ease: "easeInOut", repeat: Infinity }}
          className="relative"
        >
          <ChocolateCake className="h-[300px] w-[262px] drop-shadow-[0_40px_60px_rgba(0,0,0,0.5)] sm:h-[400px] sm:w-[350px] lg:h-[460px] lg:w-[402px]" />
        </motion.div>

        {/* Orbiting decorative particles */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          {orbit.map((p) => (
            <motion.span
              key={p.idx}
              className={cn("absolute rounded-full", p.pos, p.size, p.gold ? "bg-[#ecc27e]" : "bg-[#4a2c1a]")}
              animate={{ y: [0, -14, 0], x: [0, 6, 0], opacity: [0.5, 1, 0.5], scale: [0.9, 1.1, 0.9] }}
              transition={{ duration: p.dur, ease: "easeInOut", repeat: Infinity, delay: p.idx * 0.6 }}
              style={{ boxShadow: "0 0 8px rgba(232,183,117,0.4)" }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}