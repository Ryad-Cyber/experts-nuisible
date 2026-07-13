// ---------------------------------------------------------------------------
// Zone d'intervention — SOURCE UNIQUE de la couverture géographique.
//
// L'entreprise est un réseau de techniciens mobiles (Service Area Business),
// SANS local fixe par ville : on ne déclare donc que des régions et des
// départements réellement desservis, jamais d'adresse locale fabriquée ni de
// page ville artificielle. Ces données alimentent : la page /zones-intervention,
// le teaser de la homepage (Disponibilite), la carte, et le `areaServed` du
// JSON-LD LocalBusiness.
// ---------------------------------------------------------------------------

export type Department = { name: string; code: string };

export type CoverageRegion = {
  name: string;
  /** Ligne factuelle : le rôle de la région dans le réseau, sans sur-promesse. */
  lead: string;
  departments: Department[];
};

// Regroupement par région = contenu réellement utile (répond à « intervenez-vous
// chez moi ? »), et calqué sur le `areaServed` déjà déclaré dans le schema.
export const COVERAGE_REGIONS: CoverageRegion[] = [
  {
    name: "Bourgogne-Franche-Comté",
    lead: "Notre ancrage principal, autour d'Auxerre et de Sens.",
    departments: [
      { name: "Yonne", code: "89" },
      { name: "Nièvre", code: "58" },
    ],
  },
  {
    name: "Centre-Val de Loire",
    lead: "Une présence forte, notamment autour d'Orléans.",
    departments: [
      { name: "Loiret", code: "45" },
      { name: "Loir-et-Cher", code: "41" },
      { name: "Indre-et-Loire", code: "37" },
      { name: "Eure-et-Loir", code: "28" },
      { name: "Cher", code: "18" },
    ],
  },
  {
    name: "Île-de-France",
    lead: "Interventions sur Paris et sa proche couronne.",
    departments: [{ name: "Paris", code: "75" }],
  },
];

/** Noms de régions pour le `areaServed` du JSON-LD (source unique). */
export const COVERAGE_REGION_NAMES = COVERAGE_REGIONS.map((region) => region.name);

/** Liste à plat des départements (nom + code), tous secteurs confondus. */
export const COVERAGE_DEPARTMENTS: Department[] = COVERAGE_REGIONS.flatMap(
  (region) => region.departments
);

export type CoverageHub = {
  name: string;
  short: string;
  x: number;
  y: number;
  /** Hub central du réseau (un seul : Auxerre) — style plein accent. */
  primary?: boolean;
  /** Pôle régional fort (Sens, Orléans) — se distingue des villes secondaires
   *  sans rivaliser visuellement avec le hub central. */
  secondary?: boolean;
};

// Placement relatif approximatif (0–100) des principaux hubs autour d'Auxerre.
// Carte abstraite, pas cartographique : les anneaux évoquent le rayon d'action.
export const COVERAGE_HUBS: CoverageHub[] = [
  { name: "Paris / Île-de-France", short: "Paris", x: 60, y: 12 },
  { name: "Chartres", short: "Chartres", x: 30, y: 24 },
  { name: "Sens", short: "Sens", x: 84, y: 26, secondary: true },
  { name: "Auxerre", short: "Auxerre", x: 80, y: 46, primary: true },
  { name: "Orléans", short: "Orléans", x: 48, y: 48, secondary: true },
  { name: "Blois", short: "Blois", x: 26, y: 58 },
  { name: "Tours", short: "Tours", x: 12, y: 70 },
  { name: "Bourges", short: "Bourges", x: 62, y: 72 },
];
