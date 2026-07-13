export type ProfessionalPartner = {
  id: string;
  name: string;
  logo: string;
  description: string;
};

// Manufacturers/suppliers whose professional equipment and products we work with. Add new
// entries here — the "Solutions professionnelles" section renders this list automatically.
export const PROFESSIONAL_PARTNERS: ProfessionalPartner[] = [
  {
    id: "armosa",
    name: "Armosa",
    logo: "/Armosa.jpg",
    description: "Solutions professionnelles dédiées à la lutte contre les nuisibles",
  },
  {
    id: "buzzbusters",
    name: "Buzzbusters",
    logo: "/buzbuster.png",
    description: "Solutions et équipements spécialisés pour les professionnels du pest control",
  },
  {
    id: "dobol",
    name: "Dobol",
    logo: "/Dobol.jpg",
    description: "Gamme professionnelle de produits de lutte contre les insectes",
  },
  {
    id: "paprec",
    name: "Paprec",
    logo: "/paprec.jpg",
    description: "Partenaire pour la gestion et le traitement des déchets liés aux interventions",
  },
  {
    id: "cesap",
    name: "Cesap",
    logo: "/cesap.png",
    description: "Fournisseur de matériel professionnel pour nos interventions",
  },
];
