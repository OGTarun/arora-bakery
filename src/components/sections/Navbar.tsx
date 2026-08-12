"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { navigation } from "@/data/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [active, setActive] = React.useState(navigation[0]?.href ?? "#home");
  const [open, setOpen] = React.useState(false);

  const navRef = React.useRef<HTMLElement>(null);

  /* Strengthen the glass once the page has scrolled. */
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Track the section currently in view for the active link indicator. */
  React.useEffect(() => {
    const sections = navigation
      .map((item) => document.getElementById(item.href.slice(1)))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  /* Close the mobile menu on Escape or outside pointer-down. */
  React.useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (
        navRef.current &&
        !navRef.current.contains(target) &&
        !(document.getElementById("mobile-nav")?.contains(target) ?? false)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <MotionConfig reducedMotion="user">
      <motion.header
        initial={{ opacity: 0, y: -32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50 flex flex-col items-center px-4 pt-4 sm:px-6 sm:pt-5"
      >
        <nav
          ref={navRef}
          aria-label="Primary"
          className={cn(
            "grid w-full max-w-6xl grid-cols-[1fr_auto_1fr] items-center gap-4 rounded-full border border-white/60 px-3 py-2.5 backdrop-blur-2xl transition-all duration-500 sm:px-4",
            scrolled
              ? "bg-background/85 shadow-float ring-1 ring-white/50"
              : "bg-background/50 shadow-soft"
          )}
        >
          {/* Logo */}
          <Link
            href="#home"
            onClick={closeMenu}
            className="flex w-fit items-center gap-2.5 rounded-full outline-none transition-opacity duration-300 hover:opacity-80 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            aria-label="Arora Bakery — home"
          >
            <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full ring-1 ring-white/30">
              <Image
                src="/logo.png"
                alt="Arora Bakery logo"
                fill
                priority
                sizes="36px"
                className="object-cover"
              />
            </span>
            <span className="font-heading text-xl font-medium leading-none tracking-tight sm:text-[1.375rem]">
              Arora <span className="italic">Bakery</span>
            </span>
          </Link>

          {/* Centered navigation */}
          <ul className="hidden items-center gap-1 md:flex">
            {navigation.map((item) => {
              const isActive = active === item.href;
              return (
                <li key={item.href} className="relative">
                  <Link
                    href={item.href}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "relative flex items-center rounded-full px-4 py-2 text-sm font-medium outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                      isActive
                        ? "text-foreground"
                        : "text-foreground/55 hover:text-foreground"
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-bg"
                        className="absolute inset-0 rounded-full bg-secondary/90 ring-1 ring-primary/15"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* CTA + mobile toggle */}
          <div className="flex items-center justify-end gap-2">
            <Magnetic strength={0.3} radius={60}>
              <Button
                asChild
                size="default"
                className="group h-10 rounded-full px-5 text-sm shadow-glow/0 transition-shadow duration-300 hover:shadow-glow sm:px-6"
              >
                <Link href="#contact" className="gap-1.5">
                  Order Now
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Link>
              </Button>
            </Magnetic>

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              className="flex h-10 w-10 items-center justify-center rounded-full text-foreground outline-none transition-colors duration-300 hover:bg-primary/10 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:hidden"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={open ? "close" : "open"}
                  initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
                  transition={{ duration: 0.2 }}
                  className="flex"
                >
                  {open ? (
                    <X className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <Menu className="h-5 w-5" aria-hidden="true" />
                  )}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              id="mobile-nav"
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="mt-3 w-full max-w-6xl overflow-hidden rounded-3xl border border-white/60 bg-background/90 p-3 shadow-float backdrop-blur-2xl ring-1 ring-white/50"
            >
              <ul className="flex flex-col gap-1">
                {navigation.map((item) => {
                  const isActive = active === item.href;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={closeMenu}
                        aria-current={isActive ? "true" : undefined}
                        className={cn(
                          "flex items-center justify-between rounded-2xl px-4 py-3.5 text-base font-medium outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-ring",
                          isActive
                            ? "bg-secondary text-foreground"
                            : "text-foreground/70 hover:bg-primary/10 hover:text-foreground"
                        )}
                      >
                        {item.label}
                        <ArrowRight
                          className={cn(
                            "h-4 w-4 transition-all duration-300",
                            isActive
                              ? "translate-x-0 opacity-100 text-primary"
                              : "-translate-x-1 opacity-0"
                          )}
                          aria-hidden="true"
                        />
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <Button asChild size="default" className="mt-2 w-full" onClick={closeMenu}>
                <Link href="#contact" className="gap-2">
                  Order Now
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </MotionConfig>
  );
}
