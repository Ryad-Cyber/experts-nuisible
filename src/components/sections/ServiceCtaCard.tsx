"use client";

import Link from "next/link";
import { Box, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { siteConfig, whatsappHrefFor } from "@/config/site";
import { requestQuoteForPest } from "@/lib/quoteEvents";

// Carte CTA des pages /services/[slug] — même grammaire que PestCtaCard, mais à
// l'échelle d'un service : le devis pré-remplit le service dans le formulaire
// (handoff cross-page via quoteEvents), le WhatsApp annonce le besoin.
type ServiceCtaCardProps = {
  serviceId: string;
  serviceTitle: string;
};

export function ServiceCtaCard({ serviceId, serviceTitle }: ServiceCtaCardProps) {
  const whatsappMessage = `Bonjour, j'ai besoin d'une intervention (${serviceTitle.toLowerCase()}). Je vous envoie des photos de la situation.`;

  return (
    <div className="rounded-[2rem] border border-border bg-background p-5 shadow-lg lg:p-6">
      <p className="text-sm font-semibold uppercase tracking-wider text-secondary">
        Intervention rapide
      </p>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        Un technicien vous répond 24h/24 — décrivez ce que vous avez vu, le prix est annoncé
        avant intervention.
      </p>

      <div className="mt-4 flex flex-col gap-2.5">
        <Button href={siteConfig.phone.href} size="lg" className="w-full">
          <Phone className="size-4" />
          {siteConfig.cta.callNow} — {siteConfig.phone.display}
        </Button>
        <Button
          href={whatsappHrefFor(whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          variant="secondary"
          size="lg"
          className="w-full"
        >
          <WhatsAppIcon className="size-4" />
          Envoyer des photos WhatsApp
        </Button>
        <button
          type="button"
          onClick={() =>
            requestQuoteForPest({
              serviceId,
              message: `Bonjour, j'ai besoin d'une intervention (${serviceTitle.toLowerCase()}). Merci de me recontacter pour un devis.`,
            })
          }
          className="text-center text-sm font-medium text-secondary underline-offset-4 transition-colors hover:text-foreground hover:underline"
        >
          ou demandez un devis écrit — formulaire pré-rempli
        </button>
      </div>

      <div className="mt-5 border-t border-border pt-4">
        <Link
          href="/identifier#identifier"
          className="group flex items-center gap-2.5 text-sm font-medium text-foreground/85 transition-colors hover:text-foreground"
        >
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-secondary/10 text-secondary">
            <Box className="size-4" />
          </span>
          Pas sûr du nuisible ? Identifiez-le en 3D
          <span className="ml-auto text-secondary transition-transform duration-300 group-hover:translate-x-0.5">
            →
          </span>
        </Link>
      </div>
    </div>
  );
}
