import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  AlertTriangle,
  ChevronRight,
  Eye,
  Lightbulb,
  MapPin,
  PhoneCall,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PestCtaCard } from "@/components/sections/PestCtaCard";
import { siteConfig } from "@/config/site";
import {
  PEST_BY_ID,
  PEST_CATEGORIES,
  PEST_GUIDE,
  URGENCY_COLORS,
  URGENCY_LABELS,
  URGENCY_TEXT,
  pestsInCategory,
  type PestGuideEntry,
} from "@/data/pestGuide";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Fiches nuisibles dédiées — générées statiquement depuis pestGuide.ts (source
// unique). Aucun contenu propre à ces pages : tout vient des données, pour
// rester strictement cohérent avec la homepage et l'identificateur 3D.
// ---------------------------------------------------------------------------

export const dynamicParams = false;

export function generateStaticParams() {
  return PEST_GUIDE.map((pest) => ({ slug: pest.id }));
}

function metaDescription(pest: PestGuideEntry): string {
  const base = `${pest.description} ${pest.whenToCall}`;
  if (base.length <= 158) return base;
  const cut = base.slice(0, 155);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pest = PEST_BY_ID[slug];
  if (!pest) return {};
  const title = `${pest.name} : signes de présence, urgence et traitement`;
  const description = metaDescription(pest);
  return {
    title: `${title} — ${siteConfig.name}`,
    description,
    alternates: { canonical: `/nuisibles/${pest.id}` },
    openGraph: {
      title,
      description,
      url: `/nuisibles/${pest.id}`,
      type: "article",
      ...(pest.photo ? { images: [pest.photo] } : {}),
    },
  };
}

function BreadcrumbJsonLd({ pest }: { pest: PestGuideEntry }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Nuisibles", item: `${siteConfig.url}/nuisibles` },
      {
        "@type": "ListItem",
        position: 3,
        name: pest.name,
        item: `${siteConfig.url}/nuisibles/${pest.id}`,
      },
    ],
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
  );
}

// Même grammaire visuelle que la fiche de l'identificateur : icône + titre en
// petites capitales + liste à puces ; ton "warning" pour les erreurs à éviter.
function FicheBlock({
  icon: Icon,
  title,
  items,
  tone = "default",
}: {
  icon: LucideIcon;
  title: string;
  items: string[];
  tone?: "default" | "warning";
}) {
  return (
    <section>
      <h2
        className={cn(
          "flex items-center gap-2 text-sm font-semibold uppercase tracking-wide",
          tone === "warning" ? "text-red-600" : "text-secondary"
        )}
      >
        <Icon className="size-4 shrink-0" />
        {title}
      </h2>
      <ul className="mt-2.5 space-y-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-muted-foreground">
            <span
              aria-hidden
              className={cn(
                "mt-2 size-1 shrink-0 rounded-full",
                tone === "warning" ? "bg-red-400" : "bg-secondary/60"
              )}
            />
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

function UrgencyBadge({ pest }: { pest: PestGuideEntry }) {
  const { level, reason } = pest.urgency;
  return (
    <div className="rounded-2xl border border-border bg-muted/50 p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-secondary">
          <AlertTriangle className="size-4" />
          Niveau d&apos;urgence
        </p>
        <p className={cn("text-sm font-bold", URGENCY_TEXT[level])}>
          {level}/3 — {URGENCY_LABELS[level]}
        </p>
      </div>
      <div className="mt-2.5 flex gap-1.5" aria-hidden>
        {[1, 2, 3].map((segment) => (
          <span
            key={segment}
            className={cn(
              "h-1.5 flex-1 rounded-full",
              segment <= level ? URGENCY_COLORS[level] : "bg-border"
            )}
          />
        ))}
      </div>
      <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{reason}</p>
    </div>
  );
}

export default async function PestPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pest = PEST_BY_ID[slug];
  if (!pest) notFound();

  const category = PEST_CATEGORIES.find((entry) => entry.id === pest.category);
  const siblings = pestsInCategory(pest.category).filter((entry) => entry.id !== pest.id);

  return (
    <main className="bg-background py-10 md:py-14">
      <BreadcrumbJsonLd pest={pest} />
      <Container>
        {/* Fil d'Ariane */}
        <nav aria-label="Fil d'Ariane" className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
          <Link href="/" className="transition-colors hover:text-foreground">
            Accueil
          </Link>
          <ChevronRight aria-hidden className="size-3" />
          <Link href="/nuisibles" className="transition-colors hover:text-foreground">
            Nuisibles
          </Link>
          <ChevronRight aria-hidden className="size-3" />
          <span className="font-medium text-foreground">{pest.name}</span>
        </nav>

        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_360px] lg:items-start">
          {/* Fiche experte */}
          <article className="max-w-2xl">
            <header>
              {category && (
                <p className="text-xs font-semibold uppercase tracking-wider text-secondary">
                  {category.label}
                </p>
              )}
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-balance md:text-4xl">
                {pest.name} : signes de présence, urgence et traitement
              </h1>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                {pest.description}
              </p>
            </header>

            {pest.photo && (
              <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-3xl border border-border bg-primary-dark shadow-md">
                <Image
                  src={pest.photo}
                  alt={pest.name}
                  fill
                  sizes="(min-width: 1024px) 640px, 100vw"
                  className="object-cover"
                  priority
                />
              </div>
            )}

            <div className="mt-7 flex flex-col gap-7">
              <FicheBlock icon={Eye} title="Signes de présence" items={pest.signs} />
              <FicheBlock icon={MapPin} title="Où il se cache" items={pest.hidingSpots} />
              <UrgencyBadge pest={pest} />
              <FicheBlock
                icon={AlertTriangle}
                title="Erreurs à éviter"
                items={pest.mistakes}
                tone="warning"
              />

              {/* À faire maintenant — même encadré doré que la fiche interactive. */}
              <section className="rounded-2xl border border-accent/40 bg-accent/10 p-4">
                <h2 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-accent-dark">
                  <Lightbulb className="size-4" />
                  À faire maintenant
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-foreground/85">{pest.firstAction}</p>
              </section>

              <section>
                <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-secondary">
                  <ShieldCheck className="size-4 shrink-0" />
                  Prévention
                </h2>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                  {pest.prevention}
                </p>
              </section>

              <section>
                <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-secondary">
                  <PhoneCall className="size-4 shrink-0" />
                  Quand appeler un professionnel
                </h2>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                  {pest.whenToCall}
                </p>
              </section>
            </div>
          </article>

          {/* CTA — sticky sur desktop, après la fiche sur mobile. */}
          <aside className="lg:sticky lg:top-24">
            <PestCtaCard
              pestId={pest.id}
              name={pest.name}
              serviceId={pest.serviceId}
              whatsappMessage={pest.whatsappMessage}
            />
          </aside>
        </div>

        {/* Maillage : autres nuisibles de la même catégorie */}
        {siblings.length > 0 && category && (
          <section className="mt-12 border-t border-border pt-8">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-secondary">
              Autres nuisibles — {category.label}
            </h2>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {siblings.map((sibling) => (
                <Link
                  key={sibling.id}
                  href={`/nuisibles/${sibling.id}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3.5 py-1.5 text-sm font-medium text-foreground/85 shadow-sm transition-colors hover:border-secondary/50 hover:text-foreground"
                >
                  {sibling.name}
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
        )}
      </Container>
    </main>
  );
}
