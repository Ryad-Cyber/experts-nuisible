// ---------------------------------------------------------------------------
// Contenu éditorial approfondi par service — alimente les pages /services/[slug].
// Objectif SEO : du contenu UTILE, unique et honnête pour chaque service (pas de
// texte générique recopié d'un service à l'autre, pas de bourrage de mots-clés,
// pas de statistique inventée). Le contexte local (Auxerre/Sens/Yonne) n'est
// ajouté que lorsqu'il est naturel.
// ---------------------------------------------------------------------------

export type ServiceFaqItem = { question: string; answer: string };

export type ServiceContent = {
  /** « Pourquoi il faut agir » — explication du problème traité. */
  intro: string;
  /** Méthode d'intervention (approche technique, complète les 3 étapes). */
  method: string;
  /** Cas fréquents rencontrés sur le terrain. */
  commonCases: string[];
  /** Particuliers + professionnels ; le contexte local est intégré ici quand utile. */
  audiences: string;
  /** FAQ courte, spécifique au service. */
  faq: ServiceFaqItem[];
};

export const SERVICE_CONTENT: Record<string, ServiceContent> = {
  deratisation: {
    intro:
      "Les rats et les souris ne sont pas qu'une nuisance : ils contaminent aliments et surfaces, rongent câbles électriques, isolants et canalisations, et se reproduisent très vite — quelques individus peuvent devenir une colonie en quelques semaines. Les premiers signes sont souvent des bruits de grattage la nuit, des crottes le long des murs, des emballages rongés ou une odeur d'urine persistante. Plus l'intervention est précoce, plus elle est simple et durable.",
    method:
      "Le technicien commence par une inspection complète pour identifier l'espèce, les points d'entrée et les zones de passage. Le traitement associe des postes d'appâtage sécurisés — inaccessibles aux enfants et aux animaux domestiques — et, selon les cas, des pièges mécaniques placés aux endroits stratégiques. Nous traitons la source, pas seulement les individus visibles, et nous repérons les accès à colmater pour éviter une réinfestation. Un point de suivi confirme l'élimination.",
    commonCases: [
      "Bruits de grattage dans les combles, les cloisons ou les faux plafonds",
      "Rats dans les caves, sous-sols et vides sanitaires",
      "Souris en cuisine ou dans les réserves alimentaires",
      "Rongeurs dans les dépendances, garages et bâtiments agricoles",
      "Commerces et restaurants soumis à des obligations d'hygiène",
    ],
    audiences:
      "Nous intervenons aussi bien chez les particuliers (maisons, appartements, dépendances) que chez les professionnels — restaurants, commerces alimentaires, copropriétés — pour lesquels la présence de rongeurs engage la réglementation hygiène et l'image de l'établissement. Dans l'Yonne, les rongeurs concernent autant les centres anciens d'Auxerre et de Sens que les maisons avec jardin et les dépendances en zone rurale, où les accès sont nombreux.",
    faq: [
      {
        question: "Combien de temps faut-il pour éliminer des rats ou des souris ?",
        answer:
          "Cela dépend de l'ampleur de l'infestation, mais la population diminue généralement dès les premiers jours suivant la pose des dispositifs. Une infestation installée peut demander un à plusieurs passages, avec un suivi pour confirmer l'élimination complète.",
      },
      {
        question: "Les appâts sont-ils dangereux pour mes enfants ou mes animaux ?",
        answer:
          "Les appâts sont placés dans des postes sécurisés et verrouillés, inaccessibles aux enfants et aux animaux domestiques. Le technicien adapte aussi les dispositifs — pièges mécaniques par exemple — selon la configuration des lieux.",
      },
      {
        question: "Comment éviter que les rongeurs reviennent ?",
        answer:
          "L'élimination doit s'accompagner du colmatage des points d'entrée et de bonnes pratiques (stockage des aliments, gestion des déchets). Nous vous indiquons les mesures à prendre, et un contrat de suivi est possible pour les sites sensibles.",
      },
    ],
  },

  desinsectisation: {
    intro:
      "Cafards, punaises de lit, fourmis : ces insectes se reproduisent vite et se cachent dans des endroits difficiles d'accès — gaines techniques, plinthes, sommiers, fissures. Les produits vendus en grande surface traitent souvent les insectes visibles sans atteindre le nid ou les œufs, ce qui explique un retour rapide du problème. Un traitement professionnel vise la source et tient compte du cycle de reproduction propre à chaque espèce.",
    method:
      "Tout commence par l'identification précise de l'espèce et des zones infestées. Selon le cas, nous appliquons un gel insecticide (cafards), un traitement par pulvérisation ou vapeur sèche (punaises de lit), ou un traitement ciblé des passages et du nid (fourmis). Nous traitons les foyers cachés et planifions, si nécessaire, un second passage pour éliminer les insectes issus des œufs éclos après la première intervention.",
    commonCases: [
      "Punaises de lit : piqûres alignées, traces sur le matelas et le sommier",
      "Cafards en cuisine, salle de bain ou gaines techniques d'immeuble",
      "Fourmis envahissant cuisines et terrasses au retour des beaux jours",
      "Hôtels, meublés et locations saisonnières touchés par les punaises de lit",
      "Restaurants et commerces alimentaires face aux cafards",
    ],
    audiences:
      "Particuliers comme professionnels : nous intervenons dans les logements, mais aussi dans les restaurants, hôtels et commerces, où une infestation de cafards ou de punaises peut entraîner une fermeture administrative ou nuire durablement à la réputation. Les immeubles anciens des centres-villes d'Auxerre et de Sens, avec leurs gaines communes, favorisent la circulation des cafards d'un logement à l'autre : un traitement coordonné y est souvent plus efficace.",
    faq: [
      {
        question: "Dois-je tout jeter en cas de punaises de lit ?",
        answer:
          "Non, dans la grande majorité des cas il n'est pas nécessaire de jeter meubles ou matelas. Le traitement (vapeur, produits ciblés) permet de conserver vos affaires ; le technicien vous indique seulement les précautions à prendre avant et après l'intervention.",
      },
      {
        question: "Combien de passages sont nécessaires ?",
        answer:
          "Pour les cafards, un à deux passages suffisent généralement. Les punaises de lit demandent souvent deux passages espacés, le temps de traiter les œufs qui éclosent après la première intervention.",
      },
      {
        question: "Le traitement est-il efficace immédiatement ?",
        answer:
          "Les insectes visibles régressent rapidement, mais l'élimination complète tient compte du cycle de reproduction : c'est pourquoi un contrôle ou un second passage est parfois recommandé.",
      },
    ],
  },

  desinfection: {
    intro:
      "La désinfection va au-delà du nettoyage : elle élimine bactéries, virus et micro-organismes présents sur les surfaces, ainsi que les odeurs persistantes. Elle est souvent nécessaire après une infestation de nuisibles, dans des locaux soumis à des obligations sanitaires, après un dégât ou dans un logement resté insalubre, ou simplement pour assainir un espace partagé.",
    method:
      "Nous réalisons un nettoyage préalable puis une désinfection avec des produits homologués, appliqués par pulvérisation ou nébulisation pour atteindre l'ensemble des surfaces, y compris les zones difficiles d'accès. Le protocole est adapté à la nature des locaux et au niveau de risque sanitaire, et nous traitons les sources d'odeurs plutôt que de les masquer.",
    commonCases: [
      "Locaux professionnels soumis à des règles d'hygiène (cuisines, laboratoires)",
      "Assainissement après une infestation de rongeurs ou d'insectes",
      "Logements insalubres ou restés longtemps inoccupés",
      "Élimination d'odeurs persistantes (organiques, tabac, humidité)",
      "Parties communes de copropriété et locaux partagés",
    ],
    audiences:
      "Nous intervenons pour les professionnels — restaurants, commerces, cabinets, copropriétés — comme pour les particuliers, avec des protocoles adaptés à chaque type de local et à son usage.",
    faq: [
      {
        question: "Quelle différence entre nettoyage et désinfection ?",
        answer:
          "Le nettoyage retire les salissures visibles ; la désinfection élimine les micro-organismes (bactéries, virus) invisibles à l'œil nu. Les deux sont complémentaires : nous nettoyons avant de désinfecter pour une efficacité maximale.",
      },
      {
        question: "Les locaux sont-ils utilisables juste après ?",
        answer:
          "Le délai dépend du produit et de la méthode employés. Le technicien vous indique le temps de séchage ou d'aération à respecter avant de réinvestir les lieux.",
      },
      {
        question: "Fournissez-vous un justificatif d'intervention ?",
        answer:
          "Oui, un rapport d'intervention peut être fourni, utile notamment pour les professionnels soumis à des contrôles d'hygiène.",
      },
    ],
  },

  professionnels: {
    intro:
      "Pour un professionnel, la présence de nuisibles n'est pas qu'un désagrément : c'est un risque réglementaire, sanitaire et d'image. Restaurants, commerces alimentaires et copropriétés sont soumis à des obligations d'hygiène et de traçabilité, et un contrôle ou un avis client négatif peut avoir de lourdes conséquences. La lutte contre les nuisibles doit y être continue, pas seulement curative.",
    method:
      "Nous mettons en place un contrat de prévention adapté à votre activité : diagnostic initial, dispositifs de surveillance (postes d'appâtage, pièges de monitoring), visites planifiées à intervalles réguliers et interventions curatives si nécessaire. Chaque passage donne lieu à un rapport détaillé, utile pour votre traçabilité et vos contrôles d'hygiène (HACCP).",
    commonCases: [
      "Restaurants, boulangeries et métiers de bouche",
      "Commerces alimentaires et grandes surfaces",
      "Hôtels et hébergements touristiques",
      "Copropriétés et bailleurs (parties communes, caves)",
      "Entrepôts, ateliers et locaux de stockage",
    ],
    audiences:
      "Notre offre professionnelle s'adresse à tous les établissements pour lesquels l'hygiène est un enjeu quotidien, autour d'Auxerre, de Sens et dans toute l'Yonne, avec des interventions discrètes qui respectent votre activité et votre clientèle.",
    faq: [
      {
        question: "Fournissez-vous des rapports pour les contrôles d'hygiène ?",
        answer:
          "Oui. Chaque intervention est documentée (rapport, plan des dispositifs, produits utilisés), ce qui constitue une traçabilité exploitable lors d'un contrôle sanitaire ou d'un audit HACCP.",
      },
      {
        question: "À quelle fréquence ont lieu les visites ?",
        answer:
          "La fréquence dépend de votre activité et du niveau de risque : elle est définie ensemble lors du diagnostic initial (par exemple mensuelle ou trimestrielle) et ajustée si besoin.",
      },
      {
        question: "Les interventions perturbent-elles l'activité ?",
        answer:
          "Nous intervenons de façon discrète et, si nécessaire, en dehors des heures d'ouverture, pour ne gêner ni votre clientèle ni votre production.",
      },
    ],
  },

  "nuisibles-volants": {
    intro:
      "Guêpes, frelons — notamment le frelon asiatique — et pigeons présentent des risques bien réels : piqûres multiples parfois dangereuses en cas d'allergie, nids installés en hauteur ou dans les combles, fientes de pigeons qui dégradent les bâtiments et posent un problème sanitaire. Ces situations demandent un équipement adapté et ne doivent pas être traitées soi-même.",
    method:
      "Pour les nids de guêpes et de frelons, le technicien intervient en sécurité avec une combinaison de protection intégrale et, selon la hauteur, une perche télescopique ou un traitement à distance — sans mettre en danger les occupants. Pour les pigeons, nous mettons en place des solutions durables de dépigeonnage (pics, filets, dispositifs d'effarouchement) plutôt qu'un traitement ponctuel.",
    commonCases: [
      "Nids de guêpes sous toiture, dans un volet roulant ou dans un mur",
      "Frelons asiatiques, dont les nids peuvent être volumineux et hauts",
      "Nids de frelons européens dans les arbres ou les dépendances",
      "Pigeons colonisant toitures, balcons et façades",
      "Situations urgentes près d'un lieu de passage ou d'une école",
    ],
    audiences:
      "Nous intervenons chez les particuliers comme chez les professionnels. Ces interventions sont souvent saisonnières : les nids de guêpes et de frelons se signalent surtout de la fin du printemps à l'automne, période où nous recevons le plus d'appels dans l'Yonne.",
    faq: [
      {
        question: "Dans quel délai pouvez-vous détruire un nid ?",
        answer:
          "Un nid de guêpes ou de frelons est une intervention prioritaire : nous nous efforçons d'intervenir rapidement, y compris le week-end, surtout lorsqu'il se trouve près d'un passage ou d'une entrée.",
      },
      {
        question: "Est-ce dangereux de détruire un nid soi-même ?",
        answer:
          "Oui. Sans protection adaptée, la destruction d'un nid expose à des piqûres multiples, dangereuses en cas d'allergie ou de nid volumineux. Nos techniciens disposent de l'équipement nécessaire pour intervenir en sécurité.",
      },
      {
        question: "Comment reconnaître un frelon asiatique ?",
        answer:
          "Le frelon asiatique est plus sombre que le frelon européen, avec des pattes jaunes et une fine bande orangée sur l'abdomen. En cas de doute, envoyez-nous une photo : nous identifions l'espèce avant d'intervenir.",
      },
    ],
  },

  prevention: {
    intro:
      "La meilleure intervention est celle qu'on évite. La prévention consiste à identifier les vulnérabilités d'un bâtiment — points d'entrée, sources de nourriture, zones humides — avant qu'une infestation ne s'installe, ou juste après un traitement curatif pour éviter toute récidive. C'est une démarche particulièrement utile pour les bâtiments anciens et les sites sensibles.",
    method:
      "Nous réalisons un diagnostic complet des lieux : repérage des accès possibles, des facteurs favorisant les nuisibles et des zones à risque. Nous établissons ensuite un plan de prévention (mesures de colmatage, recommandations d'aménagement, dispositifs de surveillance) et, si vous le souhaitez, des visites de suivi régulières pour contrôler l'efficacité dans le temps.",
    commonCases: [
      "Après une intervention curative, pour éviter le retour du problème",
      "Bâtiments anciens et dépendances, aux accès multiples",
      "Maisons avec jardin, en zone pavillonnaire ou rurale de l'Yonne",
      "Professionnels soumis à des obligations d'hygiène",
      "Copropriétés souhaitant sécuriser les parties communes",
    ],
    audiences:
      "Particuliers comme professionnels : la prévention s'adapte à la taille et à l'usage des lieux, d'un logement individuel à un ensemble de locaux professionnels.",
    faq: [
      {
        question: "La prévention est-elle utile s'il n'y a pas encore d'infestation ?",
        answer:
          "Oui, c'est justement son intérêt : anticiper coûte généralement moins cher et évite le stress d'une infestation installée, surtout dans les bâtiments anciens ou exposés.",
      },
      {
        question: "En quoi consiste le suivi ?",
        answer:
          "Le suivi repose sur des visites planifiées, avec contrôle des dispositifs et des points sensibles, et des ajustements si la situation évolue. Sa fréquence est définie selon le niveau de risque.",
      },
      {
        question: "Proposez-vous des contrats à l'année ?",
        answer:
          "Oui, des contrats de prévention et de suivi régulier sont disponibles, particulièrement adaptés aux professionnels et aux copropriétés.",
      },
    ],
  },
};
