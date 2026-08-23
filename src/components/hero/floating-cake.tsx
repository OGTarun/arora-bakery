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
  const x = useSpring(mx, { stiffness: 34, damping: 24, mass: 1.6 });
  const y = useSpring(my, { stiffness: 34, damping: 24, mass: 1.6 });

  /* Inertial translate — the cake glides, heavily smoothed. */
  const translateX = useTransform(x, (v) => v * 16);
  const translateY = useTransform(y, (v) => v * 12);

  /* Gentle 3D tilt from the cursor — subtle so it never over-rotates. */
  const rotateX = useTransform(y, (v) => v * -7);
  const rotateY = useTransform(x, (v) => v * 9);

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
          animate={{ y: [0, -18, 0] }}
          transition={{ duration: 6.5, ease: "easeInOut", repeat: Infinity }}
          className="relative [transform-style:preserve-3d]"
        >
          {/* Permanent, slow 3D oscillation — the cake is never flat,
              even when the cursor is still or making big moves. */}
          <motion.div
            animate={{ rotateY: [-17, 17, -17], rotateX: [-9, 9, -9], rotateZ: [2, -2, 2] }}
            transition={{ duration: 12, ease: "easeInOut", repeat: Infinity }}
            className="[transform-style:preserve-3d]"
          >
            <Image
              src="/cake.png"
              alt="Chocolate celebration cake"
              width={972}
              height={760}
              priority
              sizes="(min-width:1024px) 345px, (min-width:640px) 300px, 210px"
              className="h-[140px] w-auto object-contain drop-shadow-[0_45px_70px_rgba(0,0,0,0.55)] sm:h-[200px] lg:h-[230px]"
            />
          </motion.div>
        </motion.div>

        {/* Soft ground shadow that breathes with the float */}
        <motion.div
          className="absolute -bottom-10 left-1/2 h-8 w-[82%] -translate-x-1/2 rounded-full bg-black/45 blur-xl"
          animate={{ scaleX: [1, 0.72, 1], opacity: [0.5, 0.28, 0.5] }}
          transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
          aria-hidden="true"
        />

        {/* Orbiting particles wrapping around the cake */}
        <Particles x={x} y={y} />
      </motion.div>
    </div>
  );
}