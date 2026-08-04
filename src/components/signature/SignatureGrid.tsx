"use client";

import { motion } from "framer-motion";

import { SignatureCard } from "./SignatureCard";
import { signatureItems } from "./signature-data";

const gridVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

export function SignatureGrid() {
  return (
    <motion.div
      variants={gridVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 no-scrollbar md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 md:pb-0 lg:gap-7"
      role="list"
      aria-label="Signature collection"
    >
      {signatureItems.map((item, index) => (
        <SignatureCard key={item.id} item={item} index={index} />
      ))}
    </motion.div>
  );
}
