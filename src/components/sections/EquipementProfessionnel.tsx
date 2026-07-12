"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import { technicianPhotos } from "@/data/equipment";
import { TenueTechnicien } from "./TenueTechnicien";

// Rythme rapide voulu (~1,5 s par photo) — l'effet cinéma reste porté par le
// crossfade et la dérive de zoom Ken Burns, qui ne changent pas.
const SLIDE_DURATION = 1500;

// Preuves opérationnelles concrètes — uniquement des faits déjà revendiqués
// ailleurs sur le site (Garantie, Hero Certibiocide), jamais de sur-promesse.
const PROOF_POINTS = [
  "Équipements de protection individuelle adaptés à chaque intervention",
  "Matériel professionnel de fabricants reconnus",
  "Produits homologués, appliqués selon des protocoles stricts",
];

// Fabricants/fournisseurs dont nous utilisons les équipements professionnels.
// Ajouter une entrée ici — le bandeau rotatif la reprend automatiquement.
type Partner = {
  name: string;
  logo: string;
};

const PARTNERS: Partner[] = [
  { name: "Armosa", logo: "/Armosa.jpg" },
  { name: "Buzzbusters", logo: "/buzbuster.png" },
];

const PARTNER_ROTATE_MS = 4600;

function TechnicianSlideshow() {
  const prefersReducedMotion = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion || technicianPhotos.length < 2) return;
    const interval = setInterval(() => {
      setIndex((current) => (current + 1) % technicianPhotos.length);
    }, SLIDE_DURATION);
    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  const photo = technicianPhotos[index];

  return (
    <div className="relative aspect-[4/5] w-[220px] shrink-0 overflow-hidden rounded-2xl shadow-lg sm:w-[260px]">
      <AnimatePresence mode="sync">
        <motion.div
          key={photo.id}
          initial={prefersReducedMotion ? undefined : { opacity: 0 }}
          animate={{
            opacity: 1,
            // Ken Burns discret : la photo vit pendant son affichage au lieu de
            // rester figée entre deux fondus.
            scale: prefersReducedMotion ? 1 : [1, 1.06],
          }}
          exit={prefersReducedMotion ? undefined : { opacity: 0 }}
          transition={{
            opacity: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
            scale: { duration: (SLIDE_DURATION + 900) / 1000, ease: "linear" },
          }}
          className="absolute inset-0"
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="260px"
            className="object-cover"
            priority={index === 0}
          />
        </motion.div>
      </AnimatePresence>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary-dark/40 via-transparent to-transparent" />
    </div>
  );
}

function PartnersStrip() {
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
    <div className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-background p-5 shadow-sm sm:flex-row sm:justify-between sm:gap-6 sm:p-6">
      <div className="text-center sm:text-left">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-secondary">
          <Sparkles className="size-3.5" />
          Solutions professionnelles utilisées
        </span>
        <p className="mt-1.5 max-w-md text-sm text-muted-foreground">
          Des équipements et produits de fabricants reconnus, sélectionnés pour leur
          fiabilité dans la lutte contre les nuisibles.
        </p>
      </div>

      <div className="flex flex-col items-center gap-2.5">
        <div className="relative flex h-16 w-40 items-center justify-center overflow-hidden rounded-xl border border-border bg-muted/50">
          <AnimatePresence mode="wait">
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -8 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 flex items-center justify-center p-2.5"
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

        <div className="flex items-center justify-center gap-1.5">
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
      </div>
    </div>
  );
}

export function EquipementProfessionnel() {
  return (
    <Section id="equipement" variant="muted" className="relative overflow-hidden py-10 md:py-14">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-secondary/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-accent/10 blur-3xl"
      />

      <Reveal className="relative grid items-center gap-8 sm:grid-cols-[auto_1fr] sm:gap-10">
        <div className="mx-auto sm:mx-0">
          <TechnicianSlideshow />
        </div>

        <div className="text-center sm:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-3.5 py-1.5 text-sm font-semibold uppercase tracking-wider text-secondary shadow-sm backdrop-blur-sm">
            <ShieldCheck className="size-4" />
            Notre équipement professionnel
          </span>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-balance md:text-3xl">
            Des techniciens équipés et professionnels
          </h2>
          <p className="mx-auto mt-3 max-w-md text-base text-muted-foreground sm:mx-0">
            Chaque intervention est menée par des techniciens formés, protégés et équipés de
            matériel professionnel adapté à chaque type de nuisible.
          </p>

          <ul className="mx-auto mt-5 flex max-w-md flex-col gap-2.5 text-left sm:mx-0">
            {PROOF_POINTS.map((point) => (
              <li
                key={point}
                className="flex items-start gap-2.5 text-sm font-medium text-foreground/90"
              >
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-secondary" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      {/* Plateau d'inspection : la tenue pièce par pièce + matériel contextualisé. */}
      <TenueTechnicien />

      <Reveal delay={0.1} className="relative mt-8">
        <PartnersStrip />
      </Reveal>
    </Section>
  );
}
