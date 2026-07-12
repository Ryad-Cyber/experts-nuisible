import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  BadgeCheck,
  ChevronRight,
  Clock,
  Euro,
  ShieldCheck,
  Star,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PestLinkCard } from "@/components/sections/PestLinkCard";
import { ServiceCtaCard } from "@/components/sections/ServiceCtaCard";
import { siteConfig } from "@/config/site";
import { services } from "@/data/services";
import { PEST_GUIDE } from "@/data/pestGuide";
import { testimonials } from "@/data/testimonials";
import { INTERVENTION_STEPS } from "@/data/interventionSteps";

// ---------------------------------------------------------------------------
// Pages services — générées depuis services.ts. Chaque page a un objectif
// commercial distinct et NE duplique pas les fiches nuisibles : elle liste les
// nuisibles couverts (via leur serviceId) et renvoie vers /nuisibles/[slug].
// ---------------------------------------------------------------------------

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.id }));
}

// Titres SEO différenciés par intention de recherche — composés uniquement à
// partir des descriptions de services.ts (aucune promesse nouvelle).
const SEO_TITLES: Record<string, string> = {
  deratisation: "Dératisation : élimination rapide des rats et souris",
  desinsectisation: "Désinsectisation : punaises de lit, cafards, fourmis",
  desinfection: "Désinfection de locaux : bactéries, virus, odeurs",
  professionnels: "Anti-nuisibles pour professionnels : contrats & interventions",
  "nuisibles-volants": "Guêpes, frelons, pigeons : traitement des nids en sécurité",
  prevention: "Prévention & suivi : diagnostic et plan anti-récidive",
};

// Réassurance transverse — uniquement des engagements déjà affichés sur le site.
const TRUST_POINTS = [
  { icon: Euro, label: "Prix annoncé avant intervention" },
  { icon: ShieldCheck, label: "Garantie résultat 30 jours" },
  { icon: Clock, label: "24h/24 — 7j/7" },
  { icon: BadgeCheck, label: "Certibiocide" },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((entry) => entry.id === slug);
  if (!service) return {};
  const title = SEO_TITLES[service.id] ?? service.title;
  return {
    title: `${title} — ${siteConfig.name}`,
    description: service.description,
    alternates: { canonical: `/services/${service.id}` },
    openGraph: {
      title,
      description: service.description,
      url: `/services/${service.id}`,
    },
  };
}

function JsonLd({ slug }: { slug: string }) {
  const service = services.find((entry) => entry.id === slug);
  if (!service) return null;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: siteConfig.url },
        { "@type": "ListItem", position: 2, name: "Services", item: `${siteConfig.url}/services` },
        {
          "@type": "ListItem",
          position: 3,
          name: service.title,
          item: `${siteConfig.url}/services/${service.id}`,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: service.title,
      description: service.description,
      areaServed: siteConfig.serviceArea,
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

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find((entry) => entry.id === slug);
  if (!service) notFound();

  const Icon = service.icon;
  const coveredPests = PEST_GUIDE.filter((pest) => pest.serviceId === service.id);
  const review = testimonials.find((entry) => entry.serviceId === service.id);
  const otherServices = services.filter((entry) => entry.id !== service.id);

  return (
    <main className="bg-background py-10 md:py-14">
      <JsonLd slug={service.id} />
      <Container>
        {/* Fil d'Ariane */}
        <nav aria-label="Fil d'Ariane" className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
          <Link href="/" className="transition-colors hover:text-foreground">
            Accueil
          </Link>
          <ChevronRight aria-hidden className="size-3" />
          <Link href="/services" className="transition-colors hover:text-foreground">
            Services
          </Link>
          <ChevronRight aria-hidden className="size-3" />
          <span className="font-medium text-foreground">{service.title}</span>
        </nav>

        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_360px] lg:items-start">
          <div className="max-w-2xl">
            <header>
              <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
                <Icon className="size-6" />
              </span>
              <h1 className="mt-4 text-3xl font-semibold tracking-tight text-balance md:text-4xl">
                {service.title}
              </h1>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                {service.description}
              </p>

              <ul className="mt-5 flex flex-wrap gap-2">
                {TRUST_POINTS.map(({ icon: TrustIcon, label }) => (
                  <li
                    key={label}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/50 px-3 py-1.5 text-xs font-medium text-foreground/85"
                  >
                    <TrustIcon className="size-3.5 text-secondary" />
                    {label}
                  </li>
                ))}
              </ul>
            </header>

            {/* Nuisibles couverts — liens vers les fiches, pas de duplication. */}
            {coveredPests.length > 0 && (
              <section className="mt-9">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-secondary">
                  Nuisibles concernés par ce service
                </h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {coveredPests.map((pest) => (
                    <PestLinkCard key={pest.id} pest={pest} />
                  ))}
                </div>
              </section>
            )}

            {/* Comment ça se passe — version compacte des 3 étapes (source unique). */}
            <section className="mt-9">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-secondary">
                Comment ça se passe
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

            {/* Avis réel correspondant au service, quand il existe. */}
            {review && (
              <section className="mt-9">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-secondary">
                  Ils nous ont fait confiance
                </h2>
                <figure className="mt-4 rounded-2xl border border-border bg-background p-5 shadow-sm">
                  <div className="flex gap-0.5" aria-label={`Note : ${review.rating} sur 5`}>
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        key={index}
                        className={
                          index < review.rating
                            ? "size-4 fill-accent text-accent"
                            : "size-4 text-border"
                        }
                      />
                    ))}
                  </div>
                  <blockquote className="mt-2.5 text-sm leading-relaxed text-foreground/85">
                    “{review.quote}”
                  </blockquote>
                  <figcaption className="mt-2.5 text-xs text-muted-foreground">
                    <span className="font-semibold text-foreground/80">{review.author}</span> —{" "}
                    {review.location}
                  </figcaption>
                </figure>
              </section>
            )}
          </div>

          <aside className="lg:sticky lg:top-24">
            <ServiceCtaCard serviceId={service.id} serviceTitle={service.title} />
          </aside>
        </div>

        {/* Maillage : autres services */}
        <section className="mt-12 border-t border-border pt-8">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-secondary">
            Nos autres services
          </h2>
          <div className="mt-4 flex flex-wrap gap-2.5">
            {otherServices.map((entry) => (
              <Link
                key={entry.id}
                href={`/services/${entry.id}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3.5 py-1.5 text-sm font-medium text-foreground/85 shadow-sm transition-colors hover:border-secondary/50 hover:text-foreground"
              >
                {entry.title}
              </Link>
            ))}
            <Link
              href="/nuisibles"
              className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-border px-3.5 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:border-secondary/50 hover:text-foreground"
            >
              Tous les nuisibles →
            </Link>
          </div>
        </section>
      </Container>
    </main>
  );
}
