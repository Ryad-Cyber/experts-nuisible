"use client";

import Image from "next/image";
import { Building2 } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { CLIENT_REFERENCES } from "@/data/clientReferences";

export function ClientReferences() {
  return (
    <Section variant="muted" className="py-12 md:py-16">
      <Reveal className="mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-xs font-semibold uppercase tracking-wider text-secondary shadow-sm">
          <Building2 className="size-4" />
          Références professionnelles
        </span>

        <h2 className="mt-4 text-2xl font-semibold tracking-tight text-balance md:text-3xl">
          Des professionnels nous font confiance
        </h2>

        <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
          Des entreprises nous confient la protection de leurs locaux grâce à des
          interventions adaptées aux exigences des professionnels.
        </p>
      </Reveal>

      <StaggerGroup
        staggerDelay={0.1}
        className="mx-auto mt-8 flex max-w-2xl flex-wrap items-center justify-center gap-5"
      >
        {CLIENT_REFERENCES.map((client) => (
          <StaggerItem key={client.id} y={20}>
            <div className="flex h-24 w-40 items-center justify-center rounded-2xl border border-border bg-background p-5 shadow-sm transition-transform duration-300 hover:-translate-y-1">
              <Image
                src={client.logo}
                alt={`${client.name} - client Experts Nuisible`}
                width={160}
                height={80}
                className="h-full w-full object-contain"
              />
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </Section>
  );
}