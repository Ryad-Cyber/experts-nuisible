import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { services } from "@/data/services";

export function Services() {
  return (
    <Section id="services" variant="muted" className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-border to-transparent"
      />

      <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16">
        <Reveal className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-left">
          <span className="text-sm font-semibold uppercase tracking-wider text-secondary">
            Nos interventions
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance md:text-4xl">
            Une solution pour chaque nuisible
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Des techniciens formés et équipés pour traiter rapidement tous les types de
            nuisibles, chez les particuliers comme pour les professionnels.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="hidden shrink-0 overflow-hidden rounded-2xl border border-border bg-white p-4 shadow-md md:block">
          <Image
            src="/img_nuisible.jpeg"
            alt="Dératisation, désinsectisation, désinfection — Experts Nuisible"
            width={220}
            height={220}
            className="h-40 w-40 object-contain"
          />
        </Reveal>
      </div>

      <StaggerGroup className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <StaggerItem key={service.id}>
              <Card className="flex h-full flex-col gap-4">
                <span className="inline-flex size-12 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                  <Icon className="size-6" />
                </span>
                <div>
                  <h3 className="text-lg font-semibold tracking-tight">{service.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{service.description}</p>
                </div>
              </Card>
            </StaggerItem>
          );
        })}
      </StaggerGroup>
    </Section>
  );
}
