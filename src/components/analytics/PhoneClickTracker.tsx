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
      const anchor = event.target.closest('a[href^="tel:"]');
      if (!(anchor instanceof HTMLElement)) return;
      plausible("Phone Click", { props: { location: resolveLocation(anchor) } });
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [plausible]);

  return null;
}
