import type { SVGProps } from "react";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";
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

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-border bg-primary-dark text-white">
      <div aria-hidden className="bg-grain pointer-events-none absolute inset-0 opacity-60" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/3 h-96 w-96 rounded-full bg-secondary/10 blur-3xl"
      />
      <Container className="relative grid gap-10 py-12 md:grid-cols-3 md:py-16">
        <div className="space-y-4">
          <div className="flex items-center gap-2.5">
            <Logo size="md" />
            <p className="text-lg font-semibold tracking-tight">{siteConfig.name}</p>
          </div>
          <p className="text-sm text-white/70">{siteConfig.description}</p>
          <a
            href={siteConfig.social.instagram.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white"
          >
            <InstagramIcon className="size-4" />@{siteConfig.social.instagram.handle}
          </a>
        </div>

        <div className="space-y-3 text-sm">
          <a href={siteConfig.phone.href} className="flex items-center gap-2 hover:underline">
            <Phone className="size-4" />
            {siteConfig.phone.display}
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            className="flex items-center gap-2 hover:underline"
          >
            <Mail className="size-4" />
            {siteConfig.email}
          </a>
          <p className="flex items-center gap-2">
            <MapPin className="size-4" />
            {siteConfig.address}
          </p>
        </div>

        <div className="space-y-3 text-sm">
          {siteConfig.hours.map((slot) => (
            <p key={slot.days} className="flex items-center gap-2">
              <Clock className="size-4 shrink-0" />
              <span>
                {slot.days} — {slot.hours}
              </span>
            </p>
          ))}
        </div>
      </Container>

      <div className="border-t border-white/10 py-6">
        <Container className="text-xs text-white/60">
          © {year} {siteConfig.name}. Tous droits réservés.
        </Container>
      </div>
    </footer>
  );
}
