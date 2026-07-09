import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { services } from "@/data/services";
import { cn } from "@/lib/utils";

// Bento spans per service id (lg only) — deliberately asymmetric so it reads as a modern
// showcase rather than a uniform grid of identical cards.
const SPANS: Record<string, string> = {
  deratisation: "lg:col-span-3 lg:row-span-2",
  desinsectisation: "lg:col-span-2",
  "nuisibles-volants": "lg:col-span-1",
  desinfection: "lg:col-span-1",
  professionnels: "lg:col-span-1",
  prevention: "lg:col-span-1",
};

export function Expertise() {
  return (
    <Section id="services" variant="muted" className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-0 h-[26rem] w-[26rem] rounded-full bg-accent/10 blur-3xl"
      />

      <Reveal className="relative mx-auto max-w-2xl text-center">
        <span className="text-sm font-semibold uppercase tracking-wider text-secondary">
          Notre expertise
        </span>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance md:text-4xl">
          Une maîtrise complète, un seul interlocuteur
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Du diagnostic au traitement durable, nos techniciens couvrent l&apos;ensemble des
          interventions, chez les particuliers comme pour les professionnels.
        </p>
      </Reveal>

      <StaggerGroup className="relative mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6 lg:grid-rows-2">
        {services.map((service) => {
          const Icon = service.icon;
          const isFeature = service.id === "deratisation";

          return (
            <StaggerItem key={service.id} className={cn("min-h-[9rem]", SPANS[service.id])}>
              <div
                className={cn(
                  "group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border p-6 transition-all duration-300",
                  isFeature
                    ? "border-primary-dark bg-primary-dark text-white shadow-lg"
                    : "border-border bg-background shadow-sm hover:-translate-y-1 hover:border-secondary/40 hover:shadow-md"
                )}
              >
                {isFeature && (
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-secondary/20 blur-3xl"
                  />
                )}

                <div className="relative flex items-start justify-between gap-3">
                  <span
                    className={cn(
                      "inline-flex items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-105",
                      isFeature ? "size-14 bg-white/10 text-accent-light" : "size-12 bg-secondary/10 text-secondary"
                    )}
                  >
                    <Icon className={isFeature ? "size-7" : "size-6"} />
                  </span>
                  <ArrowUpRight
                    className={cn(
                      "size-5 -translate-y-0.5 translate-x-0.5 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100",
                      isFeature ? "text-accent-light" : "text-secondary"
                    )}
                  />
                </div>

                <div className="relative mt-6">
                  <h3
                    className={cn(
                      "font-semibold tracking-tight",
                      isFeature ? "text-2xl" : "text-lg"
                    )}
                  >
                    {service.title}
                  </h3>
                  <p
                    className={cn(
                      "mt-2 text-sm",
                      isFeature ? "max-w-sm text-white/75" : "text-muted-foreground"
                    )}
                  >
                    {service.description}
                  </p>
                </div>
              </div>
            </StaggerItem>
          );
        })}
      </StaggerGroup>

      <Reveal delay={0.1} className="relative mt-10 flex justify-center">
        <Button href="#contact" variant="secondary" size="lg">
          Discuter de votre besoin
          <ArrowUpRight className="size-4" />
        </Button>
      </Reveal>
    </Section>
  );
}
