"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { BadgeCheck, Pause, Play } from "lucide-react";
import type { FieldProof } from "@/data/fieldProofs";
import { cn } from "@/lib/utils";

// -----------------------------------------------------------------------------
// Preuves terrain — photos/vidéos réelles d'interventions, affichées sur les
// fiches nuisibles et pages services concernées. Vidéos en lecture au clic
// uniquement (jamais d'autoplay) : Core Web Vitals préservés, et le geste
// volontaire du visiteur vaut plus qu'un fond animé.
// -----------------------------------------------------------------------------

function ProofVideo({ proof }: { proof: FieldProof }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  function toggle() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play();
    } else {
      video.pause();
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={playing ? `Mettre en pause : ${proof.caption}` : `Lire la vidéo : ${proof.caption}`}
      className="group relative block h-full w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      {/* preload="metadata" : seule la première image est chargée avant le clic. */}
      <video
        ref={videoRef}
        src={proof.src}
        preload="metadata"
        muted
        loop
        playsInline
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        className="h-full w-full object-cover"
      />
      <span
        className={cn(
          "absolute inset-0 flex items-center justify-center bg-primary-dark/25 transition-opacity duration-300",
          playing ? "opacity-0 group-hover:opacity-100" : "opacity-100"
        )}
      >
        <span className="flex size-12 items-center justify-center rounded-full bg-background/90 text-foreground shadow-lg backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
          {playing ? <Pause className="size-5" /> : <Play className="ml-0.5 size-5" />}
        </span>
      </span>
    </button>
  );
}

export function FieldProofGallery({ proofs }: { proofs: FieldProof[] }) {
  if (proofs.length === 0) return null;

  return (
    <section className="mt-9">
      <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-secondary">
        <BadgeCheck className="size-4 shrink-0" />
        Interventions réelles
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        Photos et vidéos prises par nos techniciens sur le terrain — rien de mis en scène.
      </p>

      {/* Rail à défilement horizontal : gère proprement les formats mêlés
          portrait/paysage, même grammaire que le rail nuisibles de l'accueil. */}
      <div className="no-scrollbar -mx-4 mt-4 flex snap-x snap-mandatory gap-3.5 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
        {proofs.map((proof) => (
          <figure
            key={proof.id}
            className={cn(
              "relative h-64 shrink-0 snap-start overflow-hidden rounded-2xl border border-border bg-primary-dark shadow-sm sm:h-72",
              proof.orientation === "portrait" ? "aspect-[9/14]" : "aspect-[16/10]"
            )}
          >
            {proof.type === "video" ? (
              <ProofVideo proof={proof} />
            ) : (
              <Image
                src={proof.src}
                alt={proof.caption}
                fill
                sizes="(min-width: 640px) 420px, 80vw"
                className="object-cover"
              />
            )}
            <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-3.5 pb-2.5 pt-8 text-xs font-medium text-white/95">
              {proof.caption}
            </figcaption>
            <span className="pointer-events-none absolute left-2.5 top-2.5 inline-flex items-center gap-1 rounded-full bg-background/85 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-foreground/80 backdrop-blur-sm">
              <BadgeCheck className="size-3 text-secondary" />
              Terrain
            </span>
          </figure>
        ))}
      </div>
    </section>
  );
}
