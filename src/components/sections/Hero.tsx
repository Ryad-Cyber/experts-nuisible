"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck, BadgeEuro, Clock3, EyeOff, FileCheck2, Headset, Phone, ShieldCheck, Star } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { siteConfig } from "@/config/site";
import { reviewsSummary } from "@/data/testimonials";
import { HeroBackdrop } from "./HeroBackdrop";

// Chaque point répond à une peur qui bloque l'appel (délai, prix, honte) — les mentions
// "certifiés" et "devis gratuit" vivent déjà dans le badge Certibiocide et le CTA doré.
const trustPoints = [
  { icon: Clock3, label: "Intervention sous 24h" },
  { icon: BadgeEuro, label: "Prix annoncé avant intervention" },
  { icon: EyeOff, label: "Intervention discrète" },
];

const heroBackgroundStyle = {
  backgroundImage:
    "linear-gradient(to right, rgb(8 31 20 / 0.92), rgb(8 31 20 / 0.78) 55%, rgb(8 31 20 / 0.55)), " +
    "linear-gradient(to top, rgb(8 31 20 / 0.55), transparent 45%, rgb(8 31 20 / 0.25)), " +
    "url('/pic_header.jpg')",
  backgroundSize: "cover",
  backgroundPosition: "center",
};

// Discreet, artistic silhouettes (wasp, rodent, roach) tiled as a near-invisible watermark —
// an original in-house motif, not a photo and not any external certification body's mark.
// Reused as the shared "credential" background for both trust badges below.
const badgeWatermark = {
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'%3E%3Cg fill='none' stroke='%23ffffff' stroke-width='1' stroke-linecap='round' stroke-linejoin='round' opacity='0.5'%3E%3Cellipse cx='22' cy='20' rx='5.5' ry='7' transform='rotate(-16 22 20)'/%3E%3Cpath d='M22 13 L17 7 M22 13 L27 7 M16 18 L8 15 M28 18 L36 15 M16 23 L8 27 M28 23 L36 27'/%3E%3Cellipse cx='92' cy='30' rx='8' ry='5'/%3E%3Ccircle cx='99' cy='28' r='2.3'/%3E%3Cpath d='M85 29 L79 26 M85 32 L79 35'/%3E%3Cpath d='M22 85 Q30 78 40 85 Q35 92 30 98 Q26 92 22 85 Z'/%3E%3Cpath d='M14 85 L8 82 M14 90 L7 91'/%3E%3Crect x='78' y='78' width='16' height='10' rx='4' transform='rotate(8 86 83)'/%3E%3Cpath d='M82 76 L80 71 M90 77 L92 72 M78 84 L72 83 M94 85 L100 86'/%3E%3C/g%3E%3C/svg%3E\")",
  backgroundSize: "150px 150px",
  backgroundRepeat: "repeat",
};

