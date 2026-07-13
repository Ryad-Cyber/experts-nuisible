"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { technicianPhotos } from "@/data/equipment";
import { PROFESSIONAL_PARTNERS } from "@/data/professionalPartners";

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

// Fabricants/fournisseurs : source unique dans data/professionalPartners.ts —
// le bandeau et la section "Solutions professionnelles" de /identifier affichent
// exactement la même liste. Logos statiques : le carousel photos est la seule
// animation permanente de la section (philosophie « un seul battement »).

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

// Camion floqué — preuve d'ancrage physique (entreprise réelle qui se déplace),
// distincte du portrait technicien. Image unique statique (pas dans la rotation :
// mélanger un plan large de véhicule avec des portraits verticaux diluerait les
// deux). object-contain sur carte claire : le fond blanc du visuel studio se fond,
// et la légende recentre le message sur la présence terrain, pas sur le véhicule.
function CamionBand() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-background shadow-sm">
      <div className="grid items-center gap-2 sm:grid-cols-[1.5fr_1fr] sm:gap-6">
        <div className="relative aspect-[2/1] w-full bg-white">
          <Image
            src="/camion.jpeg"
            alt="Camion utilitaire blanc floqué Experts Nuisible — dératisation, désinsectisation, désinfection"
            fill
            sizes="(min-width: 640px) 55vw, 100vw"
            className="object-contain"
          />
        </div>
        <div className="p-5 pt-0 text-center sm:p-6 sm:pl-0 sm:text-left">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-secondary">
            <Truck className="size-3.5" />
            Présence terrain
          </span>
          <h3 className="mt-1.5 text-lg font-semibold tracking-tight text-balance">
            Une entreprise qui se déplace jusqu&apos;à vous
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Nos techniciens interviennent avec des véhicules identifiés Experts Nuisible,
            équipés du matériel nécessaire à chaque type d&apos;intervention.
          </p>
        </div>
      </div>
    </div>
  );
}

function PartnersStrip() {
  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-background p-5 shadow-sm lg:flex-row lg:justify-between lg:gap-6 lg:p-6">
      <div className="text-center lg:text-left">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-secondary">
          <Sparkles className="size-3.5" />
          Solutions professionnelles utilisées
        </span>
        <p className="mt-1.5 max-w-md text-sm text-muted-foreground">
          Des équipements et produits de fabricants reconnus, sélectionnés pour leur
          fiabilité dans la lutte contre les nuisibles.
        </p>
      </div>

      {/* Barre de logos statique — pattern "press bar" : la crédibilité se montre,
          elle ne clignote pas. */}
      <ul className="flex flex-wrap items-center justify-center gap-2.5">
        {PROFESSIONAL_PARTNERS.map((partner) => (
          <li
            key={partner.id}
            className="flex h-14 w-28 items-center justify-center overflow-hidden rounded-xl border border-border bg-muted/50 p-2"
          >
            <Image
              src={partner.logo}
              alt={partner.name}
              width={112}
              height={56}
              className="h-full w-auto object-contain"
            />
          </li>
        ))}
      </ul>
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

          {/* Teaser vers la tenue interactive (déplacée sur /identifier) : le signal
              de professionnalisme reste, la grosse section interactive non. */}
          <Link
            href="/identifier#tenue"
            className="group mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-secondary transition-colors hover:text-foreground"
          >
            Inspecter la tenue d&apos;intervention pièce par pièce
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </Reveal>

      <Reveal delay={0.05} className="relative mt-8">
        <CamionBand />
      </Reveal>

      <Reveal delay={0.1} className="relative mt-6">
        <PartnersStrip />
      </Reveal>
    </Section>
  );
}
