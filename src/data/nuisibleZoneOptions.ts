// Shared options for "Où avez-vous aperçu le nuisible ?" — consumed by the contact form
// and by the interactive 3D villa, which pre-selects one of these when a zone is chosen.
export const NUISIBLE_ZONE_OPTIONS = [
  "Toiture",
  "Combles / vide-grenier",
  "Chambre / pièces intérieures",
  "Jardin",
  "Arbre",
  "Clôture",
  "Garage",
  "Cave",
  "Égouts",
  "Fenêtre",
  "Porte",
  "Autre",
] as const;

export type NuisibleZoneOption = (typeof NUISIBLE_ZONE_OPTIONS)[number];
