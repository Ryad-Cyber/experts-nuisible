import Image from "next/image";
import { Clock3, FileCheck2, Phone, ShieldCheck } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { siteConfig } from "@/config/site";
import { HeroBackdrop } from "./HeroBackdrop";

const trustPoints = [
  { icon: Clock3, label: "Intervention sous 24h" },
  { icon: ShieldCheck, label: "Techniciens certifiés" },
  { icon: Phone, label: "Devis gratuit par téléphone" },
];

export function Hero() {
  return (
    <Section className="relative overflow-hidden pt-28 pb-20 md:pt-32 md:pb-24 lg:py-28">
      <HeroBackdrop />

      <div className="relative grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-16">
        <StaggerGroup className="flex flex-col items-center gap-8 text-center lg:items-start lg:text-left">
          <StaggerItem>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-4 py-1.5 text-sm font-medium text-muted-foreground">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-accent" />
              </span>
              Urgence 24h/24 — 7j/7
            </span>
          </StaggerItem>

          <StaggerItem>
            <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl md:text-6xl lg:text-6xl">
              Dératisation &amp; désinsectisation.
              <br />
              <span className="text-muted-foreground">Intervention rapide, sans compromis.</span>
            </h1>
          </StaggerItem>

          <StaggerItem>
            <p className="max-w-xl text-lg text-muted-foreground md:text-xl">
              {siteConfig.description}
            </p>
          </StaggerItem>

          <StaggerItem className="flex flex-col items-center gap-4 sm:flex-row">
            <Button href={siteConfig.phone.href} size="lg" className="cta-pulse">
              <Phone className="size-5" />
              {siteConfig.cta.callNow} — {siteConfig.phone.display}
            </Button>
            <Button href="#contact" variant="secondary" size="lg">
              <FileCheck2 className="size-5" />
              {siteConfig.cta.freeQuote}
            </Button>
          </StaggerItem>

          <StaggerItem className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-8">
            {trustPoints.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground lg:justify-start"
              >
                <Icon className="size-4 text-foreground" />
                {label}
              </div>
            ))}
          </StaggerItem>
        </StaggerGroup>

        <Reveal delay={0.15} y={32} className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-6 -z-10 rounded-[2.5rem] bg-secondary/10 blur-2xl"
          />
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] border border-border bg-white p-6 shadow-xl">
            <Image
              src="/image_nuisible.jpeg"
              alt="Experts Nuisible — dératisation, désinsectisation, désinfection"
              fill
              sizes="(min-width: 1024px) 480px, 90vw"
              className="object-contain"
              priority
            />
          </div>

          <div className="absolute -bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-2xl border border-border bg-background px-4 py-3 shadow-md sm:left-auto sm:right-6 sm:translate-x-0">
            <ShieldCheck className="size-5 text-secondary" />
            <div className="text-left">
              <p className="text-sm font-semibold leading-none">Sans engagement</p>
              <p className="mt-1 text-xs text-muted-foreground">Devis gratuit &amp; rapide</p>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
