"use client";

import { useState } from "react";
import Link from "next/link";
import { Wheat, ArrowRight, Share2, Globe } from "lucide-react";

import { Container } from "@/components/ui/container";
import { contactInfo, navigation } from "@/data/site";

const socials = [
  { label: "Share", icon: Share2, href: "#" },
  { label: "Website", icon: Globe, href: "#" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const onSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
  };

  return (
    <footer className="bg-dark text-surface" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Arora Bakery footer
      </h2>

      <Container className="py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.4fr]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-primary">
                <Wheat className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="font-heading text-xl font-medium tracking-tight">
                Arora <span className="italic">Bakery</span>
              </span>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-surface/65">
              A little bakery in Khanna crafting slow, honest and beautiful
              baked goods since 1987.
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-surface/20 text-surface/70 transition-colors duration-300 hover:border-primary hover:text-primary"
                >
                  <s.icon className="h-4 w-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer">
            <p className="text-xs font-medium uppercase tracking-wider text-surface/50">
              Navigation
            </p>
            <ul className="mt-5 space-y-3">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-surface/75 transition-colors duration-300 hover:text-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-surface/50">
              Contact
            </p>
            <ul className="mt-5 space-y-3 text-sm text-surface/75">
              <li>{contactInfo.address}</li>
              <li>
                <a
                  href={`tel:${contactInfo.phone.replace(/\s+/g, "")}`}
                  className="transition-colors hover:text-primary"
                >
                  {contactInfo.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="transition-colors hover:text-primary"
                >
                  {contactInfo.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-surface/50">
              Newsletter
            </p>
            <p className="mt-5 text-sm leading-relaxed text-surface/65">
              Fresh arrivals and seasonal specials, straight to your inbox.
            </p>
            {subscribed ? (
              <p className="mt-4 text-sm font-medium text-primary">
                Thank you — you&apos;re on the list.
              </p>
            ) : (
              <form onSubmit={onSubscribe} className="mt-4 flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  aria-label="Email address"
                  className="h-11 w-full rounded-full border border-surface/20 bg-surface/5 px-4 text-sm text-surface placeholder-surface/40 outline-none transition-colors focus:border-primary"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-dark transition-opacity hover:opacity-90"
                >
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-14 flex items-center justify-between border-t border-surface/10 pt-7 text-xs text-surface/40">
          <p>© {new Date().getFullYear()} Arora Bakery, Khanna</p>
          <p>Baked with love.</p>
        </div>
      </Container>
    </footer>
  );
}
