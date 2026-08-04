"use client";

import { useLayoutEffect, useRef } from "react";
import { MotionConfig, motion, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Sparkles } from "lucide-react";

import { FloatingWorld } from "@/components/hero/floating-world";
import { Button } from "@/components/ui/button";
import { useMouseParallax } from "@/hooks/use-mouse-parallax";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const headline: { text: string; italic?: boolean }[] = [
  { text: "Crafted with" },
  { text: "Love", italic: true },
];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  const { x: mouseX, y: mouseY } = useMouseParallax();

  /* Subtle depth split — scene drifts with the cursor, copy drifts against. */
  const scenePX = useTransform(mouseX, (v) => v * 8);
  const scenePY = useTransform(mouseY, (v) => v * 8);
  const copyPX = useTransform(mouseX, (v) => v * -5);
  const glowPX = useTransform(mouseX, (v) => v * 14);
  const glowPY = useTransform(mouseY, (v) => v * 14);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(section);
      const scene = section.querySelector<HTMLElement>(".hero-scene");

      /* Selector hooks into the Floating World (composition untouched). */
      const clouds = q('[class*="blur-2xl"]:not([class*="bg-secondary/70"])');
      const cupcake = q("[class~='shadow-float']");
      const cherry: Element[] = q('[class*="right-[16%]"] > span');
      const sparkleLayer = scene
        ? scene.querySelectorAll<HTMLElement>('[class*="pointer-events-none"]')[2]
        : null;

      if (!reducedMotion) {
        /* ------------------------------------------------------------------ */
        /*  Entrance timeline                                                  */
        /* ------------------------------------------------------------------ */
        const tl = gsap.timeline({
          defaults: { ease: "power2.out" },
          onComplete: () => ScrollTrigger.refresh(),
        });

        tl.from(q(".hero-backdrop"), { opacity: 0, duration: 1.2, ease: "power1.out" }, 0)
          .from(clouds, { opacity: 0, duration: 1.6, ease: "power2.out" }, 0.2)
          .from(q(".hero-scene"), { scale: 0.96, opacity: 0, duration: 1.8, ease: "power3.out" }, 0.3)
          .from(cupcake, { y: 24, opacity: 0, duration: 1.4, ease: "power3.out" }, 0.7)
          .from(cherry, { y: -14, scale: 0.6, opacity: 0, duration: 1.1, ease: "back.out(1.6)" }, 1.0)
          .from(q(".hero-badge"), { y: 16, opacity: 0, duration: 0.8 }, 1.1)
          .from(
            q(".hero-line"),
            { yPercent: 112, duration: 1.3, stagger: 0.12, ease: "power3.out" },
            1.15
          )
          .from(q(".hero-para"), { y: 18, opacity: 0, duration: 0.8 }, 1.6)
          .from(
            q(".hero-cta"),
            { y: 22, opacity: 0, duration: 0.8, ease: "power3.out", clearProps: "transform,opacity" },
            1.8
          )
          .from(
            q(".hero-cta-alt"),
            { y: 22, opacity: 0, duration: 0.8, ease: "power3.out", clearProps: "transform,opacity" },
            "+=0.12"
          );

        if (sparkleLayer) {
          tl.from(sparkleLayer, { opacity: 0, duration: 1.3, ease: "power1.out" }, 2.1);
        }
        tl.from(q(".hero-cue"), { y: 8, opacity: 0, duration: 1 }, "+=0.15");
      }

      if (!reducedMotion) {
        /* ------------------------------------------------------------------ */
        /*  Scroll effects — deliberately subtle                               */
        /* ------------------------------------------------------------------ */
        gsap.to(q(".hero-copy"), {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

        gsap.to(q(".hero-scene"), {
          yPercent: -14,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

        gsap.to(cupcake, {
          rotation: -2,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

        gsap.to(clouds, {
          yPercent: -6,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <section
        ref={sectionRef}
        id="home"
        className="relative flex min-h-[100svh] items-center overflow-hidden"
      >
        {/* Dreamy backdrop */}
        <div
          className="hero-backdrop pointer-events-none absolute inset-0"
          aria-hidden="true"
        >
          <motion.div
            style={{ x: glowPX, y: glowPY }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_78%_22%,rgb(247_227_207/0.9),transparent_52%)]"
          />
          <motion.div
            style={{ x: glowPX, y: glowPY }}
            className="absolute -top-24 -right-24 h-[28rem] w-[28rem] rounded-full bg-secondary/60 blur-[120px]"
          />
          <motion.div
            style={{ x: glowPX, y: glowPY }}
            className="absolute bottom-0 -left-32 h-96 w-96 rounded-full bg-accent/40 blur-[120px]"
          />
          <div className="absolute top-1/3 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/10 blur-[100px]" />
        </div>

        <div className="container-px relative z-10 mx-auto grid w-full items-center gap-16 py-28 lg:grid-cols-2 lg:gap-10 lg:py-40">
          {/* Copy */}
          <motion.div style={{ x: copyPX }} className="max-w-xl">
            <div className="hero-copy">
              <span className="hero-badge inline-flex items-center gap-2 rounded-full border border-primary/20 bg-secondary/50 px-4 py-1.5 text-[0.7rem] font-medium uppercase tracking-[0.22em] text-primary">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                Freshly baked everyday
              </span>

              <h1 className="mt-7 font-heading text-5xl font-medium leading-[1.04] tracking-tight text-foreground text-balance sm:text-6xl xl:text-7xl">
                {headline.map((line) => (
                  <span key={line.text} className="block overflow-hidden pb-1">
                    <span
                      className={cn(
                        "hero-line block will-change-transform",
                        line.italic && "italic text-primary"
                      )}
                    >
                      {line.text}
                    </span>
                  </span>
                ))}
              </h1>

              <p className="hero-para mt-6 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
                A little bakery in Khanna, Punjab — crafting cakes, breads and
                pastries the way they should be. Slow, honest and beautiful.
              </p>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
                <Button asChild size="lg" className="hero-cta">
                  <a href="#products">
                    Explore Menu
                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/btn:translate-x-1.5"
                      aria-hidden="true"
                    />
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="hero-cta-alt">
                  <a href="#contact">Order Cake</a>
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Floating bakery scene */}
          <div className="hero-scene relative mx-auto h-[440px] w-full max-w-md sm:max-w-lg lg:h-[560px] lg:max-w-none">
            <motion.div style={{ y: scenePY, x: scenePX }} className="h-full w-full">
              <FloatingWorld />
            </motion.div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="hero-cue pointer-events-none absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex" aria-hidden="true">
          <span className="text-[0.65rem] font-medium uppercase tracking-[0.28em] text-muted-foreground">
            Scroll
          </span>
          <span className="relative h-12 w-px overflow-hidden bg-foreground/10">
            <span className="absolute inset-x-0 top-0 h-1/2 animate-scroll-hint bg-primary" />
          </span>
        </div>
      </section>
    </MotionConfig>
  );
}