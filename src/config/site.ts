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
  tagline: "Anti-nuisibles à Auxerre, Sens et dans l'Yonne — 24h/24",
  description:
    "Experts Nuisible intervient en urgence pour la dératisation, la désinsectisation et la désinfection à Auxerre, Sens et dans l'Yonne, ainsi qu'en Bourgogne-Franche-Comté, Centre-Val de Loire et Île-de-France — auprès des particuliers comme des professionnels (restaurants, commerces, entreprises).",
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
  // Texte de présentation du footer — volontairement plus large que la meta
  // description SEO (qui, elle, reste spécifique pour le référencement) : montre
  // l'étendue de l'activité et le caractère NON exhaustif des zones citées.
  footerAbout:
    "Experts Nuisible traite un large éventail de nuisibles et de problématiques — rongeurs, insectes rampants et volants, désinfection et bien d'autres. Notre principal secteur d'intervention est Auxerre, Sens et l'Yonne ; nos techniciens interviennent aussi dans les communes, départements et régions voisins (Bourgogne-Franche-Comté, Centre-Val de Loire, Île-de-France…) et au-delà selon les besoins.",
  serviceArea:
    "Auxerre, Sens et l'Yonne (secteur principal) — et les communes, départements et régions voisins selon les besoins.",
  // Ancrage géographique réel = ville de base du réseau (Auxerre). Réseau de
  // techniciens mobiles : pas d'adresse de rue publique, on ne déclare donc que
  // le niveau ville/région (honnête) — consommé par le JSON-LD LocalBusiness
  // (PostalAddress sans streetAddress + GeoCoordinates du centre-ville d'Auxerre).
  location: {
    city: "Auxerre",
    postalCode: "89000",
    region: "Bourgogne-Franche-Comté",
    country: "FR",
    latitude: 47.7982,
    longitude: 3.5674,
  },
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
  // Dropdown du menu "Services" : une entrée par problème (pas par page), chacune
  // orientée vers sa fiche nuisible quand elle existe, sinon vers le service
  // générique. Plus aucun doublon (ex. "Guêpes & frelons" ne coexiste plus avec
  // "Frelons asiatiques" ; "Dératisation" ne coexiste plus avec "Souris & rats").
  servicesMenu: [
    { label: "Rats", href: "/nuisibles/rats" },
    { label: "Punaises de lit", href: "/nuisibles/punaises" },
    { label: "Cafards", href: "/nuisibles/cafards" },
    { label: "Puces & parasites", href: "/services/desinsectisation" },
    { label: "Fourmis", href: "/nuisibles/fourmis" },
    { label: "Mouches", href: "/nuisibles/mouches" },
    { label: "Guêpes & frelons", href: "/services/nuisibles-volants" },
    { label: "Chenilles processionnaires", href: "/nuisibles/chenilles" },
    { label: "Désinfection & assainissement", href: "/services/desinfection" },
    { label: "Autres nuisibles", href: "/nuisibles/autres" },
  ] as NavLink[],
  cta: {
    callNow: "Appeler maintenant",
    freeQuote: "Devis gratuit",
    emergency: "Urgence 24/7",
  },
};

export type SiteConfig = typeof siteConfig;
