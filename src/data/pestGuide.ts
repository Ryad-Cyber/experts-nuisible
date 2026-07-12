import type { ModelTuning } from "@/components/three/PestModelViewer";

// ---------------------------------------------------------------------------
// SOURCE UNIQUE des nuisibles — alimente l'identificateur 3D (/galerie-3d),
// le guide SEO rendu côté serveur, les CTA contextualisés (WhatsApp, devis)
// et, à terme, les futures pages /nuisibles/[slug].
//
// Migration progressive : pests.ts (rail homepage) et pestModels.ts restent
// en place tant que leurs consommateurs n'ont pas tous basculé ici.
//
// ⚠️ Contenu métier : les signes, urgences et conseils sont des connaissances
// générales du secteur, à faire valider par l'entreprise avant toute
// modification des protocoles décrits. Ne jamais inventer d'engagement.
// ---------------------------------------------------------------------------

export type PestCategoryId = "rongeurs" | "rampants" | "volants" | "jardin" | "autres";

export const PEST_CATEGORIES: { id: PestCategoryId; label: string }[] = [
  { id: "rongeurs", label: "Rongeurs" },
  { id: "rampants", label: "Insectes rampants" },
  { id: "volants", label: "Insectes volants" },
  { id: "jardin", label: "Jardin & extérieur" },
  { id: "autres", label: "Humidité & autres" },
];

export type PestGuideEntry = {
  id: string;
  name: string;
  category: PestCategoryId;
  /** Modèle 3D + cadrage — absent pour les nuisibles sans GLB (photo utilisée). */
  model?: { file: string; tuning?: ModelTuning };
  /** Photo de repli : nuisible sans modèle 3D, ou WebGL indisponible. */
  photo?: string;
  /** Id du service associé (src/data/services.ts) — pré-remplit le formulaire. */
  serviceId: string;
  description: string;
  signs: string[];
  hidingSpots: string[];
  urgency: { level: 1 | 2 | 3; reason: string };
  mistakes: string[];
  firstAction: string;
  prevention: string;
  whenToCall: string;
  /** Message WhatsApp pré-écrit, contextualisé au nuisible. */
  whatsappMessage: string;
};

export const DEFAULT_PEST_ID = "rats";

