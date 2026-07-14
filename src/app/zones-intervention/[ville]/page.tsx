import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  BadgeCheck,
  ChevronRight,
  Clock,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { siteConfig } from "@/config/site";
import { services } from "@/data/services";
import { INTERVENTION_STEPS } from "@/data/interventionSteps";
import { PEST_BY_ID } from "@/data/pestGuide";
import { LOCAL_AREAS, LOCAL_AREA_BY_SLUG } from "@/data/localAreas";

// ---------------------------------------------------------------------------
// Pages « couverture ville » des pôles principaux (Auxerre, Sens) — SSG, 2 slugs.
// Contenu unique par ville (data/localAreas.ts), le reste tiré des données déjà
// existantes (services, fiches nuisibles, étapes). Cible le référencement local
// (« dératisation Auxerre », « punaises de lit Auxerre », « désinsectisation Sens »).
// ---------------------------------------------------------------------------

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCAL_AREAS.map((area) => ({ ville: area.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ ville: string }>;
}): Promise<Metadata> {
  const { ville } = await params;
  const area = LOCAL_AREA_BY_SLUG[ville];
  if (!area) return {};
  const title = `Dératisation & désinsectisation à ${area.city} (${area.postalCode}) — ${siteConfig.name}`;
  const description = `Experts Nuisible intervient à ${area.city} et alentours : dératisation, punaises de lit, cafards, guêpes et frelons, désinfection. Particuliers et professionnels, 24h/24, prix annoncé avant intervention.`;
  return {
    title,
    description,
    alternates: { canonical: `/zones-intervention/${area.slug}` },
    openGraph: {
      title: `Anti-nuisibles à ${area.city} — ${siteConfig.name}`,
      description,
      url: `/zones-intervention/${area.slug}`,
    },
  };
}

function JsonLd({ slug }: { slug: string }) {
  const area = LOCAL_AREA_BY_SLUG[slug];
  if (!area) return null;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: siteConfig.url },
        {
          "@type": "ListItem",
          position: 2,
          name: "Zone d'intervention",
          item: `${siteConfig.url}/zones-intervention`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: area.city,
          item: `${siteConfig.url}/zones-intervention/${area.slug}`,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: `Traitement des nuisibles à ${area.city}`,
      serviceType: "Dératisation, désinsectisation, désinfection",
      areaServed: { "@type": "City", name: area.city },
      provider: {
        "@type": "LocalBusiness",
        name: siteConfig.name,
        telephone: siteConfig.phone.href.replace("tel:", ""),
        url: siteConfig.url,
      },
    },
  ];
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
  );
}

const TRUST_POINTS = [
  { icon: Clock, label: "24h/24 — 7j/7" },
  { icon: ShieldCheck, label: "Garantie résultat 30 jours" },
  { icon: BadgeCheck, label: "Certibiocide" },
];

