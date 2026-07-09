"use client";

import { MapPin } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { requestQuoteForCity } from "@/lib/quoteEvents";

const ZONES = [
  "Orléans",
  "Blois",
  "Tours",
  "Chartres",
  "Bourges",
  "Auxerre",
  "Sens",
  "Montargis",
  "Paris",
  "Île-de-France",
  "Bourgogne",
  "Centre-Val de Loire",
  "Pays de la Loire",
  "Une partie de la Normandie",
];

export function ZoneIntervention() {
  return (
    <Section id="zone-intervention" className="relative overflow-hidden">
      <Reveal delay={0.15} className="relative mx-auto max-w-4xl text-center">
        <h3 className="text-xl font-semibold tracking-tight">Zone d&apos;intervention</h3>
        <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground">
          Nous intervenons dans un rayon d&apos;environ 300 à 400 km autour de notre secteur
          principal, ainsi que dans de nombreuses autres villes sur demande. Les villes
          affichées ci-dessous sont des exemples de nos principales zones d&apos;intervention.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
          {ZONES.map((zone) => (
            <button
              key={zone}
              type="button"
              onClick={() => requestQuoteForCity(zone)}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-border bg-background px-3.5 py-1.5 text-sm font-medium text-foreground shadow-sm transition-colors hover:border-accent hover:bg-accent/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <MapPin className="size-3.5 text-secondary" />
              {zone}
            </button>
          ))}
          <span className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-secondary/50 bg-secondary/5 px-3.5 py-1.5 text-sm font-semibold text-secondary">
            + Et bien d&apos;autres communes
          </span>
        </div>
      </Reveal>
    </Section>
  );
}
