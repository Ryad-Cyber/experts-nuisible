"use client";

import { motion, useReducedMotion } from "framer-motion";
import { BadgeCheck, Clock, MapPin, Quote, ShieldCheck, Star, type LucideIcon } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import { reviewsSummary, testimonials } from "@/data/testimonials";

// Deterministic accent rotation per card — avoids a monotone repeat of the same gradient
// on every testimonial while staying entirely within the existing brand palette.
const AVATAR_GRADIENTS = [
  "from-secondary to-secondary-light",
  "from-accent to-accent-dark",
  "from-primary to-primary-light",
  "from-accent-dark to-secondary",
];

// Réassurance de clôture — uniquement des engagements déjà affichés ailleurs sur
// le site (Garantie, Hero Certibiocide, disponibilité). Aucune donnée nouvelle,
// aucune répétition de la note (portée par l'en-tête).
const TRUST_SIGNALS: { icon: LucideIcon; label: string }[] = [
  { icon: ShieldCheck, label: "Garantie résultat 30 jours" },
  { icon: BadgeCheck, label: "Techniciens certifiés Certibiocide" },
  { icon: Clock, label: "Disponible 24h/24, 7j/7" },
];

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} sur 5`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={cn("size-4", index < rating ? "text-accent" : "text-border")}
          fill={index < rating ? "currentColor" : "none"}
          strokeWidth={index < rating ? 0 : 1.5}
        />
      ))}
    </div>
  );
}

function TestimonialCard({
  testimonial,
  gradient,
}: {
  testimonial: (typeof testimonials)[number];
  gradient: string;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      whileHover={prefersReducedMotion ? undefined : { y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="group relative flex h-full flex-col gap-4 overflow-hidden rounded-2xl border border-white/60 bg-white/70 p-5 shadow-md backdrop-blur-xl transition-shadow duration-300 hover:shadow-xl hover:shadow-secondary/10"
    >
      {/* Soft glow that blooms in on hover */}
      <div className="pointer-events-none absolute -right-10 -top-10 size-32 rounded-full bg-accent/0 blur-2xl transition-colors duration-500 group-hover:bg-accent/20" />

      {/* Note en tête : la première information (réassurance immédiate). */}
      <div className="relative flex items-center justify-between">
        <Stars rating={testimonial.rating} />
        {/* Badge affiché uniquement pour les futurs avis Google vérifiés. */}
        {testimonial.source === "google" && testimonial.verified && (
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-secondary/10 px-2 py-0.5 text-[10px] font-semibold text-secondary">
            <BadgeCheck className="size-3" />
            Avis Google
          </span>
        )}
      </div>

      {/* Guillemet décoratif — signe "témoignage", motif premium discret. */}
      <Quote
        aria-hidden
        className="relative -mb-1.5 size-7 shrink-0 text-secondary/25"
        fill="currentColor"
        strokeWidth={0}
      />

      {/* L'avis : élément focal de la carte. */}
      <p className="relative flex-1 text-[15px] leading-relaxed text-foreground/90">
        {testimonial.quote}
      </p>

      {/* Auteur : nom + vraie localisation, clairement hiérarchisés. */}
      <div className="relative flex items-center gap-3 border-t border-border/60 pt-3.5">
        <span
          className={cn(
            "flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-sm font-semibold text-white shadow-sm",
            gradient
          )}
        >
          {initials(testimonial.author)}
        </span>
        <div className="min-w-0">
          <p className="text-sm font-semibold leading-tight text-foreground">{testimonial.author}</p>
          <p className="mt-0.5 flex items-center gap-1 truncate text-xs text-muted-foreground">
            <MapPin className="size-3 shrink-0 text-secondary/70" />
            {testimonial.location}
            {testimonial.service && <> · {testimonial.service}</>}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function Avis() {
  // Note lue depuis la source unique (reviewsSummary) — jamais recalculée localement,
  // pour garantir le même chiffre que le Hero et les futures données structurées.
  const averageRating = reviewsSummary.ratingValue;

  return (
    <Section id="avis" className="relative overflow-hidden py-10 md:py-14">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-secondary/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-accent/10 blur-3xl"
      />

      <Reveal className="relative mx-auto max-w-2xl text-center">
        <span className="text-sm font-semibold uppercase tracking-wider text-secondary">
          Avis clients
        </span>
        <h2 className="mt-2.5 text-2xl font-semibold tracking-tight text-balance md:text-3xl">
          Leurs retours après nos interventions
        </h2>
        <p className="mt-3 text-base text-muted-foreground">
          Découvrez les expériences de nos clients après l&apos;intervention de nos techniciens,
          chez les particuliers comme dans les locaux professionnels.
        </p>

        <div className="mt-3.5 inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-3.5 py-1.5 shadow-sm backdrop-blur-sm">
          <Stars rating={Math.round(averageRating)} />
          <span className="text-sm font-semibold">
            {averageRating.toLocaleString("fr-FR")}/5
          </span>
          <span className="text-sm text-muted-foreground">
            · {reviewsSummary.reviewCount} avis clients
          </span>
        </div>
      </Reveal>

      <StaggerGroup className="relative mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {testimonials.map((testimonial, index) => (
          <StaggerItem key={testimonial.id}>
            <TestimonialCard
              testimonial={testimonial}
              gradient={AVATAR_GRADIENTS[index % AVATAR_GRADIENTS.length]}
            />
          </StaggerItem>
        ))}
      </StaggerGroup>

      {/* Réassurance avant la suite du parcours de conversion. */}
      <Reveal
        delay={0.1}
        className="relative mx-auto mt-8 flex max-w-3xl flex-wrap items-center justify-center gap-x-6 gap-y-2.5 rounded-2xl border border-border/70 bg-background/70 px-6 py-4 text-sm font-medium text-foreground/85 shadow-sm backdrop-blur-sm"
      >
        {TRUST_SIGNALS.map(({ icon: Icon, label }) => (
          <span key={label} className="inline-flex items-center gap-2">
            <Icon className="size-4 shrink-0 text-secondary" />
            {label}
          </span>
        ))}
      </Reveal>
    </Section>
  );
}
