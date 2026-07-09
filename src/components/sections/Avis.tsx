"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import { testimonials } from "@/data/testimonials";

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
      className="group relative flex h-full flex-col gap-5 overflow-hidden rounded-2xl border border-white/60 bg-white/70 p-6 shadow-md backdrop-blur-xl transition-shadow duration-300 hover:shadow-xl hover:shadow-secondary/10"
    >
      {/* Soft glow that blooms in on hover */}
      <div className="pointer-events-none absolute -right-10 -top-10 size-32 rounded-full bg-accent/0 blur-2xl transition-colors duration-500 group-hover:bg-accent/20" />

      <div className="relative flex items-center justify-between">
        <div className="flex gap-0.5" aria-label={`${testimonial.rating} sur 5`}>
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              className={cn(
                "size-4",
                index < testimonial.rating ? "text-accent" : "text-border"
              )}
              fill={index < testimonial.rating ? "currentColor" : "none"}
              strokeWidth={index < testimonial.rating ? 0 : 1.5}
            />
          ))}
        </div>
        <Quote className="size-7 text-secondary/25" strokeWidth={1.5} />
      </div>

      <p className="relative flex-1 text-[0.95rem] leading-relaxed text-foreground/90">
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      <div className="relative flex items-center gap-3 border-t border-border/60 pt-4">
        <span
          className={cn(
            "flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-sm font-semibold text-white shadow-sm",
            gradient
          )}
        >
          {initials(testimonial.author)}
        </span>
        <div>
          <p className="text-sm font-semibold leading-tight">{testimonial.author}</p>
          <p className="text-xs text-muted-foreground">{testimonial.location}</p>
        </div>
      </div>
    </motion.div>
  );
}

export function Avis() {
  const averageRating =
    testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length;

  return (
    <Section id="avis" className="relative overflow-hidden">
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
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance md:text-4xl">
          Ils nous ont fait confiance
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Particuliers, restaurants et copropriétés : découvrez leurs retours après
          intervention.
        </p>

        <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-4 py-2 shadow-sm backdrop-blur-sm">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                className={cn(
                  "size-4",
                  index < Math.round(averageRating) ? "text-accent" : "text-border"
                )}
                fill={index < Math.round(averageRating) ? "currentColor" : "none"}
                strokeWidth={index < Math.round(averageRating) ? 0 : 1.5}
              />
            ))}
          </div>
          <span className="text-sm font-semibold">{averageRating.toFixed(1)}/5</span>
          <span className="text-sm text-muted-foreground">
            · {testimonials.length} avis clients
          </span>
        </div>
      </Reveal>

      <StaggerGroup className="relative mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
