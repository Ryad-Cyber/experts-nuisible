"use client";

import { useEffect } from "react";
import { usePlausible } from "next-plausible";
import type { PlausibleEvents } from "@/lib/analytics";

function resolveLocation(anchor: HTMLElement): string {
  if (anchor.closest("header")) return "header";
  if (anchor.closest("footer")) return "footer";
  const section = anchor.closest("section[id]");
  if (section instanceof HTMLElement && section.id) return section.id;
  return "sticky-bar";
}

export function PhoneClickTracker() {
  const plausible = usePlausible<PlausibleEvents>();

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (!(event.target instanceof Element)) return;
      const phoneAnchor = event.target.closest('a[href^="tel:"]');
      if (phoneAnchor instanceof HTMLElement) {
        plausible("Phone Click", { props: { location: resolveLocation(phoneAnchor) } });
        return;
      }
      const whatsappAnchor = event.target.closest('a[href^="https://wa.me/"]');
      if (whatsappAnchor instanceof HTMLElement) {
        plausible("WhatsApp Click", { props: { location: resolveLocation(whatsappAnchor) } });
      }
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [plausible]);

  return null;
}
