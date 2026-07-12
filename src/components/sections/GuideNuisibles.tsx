import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { PEST_CATEGORIES, PEST_GUIDE } from "@/data/pestGuide";

// Rendu 100 % côté serveur : ce guide est la couche indexable de la page
// (l'identificateur interactif au-dessus est client). Chaque bloc H3 est la
// graine d'une future page dédiée /nuisibles/[slug] — même source de données.
export function GuideNuisibles() {
  return (
    <Section id="guide-nuisibles" className="relative overflow-hidden py-12 md:py-16">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-10 h-72 w-72 rounded-full bg-secondary/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 shadow-sm">
          <BookOpen className="size-4 text-secondary" />
          <span className="text-sm font-semibold">Guide pratique</span>
        </span>
        <h2 className="mt-4 text-2xl font-semibold tracking-tight text-balance md:text-3xl">
          Nuisibles : signes de présence, prévention et premiers gestes
        </h2>
        <p className="mt-3 text-base text-muted-foreground">
          Rats, souris, punaises de lit, cafards, guêpes, frelons… Pour chaque nuisible,
          les signes qui doivent alerter, les gestes de prévention et le bon moment pour
          faire appel à un professionnel.
        </p>
      </div>

      <div className="relative mx-auto mt-10 flex max-w-5xl flex-col gap-10">
        {PEST_CATEGORIES.map((category) => {
          const pests = PEST_GUIDE.filter((pest) => pest.category === category.id);
          if (pests.length === 0) return null;

          return (
            <div key={category.id}>
              <p className="text-sm font-semibold uppercase tracking-wider text-secondary">
                {category.label}
              </p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {pests.map((pest) => (
                  <article
                    key={pest.id}
                    id={`guide-${pest.id}`}
                    className="flex flex-col gap-2.5 rounded-2xl border border-border bg-background p-5 shadow-sm transition-colors hover:border-secondary/40"
                  >
                    <h3 className="text-base font-semibold tracking-tight">{pest.name}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {pest.description}
                    </p>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      <strong className="font-semibold text-foreground/90">Signes : </strong>
                      {pest.signs.slice(0, 3).join(" · ")}
                    </p>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      <strong className="font-semibold text-foreground/90">Prévention : </strong>
                      {pest.prevention}
                    </p>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      <strong className="font-semibold text-foreground/90">
                        Quand appeler un professionnel :{" "}
                      </strong>
                      {pest.whenToCall}
                    </p>
                    <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 pt-1">
                      <Link
                        href={`/nuisibles/${pest.id}`}
                        className="inline-flex items-center gap-1 text-sm font-semibold text-secondary transition-colors hover:text-foreground"
                      >
                        Lire la fiche complète
                        <ArrowRight className="size-3.5" />
                      </Link>
                      <Link
                        href={`/identifier?nuisible=${pest.id}#identifier`}
                        className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                      >
                        Voir en 3D
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