export const PEST_GUIDE: PestGuideEntry[] = [
  // ------------------------------------------------------------- Rongeurs
  {
    id: "rats",
    name: "Rats",
    category: "rongeurs",
    model: { file: "/rat_3D.glb", tuning: { scale: 1.3, offsetY: 0.12 } },
    serviceId: "deratisation",
    description:
      "Le rat s'installe dès qu'il trouve nourriture et passage ; il se reproduit vite et cause des dégâts matériels et sanitaires sérieux.",
    signs: [
      "Bruits de grattement la nuit (plafonds, cloisons, vide sanitaire)",
      "Excréments allongés (1–2 cm), sombres, groupés",
      "Câbles, plinthes ou emballages rongés",
      "Traces de passage grasses le long des murs",
    ],
    hidingSpots: [
      "Caves, vides sanitaires et combles",
      "Arrière des cuisines et locaux poubelles",
      "Canalisations et gaines techniques",
      "Terriers le long des murs et abris de jardin",
    ],
    urgency: {
      level: 3,
      reason:
        "Un couple peut engendrer des dizaines d'individus en quelques mois, et les câbles rongés créent un risque d'incendie.",
    },
    mistakes: [
      "Poser du poison seul sans boucher les accès : la colonie se renouvelle",
      "Boucher les trous sans traiter : les rats rongent un nouveau passage",
      "Laisser nourriture ou sacs poubelle accessibles pendant le traitement",
    ],
    firstAction:
      "Stockez la nourriture en boîtes hermétiques et notez où et quand vous entendez les bruits : ces repères feront gagner un temps précieux au technicien.",
    prevention:
      "Boucher les passages (grilles, mortier), stocker les aliments hermétiquement, ne rien laisser d'accessible dans les locaux poubelles.",
    whenToCall:
      "Dès les premiers bruits nocturnes ou excréments : une intervention précoce évite qu'une colonie s'installe.",
    whatsappMessage:
      "Bonjour, je pense avoir des rats chez moi. Je vous envoie des photos pour identification.",
  },
  {
    id: "souris",
    name: "Souris",
    category: "rongeurs",
    model: { file: "/mouse_3D.glb", tuning: { scale: 1.05, offsetY: 0.05 } },
    photo: "/mouse.jpg",
    serviceId: "deratisation",
    description:
      "La souris se faufile par une ouverture de 6 mm et niche au plus près des réserves de nourriture.",
    signs: [
      "Excréments noirs de la taille d'un grain de riz",
      "Grignotements légers dans les cloisons le soir",
      "Emballages percés dans les placards",
      "Odeur d'ammoniac dans les espaces clos",
    ],
    hidingSpots: [
      "Derrière l'électroménager",
      "Placards de cuisine et cellier",
      "Cloisons creuses et faux plafonds",
      "Garages et cartons stockés",
    ],
    urgency: {
      level: 2,
      reason:
        "Moins destructrice que le rat, mais la reproduction est très rapide : quelques semaines suffisent pour passer d'un individu à une famille.",
    },
    mistakes: [
      "Se contenter d'une tapette : le nid continue de produire",
      "Négliger les petits passages — 6 mm suffisent",
      "Garder les denrées dans leurs emballages d'origine",
    ],
    firstAction:
      "Mettez les denrées en contenants fermés et repérez les emballages abîmés pour situer la zone active.",
    prevention:
      "Boucher les passages (laine d'acier + enduit), stocker les aliments dans des contenants hermétiques.",
    whenToCall:
      "Dès les premiers excréments : une colonie s'installe en silence bien plus vite qu'on ne le pense.",
    whatsappMessage:
      "Bonjour, je pense avoir des souris chez moi. Je vous envoie des photos pour identification.",
  },
  {
    id: "autres-rongeurs",
    name: "Autres rongeurs",
    category: "rongeurs",
    model: { file: "/capybara_3D.glb" },
    serviceId: "deratisation",
    description:
      "Loirs, lérots, mulots… d'autres rongeurs s'invitent dans les combles et dépendances, surtout à l'automne.",
    signs: [
      "Bruits de course dans les combles la nuit",
      "Provisions ou fruits entamés",
      "Isolation creusée ou déplacée pour nicher",
    ],
    hidingSpots: [
      "Combles et greniers",
      "Garages, abris de jardin et dépendances",
      "Doubles cloisons",
    ],
    urgency: {
      level: 2,
      reason:
        "Les dégâts d'isolation et de câbles s'accumulent tant que l'accès reste ouvert, et certaines espèces hivernent sur place.",
    },
    mistakes: [
      "Poser du poison sans identification — certaines espèces (loir, lérot) sont réglementées",
      "Boucher l'accès avec les animaux encore à l'intérieur",
    ],
    firstAction:
      "Notez les heures et zones de bruit, et vérifiez les points d'entrée visibles (tuiles déplacées, aérations).",
    prevention:
      "Grillager les aérations et élaguer les branches qui touchent la toiture.",
    whenToCall:
      "Si les bruits reviennent plusieurs nuits de suite : l'installation est probable.",
    whatsappMessage:
      "Bonjour, j'entends des bruits de rongeurs chez moi (combles ou cloisons). Je vous envoie des photos.",
  },
  {
    id: "fouines",
    name: "Fouine",
    category: "rongeurs",
    model: { file: "/fouine_3D.glb", tuning: { scale: 1.15, offsetY: 0.08 } },
    photo: "/fouine.jpg",
    serviceId: "deratisation",
    description:
      "La fouine s'installe dans les combles et y cause des dégâts bruyants — sa gestion est encadrée par la réglementation.",
    signs: [
      "Vacarme nocturne (courses, cris) dans les combles",
      "Isolation lacérée et déplacée",
      "Restes de proies, excréments ou forte odeur dans le grenier",
    ],
    hidingSpots: [
      "Combles et greniers",
      "Garages et granges",
      "Sous les toitures, derrière les chevrons",
    ],
    urgency: {
      level: 2,
      reason:
        "Elle ne prolifère pas comme un rongeur, mais les dégâts d'isolation et les nuisances sonores s'aggravent tant qu'elle occupe les lieux.",
    },
    mistakes: [
      "Boucher l'accès quand l'animal (ou ses petits) est encore à l'intérieur",
      "Utiliser du poison : la fouine est soumise à une réglementation stricte",
    ],
    firstAction:
      "Repérez le passage d'entrée (traces sur la gouttière, tuiles déplacées) sans le fermer.",
    prevention:
      "Élaguer les accès (branches, treilles) et grillager les ouvertures après départ confirmé.",
    whenToCall:
      "Dès que le bruit se répète : la solution passe par une exclusion propre et légale, pas par un piégeage improvisé.",
    whatsappMessage:
      "Bonjour, je pense avoir une fouine dans mes combles. Je vous envoie des photos des traces.",
  },

  // ------------------------------------------------------ Insectes rampants
  {
    id: "punaises",
    name: "Punaises de lit",
    category: "rampants",
    model: { file: "/punaise_lit_3D.glb", tuning: { scale: 1.3 } },
    photo: "/punaise.jpg",
    serviceId: "desinsectisation",
    description:
      "La punaise de lit se nourrit la nuit et colonise la literie puis toute la pièce ; c'est l'infestation qui progresse le plus vite en logement.",
    signs: [
      "Piqûres groupées ou alignées, souvent bras et jambes",
      "Petites taches noires sur matelas et sommier",
      "Traces de sang sur les draps",
      "Punaises visibles dans les coutures du matelas",
    ],
    hidingSpots: [
      "Coutures du matelas et du sommier",
      "Fissures du lit et des plinthes",
      "Prises électriques et cadres",
      "Valises et vêtements après un voyage",
    ],
    urgency: {
      level: 3,
      reason:
        "Chaque nuit d'attente multiplie les piqûres et la propagation vers d'autres pièces — et les punaises survivent des mois sans repas.",
    },
    mistakes: [
      "Jeter le matelas : inutile, et cela propage l'infestation dans l'immeuble",
      "Traiter soi-même avec des aérosols grand public : cela disperse les punaises",
      "Dormir dans une autre chambre : elles suivent",
    ],
    firstAction:
      "Lavez la literie à 60 °C, isolez-la dans des sacs fermés et ne déplacez rien vers d'autres pièces.",
    prevention:
      "Vigilance au retour de voyage (valises, vêtements), housses anti-punaises, prudence avec les meubles d'occasion.",
    whenToCall:
      "Dès les premières piqûres alignées ou traces noires : à ce stade, le traitement reste rapide et localisé.",
    whatsappMessage:
      "Bonjour, je pense avoir des punaises de lit chez moi. Je vous envoie des photos pour identification.",
  },
  {
    id: "cafards",
    name: "Cafards",
    category: "rampants",
    model: { file: "/cafard_3D.glb", tuning: { scale: 1.25, offsetY: 0.08 } },
    photo: "/cafard.jpg",
    serviceId: "desinsectisation",
    description:
      "La blatte prolifère dans les zones chaudes et humides ; visible en journée, c'est souvent le signe d'une colonie déjà dense.",
    signs: [
      "Individus surpris le soir en allumant la cuisine ou la salle de bain",
      "Petits excréments noirs type marc de café dans les placards",
      "Odeur âcre caractéristique",
      "Oothèques (capsules d'œufs) derrière les meubles",
    ],
    hidingSpots: [
      "Derrière le réfrigérateur et les plaques de cuisson",
      "Gaines techniques et arrivées d'eau",
      "Dessous d'évier et joints de placards",
      "Moteurs d'électroménager",
    ],
    urgency: {
      level: 3,
      reason:
        "Une blatte visible en journée trahit souvent une colonie déjà dense — la prolifération est exponentielle et se propage entre logements.",
    },
    mistakes: [
      "Utiliser des bombes insecticides grand public : les blattes se replient dans les gaines et reviennent",
      "Traiter un seul logement dans un immeuble touché",
      "Laisser vaisselle, miettes ou eau accessibles la nuit",
    ],
    firstAction:
      "Le soir, supprimez eau et nourriture accessibles : éviers secs, vaisselle faite, aliments en boîtes fermées.",
    prevention:
      "Étanchéité des passages de gaines, nettoyage régulier des zones grasses.",
    whenToCall:
      "Dès la première observation répétée : chaque semaine de retard multiplie la colonie.",
    whatsappMessage:
      "Bonjour, je pense avoir des cafards chez moi. Je vous envoie des photos pour identification.",
  },
  {
    id: "fourmis",
    name: "Fourmis",
    category: "rampants",
    model: { file: "/fourmis_3D.glb", tuning: { scale: 1.3, offsetY: 0.06 } },
    photo: "/fourmis.jpg",
    serviceId: "desinsectisation",
    description:
      "Les fourmis s'invitent en colonnes dès qu'une source de nourriture est repérée ; certaines espèces s'installent dans la maçonnerie.",
    signs: [
      "Files régulières le long des plinthes ou plans de travail",
      "Petits tas de sciure ou de terre (fourmis charpentières)",
      "Fourmis ailées en essaimage l'été",
    ],
    hidingSpots: [
      "Sous les plinthes et carrelages",
      "Dans la maçonnerie et les joints",
      "Autour des points d'eau et du garde-manger",
    ],
    urgency: {
      level: 1,
      reason:
        "Rarement dangereuses, mais une colonie installée dans les murs devient persistante et revient chaque saison.",
    },
    mistakes: [
      "Écraser la file : la piste odorante reste et se reforme",
      "Pulvériser uniquement le trajet — la fourmilière n'est pas atteinte",
    ],
    firstAction:
      "Nettoyez les pistes à l'eau savonneuse ou vinaigrée et fermez les aliments sucrés.",
    prevention:
      "Joints étanches, aliments fermés, pas d'eau stagnante à proximité.",
    whenToCall:
      "Si les files reviennent malgré le nettoyage, ou en cas de sciure suspecte (fourmis charpentières).",
    whatsappMessage:
      "Bonjour, j'ai une invasion de fourmis. Je vous envoie des photos de leur passage.",
  },
  {
    id: "termites",
    name: "Termites",
    category: "rampants",
    model: { file: "/termites_3D.glb", tuning: { scale: 1.2, offsetY: 0.07 } },
    photo: "/Termite.jpg",
    serviceId: "prevention",
    description:
      "Les termites dévorent le bois de l'intérieur, sans bruit et sans signe extérieur pendant des années.",
    signs: [
      "Bois qui sonne creux",
      "Galeries-tunnels de terre le long des murs",
      "Ailes abandonnées près des fenêtres",
      "Portes ou fenêtres qui coincent (bois déformé)",
    ],
    hidingSpots: [
      "Bois en contact avec le sol (plinthes, huisseries)",
      "Charpentes et planchers",
      "Caves et vides sanitaires humides",
    ],
    urgency: {
      level: 3,
      reason:
        "Ils travaillent cachés pendant des années : quand les dégâts deviennent visibles, la structure est déjà atteinte.",
    },
    mistakes: [
      "Reboucher ou repeindre le bois attaqué",
      "Retirer soi-même le bois infesté et le déplacer (risque de propagation)",
    ],
    firstAction:
      "Ne touchez à rien : photographiez les indices et faites diagnostiquer rapidement.",
    prevention:
      "Éviter le bois stocké contre la maison, surveiller l'humidité des caves, traiter les bois neufs.",
    whenToCall:
      "Au moindre doute : le diagnostic précoce est la seule protection réelle de la structure.",
    whatsappMessage:
      "Bonjour, je suspecte des termites (bois abîmé). Je vous envoie des photos des dégâts.",
  },

  // ------------------------------------------------------- Insectes volants
  {
    id: "guepes",
    name: "Guêpes",
    category: "volants",
    model: { file: "/guepe_3D.glb", tuning: { scale: 1.25, offsetY: 0.06 } },
    photo: "/Guepe.jpg",
    serviceId: "nuisibles-volants",
    description:
      "Les guêpes construisent des nids dès le printemps ; près des passages, ils deviennent dangereux en fin d'été.",
    signs: [
      "Va-et-vient d'insectes vers un même point (toit, volet, muret)",
      "Nid de papier gris visible sous un abri",
      "Guêpes insistantes en terrasse dès l'été",
    ],
    hidingSpots: [
      "Sous les tuiles et dans les combles",
      "Coffres de volets roulants",
      "Cabanes, murets creux et sols (guêpes fouisseuses)",
    ],
    urgency: {
      level: 2,
      reason:
        "Un nid actif près d'un passage devient dangereux à mesure que la colonie grossit — l'agressivité culmine en fin d'été.",
    },
    mistakes: [
      "Boucher l'entrée du nid : les guêpes creusent une autre sortie, parfois vers l'intérieur",
      "Pulvériser soi-même sans protection ni recul",
      "Éclairer le nid de nuit à la lampe directe",
    ],
    firstAction:
      "Éloignez enfants et animaux, repérez l'entrée du nid à distance et laissez-la dégagée.",
    prevention:
      "Vérification des coffres de volets et combles au printemps, moustiquaires sur les aérations.",
    whenToCall:
      "Dès qu'un nid est actif près d'une zone de vie — la destruction s'effectue avec un équipement adapté.",
    whatsappMessage:
      "Bonjour, j'ai un nid de guêpes chez moi. Je vous envoie des photos de l'emplacement.",
  },
  {
    id: "frelons",
    name: "Frelons",
    category: "volants",
    model: { file: "/hornet_3D.glb", tuning: { scale: 1.2 } },
    photo: "/frelon.jpg",
    serviceId: "nuisibles-volants",
    description:
      "Frelon européen ou asiatique : la colonie grossit chaque semaine et défend son nid en groupe.",
    signs: [
      "Va-et-vient d'insectes de grande taille vers un point fixe",
      "Nid sphérique visible (arbre, toiture, abri)",
      "Bourdonnement audible près des combles",
    ],
    hidingSpots: [
      "Arbres et haies hautes",
      "Combles, granges et abris",
      "Sous les avancées de toit",
    ],
    urgency: {
      level: 3,
      reason:
        "Le frelon asiatique défend son nid en groupe à plusieurs mètres : les piqûres multiples sont dangereuses, et le nid grossit chaque semaine.",
    },
    mistakes: [
      "Approcher ou faire vibrer le support (taille-haie, échelle)",
      "Tenter de détruire le nid soi-même, au jet d'eau ou au feu",
    ],
    firstAction:
      "Balisez la zone à 5 mètres, gardez les fenêtres fermées côté nid et appelez sans attendre.",
    prevention:
      "Repérage précoce au printemps : les nids primaires ont la taille d'une orange et sont bien plus simples à neutraliser.",
    whenToCall:
      "Immédiatement : un nid de frelons ne se traite jamais soi-même, quelle que soit sa taille.",
    whatsappMessage:
      "Bonjour, je pense avoir un nid de frelons. Je vous envoie des photos prises à distance.",
  },
  {
    id: "abeilles",
    name: "Abeilles",
    category: "volants",
    model: { file: "/bee_3D.glb", tuning: { scale: 1.2, offsetY: 0.06 } },
    serviceId: "nuisibles-volants",
    description:
      "Les abeilles sont protégées et précieuses : quand c'est possible, l'essaim est récupéré vivant avec un apiculteur plutôt que détruit.",
    signs: [
      "Essaim en grappe sur une branche, un volet ou une cheminée",
      "Va-et-vient régulier vers une cavité (mur, coffre de volet)",
      "Bourdonnement continu dans une cloison",
    ],
    hidingSpots: [
      "Cheminées et coffres de volets roulants",
      "Cavités de murs et faux plafonds",
      "Arbres creux du jardin",
    ],
    urgency: {
      level: 2,
      reason:
        "Un essaim posé repart souvent de lui-même sous 48 h, mais un essaim entré dans un mur ou une cheminée s'installe définitivement si on attend.",
    },
    mistakes: [
      "Pulvériser un insecticide sur des abeilles (espèce protégée)",
      "Boucher l'accès avec la colonie à l'intérieur : le miel attire ensuite d'autres nuisibles",
    ],
    firstAction:
      "Fermez les fenêtres proches, éloignez-vous calmement et photographiez l'essaim de loin.",
    prevention: "Grillager cheminées et aérations au printemps.",
    whenToCall:
      "Dès que l'essaim vise une cavité de la maison — la récupération est simple au début, complexe une fois installé.",
    whatsappMessage:
      "Bonjour, un essaim d'abeilles s'est installé chez moi. Je vous envoie des photos pour organiser une prise en charge.",
  },
  {
    id: "moustiques",
    name: "Moustiques",
    category: "volants",
    model: { file: "/mosquito_3D.glb", tuning: { scale: 1.2 } },
    serviceId: "desinsectisation",
    description:
      "Les moustiques (dont le moustique tigre) se reproduisent dans les moindres eaux stagnantes autour de l'habitation.",
    signs: [
      "Piqûres répétées, surtout en journée pour le moustique tigre",
      "Larves visibles dans les coupelles et récupérateurs d'eau",
      "Présence persistante malgré les répulsifs",
    ],
    hidingSpots: [
      "Coupelles, gouttières bouchées, récupérateurs d'eau",
      "Regards et évacuations",
      "Végétation dense et ombragée",
    ],
    urgency: {
      level: 1,
      reason:
        "Nuisance saisonnière avant tout — mais sans traitement des gîtes larvaires, la population se renouvelle en continu.",
    },
    mistakes: [
      "Traiter uniquement les adultes en pulvérisant le jardin",
      "Oublier les petites rétentions d'eau (jouets, soucoupes, bâches)",
    ],
    firstAction:
      "Videz toutes les eaux stagnantes, même minimes, et curez les gouttières.",
    prevention: "Aucune eau stagnante, moustiquaires aux ouvertures.",
    whenToCall:
      "Quand la nuisance persiste malgré la suppression des gîtes : un traitement ciblé des zones de repos s'impose.",
    whatsappMessage:
      "Bonjour, je suis envahi de moustiques malgré mes précautions. Je souhaite un traitement adapté.",
  },
  {
    id: "mites",
    name: "Mites alimentaires",
    category: "volants",
    model: { file: "/mites_3D.glb", tuning: { scale: 1.2, offsetY: 0.05 } },
    photo: "/mite.jpg",
    serviceId: "desinfection",
    description:
      "Petits papillons des placards, les mites alimentaires pondent dans les denrées sèches (farine, céréales, fruits secs).",
    signs: [
      "Petits papillons gris ou beiges qui s'envolent des placards",
      "Fils soyeux et grumeaux dans la farine ou les céréales",
      "Larves claires sur les parois et couvercles",
    ],
    hidingSpots: [
      "Paquets de farine, céréales, riz et fruits secs",
      "Recoins et charnières des placards",
      "Croquettes des animaux",
    ],
    urgency: {
      level: 1,
      reason:
        "Sans danger direct, mais la ponte contamine les denrées de proche en proche tant que le foyer n'est pas éliminé.",
    },
    mistakes: [
      "Ne jeter que le paquet visiblement touché — les œufs sont souvent déjà ailleurs",
      "Pulvériser un insecticide dans un placard alimentaire",
    ],
    firstAction:
      "Jetez les denrées ouvertes suspectes, aspirez les angles du placard et lavez les étagères au vinaigre.",
    prevention: "Bocaux hermétiques et contrôle des paquets à l'achat.",
    whenToCall:
      "Si les papillons reviennent après un grand nettoyage : un foyer caché persiste.",
    whatsappMessage:
      "Bonjour, j'ai des mites alimentaires dans mes placards. Je vous envoie des photos.",
  },

  // ------------------------------------------------------ Jardin & extérieur
  {
    id: "chenilles",
    name: "Chenilles processionnaires",
    category: "jardin",
    model: { file: "/chenille_3D.glb", tuning: { scale: 1.15, offsetY: 0.08 } },
    photo: "/chenille.jpg",
    serviceId: "desinsectisation",
    description:
      "Les chenilles processionnaires (pin, chêne) projettent des poils urticants dangereux pour les personnes et mortels pour les animaux.",
    signs: [
      "Nids de soie blancs dans les pins ou les chênes",
      "Files de chenilles en procession au sol (fin d'hiver, printemps)",
      "Réactions cutanées inexpliquées après un passage au jardin",
    ],
    hidingSpots: [
      "Extrémités des branches de pins (nids d'hiver)",
      "Troncs et sol lors des descentes en procession",
      "Sol : enfouies pour la nymphose",
    ],
    urgency: {
      level: 3,
      reason:
        "Les poils urticants provoquent de graves réactions (peau, yeux, voies respiratoires) et peuvent être mortels pour un chien qui les lèche.",
    },
    mistakes: [
      "Toucher, balayer ou arroser une procession ou un nid — même vide, il reste urticant",
      "Brûler un nid en place : les poils se dispersent dans l'air",
    ],
    firstAction:
      "Interdisez la zone aux enfants et aux animaux et ne manipulez rien.",
    prevention:
      "Échenillage préventif en hiver, pièges à phéromones et éco-pièges autour des troncs.",
    whenToCall:
      "Dès qu'un nid ou une procession est repéré : l'enlèvement exige un équipement de protection complet.",
    whatsappMessage:
      "Bonjour, j'ai repéré des chenilles processionnaires (nid ou procession). Je vous envoie des photos prises à distance.",
  },
  {
    id: "serpents",
    name: "Serpents",
    category: "jardin",
    model: { file: "/serpent_3D.glb", tuning: { scale: 1.4 } },
    serviceId: "prevention",
    description:
      "La plupart des serpents rencontrés en France sont inoffensifs et protégés — mais leur présence près d'une habitation impose une prise en charge prudente.",
    signs: [
      "Observation directe au jardin, sur la terrasse ou dans le garage",
      "Mues (peaux) retrouvées près des murets ou tas de bois",
      "Disparition anormale d'œufs au poulailler",
    ],
    hidingSpots: [
      "Tas de bois, pierriers et composts",
      "Hautes herbes et bordures ensoleillées",
      "Garages et vides sanitaires frais",
    ],
    urgency: {
      level: 2,
      reason:
        "Sans danger dans la plupart des cas, mais l'identification (couleuvre ou vipère) doit être faite par un professionnel, surtout avec enfants ou animaux.",
    },
    mistakes: [
      "Tenter de le capturer ou de le tuer : espèces protégées, et c'est le principal contexte de morsure",
      "Le manipuler avec un balai ou un outil",
    ],
    firstAction:
      "Gardez vos distances, éloignez enfants et animaux, et si possible gardez-le à vue en attendant.",
    prevention:
      "Herbe rase, tas de bois surélevés, pas d'abris au sol contre les murs.",
    whenToCall:
      "Dès l'observation près de la maison : la capture et le relâcher se font dans un cadre légal précis.",
    whatsappMessage:
      "Bonjour, un serpent est présent chez moi. Je vous envoie une photo prise à distance.",
  },
  {
    id: "pigeons",
    name: "Pigeons",
    category: "jardin",
    model: { file: "/pigeon_3D.glb", tuning: { scale: 1.1, offsetY: 0.06 } },
    photo: "/pigeon.jpg",
    serviceId: "nuisibles-volants",
    description:
      "Les pigeons installés sur un bâtiment dégradent les surfaces avec leurs fientes et reviennent tant que les points de nidification restent accessibles.",
    signs: [
      "Fientes accumulées sur rebords, balcons et corniches",
      "Roucoulements et allers-retours permanents",
      "Nids et plumes derrière les panneaux ou climatiseurs",
    ],
    hidingSpots: [
      "Corniches, rebords et chéneaux",
      "Combles ouverts",
      "Derrière les enseignes et panneaux solaires",
    ],
    urgency: {
      level: 1,
      reason:
        "Le problème s'aggrave par accumulation : les fientes sont corrosives et porteuses d'agents pathogènes, mais l'urgence est rarement immédiate.",
    },
    mistakes: [
      "Nourrir les oiseaux ou laisser des déchets accessibles",
      "Nettoyer des fientes sèches sans masque (poussières contaminantes)",
    ],
    firstAction:
      "Supprimez toute source de nourriture et notez les zones où ils se posent le plus.",
    prevention:
      "Pics, filets et câbles tendus posés proprement sur les zones d'appui.",
    whenToCall:
      "Dès que la nidification commence : plus la colonie est fidèle au site, plus l'éloignement est long.",
    whatsappMessage:
      "Bonjour, des pigeons se sont installés sur mon bâtiment. Je vous envoie des photos.",
  },
  {
    id: "fouisseurs",
    name: "Animaux fouisseurs",
    category: "jardin",
    model: { file: "/blaireau_3D.glb", tuning: { offsetY: 0.04 } },
    serviceId: "prevention",
    description:
      "Taupes, blaireaux, lapins… les fouisseurs retournent pelouses et potagers, et certaines espèces sont strictement protégées.",
    signs: [
      "Monticules de terre (taupinières) alignés",
      "Galeries affaissées sous la pelouse",
      "Entrées de terrier béantes en bordure de terrain",
    ],
    hidingSpots: [
      "Pelouses et potagers",
      "Talus et bordures de haies",
      "Sous les abris de jardin et terrasses",
    ],
    urgency: {
      level: 1,
      reason:
        "Les dégâts sont matériels et progressifs — mais un terrier de blaireau actif ne peut être traité que dans un cadre réglementaire.",
    },
    mistakes: [
      "Combler les galeries sans gérer l'animal : il recreuse à côté",
      "Piéger ou gazer un blaireau : espèce protégée, sanctions lourdes",
    ],
    firstAction:
      "Photographiez les monticules et entrées de terrier pour permettre l'identification de l'espèce.",
    prevention:
      "Grillage enterré autour des zones sensibles (potager, poulailler).",
    whenToCall:
      "Quand les dégâts s'étendent ou qu'un terrier s'installe près des fondations.",
    whatsappMessage:
      "Bonjour, un animal creuse dans mon terrain. Je vous envoie des photos des dégâts.",
  },

  // --------------------------------------------------------- Humidité & autres
  {
    id: "champignons",
    name: "Champignons & moisissures",
    category: "autres",
    model: { file: "/champignon_3D.glb", tuning: { offsetY: 0.06 } },
    serviceId: "desinfection",
    description:
      "Mérule et moisissures s'étendent tant que l'humidité persiste, en dégradant bois et maçonnerie.",
    signs: [
      "Odeur de moisi persistante dans une pièce",
      "Auréoles, taches noires ou filaments blancs ouateux",
      "Bois qui gondole, s'effrite ou sonne creux",
    ],
    hidingSpots: [
      "Caves et pièces peu ventilées",
      "Derrière les plinthes, meubles et doublages",
      "Sous les planchers et dans les murs humides",
    ],
    urgency: {
      level: 2,
      reason:
        "Une mérule installée progresse dans les murs tant que l'humidité persiste — plus l'attente est longue, plus la reprise des matériaux est lourde.",
    },
    mistakes: [
      "Repeindre ou recouvrir la zone sans traiter la cause d'humidité",
      "Arracher les fructifications sans traiter le support (dispersion des spores)",
    ],
    firstAction:
      "Aérez, réduisez la source d'humidité si vous l'identifiez, et photographiez l'étendue avant tout nettoyage.",
    prevention:
      "Ventilation efficace, traitement des fuites et des remontées capillaires.",
    whenToCall:
      "Dès l'apparition de filaments blancs ou d'un bois qui s'effrite : le diagnostic mérule est urgent.",
    whatsappMessage:
      "Bonjour, je pense avoir de la mérule ou des moisissures. Je vous envoie des photos.",
  },
];

export const PEST_BY_ID: Record<string, PestGuideEntry> = Object.fromEntries(
  PEST_GUIDE.map((pest) => [pest.id, pest])
);

export function pestsInCategory(category: PestCategoryId): PestGuideEntry[] {
  return PEST_GUIDE.filter((pest) => pest.category === category);
}
