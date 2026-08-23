"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

import { SignatureGrid } from "./SignatureGrid";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { products } from "@/data/site";

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

        {/* Price board — written right below the scrolling slider */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="mt-14 overflow-hidden rounded-[2rem] border border-black/8 shadow-soft lg:mt-16"
          aria-label="Price list"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 bg-secondary/40 px-6 py-4 sm:px-8">
            <p className="text-[0.7rem] font-medium uppercase tracking-[0.22em] text-primary">
              Price List
            </p>
            <p className="text-xs text-muted-foreground">
              Starting prices · custom orders quoted on request
            </p>
          </div>
          <ul className="grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <li
                key={product.id}
                className="flex items-center justify-between gap-4 bg-background px-6 py-5 sm:px-8"
              >
                <span className="text-sm font-medium text-foreground/90">
                  {product.name}
                </span>
                <span className="font-heading text-lg font-medium italic text-primary">
                  {product.price}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>
      </Container>
    </section>
  );
}
