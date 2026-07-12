export type TechnicianPhoto = {
  id: string;
  src: string;
  alt: string;
};

// ---------------------------------------------------------------------------
// Tenue d'intervention — plateau d'inspection de l'équipement du technicien.
// Composition : combinaison au centre, casque en haut, gants sur les côtés,
// surchaussures en bas, matériel contextualisé entre gants et combinaison.
//
// ⚠️ Contenu métier : les descriptions restent volontairement génériques
// (aucune norme, marque ou certification inventée) — à faire valider par
// l'entreprise avant toute précision supplémentaire.
// ---------------------------------------------------------------------------

/** Fiche d'inspection ouverte au clic sur une pièce ou un outil. */
export type EquipmentFiche = {
  id: string;
  name: string;
  /** Pourquoi le technicien l'utilise. */
  why: string;
  /** Ce que ça change concrètement pour le client. */
  benefit: string;
};

export type GearSlot =
  | "casque"
  | "gant-gauche"
  | "gant-droit"
  | "combinaison"
  | "surchaussures";

/** Tuile de la composition (les deux gants partagent la même fiche). */
export type SuitPiece = {
  slot: GearSlot;
  label: string;
  image: string;
  alt: string;
  ficheId: string;
};

export type GearContextId = "rongeurs" | "insectes" | "exterieur";

export const GEAR_CONTEXTS: { id: GearContextId; label: string }[] = [
  { id: "rongeurs", label: "Rongeurs" },
  { id: "insectes", label: "Insectes" },
  { id: "exterieur", label: "Extérieur & volumes" },
];

/** Matériel professionnel, affiché selon la famille de nuisibles. */
export type FieldTool = EquipmentFiche & {
  label: string;
  image: string;
  alt: string;
  context: GearContextId;
};

export const SUIT_FICHES: EquipmentFiche[] = [
  {
    id: "casque",
    name: "Masque de protection intégral",
    why: "Filtre l'air pendant l'application des produits et protège le visage dans les espaces confinés — combles, caves, vides sanitaires.",
    benefit:
      "Le technicien travaille sans précipitation, même dans les zones les plus difficiles : le traitement est appliqué proprement, jusqu'au bout.",
  },
  {
    id: "combinaison",
    name: "Combinaison d'intervention",
    why: "Barrière intégrale entre le technicien, les produits et les zones traitées. Elle est changée après chaque intervention.",
    benefit:
      "Aucun transfert entre l'intervention précédente et chez vous — ni résidu de produit, ni nuisible transporté (œufs, punaises).",
  },
  {
    id: "gants",
    name: "Gants de protection",
    why: "Manipulation des produits, des pièges et des zones souillées sans aucun contact direct ; remplacés entre chaque chantier.",
    benefit:
      "Aucune surface de votre logement n'est touchée à main nue après la manipulation de produits ou de zones contaminées.",
  },
  {
    id: "surchaussures",
    name: "Surchaussures de propreté",
    why: "Enfilées avant d'entrer chez vous : elles isolent des semelles qui ont traversé caves, extérieurs et locaux techniques.",
    benefit:
      "Vos sols restent impeccables — le passage du technicien ne laisse aucune trace dans votre intérieur.",
  },
];

export const SUIT_PIECES: SuitPiece[] = [
  {
    slot: "casque",
    label: "Masque intégral",
    image: "/casque.jpg",
    alt: "Masque de protection respiratoire intégral avec cartouches filtrantes, posé sur son support",
    ficheId: "casque",
  },
  {
    slot: "gant-gauche",
    label: "Gant gauche",
    image: "/gant_gauche.jpg",
    alt: "Gant de protection noir, vue de la paume",
    ficheId: "gants",
  },
  {
    slot: "combinaison",
    label: "Combinaison",
    image: "/combinaison2.jpeg",
    alt: "Combinaison d'intervention complète avec renforts, présentée prête à enfiler",
    ficheId: "combinaison",
  },
  {
    slot: "gant-droit",
    label: "Gant droit",
    image: "/gant_droit.jpg",
    alt: "Gant de protection noir à manchette tricotée, vue de la paume",
    ficheId: "gants",
  },
  {
    slot: "surchaussures",
    label: "Surchaussures",
    image: "/surchaussure3.jpg",
    alt: "Chaussures de sécurité recouvertes de surchaussures de protection jetables",
    ficheId: "surchaussures",
  },
];

export const FIELD_TOOLS: FieldTool[] = [
  {
    id: "detecteur",
    label: "Détecteur",
    name: "Détecteur d'activité",
    image: "/materiel5.jpeg",
    alt: "Détecteur électronique portatif avec écran de contrôle",
    context: "rongeurs",
    why: "Localise l'activité des rongeurs pour placer les dispositifs exactement sur leurs passages, pas au hasard.",
    benefit:
      "Un traitement posé au bon endroit dès la première visite — pas de tâtonnement, pas de visite inutile.",
  },
  {
    id: "lampe-inspection",
    label: "Lampe d'inspection",
    name: "Lampe d'inspection",
    image: "/materiel6.jpeg",
    alt: "Lampe d'inspection professionnelle à faisceau renforcé",
    context: "rongeurs",
    why: "Révèle traces, coulures et indices invisibles à l'œil nu dans les recoins sombres — plinthes, gaines, arrière des meubles.",
    benefit:
      "Le diagnostic repose sur des preuves observées chez vous, pas sur des suppositions.",
  },
  {
    id: "pulverisateur-main",
    label: "Pulvérisateur",
    name: "Pulvérisateur de précision",
    image: "/materiel.jpeg",
    alt: "Pulvérisateur à main professionnel tenu par un technicien ganté",
    context: "insectes",
    why: "Application ciblée le long des plinthes, joints et recoins où circulent les insectes rampants.",
    benefit:
      "Le produit est déposé uniquement là où il est utile — pas de sur-traitement dans vos pièces de vie.",
  },
  {
    id: "nebuliseur",
    label: "Nébuliseur",
    name: "Nébuliseur professionnel",
    image: "/materiel2.jpeg",
    alt: "Nébuliseur professionnel avec pistolet applicateur et flexible",
    context: "insectes",
    why: "Diffuse un brouillard très fin qui atteint les caches inaccessibles : fissures, arrière des meubles, gaines techniques.",
    benefit:
      "Traite les recoins qu'une application classique ne peut pas atteindre — le risque de récidive chute.",
  },
  {
    id: "pulverisateur-autonome",
    label: "Pulvérisateur autonome",
    name: "Pulvérisateur autonome",
    image: "/materiel3.jpeg",
    alt: "Pulvérisateur autonome à réservoir pour les traitements extérieurs",
    context: "exterieur",
    why: "Réservoir transportable pour traiter jardins, abords et dépendances, même sans accès à l'eau ou à l'électricité.",
    benefit:
      "L'extérieur est traité aussi sérieusement que l'intérieur — la source du problème est souvent dehors.",
  },
  {
    id: "unite-mobile",
    label: "Unité mobile",
    name: "Unité de traitement mobile",
    image: "/materiel4.jpeg",
    alt: "Unité de traitement mobile grande capacité sur roues avec lance",
    context: "exterieur",
    why: "Grande capacité sur roues pour les surfaces importantes : locaux professionnels, caves d'immeubles, grands terrains.",
    benefit:
      "Le même niveau d'exigence pour un pavillon, un commerce ou une copropriété entière.",
  },
];

export const EQUIPMENT_FICHE_BY_ID: Record<string, EquipmentFiche> = Object.fromEntries(
  [...SUIT_FICHES, ...FIELD_TOOLS].map((fiche) => [fiche.id, fiche])
);

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
