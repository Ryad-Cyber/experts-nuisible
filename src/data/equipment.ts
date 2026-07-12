export type TechnicianPhoto = {
  id: string;
  src: string;
  alt: string;
};

// ---------------------------------------------------------------------------
// Silhouette interactive du technicien — ARCHITECTURE PRÉPARÉE, EN ATTENTE DES
// VRAIS ASSETS. Renseigner `technicianSilhouette` uniquement lorsque les PNG
// réels (fond transparent, pièces détourées séparément) seront déposés dans
// /public. Ne jamais utiliser d'images génériques ou générées pour simuler
// du matériel : tant que la config est `null`, rien ne s'affiche sur le site.
// ---------------------------------------------------------------------------

export type GearPieceId =
  | "casque"
  | "combinaison"
  | "gants"
  | "chaussures"
  | "surchaussures";

export type GearPiece = {
  id: GearPieceId | string;
  label: string;
  /** PNG détouré de la pièce seule, ex. "/gear/casque.png" */
  image: string;
  description?: string;
};

export type NuisibleGearVariant = {
  /** Doit correspondre à un id de service (src/data/services.ts). */
  serviceId: string;
  label: string;
  /** Équipements spécifiques ajoutés pour ce nuisible (pulvérisateur, vapeur, etc.). */
  extraGear: GearPiece[];
};

export type TechnicianSilhouette = {
  /** PNG du technicien complet équipé, fond transparent. */
  baseImage: string;
  /** Pièces de protection séparables (casque, combinaison, gants, chaussures…). */
  pieces: GearPiece[];
  /** Variantes d'équipement par type de nuisible. */
  variants: NuisibleGearVariant[];
};

export const technicianSilhouette: TechnicianSilhouette | null = null;

// Photos réelles du carousel "Notre équipement professionnel".
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
