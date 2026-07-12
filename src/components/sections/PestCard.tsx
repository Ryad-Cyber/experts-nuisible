"use client";

import { useRef, useState, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowUpRight, type LucideIcon } from "lucide-react";
import type { Pest } from "@/types";

type PestCardProps = {
  pest: Pest;
  index: number;
  serviceTitle: string;
  serviceIcon: LucideIcon;
};

const springConfig = { stiffness: 220, damping: 20, mass: 0.6 };

// Carte cliquable dès qu'une fiche d'identification existe : le rail devient
// l'entrée de l'entonnoir "j'identifie mon nuisible" (/galerie-3d).
function CardShell({ pest, children }: { pest: Pest; children: ReactNode }) {
  if (!pest.guideId) return <>{children}</>;
  return (
    <Link
      href={`/galerie-3d?nuisible=${pest.guideId}`}
      aria-label={`${pest.name} — ouvrir la fiche d'identification`}
      className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      {children}
    </Link>
  );
}

export function PestCard({ pest, index, serviceTitle, serviceIcon: Icon }: PestCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [canTilt] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches
  );

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [9, -9]), springConfig);
  const rotateY = useSpring(useTransform(px, [0, 1], [-9, 9]), springConfig);
  const spotlightX = useTransform(px, (v) => `${v * 100}%`);
  const spotlightY = useTransform(py, (v) => `${v * 100}%`);
  const spotlight = useMotionTemplate`radial-gradient(280px circle at ${spotlightX} ${spotlightY}, rgba(255,255,255,0.16), transparent 70%)`;

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (!canTilt || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    px.set((event.clientX - rect.left) / rect.width);
    py.set((event.clientY - rect.top) / rect.height);
  }

  function handlePointerLeave() {
    px.set(0.5);
    py.set(0.5);
  }

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 32, scale: 0.96 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
        },
      }}
      className="group relative w-[52vw] shrink-0 snap-start sm:w-[194px] lg:w-[204px]"
    >
      <CardShell pest={pest}>
        <motion.div
          ref={ref}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          whileHover={{ scale: 1.03 }}
          transition={springConfig}
          style={{ rotateX, rotateY, transformPerspective: 900 }}
          className="relative aspect-[5/6] overflow-hidden rounded-3xl bg-primary-dark shadow-xl"
        >
          <Image
            src={pest.image}
            alt={pest.name}
            fill
            sizes="(min-width: 1024px) 220px, 58vw"
            className="scale-[1.18] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.28]"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />

          <motion.div
            aria-hidden
            style={{ background: spotlight }}
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />

          <span className="absolute right-3 top-3 rounded-full border border-white/20 bg-white/10 px-1.5 py-0.5 text-[11px] font-medium tabular-nums text-white/80 backdrop-blur-sm">
            {String(index + 1).padStart(2, "0")}
          </span>

          {pest.guideId && (
            <span className="absolute left-3 top-3 flex size-6 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white/80 backdrop-blur-sm transition-colors duration-300 group-hover:bg-accent group-hover:text-accent-foreground">
              <ArrowUpRight className="size-3.5" />
            </span>
          )}

          <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-3">
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-accent px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-accent-foreground">
              <Icon className="size-3" />
              {serviceTitle}
            </span>
            <h3 className="text-base font-semibold tracking-tight text-white">{pest.name}</h3>
          </div>
        </motion.div>
      </CardShell>
    </motion.div>
  );
}
