// ---------------------------------------------------------------------------
// Informations légales de l'entreprise — consommées par /mentions-legales et
// /confidentialite.
//
// Champs optionnels (`| null`) : à renseigner dès que l'information officielle
// est disponible (SIRET, forme juridique, directeur de publication, raison
// sociale...). Tant qu'un champ vaut `null`, les pages légales reformulent la
// phrase concernée proprement plutôt que d'afficher un texte manquant ou un
// placeholder — aucune donnée légale n'est inventée ou approximée.
// ---------------------------------------------------------------------------

export const legalConfig = {
  /** Nom commercial affiché publiquement. */
  tradeName: "Experts Nuisible",
  /** Raison sociale exacte telle qu'immatriculée, une fois disponible. */
  companyName: null as string | null,
  /** Forme juridique (ex. "SAS", "SARL", "Entrepreneur individuel"). */
  legalForm: null as string | null,
  /** Numéro SIRET (14 chiffres). */
  siret: null as string | null,
  /** Adresse du siège social. */
  address: "Auxerre, France" as string | null,
  /** Nom du directeur ou de la directrice de la publication. */
  publicationDirector: null as string | null,
  /** Zone géographique réellement couverte par le réseau de techniciens mobiles. */
  serviceArea: "Île-de-France, Centre-Val de Loire et Bourgogne-Franche-Comté",
  /** Hébergeur du site (obligatoire : nom, adresse, moyen de contact). */
  host: {
    name: "Vercel Inc.",
    address: "440 N Barranca Ave #4133, Covina, CA 91723, États-Unis",
    website: "vercel.com",
  },
} as const;

/** Date affichée sur les pages légales — à mettre à jour à chaque révision. */
export const LEGAL_LAST_UPDATE = "13 juillet 2026";
