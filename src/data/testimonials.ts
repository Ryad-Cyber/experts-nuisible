import type { Testimonial } from "@/types";

export const testimonials: Testimonial[] = [
  {
    id: "1",
    author: "Sophie M.",
    location: "Paris 11e",
    rating: 5,
    quote:
      "Intervention le jour même pour un problème de rats, équipe très professionnelle et discrète.",
  },
  {
    id: "2",
    author: "Karim B.",
    location: "Boulogne-Billancourt",
    rating: 5,
    quote:
      "Nid de guêpes traité en moins d'une heure, je recommande vivement Experts Nuisible.",
  },
  {
    id: "3",
    author: "Restaurant Le Basilic",
    location: "Paris 9e",
    rating: 5,
    quote:
      "Contrat annuel de prévention pour notre restaurant, suivi rigoureux et rapports détaillés.",
  },
  {
    id: "4",
    author: "Julie D.",
    location: "Levallois-Perret",
    rating: 4,
    quote:
      "Punaises de lit éliminées définitivement, bon accompagnement pendant tout le traitement.",
  },
];

// Source unique de la note affichée partout sur le site (Hero, section Avis…).
// Note déclarée, à remplacer par la note Google réelle une fois la fiche reliée —
// ne jamais réintroduire un chiffre en dur dans un composant.
export const reviewsSummary = {
  ratingValue: 4.8,
  reviewCount: testimonials.length,
};
