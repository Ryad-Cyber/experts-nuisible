"use client";

import { motion, useReducedMotion } from "framer-motion";
import { BadgeCheck, Quote, Star } from "lucide-react";
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

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
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
      className="group relative flex h-full flex-col gap-3 overflow-hidden rounded-2xl border border-white/60 bg-white/70 p-4 shadow-md backdrop-blur-xl transition-shadow duration-300 hover:shadow-xl hover:shadow-secondary/10"
    >
      {/* Soft glow that blooms in on hover */}
      <div className="pointer-events-none absolute -right-10 -top-10 size-32 rounded-full bg-accent/0 blur-2xl transition-colors duration-500 group-hover:bg-accent/20" />

      <div className="relative flex items-center justify-between">
        <div className="flex gap-0.5" aria-label={`${testimonial.rating} sur 5`}>
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              className={cn(
                "size-3.5",
                index < testimonial.rating ? "text-accent" : "text-border"
              )}
              fill={index < testimonial.rating ? "currentColor" : "none"}
              strokeWidth={index < testimonial.rating ? 0 : 1.5}
            />
          ))}
        </div>
        <Quote className="size-6 text-secondary/25" strokeWidth={1.5} />
      </div>

      <p className="relative flex-1 text-sm leading-relaxed text-foreground/90">
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      <div className="relative flex items-center gap-2.5 border-t border-border/60 pt-2.5">
        <span
          className={cn(
            "flex size-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-xs font-semibold text-white shadow-sm",
            gradient
          )}
        >
          {initials(testimonial.author)}
        </span>
        <div className="min-w-0">
          <p className="text-sm font-semibold leading-tight">{testimonial.author}</p>
          <p className="truncate text-xs text-muted-foreground">
            {testimonial.location}
            {testimonial.service && <> · {testimonial.service}</>}
          </p>
        </div>
        {/* Badge affiché uniquement pour les futurs avis Google vérifiés. */}
        {testimonial.source === "google" && testimonial.verified && (
          <span className="ml-auto inline-flex shrink-0 items-center gap-1 rounded-full bg-secondary/10 px-2 py-0.5 text-[10px] font-semibold text-secondary">
            <BadgeCheck className="size-3" />
            Avis Google
          </span>
        )}
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
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                className={cn(
                  "size-3.5",
                  index < Math.round(averageRating) ? "text-accent" : "text-border"
                )}
                fill={index < Math.round(averageRating) ? "currentColor" : "none"}
                strokeWidth={index < Math.round(averageRating) ? 0 : 1.5}
              />
            ))}
          </div>
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
    </Section>
  );
}
