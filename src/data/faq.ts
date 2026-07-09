export type FaqItem = {
  question: string;
  answer: string;
};

export const faqItems: FaqItem[] = [
  {
    question: "Combien coûte la destruction d'un nid de guêpes ou de frelons ?",
    answer:
      "Le tarif dépend de l'emplacement du nid et de la difficulté d'accès. Nous établissons un devis gratuit et transparent avant toute intervention, sans engagement de votre part.",
  },
  {
    question: "Intervenez-vous en urgence le jour même pour un nid de guêpes ?",
    answer:
      "Oui. Nous intervenons 24h/24 et 7j/7, week-ends et jours fériés inclus, et proposons des interventions le jour même selon les disponibilités de nos équipes.",
  },
  {
    question: "Peut-on détruire un nid de guêpes soi-même ?",
    answer:
      "C'est fortement déconseillé : sans équipement adapté, la destruction expose à des piqûres multiples, parfois dangereuses. Nos techniciens interviennent en sécurité avec le matériel de protection nécessaire.",
  },
  {
    question: "Comment reconnaître un nid de guêpes ou de frelons ?",
    answer:
      "Un va-et-vient régulier d'insectes vers un même point — sous un toit, dans un arbre, une cheminée ou un mur — est le principal indice. En cas de doute, nous réalisons un diagnostic pour identifier l'espèce et le traitement adapté.",
  },
  {
    question: "Vos traitements sont-ils sans danger pour les enfants et les animaux ?",
    answer:
      "Nous utilisons des produits homologués et appliquons des protocoles stricts. Nous vous indiquons systématiquement les précautions simples à respecter pendant et après l'intervention.",
  },
  {
    question: "Proposez-vous une garantie après l'intervention ?",
    answer:
      "Oui, nos interventions sont couvertes par une garantie résultat de 30 jours : si les nuisibles réapparaissent durant cette période, nous intervenons à nouveau sans frais supplémentaires.",
  },
  {
    question: "Dans quelles zones intervenez-vous ?",
    answer:
      "Nous intervenons autour d'Orléans et dans une grande partie de la France — Centre-Val de Loire, Bourgogne, Île-de-France et au-delà — ainsi que dans toutes les communes voisines.",
  },
];
