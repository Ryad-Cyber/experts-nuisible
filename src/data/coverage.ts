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
  /** Paragraphe de contexte (≈40-60 mots) : nuisibles traités + villes/communes
   *  couvertes, factuel et propre à chaque région (rendu sous le titre). */
  lead: string;
  departments: Department[];
  /** Communes réellement couvertes, présentées comme des EXEMPLES (pas une
   *  liste fermée, pas des pages dédiées) — renforce la crédibilité locale sans
   *  suggérer une couverture limitée à ces seules villes. */
  exampleTowns?: string[];
};

// Regroupement par région = contenu réellement utile (répond à « intervenez-vous
// chez moi ? »), et calqué sur le `areaServed` déjà déclaré dans le schema.
export const COVERAGE_REGIONS: CoverageRegion[] = [
  {
    name: "Bourgogne-Franche-Comté",
    lead: "Autour d'Auxerre et de Sens, nos techniciens interviennent régulièrement contre les principaux nuisibles — rats, souris, punaises de lit, cafards, guêpes et frelons. Nous couvrons aussi bien les centres-villes que les communes plus rurales de l'Yonne et des départements voisins, avec une intervention rapide, week-ends et jours fériés inclus.",
    departments: [
      { name: "Yonne", code: "89" },
      { name: "Nièvre", code: "58" },
      { name: "Côte-d'Or", code: "21" },
      { name: "Aube", code: "10" },
    ],
    exampleTowns: ["Auxerre", "Sens", "Joigny"],
  },
  {
    name: "Centre-Val de Loire",
    lead: "En Centre-Val de Loire, notamment autour d'Orléans, Blois, Tours et Chartres, nous traitons rongeurs, insectes rampants et nuisibles volants, chez les particuliers comme dans les locaux professionnels. Des grandes villes aux communes environnantes, nos techniciens se déplacent avec le matériel adapté à chaque situation, pour une intervention efficace et durable.",
    departments: [
      { name: "Loiret", code: "45" },
      { name: "Loir-et-Cher", code: "41" },
      { name: "Indre-et-Loire", code: "37" },
      { name: "Eure-et-Loir", code: "28" },
      { name: "Cher", code: "18" },
      { name: "Indre", code: "36" },
    ],
    exampleTowns: [
      "Orléans",
      "Montargis",
      "Gien",
      "Blois",
      "Vendôme",
      "Romorantin-Lanthenay",
      "Chartres",
      "Dreux",
      "Chinon",
      "Amboise",
      "Joué-lès-Tours",
    ],
  },
  {
    name: "Île-de-France",
    lead: "En Île-de-France, nos équipes interviennent à Paris comme en proche et grande couronne, contre les punaises de lit, cafards, rats et autres nuisibles fréquents en milieu urbain. Particuliers, commerces et copropriétés bénéficient d'une intervention discrète et rapide, avec un suivi jusqu'à la disparition complète du problème.",
    departments: [
      { name: "Paris", code: "75" },
      { name: "Seine-et-Marne", code: "77" },
      { name: "Essonne", code: "91" },
      { name: "Yvelines", code: "78" },
      { name: "Hauts-de-Seine", code: "92" },
      { name: "Seine-Saint-Denis", code: "93" },
      { name: "Val-de-Marne", code: "94" },
      { name: "Val-d'Oise", code: "95" },
    ],
    exampleTowns: ["Melun", "Fontainebleau", "Provins", "Montereau-Fault-Yonne"],
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
