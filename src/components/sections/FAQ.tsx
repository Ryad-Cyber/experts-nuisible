"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, Plus } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { faqItems } from "@/data/faq";

const INITIAL_COUNT = 4;

function FaqRow({
  question,
  answer,
  isOpen,
  onToggle,
  reducedMotion,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  reducedMotion: boolean;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-background shadow-sm transition-colors hover:border-secondary/40">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
      >
        <span className="text-base font-semibold tracking-tight text-foreground sm:text-lg">
          {question}
        </span>
        <span
          className={`flex size-8 shrink-0 items-center justify-center rounded-full transition-colors ${
            isOpen ? "bg-accent text-accent-foreground" : "bg-muted text-secondary"
          }`}
        >
          <ChevronDown
            className={`size-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={reducedMotion ? { duration: 0.01 } : { duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground sm:px-6 sm:pb-6">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const [showAll, setShowAll] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const visible = showAll ? faqItems : faqItems.slice(0, INITIAL_COUNT);

  return (
    <Section id="faq" className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-10 h-[24rem] w-[24rem] rounded-full bg-accent/10 blur-3xl"
      />

      <Reveal className="relative mx-auto max-w-2xl text-center">
        <span className="text-sm font-semibold uppercase tracking-wider text-secondary">
          FAQ
        </span>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance md:text-4xl">
          Questions fréquentes
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Tout ce qu&apos;il faut savoir avant votre intervention. Une autre question ?
          Contactez-nous directement.
        </p>
      </Reveal>

      <Reveal delay={0.1} className="relative mx-auto mt-12 flex max-w-3xl flex-col gap-3">
        {visible.map((item, index) => (
          <FaqRow
            key={item.question}
            question={item.question}
            answer={item.answer}
            isOpen={open === index}
            onToggle={() => setOpen(open === index ? null : index)}
            reducedMotion={Boolean(prefersReducedMotion)}
          />
        ))}
      </Reveal>

      {!showAll && faqItems.length > INITIAL_COUNT && (
        <div className="relative mt-8 flex justify-center">
          <Button type="button" variant="secondary" size="lg" onClick={() => setShowAll(true)}>
            <Plus className="size-4" />
            Voir toutes les questions
          </Button>
        </div>
      )}
    </Section>
  );
}
