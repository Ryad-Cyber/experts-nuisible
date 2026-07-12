import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: `Nos services anti-nuisibles : dératisation, désinsectisation, désinfection — ${siteConfig.name}`,
  description:
    "Dératisation, désinsectisation, désinfection, nuisibles volants, prévention et contrats professionnels — intervention rapide, prix annoncé avant intervention.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Nos services anti-nuisibles",
    description:
      "Dératisation, désinsectisation, désinfection, nuisibles volants, prévention et contrats professionnels.",
    url: "/services",
  },
};

function BreadcrumbJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Services", item: `${siteConfig.url}/services` },
    ],
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
  );
}

// Hub des services — index 100 % serveur, généré depuis services.ts.
export default function ServicesHubPage() {
  return (
    <main className="bg-background py-10 md:py-14">
      <BreadcrumbJsonLd />
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-secondary">
            Nos services
          </p>
          <h1 className="mt-2.5 text-3xl font-semibold tracking-tight text-balance md:text-4xl">
            Une intervention adaptée à chaque nuisible
          </h1>
          <p className="mt-3 text-base text-muted-foreground">
            Dératisation, désinsectisation, désinfection… Chaque intervention commence par un
            échange téléphonique : le technicien identifie le problème, annonce le prix, puis
            intervient. Garantie résultat 30 jours.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Link
                key={service.id}
                href={`/services/${service.id}`}
                className="group flex flex-col gap-3 rounded-2xl border border-border bg-background p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-secondary/40 hover:shadow-md"
              >
                <span className="inline-flex size-11 items-center justify-center rounded-xl bg-secondary/10 text-secondary transition-transform duration-300 group-hover:scale-105">
                  <Icon className="size-5" />
                </span>
                <h2 className="text-base font-semibold tracking-tight">{service.title}</h2>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
                <span className="mt-auto inline-flex items-center gap-1 pt-1 text-sm font-semibold text-secondary transition-colors group-hover:text-foreground">
                  Découvrir
                  <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                </span>
              </Link>
            );
          })}
        </div>
      </Container>
    </main>
  );
}
