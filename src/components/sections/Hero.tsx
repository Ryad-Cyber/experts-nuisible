"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck, Clock3, FileCheck2, Phone, ShieldCheck, Star, Users } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { siteConfig } from "@/config/site";
import { HeroBackdrop } from "./HeroBackdrop";

const trustPoints = [
  { icon: Clock3, label: "Intervention sous 24h" },
  { icon: ShieldCheck, label: "Techniciens certifiés" },
  { icon: Phone, label: "Devis gratuit par téléphone" },
];

const heroBackgroundStyle = {
  backgroundImage:
    "linear-gradient(to right, rgb(8 31 20 / 0.92), rgb(8 31 20 / 0.78) 55%, rgb(8 31 20 / 0.55)), " +
    "linear-gradient(to top, rgb(8 31 20 / 0.55), transparent 45%, rgb(8 31 20 / 0.25)), " +
    "url('/pic_header.jpg')",
  backgroundSize: "cover",
  backgroundPosition: "center",
};

// Discreet, artistic silhouettes (wasp + rodent) — an original in-house motif, not a photo and
// not any external certification body's mark. Sits faint behind the Certibiocide badge.
const certBadgeMotif = {
  backgroundImage:
    "radial-gradient(circle at 30% 20%, rgb(245 196 51 / 0.16), transparent 60%), " +
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Cg fill='none' stroke='%23ffffff' stroke-width='1.1' stroke-linecap='round' opacity='0.35'%3E%3Cellipse cx='24' cy='22' rx='6' ry='8' transform='rotate(-18 24 22)'/%3E%3Cpath d='M24 14 L18 8 M24 14 L30 8'/%3E%3Cpath d='M18 20 L9 16 M30 20 L39 16 M18 26 L9 30 M30 26 L39 30'/%3E%3Cellipse cx='42' cy='44' rx='9' ry='5.5'/%3E%3Ccircle cx='50' cy='42' r='2.6'/%3E%3Cpath d='M35 43 L30 40 M35 46 L30 49'/%3E%3C/g%3E%3C/svg%3E\")",
  backgroundSize: "auto, 130px 130px",
  backgroundPosition: "center, center",
  backgroundRepeat: "no-repeat, no-repeat",
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
              Dératisation &amp; désinsectisation.
              <br />
              <span className="text-white/70">Intervention rapide, sans compromis.</span>
            </h1>
          </StaggerItem>

          <StaggerItem>
            <p className="max-w-xl text-sm text-white/75 md:text-base">{siteConfig.description}</p>
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
            {/* Certibiocide — premium credential badge with a faint in-house pest motif behind
                it (no official emblem, no external site's layout copied). */}
            <div className="glass flex items-center gap-2.5 rounded-xl border border-white/20 px-3 py-2">
              <span
                aria-hidden
                className="relative flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-white/25 bg-primary-dark/60"
                style={certBadgeMotif}
              >
                <BadgeCheck className="relative size-4 text-accent-light drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
              </span>
              <div className="text-left leading-tight">
                <p className="text-xs font-semibold text-white">Certibiocide</p>
                <p className="text-[10px] text-white/60">Ministère de l&apos;Agriculture</p>
              </div>
            </div>

            {/* Live technician availability — reassures "someone is available right now". */}
            <div className="glass flex items-center gap-2.5 rounded-xl border border-white/20 px-3 py-2">
              <span className="relative flex size-9 shrink-0 items-center justify-center rounded-lg border border-white/25 bg-primary-dark/60">
                <Users className="size-4 text-white/85" />
                <span className="absolute -right-1 -top-1 flex size-3">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex size-3 rounded-full border border-primary-dark bg-emerald-400" />
                </span>
              </span>
              <div className="text-left leading-tight">
                <p className="text-xs font-semibold text-white">3 techniciens disponibles</p>
                <p className="text-[10px] text-white/60">Intervention rapide</p>
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
                  4,9<span className="text-sm font-medium text-white/80"> / 5</span>
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
