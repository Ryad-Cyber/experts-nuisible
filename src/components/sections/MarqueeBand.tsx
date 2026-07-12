import { Bug, Car, CheckCircle2, Star, type LucideIcon } from "lucide-react";

// Uniquement les messages que le Hero juste au-dessus ne dit pas déjà : preuve chiffrée,
// aperçu des nuisibles traités (segue vers la section Nuisibles), devis, mobilité.
// Le 24/7, le délai et le prix vivent dans le Hero — pas de répétition adjacente.
const MESSAGES: { icon: LucideIcon; text: string }[] = [
  { icon: Star, text: "Plus de 200 interventions réalisées" },
  { icon: Bug, text: "Guêpes • Frelons • Rongeurs • Punaises de lit • et bien d'autres" },
  { icon: CheckCircle2, text: "Devis gratuit et sans engagement" },
  { icon: Car, text: "Déplacement rapide dans de nombreuses régions" },
];

// Chaque moitié de la piste rend la liste deux fois : l'animation translate de -50 %,
// il faut donc que chaque moitié soit assez large pour couvrir un écran desktop.
const LOOP = [...MESSAGES, ...MESSAGES];

function chips(copy: string) {
  return LOOP.map((message, index) => {
    const Icon = message.icon;
    return (
      <div
        key={`${copy}-${index}`}
        className="mx-2 flex shrink-0 items-center gap-2 rounded-full border border-white/60 bg-white/70 py-1.5 pl-1.5 pr-4 shadow-sm backdrop-blur-md"
      >
        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent/20 to-secondary/15 text-accent-dark">
          <Icon className="size-3.5" />
        </span>
        <span className="whitespace-nowrap text-xs font-medium text-foreground/85">{message.text}</span>
      </div>
    );
  });
}

export function MarqueeBand() {
  return (
    <section
      aria-label="Nos engagements"
      className="relative overflow-hidden border-y border-border/50 bg-gradient-to-r from-muted via-background to-muted py-3.5"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-1/2 h-32 w-32 -translate-y-1/2 rounded-full bg-secondary/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-1/2 h-32 w-32 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl"
      />

      <div className="mask-fade-x relative">
        <div
          className="flex w-max animate-marquee items-center hover:[animation-play-state:paused]"
          style={{ animationDuration: "42s" }}
        >
          {chips("a")}
          {chips("b")}
        </div>
      </div>
    </section>
  );
}
