import { Quote, Star } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import { testimonials } from "@/data/testimonials";

export function Avis() {
  return (
    <Section id="avis" className="relative overflow-hidden">
      <Quote
        aria-hidden
        className="pointer-events-none absolute -top-6 left-1/2 size-48 -translate-x-1/2 text-secondary/[0.04]"
        strokeWidth={1}
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
      </Reveal>

      <StaggerGroup className="relative mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {testimonials.map((testimonial) => (
          <StaggerItem key={testimonial.id}>
            <Card className="flex h-full flex-col gap-4">
              <Quote className="size-6 text-secondary" />

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

              <p className="flex-1 text-sm text-foreground/90">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              <div>
                <p className="text-sm font-semibold">{testimonial.author}</p>
                <p className="text-xs text-muted-foreground">{testimonial.location}</p>
              </div>
            </Card>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </Section>
  );
}