export function Hero() {
  return (
    <Section
      className="relative overflow-hidden pt-16 pb-12 md:pt-20 md:pb-14 lg:py-16"
      style={heroBackgroundStyle}
    >
      <HeroBackdrop />

      <div className="relative grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-10">
        <StaggerGroup className="flex flex-col items-center gap-4 text-center lg:items-start lg:text-left">
          <StaggerItem>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1 text-xs font-medium text-white/85 backdrop-blur-sm">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-accent" />
              </span>
              Urgence 24h/24 — 7j/7
            </span>
          </StaggerItem>

          <StaggerItem>
            <h1 className="max-w-xl text-[1.7rem] font-semibold tracking-tight text-balance text-white sm:text-3xl md:text-4xl lg:text-[2.7rem]">
              Solutions professionnelles contre tous les nuisibles.
              <br />
              <span className="text-white/70">Une intervention rapide. Un résultat durable.</span>
            </h1>
          </StaggerItem>

          <StaggerItem>
            <p className="max-w-xl text-sm text-white/75 md:text-base">
              Experts Nuisible intervient sur tous types de nuisibles, chez les particuliers
              comme chez les professionnels, grâce à un réseau de techniciens couvrant de
              nombreuses agglomérations françaises.
            </p>
          </StaggerItem>

          <StaggerItem className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center">
            {/* Call — light pill on dark bg, "live" pulsing dot, phone tilts on hover (matches navbar). */}
            <Button
              href={siteConfig.phone.href}
              variant="secondary"
              size="lg"
              className="group relative gap-2 whitespace-nowrap bg-white px-4 text-xs text-primary-dark shadow-md hover:bg-white/90 sm:px-5 sm:text-sm lg:text-base"
            >
              <span className="relative flex size-2 shrink-0 items-center justify-center">
                <span className="absolute inline-flex size-2 animate-ping rounded-full bg-accent/80" />
                <span className="relative inline-flex size-1.5 rounded-full bg-accent-dark" />
              </span>
              <Phone className="size-4 shrink-0 transition-transform duration-300 group-hover:-rotate-12" />
              {siteConfig.cta.callNow} — {siteConfig.phone.display}
            </Button>

            {/* Devis gratuit — primary action: gold gradient, shine sweep, arrow slide, glow. */}
            <Button
              href="#contact"
              size="lg"
              className="group relative overflow-hidden whitespace-nowrap bg-gradient-to-r from-accent-light via-accent to-accent-dark shadow-md hover:shadow-[0_0_34px_8px_rgb(245_196_51_/_0.55)]"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
              />
              <span className="relative z-10 flex items-center gap-1.5">
                <FileCheck2 className="size-4" />
                {siteConfig.cta.freeQuote}
                <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
              </span>
            </Button>
          </StaggerItem>

          <StaggerItem className="grid grid-cols-1 gap-2.5 sm:grid-cols-3 sm:gap-5">
            {trustPoints.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center justify-center gap-1.5 text-xs font-medium text-white/70 lg:justify-start"
              >
                <Icon className="size-3.5 text-white" />
                {label}
              </div>
            ))}
          </StaggerItem>

          <StaggerItem className="flex flex-wrap items-center justify-center gap-2.5 lg:justify-start">
            {/* Certibiocide — premium credential badge: faint tiled pest-silhouette watermark
                across the whole card (near-invisible, gives it a "certified document" texture)
                plus a gold accent glow, no official emblem, no external site's layout copied. */}
            <div className="group relative flex items-center gap-2.5 overflow-hidden rounded-xl border border-white/15 bg-gradient-to-br from-white/[0.08] to-white/[0.02] px-3.5 py-2.5 backdrop-blur-md transition-colors duration-300 hover:border-accent-light/30">
              <span aria-hidden className="pointer-events-none absolute inset-0" style={badgeWatermark} />
              <span
                aria-hidden
                className="pointer-events-none absolute -left-6 -top-6 size-20 rounded-full bg-accent-light/20 blur-2xl"
              />
              <span className="relative flex size-9 shrink-0 items-center justify-center rounded-lg border border-accent-light/30 bg-accent-light/10 text-accent-light shadow-[0_0_16px_-2px_rgba(245,196,51,0.35)]">
                <BadgeCheck className="size-4" />
              </span>
              <div className="relative text-left leading-tight">
                <p className="text-xs font-semibold text-white">Certibiocide</p>
                <p className="text-[10px] text-white/60">Ministère de l&apos;Agriculture</p>
              </div>
            </div>

            {/* Availability — same watermark texture, emerald accent. No fake live counter:
                the pulsing dot expresses the genuine 24/7 answering promise, nothing simulated. */}
            <div className="group relative flex items-center gap-2.5 overflow-hidden rounded-xl border border-white/15 bg-gradient-to-br from-white/[0.08] to-white/[0.02] px-3.5 py-2.5 backdrop-blur-md transition-colors duration-300 hover:border-emerald-300/30">
              <span aria-hidden className="pointer-events-none absolute inset-0" style={badgeWatermark} />
              <span
                aria-hidden
                className="pointer-events-none absolute -left-6 -top-6 size-20 rounded-full bg-emerald-400/20 blur-2xl"
              />
              <span className="relative flex size-9 shrink-0 items-center justify-center rounded-lg border border-emerald-300/30 bg-emerald-400/10 text-emerald-300 shadow-[0_0_16px_-2px_rgba(52,211,153,0.35)]">
                <Headset className="size-4" />
                <span className="absolute -right-1 -top-1 flex size-3">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex size-3 rounded-full border border-primary-dark bg-emerald-400" />
                </span>
              </span>
              <div className="relative text-left leading-tight">
                <p className="text-xs font-semibold text-white">Un technicien vous répond</p>
                <p className="text-[10px] text-white/60">24h/24 — week-ends &amp; jours fériés</p>
              </div>
            </div>
          </StaggerItem>
        </StaggerGroup>

        <Reveal delay={0.15} y={32} className="relative mx-auto w-full max-w-xs sm:max-w-sm lg:max-w-md lg:justify-self-end">
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-6 -z-10 rounded-[2.5rem] bg-accent/10 blur-2xl"
          />
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] border border-white/15 shadow-2xl">
            <Image
              src="/img_technicien.jpeg"
              alt="Technicien Experts Nuisible en intervention sur toiture"
              fill
              sizes="(min-width: 1024px) 420px, 80vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/55 via-transparent to-transparent" />

            {/* Rating badge — top-left, clear of the "Sans engagement" pill anchored at the
                bottom on every breakpoint (avoids overlap on narrow phones). */}
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="absolute left-5 top-5 flex items-center gap-3 overflow-hidden rounded-2xl border border-white/40 bg-white/20 px-5 py-3 shadow-[0_18px_40px_-12px_rgba(0,0,0,0.55)] backdrop-blur-xl"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent-light/30 via-transparent to-transparent"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute -inset-px rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.45)]"
              />
              <div className="relative flex gap-0.5">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className="size-4 fill-accent text-accent drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]"
                    style={{ animation: `starPulse 2.4s ease-in-out ${index * 0.15}s infinite` }}
                  />
                ))}
              </div>
              <span aria-hidden className="relative h-8 w-px bg-white/40" />
              <div className="relative flex flex-col items-start leading-none">
                <p className="text-xl font-bold tracking-tight text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]">
                  {reviewsSummary.ratingValue.toLocaleString("fr-FR")}
                  <span className="text-sm font-medium text-white/80"> / 5</span>
                </p>
                <p className="mt-1 text-[11px] font-semibold uppercase tracking-widest text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]">
                  Avis clients
                </p>
              </div>
            </motion.div>
          </div>

          <div className="absolute -bottom-4 right-3 flex items-center gap-2 rounded-2xl border border-border bg-background px-3 py-2 shadow-md sm:right-5 sm:px-3.5 sm:py-2.5">
            <ShieldCheck className="size-4 shrink-0 text-secondary" />
            <div className="text-left">
              <p className="text-xs font-semibold leading-none">Sans engagement</p>
              <p className="mt-1 text-[11px] text-muted-foreground">Devis gratuit &amp; rapide</p>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
