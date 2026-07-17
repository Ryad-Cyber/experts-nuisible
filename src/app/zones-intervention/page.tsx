import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  CalendarClock,
  ChevronRight,
  Clock,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { CoverageMap } from "@/components/sections/CoverageMap";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { siteConfig } from "@/config/site";
import { services } from "@/data/services";
import { COVERAGE_REGIONS } from "@/data/coverage";
import { LOCAL_AREAS } from "@/data/localAreas";

const title = "Zone d'intervention — Auxerre, Sens, Yonne et régions voisines";
const description =
  "Quelques secteurs où nous intervenons : un réseau de techniciens mobiles avec une forte présence autour d'Auxerre et de Sens (Yonne), et des interventions en Bourgogne-Franche-Comté, Centre-Val de Loire, Île-de-France et au-delà. Votre ville n'est pas listée ? Appelez-nous.";

export const metadata: Metadata = {
  title: `${title} — ${siteConfig.name}`,
  description,
  alternates: { canonical: "/zones-intervention" },
  openGraph: {
    title,
    description,
    url: "/zones-intervention",
  },
};

function BreadcrumbJsonLd() {
  const jsonLd = {
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
    ],
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
  );
}

const NETWORK_POINTS = [
  {
    icon: Clock,
    title: "Intervention sous 24 h",
    text: "Un technicien du réseau le plus proche est mobilisé — le délai reste court même en dehors des grandes villes.",
  },
  {
    icon: CalendarClock,
    title: "7j/7, week-ends et jours fériés",
    text: "La disponibilité ne s'arrête pas le vendredi soir : les nuisibles non plus.",
  },
  {
    icon: ShieldCheck,
    title: "Mêmes standards partout",
    text: "Techniciens certifiés Certibiocide, prix annoncé avant intervention, garantie résultat 30 jours — quel que soit le secteur.",
  },
];

