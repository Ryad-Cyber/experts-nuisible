import type { Metadata } from "next";
import { Sparkles } from "lucide-react";
import { GalerieNuisibles3D } from "@/components/sections/GalerieNuisibles3D";
import { Configurateur } from "@/components/sections/Configurateur";
import { siteConfig } from "@/config/site";

const title = `Galerie 3D des nuisibles — ${siteConfig.name}`;
const description =
  "Explorez en 3D les principaux nuisibles traités par Experts Nuisible : rongeurs, insectes, reptiles et plus encore.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: `${siteConfig.url}/galerie-3d`,
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: `${siteConfig.url}/galerie-3d`,
    siteName: siteConfig.name,
    title,
    description,
  },
};

function GalerieTransition() {
  return (
    <div
      aria-hidden
      className="relative flex h-28 items-center justify-center overflow-hidden bg-muted md:h-36"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 50%, var(--color-background), var(--color-muted) 70%)",
        }}
      />

      <div className="relative flex w-full max-w-md items-center gap-4 px-6">
        <span className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-secondary/40" />
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-secondary/30 bg-background text-secondary shadow-[0_0_24px_-4px_rgba(124,148,67,0.45)]">
          <Sparkles className="size-4 animate-pulse" />
        </span>
        <span className="h-px flex-1 bg-gradient-to-l from-transparent via-border to-secondary/40" />
      </div>
    </div>
  );
}

export default function Galerie3DPage() {
  return (
    <>
      <GalerieNuisibles3D />
      <GalerieTransition />
      <Configurateur />
    </>
  );
}
