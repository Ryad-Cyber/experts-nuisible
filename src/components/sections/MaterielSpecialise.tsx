"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Radar } from "lucide-react";
import { SPECIALIZED_TOOLS } from "@/data/equipment";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

// -----------------------------------------------------------------------------
// Matériel pour interventions complexes en hauteur ou à distance (nids en
// toiture, zones difficiles). Grille de 4 cartes visuelles + une courte fiche
// au clic — jamais une mécanique à 2 slots qui masquerait la moitié du
// matériel : chaque pièce a sa vraie place, pas d'empilement.
// -----------------------------------------------------------------------------
export function MaterielSpecialise() {
  const prefersReducedMotion = Boolean(useReducedMotion());
  const [selectedId, setSelectedId] = useState(SPECIALIZED_TOOLS[0].id);
  const selected = SPECIALIZED_TOOLS.find((tool) => tool.id === selectedId) ?? SPECIALIZED_TOOLS[0];

  return (
    <div className="mt-10">
      <div className="mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-secondary shadow-sm backdrop-blur-sm">
          <Radar className="size-3.5" />
          Interventions complexes
        </span>
        <h3 className="mt-3 text-xl font-semibold tracking-tight text-balance md:text-2xl">
          Matériel pour zones difficiles d&apos;accès
        </h3>
        <p className="mt-2 text-sm text-muted-foreground md:text-base">
          Toitures, hauteurs, nids en zone complexe : un matériel de lutte antiparasitaire
          professionnel adapté.
        </p>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {SPECIALIZED_TOOLS.map((tool) => {
          const isSelected = tool.id === selectedId;
          return (
            <button
              key={tool.id}
              type="button"
              onClick={() => setSelectedId(tool.id)}
              aria-pressed={isSelected}
              aria-label={`Voir : ${tool.label}`}
              className={cn(
                "group relative aspect-square overflow-hidden rounded-2xl border bg-primary-dark text-left shadow-sm transition-all duration-300",
                "hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
                isSelected ? "border-accent ring-2 ring-accent" : "border-border/70 hover:border-accent/50"
              )}
            >
              <Image
                src={tool.image}
                alt={tool.alt}
                fill
                sizes="(min-width: 1024px) 220px, 45vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/75 to-transparent"
              />
              <span className="absolute bottom-2.5 left-3 right-3 text-xs font-semibold uppercase tracking-wide text-white/95">
                {tool.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Courte fiche : nom, usage factuel, bénéfice — pas de vocabulaire martial. */}
      <div className="mx-auto mt-5 max-w-2xl rounded-2xl border border-border bg-muted/50 p-4 sm:p-5">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={selected.id}
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.25, ease: EASE }}
          >
            <h4 className="text-sm font-semibold tracking-tight">{selected.name}</h4>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{selected.why}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
