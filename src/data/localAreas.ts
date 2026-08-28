// ---------------------------------------------------------------------------
// Pages locales par pôle principal — contenu UNIQUE et honnête par ville.
// Objectif : référencement local sur « dératisation Auxerre », « punaises de lit
// Auxerre », « désinsectisation Sens »… via de VRAIES pages utiles, pas des pages
// générées automatiquement ni dupliquées. Volontairement limité aux 2 pôles réels
// du réseau (Auxerre = primary, Sens = secondary dans data/coverage.ts).
//
// Faits géographiques vérifiables uniquement (rôle administratif, communes
// limitrophes réellement dans l'Yonne desservie). Aucune donnée inventée.
// ---------------------------------------------------------------------------

export type LocalArea = {
  slug: string;
  city: string;
  postalCode: string;
  /** Rôle administratif / situation — factuel. */
  role: string;
  /** Introduction propre à la ville (pourquoi nous, contexte général). */
  intro: string;
  /** Contexte local des nuisibles — spécifique au bâti/à la situation de la ville. */
  localContext: string;
  /** Enjeux particuliers + professionnels, ancrés localement. */
  proContext: string;
  /** Phrase d'amorce avant la liste des communes voisines. */
  aroundLead: string;
  /** Communes limitrophes réellement dans la zone (Yonne) — exemples, pas des pages. */
  nearbyTowns: string[];
  /** IDs de fiches nuisibles (data/pestGuide.ts) les plus recherchées localement. */
  frequentPestIds: string[];
};

export const LOCAL_AREAS: LocalArea[] = [
  {
    slug: "auxerre",
    city: "Auxerre",
    postalCode: "89000",
    role: "préfecture de l'Yonne",
    intro:
      "Experts Nuisible intervient à Auxerre et dans son agglomération pour la dératisation, la désinsectisation et la désinfection, auprès des particuliers comme des professionnels. Préfecture de l'Yonne, Auxerre associe un centre historique dense, des quartiers pavillonnaires et des zones d'activité : autant de configurations qui appellent des réponses différentes face aux nuisibles. Nos techniciens sont mobilisables 24h/24, week-ends et jours fériés inclus.",
    localContext:
      "Dans le centre ancien d'Auxerre, les immeubles mitoyens, les caves et les combles partagés facilitent la circulation des rongeurs et des cafards d'un logement à l'autre — un traitement coordonné y est souvent plus efficace. Les quartiers résidentiels et les maisons avec jardin sont, eux, davantage exposés aux nuisibles volants (guêpes, frelons) au retour des beaux jours, et aux rongeurs venus de l'extérieur à l'automne.",
    proContext:
      "Restaurants, boulangeries, commerces alimentaires, hôtels et copropriétés d'Auxerre sont soumis à des obligations d'hygiène : nous proposons des interventions discrètes et, si besoin, des contrats de prévention avec rapports de traçabilité, adaptés aux contrôles sanitaires.",
    aroundLead: "Nous intervenons aussi dans les communes autour d'Auxerre, notamment :",
    nearbyTowns: [
      "Monéteau",
      "Appoigny",
      "Saint-Georges-sur-Baulche",
      "Perrigny",
      "Venoy",
      "Chevannes",
      "Migennes",
      "Chablis",
    ],
    frequentPestIds: ["rats", "souris", "punaises", "cafards", "guepes", "frelons"],
  },
  {
    slug: "sens",
    city: "Sens",
    postalCode: "89100",
    role: "deuxième ville de l'Yonne, au nord du département",
    intro:
      "À Sens et dans le nord de l'Yonne, Experts Nuisible assure la dératisation, la désinsectisation et la désinfection pour les particuliers et les professionnels. Deuxième ville du département, Sens conjugue un centre historique commerçant autour de sa cathédrale, des zones pavillonnaires et d'importants axes de passage. Nos techniciens interviennent 24h/24, week-ends et jours fériés inclus.",
    localContext:
      "Le cœur commerçant de Sens et ses immeubles anciens sont particulièrement concernés par les cafards et les rongeurs, tandis que la proximité des grands axes et des hébergements favorise la propagation des punaises de lit, souvent rapportées après un déplacement. Les quartiers résidentiels et les extérieurs voient, eux, revenir chaque été guêpes et frelons.",
    proContext:
      "Commerces du centre-ville, restaurants, hôtels et copropriétés de Sens doivent répondre à des exigences d'hygiène strictes : nous intervenons de façon discrète et proposons des contrats de suivi avec traçabilité, utiles lors des contrôles.",
    aroundLead: "Nous couvrons aussi les communes autour de Sens, notamment :",
    nearbyTowns: [
      "Paron",
      "Saint-Clément",
      "Maillot",
      "Gron",
      "Villeneuve-sur-Yonne",
      "Pont-sur-Yonne",
      "Joigny",
      "Villeneuve-la-Guyard",
    ],
    frequentPestIds: ["punaises", "rats", "cafards", "souris", "guepes", "frelons"],
  },
];

export const LOCAL_AREA_BY_SLUG: Record<string, LocalArea> = Object.fromEntries(
  LOCAL_AREAS.map((area) => [area.slug, area])
);
