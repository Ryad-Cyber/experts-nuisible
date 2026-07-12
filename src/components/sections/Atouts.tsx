"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { BadgeCheck, Bug, Home, ShieldCheck, type LucideIcon } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

type Pillar = {
  icon: LucideIcon;
  title: string;
  detail: string;
};

// Uniquement les vrais différenciateurs — le rapide/7j-7/devis gratuit/zone vivent déjà
// dans le Hero, EtapesAppel et Disponibilite : les répéter ici diluerait ces quatre points.
const PILLARS: Pillar[] = [
  {
    icon: Bug,
    title: "Tous les nuisibles, sans exception",
    detail: "Rongeurs • Insectes • Volants • Reptiles • Oiseaux • Parasites • Champignons",
  },
  {
    icon: Home,
    title: "Particuliers et professionnels",
    detail: "Maisons • Appartements • Commerces • Locaux professionnels",
  },
  {
    icon: BadgeCheck,
    title: "Techniciens certifiés Certibiocide",
    detail: "Certification du ministère de l'Agriculture pour l'usage des produits biocides.",
  },
  {
    icon: ShieldCheck,
    title: "Suivi jusqu'à disparition complète",
    detail: "Nouvelle intervention sans frais si le nuisible réapparaît sous 30 jours.",
  },
];

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

      <StaggerGroup
        className="relative mx-auto mt-9 w-full max-w-2xl"
        onMouseLeave={() => setActive(null)}
      >
        {PILLARS.map((pillar, index) => {
          const Icon = pillar.icon;
          const isActive = active === index;
          const isDimmed = active !== null && !isActive;

          return (
            <StaggerItem key={pillar.title}>
              <div
                onMouseEnter={() => setActive(index)}
                className={cn(
                  "group relative flex items-center gap-3 border-b border-border py-3.5 text-left transition-opacity duration-300 last:border-b-0 sm:gap-5",
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
    </Section>
  );
}
