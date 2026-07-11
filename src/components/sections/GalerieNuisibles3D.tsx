"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
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
    <div className="group flex flex-col overflow-hidden rounded-xl border border-border bg-background shadow-sm transition-shadow duration-300 hover:shadow-md">
      <div
        ref={ref}
        className="relative aspect-[5/4] w-full overflow-hidden"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 38%, var(--color-muted), var(--color-background))",
        }}
      >
        {inView ? (
          // Slight extra zoom compensates for the more compact cards (smaller on-screen area).
          <PestModelViewer url={pest.file} {...pest.tuning} scale={(pest.tuning?.scale ?? 1) * 1.12} />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-muted-foreground/40">
            <Box className="size-6" />
          </div>
        )}

        <span className="pointer-events-none absolute left-2 top-2 rounded-full bg-background/85 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-secondary shadow-sm backdrop-blur-sm">
          {pest.category}
        </span>
        <span className="pointer-events-none absolute bottom-2 right-2 inline-flex items-center gap-1 rounded-full bg-background/75 px-1.5 py-0.5 text-[9px] font-medium text-muted-foreground opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
          <MousePointer2 className="size-2.5" />
          Faites pivoter
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-1 p-3">
        <h3 className="text-sm font-semibold tracking-tight">{pest.name}</h3>
        <p className="line-clamp-2 flex-1 text-xs leading-snug text-muted-foreground">
          {pest.description}
        </p>
        <Link
          href="/#contact"
          className="mt-0.5 inline-flex w-fit items-center gap-1 text-xs font-semibold text-secondary transition-colors hover:text-foreground"
        >
          Intervention pour ce nuisible
          <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}

const heroBackgroundStyle = {
  backgroundImage:
    "radial-gradient(circle at 15% 0%, rgb(124 148 67 / 0.16), transparent 55%), " +
    "radial-gradient(circle at 85% 100%, rgb(245 196 51 / 0.1), transparent 55%), " +
    "linear-gradient(to bottom, rgb(8 31 20 / 0.97), rgb(8 31 20 / 0.99) 50%, rgb(8 31 20 / 0.97))",
};

export function GalerieNuisibles3D() {
  return (
    <>
      <div className="relative overflow-hidden py-16 md:py-20" style={heroBackgroundStyle}>
        {/* Fine dot-grid texture, echoes the "Solutions professionnelles" band further down —
            gives this intro its own material instead of a flat fill. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />
        {/* Exit seam — fades into the (light) gallery grid below. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-muted to-transparent"
        />

        <Reveal className="relative mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-accent-light backdrop-blur-sm">
            Galerie 3D
          </span>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight text-balance text-white md:text-3xl">
            Explorez les nuisibles en 3D
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-white/60">
            Faites pivoter chaque modèle à la souris. Chaque nuisible illustré représente toute
            une famille d&apos;espèces que nous traitons — pas uniquement l&apos;animal affiché.
          </p>
        </Reveal>
      </div>

      <Section id="galerie-3d" variant="muted" className="relative overflow-hidden py-10 md:py-12">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {PEST_MODELS.map((pest) => (
            <ModelCard key={pest.id} pest={pest} />
          ))}
        </div>

        {/* Breadth reassurance: we treat far more than the models shown. */}
        <div className="mt-6 flex flex-col items-center gap-4 rounded-2xl border border-dashed border-secondary/40 bg-background/70 p-6 text-center backdrop-blur-sm md:flex-row md:justify-between md:text-left">
          <div>
            <h3 className="text-lg font-semibold tracking-tight">Et bien d&apos;autres nuisibles…</h3>
            <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
              Notre équipe intervient sur de nombreuses espèces de rongeurs, insectes, oiseaux,
              reptiles, champignons et autres nuisibles. Contactez-nous pour toute situation
              spécifique.
            </p>
          </div>
          <Button href="/#contact" size="md" className="shrink-0">
            Demander un devis
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </Section>
    </>
  );
}
