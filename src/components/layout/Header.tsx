"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Phone } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";

function useScrolled(threshold = 8) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > threshold);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
}

export function Header() {
  const scrolled = useScrolled();

  return (
    <header
      className={cn(
        "glass sticky top-0 z-50 border-b transition-shadow duration-300",
        scrolled ? "border-border/60 shadow-sm" : "border-transparent"
      )}
    >
      <Container className="flex h-16 items-center justify-between md:h-20">
        <Link href="/" className="flex items-center gap-2.5">
          <Logo size="md" />
          <span className="text-lg font-semibold tracking-tight md:text-xl">
            {siteConfig.name}
          </span>
        </Link>

        <nav aria-label="Navigation principale" className="hidden items-center gap-6 lg:gap-8 md:flex">
          {siteConfig.nav.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative py-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
              <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-foreground transition-transform duration-200 ease-out group-hover:scale-x-100" />
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
