"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePlausible } from "next-plausible";
import {
  AlertTriangle,
  Ban,
  Bug,
  Eye,
  Lightbulb,
  MapPin,
  MousePointer2,
  Phone,
} from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { cn } from "@/lib/utils";
import { siteConfig, whatsappHrefFor } from "@/config/site";
import { useWebglSupport } from "@/lib/useWebglSupport";
import { requestQuoteForPest } from "@/lib/quoteEvents";
import {
  DEFAULT_PEST_ID,
  PEST_BY_ID,
  PEST_CATEGORIES,
  pestsInCategory,
  type PestGuideEntry,
} from "@/data/pestGuide";
import type { PlausibleEvents } from "@/lib/analytics";

const PestModelViewer = dynamic(() => import("@/components/three/PestModelViewer"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="h-20 w-28 animate-pulse rounded-[2rem] bg-secondary/15" />
        <div className="h-2 w-16 animate-pulse rounded-full bg-secondary/10" />
      </div>
    </div>
  ),
});

const URGENCY_LABELS: Record<1 | 2 | 3, string> = {
  1: "À surveiller",
  2: "À traiter rapidement",
  3: "Urgence élevée",
};

// Le niveau 3 sort volontairement de la palette de marque (rouge sémantique) :
// l'urgence est une information, pas une décoration.
const URGENCY_COLORS: Record<1 | 2 | 3, string> = {
  1: "bg-secondary",
  2: "bg-accent",
  3: "bg-red-500",
};

const URGENCY_TEXT: Record<1 | 2 | 3, string> = {
  1: "text-secondary",
  2: "text-accent-dark",
  3: "text-red-600",
};

function UrgencyMeter({ pest }: { pest: PestGuideEntry }) {
  const prefersReducedMotion = useReducedMotion();
  const { level, reason } = pest.urgency;

  return (
    <div className="rounded-2xl border border-border bg-muted/50 p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-secondary">
          <AlertTriangle className="size-3.5" />
          Niveau d&apos;urgence
        </p>
        <p className={cn("text-sm font-bold tabular-nums", URGENCY_TEXT[level])}>
          {level}/3 — {URGENCY_LABELS[level]}
        </p>
      </div>

      {/* Jauge en 3 segments, animée une seule fois à l'affichage de la fiche. */}
      <div className="mt-2.5 flex gap-1.5" aria-hidden>
        {[1, 2, 3].map((segment) => (
          <motion.span
            key={`${pest.id}-${segment}`}
            initial={prefersReducedMotion ? false : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.35, delay: 0.15 * segment, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "h-1.5 flex-1 origin-left rounded-full",
              segment <= level ? URGENCY_COLORS[level] : "bg-border"
            )}
          />
        ))}
      </div>

      <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{reason}</p>
    </div>
  );
}

