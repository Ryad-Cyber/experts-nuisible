"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { animate, useInView, useMotionValue, useReducedMotion } from "framer-motion";
import { Activity, ArrowRight, CalendarClock, CheckCircle2, type LucideIcon } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CoverageMap } from "./CoverageMap";

// Le titre de la section dit déjà « Disponible 24h/24 » : les chips ne répètent
// pas, elles précisent (week-ends, fériés — ce que peu de confrères couvrent).
const AVAILABILITY_BADGES: { icon: LucideIcon; label: string }[] = [
  { icon: CheckCircle2, label: "Week-ends inclus" },
  { icon: CalendarClock, label: "Jours fériés inclus" },
];

function AnimatedStat({ value, prefix = "" }: { value: number; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  // margin: "0px" (not a negative inset) so the stat still counts up as soon as any part of it
  // enters the viewport — a negative margin could fail to ever trigger on short mobile screens.
  const isInView = useInView(ref, { once: true, margin: "0px" });
  const prefersReducedMotion = useReducedMotion();
  const motionValue = useMotionValue(0);
  const hasAnimated = useRef(false);
  // Start already showing the final value: if the in-view animation never fires (e.g. the
  // element is already on screen before hydration, or intersection timing is unlucky on
  // mobile), the stat still reads correctly instead of getting stuck at "0".
  const [display, setDisplay] = useState(value.toLocaleString("fr-FR"));

  useEffect(() => {
    return motionValue.on("change", (latest) => {
      setDisplay(Math.round(latest).toLocaleString("fr-FR"));
    });
  }, [motionValue]);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;
    if (prefersReducedMotion) {
      motionValue.set(value);
      return;
    }
    motionValue.set(0);
    const controls = animate(motionValue, value, { duration: 1.8, ease: [0.16, 1, 0.3, 1] });
    return () => controls.stop();
  }, [isInView, value, prefersReducedMotion, motionValue]);

  return (
    <span ref={ref}>
      {prefix}
      {display}
    </span>
  );
}

export function Disponibilite() {
  return (
    <Section
      id="disponibilite"
      className="relative overflow-hidden bg-gradient-to-br from-muted via-background to-muted"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-10 h-[26rem] w-[26rem] rounded-full bg-secondary/15 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 bottom-0 h-[24rem] w-[24rem] rounded-full bg-accent/15 blur-3xl"
      />

      <Reveal className="relative mx-auto max-w-2xl text-center">
        <span className="text-sm font-semibold uppercase tracking-wider text-secondary">
          Disponibilité
        </span>
        <h2 className="mt-2.5 text-2xl font-semibold tracking-tight text-balance md:text-3xl">
          Disponible 24h/24, partout où vous êtes
        </h2>
        <p className="mt-3 text-base text-muted-foreground">
          Une équipe mobilisée en permanence, week-ends et jours fériés inclus, auprès des
          particuliers comme des professionnels.
        </p>
      </Reveal>

      <Reveal delay={0.1} className="relative mx-auto mt-9 max-w-5xl">
        <div className="overflow-hidden rounded-[2rem] border border-white/60 bg-white/40 shadow-xl backdrop-blur-2xl">
          <div className="grid gap-0 lg:grid-cols-[1.05fr_1fr]">
            <div className="flex flex-col items-center justify-center gap-3 border-b border-white/50 p-6 lg:border-b-0 lg:border-r">
              <CoverageMap moreHref="/zones-intervention" />
              <p className="text-center text-xs text-muted-foreground">
                Cliquez sur un secteur pour préparer votre demande de devis.
              </p>
            </div>

            <div className="flex flex-col justify-center gap-6 p-6 sm:p-8">
              <div className="flex flex-wrap gap-2">
                {AVAILABILITY_BADGES.map(({ icon: Icon, label }) => (
                  <span
                    key={label}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/70 bg-white/70 px-2.5 py-1 text-xs font-semibold text-foreground shadow-sm backdrop-blur-sm"
                  >
                    <Icon className="size-3.5 text-accent-dark" />
                    {label}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <p className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    <AnimatedStat value={500} prefix="+" />
                  </p>
                  <p className="mt-1 text-sm font-medium text-foreground/80">interventions réalisées</p>
                  <p className="text-xs text-muted-foreground">Dans de nombreuses agglomérations</p>
                </div>

                {/* Fait déjà revendiqué sur tout le site (Hero, Urgence) — pas de compteur
                    "temps réel" simulé ici, uniquement des engagements vérifiables. */}
                <div>
                  <p className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    &lt;&nbsp;24h
                  </p>
                  <p className="mt-1 text-sm font-medium text-foreground/80">
                    délai d&apos;intervention en urgence
                  </p>
                  <p className="text-xs text-muted-foreground">Un technicien vous répond directement</p>
                </div>
              </div>

              {/* Signal d'activité qualitatif — honnête, sans chiffre ni compteur :
                  montre une présence terrain régulière (particuliers + professionnels). */}
              <div className="flex items-center gap-2.5 rounded-xl border border-white/60 bg-white/50 px-3.5 py-2.5">
                <Activity className="size-4 shrink-0 text-secondary" />
                <p className="text-xs font-medium text-foreground/80">
                  Des interventions régulières chaque semaine dans la région, auprès des
                  particuliers comme des professionnels.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Teaser : la profondeur (régions + départements) vit sur /zones-intervention.
          Ici, un seul lien vers la page dédiée — la homepage reste courte. */}
      <Reveal className="relative mt-7 text-center">
        <Link
          href="/zones-intervention"
          className="group inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground shadow-sm transition-colors hover:border-secondary/50"
        >
          Voir toute notre zone d&apos;intervention
          <ArrowRight className="size-4 text-secondary transition-transform duration-300 group-hover:translate-x-0.5" />
        </Link>
      </Reveal>
    </Section>
  );
}
