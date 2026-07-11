import { MapPin } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/Reveal";

// Indicative only — the closing line makes clear this is a sample, not the full coverage area.
const SECTORS = [
  { name: "Paris", code: "75" },
  { name: "Loiret", code: "45" },
  { name: "Loir-et-Cher", code: "41" },
  { name: "Indre-et-Loire", code: "37" },
  { name: "Eure-et-Loir", code: "28" },
  { name: "Cher", code: "18" },
  { name: "Yonne", code: "89" },
  { name: "Nièvre", code: "58" },
];

export function ZoneIntervention() {
  return (
    <Section id="zone-intervention" className="relative overflow-hidden py-10 md:py-12">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-secondary/10 blur-3xl"
      />

      <Reveal delay={0.1} className="relative mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-secondary shadow-sm">
          <MapPin className="size-4 shrink-0" />
          <span className="text-sm font-semibold text-foreground">Zone d&apos;intervention</span>
        </span>

        <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">
          Nous intervenons dans de nombreuses agglomérations françaises auprès des particuliers
          et des professionnels. Les secteurs ci-dessous sont donnés à titre indicatif et ne
          représentent qu&apos;une partie de notre zone d&apos;intervention.
        </p>
      </Reveal>

      <StaggerGroup
        staggerDelay={0.04}
        className="relative mx-auto mt-7 flex max-w-3xl flex-wrap items-center justify-center gap-2.5"
      >
        {SECTORS.map((sector) => (
          <StaggerItem key={sector.code} y={10}>
            <span className="glass group inline-flex items-center gap-2 rounded-full border border-white/50 px-4 py-2 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-secondary/40 hover:shadow-md">
              <span className="text-sm font-medium text-foreground">{sector.name}</span>
              <span className="text-xs font-semibold tabular-nums text-secondary transition-colors duration-300 group-hover:text-accent-dark">
                {sector.code}
              </span>
            </span>
          </StaggerItem>
        ))}

        <StaggerItem y={10}>
          <span className="glass group inline-flex items-center gap-2 rounded-full border border-dashed border-secondary/40 px-4 py-2 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-secondary/60 hover:shadow-md">
            <span className="text-sm font-medium text-secondary transition-colors duration-300 group-hover:text-accent-dark">
              Et bien d&apos;autres...
            </span>
          </span>
        </StaggerItem>
      </StaggerGroup>
    </Section>
  );
}
