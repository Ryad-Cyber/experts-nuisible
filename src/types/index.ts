import type { LucideIcon } from "lucide-react";

export type NavLink = {
  label: string;
  href: string;
};

export type BusinessHours = {
  days: string;
  hours: string;
};

export type Service = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

export type Testimonial = {
  id: string;
  author: string;
  location: string;
  rating: number;
  quote: string;
  /** Type d'intervention (ex. "Dératisation") — affiché sur la carte si présent. */
  service?: string;
  /** Id du service concerné (src/data/services.ts) — permet aux pages services
   *  d'afficher l'avis réel correspondant. Étiquetage factuel : la citation
   *  mentionne explicitement le sujet. */
  serviceId?: string;
  /** Date de l'intervention ou de l'avis. */
  date?: string;
  /** Provenance de l'avis — "google" active le badge vérifié. */
  source?: "interne" | "google";
  /** Lien vers l'avis d'origine (fiche Google) si disponible. */
  sourceUrl?: string;
  verified?: boolean;
};

export type Technician = {
  /** Prénom réel du technicien — jamais de fausse identité. */
  firstName: string;
  /** Photo réelle (chemin public/), jamais générée. */
  photo: string;
  certification?: string;
};

export type HouseZoneId = "toiture" | "combles" | "cuisine" | "cave" | "jardin";

export type HouseZone = {
  id: HouseZoneId;
  label: string;
  position: [number, number, number];
  serviceId: string;
};

export type Pest = {
  id: string;
  name: string;
  image: string;
  serviceId: string;
  /** Id de la fiche correspondante dans src/data/pestGuide.ts —
   *  rend la carte cliquable vers /nuisibles/<guideId>. */
  guideId?: string;
};
