// ---------------------------------------------------------------------------
// Preuves terrain — photos et vidéos RÉELLES d'interventions, fournies par
// l'entreprise. Chaque preuve est rattachée aux fiches nuisibles et pages
// services où elle a une valeur de conviction.
//
// ⚠️ Les légendes sont volontairement descriptives (déduites du contenu et du
// nom de fichier fourni) : aucune revendication de technique ou de résultat
// au-delà de ce que le média montre. À faire relire par l'entreprise.
// ---------------------------------------------------------------------------

export type FieldProof = {
  id: string;
  type: "video" | "photo";
  src: string;
  caption: string;
  orientation: "paysage" | "portrait";
  /** Fiches /nuisibles/[slug] où la preuve apparaît. */
  pestIds?: string[];
  /** Pages /services/[slug] où la preuve apparaît. */
  serviceIds?: string[];
};

export const FIELD_PROOFS: FieldProof[] = [
  {
    id: "rat-capture-cage",
    type: "video",
    src: "/rat-capture-cage.mp4",
    caption: "Rat capturé en cage lors d'une intervention",
    orientation: "portrait",
    pestIds: ["rats"],
    serviceIds: ["deratisation"],
  },
  {
    id: "rongeurs-captures-carton",
    type: "photo",
    src: "/rongeurs-captures-carton.jpeg",
    caption: "Rongeurs capturés au cours d'un traitement",
    orientation: "portrait",
    pestIds: ["rats", "souris"],
    serviceIds: ["deratisation"],
  },
  {
    id: "insectes-mur",
    type: "photo",
    src: "/insectes-mur.jpeg",
    caption: "Infestation découverte chez un client, avant traitement",
    orientation: "portrait",
    pestIds: ["fourmis"],
    serviceIds: ["desinsectisation"],
  },
  {
    id: "traitement-insectes-mur",
    type: "video",
    src: "/traitement-insectes-mur.mp4",
    caption: "Traitement de l'infestation en cours",
    orientation: "paysage",
    pestIds: ["fourmis"],
    serviceIds: ["desinsectisation"],
  },
  {
    id: "traitement-canape",
    type: "video",
    src: "/traitement-canape.mp4",
    caption: "Traitement d'un canapé",
    orientation: "paysage",
    pestIds: ["punaises"],
    serviceIds: ["desinsectisation"],
  },
  {
    id: "traitement-dioxyde-carbone",
    type: "video",
    src: "/traitement-dioxyde-carbone.mp4",
    caption: "Traitement au dioxyde de carbone",
    orientation: "paysage",
    pestIds: ["punaises"],
    serviceIds: ["desinsectisation"],
  },
  {
    id: "technicien-materiel-bleu",
    type: "photo",
    src: "/technicien-materiel-bleu.jpeg",
    caption: "Technicien équipé pendant une intervention",
    orientation: "portrait",
    pestIds: ["punaises"],
  },
  {
    id: "drone-nid-guepes",
    type: "video",
    src: "/drone-nid-guepes.mp4",
    caption: "Inspection d'un nid par drone",
    orientation: "paysage",
    pestIds: ["guepes", "frelons"],
    serviceIds: ["nuisibles-volants"],
  },
  {
    id: "preparation-materiel-guepes",
    type: "video",
    src: "/preparation-materiel-guepes.mp4",
    caption: "Préparation du matériel avant traitement d'un nid",
    orientation: "paysage",
    pestIds: ["guepes", "frelons"],
    serviceIds: ["nuisibles-volants"],
  },
  {
    id: "intervention-toiture",
    type: "video",
    src: "/intervention-toiture.mp4",
    caption: "Intervention en toiture",
    orientation: "portrait",
    pestIds: ["fouines", "pigeons"],
    serviceIds: ["deratisation", "nuisibles-volants"],
  },
  {
    id: "traitement-fenetre-insectes",
    type: "video",
    src: "/traitement-fenetre-insectes.mp4",
    caption: "Traitement d'insectes autour d'une fenêtre",
    orientation: "paysage",
    serviceIds: ["desinsectisation"],
  },
  {
    id: "traitement-garage",
    type: "video",
    src: "/traitement-garage.mp4",
    caption: "Traitement d'un garage",
    orientation: "paysage",
    serviceIds: ["desinsectisation"],
  },
  {
    id: "traitement-maison",
    type: "video",
    src: "/traitement-maison.mp4",
    caption: "Traitement d'une habitation",
    orientation: "paysage",
    serviceIds: ["desinsectisation"],
  },
];

const MAX_PROOFS_PER_PAGE = 5;

export function proofsForPest(pestId: string): FieldProof[] {
  return FIELD_PROOFS.filter((proof) => proof.pestIds?.includes(pestId)).slice(
    0,
    MAX_PROOFS_PER_PAGE
  );
}

export function proofsForService(serviceId: string): FieldProof[] {
  return FIELD_PROOFS.filter((proof) => proof.serviceIds?.includes(serviceId)).slice(
    0,
    MAX_PROOFS_PER_PAGE
  );
}
