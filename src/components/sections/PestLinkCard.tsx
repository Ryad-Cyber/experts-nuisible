import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { URGENCY_LABELS, URGENCY_TEXT, type PestGuideEntry } from "@/data/pestGuide";
import { cn } from "@/lib/utils";

// Carte de lien vers une fiche /nuisibles/[slug] — partagée entre le hub
// Nuisibles et les pages Services (100 % serveur, données pestGuide).
export function PestLinkCard({ pest }: { pest: PestGuideEntry }) {
  return (
    <Link
      href={`/nuisibles/${pest.id}`}
      className="group flex flex-col gap-2 rounded-2xl border border-border bg-background p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-secondary/40 hover:shadow-md"
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-base font-semibold tracking-tight">{pest.name}</h3>
        <span className={cn("shrink-0 text-xs font-bold", URGENCY_TEXT[pest.urgency.level])}>
          {pest.urgency.level}/3 · {URGENCY_LABELS[pest.urgency.level]}
        </span>
      </div>
      <p className="text-sm leading-relaxed text-muted-foreground">{pest.description}</p>
      <span className="mt-auto inline-flex items-center gap-1 pt-1 text-sm font-semibold text-secondary transition-colors group-hover:text-foreground">
        Lire la fiche
        <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}
