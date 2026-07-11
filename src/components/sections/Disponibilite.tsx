"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useMotionValue, useReducedMotion } from "framer-motion";
import { CalendarClock, CheckCircle2, Clock3, Sparkles, type LucideIcon } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { requestQuoteForCity } from "@/lib/quoteEvents";

const AVAILABILITY_BADGES: { icon: LucideIcon; label: string }[] = [
  { icon: Clock3, label: "24h/24" },
  { icon: CalendarClock, label: "7j/7" },
  { icon: CheckCircle2, label: "Week-ends inclus" },
  { icon: Sparkles, label: "Jours fériés inclus" },
];

type Hub = { name: string; short: string; x: number; y: number; primary?: boolean };

// Rough relative placement (0–100 in both axes) of our main hubs around Orléans. Abstract,
// not a literal map — the coverage rings convey the wide intervention radius.
const HUBS: Hub[] = [
  { name: "Paris / Île-de-France", short: "Paris", x: 60, y: 12 },
  { name: "Chartres", short: "Chartres", x: 30, y: 24 },
  { name: "Sens", short: "Sens", x: 84, y: 26 },
  { name: "Auxerre", short: "Auxerre", x: 80, y: 46 },
  { name: "Orléans", short: "Orléans", x: 48, y: 48, primary: true },
  { name: "Blois", short: "Blois", x: 26, y: 58 },
  { name: "Tours", short: "Tours", x: 12, y: 70 },
  { name: "Bourges", short: "Bourges", x: 62, y: 72 },
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

function LiveDot() {
  return (
    <span className="relative flex size-2">
      <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
      <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
    </span>
  );
}

function CoverageMap() {
  const prefersReducedMotion = useReducedMotion();
  const primary = HUBS.find((hub) => hub.primary)!;

  return (
    <div className="relative aspect-square w-full max-w-xs">
      {/* Stylised map canvas: faint dot grid + soft coverage glow */}
      <div
        aria-hidden
        className="absolute inset-0 rounded-3xl border border-white/50 bg-white/30 shadow-inner backdrop-blur-sm [background-image:radial-gradient(circle,rgb(18_68_44_/_0.09)_1px,transparent_1px)] [background-size:18px_18px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute rounded-full bg-[radial-gradient(circle,var(--secondary-light)_0%,transparent_70%)] opacity-30 blur-lg"
        style={{ left: `${primary.x}%`, top: `${primary.y}%`, width: "78%", height: "78%", transform: "translate(-50%, -50%)" }}
      />

      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
        {/* Static range rings around the primary hub */}
        {[18, 30, 42].map((r) => (
          <circle
            key={r}
            cx={primary.x}
            cy={primary.y}
            r={r}
            fill="none"
            className="stroke-secondary/25"
            strokeWidth={0.4}
            strokeDasharray="1.6 2.4"
          />
        ))}

        {/* Sonar-style pulses radiating outward — the "coverage" cue (no straight connectors) */}
        {!prefersReducedMotion &&
          [0, 1].map((i) => (
            <motion.circle
              key={i}
              cx={primary.x}
              cy={primary.y}
              fill="none"
              className="stroke-accent"
              strokeWidth={0.6}
              initial={{ r: 5, opacity: 0.55 }}
              animate={{ r: [5, 44], opacity: [0.55, 0] }}
              transition={{ duration: 4.2, repeat: Infinity, delay: i * 2.1, ease: "easeOut" }}
            />
          ))}
      </svg>

      {/* Clickable city markers */}
      {HUBS.map((hub) => (
        <button
          key={hub.name}
          type="button"
          onClick={() => requestQuoteForCity(hub.name)}
          style={{ left: `${hub.x}%`, top: `${hub.y}%` }}
          aria-label={`Intervention à ${hub.name}`}
          className={`group absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full border shadow-md backdrop-blur-sm transition-all duration-200 hover:z-10 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
            hub.primary
              ? "border-white bg-accent px-3 py-1.5 text-xs font-bold text-accent-foreground shadow-[0_0_18px_rgba(245,196,51,0.6)]"
              : "border-border bg-background/90 px-2.5 py-1 text-[11px] font-semibold text-foreground/85 hover:border-accent hover:text-foreground"
          }`}
        >
          <span className="flex items-center gap-1">
            <span
              className={`inline-block size-1.5 rounded-full ${
                hub.primary ? "bg-accent-foreground" : "bg-secondary group-hover:bg-accent"
              }`}
            />
            {hub.primary ? hub.name : hub.short}
          </span>
        </button>
      ))}

      {/* Makes it obvious the listed cities are only examples of our coverage. */}
      <a
        href="#contact"
        style={{ left: "50%", top: "91%" }}
        className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-dashed border-secondary/60 bg-background/85 px-3 py-1 text-[11px] font-semibold text-muted-foreground shadow-sm backdrop-blur-sm transition-colors hover:border-accent hover:text-foreground"
      >
        + autres villes
      </a>
    </div>
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
          Une équipe mobilisée en permanence, week-ends et jours fériés inclus.
        </p>
      </Reveal>

      <Reveal delay={0.1} className="relative mx-auto mt-9 max-w-5xl">
        <div className="overflow-hidden rounded-[2rem] border border-white/60 bg-white/40 shadow-xl backdrop-blur-2xl">
          <div className="grid gap-0 lg:grid-cols-[1.05fr_1fr]">
            <div className="flex flex-col items-center justify-center gap-3 border-b border-white/50 p-6 lg:border-b-0 lg:border-r">
              <CoverageMap />
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
                    <AnimatedStat value={200} prefix="+" />
                  </p>
                  <p className="mt-1 text-sm font-medium text-foreground/80">interventions réalisées</p>
                  <p className="text-xs text-muted-foreground">Partout en France</p>
                </div>

                <div>
                  <span className="mb-1.5 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-emerald-700">
                    <LiveDot />
                    En ligne
                  </span>
                  <p className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    <AnimatedStat value={3} />
                  </p>
                  <p className="mt-1 text-sm font-medium text-foreground/80">
                    techniciens disponibles actuellement
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
