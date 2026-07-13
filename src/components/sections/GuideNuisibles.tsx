import Link from "next/link";
import { ArrowRight, BookOpen, ChevronDown } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { PEST_CATEGORIES, PEST_GUIDE } from "@/data/pestGuide";

// Rendu 100 % côté serveur, zéro JS : ce guide est la couche indexable de la
// page (l'identificateur interactif au-dessus est client). Chaque catégorie est
// un <details> natif — le contenu reste dans le DOM même replié (donc crawlé et
// indexé), tout en raccourcissant fortement la page pour que la silhouette et la
// villa 3D en dessous restent atteignables. Chaque bloc H3 alimente sa page
// dédiée /nuisibles/[slug].
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
          faire appel à un professionnel. Dépliez une catégorie pour l&apos;explorer.
        </p>
      </div>

      <div className="relative mx-auto mt-8 max-w-5xl overflow-hidden rounded-3xl border border-border bg-background/40">
        {PEST_CATEGORIES.map((category, index) => {
          const pests = PEST_GUIDE.filter((pest) => pest.category === category.id);
          if (pests.length === 0) return null;

          return (
            <details
              key={category.id}
              // Première catégorie ouverte : la page n'est jamais vide, et le
              // crawler comme l'utilisateur ont du contenu immédiat.
              open={index === 0}
              className="group border-b border-border last:border-b-0"
            >
              <summary className="flex cursor-pointer select-none list-none items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-muted/40 [&::-webkit-details-marker]:hidden">
                <span className="flex items-center gap-2.5">
                  <span className="text-sm font-semibold uppercase tracking-wider text-secondary">
                    {category.label}
                  </span>
                  <span className="rounded-full bg-secondary/10 px-2 py-0.5 text-xs font-medium tabular-nums text-secondary">
                    {pests.length}
                  </span>
                </span>
                <ChevronDown className="size-5 shrink-0 text-muted-foreground transition-transform duration-300 group-open:rotate-180" />
              </summary>

              <div className="grid gap-4 px-5 pb-6 sm:grid-cols-2 lg:grid-cols-3">
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
            </details>
          );
        })}
      </div>

      {/* Repère de continuité : signale explicitement que la page ne s'arrête pas
          au guide et guide l'œil vers la silhouette technicien (#tenue). */}
      <div className="relative mx-auto mt-12 flex flex-col items-center gap-3 text-center">
        <span aria-hidden className="h-10 w-px bg-gradient-to-b from-transparent to-border" />
        <a href="#tenue" className="group flex flex-col items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-secondary">
            La visite continue
          </span>
          <span className="text-base font-medium text-foreground">
            Inspectez la tenue d&apos;intervention du technicien
          </span>
          <span className="mt-1 flex size-9 items-center justify-center rounded-full border border-border bg-background text-secondary shadow-sm transition-transform duration-300 group-hover:translate-y-0.5">
            <ChevronDown className="size-5" />
          </span>
        </a>
      </div>
    </Section>
  );
}
