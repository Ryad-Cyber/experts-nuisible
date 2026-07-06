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
import { services } from "@/data/services";
import { houseZones } from "@/data/zones";
import type { HouseZoneId } from "@/types";
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
  selected: HouseZoneId | null;
  onSelect: (id: HouseZoneId) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {houseZones.map((zone) => {
        const service = services.find((s) => s.id === zone.serviceId);
        const Icon = service?.icon;
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
            {Icon && <Icon className="size-5" />}
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
  const [selected, setSelected] = useState<HouseZoneId | null>(null);
  const [view, setView] = useState<HouseView>("exterior");
  const prefersReducedMotion = useReducedMotion();
  const webglSupported = useWebglSupport();
  const tiltRef = useScrollTilt(Boolean(prefersReducedMotion));

  const activeZone = useMemo(
    () => houseZones.find((zone) => zone.id === selected) ?? null,
    [selected]
  );
  const activeService = useMemo(
    () => (activeZone ? services.find((s) => s.id === activeZone.serviceId) ?? null : null),
    [activeZone]
  );

  return (
    <Section id="diagnostic" variant="muted">
      <Reveal className="mx-auto max-w-2xl text-center">
        <span className="text-sm font-semibold uppercase tracking-wider text-secondary">
          Diagnostic interactif
        </span>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance md:text-4xl">
          Où avez-vous aperçu le nuisible ?
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Explorez la maison en 3D, basculez entre vue extérieure et intérieure, puis
          cliquez sur une zone pour découvrir le traitement adapté.
        </p>
      </Reveal>

      <div ref={tiltRef} className="mt-12 grid gap-6 lg:grid-cols-[1.3fr_1fr] lg:items-stretch">
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
                Cliquez ou faites glisser
              </div>
              <div className="absolute right-4 top-4 z-20">
                <ViewToggle view={view} onChange={setView} />
              </div>
            </>
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-6 p-8">
              <p className="text-sm text-muted-foreground">
                Sélectionnez une zone de votre logement :
              </p>
              <ZoneFallbackGrid selected={selected} onSelect={setSelected} />
            </div>
          )}
        </div>

        <div className="flex flex-col justify-center rounded-[2rem] border border-border bg-background p-8 shadow-lg">
          <AnimatePresence mode="wait">
            {activeZone && activeService ? (
              <motion.div
                key={activeZone.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="flex flex-col gap-4"
              >
                <span className="inline-flex size-12 w-fit items-center justify-center rounded-full bg-secondary/10 text-secondary">
                  <activeService.icon className="size-6" />
                </span>
                <div>
                  <p className="text-sm font-medium text-secondary">{activeZone.label}</p>
                  <h3 className="mt-1 text-2xl font-semibold tracking-tight">
                    {activeService.title}
                  </h3>
                  <p className="mt-2 text-muted-foreground">{activeService.description}</p>
                </div>
                <Button href="#contact" size="lg" className="mt-2 w-fit">
                  Demander un devis pour cette zone
                  <ArrowRight className="size-4" />
                </Button>
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
                  Toiture, combles, cuisine, cave ou jardin : chaque zone de la maison
                  correspond à un type d&apos;intervention. Cliquez pour en savoir plus.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}
