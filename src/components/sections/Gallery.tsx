"use client";

import * as React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { galleryImages } from "@/data/site";

export function Gallery() {
  return (
    <section
      id="gallery"
      className="py-20 md:py-28 lg:py-36 bg-surface"
      aria-labelledby="gallery-title"
    >
      <Container size="full" className="px-0">
        <div className="mb-12 md:mb-16 px-6 md:px-12 lg:px-20 xl:px-28">
          <p className="mb-4 text-lg font-medium text-primary tracking-wide uppercase">
            Visual Journey
          </p>
          <h2
            id="gallery-title"
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-light text-foreground tracking-tight text-balance"
          >
            Our Gallery
          </h2>
        </div>

        <div
          className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-8 px-4 md:px-6"
          role="list"
          aria-label="Gallery images"
        >
          {galleryImages.map((image, index) => {
            const spanMap: Record<number, { col: number; row: number }> = {
              0: { col: 4, row: 2 },
              1: { col: 4, row: 2 },
              2: { col: 4, row: 2 },
              3: { col: 4, row: 2 },
              4: { col: 4, row: 2 },
              5: { col: 4, row: 2 },
              6: { col: 4, row: 2 },
              7: { col: 4, row: 2 },
            };

            const layout = spanMap[index] || { col: 4, row: 2 };

            return (
              <article
                key={index}
                className={`
                  relative overflow-hidden
                  lg:col-span-${layout.col}
                  lg:row-span-${layout.row}
                  aspect-square lg:aspect-auto
                  min-h-[200px] lg:min-h-[400px]
                `}
                role="listitem"
              >
                <Image
                  src={image}
                  alt={`Arora Bakery gallery image ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 12.5vw"
                />
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}