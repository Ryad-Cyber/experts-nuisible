import Link from "next/link";
import { Phone } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";

export function Header() {
  return (
    <header className="glass sticky top-0 z-50 border-b border-border/60">
      <Container className="flex h-16 items-center justify-between md:h-20">
        <Link href="/" className="flex items-center gap-2.5">
          <Logo size="md" />
          <span className="text-lg font-semibold tracking-tight md:text-xl">
            {siteConfig.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:gap-8 md:flex">
          {siteConfig.nav.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button href={siteConfig.phone.href} size="sm">
            <Phone className="size-4" />
            {siteConfig.cta.callNow}
          </Button>
        </div>

        <MobileNav />
      </Container>
    </header>
  );
}
