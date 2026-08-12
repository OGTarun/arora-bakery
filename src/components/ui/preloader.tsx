"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

export function Preloader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches;
    const timer = setTimeout(() => setVisible(false), reduced ? 300 : 1700);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden="true"
        >
          <motion.div
            className="flex flex-col items-center gap-6"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="relative h-20 w-20 overflow-hidden rounded-full ring-2 ring-primary/30">
              <Image
                src="/logo.png"
                alt="Arora Bakery logo"
                fill
                priority
                sizes="80px"
                className="object-cover"
              />
            </span>
            <span className="font-heading text-2xl font-medium tracking-tight text-foreground">
              Arora <span className="italic text-primary">Bakery</span>
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
