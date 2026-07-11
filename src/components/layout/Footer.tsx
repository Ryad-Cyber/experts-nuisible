import type { SVGProps } from "react";
import { ArrowUpRight, BadgeCheck, Mail, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";
import { services } from "@/data/services";
import { Container } from "@/components/ui/Container";
import { Logo } from "./Logo";

function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

const footerNav = [
  { label: "Services", href: "#services" },
  { label: "Agence", href: "#agence" },
  { label: "Zones d'intervention", href: "#zone-intervention" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-primary-dark text-white">
      {/* Premium light details */}
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
      <div aria-hidden className="bg-grain pointer-events-none absolute inset-0 opacity-50" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/4 h-96 w-96 rounded-full bg-secondary/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 right-0 h-96 w-96 rounded-full bg-accent/10 blur-3xl"
      />

      <Container className="relative grid gap-8 py-8 md:py-10 lg:grid-cols-[1.6fr_1fr_1fr_1.3fr]">
        {/* Brand */}
        <div className="space-y-3.5">
          <div className="flex items-center gap-2.5">
            <Logo size="md" />
            <div>
              <p className="bg-gradient-to-r from-accent-light via-accent to-accent-dark bg-clip-text text-lg font-bold tracking-tight text-transparent drop-shadow-[0_1px_10px_rgb(245_196_51_/_0.35)]">
                {siteConfig.name}
              </p>
              <p className="text-xs font-medium text-white/60">Protection habitat &amp; professionnels</p>
            </div>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-white/65">{siteConfig.description}</p>
          <a
            href={siteConfig.social.instagram.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 py-1.5 pl-1.5 pr-3.5 text-sm text-white/75 transition-all duration-300 hover:border-accent/50 hover:bg-white/10 hover:text-white"
          >
            <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent-light via-accent to-accent-dark text-primary-dark transition-transform duration-300 group-hover:scale-110">
              <InstagramIcon className="size-3.5" />
            </span>
            @{siteConfig.social.instagram.handle}
          </a>
        </div>

        {/* Navigation */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-accent-light">Navigation</p>
          <ul className="mt-4 space-y-2.5">
            {footerNav.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="group inline-flex items-center gap-1.5 text-sm text-white/70 transition-colors hover:text-white"
                >
                  <span className="h-px w-0 bg-accent transition-all duration-300 group-hover:w-4" />
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-accent-light">Services</p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {services.map((service) => (
              <a
                key={service.id}
                href="#services"
                className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-xs font-medium text-white/75 transition-colors hover:border-accent/50 hover:bg-white/10 hover:text-white"
              >
                {service.title}
              </a>
            ))}
          </div>
        </div>

        {/* Availability + contact */}
        <div className="space-y-3.5">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-300">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
            </span>
            Disponible 24/7
          </span>

          <a
            href={siteConfig.phone.href}
            className="cta-pulse group flex items-center gap-2.5 rounded-2xl bg-accent px-4 py-3.5 text-accent-foreground shadow-lg transition-transform hover:scale-[1.02]"
          >
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-accent-foreground/10">
              <Phone className="size-4" />
            </span>
            <span>
              <span className="block text-xs font-medium uppercase tracking-wide opacity-70">Appel immédiat</span>
              <span className="block text-base font-bold leading-tight">{siteConfig.phone.display}</span>
            </span>
            <ArrowUpRight className="ml-auto size-5 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100" />
          </a>

          <div className="space-y-2 text-sm text-white/70">
            <a
              href={`mailto:${siteConfig.email}`}
              className="group flex items-center gap-2.5 transition-colors hover:text-white"
            >
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 transition-colors duration-300 group-hover:border-accent/50 group-hover:bg-white/10">
                <Mail className="size-3.5 text-accent-light" />
              </span>
              {siteConfig.email}
            </a>
            <p className="flex items-center gap-2.5">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5">
                <MapPin className="size-3.5 text-accent-light" />
              </span>
              {siteConfig.serviceArea}
            </p>
          </div>
        </div>
      </Container>

      <div className="relative border-t border-white/10 py-3.5">
        <Container className="flex flex-col items-center justify-between gap-3 text-xs text-white/55 sm:flex-row">
          <span>© {year} {siteConfig.name}. Tous droits réservés.</span>

          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
            <BadgeCheck className="size-3.5 shrink-0 text-accent-light" />
            <span className="leading-tight">
              <span className="font-semibold text-white/80">Certibiocide</span>
              <span className="text-white/50"> — Certification reconnue par le Ministère de l&apos;Agriculture</span>
            </span>
          </span>

          <span>{siteConfig.hours[0]?.days} — {siteConfig.hours[0]?.hours}</span>
        </Container>
      </div>
    </footer>
  );
}
