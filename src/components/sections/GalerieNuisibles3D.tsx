"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { ArrowRight, Box, MousePointer2 } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { PEST_MODELS, type PestModel } from "@/data/pestModels";

const PestModelViewer = dynamic(() => import("@/components/three/PestModelViewer"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <div className="size-8 animate-spin rounded-full border-2 border-border border-t-secondary" />
    </div>
  ),
});

function ModelCard({ pest }: { pest: PestModel }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Only mount the (heavy) 3D canvas while the card is near the viewport; unmount when it
    // leaves so we never keep every model — and every WebGL context — alive at once.
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      rootMargin: "300px",
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-sm transition-shadow duration-300 hover:shadow-md">
      <div
        ref={ref}
        className="relative aspect-[4/3] w-full overflow-hidden"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 38%, var(--color-muted), var(--color-background))",
        }}
      >
        {inView ? (
          <PestModelViewer url={pest.file} {...pest.tuning} />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-muted-foreground/40">
            <Box className="size-8" />
          </div>
        )}

        <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-background/85 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-secondary shadow-sm backdrop-blur-sm">
          {pest.category}
        </span>
        <span className="pointer-events-none absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-background/75 px-2 py-1 text-[10px] font-medium text-muted-foreground opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
          <MousePointer2 className="size-3" />
          Faites pivoter
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <h3 className="text-base font-semibold tracking-tight">{pest.name}</h3>
        <p className="flex-1 text-xs leading-relaxed text-muted-foreground">{pest.description}</p>
        <a
          href="#contact"
          className="mt-1 inline-flex w-fit items-center gap-1 text-xs font-semibold text-secondary transition-colors hover:text-foreground"
        >
          Intervention pour ce nuisible
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>
    </div>
  );
}

export function GalerieNuisibles3D() {
  return (
    <Section id="galerie-3d" variant="muted" className="relative overflow-hidden py-12 md:py-16">
      <Reveal className="mx-auto max-w-2xl text-center">
        <span className="text-sm font-semibold uppercase tracking-wider text-secondary">
          Galerie 3D
        </span>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-balance md:text-3xl">
          Explorez les nuisibles en 3D
        </h2>
        <p className="mt-3 text-muted-foreground">
          Faites pivoter chaque modèle à la souris. Chaque nuisible illustré représente toute une
          famille d&apos;espèces que nous traitons — pas uniquement l&apos;animal affiché.
        </p>
      </Reveal>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {PEST_MODELS.map((pest) => (
          <ModelCard key={pest.id} pest={pest} />
        ))}
      </div>

      {/* Breadth reassurance: we treat far more than the models shown. */}
      <div className="mt-8 flex flex-col items-center gap-4 rounded-2xl border border-dashed border-secondary/40 bg-background/70 p-6 text-center backdrop-blur-sm md:flex-row md:justify-between md:text-left">
        <div>
          <h3 className="text-lg font-semibold tracking-tight">Et bien d&apos;autres nuisibles…</h3>
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
            Notre équipe intervient sur de nombreuses espèces de rongeurs, insectes, oiseaux,
            reptiles, champignons et autres nuisibles. Contactez-nous pour toute situation
            spécifique.
          </p>
        </div>
        <Button href="#contact" size="md" className="shrink-0">
          Demander un devis
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </Section>
  );
}
