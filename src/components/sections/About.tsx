"use client";

import * as React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { aboutContent } from "@/data/site";

export function About() {
  return (
    <section
      id="about"
      className="py-20 md:py-28 lg:py-36 bg-surface"
      aria-labelledby="about-title"
    >
      <Container size="xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative aspect-[4/5] max-w-lg mx-auto lg:mx-0">
            <Image
              src="https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=800&q=80"
              alt="Arora Bakery interior showing fresh baked goods on display"
              fill
              className="object-cover rounded-4xl shadow-xl"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>

          <div>
            <p className="mb-4 text-lg font-medium text-primary tracking-wide uppercase">
              {aboutContent.subtitle}
            </p>
            <h2
              id="about-title"
              className="mb-8 font-heading text-4xl md:text-5xl lg:text-6xl font-light text-foreground tracking-tight text-balance"
            >
              {aboutContent.title}
            </h2>

            <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
              {aboutContent.description.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-12 grid grid-cols-2 gap-8">
              {aboutContent.stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="font-heading text-4xl md:text-5xl font-bold text-primary">
                    {stat.value}
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}