function FicheList({
  icon: Icon,
  title,
  items,
  tone = "default",
}: {
  icon: typeof Eye;
  title: string;
  items: string[];
  tone?: "default" | "warning";
}) {
  return (
    <div>
      <p
        className={cn(
          "flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide",
          tone === "warning" ? "text-red-600" : "text-secondary"
        )}
      >
        <Icon className="size-3.5" />
        {title}
      </p>
      <ul className="mt-1.5 flex flex-col gap-1">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm leading-relaxed text-muted-foreground">
            <span
              className={cn(
                "mt-2 size-1 shrink-0 rounded-full",
                tone === "warning" ? "bg-red-400" : "bg-secondary/60"
              )}
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function PestStage({ pest, webglSupported }: { pest: PestGuideEntry; webglSupported: boolean }) {
  const prefersReducedMotion = useReducedMotion();
  const show3D = webglSupported && Boolean(pest.model);

  return (
    <div
      className="relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] border border-border shadow-lg lg:aspect-square"
      style={{
        backgroundImage:
          "radial-gradient(circle at 50% 38%, var(--color-muted), var(--color-background))",
      }}
    >
      {/* Un seul modèle monté à la fois (mode="wait") : jamais deux contextes WebGL. */}
      <AnimatePresence mode="wait">
        <motion.div
          key={pest.id}
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          {show3D && pest.model ? (
            <PestModelViewer url={pest.model.file} {...pest.model.tuning} />
          ) : pest.photo ? (
            <>
              <Image
                src={pest.photo}
                alt={pest.name}
                fill
                sizes="(min-width: 1024px) 520px, 100vw"
                className="object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary-dark/30 via-transparent to-transparent" />
            </>
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-muted-foreground/50">
              <Bug className="size-10" />
              <p className="text-sm font-medium">{pest.name}</p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {show3D && (
        <span className="pointer-events-none absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-background/80 px-2 py-1 text-[10px] font-medium text-muted-foreground shadow-sm backdrop-blur-sm">
          <MousePointer2 className="size-3" />
          Faites pivoter le modèle
        </span>
      )}
    </div>
  );
}

export function PestIdentifier() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const webglSupported = useWebglSupport();
  const plausible = usePlausible<PlausibleEvents>();
  const hasInteracted = useRef(false);

  // Sélection pilotée par l'URL : partageable, et les cartes de la homepage
  // ouvrent directement la bonne fiche via /galerie-3d?nuisible=<id>.
  const param = searchParams.get("nuisible");
  const pest = (param && PEST_BY_ID[param]) || PEST_BY_ID[DEFAULT_PEST_ID];
  const categoryPests = pestsInCategory(pest.category);

  function select(id: string) {
    if (id === pest.id) return;
    hasInteracted.current = true;
    // replaceState natif : mise à jour de l'URL sans aller-retour serveur,
    // useSearchParams se synchronise automatiquement (App Router).
    window.history.replaceState(null, "", `${pathname}?nuisible=${id}`);
  }

  useEffect(() => {
    if (!hasInteracted.current) return;
    plausible("Pest Selected", { props: { pest: pest.id } });
  }, [pest.id, plausible]);

  return (
    <Section id="identifier" variant="muted" className="relative overflow-hidden py-10 md:py-14">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-secondary/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-accent/10 blur-3xl"
      />

      {/* Sélecteur : catégories puis nuisibles de la catégorie active. */}
      <Reveal className="relative">
        <h2 className="sr-only">Sélectionnez votre nuisible</h2>

        <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0">
          {PEST_CATEGORIES.map((category) => {
            const isActive = category.id === pest.category;
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => select(pestsInCategory(category.id)[0].id)}
                aria-pressed={isActive}
                className={cn(
                  "relative shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                  isActive
                    ? "text-accent-foreground"
                    : "border border-border bg-background text-muted-foreground hover:text-foreground"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="pest-category-pill"
                    className="absolute inset-0 rounded-full bg-accent shadow-sm"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                <span className="relative">{category.label}</span>
              </button>
            );
          })}
        </div>

        <div className="no-scrollbar -mx-4 mt-3 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0">
          {categoryPests.map((entry) => {
            const isActive = entry.id === pest.id;
            return (
              <button
                key={entry.id}
                type="button"
                onClick={() => select(entry.id)}
                aria-pressed={isActive}
                className={cn(
                  "shrink-0 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-all",
                  isActive
                    ? "border-secondary bg-secondary text-white shadow-sm"
                    : "border-border bg-background text-muted-foreground hover:border-secondary/40 hover:text-foreground"
                )}
              >
                {entry.name}
              </button>
            );
          })}
        </div>
      </Reveal>

      <div className="relative mt-7 grid gap-6 lg:grid-cols-[1.05fr_1fr] lg:items-start">
        <Reveal className="lg:sticky lg:top-24">
          <PestStage pest={pest} webglSupported={webglSupported} />
        </Reveal>

        {/* Fiche d'identification — même grammaire que le panneau du Configurateur. */}
        <Reveal delay={0.08}>
          <div className="rounded-[2rem] border border-border bg-background p-5 shadow-lg sm:p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={pest.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="flex flex-col gap-4"
              >
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-secondary">
                    {PEST_CATEGORIES.find((c) => c.id === pest.category)?.label}
                  </span>
                  <h3 className="mt-2.5 text-2xl font-semibold tracking-tight">{pest.name}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {pest.description}
                  </p>
                </div>

                <FicheList icon={Eye} title="Signes de présence" items={pest.signs} />
                <FicheList icon={MapPin} title="Où il se cache" items={pest.hidingSpots} />

                <UrgencyMeter pest={pest} />

                <FicheList icon={Ban} title="Erreurs à éviter" items={pest.mistakes} tone="warning" />

                <div className="rounded-2xl border border-accent/40 bg-accent/10 p-4">
                  <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-accent-dark">
                    <Lightbulb className="size-3.5" />
                    À faire maintenant
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-foreground/90">
                    {pest.firstAction}
                  </p>
                </div>

                <div className="mt-1 flex flex-col gap-2.5">
                  <Button href={siteConfig.phone.href} size="lg" className="w-full">
                    <Phone className="size-5" />
                    {siteConfig.cta.callNow} — {siteConfig.phone.display}
                  </Button>
                  <Button
                    href={whatsappHrefFor(pest.whatsappMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="secondary"
                    size="lg"
                    className="w-full"
                  >
                    <WhatsAppIcon className="size-5" />
                    Envoyer des photos WhatsApp
                  </Button>
                  <button
                    type="button"
                    onClick={() =>
                      requestQuoteForPest({
                        serviceId: pest.serviceId,
                        message: `Bonjour, je pense avoir un problème de ${pest.name.toLowerCase()}. Merci de me recontacter pour un devis.`,
                      })
                    }
                    className="text-center text-sm font-medium text-secondary underline-offset-4 transition-colors hover:text-foreground hover:underline"
                  >
                    ou demandez un devis écrit — formulaire pré-rempli
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>

      {/* Porte de sortie pour l'indécis : l'incertitude devient un motif de contact. */}
      <Reveal className="relative mx-auto mt-7 flex max-w-2xl flex-col items-center gap-3 rounded-2xl border border-dashed border-secondary/40 bg-background/70 p-5 text-center backdrop-blur-sm sm:flex-row sm:justify-between sm:text-left">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">Pas sûr de ce que vous avez vu ?</span>
          <br className="sm:hidden" /> Envoyez une photo, un technicien identifie pour vous.
        </p>
        <Button
          href={whatsappHrefFor(
            "Bonjour, j'ai vu un nuisible chez moi mais je n'arrive pas à l'identifier. Je vous envoie une photo."
          )}
          target="_blank"
          rel="noopener noreferrer"
          variant="secondary"
          size="md"
          className="shrink-0"
        >
          <WhatsAppIcon className="size-4" />
          Envoyer une photo
        </Button>
      </Reveal>
    </Section>
  );
}
