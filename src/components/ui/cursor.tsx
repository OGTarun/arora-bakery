"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface CursorProps {
  children: React.ReactNode;
}

export function Cursor({ children }: CursorProps) {
  const innerRef = useRef<HTMLDivElement>(null);
  const outerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const inner = innerRef.current;
    const outer = outerRef.current;
    if (!inner || !outer) return;

    const getInteractiveElement = (el: EventTarget | null) => {
      if (!el || !(el instanceof HTMLElement)) return null;
      const interactiveSelector = "button, a, .magnetic, [data-interactive], label, input, select, textarea, .hover-target, [role='button']";
      return el.closest(interactiveSelector);
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const isInteractive = getInteractiveElement(e.target) !== null;
      gsap.to(inner, {
        scale: isInteractive ? 1.2 : 1,
        backgroundColor: isInteractive ? "#d79b59" : "#2d2017",
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(outer, {
        scale: 1.8,
        duration: 0.4,
        ease: "power2.out",
        borderWidth: isInteractive ? 4 : 2,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(inner, {
        scale: 1,
        backgroundColor: "#2d2017",
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(outer, {
        scale: 1,
        duration: 0.4,
        ease: "power2.out",
        borderWidth: 2,
      });
    };

    const handleMouseDown = () => {
      gsap.to(inner, { scale: 0.9, duration: 0.2 });
      gsap.to(outer, { scale: 1.2, duration: 0.2 });
    };

    const handleMouseUp = () => {
      gsap.to(inner, { scale: 1.2, duration: 0.2 });
      gsap.to(outer, { scale: 1.8, duration: 0.2 });
    };

    const handleInteractiveState = (e: Event) => {
      const target = e.target as HTMLElement;
      const isInteractive = getInteractiveElement(target) !== null;
      if (isInteractive) {
        gsap.to(inner, {
          scale: 1.2,
          backgroundColor: "#d79b59",
          duration: 0.3,
        });
        gsap.to(outer, {
          scale: 1.8,
          duration: 0.4,
          borderWidth: 4,
        });
      }
    };

    const handleClick = () => {
      gsap.to(inner, {
        scale: 1.4,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
      });
    };

    const handleBlur = () => {
      gsap.to(inner, {
        scale: 1,
        backgroundColor: "#2d2017",
        duration: 0.3,
      });
      gsap.to(outer, {
        scale: 1,
        duration: 0.4,
        borderWidth: 2,
      });
    };

    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("focus", handleInteractiveState, true);
    document.addEventListener("blur", handleBlur, true);
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("focus", handleInteractiveState, true);
      document.removeEventListener("blur", handleBlur, true);
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <>
      <div
        ref={innerRef}
        className="cursor-inner pointer-events-none fixed top-0 left-0 z-[9999] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground will-change-transform"
      />
      <div
        ref={outerRef}
        className="cursor-outer pointer-events-none fixed top-0 left-0 z-[9998] h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary will-change-transform"
      />
      {children}
    </>
  );
}