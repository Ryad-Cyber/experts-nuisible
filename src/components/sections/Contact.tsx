"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Image from "next/image";
import { usePlausible } from "next-plausible";
import { AlertCircle, Clock, Loader2, Mail, MapPin, Phone, Send } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { services } from "@/data/services";
import { NUISIBLE_ZONE_OPTIONS } from "@/data/nuisibleZoneOptions";
import {
  QUOTE_CITY_EVENT,
  QUOTE_PEST_EVENT,
  QUOTE_ZONE_EVENT,
  flushPendingQuote,
  type QuoteCityDetail,
  type QuotePestDetail,
  type QuoteZoneDetail,
} from "@/lib/quoteEvents";
import type { PlausibleEvents } from "@/lib/analytics";

const inputStyles =
  "w-full rounded-lg border border-border bg-background/95 px-3.5 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent shadow-sm transition-shadow";

const selectStyles = cn(inputStyles, "appearance-none bg-no-repeat pr-9");

// Custom chevron for <select> — kept as a plain style object rather than a Tailwind
// arbitrary-value class, since the SVG data URI's literal spaces don't survive Tailwind's
// class-name parsing.
const selectChevronStyle = {
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2355614c' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
  backgroundPosition: "right 0.9rem center",
  backgroundSize: "16px 16px",
};

const labelStyles = "text-xs font-medium uppercase tracking-wide text-muted-foreground";

type QuoteData = {
  name: string;
  phone: string;
  email: string;
  service: string;
  location: string;
  message: string;
};

// Guaranteed fallback: build a pre-filled email to the business address so a submission is
// never lost even if the automatic email service is down or not yet configured.
function buildMailtoHref(data: QuoteData): string {
  const serviceTitle =
    data.service === "autre"
      ? "Autre"
      : data.service
        ? services.find((s) => s.id === data.service)?.title ?? data.service
        : "";

  const subject = serviceTitle ? `Demande de devis — ${serviceTitle}` : "Demande de devis";
  const lines = [
    data.name && `Nom : ${data.name}`,
    data.phone && `Téléphone : ${data.phone}`,
    data.email && `Email : ${data.email}`,
    serviceTitle && `Type de nuisible : ${serviceTitle}`,
    data.location && `Zone concernée : ${data.location}`,
    data.message && `Message : ${data.message}`,
  ].filter(Boolean);

  return `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
    lines.join("\n")
  )}`;
}

