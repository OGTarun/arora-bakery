"use client";

import * as React from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

import { Container } from "@/components/ui/container";
import { galleryImages } from "@/data/site";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

const itemVariants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: EASE } },
};

const aspectMap = [
  "aspect-[4/5]",
  "aspect-square",
  "aspect-[4/5]",
  "aspect-square",
];

export function Gallery() {
  const [lightbox, setLightbox] = React.useState<number | null>(null);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

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

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
          }}
          className="columns-2 gap-3 px-4 md:columns-3 md:gap-4 md:px-6 lg:columns-4"
          role="list"
          aria-label="Gallery images"
        >
          {galleryImages.map((image, index) => (
            <motion.button
              key={index}
              type="button"
              variants={itemVariants}
              onClick={() => setLightbox(index)}
              className={cn(
                "group mb-3 block w-full cursor-pointer overflow-hidden rounded-3xl md:mb-4",
                aspectMap[index % aspectMap.length]
              )}
              aria-label={`View gallery image ${index + 1}`}
            >
              <span className="relative block h-full w-full">
                <Image
                  src={image}
                  alt={`Arora Bakery creation ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </span>
            </motion.button>
          ))}
        </motion.div>
      </Container>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && galleryImages[lightbox] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-dark/95 p-6"
            onClick={() => setLightbox(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Gallery lightbox"
          >
            <button
              type="button"
              onClick={() => setLightbox(null)}
              aria-label="Close"
              className="absolute top-6 right-6 flex h-11 w-11 items-center justify-center rounded-full border border-foreground/30 text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
            <motion.div
              initial={{ opacity: 0, scale: 0.93 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="relative max-h-[85vh] max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={galleryImages[lightbox]}
                alt={`Arora Bakery creation ${lightbox + 1}`}
                width={1200}
                height={800}
                className="max-h-[85vh] w-auto rounded-2xl object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
