"use client";

import { useEffect } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

import { cn } from "@/lib/utils";

interface Item {
  pos: string;
  size: string;
  depth: number;
  blur: number;
  scale: number;
  float: number;
  osc: number;
  dur: number;
  rotDur: number;
  phase: number;
}

/* 7 premium cupcakes scattered around the hero edges.
   Foreground ones are large and sharp; background ones are small, blurred and dim.
   Each has a completely independent oscillation. */
const items: Item[] = [
  { pos: "right-[5%] top-[13%]", size: "h-24 w-auto lg:h-40", depth: 0.85, blur: 0, scale: 1.05, float: 22, osc: 10, dur: 6, rotDur: 9, phase: 0.2 },
  { pos: "right-[2%] top-[56%]", size: "h-28 w-auto lg:h-44", depth: 0.9, blur: 0, scale: 1.1, float: 28, osc: 8, dur: 7.5, rotDur: 11, phase: 1.1 },
  { pos: "left-[2%] top-[62%]", size: "h-24 w-auto lg:h-40", depth: 0.8, blur: 0.5, scale: 1, float: 20, osc: 12, dur: 5.5, rotDur: 8, phase: 2.4 },
  { pos: "left-[3%] top-[7%]", size: "h-14 w-auto lg:h-20", depth: 0.45, blur: 1.5, scale: 0.8, float: 15, osc: 6, dur: 8, rotDur: 12, phase: 3.1 },
  { pos: "left-[8%] bottom-[18%]", size: "h-14 w-auto lg:h-20", depth: 0.5, blur: 1, scale: 0.85, float: 18, osc: 7, dur: 6.5, rotDur: 9.5, phase: 0.7 },
  { pos: "right-[5%] bottom-[12%]", size: "h-16 w-auto lg:h-24", depth: 0.55, blur: 1, scale: 0.85, float: 16, osc: 9, dur: 7, rotDur: 10, phase: 2.8 },
  { pos: "right-[18%] top-[9%]", size: "h-12 w-auto lg:h-16", depth: 0.4, blur: 2, scale: 0.75, float: 24, osc: 5, dur: 8.5, rotDur: 13, phase: 1.6 },
];

function Cupcake({
  item,
  sx,
  sy,
  index,
}: {
  item: Item;
  sx: MotionValue<number>;
  sy: MotionValue<number>;
  index: number;
}) {
  /* ~25% of the main cake's mouse response. */
  const px = useTransform(sx, (v) => v * 0.7);
  const py = useTransform(sy, (v) => v * 0.5);

  return (
    <motion.div
      style={{ x: px, y: py }}
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: item.depth, scale: item.scale }}
      transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.6 + index * 0.15 }}
      className={cn("absolute", item.pos)}
    >
      <motion.div
        animate={{ y: [0, -item.float, 0], x: [0, item.osc, 0] }}
        transition={{
          duration: item.dur,
          ease: "easeInOut",
          repeat: Infinity,
          delay: item.phase,
        }}
      >
        <motion.div
          animate={{ rotate: [-5, 5, -5] }}
          transition={{
            duration: item.rotDur,
            ease: "easeInOut",
            repeat: Infinity,
            delay: item.phase,
          }}
        >
          <Image
            src="/cupcake.png"
            alt=""
            width={260}
            height={173}
            style={{ filter: `blur(${item.blur}px)` }}
            className={`${item.size} w-auto object-contain`}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export function CupcakeScatter() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 50, damping: 18 });
  const sy = useSpring(my, { stiffness: 50, damping: 18 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mx.set(((e.clientX / window.innerWidth) * 2 - 1) * 10);
      my.set(((e.clientY / window.innerHeight) * 2 - 1) * 8);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      {items.map((item, i) => (
        <Cupcake key={i} item={item} sx={sx} sy={sy} index={i} />
      ))}
    </div>
  );
}