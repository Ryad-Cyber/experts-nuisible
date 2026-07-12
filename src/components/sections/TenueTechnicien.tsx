"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { Check, ShieldCheck, Sparkles } from "lucide-react";
import {
  EQUIPMENT_FICHE_BY_ID,
  FIELD_TOOLS,
  GEAR_CONTEXTS,
  SUIT_PIECES,
  type FieldTool,
  type GearContextId,
  type SuitPiece,
} from "@/data/equipment";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

// Rotation automatique des familles : toute la tenue « tourne » (cagoule, gants,
// combinaison, surchaussures, matériel) tant que le visiteur n'a pas interagi.
const AUTO_ROTATE_MS = 3800;

// -----------------------------------------------------------------------------
// Plateau d'inspection de la tenue : combinaison au centre, casque en haut,
// gants sur les côtés, surchaussures en bas — et le matériel professionnel entre
// les gants et la combinaison, filtré par famille de nuisibles. Chaque pièce
// s'inspecte au clic : la fiche (nom, usage, bénéfice client) s'ouvre à droite.
// -----------------------------------------------------------------------------

type TileProps = {
  image: string;
  alt: string;
  label: string;
  selected: boolean;
  onSelect: () => void;
  className?: string;
  sizes: string;
};

function GearTile({ image, alt, label, selected, onSelect, className, sizes }: TileProps) {
  const reducedMotion = Boolean(useReducedMotion());

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      aria-label={`Inspecter : ${label}`}
      className={cn(
        "group relative block w-full overflow-hidden rounded-2xl border bg-primary-dark text-left shadow-sm transition-all duration-300",
        "hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
        selected ? "border-accent ring-2 ring-accent" : "border-border/70 hover:border-accent/50",
        className
      )}
    >
      {/* Crossfade : l'ancienne variante s'efface pendant que la nouvelle
          apparaît — même grammaire que le slideshow des techniciens. */}
      <AnimatePresence initial={false}>
        <motion.div
          key={image}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0.01 : 0.55, ease: EASE }}
          className="absolute inset-0"
        >
          <Image
            src={image}
            alt={alt}
            fill
            sizes={sizes}
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />
        </motion.div>
      </AnimatePresence>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/65 to-transparent"
      />
      <motion.span
        key={label}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: reducedMotion ? 0.01 : 0.4 }}
        className="absolute bottom-2 left-2.5 text-[10px] font-semibold uppercase tracking-wide text-white/90 sm:text-xs"
      >
        {label}
      </motion.span>
      {selected && (
        <span className="absolute right-2 top-2 flex size-5 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-sm">
          <Check className="size-3" />
        </span>
      )}
    </button>
  );
}

// Emplacement d'un outil : glissement + fondu quand la famille change.
function ToolSlot({
  tool,
  selectedId,
  onSelect,
  reducedMotion,
}: {
  tool: FieldTool | undefined;
  selectedId: string;
  onSelect: (id: string) => void;
  reducedMotion: boolean;
}) {
  if (!tool) return null;
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={tool.id}
        initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 16, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -12, scale: 0.96 }}
        transition={{ duration: reducedMotion ? 0.01 : 0.35, ease: EASE }}
        className="relative aspect-square"
      >
        <GearTile
          image={tool.image}
          alt={tool.alt}
          label={tool.label}
          selected={selectedId === tool.id}
          onSelect={() => onSelect(tool.id)}
          className="absolute inset-0"
          sizes="(min-width: 1024px) 190px, 28vw"
        />
      </motion.div>
    </AnimatePresence>
  );
}

