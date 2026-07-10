"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Clock3, FileCheck2, Phone, ShieldCheck, Star } from "lucide-react";
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

export function Hero() {
  return (
    <Section className="relative overflow-hidden pt-16 pb-12 md:pt-20 md:pb-14 lg:py-16">
      <HeroBackdrop />

      <div className="relative grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-10">
        <StaggerGroup className="flex flex-col items-center gap-4 text-center lg:items-start lg:text-left">
          <StaggerItem>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-3.5 py-1 text-xs font-medium text-muted-foreground">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-accent" />
              </span>
              Urgence 24h/24 — 7j/7
            </span>
          </StaggerItem>

          <StaggerItem>
            <h1 className="max-w-xl text-[1.7rem] font-semibold tracking-tight text-balance sm:text-3xl md:text-4xl lg:text-[2.7rem]">
              Dératisation &amp; désinsectisation.
              <br />
              <span className="text-muted-foreground">Intervention rapide, sans compromis.</span>
            </h1>
          </StaggerItem>

          <StaggerItem>
            <p className="max-w-xl text-sm text-muted-foreground md:text-base">
              {siteConfig.description}
            </p>
          </StaggerItem>

          <StaggerItem className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center">
            {/* Call — green, "live" pulsing dot, phone tilts on hover (matches navbar). */}
            <Button
              href={siteConfig.phone.href}
              variant="secondary"
              size="lg"
              className="group relative gap-2 whitespace-nowrap px-4 text-xs hover:bg-primary-light sm:px-5 sm:text-sm lg:text-base"
            >
              <span className="relative flex size-2 shrink-0 items-center justify-center">
                <span className="absolute inline-flex size-2 animate-ping rounded-full bg-accent-light/80" />
                <span className="relative inline-flex size-1.5 rounded-full bg-accent-light" />
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
                className="flex items-center justify-center gap-1.5 text-xs font-medium text-muted-foreground lg:justify-start"
              >
                <Icon className="size-3.5 text-foreground" />
                {label}
              </div>
            ))}
          </StaggerItem>
        </StaggerGroup>

        <Reveal delay={0.15} y={32} className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-6 -z-10 rounded-[2.5rem] bg-secondary/10 blur-2xl"
          />
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] border border-border shadow-xl">
            <Image
              src="/pic_header.jpg"
              alt="Techniciens Experts Nuisible en intervention"
              fill
              sizes="(min-width: 1024px) 480px, 90vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/25 via-transparent to-transparent" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="glass absolute -left-3 top-5 flex items-center gap-2.5 rounded-2xl border border-white/40 px-3.5 py-2.5 shadow-lg sm:-left-5 sm:top-7"
          >
            <div className="flex -space-x-0.5">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  className="size-3 fill-accent text-accent drop-shadow-sm"
                  style={{ animation: `starPulse 2.4s ease-in-out ${index * 0.15}s infinite` }}
                />
              ))}
            </div>
            <div className="text-left leading-tight">
              <p className="text-sm font-bold text-foreground">4.9/5</p>
              <p className="text-[11px] text-muted-foreground">Clients satisfaits</p>
            </div>
          </motion.div>

          <div className="absolute -bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-2xl border border-border bg-background px-3.5 py-2.5 shadow-md sm:left-auto sm:right-5 sm:translate-x-0">
            <ShieldCheck className="size-4 text-secondary" />
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