function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "submitted" | "error">("idle");
  const [validationError, setValidationError] = useState<string | null>(null);
  const [mailtoHref, setMailtoHref] = useState(`mailto:${siteConfig.email}`);
  const [zoneSeen, setZoneSeen] = useState("");
  const [zoneOther, setZoneOther] = useState("");
  const [serviceSeen, setServiceSeen] = useState("");
  const [justPrefilled, setJustPrefilled] = useState(false);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const plausible = usePlausible<PlausibleEvents>();

  useEffect(() => {
    function flashPrefilled() {
      setJustPrefilled(true);
      window.setTimeout(() => setJustPrefilled(false), 2000);
    }

    function onZoneSelect(event: Event) {
      const { label } = (event as CustomEvent<QuoteZoneDetail>).detail;
      setZoneSeen(label);
      flashPrefilled();
    }

    function onCitySelect(event: Event) {
      const { city } = (event as CustomEvent<QuoteCityDetail>).detail;
      if (messageRef.current && !messageRef.current.value.trim()) {
        messageRef.current.value = `Bonjour, j'aimerais un devis pour une intervention à/en ${city}.`;
      }
      flashPrefilled();
    }

    function onPestSelect(event: Event) {
      const { serviceId, message } = (event as CustomEvent<QuotePestDetail>).detail;
      setServiceSeen(services.some((s) => s.id === serviceId) ? serviceId : "autre");
      if (messageRef.current && !messageRef.current.value.trim()) {
        messageRef.current.value = message;
      }
      flashPrefilled();
    }

    window.addEventListener(QUOTE_ZONE_EVENT, onZoneSelect);
    window.addEventListener(QUOTE_CITY_EVENT, onCitySelect);
    window.addEventListener(QUOTE_PEST_EVENT, onPestSelect);
    // Rejoue une éventuelle demande initiée depuis une autre page (ex. fiche
    // nuisible ou villa 3D sur /galerie-3d) — les listeners viennent d'être posés.
    flushPendingQuote();
    return () => {
      window.removeEventListener(QUOTE_ZONE_EVENT, onZoneSelect);
      window.removeEventListener(QUOTE_CITY_EVENT, onCitySelect);
      window.removeEventListener(QUOTE_PEST_EVENT, onPestSelect);
    };
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);
    const phone = String(data.get("phone") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();

    // Everything is optional except the contact method: at least one of phone / email.
    if (!phone && !email) {
      setValidationError("Merci de renseigner au moins un moyen de contact : téléphone ou e-mail.");
      return;
    }
    setValidationError(null);
    setStatus("loading");

    const service = String(data.get("service") ?? "");
    const location = zoneSeen === "Autre" ? zoneOther : zoneSeen;
    const name = String(data.get("name") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    // Prepare the email fallback in case the automatic send fails.
    setMailtoHref(buildMailtoHref({ name, phone, email, service, location, message }));

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, email, service, location, message }),
      });

      if (!response.ok) throw new Error("request failed");
      plausible("Contact Form Submitted", { props: { service } });
      setStatus("submitted");
    } catch {
      setStatus("error");
    }
  }

  if (status === "submitted") {
    return (
      <Card className="flex flex-col items-center gap-3 text-center">
        <span className="inline-flex size-12 items-center justify-center rounded-full bg-secondary/10 text-secondary">
          <Send className="size-6" />
        </span>
        <h3 className="text-lg font-semibold">Demande envoyée</h3>
        <p className="text-sm text-muted-foreground">
          Merci, votre demande a bien été envoyée. Notre équipe l&apos;étudiera dans les
          plus brefs délais et vous recontactera très rapidement.
        </p>
      </Card>
    );
  }

  return (
    <div
      className={cn(
        "glass relative overflow-hidden rounded-2xl border border-white/50 p-5 shadow-xl backdrop-blur-xl transition-shadow duration-500 sm:p-6",
        justPrefilled && "ring-2 ring-accent shadow-glow-accent"
      )}
    >
      <form onSubmit={handleSubmit} className="relative flex flex-col gap-3.5">
        <div className="grid gap-3.5 sm:grid-cols-2">
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className={labelStyles}>
              Nom
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Votre nom"
              className={cn(inputStyles)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="phone" className={labelStyles}>
              Téléphone
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="06 12 34 56 78"
              onChange={() => setValidationError(null)}
              className={cn(inputStyles)}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="email" className={labelStyles}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="vous@exemple.com"
            onChange={() => setValidationError(null)}
            className={cn(inputStyles)}
          />
        </div>

        <p className="-mt-1.5 text-xs text-muted-foreground">
          Téléphone ou e-mail : un seul des deux suffit.
        </p>

        <div className="grid gap-3.5 sm:grid-cols-2">
          <div className="flex flex-col gap-1">
            <label htmlFor="service" className={labelStyles}>
              Type de nuisible
            </label>
            <select
              id="service"
              name="service"
              value={serviceSeen}
              onChange={(event) => setServiceSeen(event.target.value)}
              className={selectStyles}
              style={selectChevronStyle}
            >
              <option value="">Non précisé</option>
              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.title}
                </option>
              ))}
              <option value="autre">Autre</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="zoneSeen" className={labelStyles}>
              Emplacement
            </label>
            <select
              id="zoneSeen"
              name="zoneSeen"
              value={zoneSeen}
              onChange={(event) => setZoneSeen(event.target.value)}
              className={selectStyles}
              style={selectChevronStyle}
            >
              <option value="">Non précisé</option>
              {NUISIBLE_ZONE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        {zoneSeen === "Autre" && (
          <input
            type="text"
            value={zoneOther}
            onChange={(event) => setZoneOther(event.target.value)}
            placeholder="Précisez l'endroit..."
            className={cn(inputStyles, "-mt-1.5")}
          />
        )}

        <div className="flex flex-col gap-1">
          <label htmlFor="message" className={labelStyles}>
            Message
          </label>
          <textarea
            ref={messageRef}
            id="message"
            name="message"
            rows={2}
            placeholder="Décrivez votre situation en quelques mots..."
            className={cn(inputStyles, "resize-none")}
          />
        </div>

        {validationError && (
          <p className="flex items-center gap-2 rounded-lg bg-amber-50 px-3.5 py-2.5 text-sm text-amber-800">
            <AlertCircle className="size-4 shrink-0" />
            {validationError}
          </p>
        )}

        {status === "error" && (
          <div className="rounded-lg bg-red-50 px-3.5 py-3 text-sm text-red-700">
            <p className="flex items-start gap-2">
              <AlertCircle className="mt-0.5 size-4 shrink-0" />
              <span>
                L&apos;envoi automatique a rencontré un problème. Envoyez votre demande par
                e-mail en un clic, ou appelez-nous directement.
              </span>
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <a
                href={mailtoHref}
                className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-secondary/90"
              >
                <Mail className="size-4" />
                Envoyer par e-mail
              </a>
              <a
                href={siteConfig.phone.href}
                className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
              >
                <Phone className="size-4" />
                {siteConfig.phone.display}
              </a>
            </div>
          </div>
        )}

        <Button type="submit" size="lg" disabled={status === "loading"} className="w-full">
          {status === "loading" ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Send className="size-4" />
          )}
          {status === "loading" ? "Envoi en cours..." : "Demander un devis gratuit"}
        </Button>
      </form>
    </div>
  );
}

