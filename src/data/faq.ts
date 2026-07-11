export type FaqItem = {
  question: string;
  answer: string;
};

// Ordered by search intent: the highest-volume, highest-commercial-intent queries (prix,
// urgence, délai, zone, devis) come first, then pest-identification questions, then
// pest-specific long-tail questions, then process/trust/prevention/guarantee questions. Keep
// new entries phrased as real search queries — this list also drives the FAQPage JSON-LD in
// FaqJsonLd.tsx.
export const faqItems: FaqItem[] = [
  {
    question: "Quel est le prix d'une dératisation ?",
    answer:
      "Le prix d'une dératisation dépend de plusieurs facteurs : le niveau d'infestation, la surface à traiter, le type de bien (maison, appartement, local professionnel) et la difficulté d'accès aux zones concernées (combles, caves, canalisations). Après un premier échange téléphonique, nous établissons un devis gratuit et détaillé, sans engagement, avant toute intervention.",
  },
  {
    question: "Quel est le prix d'une désinsectisation ?",
    answer:
      "Le tarif d'une désinsectisation varie selon le type d'insecte traité (cafards, punaises de lit, fourmis, guêpes, frelons...), la surface concernée et le nombre de pièces ou de foyers à traiter. Comme pour la dératisation, nous vous proposons un devis gratuit et personnalisé avant toute intervention, adapté à votre situation précise.",
  },
  {
    question: "Intervenez-vous en urgence le jour même ?",
    answer:
      "Oui. Nous intervenons 24h/24 et 7j/7, week-ends et jours fériés inclus, et proposons des interventions le jour même selon les disponibilités de nos équipes, notamment pour les situations urgentes comme un nid de guêpes ou une infestation importante de nuisibles.",
  },
  {
    question: "Quel est votre délai d'intervention ?",
    answer:
      "Pour une urgence (nid de guêpes ou de frelons, infestation importante, présence de nuisibles dans un lieu accueillant du public), nous intervenons généralement sous 24h. Pour un traitement planifié ou une visite préventive, le rendez-vous est fixé selon vos disponibilités, souvent sous 48 à 72h.",
  },
  {
    question: "Dans quelles zones intervenez-vous ?",
    answer:
      "Nous intervenons grâce à un réseau de techniciens couvrant de nombreuses agglomérations françaises, notamment à Orléans et dans le Loiret, à Blois, Tours et Chartres, ainsi que plus largement en Centre-Val de Loire et en Île-de-France. Contactez-nous pour vérifier la disponibilité de nos équipes dans votre secteur avant de programmer votre intervention.",
  },
  {
    question: "Comment obtenir un devis pour une intervention ?",
    answer:
      "Le plus simple est de nous appeler directement pour un premier diagnostic par téléphone, ou de remplir notre formulaire de contact en précisant le nuisible concerné, le type de bien et sa localisation. Le devis est gratuit, détaillé et sans engagement, et nous pouvons souvent vous donner une première estimation dès l'appel.",
  },
  {
    question: "Intervenez-vous le week-end et les jours fériés ?",
    answer:
      "Oui, notre équipe est disponible 24h/24 et 7j/7, y compris les week-ends et les jours fériés. Les nuisibles ne respectant pas d'horaires, nous avons organisé notre service pour pouvoir intervenir rapidement quel que soit le jour de votre demande.",
  },
  {
    question: "Comment identifier le nuisible présent dans mon logement ?",
    answer:
      "Sans diagnostic sur place, il est parfois difficile de distinguer certains nuisibles (rats et souris, guêpes et frelons, punaises de lit et autres insectes piqueurs). Vous pouvez nous décrire ce que vous observez — bruits, traces, insectes, nid — lors de votre appel : nos techniciens s'appuient sur ces éléments pour orienter le diagnostic, puis confirment l'espèce concernée lors de leur visite.",
  },
  {
    question: "Quels sont les signes d'une infestation de nuisibles ?",
    answer:
      "Les signes varient selon le nuisible : crottes et traces de grignotage pour les rongeurs, va-et-vient d'insectes vers un point précis pour les guêpes et frelons, piqûres groupées au réveil pour les punaises de lit, ou encore odeurs inhabituelles et bruits dans les murs ou le plafond. Dès l'apparition de l'un de ces signes, un diagnostic permet de confirmer la présence du nuisible et d'agir avant que la situation ne s'aggrave.",
  },
  {
    question: "Quand faut-il faire appel à un professionnel de la lutte contre les nuisibles ?",
    answer:
      "Il est recommandé de faire appel à un professionnel dès que les solutions grand public (pièges, sprays) ne suffisent plus, en cas de nid de guêpes ou de frelons difficile d'accès, de suspicion de punaises de lit ou de termites, ou simplement pour un diagnostic préventif. Un traitement professionnel permet un résultat plus rapide, plus sûr et durable qu'une intervention réalisée seul.",
  },
  {
    question: "Pourquoi faire appel à une entreprise spécialisée plutôt que d'utiliser des produits du commerce ?",
    answer:
      "Les produits en vente libre traitent souvent les nuisibles visibles sans atteindre le nid, la colonie ou les œufs à l'origine de l'infestation, ce qui explique un retour fréquent du problème quelques semaines plus tard. Une entreprise spécialisée dispose de produits professionnels plus puissants, d'un diagnostic précis et de techniciens formés pour traiter la source du problème, avec un résultat plus durable et une garantie après intervention.",
  },
  {
    question: "Combien de temps faut-il pour se débarrasser des nuisibles ?",
    answer:
      "Cela dépend du nuisible et de l'ampleur de l'infestation : un nid de guêpes ou de frelons est généralement traité en une seule intervention, tandis qu'une infestation de rongeurs, de cafards ou de punaises de lit peut nécessiter plusieurs passages espacés de quelques semaines pour traiter les nouvelles éclosions ou les individus restants. Un contrôle de suivi permet de confirmer l'éradication complète.",
  },
  {
    question: "Intervenez-vous chez les particuliers et les professionnels ?",
    answer:
      "Oui, nous traitons aussi bien les logements individuels et appartements que les commerces, restaurants, entreprises et copropriétés, avec des protocoles et des produits adaptés à chaque type de site et à ses contraintes d'exploitation.",
  },
  {
    question: "Proposez-vous des contrats d'entretien pour les copropriétés et les professionnels ?",
    answer:
      "Oui, nous proposons des contrats de prévention et de suivi régulier, avec des visites planifiées à intervalles réguliers. Ces contrats sont particulièrement adaptés aux copropriétés, restaurants et locaux professionnels soumis à des obligations d'hygiène et de traçabilité.",
  },
  {
    question: "Comment se déroule une intervention de dératisation ?",
    answer:
      "Notre technicien réalise d'abord un diagnostic complet pour identifier les points d'entrée et le niveau d'infestation, puis met en place un traitement adapté (pièges mécaniques, appâts sécurisés selon le contexte) et vous conseille sur les mesures de prévention à adopter pour éviter un nouveau passage de rongeurs.",
  },
  {
    question: "Comment savoir si j'ai des rats ou des souris chez moi ?",
    answer:
      "Des crottes de petite taille, des traces de grignotage sur les emballages ou les câbles, des bruits de grattage dans les murs ou le plafond la nuit, et une odeur âcre particulière sont les signes les plus courants d'une présence de rats ou de souris. En cas de doute, un diagnostic permet de confirmer la présence et l'espèce concernée afin d'adapter le traitement.",
  },
  {
    question: "Comment se débarrasser des cafards durablement ?",
    answer:
      "Un traitement efficace contre les cafards combine gel insecticide professionnel, traitement des points d'eau et de chaleur où ils se réfugient, et un suivi dans les semaines suivantes pour éliminer les nouvelles éclosions issues des œufs déjà pondus. Nos techniciens interviennent avec des produits professionnels non accessibles au grand public, plus efficaces que les solutions en vente libre.",
  },
  {
    question: "Comment détecter et traiter les punaises de lit ?",
    answer:
      "Des piqûres groupées au réveil, de petites taches de sang sur les draps et des points noirs le long des coutures du matelas sont les signes les plus fréquents d'une présence de punaises de lit. Le traitement associe généralement pulvérisation et/ou traitement thermique selon l'ampleur de l'infestation, avec un contrôle de suivi pour s'assurer de l'éradication complète.",
  },
  {
    question: "Combien de temps dure un traitement contre les punaises de lit ?",
    answer:
      "Selon l'ampleur de l'infestation, un traitement complet contre les punaises de lit nécessite en général une à deux interventions espacées de quelques semaines, le temps de traiter les œufs et les nouvelles éclosions, avec un contrôle final pour confirmer l'éradication totale.",
  },
  {
    question: "Combien coûte la destruction d'un nid de guêpes ou de frelons ?",
    answer:
      "Le tarif dépend de l'emplacement du nid et de la difficulté d'accès : un nid en hauteur, à l'intérieur d'un mur ou dans une cheminée demande davantage de temps et de matériel qu'un nid facilement accessible. Nous établissons un devis gratuit et transparent avant toute intervention, généralement dès le premier appel.",
  },
  {
    question: "Comment reconnaître un nid de guêpes ou de frelons ?",
    answer:
      "Un va-et-vient régulier d'insectes vers un même point — sous un toit, dans un arbre, une cheminée ou un mur — est le principal indice de la présence d'un nid. En cas de doute sur l'espèce ou l'emplacement exact, nous réalisons un diagnostic pour identifier précisément le nid et adapter le traitement en conséquence.",
  },
  {
    question: "Peut-on détruire un nid de guêpes ou de frelons soi-même ?",
    answer:
      "C'est fortement déconseillé : sans équipement de protection adapté, la destruction d'un nid expose à des piqûres multiples, parfois dangereuses en cas d'allergie ou lorsque le nid est volumineux. Nos techniciens interviennent en sécurité avec le matériel de protection nécessaire et des produits professionnels garantissant une élimination complète du nid.",
  },
  {
    question: "Comment différencier un frelon asiatique d'un frelon européen ?",
    answer:
      "Le frelon asiatique est plus sombre que le frelon européen, avec des pattes jaunes caractéristiques et un thorax presque entièrement noir, alors que le frelon européen est plus roux et généralement plus volumineux. Nos techniciens identifient précisément l'espèce lors du diagnostic pour adapter la méthode de traitement, le frelon asiatique nécessitant souvent une vigilance particulière.",
  },
  {
    question: "Comment savoir si ma maison est infestée de termites ?",
    answer:
      "Un bois qui sonne creux au toucher, des galeries visibles à la surface, la présence de terre fine près des structures en bois ou de petites ouvertures dans les cloisons sont des signes d'alerte d'une infestation de termites. Un diagnostic termites permet de confirmer la présence, d'évaluer l'étendue des dégâts et de définir le traitement le plus adapté.",
  },
  {
    question: "La désinfection est-elle nécessaire après une dératisation ?",
    answer:
      "Oui, dans de nombreux cas : les rongeurs et certains insectes peuvent laisser des résidus, excréments ou allergènes propices au développement de bactéries et de mauvaises odeurs. Une désinfection complète l'intervention de dératisation ou de désinsectisation pour assainir durablement les surfaces concernées et limiter les risques sanitaires.",
  },
  {
    question: "Vos traitements sont-ils sans danger pour les enfants et les animaux ?",
    answer:
      "Nous utilisons des produits homologués et appliquons des protocoles stricts adaptés à la présence d'enfants ou d'animaux domestiques dans le foyer. Nous vous indiquons systématiquement les précautions simples à respecter pendant et après l'intervention, notamment le délai à observer avant de réintégrer les pièces traitées.",
  },
  {
    question: "Faut-il quitter le logement pendant le traitement ?",
    answer:
      "Cela dépend du type de traitement et du produit utilisé. Pour la plupart des interventions, une courte aération des pièces suffit ; pour certains traitements plus spécifiques (traitement thermique, produits à action prolongée), notre technicien vous indiquera un délai précis avant de pouvoir réoccuper les lieux en toute sécurité.",
  },
  {
    question: "Vos techniciens sont-ils certifiés ?",
    answer:
      "Oui, nos techniciens sont formés et certifiés Certibiocide, la certification reconnue par le Ministère de l'Agriculture pour l'application de produits biocides à usage professionnel, garantissant un traitement conforme aux règles de sécurité et d'environnement en vigueur.",
  },
  {
    question: "Quels produits utilisez-vous pour vos traitements ?",
    answer:
      "Nous travaillons avec des solutions professionnelles reconnues, sélectionnées pour leur efficacité et leur conformité réglementaire, appliquées uniquement par des techniciens formés à leur usage. Ces produits, réservés aux professionnels, offrent généralement de meilleurs résultats que les solutions disponibles dans le commerce.",
  },
  {
    question: "Comment prévenir le retour des nuisibles après un traitement ?",
    answer:
      "Colmater les points d'entrée identifiés lors du diagnostic, limiter les sources de nourriture et d'humidité, et entretenir régulièrement les zones à risque (combles, caves, extérieurs) sont les gestes essentiels pour éviter un nouveau passage de nuisibles. Nous vous fournissons des conseils personnalisés et adaptés à votre logement après chaque intervention.",
  },
  {
    question: "Existe-t-il des solutions de prévention avant l'apparition de nuisibles ?",
    answer:
      "Oui, nous proposons des diagnostics préventifs et des contrats d'entretien réguliers, particulièrement recommandés pour les professionnels, restaurants et copropriétés soumis à des obligations d'hygiène. Une visite préventive permet souvent d'éviter une infestation plus coûteuse à traiter par la suite.",
  },
  {
    question: "Proposez-vous une garantie après l'intervention ?",
    answer:
      "Oui, nos interventions sont couvertes par une garantie résultat de 30 jours : si les nuisibles réapparaissent durant cette période, nous intervenons à nouveau sans frais supplémentaires, dans la limite des conditions convenues lors du devis.",
  },
  {
    question: "Faites-vous des rapports d'intervention pour les professionnels ?",
    answer:
      "Oui, chaque intervention réalisée pour un professionnel ou une copropriété fait l'objet d'un rapport détaillé, précisant le diagnostic, le traitement effectué et les préconisations. Ce document est utile pour vos obligations réglementaires et le suivi de vos contrats d'hygiène.",
  },
  {
    question: "Comment se passe le paiement d'une intervention ?",
    answer:
      "Le règlement s'effectue après l'intervention, une fois le devis validé et les travaux réalisés. Plusieurs moyens de paiement sont acceptés ; les modalités exactes vous sont communiquées lors de l'établissement du devis, avant toute intervention.",
  },
  {
    question: "Puis-je annuler ou reporter un rendez-vous ?",
    answer:
      "Oui, il suffit de nous contacter par téléphone dès que possible pour reporter ou annuler votre rendez-vous. Aucun frais n'est appliqué si la demande est faite suffisamment à l'avance, avant le déplacement de notre technicien.",
  },
];
