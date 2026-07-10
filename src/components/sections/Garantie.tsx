"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, Phone, ShieldCheck } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { siteConfig } from "@/config/site";

const POINTS = [
  "Nouvelle intervention sans frais si le nuisible réapparaît",
  "Suivi jusqu'à disparition complète",
  "Techniciens certifiés & produits homologués",
];

function GuaranteeMedallion() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="relative flex aspect-square w-52 items-center justify-center sm:w-60">
      {/* Soft glow behind the medallion */}
      <div aria-hidden className="absolute inset-4 rounded-full bg-accent/25 blur-2xl" />

      {/* Rotating dashed ring */}
      <motion.svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full text-accent"
        aria-hidden
        animate={prefersReducedMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        <circle
          cx="50"
          cy="50"
          r="46"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="2 4"
          strokeLinecap="round"
          opacity="0.6"
        />
      </motion.svg>

      {/* Counter-rotating inner ring */}
      <motion.svg
        viewBox="0 0 100 100"
        className="absolute inset-5 text-secondary"
        aria-hidden
        animate={prefersReducedMotion ? undefined : { rotate: -360 }}
        transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
      >
        <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.35" />
      </motion.svg>

      {/* Glass core */}
      <div className="relative flex size-36 flex-col items-center justify-center rounded-full border border-white/60 bg-white/60 text-center shadow-xl backdrop-blur-xl sm:size-40">
        <span className="text-5xl font-bold leading-none tracking-tight text-foreground sm:text-6xl">
          30
        </span>
        <span className="mt-1 text-base font-semibold text-accent-dark">jours</span>
        <span className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
          Garantie résultat
        </span>
      </div>
    </div>
  );
}

export function Garantie() {
  return (
    <Section id="garantie" className="relative overflow-hidden py-10 md:py-12">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 bottom-0 hidden h-[24rem] w-[24rem] rounded-full bg-secondary/10 blur-3xl lg:block"
      />

      <div className="relative grid items-center gap-8 lg:grid-cols-[auto_1fr] lg:gap-12">
        <Reveal className="flex justify-center lg:justify-start">
          <GuaranteeMedallion />
        </Reveal>

        <Reveal delay={0.1} className="max-w-xl text-center lg:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-4 py-1.5 text-sm font-semibold text-secondary">
            <ShieldCheck className="size-4" />
            Garantie résultat
          </span>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-balance md:text-3xl">
            Votre tranquillité est notre priorité
          </h2>
          <p className="mt-2.5 text-base text-muted-foreground">
            Si les nuisibles réapparaissent dans les 30 jours suivant notre intervention,
            notre équipe intervient à nouveau sans frais supplémentaires.
          </p>

          <ul className="mt-5 flex flex-col gap-2.5">
            {POINTS.map((point) => (
              <li
                key={point}
                className="flex items-center gap-3 text-sm font-medium text-foreground/90 lg:justify-start"
              >
                <CheckCircle2 className="size-5 shrink-0 text-secondary" />
                {point}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row lg:items-start">
            <Button href="#contact" size="lg">
              Demander une intervention
            </Button>
            <Button href={siteConfig.phone.href} variant="secondary" size="lg">
              <Phone className="size-5" />
              {siteConfig.phone.display}
            </Button>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
