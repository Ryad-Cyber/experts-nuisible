export type TechnicianPhoto = {
  id: string;
  src: string;
  alt: string;
};

// Structure prête à accueillir plus tard une partie interactive
// (équipements de protection, matériel professionnel, nuisibles associés)
// une fois les assets dédiés disponibles.
export const technicianPhotos: TechnicianPhoto[] = [
  {
    id: "tech-1",
    src: "/tech_img.jpeg",
    alt: "Technicien Experts Nuisible équipé pour une intervention",
  },
  {
    id: "tech-2",
    src: "/tech2_img.jpeg",
    alt: "Technicien Experts Nuisible en intervention professionnelle",
  },
  {
    id: "tech-ia-1",
    src: "/tech_ia.jpeg",
    alt: "Technicien en équipement de protection intégral",
  },
  {
    id: "tech-ia-2",
    src: "/tech_ia2.jpeg",
    alt: "Technicien en tenue professionnelle de traitement",
  },
  {
    id: "tech-ia-3",
    src: "/tech_ia3.jpeg",
    alt: "Technicien équipé pour intervention nuisibles",
  },
  {
    id: "tech-ia-4",
    src: "/tech_ia4.jpeg",
    alt: "Technicien en combinaison de protection",
  },
  {
    id: "tech-ia-5",
    src: "/tech_ia5.jpeg",
    alt: "Technicien avec équipement professionnel complet",
  },
  {
    id: "tech-ia-6",
    src: "/tech_ia6.jpeg",
    alt: "Technicien Experts Nuisible en intervention",
  },
];
