"use client";

import { useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className="flex size-10 items-center justify-center rounded-full text-foreground"
      >
        {open ? <X className="size-6" /> : <Menu className="size-6" />}
      </button>

      <div
        className={cn(
          "fixed inset-x-0 top-16 z-40 flex flex-col gap-1 border-b border-border bg-background p-4 shadow-lg transition-all",
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0"
        )}
      >
        {siteConfig.nav.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setOpen(false)}
            className="rounded-lg px-3 py-3 text-base font-medium text-foreground hover:bg-muted"
          >
            {link.label}
          </a>
        ))}

        <Button href={siteConfig.phone.href} className="mt-2 w-full">
          <Phone className="size-4" />
          {siteConfig.cta.callNow}
        </Button>
      </div>
    </div>
  );
}
