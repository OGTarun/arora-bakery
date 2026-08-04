"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Candy, Cookie, Croissant, Sparkles } from "lucide-react";

import { FloatingObject } from "@/components/hero/floating-object";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Reusable motion variants — slow, breathable, desynced by index     */
/* ------------------------------------------------------------------ */

const DRIFT: Variants = {
  float: (i = 0) => ({
    y: [0, -14 - (i % 4) * 3, 0],
    rotate: [0, i % 2 === 0 ? 2.5 : -2.5, 0],
    scale: [1, 1 + 0.012 * (i % 3), 1],
    transition: {
      duration: 6.5 + i,
      ease: "easeInOut",
      repeat: Infinity,
      delay: i * 0.4,
    },
  }),
};

const CLOUD_DRIFT: Variants = {
  float: (i = 0) => ({
    x: [0, i % 2 === 0 ? 28 : -28, 0],
    y: [0, -10, 0],
    transition: {
      duration: 16 + i * 3,
      ease: "easeInOut",
      repeat: Infinity,
      delay: i * 1.6,
    },
  }),
};

const TWINKLE: Variants = {
  twinkle: (i = 0) => ({
    opacity: [0.15, 0.9, 0.15],
    scale: [0.7, 1.1, 0.7],
    transition: {
      duration: 3.2 + i,
      ease: "easeInOut",
      repeat: Infinity,
      delay: i * 0.7,
    },
  }),
};

/* ------------------------------------------------------------------ */
/*  Data — supporting bakery items (midground)                         */
/* ------------------------------------------------------------------ */

const midground = [
  {
    icon: Cookie,
    label: "Cookies",
    sublabel: "Melting chips",
    position: "top-6 left-0",
    index: 1,
  },
  {
    icon: Croissant,
    label: "Croissants",
    sublabel: "Flaky & golden",
    position: "top-16 right-0 sm:top-12",
    index: 2,
  },
  {
    icon: Candy,
    label: "Macarons",
    sublabel: "Delicate shells",
    position: "bottom-8 right-6 hidden sm:block",
    index: 3,
  },
];

const clouds = [
  { className: "top-8 -left-10 h-24 w-32 bg-white/70", index: 0 },
  { className: "bottom-16 -right-8 h-28 w-40 bg-secondary/80", index: 1 },
  { className: "top-1/3 -right-16 h-16 w-24 bg-white/60", index: 2 },
];

const crumbs = [
  { className: "top-24 left-1/4 h-1.5 w-1.5 bg-primary/50", index: 0 },
  { className: "top-14 right-1/4 h-1 w-1 bg-accent/70", index: 1 },
  { className: "bottom-24 right-1/3 h-2 w-2 bg-primary/40", index: 2 },
  { className: "bottom-12 left-10 h-1 w-1 bg-accent/60", index: 3 },
];

const particles = [
  { className: "top-28 right-8 h-1 w-1 bg-primary/40", index: 0 },
  { className: "top-1/2 left-6 h-1.5 w-1.5 bg-accent/50", index: 1 },
  { className: "bottom-32 left-1/3 h-1 w-1 bg-primary/35", index: 2 },
  { className: "top-10 left-1/2 h-1 w-1 bg-secondary-foreground/25", index: 3 },
];

/* ------------------------------------------------------------------ */
/*  Bespoke focal cupcake (foreground)                                 */
/* ------------------------------------------------------------------ */

function Cupcake() {
  return (
    <svg viewBox="0 0 96 96" className="h-full w-full" aria-hidden="true">
      {/* Liner */}
      <path
        d="M29 44h38l-5.5 19a13.5 13.5 0 0 1-27 0Z"
        fill="#fff8f2"
        stroke="#ead9c5"
        strokeWidth="1.5"
      />
      <g stroke="#ead9c5" strokeWidth="1.5">
        <path d="M34 44l-1.8 18.5" />
        <path d="M41 44l-1.8 19" />
        <path d="M48 44l-1.6 19.6" />
        <path d="M55 44l1.8 19" />
        <path d="M62 44l1.8 18.5" />
      </g>
      {/* Frosting */}
      <path
        d="M48 42c-17 0-25-9.5-25-19 0-7.5 4.8-13.4 11.4-13.4.9-7.8 7.4-12.6 13.6-12.6s12.7 4.8 13.6 12.6c6.6 0 11.4 5.9 11.4 13.4 0 9.5-8 19-25 19Z"
        fill="#f7e3cf"
      />
      {/* Swirl accents */}
      <path
        d="M48 42c-12 0-19.5-6.5-20.5-13.6 5.5 3 12 4 22-1.4 6 3.2 10 3.2 14.6 1.3-.6 8.4-7.4 13.7-16.1 13.7Z"
        fill="#ffcf8a"
        opacity="0.85"
      />
      <path
        d="M46 9.5c1.5-1.8 3.5-2.7 5.5-2.7"
        fill="none"
        stroke="#d79b59"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      {/* Cherry */}
      <path
        d="M49 3.5c0-3.4 3-5 6.5-5"
        fill="none"
        stroke="#6d7d4f"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="51" cy="7.5" r="4.4" fill="#c2493c" />
      <circle cx="49.4" cy="5.8" r="1.3" fill="#fdece9" />
    </svg>
  );
}

