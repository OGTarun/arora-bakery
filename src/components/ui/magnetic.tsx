"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";

interface MagneticProps {
  children: ReactNode;
  strength?: number;
  radius?: number;
}

export function Magnetic({ children, strength = 0.3, radius = 50 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const xRef = useRef(0);
  const yRef = useRef(0);
  const currentXRef = useRef(0);
  const currentYRef = useRef(0);

  useEffect(() => {
    if (!ref.current) return;

    const el = ref.current;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      const distance = Math.sqrt(distX * distX + distY * distY);
      const maxDist = radius;

      if (distance <= maxDist) {
        const force = 1 - (distance / maxDist) ** 2;
        xRef.current = distX * force * strength;
        yRef.current = distY * force * strength;
      } else {
        xRef.current = 0;
        yRef.current = 0;
      }
    };

    const handleMouseLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "power3.out",
        overwrite: "auto",
      });
    };

    const animate = () => {
      if (xRef.current === 0 && yRef.current === 0) return;

      currentXRef.current += (xRef.current - currentXRef.current) * 0.12;
      currentYRef.current += (yRef.current - currentYRef.current) * 0.12;

      gsap.set(el, {
        x: currentXRef.current,
        y: currentYRef.current,
      });

      requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    animate();

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [strength, radius]);

  return (
    <div ref={ref} className="inline-block">
      {children}
    </div>
  );
}