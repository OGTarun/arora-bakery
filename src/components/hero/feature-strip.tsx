"use client";

import { motion } from "framer-motion";
import { BadgeCheck, Cake, Leaf, Sun } from "lucide-react";

import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

interface FeatureStripProps {
  className?: string;
}

const EASE = [0.22, 1, 0.36, 1] as const;

const features = [
  {
    icon: Sun,
    title: "Freshly Baked Daily",
    desc: "From our ovens each morning",
  },
  {
    icon: Leaf,
    title: "Premium Ingredients",
    desc: "Sourced with uncompromising care",
  },
  {
    icon: Cake,
    title: "Custom Celebration Cakes",
    desc: "Designed around your moment",
  },
  {
    icon: BadgeCheck,
    title: "Trusted Since 1998",
    desc: "Two decades of craft and love",
  },
];

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const parent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 1.2 } },
};

export function FeatureStrip({ className }: FeatureStripProps) {
  return (
    <div className={cn("relative z-20", className)}>
      <Container>
        <motion.div
          variants={parent}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)] lg:grid-cols-4"
        >
          {features.map((f) => (
            <motion.div
              key={f.title}
              variants={item}
              className="group flex flex-col gap-2.5 bg-white/[0.02] p-6 sm:p-7"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#e8b765]/25 bg-[#e8b765]/10 text-[#ecc27e] transition-colors duration-500 group-hover:bg-[#e8b765] group-hover:text-[#1a0f09]">
                <f.icon className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
              </span>
              <span>
                <span className="block text-sm font-medium text-[#f5e9da]">
                  {f.title}
                </span>
                <span className="mt-0.5 block text-xs text-[#b99d84]">
                  {f.desc}
                </span>
              </span>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </div>
  );
}