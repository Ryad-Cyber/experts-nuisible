import type { BusinessHours, NavLink } from "@/types";

const phoneDigits = "0766909033";

export const siteConfig = {
  name: "Experts Nuisible",
  tagline: "Intervention rapide contre les nuisibles, 24h/24 et 7j/7",
  description:
    "Experts Nuisible intervient en urgence pour la dératisation, la désinsectisation et la désinfection. Basés au cœur du Centre de la France, nous nous déplaçons dans une large partie du territoire, au fil des besoins de nos clients.",
  url: "https://www.experts-nuisible.fr",
  phone: {
    display: "07 66 90 90 33",
    href: `tel:+33${phoneDigits.slice(1)}`,
  },
  email: "Contact@expertsnuisible.com",
  serviceArea: "Centre de la France",
  hours: [
    { days: "Disponibilité", hours: "24h/24 · 7j/7 · week-ends et jours fériés inclus" },
  ] as BusinessHours[],
  social: {
    instagram: {
      handle: "expertsnuisible",
      href: "https://instagram.com/expertsnuisible",
    },
  },
  nav: [
    { label: "Accueil", href: "/" },
    { label: "Services", href: "#nuisibles" },
    { label: "Why Us", href: "#agence" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ] as NavLink[],
  // Dropdown shown under the "Services" nav item. All entries point to the "Nuisibles"
  // showcase. Swap the hrefs for dedicated pages once they exist.
  servicesMenu: [
    { label: "Dératisation", href: "#nuisibles" },
    { label: "Désinsectisation", href: "#nuisibles" },
    { label: "Désinfection", href: "#nuisibles" },
    { label: "Guêpes & frelons", href: "#nuisibles" },
    { label: "Punaises de lit", href: "#nuisibles" },
    { label: "Cafards", href: "#nuisibles" },
    { label: "Fourmis", href: "#nuisibles" },
    { label: "Souris & rats", href: "#nuisibles" },
    { label: "Frelons asiatiques", href: "#nuisibles" },
    { label: "Autres nuisibles", href: "#nuisibles" },
  ] as NavLink[],
  cta: {
    callNow: "Appeler maintenant",
    freeQuote: "Devis gratuit",
    emergency: "Urgence 24/7",
  },
};

export type SiteConfig = typeof siteConfig;
