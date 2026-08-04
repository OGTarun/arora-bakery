"use client";

import { useEffect } from "react";
import { useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import type { MotionValue } from "framer-motion";

interface MouseParallax {
  x: MotionValue<number>;
  y: MotionValue<number>;
}

export function useMouseParallax(): MouseParallax {
  const reducedMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 60, damping: 20, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 60, damping: 20, mass: 0.6 });

  useEffect(() => {
    if (reducedMotion) return;

    const onPointerMove = (event: PointerEvent) => {
      const nx = (event.clientX / window.innerWidth) * 2 - 1;
      const ny = (event.clientY / window.innerHeight) * 2 - 1;
      x.set(nx);
      y.set(ny);
    };

    const onPointerLeave = () => {
      x.set(0);
      y.set(0);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [reducedMotion, x, y]);

  return { x: springX, y: springY };
}
