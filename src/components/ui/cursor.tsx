"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";

interface CursorProps {
  children: ReactNode;
}

/* Hide the native cursor only after the custom cursor is mounted and working. */
const INTERACTIVE_SELECTOR =
  "button, a, label, input, select, textarea, [role='button'], [data-interactive], .hover-target";

export function Cursor({ children }: CursorProps) {
  const innerRef = useRef<HTMLDivElement>(null);
  const outerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const inner = innerRef.current;
    const outer = outerRef.current;
    if (!inner || !outer) return;

    /* Only hide the system cursor on fine pointers where the custom works. */
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!finePointer || reducedMotion) return;

    /* Signal that the custom cursor is live so layout can hide the native one. */
    document.documentElement.classList.add("has-custom-cursor");

    const xToInner = gsap.quickTo(inner, "left", {
      duration: 0.12,
      ease: "power2.out",
    });
    const yToInner = gsap.quickTo(inner, "top", {
      duration: 0.12,
      ease: "power2.out",
    });
    const xToOuter = gsap.quickTo(outer, "left", {
      duration: 0.5,
      ease: "power3.out",
    });
    const yToOuter = gsap.quickTo(outer, "top", {
      duration: 0.5,
      ease: "power3.out",
    });

    const onMouseMove = (e: MouseEvent) => {
      /* Offset by half the element size so the dot centres on the pointer. */
      const x = e.clientX;
      const y = e.clientY;

      /* Inner cursor follows fast, outer trails with spring lag. */
      xToInner(x - 16);
      yToInner(y - 16);
      xToOuter(x - 28);
      yToOuter(y - 28);

      /* Reveal once the mouse starts moving (avoid jumpy 0,0 state). */
      if (inner.style.visibility !== "visible") {
        gsap.set([inner, outer], { autoAlpha: 1 });
      }

      /* Scale up on interactive elements. */
      const target = e.target as HTMLElement;
      const interactive = target.closest(INTERACTIVE_SELECTOR) !== null;
      gsap.to(inner, {
        scale: interactive ? 1.6 : 1,
        backgroundColor: interactive ? "#d79b59" : "#2d2017",
        duration: 0.25,
        ease: "power2.out",
      });
      gsap.to(outer, {
        scale: interactive ? 1.9 : 1,
        duration: 0.35,
        ease: "power2.out",
      });
    };

    const onMouseDown = () => {
      gsap.to([inner, outer], { scale: 0.92, duration: 0.15 });
    };

    const onMouseUp = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest(INTERACTIVE_SELECTOR) !== null;
      gsap.to(inner, {
        scale: interactive ? 1.6 : 1,
        duration: 0.25,
      });
      gsap.to(outer, {
        scale: interactive ? 1.9 : 1,
        duration: 0.35,
      });
    };

    const onMouseLeaveDoc = () => {
      gsap.to([inner, outer], { autoAlpha: 0, duration: 0.3 });
    };

    const onMouseEnterDoc = () => {
      gsap.to([inner, outer], { autoAlpha: 1, duration: 0.2 });
    };

    document.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);
    document.documentElement.addEventListener("mouseleave", onMouseLeaveDoc);
    document.documentElement.addEventListener("mouseenter", onMouseEnterDoc);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
      document.documentElement.removeEventListener("mouseleave", onMouseLeaveDoc);
      document.documentElement.removeEventListener("mouseenter", onMouseEnterDoc);
    };
  }, []);

  return (
    <>
      <div
        ref={innerRef}
        style={{ visibility: "hidden", top: 0, left: 0 }}
        className="pointer-events-none fixed z-[9999] h-8 w-8 rounded-full bg-foreground will-change-transform"
      />
      <div
        ref={outerRef}
        style={{ visibility: "hidden", top: 0, left: 0 }}
        className="pointer-events-none fixed z-[9998] h-14 w-14 rounded-full border-2 border-primary will-change-transform"
      />
      {children}
    </>
  );
}
