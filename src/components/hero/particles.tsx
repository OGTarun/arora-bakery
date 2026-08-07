"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";

type ParticleType = {
  bg: string;
  shape: string;
  glow?: boolean;
  ember?: boolean;
};

const TYPES: ParticleType[] = [
  { bg: "#8a5a3b", shape: "rounded-full" },
  { bg: "#6b4226", shape: "rounded-full" },
  { bg: "#ecc27e", shape: "rounded-full", glow: true },
  { bg: "#f7f1e6", shape: "rounded-[3px] rotate-45" },
  { bg: "#ffb45e", shape: "rounded-full", ember: true },
  { bg: "#7a4526", shape: "rounded-full" },
];

interface Cfg {
  r: number;
  ry: number;
  dur: number;
  phase: number;
  size: number;
  tw: number;
  twDelay: number;
  o: number;
  blur: number;
  type: ParticleType;
  px: number;
}

const COUNT = 56;

/* Deterministic configs so SSR/hydration stays stable. */
const configs: Cfg[] = Array.from({ length: COUNT }).map((_, i) => {
  const r = 110 + ((i * 37) % 210);
  const type = TYPES[i % TYPES.length];
  return {
    r,
    ry: r * (0.5 + ((i * 7) % 40) / 100),
    dur: 9 + (i % 9),
    phase: (i * 13) % 10,
    size: 3 + (i % 5),
    tw: 3 + (i % 4),
    twDelay: (i * 7) % 6,
    o: 0.3 + (i % 4) * 0.16,
    blur: i % 5 === 0 ? 1.5 : i % 4 === 0 ? 1 : 0,
    type,
    px: 0.06 + (i % 3) * 0.03,
  };
});

function Particle({
  cfg,
  sx,
  sy,
}: {
  cfg: Cfg;
  sx: MotionValue<number>;
  sy: MotionValue<number>;
}) {
  const px = useTransform(sx, (v) => v * cfg.px * 30);
  const py = useTransform(sy, (v) => v * cfg.px * 20);

  return (
    <motion.div
      style={{ x: px, y: py }}
      className="absolute top-1/2 left-1/2"
    >
      <motion.div
        animate={{ x: [-cfg.r, 0, cfg.r, 0, -cfg.r], y: [0, -cfg.ry, 0, cfg.ry, 0] }}
        transition={{
          duration: cfg.dur,
          ease: "easeInOut",
          repeat: Infinity,
          delay: cfg.phase,
        }}
      >
        <motion.span
          animate={{ opacity: [cfg.o * 0.3, cfg.o, cfg.o * 0.3], scale: [0.85, 1.1, 0.85] }}
          transition={{
            duration: cfg.tw,
            ease: "easeInOut",
            repeat: Infinity,
            delay: cfg.twDelay,
          }}
          className={`absolute ${cfg.type.shape}`}
          style={{
            width: cfg.size,
            height: cfg.size,
            background: cfg.type.bg,
            left: -cfg.size / 2,
            top: -cfg.size / 2,
            filter: `blur(${cfg.blur}px)`,
            boxShadow: cfg.type.glow
              ? "0 0 6px rgba(232,183,117,0.55)"
              : cfg.type.ember
              ? "0 0 8px rgba(255,150,60,0.6)"
              : "0 0 4px rgba(0,0,0,0.25)",
          }}
        />
      </motion.div>
    </motion.div>
  );
}

/* Chocolate crumbs, cocoa dust, gold flakes, sugar crystals, embers and
   curls orbiting around the cake in desynced elliptical paths. */
export function Particles({
  x,
  y,
}: {
  x: MotionValue<number>;
  y: MotionValue<number>;
}) {
  return (
    <div
      className="pointer-events-none absolute inset-0"
      aria-hidden="true"
    >
      {configs.map((c, i) => (
        <Particle key={i} cfg={c} sx={x} sy={y} />
      ))}
    </div>
  );
}