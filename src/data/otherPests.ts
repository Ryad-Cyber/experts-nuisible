// ---------------------------------------------------------------------------
// "Autres nuisibles" — espèces complémentaires, moins courantes, volontairement
// distinctes des nuisibles principaux déjà mis en avant (rats, souris, cafards,
// punaises, guêpes, frelons, fourmis, chenilles...). Cette liste est un exemple
// non exhaustif, pas un guide détaillé (pas de fiche complète pestGuide) : elle
// répond à « et si mon nuisible n'est pas dans la liste principale ? ».
// ---------------------------------------------------------------------------

export type OtherPest = {
  id: string;
  name: string;
  description: string;
};

export const OTHER_PESTS: OtherPest[] = [
  {
    id: "mulot",
    name: "Mulot",
    description:
      "Petit rongeur sauvage pouvant entrer dans les habitations, greniers ou dépendances.",
  },
  {
    id: "lerot",
    name: "Lérot",
    description:
      "Petit rongeur nocturne ressemblant au loir, pouvant provoquer des nuisances dans les bâtiments.",
  },
  {
    id: "loir",
    name: "Loir",
    description: "Rongeur pouvant s'installer dans les combles et espaces calmes.",
  },
  {
    id: "taupe",
    name: "Taupe",
    description: "Animal fouisseur causant des dégâts dans les jardins et terrains extérieurs.",
  },
  {
    id: "poisson-argent",
    name: "Poisson d'argent",
    description:
      "Petit insecte recherchant les zones humides, salles de bain, caves ou pièces peu ventilées.",
  },
  {
    id: "cloportes",
    name: "Cloportes",
    description: "Petits crustacés terrestres attirés par l'humidité.",
  },
  {
    id: "coleopteres",
    name: "Coléoptères",
    description:
      "Groupe d'insectes pouvant inclure certains insectes nuisibles du bois ou domestiques.",
  },
  {
    id: "mites",
    name: "Mites",
    description: "Insectes pouvant toucher les textiles ou les denrées alimentaires.",
  },
  {
    id: "autres-insectes",
    name: "Autres insectes domestiques",
    description: "Catégorie ouverte pour les espèces non identifiées.",
  },
  {
    id: "autres-animaux",
    name: "Autres petits animaux nuisibles",
    description: "Pour les demandes particulières nécessitant une identification par un technicien.",
  },
];
