"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

import { Fog } from "./fog";
import { Glow } from "./glow";
import { Particles } from "./particles";
import { cn } from "@/lib/utils";

interface FloatingCakeProps {
  className?: string;
}

const EASE = [0.22, 1, 0.36, 1] as const;

export function FloatingCake({ className }: FloatingCakeProps) {
  const wrapRef = useRef<HTMLDivElement>(null);

  /* Normalised cursor in [-1, 1] within the stage. */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 40, damping: 16, mass: 1.2 });
  const y = useSpring(my, { stiffness: 40, damping: 16, mass: 1.2 });

  /* Inertial translate — the cake lags behind the cursor. */
  const translateX = useTransform(x, (v) => v * 30);
  const translateY = useTransform(y, (v) => v * 22);

  /* 3D tilt based on cursor position. */
  const rotateX = useTransform(y, (v) => v * -16);
  const rotateY = useTransform(x, (v) => v * 18);

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
      className={cn(
        "relative flex items-start justify-center [perspective:1600px]",
        className
      )}
    >
      {/* Cinematic light rays behind the cake */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute top-0 left-[8%] h-full w-48 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent blur-2xl"
          style={{
            ["--ray-rot" as string]: "12deg",
            animation: "ray-sway 9s ease-in-out infinite",
          }}
        />
        <div
          className="absolute top-0 right-[10%] h-full w-40 bg-gradient-to-r from-transparent via-[#e8b765]/[0.1] to-transparent blur-2xl"
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

      {/* Ambient mist behind everything */}
      <Fog />

      {/* Golden under-glow tracking the cursor */}
      <Glow x={x} y={y} />

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
          className="relative [transform-style:preserve-3d]"
        >
          <motion.div
            animate={{ rotateY: [-14, 14, -14], rotateX: [6, -6, 6] }}
            transition={{ duration: 9, ease: "easeInOut", repeat: Infinity }}
            className="[transform-style:preserve-3d]"
          >
            <Image
              src="/cake.png"
              alt="Chocolate celebration cake"
              width={560}
              height={374}
              priority
              sizes="(min-width:1024px) 560px, (min-width:640px) 510px, 420px"
              className="h-[280px] w-[420px] object-contain drop-shadow-[0_45px_70px_rgba(0,0,0,0.55)] sm:h-[340px] sm:w-[510px] lg:h-[373px] lg:w-[560px]"
            />
          </motion.div>
        </motion.div>

        {/* Orbiting decorative particles */}
        <Particles />
      </motion.div>
    </div>
  );
}