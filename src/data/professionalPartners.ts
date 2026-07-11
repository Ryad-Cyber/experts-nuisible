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
];
