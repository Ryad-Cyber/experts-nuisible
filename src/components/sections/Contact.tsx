"use client";

import { useState, type FormEvent } from "react";
import { AlertCircle, Clock, Loader2, Mail, MapPin, Phone, Send } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { services } from "@/data/services";

const inputStyles =
  "w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent";

function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "submitted" | "error">("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");

    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          phone: data.get("phone"),
          email: data.get("email"),
          service: data.get("service"),
          message: data.get("message"),
        }),
      });

      if (!response.ok) throw new Error("request failed");
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
          Merci, votre demande de devis a bien été enregistrée. Un technicien vous
          recontacte rapidement — pour aller plus vite, appelez directement le{" "}
          <a href={siteConfig.phone.href} className="font-medium text-foreground hover:underline">
            {siteConfig.phone.display}
          </a>
          .
        </p>
      </Card>
    );
  }

  return (
    <Card>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="text-sm font-medium">
              Nom
            </label>
            <input id="name" name="name" type="text" required className={cn(inputStyles)} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="phone" className="text-sm font-medium">
              Téléphone
            </label>
            <input id="phone" name="phone" type="tel" required className={cn(inputStyles)} />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input id="email" name="email" type="email" className={cn(inputStyles)} />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="service" className="text-sm font-medium">
            Type de nuisible
          </label>
          <select id="service" name="service" required defaultValue="" className={cn(inputStyles)}>
            <option value="" disabled>
              Sélectionnez une option
            </option>
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.title}
              </option>
            ))}
            <option value="autre">Autre</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="message" className="text-sm font-medium">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            placeholder="Décrivez votre situation en quelques mots..."
            className={cn(inputStyles, "resize-none")}
          />
        </div>

        {status === "error" && (
          <p className="flex items-center gap-2 rounded-lg bg-red-50 px-3.5 py-2.5 text-sm text-red-700">
            <AlertCircle className="size-4 shrink-0" />
            L&apos;envoi a échoué. Réessayez ou appelez directement le{" "}
            <a href={siteConfig.phone.href} className="font-medium underline">
              {siteConfig.phone.display}
            </a>
            .
          </p>
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
    </Card>
  );
}

export function Contact() {
  return (
    <Section id="contact" variant="muted" className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 right-[-8rem] h-[30rem] w-[30rem] rounded-full bg-secondary/10 blur-3xl"
      />

      <Reveal className="relative mx-auto max-w-2xl text-center">
        <span className="text-sm font-semibold uppercase tracking-wider text-secondary">
          Contact
        </span>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance md:text-4xl">
          Parlons de votre intervention
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Par téléphone pour une réponse immédiate, ou via le formulaire pour un devis
          gratuit et sans engagement.
        </p>
      </Reveal>

      <div className="relative mt-12 grid gap-8 lg:grid-cols-2 lg:gap-12">
        <Reveal className="flex flex-col gap-6">
          <Card className="flex flex-col gap-5">
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

            <p className="flex items-center gap-3 text-sm">
              <MapPin className="size-4 shrink-0 text-secondary" />
              {siteConfig.address}
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
          </Card>
        </Reveal>

        <Reveal delay={0.12}>
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  );
}