export function TenueTechnicien() {
  const prefersReducedMotion = Boolean(useReducedMotion());
  const [selectedId, setSelectedId] = useState("combinaison");
  const [context, setContext] = useState<GearContextId>("insectes");
  // La présentation tourne seule jusqu'à la première interaction : l'utilisateur
  // qui clique prend la main, la rotation ne redémarre pas dans son dos.
  const [autoRotate, setAutoRotate] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { amount: 0.25 });

  const tools = useMemo(() => FIELD_TOOLS.filter((tool) => tool.context === context), [context]);

  const pieceBySlot = useMemo(() => {
    const map = new Map<SuitPiece["slot"], SuitPiece>();
    for (const piece of SUIT_PIECES) map.set(piece.slot, piece);
    return map;
  }, []);

  // La fiche dépend aussi du contexte : en famille « Insectes », le slot casque
  // présente la cagoule anti-piqûres avec sa propre fiche.
  const fiche = useMemo(() => {
    const tool = FIELD_TOOLS.find((entry) => entry.id === selectedId);
    if (tool) return tool;
    const piece = SUIT_PIECES.find((entry) => entry.ficheId === selectedId);
    return (
      piece?.contextVariants?.[context]?.fiche ??
      EQUIPMENT_FICHE_BY_ID[selectedId] ??
      EQUIPMENT_FICHE_BY_ID.combinaison
    );
  }, [selectedId, context]);

  // Rotation automatique, uniquement section visible et hors reduced-motion.
  // setTimeout replanifié à chaque tour : un clic manuel repart d'un cycle plein.
  useEffect(() => {
    if (!autoRotate || prefersReducedMotion || !inView) return;
    const timer = setTimeout(() => {
      const index = GEAR_CONTEXTS.findIndex((option) => option.id === context);
      const next = GEAR_CONTEXTS[(index + 1) % GEAR_CONTEXTS.length].id;
      setContext(next);
      // Si la fiche ouverte était un outil, sa tuile disparaît avec l'ancienne
      // famille : on enchaîne sur le premier outil de la nouvelle. Les pièces de
      // la tenue, elles, restent sélectionnées (leur fiche suit le contexte).
      setSelectedId((current) => {
        const isTool = FIELD_TOOLS.some((tool) => tool.id === current);
        if (!isTool) return current;
        return FIELD_TOOLS.find((tool) => tool.context === next)?.id ?? current;
      });
    }, AUTO_ROTATE_MS);
    return () => clearTimeout(timer);
  }, [autoRotate, prefersReducedMotion, inView, context]);

  function handleSelect(id: string) {
    setAutoRotate(false);
    setSelectedId(id);
  }

  function changeContext(next: GearContextId) {
    setAutoRotate(false);
    if (next === context) return;
    setContext(next);
    // Choisir une famille = vouloir voir son matériel : on ouvre directement la
    // fiche du premier outil, pour que le changement soit lisible immédiatement.
    const firstTool = FIELD_TOOLS.find((tool) => tool.context === next);
    if (firstTool) setSelectedId(firstTool.id);
  }

  const tileVariants = {
    hidden: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 14, scale: 0.97 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: prefersReducedMotion
        ? { duration: 0.01 }
        : { duration: 0.5, delay: 0.05 * index, ease: EASE },
    }),
  };

  function renderPiece(slot: SuitPiece["slot"], index: number, className: string, sizes: string) {
    const piece = pieceBySlot.get(slot);
    if (!piece) return null;
    const variant = piece.contextVariants?.[context];
    return (
      <motion.div custom={index} variants={tileVariants} className={cn("relative", className)}>
        <GearTile
          image={variant?.image ?? piece.image}
          alt={variant?.alt ?? piece.alt}
          label={variant?.label ?? piece.label}
          selected={selectedId === piece.ficheId}
          onSelect={() => handleSelect(piece.ficheId)}
          className="absolute inset-0"
          sizes={sizes}
        />
      </motion.div>
    );
  }

  return (
    <div ref={rootRef} className="relative mt-10">
      <div className="mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-secondary shadow-sm backdrop-blur-sm">
          <ShieldCheck className="size-3.5" />
          Inspection avant intervention
        </span>
        <h3 className="mt-3 text-xl font-semibold tracking-tight text-balance md:text-2xl">
          La tenue d&apos;intervention, pièce par pièce
        </h3>
        <p className="mt-2 text-sm text-muted-foreground md:text-base">
          Voici exactement ce que porte — et transporte — le technicien avant d&apos;entrer
          chez vous. Touchez chaque pièce pour l&apos;inspecter.
        </p>
      </div>

      {/* Sélecteur de famille : adapte la tenue et le matériel présentés. */}
      <div className="mt-5 flex justify-center">
        <div
          role="group"
          aria-label="Matériel selon le type de nuisible"
          className="inline-flex items-center gap-0.5 rounded-full border border-border bg-background/90 p-1 shadow-sm"
        >
          {GEAR_CONTEXTS.map((option) => {
            const isActive = context === option.id;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => changeContext(option.id)}
                aria-pressed={isActive}
                className={cn(
                  "relative rounded-full px-3 py-1.5 text-xs font-medium transition-colors sm:text-sm",
                  isActive ? "text-accent-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="gear-context-pill"
                    className="absolute inset-0 rounded-full bg-accent"
                    transition={
                      prefersReducedMotion
                        ? { duration: 0.01 }
                        : { type: "spring", stiffness: 420, damping: 34 }
                    }
                  />
                )}
                <span className="relative">{option.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[1.45fr_1fr] lg:items-start">
        {/* Plateau d'inspection : vue éclatée de la tenue + matériel. */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-[1fr_1.4fr_1fr] items-center gap-2.5 sm:gap-4"
        >
          {/* Colonne gauche : gant + matériel */}
          <div className="flex flex-col gap-2.5 sm:gap-4">
            {renderPiece("gant-gauche", 1, "aspect-square", "(min-width: 1024px) 190px, 28vw")}
            <motion.div custom={3} variants={tileVariants}>
              <ToolSlot
                tool={tools[0]}
                selectedId={selectedId}
                onSelect={handleSelect}
                reducedMotion={prefersReducedMotion}
              />
            </motion.div>
          </div>

          {/* Colonne centrale : casque → combinaison → surchaussures */}
          <div className="flex flex-col items-center gap-2.5 sm:gap-4">
            {renderPiece("casque", 0, "aspect-square w-[76%]", "(min-width: 1024px) 210px, 26vw")}
            {renderPiece("combinaison", 2, "aspect-[3/4] w-full", "(min-width: 1024px) 280px, 38vw")}
            {renderPiece("surchaussures", 5, "aspect-square w-[76%]", "(min-width: 1024px) 210px, 26vw")}
          </div>

          {/* Colonne droite : gant + matériel */}
          <div className="flex flex-col gap-2.5 sm:gap-4">
            {renderPiece("gant-droit", 1, "aspect-square", "(min-width: 1024px) 190px, 28vw")}
            <motion.div custom={3} variants={tileVariants}>
              <ToolSlot
                tool={tools[1]}
                selectedId={selectedId}
                onSelect={handleSelect}
                reducedMotion={prefersReducedMotion}
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Fiche d'inspection : nom, usage, bénéfice client. */}
        <div className="rounded-[2rem] border border-border bg-background p-5 shadow-lg lg:sticky lg:top-24 lg:p-6">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={fiche.id}
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
              transition={{ duration: prefersReducedMotion ? 0.01 : 0.25, ease: "easeOut" }}
              className="flex flex-col gap-4"
            >
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-secondary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-secondary">
                <span className="size-1.5 rounded-full bg-secondary" />
                Équipement inspecté
              </span>

              <h4 className="text-xl font-semibold tracking-tight md:text-2xl">{fiche.name}</h4>

              <p className="text-sm leading-relaxed text-muted-foreground">{fiche.why}</p>

              <div className="rounded-2xl border border-border bg-muted/50 p-4">
                <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-secondary">
                  <Sparkles className="size-3.5" />
                  Ce que ça change pour vous
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {fiche.benefit}
                </p>
              </div>

              <p className="text-xs text-muted-foreground">
                Touchez une autre pièce de la tenue pour l&apos;inspecter.
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
