// ---------------------------------------------------------------------------
// Informations légales de l'entreprise — consommées par /mentions-legales et
// /confidentialite.
//
// ⚠️ À COMPLÉTER PAR L'ENTREPRISE avant la mise en production : chaque valeur
// contenant « À compléter » doit être remplacée par l'information réelle.
// Aucune information légale ne doit être inventée ou approximative.
// ---------------------------------------------------------------------------

export const legalConfig = {
  /** Raison sociale exacte telle qu'immatriculée (ex. "EXPERTS NUISIBLE SAS"). */
  companyName: "À compléter — raison sociale exacte",
  /** Forme juridique (ex. "SAS", "SARL", "Entrepreneur individuel"). */
  legalForm: "À compléter — forme juridique",
  /** Numéro SIRET (14 chiffres). */
  siret: "À compléter — SIRET",
  /** Adresse du siège social. */
  address: "À compléter — adresse du siège social",
  /** Nom du directeur ou de la directrice de la publication. */
  publicationDirector: "À compléter — directeur de la publication",
  /** Hébergeur du site (obligatoire : nom, adresse, moyen de contact). */
  host: {
    name: "À compléter — nom de l'hébergeur (ex. Vercel Inc.)",
    address: "À compléter — adresse de l'hébergeur",
    website: "À compléter — site web de l'hébergeur",
  },
} as const;

/** Date affichée sur les pages légales — à mettre à jour à chaque révision. */
export const LEGAL_LAST_UPDATE = "12 juillet 2026";
