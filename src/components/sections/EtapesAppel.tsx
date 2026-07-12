"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  CalendarCheck,
  EyeOff,
  Handshake,
  MessageSquareText,
  Phone,
  SearchCheck,
} from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { siteConfig } from "@/config/site";
import { onDutyTechnician } from "@/data/team";

const PROMISES = [
  { icon: Handshake, label: "Aucun engagement au téléphone" },
  { icon: EyeOff, label: "Intervention discrète — véhicule banalisé sur demande" },
];

const EASE = [0.16, 1, 0.3, 1] as const;

// Chorégraphie signature : un fil doré traverse les trois cartes en relais
// (1 → 2 → 3) et allume chaque numéro à son passage. ~1,5 s, une seule fois.
// Fonction psychologique : rendre la méthode visible — il y a un ordre, un
// déroulé maîtrisé, pas une hotline qui improvise.
const STEP_BEAT = 0.38;
const RELAY_START = 0.15;

export function EtapesAppel() {
  const prefersReducedMotion = useReducedMotion();
  const tech = onDutyTechnician;

  const steps = [
    {
      icon: MessageSquareText,
      title: "Vous décrivez ce que vous avez vu",
      description: "Bruits, traces, piqûres… expliquez simplement, avec vos mots. 30 secondes suffisent.",
    },
    {
      icon: SearchCheck,
      title: tech
        ? `${tech.firstName} identifie le nuisible`
        : "Un technicien identifie le nuisible",
      description: "Il vous dit de quoi il s'agit, si c'est urgent, et comment nous le traitons.",
    },
    {
      icon: CalendarCheck,
      title: "Vous obtenez un prix et un créneau",
      description: "Le prix est annoncé avant intervention. Aucun supplément sans votre accord.",
    },
  ];

  return (
    <Section id="votre-appel" variant="muted" className="relative overflow-hidden py-10 md:py-14">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-accent/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-secondary/10 blur-3xl"
      />

      <Reveal className="relative mx-auto max-w-2xl text-center">
        <span className="text-sm font-semibold uppercase tracking-wider text-secondary">
          Simple, rapide, sans engagement
        </span>
        <h2 className="mt-2.5 text-2xl font-semibold tracking-tight text-balance md:text-3xl">
          Voici ce qui se passe quand vous appelez
        </h2>

        {/* Emplacement prévu pour le technicien de garde — ne s'affiche que lorsque
            l'identité réelle est renseignée dans src/data/team.ts. */}
        {tech && (
          <div className="mt-4 inline-flex items-center gap-2.5 rounded-full border border-border bg-background/80 py-1.5 pl-1.5 pr-4 shadow-sm backdrop-blur-sm">
            <span className="relative size-8 overflow-hidden rounded-full">
              <Image src={tech.photo} alt={tech.firstName} fill sizes="32px" className="object-cover" />
            </span>
            <span className="text-sm font-medium">
              Aujourd&apos;hui, c&apos;est <span className="font-semibold">{tech.firstName}</span> qui décroche
            </span>
          </div>
        )}
      </Reveal>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="relative mx-auto mt-7 grid max-w-4xl gap-4 sm:grid-cols-3 sm:gap-5"
      >
        {steps.map((step, index) => {
          const relayDelay = RELAY_START + index * STEP_BEAT;

          return (
            <motion.div
              key={step.title}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: prefersReducedMotion
                    ? { duration: 0.01 }
                    : { duration: 0.5, delay: 0.08 * index, ease: EASE },
                },
              }}
              className="h-full"
            >
              <div className="relative h-full overflow-hidden rounded-2xl border border-border bg-background p-5 shadow-sm">
                {/* Le fil : piste discrète + remplissage doré qui traverse la carte
                    pendant son tour de relais. Fonctionne aussi en pile mobile. */}
                <span aria-hidden className="absolute inset-x-0 top-0 h-0.5 bg-border/60" />
                <motion.span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-0.5 origin-left bg-gradient-to-r from-accent-light via-accent to-accent-dark"
                  variants={{
                    hidden: { scaleX: 0 },
                    visible: {
                      scaleX: 1,
                      transition: prefersReducedMotion
                        ? { duration: 0.01 }
                        : { duration: STEP_BEAT, delay: relayDelay, ease: "easeInOut" },
                    },
                  }}
                />

                <div className="flex items-center gap-3">
                  {/* Le numéro s'allume quand le fil l'atteint : gris → or, avec un pop. */}
                  <motion.span
                    className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent-light via-accent to-accent-dark text-sm font-bold text-accent-foreground shadow-sm"
                    variants={{
                      hidden: { filter: "grayscale(1)", opacity: 0.45, scale: 0.92 },
                      visible: {
                        filter: "grayscale(0)",
                        opacity: 1,
                        scale: prefersReducedMotion ? 1 : [0.92, 1.1, 1],
                        transition: prefersReducedMotion
                          ? { duration: 0.01 }
                          : { duration: 0.35, delay: relayDelay + STEP_BEAT * 0.65, ease: EASE },
                      },
                    }}
                  >
                    {index + 1}
                  </motion.span>
                  <step.icon className="size-5 text-secondary" />
                </div>
                <h3 className="mt-3 text-base font-semibold tracking-tight">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      <Reveal className="relative mx-auto mt-6 flex max-w-3xl flex-wrap items-center justify-center gap-2.5">
        {PROMISES.map(({ icon: Icon, label }) => (
          <span
            key={label}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-3.5 py-1.5 text-xs font-medium text-foreground/85 shadow-sm backdrop-blur-sm sm:text-sm"
          >
            <Icon className="size-4 shrink-0 text-secondary" />
            {label}
          </span>
        ))}
      </Reveal>

      <Reveal className="relative mt-7 flex flex-col items-center gap-3">
        <div className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center">
          <Button href={siteConfig.phone.href} size="lg">
            <Phone className="size-5" />
            {siteConfig.cta.callNow} — {siteConfig.phone.display}
          </Button>
          <Button
            href={siteConfig.whatsapp.href}
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
            size="lg"
          >
            <WhatsAppIcon className="size-5" />
            WhatsApp — Envoyer des photos
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Vous n&apos;aimez pas téléphoner ? Envoyez 3 photos, recevez une première estimation.
        </p>
      </Reveal>
    </Section>
  );
}
