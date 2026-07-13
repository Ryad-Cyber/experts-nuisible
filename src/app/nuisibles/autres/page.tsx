import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, HelpCircle, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";
import { OTHER_PESTS } from "@/data/otherPests";

const title = "Autres nuisibles : espèces complémentaires — Experts Nuisible";
const description =
  "Mulot, lérot, loir, taupe, poisson d'argent, cloportes, coléoptères, mites... Des exemples de nuisibles complémentaires que nos techniciens traitent aussi, en plus des nuisibles principaux.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/nuisibles/autres" },
  openGraph: { title, description, url: "/nuisibles/autres" },
};

function BreadcrumbJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Nuisibles", item: `${siteConfig.url}/nuisibles` },
      { "@type": "ListItem", position: 3, name: "Autres nuisibles", item: `${siteConfig.url}/nuisibles/autres` },
    ],
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
  );
}

// Page dédiée aux espèces complémentaires — volontairement distincte du hub
// /nuisibles (qui liste tous les nuisibles principaux). Contenu 100 % serveur,
// source unique src/data/otherPests.ts. Pas de fiches détaillées ici (pas de
// signes/urgence/etc.) : un exemple factuel court par espèce, pas un guide.
export default function AutresNuisiblesPage() {
  return (
    <main className="bg-background py-10 md:py-14">
      <BreadcrumbJsonLd />
      <Container>
        <nav aria-label="Fil d'Ariane" className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
          <Link href="/" className="transition-colors hover:text-foreground">
            Accueil
          </Link>
          <ChevronRight aria-hidden className="size-3" />
          <Link href="/nuisibles" className="transition-colors hover:text-foreground">
            Nuisibles
          </Link>
          <ChevronRight aria-hidden className="size-3" />
          <span className="font-medium text-foreground">Autres nuisibles</span>
        </nav>

        <div className="mx-auto mt-6 max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-secondary">
            Espèces complémentaires
          </p>
          <h1 className="mt-2.5 text-3xl font-semibold tracking-tight text-balance md:text-4xl">
            Autres nuisibles
          </h1>
          <p className="mt-3 text-base text-muted-foreground">
            En plus des nuisibles les plus fréquents (rats, souris, punaises, cafards, guêpes,
            frelons, fourmis, chenilles...), nos techniciens interviennent aussi sur des espèces
            moins courantes. Voici quelques exemples.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-2">
          {OTHER_PESTS.map((pest) => (
            <div
              key={pest.id}
              className="rounded-2xl border border-border bg-background p-5 shadow-sm"
            >
              <h2 className="text-base font-semibold tracking-tight">{pest.name}</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {pest.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-10 flex max-w-2xl flex-col items-center gap-3 rounded-2xl border border-accent/40 bg-accent/10 p-6 text-center">
          <HelpCircle className="size-6 text-accent-dark" />
          <p className="text-sm leading-relaxed text-foreground/85">
            Cette liste n&apos;est pas exhaustive : nos techniciens peuvent également intervenir
            sur d&apos;autres espèces non citées ici. Contactez-nous pour identifier votre
            nuisible et obtenir un diagnostic.
          </p>
          <Button href={siteConfig.phone.href} size="lg" className="mt-1">
            <Phone className="size-5" />
            {siteConfig.cta.callNow} — {siteConfig.phone.display}
          </Button>
        </div>

        <div className="mx-auto mt-8 max-w-2xl text-center">
          <Link
            href="/nuisibles"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-secondary transition-colors hover:text-foreground"
          >
            Voir les nuisibles principaux →
          </Link>
        </div>
      </Container>
    </main>
  );
}
