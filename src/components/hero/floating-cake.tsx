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

  /* Cupcake — subtler parallax so it reads as a separate floating layer. */
  const cupcakeX = useTransform(x, (v) => v * 22);
  const cupcakeY = useTransform(y, (v) => v * 15);
  const cupcakeRotX = useTransform(y, (v) => v * -14);
  const cupcakeRotY = useTransform(x, (v) => v * 16);

  /* Four cupcakes — small garnish tucked around the cake, mostly behind it. */
  const cupcakes = [
    {
      id: 1,
      pos: "right-[2%] top-[6%]",
      size: "h-12 w-auto lg:h-16",
      z: "z-0",
      visibility: "block",
      dur: 5,
      rock: 16,
      rot: 8,
      phase: 0,
      delay: 0.7,
    },
    {
      id: 2,
      pos: "left-[4%] top-[2%]",
      size: "h-12 w-auto lg:h-16",
      z: "z-0",
      visibility: "hidden sm:block",
      dur: 6.4,
      rock: 18,
      rot: 9,
      phase: 1.4,
      delay: 1,
    },
    {
      id: 3,
      pos: "right-[0%] bottom-[2%]",
      size: "h-14 w-auto lg:h-20",
      z: "z-20",
      visibility: "hidden md:block",
      dur: 7,
      rock: 13,
      rot: 10,
      phase: 2.4,
      delay: 1.2,
    },
    {
      id: 4,
      pos: "left-[2%] bottom-[6%]",
      size: "h-14 w-auto lg:h-20",
      z: "z-20",
      visibility: "hidden lg:block",
      dur: 5.8,
      rock: 15,
      rot: 7,
      phase: 3.1,
      delay: 1.4,
    },
  ];

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
              width={714}
              height={816}
              priority
              sizes="(min-width:1024px) 714px, (min-width:640px) 560px, 360px"
              className="h-[384px] w-[336px] object-contain drop-shadow-[0_65px_90px_rgba(0,0,0,0.6)] sm:h-[624px] sm:w-[546px] lg:h-[816px] lg:w-[714px]"
            />
          </motion.div>
        </motion.div>

        {/* Orbiting decorative particles */}
        <Particles />
      </motion.div>

      {/* Four cupcakes — small, asymmetric, floating around the cake */}
      {cupcakes.map((c) => (
        <motion.div
          key={c.id}
          style={{
            x: cupcakeX,
            y: cupcakeY,
            rotateX: cupcakeRotX,
            rotateY: cupcakeRotY,
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: EASE, delay: c.delay }}
          className={`pointer-events-none absolute ${c.pos} ${c.z} ${c.visibility}`}
        >
          <motion.div
            animate={{ y: [0, -16, 0] }}
            transition={{
              duration: c.dur,
              ease: "easeInOut",
              repeat: Infinity,
              delay: c.phase,
            }}
            className="[transform-style:preserve-3d]"
          >
            <motion.div
              animate={{
                rotateY: [-c.rock, c.rock, -c.rock],
                rotateX: [c.rock * 0.5, -c.rock * 0.5, c.rock * 0.5],
              }}
              transition={{ duration: c.rot, ease: "easeInOut", repeat: Infinity }}
              className="[transform-style:preserve-3d]"
            >
              <Image
                src="/cupcake.png"
                alt="Frosted cupcake"
                width={300}
                height={200}
                className={`${c.size} object-contain drop-shadow-[0_25px_40px_rgba(0,0,0,0.5)]`}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}