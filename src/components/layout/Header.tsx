"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronDown, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";

function ServicesDropdown() {
  const [open, setOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleEnter() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  }
  function handleLeave() {
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  }

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const transition = prefersReducedMotion
    ? { duration: 0.01 }
    : { duration: 0.28, ease: [0.16, 1, 0.3, 1] as const };

  return (
    <div className="relative" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className="group relative flex items-center gap-1 py-1 text-base font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        Services
        <ChevronDown
          className={`size-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
        <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-foreground transition-transform duration-200 ease-out group-hover:scale-x-100" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: -10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={transition}
            className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3"
          >
            <div
              aria-hidden
              className="absolute -inset-3 -z-10 rounded-[1.75rem] bg-primary/8 blur-2xl"
            />
            <div className="glass min-w-[280px] rounded-[1.5rem] border border-border/60 p-2.5 shadow-xl shadow-primary/5">
              {siteConfig.servicesMenu.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  role="menuitem"
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: prefersReducedMotion ? 0 : 0.03 * index,
                    duration: 0.22,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="group/item flex items-center justify-between gap-3 rounded-xl px-3.5 py-3 text-sm font-medium text-foreground/85 transition-colors duration-150 hover:bg-muted hover:text-foreground"
                >
                  <span className="flex items-center gap-2.5">
                    <span className="size-1.5 shrink-0 rounded-full bg-secondary/50 transition-all duration-200 group-hover/item:scale-125 group-hover/item:bg-secondary" />
                    {item.label}
                  </span>
                  <ArrowRight className="size-3.5 -translate-x-1 text-secondary opacity-0 transition-all duration-200 group-hover/item:translate-x-0 group-hover/item:opacity-100" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function HeaderCtas() {
  return (
    <div className="hidden items-center gap-2.5 md:flex">
      {/* Call — dark green, static dot. Le seul élément qui bat dans le premier
          écran est le badge disponibilité du Hero : un cœur unique. */}
      <Button
        href={siteConfig.phone.href}
        variant="secondary"
        size="md"
        className="group relative gap-2.5 pl-4 hover:bg-primary-light"
      >
        <span className="inline-flex size-2 rounded-full bg-accent-light" />
        <Phone className="size-4 transition-transform duration-300 group-hover:-rotate-12" />
        <span className="hidden lg:inline">Appelez-nous</span>
        <span className="lg:hidden">Appeler</span>
      </Button>

      {/* Devis gratuit — primary action: gold gradient, shine sweep, arrow slide, hover glow. */}
      <Button
        href="#contact"
        size="md"
        className="group relative overflow-hidden bg-gradient-to-r from-accent-light via-accent to-accent-dark shadow-md hover:shadow-[0_0_30px_6px_rgb(245_196_51_/_0.55)]"
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
        />
        <span className="relative z-10 flex items-center gap-2">
          {siteConfig.cta.freeQuote}
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        </span>
      </Button>
    </div>
  );
}

function CallTicker() {
  const item = (
    <span className="mx-6 inline-flex shrink-0 items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent-light">
      <Phone className="size-3.5" />
      Appelez-nous — {siteConfig.phone.display}
      <span className="ml-6 text-accent-light/40">•</span>
    </span>
  );

  return (
    <a
      href={siteConfig.phone.href}
      aria-label={`${siteConfig.cta.callNow} — ${siteConfig.phone.display}`}
      className="block overflow-hidden border-t border-white/10 bg-primary-dark py-1"
    >
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {Array.from({ length: 8 }).map((_, index) => (
          <span key={index} className="flex shrink-0">
            {item}
          </span>
        ))}
      </div>
    </a>
  );
}

function useScrolled(threshold = 8) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > threshold);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
}

export function Header() {
  const scrolled = useScrolled();

  return (
    <header
      className={cn(
        "glass nav-aurora sticky top-0 z-50 border-b transition-shadow duration-300",
        scrolled ? "border-border/60 shadow-sm" : "border-transparent"
      )}
    >
      <Container className="grid h-16 grid-cols-[1fr_auto] items-center md:h-18 md:grid-cols-[1fr_auto_1fr]">
        <Link href="/" className="flex items-center gap-2.5 justify-self-start">
          <Logo size="md" className="size-14 md:size-16" />
          <span className="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-base font-semibold tracking-tight text-transparent drop-shadow-[0_1px_4px_rgb(30_122_76_/_0.12)] md:text-lg">
            {siteConfig.name}
          </span>
        </Link>

        <nav aria-label="Navigation principale" className="hidden items-center gap-6 lg:gap-8 md:flex md:justify-self-center">
          {siteConfig.nav.map((link) =>
            link.label === "Services" ? (
              <ServicesDropdown key={link.href} />
            ) : (
              <a
                key={link.href}
                href={link.href}
                className="group relative py-1 text-base font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
                <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-foreground transition-transform duration-200 ease-out group-hover:scale-x-100" />
              </a>
            )
          )}
        </nav>

        <div className="flex items-center gap-2 justify-self-end">
          <HeaderCtas />
          <MobileNav />
        </div>
      </Container>

      <CallTicker />
    </header>
  );
}
