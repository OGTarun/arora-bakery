"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import type { SignatureItem } from "./signature-data";

const EASE = [0.22, 1, 0.36, 1] as const;

interface SignatureCardProps {
  item: SignatureItem;
  index: number;
}

export function SignatureCard({ item, index }: SignatureCardProps) {
  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 36 },
        show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
      }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      className="group relative flex w-[78vw] max-w-[22rem] shrink-0 snap-start flex-col overflow-hidden rounded-4xl border border-white/60 bg-white/55 shadow-soft backdrop-blur-xl transition-shadow duration-500 hover:shadow-float md:w-auto md:max-w-none"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(max-width: 768px) 78vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-40" />
        <span className="absolute top-4 right-4 rounded-full border border-white/40 bg-white/60 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.18em] text-foreground/80 backdrop-blur-md">
          {item.category}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-heading text-2xl font-medium tracking-tight text-foreground">
            {item.name}
          </h3>
          <span className="font-heading text-sm italic text-primary/70">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {item.description}
        </p>
        <a
          href="#contact"
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors duration-300 hover:text-foreground"
        >
          Order now
          <ArrowUpRight
            className="h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </a>
      </div>
    </motion.article>
  );
}
