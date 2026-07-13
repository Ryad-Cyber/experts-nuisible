"use client";

import { motion, useReducedMotion } from "framer-motion";
import { requestQuoteForCity } from "@/lib/quoteEvents";
import { COVERAGE_HUBS } from "@/data/coverage";

// Carte de couverture stylisée (anneaux + hubs cliquables) — partagée entre le
// teaser homepage (Disponibilite) et la page /zones-intervention. Abstraite,
// jamais cartographique : elle évoque le rayon d'action, sans prétendre à une
// présence physique par ville.
export function CoverageMap({ moreHref = "#contact" }: { moreHref?: string }) {
  const prefersReducedMotion = useReducedMotion();
  const primary = COVERAGE_HUBS.find((hub) => hub.primary)!;

  return (
    <div className="relative aspect-square w-full max-w-xs">
      <div
        aria-hidden
        className="absolute inset-0 rounded-3xl border border-white/50 bg-white/30 shadow-inner backdrop-blur-sm [background-image:radial-gradient(circle,rgb(18_68_44_/_0.09)_1px,transparent_1px)] [background-size:18px_18px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute rounded-full bg-[radial-gradient(circle,var(--secondary-light)_0%,transparent_70%)] opacity-30 blur-lg"
        style={{ left: `${primary.x}%`, top: `${primary.y}%`, width: "78%", height: "78%", transform: "translate(-50%, -50%)" }}
      />

      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
        {[18, 30, 42].map((r) => (
          <circle
            key={r}
            cx={primary.x}
            cy={primary.y}
            r={r}
            fill="none"
            className="stroke-secondary/25"
            strokeWidth={0.4}
            strokeDasharray="1.6 2.4"
          />
        ))}

        {!prefersReducedMotion &&
          [0, 1].map((i) => (
            <motion.circle
              key={i}
              cx={primary.x}
              cy={primary.y}
              fill="none"
              className="stroke-accent"
              strokeWidth={0.6}
              initial={{ r: 5, opacity: 0.55 }}
              animate={{ r: [5, 44], opacity: [0.55, 0] }}
              transition={{ duration: 4.2, repeat: Infinity, delay: i * 2.1, ease: "easeOut" }}
            />
          ))}
      </svg>

      {COVERAGE_HUBS.map((hub) => (
        <button
          key={hub.name}
          type="button"
          onClick={() => requestQuoteForCity(hub.name)}
          style={{ left: `${hub.x}%`, top: `${hub.y}%` }}
          aria-label={`Intervention à ${hub.name}`}
          className={`group absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full border shadow-md backdrop-blur-sm transition-all duration-200 hover:z-10 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
            hub.primary
              ? "border-white bg-accent px-3 py-1.5 text-xs font-bold text-accent-foreground shadow-[0_0_18px_rgba(245,196,51,0.6)]"
              : hub.secondary
                ? "border-secondary/60 bg-background px-2.5 py-1.5 text-[11px] font-bold text-secondary shadow-[0_0_10px_-2px_rgba(124,148,67,0.45)] hover:border-secondary"
                : "border-border bg-background/90 px-2.5 py-1 text-[11px] font-semibold text-foreground/85 hover:border-accent hover:text-foreground"
          }`}
        >
          <span className="flex items-center gap-1">
            <span
              className={`inline-block size-1.5 rounded-full ${
                hub.primary
                  ? "bg-accent-foreground"
                  : hub.secondary
                    ? "bg-secondary"
                    : "bg-secondary group-hover:bg-accent"
              }`}
            />
            {hub.primary || hub.secondary ? hub.name : hub.short}
          </span>
        </button>
      ))}

      {/* Rappel que les villes listées ne sont que des exemples de la couverture. */}
      <a
        href={moreHref}
        style={{ left: "50%", top: "91%" }}
        className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-dashed border-secondary/60 bg-background/85 px-3 py-1 text-[11px] font-semibold text-muted-foreground shadow-sm backdrop-blur-sm transition-colors hover:border-accent hover:text-foreground"
      >
        + autres villes
      </a>
    </div>
  );
}
