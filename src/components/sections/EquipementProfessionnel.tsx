"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { technicianPhotos } from "@/data/equipment";

const SLIDE_DURATION = 1500;

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
          initial={prefersReducedMotion ? undefined : { opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={prefersReducedMotion ? undefined : { opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
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

export function EquipementProfessionnel() {
  return (
    <Section id="equipement" className="relative overflow-hidden py-10 md:py-14">
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
            Chaque intervention est menée par des techniciens formés, équipés de matériel
            professionnel adapté à chaque type de nuisible.
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
