"use client";

import { motion } from "framer-motion";
import { Clock, MapPin, Phone, Map as MapIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { contactInfo } from "@/data/site";

const EASE = [0.22, 1, 0.36, 1] as const;

const MAP_EMBED =
  "https://www.google.com/maps?q=30.7032881,76.2256451&z=15&output=embed";
const MAP_LINK =
  "https://www.google.com/maps/search/?api=1&query=30.7032881,76.2256451";

const details = [
  {
    icon: MapPin,
    label: "Address",
    value: contactInfo.address,
  },
  {
    icon: Phone,
    label: "Phone",
    value: contactInfo.phone,
    href: `tel:${contactInfo.phone.replace(/\s+/g, "")}`,
  },
];

export function VisitUs() {
  const hoursLines = contactInfo.hours.split("\n");

  return (
    <section
      id="contact"
      className="relative bg-background py-20 md:py-28 lg:py-36"
      aria-labelledby="visit-title"
    >
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="mb-14 max-w-2xl"
        >
          <p className="mb-4 text-lg font-medium uppercase tracking-wide text-primary">
            Visit Us
          </p>
          <h2
            id="visit-title"
            className="font-heading text-4xl font-light tracking-tight text-foreground text-balance md:text-5xl lg:text-6xl"
          >
            Find us in Khanna
          </h2>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14 items-center">
          {/* Details */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <ul className="space-y-6">
              {details.map((d) => (
                <li key={d.label} className="flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <d.icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                      {d.label}
                    </p>
                    {d.href ? (
                      <a
                        href={d.href}
                        className="mt-1 inline-block font-heading text-xl text-foreground transition-colors hover:text-primary"
                      >
                        {d.value}
                      </a>
                    ) : (
                      <p className="mt-1 font-heading text-xl text-foreground">
                        {d.value}
                      </p>
                    )}
                  </div>
                </li>
              ))}

              <li className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Clock className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                    Opening hours
                  </p>
                  {hoursLines.map((line) => (
                    <p key={line} className="mt-1 font-heading text-xl text-foreground">
                      {line}
                    </p>
                  ))}
                </div>
              </li>
            </ul>

            <div className="mt-10">
              <Button asChild size="lg" variant="outline">
                <a
                  href={MAP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MapIcon className="h-4 w-4" aria-hidden="true" />
                  Get Directions
                </a>
              </Button>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: EASE }}
            className="relative aspect-[4/3] overflow-hidden rounded-4xl border border-border/50 shadow-soft"
          >
            <iframe
              src={MAP_EMBED}
              title="Arora Bakery location map"
              className="h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
