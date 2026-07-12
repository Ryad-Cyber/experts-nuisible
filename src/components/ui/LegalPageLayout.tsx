import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { LEGAL_LAST_UPDATE } from "@/config/legal";

// Gabarit sobre partagé par les pages légales : typographie premium, aucune
// animation — ces pages sont faites pour être lues et inspirer confiance.

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-9">
      <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
      <div className="mt-2.5 space-y-2.5 text-sm leading-relaxed text-muted-foreground">
        {children}
      </div>
    </section>
  );
}

export function LegalPageLayout({
  title,
  intro,
  children,
}: {
  title: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <main className="bg-background py-12 md:py-16">
      <Container>
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-secondary">
            Informations légales
          </p>
          <h1 className="mt-2.5 text-3xl font-semibold tracking-tight text-balance md:text-4xl">
            {title}
          </h1>
          <p className="mt-3 text-base text-muted-foreground">{intro}</p>
          <p className="mt-1.5 text-xs text-muted-foreground">
            Dernière mise à jour : {LEGAL_LAST_UPDATE}
          </p>
          {children}
        </div>
      </Container>
    </main>
  );
}