function Cherry() {
  return (
    <span className="flex items-end gap-0.5" aria-hidden="true">
      <span className="relative h-6 w-5">
        <span className="absolute -top-2 left-1/2 h-4 w-1 -translate-x-1/2 rounded-full bg-[#6d7d4f]" />
        <span className="absolute top-0 left-0 h-5 w-5 rounded-full bg-[#c2493c] shadow-[inset_-3px_-3px_6px_rgba(140,40,30,0.55),inset_2px_2px_4px_rgba(255,240,235,0.9)]">
          <span className="absolute top-1 left-1.5 h-1 w-1 rounded-full bg-white/80" />
        </span>
      </span>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Floating world                                                     */
/* ------------------------------------------------------------------ */

export function FloatingWorld() {
  return (
    <div className="relative h-full w-full">
      {/* Background — soft clouds */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {clouds.map((cloud) => (
          <motion.span
            key={`cloud-${cloud.index}`}
            custom={cloud.index}
            variants={CLOUD_DRIFT}
            initial="float"
            animate="float"
            className={cn(
              "absolute rounded-full blur-2xl",
              cloud.className
            )}
          />
        ))}
      </div>

      {/* Background — crumbs & light particles */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {crumbs.map((crumb) => (
          <motion.span
            key={`crumb-${crumb.index}`}
            custom={crumb.index}
            variants={DRIFT}
            initial="float"
            animate="float"
            className={cn("absolute rounded-full", crumb.className)}
          />
        ))}
        {particles.map((particle) => (
          <motion.span
            key={`particle-${particle.index}`}
            custom={particle.index}
            variants={TWINKLE}
            initial="twinkle"
            animate="twinkle"
            className={cn("absolute rounded-full", particle.className)}
          />
        ))}
      </div>

      {/* Midground — supporting items */}
      {midground.map((item) => (
        <motion.div
          key={item.label}
          custom={item.index}
          variants={DRIFT}
          initial="float"
          animate="float"
          className={item.position}
        >
          <FloatingObject
            icon={item.icon}
            label={item.label}
            sublabel={item.sublabel}
            className="relative"
          />
        </motion.div>
      ))}

      {/* Foreground — focal cupcake */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          custom={0}
          variants={DRIFT}
          initial="float"
          animate="float"
          className="relative h-44 w-44 sm:h-52 sm:w-52 lg:h-60 lg:w-60"
        >
          <span
            className="absolute inset-0 rounded-full bg-secondary/70 blur-2xl"
            aria-hidden="true"
          />
          <span className="absolute inset-0 flex items-center justify-center rounded-full border border-white/70 bg-white/60 shadow-float backdrop-blur-xl">
            <Cupcake />
          </span>
        </motion.div>

        {/* Cherry */}
        <motion.div
          custom={4}
          variants={DRIFT}
          initial="float"
          animate="float"
          className="absolute right-[16%] bottom-[24%] sm:right-[22%]"
        >
          <Cherry />
        </motion.div>
      </div>

      {/* Foreground — sparkles */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <motion.span
          custom={0}
          variants={TWINKLE}
          initial="twinkle"
          animate="twinkle"
          className="absolute top-6 right-[22%] text-primary"
        >
          <Sparkles className="h-4 w-4" strokeWidth={1.75} />
        </motion.span>
        <motion.span
          custom={1}
          variants={TWINKLE}
          initial="twinkle"
          animate="twinkle"
          className="absolute bottom-[30%] left-[8%] text-accent"
        >
          <Sparkles className="h-3 w-3" strokeWidth={1.75} />
        </motion.span>
        <motion.span
          custom={2}
          variants={TWINKLE}
          initial="twinkle"
          animate="twinkle"
          className="absolute right-[6%] top-[38%] hidden text-primary/60 sm:block"
        >
          <Sparkles className="h-3.5 w-3.5" strokeWidth={1.75} />
        </motion.span>
      </div>
    </div>
  );
}
