import type { BusinessHours, NavLink } from "@/types";

const phoneDigits = "0766909033";

export const siteConfig = {
  name: "Experts Nuisible",
  tagline: "Intervention rapide contre les nuisibles, 24h/24 et 7j/7",
  description:
    "Experts Nuisible intervient en urgence pour la dératisation, la désinsectisation et la désinfection, partout en Île-de-France.",
  url: "https://www.experts-nuisible.fr",
  phone: {
    display: "07 66 90 90 33",
    href: `tel:+33${phoneDigits.slice(1)}`,
  },
  email: "Contact@expertsnuisible.com",
  address: "12 rue de la République, 75011 Paris",
  hours: [
    { days: "Lundi - Vendredi", hours: "8h00 - 20h00" },
    { days: "Week-ends & jours fériés", hours: "Urgences 24h/24" },
  ] as BusinessHours[],
  social: {
    instagram: {
      handle: "expertsnuisible",
      href: "https://instagram.com/expertsnuisible",
    },
  },
  nav: [
    { label: "Services", href: "#services" },
    { label: "Nuisibles", href: "#nuisibles" },
    { label: "Diagnostic", href: "#diagnostic" },
    { label: "Urgence", href: "#urgence" },
    { label: "Avis", href: "#avis" },
    { label: "Contact", href: "#contact" },
  ] as NavLink[],
  cta: {
    callNow: "Appeler maintenant",
    freeQuote: "Devis gratuit",
    emergency: "Urgence 24/7",
  },
};

export type SiteConfig = typeof siteConfig;
