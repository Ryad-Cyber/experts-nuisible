import type { Metadata } from "next";
import { Suspense } from "react";
import Image from "next/image";
import { ShieldCheck, Sparkles } from "lucide-react";
import { PestIdentifier } from "@/components/sections/PestIdentifier";
import { GuideNuisibles } from "@/components/sections/GuideNuisibles";
import { Configurateur } from "@/components/sections/Configurateur";
import { Section } from "@/components/ui/Section";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { PROFESSIONAL_PARTNERS } from "@/data/professionalPartners";
import { siteConfig } from "@/config/site";

const title = `Identifiez votre nuisible en 3D — ${siteConfig.name}`;
const description =
  "Identifiez votre nuisible en 3D : signes de présence, niveau d'urgence, erreurs à éviter et premiers gestes pour les rats, souris, punaises de lit, cafards, guêpes, frelons et bien d'autres.";

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

const solutionsBackgroundStyle = {
  backgroundImage:
    "radial-gradient(circle at 15% 0%, rgb(124 148 67 / 0.16), transparent 55%), " +
    "radial-gradient(circle at 85% 100%, rgb(245 196 51 / 0.1), transparent 55%), " +
    "linear-gradient(to bottom, rgb(8 31 20 / 0.97), rgb(8 31 20 / 0.99) 50%, rgb(8 31 20 / 0.97))",
};

function SolutionsProfessionnelles() {
  return (
    <Section className="relative overflow-hidden py-16 md:py-20" style={solutionsBackgroundStyle}>
      {/* Fine dot-grid texture, echoes the coverage map elsewhere on the site — gives the dark
          band its own material instead of a flat fill. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      {/* Entry seam — signals "leaving the gallery" before any content appears. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-muted to-transparent"
      />
      {/* Exit seam — signals "entering the villa" ahead. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-muted to-transparent"
      />

      <Reveal className="relative mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-accent-light backdrop-blur-sm">
          <ShieldCheck className="size-4 shrink-0" />
          <span className="text-sm font-semibold text-white">Solutions professionnelles</span>
        </span>
        <h2 className="mt-4 text-2xl font-semibold tracking-tight text-balance text-white md:text-3xl">
          Des équipements de confiance, choisis avec exigence
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-white/60">
          Nous travaillons avec des fabricants professionnels reconnus pour la qualité et la
          fiabilité de leurs solutions de lutte contre les nuisibles.
        </p>
      </Reveal>

      <StaggerGroup
        staggerDelay={0.1}
        className="relative mx-auto mt-10 grid max-w-3xl gap-5 sm:grid-cols-2"
      >
        {PROFESSIONAL_PARTNERS.map((partner) => (
          <StaggerItem key={partner.id} y={20}>
            <div className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-accent-light/30 hover:bg-white/[0.07]">
              {/* Glow that blooms in on hover, following the card's own accent. */}
              <span
                aria-hidden
                className="pointer-events-none absolute -inset-1 rounded-[1.75rem] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 30% 20%, rgb(245 196 51 / 0.18), transparent 65%)",
                }}
              />
              <span
                aria-hidden
                className="pointer-events-none absolute -inset-px rounded-[1.75rem] opacity-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] transition-opacity duration-500 group-hover:opacity-100"
              />

              <div className="relative flex items-start justify-between gap-4">
                <div className="flex h-16 w-32 items-center justify-center overflow-hidden rounded-xl bg-white p-2.5 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:scale-105">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={200}
                    height={80}
                    className="h-full w-full object-contain"
                  />
                </div>
                <Sparkles className="size-4 shrink-0 text-accent-light/40 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>

              <p className="relative mt-5 text-sm leading-relaxed text-white/55">
                {partner.description}
              </p>

              <span
                aria-hidden
                className="relative mt-5 block h-px w-8 bg-accent-light/50 transition-all duration-500 group-hover:w-16"
              />
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </Section>
  );
}

const identifierHeroStyle = {
  backgroundImage:
    "radial-gradient(circle at 15% 0%, rgb(124 148 67 / 0.16), transparent 55%), " +
    "radial-gradient(circle at 85% 100%, rgb(245 196 51 / 0.1), transparent 55%), " +
    "linear-gradient(to bottom, rgb(8 31 20 / 0.97), rgb(8 31 20 / 0.99) 50%, rgb(8 31 20 / 0.97))",
};

function IdentifierHero() {
  return (
    <div className="relative overflow-hidden py-16 md:py-20" style={identifierHeroStyle}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      {/* Exit seam — fades into the (light) identifier below. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-muted to-transparent"
      />

      <Reveal className="relative mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-accent-light backdrop-blur-sm">
          Identification interactive
        </span>
        <h1 className="mt-4 text-2xl font-semibold tracking-tight text-balance text-white md:text-3xl">
          Qu&apos;avez-vous vu ou entendu chez vous ?
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-sm text-white/60">
          Identifiez votre nuisible en 3D — rats, souris, punaises de lit, cafards, guêpes,
          frelons… Pour chacun : les signes de présence, le niveau d&apos;urgence, les
          erreurs à éviter et la première action à faire avant l&apos;arrivée du technicien.
        </p>
      </Reveal>
    </div>
  );
}

export default function Galerie3DPage() {
  return (
    <>
      <IdentifierHero />
      {/* useSearchParams (sélection par URL) impose une frontière Suspense
          pour conserver le prérendu statique de la page. */}
      <Suspense fallback={<div className="min-h-[60vh] bg-muted" aria-hidden />}>
        <PestIdentifier />
      </Suspense>
      <GuideNuisibles />
      <SolutionsProfessionnelles />
      <Configurateur />
    </>
  );
}
