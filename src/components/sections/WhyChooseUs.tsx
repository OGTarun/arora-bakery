"use client";

import * as React from "react";
import { Container } from "@/components/ui/container";
import { Card, CardContent } from "@/components/ui/card";
import { features } from "@/data/site";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ReactNode> = {
  leaf: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  sun: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
  heart: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ),
  sparkles: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
};

export function WhyChooseUs() {
  return (
    <section
      id="why-choose-us"
      className="py-20 md:py-28 lg:py-36 bg-background"
      aria-labelledby="why-choose-title"
    >
      <Container>
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <p className="mb-4 text-lg font-medium text-primary tracking-wide uppercase">
            Our Promise
          </p>
          <h2
            id="why-choose-title"
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-light text-foreground tracking-tight text-balance"
          >
            Why Choose Us
          </h2>
          <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
            Three decades of dedication to the craft of baking, serving Khanna with pride.
          </p>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          role="list"
          aria-label="Why choose us features"
        >
          {features.map((feature) => (
            <article
              key={feature.id}
              className="group"
              role="listitem"
            >
              <Card className="h-full border-border/50 hover:border-primary/30 transition-colors duration-300">
                <CardContent className="p-6 text-center">
                  <div
                    className={cn(
                      "inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 text-primary mb-6 transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground"
                    )}
                    aria-hidden="true"
                  >
                    {iconMap[feature.icon]}
                  </div>
                  <h3 className="font-heading text-xl font-medium text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}