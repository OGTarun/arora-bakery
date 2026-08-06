"use client";

import { useLayoutEffect, useRef } from "react";
import { Great_Vibes } from "next/font/google";
import { ArrowRight, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { FeatureStrip } from "@/components/hero/feature-strip";
import { FloatingCake } from "@/components/hero/floating-cake";
import { ChocolateParticles } from "@/components/hero/chocolate-particles";
import { Candies } from "@/components/hero/candies";

const script = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const DURATION = 900;

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  /* Entrance choreography — light, slow, cinematic. Reduced-motion safe. */
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    /* Respect reduced motion: skip, leaving content visible. */
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const reveal = (sel: string, delay: number, stagger = 120) => {
      const els = Array.from(section.querySelectorAll<HTMLElement>(sel));
      els.forEach((el, i) => {
        el.animate(
          [
            { opacity: 0, transform: "translateY(24px)" },
            { opacity: 1, transform: "translateY(0)" },
          ],
          {
            duration: DURATION,
            delay: delay + i * stagger,
            easing: "cubic-bezier(0.22,1,0.36,1)",
            fill: "backwards",
          }
        );
      });
    };

    reveal(".hero-badge", 250);
    reveal(".hero-line", 450, 140);
    reveal(".hero-para", 1000);
    reveal(".hero-cta", 1150);
    reveal(".hero-cta-alt", 1250);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-[#120a06] text-[#f5e9da]"
    >
      {/* Cinematic backdrop — blurred bakery ambience */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_70%_30%,#2a160c_0%,#1a0f09_55%,#120a06_100%)]" />
        <div className="absolute -top-16 left-1/4 h-80 w-80 rounded-full bg-[#c9873a]/20 blur-[110px]" />
        <div className="absolute top-1/4 right-[6%] h-72 w-72 rounded-full bg-[#e8b765]/15 blur-[100px]" />
        <div className="absolute bottom-10 left-[8%] h-64 w-64 rounded-full bg-[#8a5128]/20 blur-[90px]" />
        <div className="absolute inset-x-0 top-[18%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute inset-x-0 top-[68%] h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(100%_100%_at_50%_50%,transparent_55%,rgba(0,0,0,0.65)_100%)]" />
      </div>

      {/* Chocolate shards, gold flakes, and candies drifting over the hero */}
      <ChocolateParticles />
      <Candies />

      <div className="relative z-10 mx-auto grid w-full max-w-[1500px] flex-1 items-start gap-10 px-6 pt-24 pb-16 md:px-12 lg:grid-cols-[1fr_1.5fr] lg:gap-6 lg:px-16 lg:pt-24">
        {/* Left — editorial copy */}
        <div className="relative z-20 max-w-xl">
          <span className="hero-badge inline-flex items-center gap-2 rounded-full border border-[#e8b765]/30 bg-[#e8b765]/10 px-4 py-1.5 text-[0.7rem] font-medium uppercase tracking-[0.24em] text-[#ecc27e] backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            Crafted Fresh Every Day
          </span>

          <h1 className="mt-7 font-heading text-[2.9rem] font-medium leading-[1.02] tracking-tight text-[#fbf1e2] text-balance sm:text-6xl xl:text-7xl">
            <span className="hero-line block">Where Every</span>
            <span className={`hero-line block text-[#ecc27a] ${script.className}`}>
              Celebration
            </span>
            <span className="hero-line block">Begins</span>
          </h1>

          <p className="hero-para mt-6 max-w-md text-base leading-relaxed text-[#c9b7a2] sm:text-lg">
            Handcrafted cakes and pastries for life&apos;s most memorable
            moments — slow-baked, beautifully finished, and made with love in
            Khanna.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Button asChild size="lg" className="hero-cta">
              <a href="#signature">
                Explore Cakes
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/btn:translate-x-1.5"
                  aria-hidden="true"
                />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="hero-cta-alt border-[#e8b765]/40 text-[#ecc27a] hover:bg-[#e8b765]/10"
            >
              <a href="#about">Our Story</a>
            </Button>
          </div>
        </div>

        {/* Right — floating chocolate cake */}
        <FloatingCake className="mx-auto -mt-4 h-[360px] w-full max-w-md sm:h-[560px] lg:-mt-6 lg:h-[720px] lg:max-w-xl" />
      </div>

      {/* Bottom feature strip */}
      <div className="relative z-20 -mb-8 lg:mb-0">
        <FeatureStrip />
      </div>

      {/* Scroll hint */}
      <div
        className="pointer-events-none absolute bottom-24 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
        aria-hidden="true"
      >
        <span className="text-[0.65rem] font-medium uppercase tracking-[0.3em] text-[#c9b7a2]/70">
          Scroll
        </span>
        <span className="relative h-9 w-5 rounded-full border border-white/20">
          <span
            className="absolute left-1/2 top-1.5 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#ecc27e]"
            style={{ animation: "scroll-hint 2s ease-in-out infinite" }}
          />
        </span>
      </div>

      {/* Soft transition into the next light section */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-24 bg-gradient-to-t from-[#fff8f2] to-transparent"
        aria-hidden="true"
      />
    </section>
  );
}