export default function ZonesInterventionPage() {
  return (
    <main className="bg-background py-10 md:py-14">
      <BreadcrumbJsonLd />
      <Container>
        <nav aria-label="Fil d'Ariane" className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
          <Link href="/" className="transition-colors hover:text-foreground">
            Accueil
          </Link>
          <ChevronRight aria-hidden className="size-3" />
          <span className="font-medium text-foreground">Zone d&apos;intervention</span>
        </nav>

        {/* 1) Répond vite à « intervenez-vous chez moi ? » : titre + carte + régions. */}
        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_360px] lg:items-start">
          <div className="max-w-2xl">
            <h1 className="text-3xl font-semibold tracking-tight text-balance md:text-4xl">
              Quelques secteurs où nous intervenons
            </h1>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              Experts Nuisible est un réseau de techniciens mobiles, avec une forte présence
              autour d&apos;Auxerre et de Sens. Nous intervenons également en Centre-Val de Loire
              (Orléans, Blois, Tours, Chartres), en Île-de-France, ainsi que dans de nombreux
              départements et communes environnants, pour accompagner particuliers et
              professionnels face à tous types de nuisibles.
            </p>

            {/* Pôles principaux — pages villes dédiées (référencement local). */}
            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-secondary">
                Nos pôles principaux
              </p>
              <div className="mt-3 flex flex-wrap gap-3">
                {LOCAL_AREAS.map((area) => (
                  <Link
                    key={area.slug}
                    href={`/zones-intervention/${area.slug}`}
                    className="group inline-flex items-center gap-2 rounded-full border border-secondary/40 bg-secondary/5 px-4 py-2 text-sm font-semibold text-foreground shadow-sm transition-colors hover:border-secondary hover:bg-secondary/10"
                  >
                    <MapPin className="size-4 text-secondary" />
                    Nuisibles à {area.city}
                    <ArrowRight className="size-3.5 text-secondary transition-transform duration-300 group-hover:translate-x-0.5" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-7 flex flex-col gap-6">
              {COVERAGE_REGIONS.map((region) => (
                <section key={region.name}>
                  <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-secondary">
                    <MapPin className="size-4 shrink-0" />
                    {region.name}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{region.lead}</p>
                  <div className="mt-3.5 flex flex-wrap gap-2">
                    {region.departments.map((dept) => (
                      <span
                        key={dept.code}
                        className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3.5 py-1.5 text-sm shadow-sm"
                      >
                        <span className="font-medium text-foreground">{dept.name}</span>
                        <span className="text-xs font-semibold tabular-nums text-secondary">
                          {dept.code}
                        </span>
                      </span>
                    ))}
                  </div>
                  {/* Villes-exemples + fin ouverte : crédibilité locale sans laisser
                      croire à une liste fermée. */}
                  {region.exampleTowns && region.exampleTowns.length > 0 && (
                    <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                      Nous intervenons notamment à {region.exampleTowns.join(", ")}, ainsi que dans
                      les communes environnantes.
                    </p>
                  )}
                </section>
              ))}
            </div>
          </div>

          <aside className="lg:sticky lg:top-24">
            <div className="flex flex-col items-center gap-3 rounded-[2rem] border border-border bg-gradient-to-br from-muted via-background to-muted p-6 shadow-lg">
              <CoverageMap moreHref="#votre-ville" />
              <p className="text-center text-xs text-muted-foreground">
                Cliquez sur un secteur pour préparer votre demande de devis.
              </p>
            </div>
          </aside>
        </div>

        {/* 2) Convainc : comment fonctionne le réseau (+ une photo réelle, EEAT). */}
        <section className="mt-14 grid items-center gap-8 rounded-[2rem] border border-border bg-muted/40 p-6 sm:p-8 lg:grid-cols-[0.85fr_1fr]">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border shadow-md">
            <Image
              src="/img_technicien.jpeg"
              alt="Technicien Experts Nuisible en intervention sur une toiture, équipé de son matériel"
              fill
              sizes="(min-width: 1024px) 420px, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-secondary">
              Comment fonctionne notre réseau
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-balance">
              Un technicien près de chez vous, mobilisé rapidement
            </h2>
            <ul className="mt-5 flex flex-col gap-4">
              {NETWORK_POINTS.map(({ icon: Icon, title: pointTitle, text }) => (
                <li key={pointTitle} className="flex items-start gap-3.5">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                    <Icon className="size-4.5" />
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold tracking-tight">{pointTitle}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 3) Convertit : zone grise assumée → CTA direct. */}
        <section
          id="votre-ville"
          className="mt-12 scroll-mt-24 rounded-[2rem] border border-accent/40 bg-accent/10 p-6 text-center sm:p-8"
        >
          <h2 className="text-xl font-semibold tracking-tight text-balance md:text-2xl">
            Votre ville n&apos;apparaît pas dans la liste ?
          </h2>
          <p className="mx-auto mt-2.5 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Ces secteurs ne sont qu&apos;une partie de notre couverture. Appelez-nous : nous vous
            confirmons immédiatement si un technicien peut intervenir chez vous, et sous quel délai.
          </p>
          <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href={siteConfig.phone.href} size="lg">
              <Phone className="size-5" />
              {siteConfig.cta.callNow} — {siteConfig.phone.display}
            </Button>
            <Button
              href={siteConfig.whatsapp.href}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              size="lg"
            >
              <WhatsAppIcon className="size-5" />
              WhatsApp
            </Button>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Vous préférez écrire ?{" "}
            <Link href="/#contact" className="font-medium text-secondary underline underline-offset-2 hover:text-foreground">
              Demandez un devis gratuit
            </Link>
          </p>
        </section>

        {/* Maillage : les prestations disponibles dans la zone. */}
        <section className="mt-12 border-t border-border pt-8">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-secondary">
            Nos prestations, disponibles dans toute la zone
          </h2>
          <div className="mt-4 flex flex-wrap gap-2.5">
            {services.map((service) => (
              <Link
                key={service.id}
                href={`/services/${service.id}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3.5 py-1.5 text-sm font-medium text-foreground/85 shadow-sm transition-colors hover:border-secondary/50 hover:text-foreground"
              >
                {service.title}
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
