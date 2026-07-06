"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, MousePointerClick } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal, StaggerGroup } from "@/components/ui/Reveal";
import { services } from "@/data/services";
import { pests } from "@/data/pests";
import { PestCard } from "./PestCard";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Nuisibles() {
  const railRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !railRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        railRef.current,
        { scrollLeft: 0 },
        {
          scrollLeft: 140,
          duration: 0.8,
          ease: "power2.inOut",
          delay: 0.3,
          yoyo: true,
          repeat: 1,
          scrollTrigger: {
            trigger: railRef.current,
            start: "top 75%",
            once: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  function scrollByCards(direction: 1 | -1) {
    railRef.current?.scrollBy({ left: direction * 340, behavior: "smooth" });
  }

  return (
    <Section id="nuisibles" className="overflow-hidden">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <Reveal className="max-w-2xl">
          <span className="text-sm font-semibold uppercase tracking-wider text-secondary">
            Nos nuisibles
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance md:text-4xl">
            Onze nuisibles. Une seule adresse.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            De la punaise de lit au frelon asiatique, nos techniciens identifient et
            traitent l&apos;ensemble des nuisibles domestiques et professionnels.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="hidden gap-2 sm:flex">
          <button
            type="button"
            onClick={() => scrollByCards(-1)}
            aria-label="Précédent"
            className="flex size-11 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors hover:bg-muted"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            onClick={() => scrollByCards(1)}
            aria-label="Suivant"
            className="flex size-11 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors hover:bg-muted"
          >
            <ChevronRight className="size-5" />
          </button>
        </Reveal>
      </div>

      <div className="relative mt-10 -mx-4 sm:-mx-6 lg:-mx-8">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-background to-transparent sm:w-16"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-background to-transparent sm:w-16"
        />

        <StaggerGroup
          ref={railRef}
          staggerDelay={0.06}
          className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-4 pb-4 sm:px-6 lg:px-8"
        >
          {pests.map((pest, index) => {
            const service = services.find((s) => s.id === pest.serviceId);
            if (!service) return null;
            return (
              <PestCard
                key={pest.id}
                pest={pest}
                index={index}
                serviceTitle={service.title}
                serviceIcon={service.icon}
              />
            );
          })}
        </StaggerGroup>
      </div>

      <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-muted-foreground sm:hidden">
        <MousePointerClick className="size-3.5" />
        Glissez pour découvrir tous les nuisibles
      </p>
    </Section>
  );
}
