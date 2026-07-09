// A lightweight, typed pub/sub over window CustomEvents so distant client components
// (the 3D house model, the coverage map) can hand off "start a quote request" intent to
// the contact form without needing a shared React context/provider across the page.

export const QUOTE_ZONE_EVENT = "quote:zone";
export const QUOTE_CITY_EVENT = "quote:city";

export type QuoteZoneDetail = { label: string };
export type QuoteCityDetail = { city: string };

function scrollToContact() {
  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function requestQuoteForZone(label: string) {
  window.dispatchEvent(new CustomEvent<QuoteZoneDetail>(QUOTE_ZONE_EVENT, { detail: { label } }));
  scrollToContact();
}

export function requestQuoteForCity(city: string) {
  window.dispatchEvent(new CustomEvent<QuoteCityDetail>(QUOTE_CITY_EVENT, { detail: { city } }));
  scrollToContact();
}
