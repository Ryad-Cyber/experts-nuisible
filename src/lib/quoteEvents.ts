// A lightweight, typed pub/sub over window CustomEvents so distant client components
// (the 3D house model, the coverage map, the pest identifier) can hand off "start a
// quote request" intent to the contact form without a shared React context.
//
// The contact form lives on the homepage (/#contact). When the intent is emitted from
// another page (e.g. /identifier), the payload is parked in sessionStorage and the
// browser navigates to /#contact; Contact.tsx flushes it on mount via flushPendingQuote().

export const QUOTE_ZONE_EVENT = "quote:zone";
export const QUOTE_CITY_EVENT = "quote:city";
export const QUOTE_PEST_EVENT = "quote:pest";

export type QuoteZoneDetail = { label: string };
export type QuoteCityDetail = { city: string };
export type QuotePestDetail = { serviceId: string; message: string };

const PENDING_KEY = "quote:pending";

function scrollToContact() {
  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function deliver(event: string, detail: unknown) {
  if (document.getElementById("contact")) {
    window.dispatchEvent(new CustomEvent(event, { detail }));
    scrollToContact();
    return;
  }
  // Formulaire absent de la page courante : on gare l'intention et on navigue.
  try {
    sessionStorage.setItem(PENDING_KEY, JSON.stringify({ event, detail }));
  } catch {
    // stockage indisponible : la navigation reste utile, sans pré-remplissage
  }
  window.location.assign("/#contact");
}

export function requestQuoteForZone(label: string) {
  deliver(QUOTE_ZONE_EVENT, { label } satisfies QuoteZoneDetail);
}

export function requestQuoteForCity(city: string) {
  deliver(QUOTE_CITY_EVENT, { city } satisfies QuoteCityDetail);
}

export function requestQuoteForPest(detail: QuotePestDetail) {
  deliver(QUOTE_PEST_EVENT, detail);
}

/** À appeler par Contact.tsx au montage, après enregistrement de ses listeners :
 *  rejoue une éventuelle intention garée par une autre page. */
export function flushPendingQuote() {
  try {
    const raw = sessionStorage.getItem(PENDING_KEY);
    if (!raw) return;
    sessionStorage.removeItem(PENDING_KEY);
    const { event, detail } = JSON.parse(raw) as { event: string; detail: unknown };
    window.dispatchEvent(new CustomEvent(event, { detail }));
    scrollToContact();
  } catch {
    // payload corrompu ou stockage inaccessible : on ignore silencieusement
  }
}
