import type { BusinessHours, NavLink } from "@/types";

const phoneDigits = "0766909033";
// Numéro WhatsApp distinct du numéro d'appel — les deux canaux peuvent diverger.
const whatsappDigits = "0603955031";

/** Lien WhatsApp vers le numéro de l'entreprise avec un message pré-rempli.
 *  Source unique pour tous les messages contextualisés (fiches nuisibles, CTA). */
export function whatsappHrefFor(message: string): string {
  return `https://wa.me/33${whatsappDigits.slice(1)}?text=${encodeURIComponent(message)}`;
}

export const siteConfig = {
  name: "Experts Nuisible",
  tagline: "Intervention rapide contre les nuisibles, 24h/24 et 7j/7",
  description:
    "Experts Nuisible intervient en urgence pour la dératisation, la désinsectisation et la désinfection, grâce à un réseau de techniciens couvrant de nombreuses agglomérations françaises.",
  url: "https://www.experts-nuisible.fr",
  phone: {
    display: "07 66 90 90 33",
    href: `tel:+33${phoneDigits.slice(1)}`,
  },
  whatsapp: {
    display: "06 03 95 50 31",
    href: whatsappHrefFor(
      "Bonjour, j'ai un problème de nuisible. Je vous envoie quelques photos de la situation."
    ),
  },
  email: "Contact@expertsnuisible.com",
  serviceArea: "Réseau de techniciens dans de nombreuses agglomérations françaises",
  hours: [
    { days: "Disponibilité", hours: "24h/24 · 7j/7 · week-ends et jours fériés inclus" },
  ] as BusinessHours[],
  social: {
    instagram: {
      handle: "expertsnuisible",
      href: "https://instagram.com/expertsnuisible",
    },
  },
  // Ancres préfixées de "/" : le lien navigue vers la homepage puis scrolle,
  // ce qui le rend fonctionnel depuis n'importe quelle page (ex. /identifier).
  nav: [
    { label: "Accueil", href: "/" },
    { label: "Services", href: "/#nuisibles" },
    { label: "Identifier mon nuisible", href: "/identifier" },
    { label: "FAQ", href: "/#faq" },
    { label: "Contact", href: "/#contact" },
  ] as NavLink[],
  // Dropdown du menu "Services" : mélange volontaire de pages services (intention
  // "je cherche une prestation") et de fiches nuisibles (intention "j'ai identifié
  // mon problème") — chaque entrée pointe vers sa vraie page dédiée.
  servicesMenu: [
    { label: "Dératisation", href: "/services/deratisation" },
    { label: "Désinsectisation", href: "/services/desinsectisation" },
    { label: "Désinfection", href: "/services/desinfection" },
    { label: "Guêpes & frelons", href: "/services/nuisibles-volants" },
    { label: "Punaises de lit", href: "/nuisibles/punaises" },
    { label: "Cafards", href: "/nuisibles/cafards" },
    { label: "Fourmis", href: "/nuisibles/fourmis" },
    { label: "Souris & rats", href: "/nuisibles/rats" },
    { label: "Frelons asiatiques", href: "/nuisibles/frelons" },
    { label: "Autres nuisibles", href: "/nuisibles" },
  ] as NavLink[],
  cta: {
    callNow: "Appeler maintenant",
    freeQuote: "Devis gratuit",
    emergency: "Urgence 24/7",
  },
};

export type SiteConfig = typeof siteConfig;
