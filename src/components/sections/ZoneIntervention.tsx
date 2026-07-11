import { MapPin } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export function ZoneIntervention() {
  return (
    <Section id="zone-intervention" className="relative overflow-hidden py-10 md:py-12">
      <Reveal delay={0.1} className="relative mx-auto max-w-3xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-secondary shadow-sm">
          <MapPin className="size-4 shrink-0" />
          <span className="text-sm font-semibold text-foreground">Zone d&apos;intervention</span>
        </span>

        <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">
          Intervention dans les principales agglomérations du Centre de la France et dans les
          secteurs environnants, avec déplacements possibles selon la nature de
          l&apos;intervention.
        </p>
      </Reveal>
    </Section>
  );
}
