"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck, Building2, EyeOff, FileCheck2, Headset, Phone, ShieldCheck, Star } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { siteConfig } from "@/config/site";
import { reviewsSummary } from "@/data/testimonials";
import { HeroBackdrop } from "./HeroBackdrop";

// Chaque point répond à une peur qui bloque l'appel (honte, récidive, "est-ce pour moi ?").
// Délai et prix vivent désormais dans le H1, "certifiés" et "devis gratuit" dans le badge
// Certibiocide et le CTA doré — aucun message n'est répété deux fois dans le Hero.
const trustPoints = [
  { icon: EyeOff, label: "Intervention discrète" },
  { icon: ShieldCheck, label: "Garantie résultat 30 jours" },
  { icon: Building2, label: "Particuliers & professionnels" },
];

// Overlays dégradés seuls — la photo passe désormais par <Image fill priority>
// (WebP/AVIF dimensionné + préchargé) pour un LCP optimal, au lieu d'un fond CSS
// non optimisé. Les deux dégradés sont strictement identiques à l'ancien fond.
const heroOverlayStyle = {
  backgroundImage:
    "linear-gradient(to right, rgb(8 31 20 / 0.92), rgb(8 31 20 / 0.78) 55%, rgb(8 31 20 / 0.55)), " +
    "linear-gradient(to top, rgb(8 31 20 / 0.55), transparent 45%, rgb(8 31 20 / 0.25))",
};

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-primary-dark pt-16 pb-12 md:pt-20 md:pb-14 lg:py-16">
      {/* Photo LCP : Next sert du WebP/AVIF dimensionné et la précharge (priority). */}
      <Image
        src="/pic_header.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 -z-30 object-cover object-center"
      />
      <div aria-hidden className="absolute inset-0 -z-20" style={heroOverlayStyle} />
      <HeroBackdrop />

      <Container>
        <div className="relative grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-10">
        <StaggerGroup className="flex flex-col items-center gap-4 text-center lg:items-start lg:text-left">
          <StaggerItem>
            {/* Dot statique : le seul battement du Hero vit sur le badge
                "Un technicien vous répond" — un cœur unique, pas un sapin. */}
            <span className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-white/15 bg-white/10 px-3.5 py-1 text-xs font-medium text-white/85 backdrop-blur-sm">
              <span className="inline-flex size-2 shrink-0 rounded-full bg-accent" />
              Urgence 24h/24 — 7j/7
            </span>
          </StaggerItem>

          <StaggerItem>
            <h1 className="max-w-xl text-[1.7rem] font-semibold tracking-tight text-balance text-white sm:text-3xl md:text-4xl lg:text-[2.7rem]">
              Un nuisible chez vous ?
              <br />
              <span className="text-white/70">Diagnostic gratuit, intervention rapide.</span>
            </h1>
          </StaggerItem>

          <StaggerItem>
            <p className="max-w-xl text-sm text-white/75 md:text-base">
              Dératisation, désinsectisation, désinfection — pour les particuliers comme pour
              les professionnels.
            </p>
          </StaggerItem>

          <StaggerItem className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center">
            {/* Call — light pill on dark bg, static dot, phone tilts on hover (matches navbar). */}
            <Button
              href={siteConfig.phone.href}
              variant="secondary"
              size="lg"
              className="group relative gap-2 whitespace-nowrap bg-white px-4 text-xs text-primary-dark shadow-md hover:bg-white/90 sm:px-5 sm:text-sm lg:text-base"
            >
              <span className="inline-flex size-1.5 shrink-0 rounded-full bg-accent-dark" />
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

          <StaggerItem className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 lg:justify-start">
            {trustPoints.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-1.5 text-xs font-medium text-white/70">
                <Icon className="size-3.5 shrink-0 text-white" />
                {label}
              </div>
            ))}
          </StaggerItem>

          <StaggerItem className="flex flex-wrap items-center justify-center gap-2.5 lg:justify-start">
            {/* Certibiocide — carte premium sobre : verre dépoli, liseré tricolore très
                discret (certification française réelle du Ministère de l'Agriculture),
                aucun emblème officiel copié, aucune texture parasite. */}
            <div className="relative flex items-center gap-2.5 overflow-hidden rounded-xl border border-white/15 bg-white/[0.06] px-3.5 py-2.5 shadow-sm backdrop-blur-md transition-colors duration-300 hover:border-white/25">
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#3d5aa8] via-white to-[#c8383f]"
              />
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-white/20 bg-white/10 text-white">
                <BadgeCheck className="size-4" />
              </span>
              <div className="text-left leading-tight">
                <p className="text-xs font-semibold text-white">Certibiocide</p>
                <p className="text-[10px] text-white/60">Ministère de l&apos;Agriculture</p>
              </div>
            </div>

            {/* Réponse rapide — même grammaire de carte, accent émeraude. Le point qui
                pulse reste le seul battement du Hero (promesse 24/7 réelle, rien de simulé). */}
            <div className="relative flex items-center gap-2.5 overflow-hidden rounded-xl border border-white/15 bg-white/[0.06] px-3.5 py-2.5 shadow-sm backdrop-blur-md transition-colors duration-300 hover:border-white/25">
              <span className="relative flex size-9 shrink-0 items-center justify-center rounded-lg border border-white/20 bg-white/10 text-white">
                <Headset className="size-4" />
                <span className="absolute -right-1 -top-1 flex size-3">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex size-3 rounded-full border border-primary-dark bg-emerald-400" />
                </span>
              </span>
              <div className="text-left leading-tight">
                <p className="text-xs font-semibold text-white">Réponse rapide</p>
                <p className="text-[10px] text-white/60">Week-ends &amp; jours fériés inclus</p>
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
              {/* Étoiles fixes : une note de 4,8/5 se montre sereine — le clignotement
                  est le code visuel de la promo discount, l'inverse du premium. */}
              <div className="relative flex gap-0.5">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className="size-4 fill-accent text-accent drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]"
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
      </Container>
    </section>
  );
}
