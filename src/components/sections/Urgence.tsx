"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CalendarClock, Phone, Siren, Zap } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { siteConfig } from "@/config/site";

const highlights = [
  { icon: CalendarClock, label: "Disponible 7j/7, jours fériés compris" },
  { icon: Zap, label: "Intervention rapide sous 24h" },
  { icon: Siren, label: "Prise en charge immédiate par téléphone" },
];

export function Urgence() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Section
      id="urgence"
      variant="accent"
      className="relative overflow-hidden py-8 text-center md:py-11"
    >
      <div
        aria-hidden
        className="bg-grain pointer-events-none absolute inset-0 opacity-40 mix-blend-overlay"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-dark/10 blur-3xl"
      />

      <Reveal className="relative mx-auto flex max-w-2xl flex-col items-center gap-3">
        <motion.span
          className="inline-flex size-11 items-center justify-center rounded-full bg-accent-foreground/10"
          animate={prefersReducedMotion ? undefined : { scale: [1, 1.08, 1] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Siren className="size-5" />
        </motion.span>

        <h2 className="text-2xl font-semibold tracking-tight text-balance md:text-3xl">
          Une urgence nuisible ? On intervient vite.
        </h2>

        <p className="text-base text-accent-foreground/80">
          Rats, guêpes, punaises de lit... certaines situations ne peuvent pas attendre.
          Appelez-nous, un technicien vous répond directement pour organiser une
          intervention rapide.
        </p>

        <Button href={siteConfig.phone.href} variant="secondary" size="lg">
          <Phone className="size-5" />
          {siteConfig.cta.callNow} — {siteConfig.phone.display}
        </Button>

        <StaggerGroup className="mt-1.5 grid grid-cols-1 gap-2.5 sm:grid-cols-3 sm:gap-6">
          {highlights.map(({ icon: Icon, label }) => (
            <StaggerItem
              key={label}
              className="flex items-center justify-center gap-2 text-sm font-medium"
            >
              <Icon className="size-4" />
              {label}
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Reveal>
    </Section>
  );
}