export default async function LocalAreaPage({
  params,
}: {
  params: Promise<{ ville: string }>;
}) {
  const { ville } = await params;
  const area = LOCAL_AREA_BY_SLUG[ville];
  if (!area) notFound();

  const frequentPests = area.frequentPestIds
    .map((id) => PEST_BY_ID[id])
    .filter((pest): pest is NonNullable<typeof pest> => Boolean(pest));

  // Élision « de/d' » devant voyelle (Auxerre → d'Auxerre, Sens → de Sens).
  const around = /^[aeiouyh]/i.test(area.city) ? `d'${area.city}` : `de ${area.city}`;

  return (
    <main className="bg-background py-10 md:py-14">
      <JsonLd slug={area.slug} />
      <Container>
        {/* Fil d'Ariane */}
        <nav aria-label="Fil d'Ariane" className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
          <Link href="/" className="transition-colors hover:text-foreground">
            Accueil
          </Link>
          <ChevronRight aria-hidden className="size-3" />
          <Link href="/zones-intervention" className="transition-colors hover:text-foreground">
            Zone d&apos;intervention
          </Link>
          <ChevronRight aria-hidden className="size-3" />
          <span className="font-medium text-foreground">{area.city}</span>
        </nav>

        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_360px] lg:items-start">
          <div className="max-w-2xl">
            <header>
              <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-secondary">
                <MapPin className="size-3.5" />
                {area.city} · {area.role}
              </p>
              <h1 className="mt-2.5 text-3xl font-semibold tracking-tight text-balance md:text-4xl">
                Dératisation, désinsectisation &amp; désinfection à {area.city}
              </h1>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">{area.intro}</p>

              <ul className="mt-5 flex flex-wrap gap-2">
                {TRUST_POINTS.map(({ icon: Icon, label }) => (
                  <li
                    key={label}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/50 px-3 py-1.5 text-xs font-medium text-foreground/85"
                  >
                    <Icon className="size-3.5 text-secondary" />
                    {label}
                  </li>
                ))}
              </ul>
            </header>

            {/* Services proposés dans la zone — liens vers les pages services. */}
            <section className="mt-9">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-secondary">
                Nos services à {area.city}
              </h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {services.map((service) => {
                  const Icon = service.icon;
                  return (
                    <Link
                      key={service.id}
                      href={`/services/${service.id}`}
                      className="group flex flex-col gap-2.5 rounded-2xl border border-border bg-background p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-secondary/40 hover:shadow-md"
                    >
                      <span className="inline-flex size-10 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                        <Icon className="size-5" />
                      </span>
                      <span className="text-sm font-semibold tracking-tight">{service.title}</span>
                      <span className="text-sm leading-relaxed text-muted-foreground">
                        {service.description}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </section>

            {/* Nuisibles fréquents localement — liens vers les fiches. */}
            {frequentPests.length > 0 && (
              <section className="mt-9">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-secondary">
                  Nuisibles les plus fréquents à {area.city}
                </h2>
                <div className="mt-4 flex flex-wrap gap-2.5">
                  {frequentPests.map((pest) => (
                    <Link
                      key={pest.id}
                      href={`/nuisibles/${pest.id}`}
                      className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3.5 py-1.5 text-sm font-medium text-foreground/85 shadow-sm transition-colors hover:border-secondary/50 hover:text-foreground"
                    >
                      {pest.name}
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Contexte local spécifique à la ville. */}
            <section className="mt-9">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-secondary">
                Un contexte local à connaître
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                {area.localContext}
              </p>
            </section>

            {/* Déroulement d'une intervention — source unique. */}
            <section className="mt-9">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-secondary">
                Comment se passe une intervention
              </h2>
              <ol className="mt-4 flex flex-col gap-3">
                {INTERVENTION_STEPS.map((step, index) => (
                  <li
                    key={step.title}
                    className="flex items-start gap-3.5 rounded-2xl border border-border bg-muted/40 p-4"
                  >
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent-light via-accent to-accent-dark text-sm font-bold text-accent-foreground">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="text-sm font-semibold tracking-tight">{step.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            {/* Particuliers + professionnels, ancrés localement. */}
            <section className="mt-9">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-secondary">
                Particuliers et professionnels
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                {area.proContext}
              </p>
            </section>

            {/* Communes voisines réellement couvertes — exemples, pas des pages. */}
            {area.nearbyTowns.length > 0 && (
              <section className="mt-9">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-secondary">
                  Autour {around}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {area.aroundLead}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {area.nearbyTowns.map((town) => (
                    <span
                      key={town}
                      className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/50 px-3 py-1.5 text-sm text-foreground/85"
                    >
                      <MapPin className="size-3.5 text-secondary/70" />
                      {town}
                    </span>
                  ))}
                </div>
                <Link
                  href="/zones-intervention"
                  className="group mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-secondary transition-colors hover:text-foreground"
                >
                  Voir toute notre zone d&apos;intervention
                  <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
              </section>
            )}
          </div>

          {/* CTA sticky — conversion, cohérent avec les pages services/nuisibles. */}
          <aside className="lg:sticky lg:top-24">
            <div className="rounded-2xl border border-border bg-muted/40 p-5 shadow-sm">
              <p className="text-sm font-semibold tracking-tight">Intervention rapide à {area.city}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                Un technicien vous répond 24h/24 — décrivez ce que vous avez vu, le prix est annoncé
                avant intervention.
              </p>
              <div className="mt-4 flex flex-col gap-2.5">
                <Button href={siteConfig.phone.href} size="lg" className="w-full">
                  <Phone className="size-5" />
                  {siteConfig.cta.callNow} — {siteConfig.phone.display}
                </Button>
                <Button
                  href={siteConfig.whatsapp.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="secondary"
                  size="lg"
                  className="w-full"
                >
                  <WhatsAppIcon className="size-5" />
                  WhatsApp
                </Button>
              </div>
              <p className="mt-3 text-center text-xs text-muted-foreground">
                Vous préférez écrire ?{" "}
                <Link
                  href="/#contact"
                  className="font-medium text-secondary underline underline-offset-2 hover:text-foreground"
                >
                  Demandez un devis gratuit
                </Link>
              </p>
            </div>
          </aside>
        </div>
      </Container>
    </main>
  );
}