export function Contact() {
  return (
    <section id="contact" className="relative isolate overflow-hidden py-12 md:py-16">
      {/* Full-bleed photo — a real design element, not a faint backdrop. */}
      <Image
        src="/technicien_ia.jpg"
        alt="Technicien Experts Nuisible en intervention devant une habitation"
        fill
        sizes="100vw"
        className="-z-20 object-cover object-[62%_18%] sm:object-[58%_top]"
        priority={false}
      />
      {/* Light veil for legibility, stronger where the cards sit, sheer over the technician's face. */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-white/90 via-white/40 to-white/10" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-white/65 via-transparent to-white/25" />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 right-[-8rem] -z-10 h-[30rem] w-[30rem] rounded-full bg-secondary/15 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-[-6rem] -z-10 h-[24rem] w-[24rem] rounded-full bg-accent/15 blur-3xl"
      />

      <Container className="relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-secondary">
            Contact
          </span>
          <h2 className="mt-2.5 text-2xl font-semibold tracking-tight text-balance md:text-3xl">
            Parlons de votre intervention
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            Par téléphone pour une réponse immédiate, ou via le formulaire pour un devis
            gratuit et sans engagement.
          </p>
        </Reveal>

        <div className="mt-8 grid gap-6 lg:grid-cols-2 lg:gap-10">
          <Reveal className="flex flex-col gap-6">
            <div className="glass flex flex-col gap-4 rounded-2xl border border-white/50 p-5 shadow-xl backdrop-blur-xl sm:p-6">
              <a
                href={siteConfig.phone.href}
                className="flex items-center gap-3 rounded-xl bg-accent px-4 py-3.5 text-accent-foreground transition-colors hover:bg-accent/90"
              >
                <Phone className="size-5" />
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide opacity-80">
                    Appel immédiat
                  </p>
                  <p className="text-lg font-semibold">{siteConfig.phone.display}</p>
                </div>
              </a>

              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-3 text-sm hover:underline"
              >
                <Mail className="size-4 text-secondary" />
                {siteConfig.email}
              </a>

              <a
                href={siteConfig.whatsapp.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm hover:underline"
              >
                <WhatsAppIcon className="size-4 shrink-0 text-[#25D366]" />
                WhatsApp — envoyez des photos de votre situation
              </a>

              <p className="flex items-center gap-3 text-sm">
                <MapPin className="size-4 shrink-0 text-secondary" />
                {siteConfig.serviceArea}
              </p>

              <div className="flex flex-col gap-1.5 border-t border-border pt-4">
                {siteConfig.hours.map((slot) => (
                  <p key={slot.days} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Clock className="size-4 shrink-0" />
                    <span>
                      {slot.days} — {slot.hours}
                    </span>
                  </p>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <ContactForm />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
