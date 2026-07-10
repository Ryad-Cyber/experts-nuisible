"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { ArrowRight, Home, MousePointerClick, Sofa } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { HOUSE_ZONE_BY_ID, PRIMARY_HOUSE_ZONES } from "@/data/houseZones";
import { requestQuoteForZone } from "@/lib/quoteEvents";
import type { HouseView } from "@/components/three/HouseScene";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const HouseScene = dynamic(() => import("@/components/three/HouseScene"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <div className="size-10 animate-spin rounded-full border-2 border-border border-t-secondary" />
    </div>
  ),
});

function useWebglSupport() {
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    // WebGL capability can only be probed client-side; defaulting to `true` keeps
    // server and first client render identical, then this corrects it post-mount.
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSupported(Boolean(gl));
    } catch {
      setSupported(false);
    }
  }, []);

  return supported;
}

function useScrollTilt(reducedMotion: boolean) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion || !ref.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { rotateX: 6, scale: 0.96, transformPerspective: 1000 },
        {
          rotateX: 0,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top bottom",
            end: "top center",
            scrub: 0.5,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [reducedMotion]);

  return ref;
}

function ZoneFallbackGrid({
  selected,
  onSelect,
}: {
  selected: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {PRIMARY_HOUSE_ZONES.map((zone) => {
        const Icon = zone.icon;
        const isActive = selected === zone.id;
        return (
          <button
            key={zone.id}
            type="button"
            onClick={() => onSelect(zone.id)}
            className={`flex flex-col items-center gap-2 rounded-xl border px-3 py-5 text-sm font-medium transition-colors ${
              isActive
                ? "border-accent bg-accent/10 text-foreground"
                : "border-border bg-background text-muted-foreground hover:border-secondary/40"
            }`}
          >
            <Icon className="size-5" />
            {zone.label}
          </button>
        );
      })}
    </div>
  );
}

const VIEW_OPTIONS: { id: HouseView; label: string; icon: typeof Home }[] = [
  { id: "exterior", label: "Extérieur", icon: Home },
  { id: "interior", label: "Intérieur", icon: Sofa },
];

function ViewToggle({
  view,
  onChange,
}: {
  view: HouseView;
  onChange: (view: HouseView) => void;
}) {
  return (
    <div className="inline-flex items-center gap-0.5 rounded-full border border-border bg-background/90 p-1 shadow-sm backdrop-blur-sm">
      {VIEW_OPTIONS.map((option) => {
        const isActive = view === option.id;
        const Icon = option.icon;
        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onChange(option.id)}
            aria-pressed={isActive}
            aria-label={`Vue ${option.label.toLowerCase()}`}
            className={`relative flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-medium transition-colors sm:px-3 ${
              isActive ? "text-accent-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="house-view-pill"
                className="absolute inset-0 rounded-full bg-accent"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            )}
            <span className="relative flex items-center gap-1.5">
              <Icon className="size-3.5" />
              <span className="hidden sm:inline">{option.label}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

export function Configurateur() {
  const [selected, setSelected] = useState<string | null>(null);
  const [view, setView] = useState<HouseView>("exterior");
  const prefersReducedMotion = useReducedMotion();
  const webglSupported = useWebglSupport();
  const tiltRef = useScrollTilt(Boolean(prefersReducedMotion));

  const activeZone = useMemo(
    () => (selected ? HOUSE_ZONE_BY_ID[selected] ?? null : null),
    [selected]
  );

  return (
    <Section id="diagnostic" variant="muted" className="py-10 md:py-12">
      <Reveal className="mx-auto max-w-2xl text-center">
        <span className="text-xs font-semibold uppercase tracking-wider text-secondary">
          Diagnostic interactif
        </span>
        <h2 className="mt-2.5 text-2xl font-semibold tracking-tight text-balance md:text-3xl">
          Où avez-vous aperçu le nuisible ?
        </h2>
        <p className="mt-3 text-base text-muted-foreground">
          Explorez la villa en 3D et cliquez directement sur un élément — toit, cheminée,
          fenêtre, arbre, jardin… — pour indiquer où vous avez repéré le problème.
        </p>
      </Reveal>

      <div ref={tiltRef} className="mt-6 grid gap-5 lg:grid-cols-[1.3fr_1fr] lg:items-stretch">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-border bg-gradient-to-b from-background to-muted shadow-lg sm:aspect-[16/10]">
          {webglSupported ? (
            <>
              <HouseScene
                selected={selected}
                view={view}
                onSelect={setSelected}
                reducedMotion={Boolean(prefersReducedMotion)}
              />
              <div className="pointer-events-none absolute left-4 top-4 hidden items-center gap-1.5 rounded-full border border-border bg-background/90 px-3 py-1.5 text-xs font-medium text-muted-foreground shadow-sm sm:flex">
                <MousePointerClick className="size-3.5" />
                Cliquez sur un élément de la villa
              </div>
              <div className="absolute right-4 top-4 z-20">
                <ViewToggle view={view} onChange={setView} />
              </div>
            </>
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-6 p-8">
              <p className="text-sm text-muted-foreground">
                Sélectionnez la zone où vous avez aperçu le nuisible :
              </p>
              <ZoneFallbackGrid selected={selected} onSelect={setSelected} />
            </div>
          )}
        </div>

        <div className="flex flex-col justify-center rounded-[2rem] border border-border bg-background p-5 shadow-lg lg:p-6">
          <AnimatePresence mode="wait">
            {activeZone ? (
              <motion.div
                key={activeZone.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="flex flex-col gap-4"
              >
                <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-secondary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-secondary">
                  <span className="size-1.5 rounded-full bg-secondary" />
                  Zone sélectionnée
                </span>

                <div className="flex items-center gap-3">
                  <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent-dark">
                    <activeZone.icon className="size-6" />
                  </span>
                  <h3 className="text-2xl font-semibold tracking-tight">{activeZone.label}</h3>
                </div>

                <div className="rounded-2xl border border-border bg-muted/50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-secondary">
                    Problème possible
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {activeZone.description}
                  </p>
                </div>

                <Button
                  size="lg"
                  className="w-full"
                  onClick={() => requestQuoteForZone(activeZone.option)}
                >
                  Demander un devis pour cette zone
                  <ArrowRight className="size-4" />
                </Button>
                <p className="text-center text-xs text-muted-foreground">
                  Vous avez indiqué <span className="font-medium text-foreground">{activeZone.label}</span> comme
                  emplacement du nuisible.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col gap-3 text-center lg:text-left"
              >
                <span className="inline-flex size-12 w-fit items-center justify-center self-center rounded-full bg-secondary/10 text-secondary lg:self-start">
                  <MousePointerClick className="size-6" />
                </span>
                <h3 className="text-xl font-semibold tracking-tight">
                  Sélectionnez une zone
                </h3>
                <p className="text-muted-foreground">
                  Chaque élément de la villa — toiture, cheminée, combles, fenêtres, balcon,
                  jardin, arbre, clôture… — est cliquable. Sélectionnez l&apos;endroit où vous
                  avez aperçu le nuisible pour préparer votre demande.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}
