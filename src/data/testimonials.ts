import type { Testimonial } from "@/types";

export const testimonials: Testimonial[] = [
  {
    id: "1",
    author: "Sophie M.",
    location: "Auxerre",
    rating: 5,
    quote:
      "Intervention le jour même pour un problème de rats, équipe très professionnelle et discrète.",
    serviceId: "deratisation",
  },
  {
    id: "2",
    author: "Karim B.",
    location: "Sens",
    rating: 5,
    quote:
      "Nid de guêpes traité en moins d'une heure, je recommande vivement Experts Nuisible.",
    serviceId: "nuisibles-volants",
  },
  {
    id: "3",
    author: "Restaurant Le Basilic",
    location: "Orléans",
    rating: 5,
    quote:
      "Contrat annuel de prévention pour notre restaurant, suivi rigoureux et rapports détaillés.",
    serviceId: "professionnels",
  },
  {
    id: "4",
    author: "Julie D.",
    location: "Montargis",
    rating: 4,
    quote:
      "Punaises de lit éliminées définitivement, bon accompagnement pendant tout le traitement.",
    serviceId: "desinsectisation",
  },
];

// Source unique de la note affichée partout sur le site (Hero, section Avis…).
// Note déclarée, à remplacer par la note Google réelle une fois la fiche reliée —
// ne jamais réintroduire un chiffre en dur dans un composant.
export const reviewsSummary = {
  ratingValue: 4.8,
  reviewCount: testimonials.length,
};
