import { MapPin } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

// Main covered sectors, shown by postal-code prefix + department. Indicative only — we make
// clear below that we also intervene beyond these areas on request.
const SECTORS = [
  { code: "45", dept: "Loiret" },
  { code: "41", dept: "Loir-et-Cher" },
  { code: "37", dept: "Indre-et-Loire" },
  { code: "28", dept: "Eure-et-Loir" },
  { code: "18", dept: "Cher" },
  { code: "36", dept: "Indre" },
  { code: "89", dept: "Yonne" },
  { code: "58", dept: "Nièvre" },
];

export function ZoneIntervention() {
  return (
    <Section id="zone-intervention" className="relative overflow-hidden py-10 md:py-12">
      <Reveal delay={0.1} className="relative mx-auto max-w-4xl text-center">
        <h3 className="text-xl font-semibold tracking-tight">Zone d&apos;intervention</h3>
        <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground">
          Nous intervenons en priorité dans le Centre de la France et les départements
          voisins. Voici les principaux codes postaux de nos secteurs d&apos;intervention.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
          {SECTORS.map((sector) => (
            <span
              key={sector.code}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 shadow-sm"
            >
              <MapPin className="size-4 shrink-0 text-secondary" />
              <span className="text-sm font-semibold tabular-nums text-foreground">
                {sector.code}xxx
              </span>
              <span className="text-sm text-muted-foreground">· {sector.dept}</span>
            </span>
          ))}
        </div>

        <p className="mx-auto mt-5 max-w-2xl rounded-xl border border-dashed border-secondary/40 bg-secondary/5 px-4 py-3 text-sm text-muted-foreground">
          Ces secteurs sont donnés à titre indicatif. Nous intervenons également dans de
          nombreuses autres communes et départements sur demande, selon la nature de
          l&apos;intervention.
        </p>
      </Reveal>
    </Section>
  );
}
