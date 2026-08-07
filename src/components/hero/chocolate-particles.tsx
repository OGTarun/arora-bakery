"use client";

import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

const shades = ["#8a5a3b", "#6b4226", "#a06a45", "#ecc27e", "#7a4526"];

interface Spec {
  left: number;
  top: number;
  size: number;
  color: string;
  opacity: number;
  glow: boolean;
  floatAmp: number;
  floatDur: number;
  phase: number;
  para: number;
  rot: number;
}

/* Deterministic specs so SSR and hydration stay stable. */
const specs: Spec[] = Array.from({ length: 26 }).map((_, i) => ({
  left: 2 + ((i * 53) % 96),
  top: 2 + ((i * 37) % 94),
  size: 3 + (i % 5),
  color: shades[i % shades.length],
  opacity: 0.18 + (i % 4) * 0.11,
  glow: i % 4 === 0,
  floatAmp: 8 + (i % 5) * 4,
  floatDur: 5 + (i % 6),
  phase: i * 0.55,
  para: 0.05 + (i % 3) * 0.03,
  rot: (i % 2 === 0 ? -1 : 1) * (8 + (i % 4) * 6),
}));

function Dust({ spec, ox, oy }: { spec: Spec; ox: MotionValue<number>; oy: MotionValue<number> }) {
  /* Subtle parallax — particles drift slightly against the cursor. */
  const px = useTransform(ox, (v) => v * spec.para * 22);
  const py = useTransform(oy, (v) => v * spec.para * 22);

  return (
    <motion.span
      style={{ x: px, y: py, width: spec.size, height: spec.size }}
      className="absolute rounded-full"
      animate={{ rotate: [0, spec.rot, 0] }}
      transition={{ duration: spec.floatDur, ease: "easeInOut", repeat: Infinity, delay: spec.phase }}
    >
      <motion.span
        className="block h-full w-full rounded-full"
        style={{ background: spec.color, boxShadow: spec.glow ? "0 0 8px rgba(232,183,101,0.5)" : "0 0 6px rgba(0,0,0,0.3)" }}
        animate={{ opacity: [spec.opacity * 0.5, spec.opacity, spec.opacity * 0.5], y: [0, -spec.floatAmp, 0] }}
        transition={{ duration: spec.floatDur, ease: "easeInOut", repeat: Infinity, delay: spec.phase }}
      />
    </motion.span>
  );
}

/* Chocolate shards + gold flakes oscillating across the whole hero,
   drifting gently with the mouse — kept light so content stays legible. */
export function ChocolateParticles() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const ox = useSpring(mx, { stiffness: 45, damping: 18 });
  const oy = useSpring(my, { stiffness: 45, damping: 18 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mx.set(((e.clientX / window.innerWidth) * 2 - 1) * 10);
      my.set(((e.clientY / window.innerHeight) * 2 - 1) * 8);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <motion.div
        style={{ x: 0, y: 0 }}
        className="absolute inset-0"
      >
        {specs.map((s, i) => (
          <span key={i} className="absolute" style={{ left: `${s.left}%`, top: `${s.top}%` }}>
            <Dust spec={s} ox={ox} oy={oy} />
          </span>
        ))}
      </motion.div>
    </div>
  );
}