import type { BusinessHours, NavLink } from "@/types";

const phoneDigits = "0766909033";

export const siteConfig = {
  name: "Experts Nuisible",
  tagline: "Intervention rapide contre les nuisibles, 24h/24 et 7j/7",
  description:
    "Experts Nuisible intervient en urgence pour la dératisation, la désinsectisation et la désinfection en Centre-Val de Loire, en Bourgogne-Franche-Comté, en Île-de-France et dans de nombreuses autres régions sur demande.",
  url: "https://www.experts-nuisible.fr",
  phone: {
    display: "07 66 90 90 33",
    href: `tel:+33${phoneDigits.slice(1)}`,
  },
  email: "Contact@expertsnuisible.com",
  address: "12 rue de la République, 75011 Paris",
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
    { label: "Services", href: "#services" },
    { label: "Agence", href: "#agence" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ] as NavLink[],
  // Dropdown shown under the "Services" nav item. Service-type entries point to the
  // Expertise section; specific pests point to the "Nuisibles" gallery. Swap the hrefs for
  // dedicated pages once they exist.
  servicesMenu: [
    { label: "Dératisation", href: "#services" },
    { label: "Désinsectisation", href: "#services" },
    { label: "Désinfection", href: "#services" },
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
