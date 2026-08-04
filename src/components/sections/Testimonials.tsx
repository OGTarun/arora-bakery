"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

import { Container } from "@/components/ui/container";
import { testimonials } from "@/data/site";

const EASE = [0.22, 1, 0.36, 1] as const;

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-surface py-20 md:py-28 lg:py-36"
      aria-labelledby="testimonials-title"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute top-1/3 -left-24 h-96 w-96 rounded-full bg-secondary/40 blur-[120px]" />
        <div className="absolute bottom-0 -right-32 h-80 w-80 rounded-full bg-accent/30 blur-[120px]" />
      </div>

      <Container className="relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="mb-16 max-w-2xl"
        >
          <p className="mb-4 text-lg font-medium uppercase tracking-wide text-primary">
            Kind Words
          </p>
          <h2
            id="testimonials-title"
            className="font-heading text-4xl font-light tracking-tight text-foreground text-balance md:text-5xl lg:text-6xl"
          >
            Loved by our customers
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7"
          role="list"
          aria-label="Customer testimonials"
        >
          {testimonials.map((t) => (
            <motion.figure
              key={t.id}
              variants={cardVariants}
              role="listitem"
              className="flex flex-col justify-between rounded-4xl border border-border/50 bg-card p-7 shadow-sm transition-shadow duration-500 hover:shadow-soft md:p-8"
            >
              <div>
                <div
                  className="mb-5 flex gap-1"
                  aria-label={`Rated ${t.rating} out of 5 stars`}
                >
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-primary text-primary"
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <blockquote className="font-heading text-lg leading-relaxed text-foreground italic">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
              </div>
              <figcaption className="mt-7 flex items-center gap-3 border-t border-border/50 pt-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 font-heading text-base font-medium text-primary">
                  {t.name.charAt(0)}
                </span>
                <span>
                  <span className="block text-sm font-medium text-foreground">
                    {t.name}
                  </span>
                  <span className="block text-xs text-muted-foreground">
                    {t.role}
                  </span>
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
