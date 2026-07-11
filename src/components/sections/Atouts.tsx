"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Bug,
  CalendarClock,
  FileCheck2,
  Home,
  MapPin,
  ShieldCheck,
  Sparkles,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

type Pillar = {
  icon: LucideIcon;
  title: string;
  detail: string;
};

const PILLARS: Pillar[] = [
  {
    icon: Zap,
    title: "Intervention rapide",
    detail: "Un technicien mobilisé sous 24h, où que vous soyez.",
  },
  {
    icon: CalendarClock,
    title: "Disponible 7j/7",
    detail: "Week-ends et jours fériés compris.",
  },
  {
    icon: FileCheck2,
    title: "Devis gratuit",
    detail: "Une estimation claire, sans engagement.",
  },
  {
    icon: ShieldCheck,
    title: "Traitement garanti",
    detail: "Un suivi rigoureux jusqu'à disparition complète du nuisible.",
  },
  {
    icon: MapPin,
    title: "Intervention dans une grande partie de la France",
    detail: "Centre-Val de Loire • Bourgogne-Franche-Comté • Île-de-France et bien au-delà",
  },
  {
    icon: Home,
    title: "Tous types de biens",
    detail: "Maisons • Appartements • Locaux professionnels",
  },
  {
    icon: Bug,
    title: "Tous types de nuisibles pris en charge",
    detail: "Rongeurs • Insectes • Nuisibles volants • Reptiles • Oiseaux • Parasites • Champignons • Et bien d'autres",
  },
];

// Manufacturers/suppliers whose professional equipment we work with. Add new entries here —
// the rotating showcase below picks them up automatically.
type Partner = {
  name: string;
  logo: string;
};

const PARTNERS: Partner[] = [
  { name: "Armosa", logo: "/Armosa.jpg" },
  { name: "Buzzbusters", logo: "/buzbuster.png" },
];

const PARTNER_ROTATE_MS = 3200;

function ProfessionalSolutions() {
  const [active, setActive] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || PARTNERS.length < 2) return;
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % PARTNERS.length);
    }, PARTNER_ROTATE_MS);
    return () => clearInterval(timer);
  }, [prefersReducedMotion]);

  const partner = PARTNERS[active];

  return (
    <Reveal delay={0.1} className="lg:sticky lg:top-24">
      <div className="rounded-[1.75rem] border border-border bg-background p-6 shadow-sm">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-secondary">
          <Sparkles className="size-3.5" />
          Solutions professionnelles utilisées
        </span>
        <p className="mt-2 text-sm text-muted-foreground">
          Des équipements et produits de fabricants reconnus, sélectionnés pour leur fiabilité.
        </p>

        <div className="relative mt-5 flex h-20 items-center justify-center overflow-hidden rounded-2xl border border-border bg-muted/50">
          <AnimatePresence mode="wait">
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -8 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 flex items-center justify-center p-3"
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                width={160}
                height={64}
                className="h-full w-auto object-contain"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-4 flex items-center justify-center gap-1.5">
          {PARTNERS.map((p, index) => (
            <button
              key={p.name}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`Afficher ${p.name}`}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                index === active ? "w-5 bg-secondary" : "w-1.5 bg-border hover:bg-secondary/40"
              )}
            />
          ))}
        </div>

        <p className="mt-4 text-center text-xs leading-relaxed text-muted-foreground/80">
          Nous travaillons avec des solutions professionnelles reconnues dans le domaine de la
          lutte contre les nuisibles.
        </p>
      </div>
    </Reveal>
  );
}

export function Atouts() {
  const [active, setActive] = useState<number | null>(null);
  const prefersReducedMotion = useReducedMotion();

  return (
    <Section id="agence" className="relative overflow-hidden py-10 md:py-12">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-1/3 h-[28rem] w-[28rem] rounded-full bg-secondary/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-0 h-[24rem] w-[24rem] rounded-full bg-accent/10 blur-3xl"
      />

      <Reveal className="relative mx-auto max-w-2xl text-center">
        <span className="text-sm font-semibold uppercase tracking-wider text-secondary">
          Pourquoi nous choisir
        </span>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-balance md:text-3xl">
          Ce qui nous distingue
        </h2>
      </Reveal>

      <div className="relative mt-9 grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:items-start lg:gap-10">
        <StaggerGroup className="mx-auto w-full max-w-2xl lg:mx-0" onMouseLeave={() => setActive(null)}>
          {PILLARS.map((pillar, index) => {
            const Icon = pillar.icon;
            const isActive = active === index;
            const isDimmed = active !== null && !isActive;

            return (
              <StaggerItem key={pillar.title}>
                <div
                  onMouseEnter={() => setActive(index)}
                  className={cn(
                    "group relative flex items-center gap-3 border-b border-border py-3 text-left transition-opacity duration-300 last:border-b-0 sm:gap-5",
                    isDimmed && "opacity-40"
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="atout-indicator"
                      className="absolute -left-4 top-1/2 h-6 w-1 -translate-y-1/2 rounded-full bg-accent sm:-left-6"
                      transition={
                        prefersReducedMotion ? { duration: 0.01 } : { type: "spring", stiffness: 420, damping: 34 }
                      }
                    />
                  )}

                  <span className="hidden font-mono text-sm tabular-nums text-muted-foreground/50 sm:block">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span
                    className={cn(
                      "flex size-9 shrink-0 items-center justify-center rounded-full transition-all duration-300",
                      isActive
                        ? "scale-110 bg-accent text-accent-foreground shadow-[0_0_20px_rgba(245,196,51,0.45)]"
                        : "bg-secondary/10 text-secondary"
                    )}
                  >
                    <Icon className="size-4" />
                  </span>

                  <div className="min-w-0 flex-1">
                    <h3 className="text-base font-semibold tracking-tight text-foreground sm:text-lg">
                      {pillar.title}
                    </h3>
                    <p className="mt-0.5 text-sm text-muted-foreground">{pillar.detail}</p>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>

        <ProfessionalSolutions />
      </div>
    </Section>
  );
}
