"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

import { SignatureGrid } from "./SignatureGrid";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

const EASE = [0.22, 1, 0.36, 1] as const;

export function SignatureSection() {
  return (
    <section
      id="signature"
      className="relative overflow-hidden bg-background py-20 md:py-28 lg:py-36"
      aria-labelledby="signature-title"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-secondary/50 blur-[120px]" />
        <div className="absolute bottom-0 -left-32 h-80 w-80 rounded-full bg-accent/30 blur-[120px]" />
      </div>

      <Container className="relative">
        <div className="grid items-start gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          {/* Editorial copy */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1, ease: EASE }}
            className="lg:sticky lg:top-32"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-secondary/50 px-4 py-1.5 text-[0.7rem] font-medium uppercase tracking-[0.22em] text-primary">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              The Collection
            </span>

            <h2
              id="signature-title"
              className="mt-6 font-heading text-5xl font-medium leading-[1.05] tracking-tight text-foreground text-balance sm:text-6xl xl:text-7xl"
            >
              Signature{" "}
              <span className="italic text-primary">Collection</span>
            </h2>

            <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
              Freshly crafted delights for every celebration and every day.
            </p>

            <div className="mt-10">
              <Button asChild size="lg">
                <a href="#contact">
                  Explore the Collection
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/btn:translate-x-1.5"
                    aria-hidden="true"
                  />
                </a>
              </Button>
            </div>
          </motion.div>

          {/* Showcase cards */}
          <SignatureGrid />
        </div>
      </Container>
    </section>
  );
}
