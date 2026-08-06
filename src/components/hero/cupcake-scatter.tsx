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
  dur: number;
  rot: number;
  phase: number;
}

/* 6 cupcakes scattered around the hero edges as secondary decoration.
   Each has a distinct depth/blur/scale so none fights the main cake. */
const items: Item[] = [
  { pos: "left-[3%] top-[5%]", size: "h-6 w-auto lg:h-8", depth: 0.55, blur: 1, scale: 0.85, dur: 7, rot: 4, phase: 0.2 },
  { pos: "right-[6%] top-[16%]", size: "h-6 w-auto lg:h-8", depth: 0.7, blur: 0, scale: 1, dur: 6, rot: 5, phase: 1.1 },
  { pos: "left-[3%] top-[62%]", size: "h-7 w-auto lg:h-9", depth: 0.45, blur: 1.5, scale: 0.9, dur: 8, rot: 3, phase: 2.3 },
  { pos: "right-[3%] top-[66%]", size: "h-6 w-auto lg:h-8", depth: 0.65, blur: 0.5, scale: 1.05, dur: 6.5, rot: 6, phase: 0.8 },
  { pos: "left-[10%] bottom-[14%]", size: "h-6 w-auto lg:h-8", depth: 0.5, blur: 1, scale: 0.9, dur: 7.5, rot: 4, phase: 3.1 },
  { pos: "right-[6%] top-[82%]", size: "h-5 w-auto lg:h-7", depth: 0.75, blur: 0, scale: 1.1, dur: 6, rot: 5, phase: 1.8 },
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
  const px = useTransform(sx, (v) => v * 0.12);
  const py = useTransform(sy, (v) => v * 0.12);

  return (
    <motion.div
      style={{ x: px, y: py }}
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: item.depth, scale: item.scale }}
      transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.6 + index * 0.15 }}
      className={cn("absolute", item.pos)}
    >
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: item.dur, ease: "easeInOut", repeat: Infinity, delay: item.phase }}
      >
        <motion.div
          animate={{ rotate: [-item.rot, item.rot, -item.rot] }}
          transition={{ duration: item.rot * 2, ease: "easeInOut", repeat: Infinity, delay: item.phase }}
        >
          <Image
            src="/cupcake.png"
            alt=""
            width={180}
            height={120}
            style={{ filter: `blur(${item.blur}px)` }}
            className={`${item.size} w-auto object-contain`}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export function CupcakeScatter() {
  /* Tiny shared mouse parallax — much smaller than the main cake. */
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