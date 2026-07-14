import type { Metadata } from "next";
import Link from "next/link";
import { Box } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PestLinkCard } from "@/components/sections/PestLinkCard";
import { siteConfig } from "@/config/site";
import { PEST_CATEGORIES, pestsInCategory } from "@/data/pestGuide";

export const metadata: Metadata = {
  title: `Nuisibles à Auxerre et dans l'Yonne : signes, urgence et traitement — ${siteConfig.name}`,
  description:
    "Rats, souris, punaises de lit, cafards, guêpes, frelons… Pour chaque nuisible : les signes de présence, le niveau d'urgence, les erreurs à éviter et la première action à faire. Intervention à Auxerre, Sens et dans l'Yonne.",
  alternates: { canonical: "/nuisibles" },
  openGraph: {
    title: "Nuisibles à Auxerre et dans l'Yonne : signes, urgence et traitement",
    description:
      "Pour chaque nuisible : signes de présence, niveau d'urgence, erreurs à éviter et première action à faire avant l'arrivée du technicien.",
    url: "/nuisibles",
  },
};

function BreadcrumbJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Nuisibles", item: `${siteConfig.url}/nuisibles` },
    ],
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
  );
}

// Hub des fiches nuisibles — index 100 % serveur, généré depuis pestGuide.ts.
export default function NuisiblesHubPage() {
  return (
    <main className="bg-background py-10 md:py-14">
      <BreadcrumbJsonLd />
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-secondary">
            Guide des nuisibles
          </p>
          <h1 className="mt-2.5 text-3xl font-semibold tracking-tight text-balance md:text-4xl">
            Identifiez votre nuisible, sachez quand agir
          </h1>
          <p className="mt-3 text-base text-muted-foreground">
            Rats, souris, punaises de lit, cafards, guêpes, frelons… Pour chaque nuisible : les
            signes qui doivent alerter, le niveau d&apos;urgence, les erreurs à éviter et la
            première action à faire avant l&apos;arrivée du technicien.
          </p>
          <Link
            href="/identifier#identifier"
            className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-semibold text-foreground/85 shadow-sm transition-colors hover:border-secondary/50 hover:text-foreground"
          >
            <Box className="size-4 text-secondary" />
            Pas sûr de ce que vous avez vu ? Identifiez-le en 3D
          </Link>
        </div>

        <div className="mx-auto mt-10 flex max-w-5xl flex-col gap-10">
          {PEST_CATEGORIES.map((category) => {
            const pests = pestsInCategory(category.id);
            if (pests.length === 0) return null;
            return (
              <section key={category.id}>
                <h2 className="text-sm font-semibold uppercase tracking-wider text-secondary">
                  {category.label}
                </h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {pests.map((pest) => (
                    <PestLinkCard key={pest.id} pest={pest} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </Container>
    </main>
  );
}
