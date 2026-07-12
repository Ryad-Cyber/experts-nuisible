import {
  AppWindow,
  Armchair,
  BedDouble,
  Bug,
  Building2,
  Car,
  CircleDot,
  CookingPot,
  DoorOpen,
  Fence,
  Flame,
  Home,
  MapPin,
  PanelTop,
  Rat,
  Sofa,
  Sprout,
  Tent,
  Trash2,
  TreePine,
  Trees,
  Warehouse,
  Waves,
  type LucideIcon,
} from "lucide-react";
import type { NuisibleZoneOption } from "./nuisibleZoneOptions";

export type SelectableZone = {
  id: string;
  label: string;
  description: string;
  option: NuisibleZoneOption;
  icon: LucideIcon;
  // `primary` zones are surfaced in the non-WebGL fallback grid.
  primary?: boolean;
};

// Every clickable part of the 3D villa resolves to one of these zones (or the generic
// "autre" fallback), so the visitor can point out exactly where they spotted the pest.
export const HOUSE_ZONES: SelectableZone[] = [
  {
    id: "toiture",
    label: "Toiture",
    description:
      "La toiture est exposée aux infiltrations et sert de point d'accès aux oiseaux, rongeurs et insectes. Une inspection permet d'identifier rapidement le problème.",
    option: "Toiture",
    icon: Home,
    primary: true,
  },
  {
    id: "cheminee",
    label: "Cheminée",
    description:
      "Les cheminées sont des points d'entrée fréquents pour certains nuisibles, notamment les oiseaux, rongeurs ou insectes. Une inspection identifie rapidement la source.",
    option: "Toiture",
    icon: Flame,
    primary: true,
  },
  {
    id: "combles",
    label: "Grenier / combles",
    description:
      "Le grenier, juste sous la toiture, offre un espace chaud, isolé et tranquille — le refuge préféré des rongeurs, fouines et insectes xylophages. Les bruits nocturnes viennent presque toujours d'ici.",
    option: "Combles / vide-grenier",
    icon: Warehouse,
    primary: true,
  },
  {
    id: "chambres",
    label: "Chambres / étage",
    description:
      "Les chambres sont particulièrement concernées par les punaises de lit et certains insectes rampants : literie, plinthes et cloisons sont inspectées en priorité.",
    option: "Chambre / pièces intérieures",
    icon: BedDouble,
    primary: true,
  },
  {
    id: "cuisine",
    label: "Cuisine",
    description:
      "Chaleur, eau et nourriture : la cuisine est la zone n°1 des cafards, fourmis, mites alimentaires et souris. Derrière l'électroménager et sous l'évier, une inspection révèle vite l'ampleur du problème.",
    option: "Cuisine",
    icon: CookingPot,
    primary: true,
  },
  {
    id: "sejour",
    label: "Salon / séjour",
    description:
      "Canapés, plinthes et parquet du séjour abritent punaises de lit, puces et insectes rampants. Les pièces de vie sont inspectées avec la literie lorsque des piqûres apparaissent.",
    option: "Chambre / pièces intérieures",
    icon: Sofa,
  },
  {
    id: "fenetres",
    label: "Fenêtres",
    description:
      "Les joints de fenêtres mal isolés sont des points d'accès classiques pour certains insectes et petits nuisibles.",
    option: "Fenêtre",
    icon: AppWindow,
    primary: true,
  },
  {
    id: "balcon",
    label: "Balcon de l'étage",
    description:
      "Les balcons en hauteur sont un point d'observation et de nidification fréquent pour les pigeons et autres oiseaux ; les fientes accumulées imposent un nettoyage sanitaire.",
    option: "Terrasse / balcon",
    icon: PanelTop,
    primary: true,
  },
  {
    id: "terrasse",
    label: "Terrasse",
    description:
      "Repas en extérieur, miettes, mobilier et lames de bois : la terrasse attire guêpes, frelons, fourmis et pigeons. Les nids s'installent volontiers sous les lames et les assises.",
    option: "Terrasse / balcon",
    icon: Armchair,
    primary: true,
  },
  {
    id: "porte",
    label: "Porte d'entrée",
    description:
      "Le seuil et l'encadrement de la porte d'entrée sont des points de passage à contrôler régulièrement contre les intrusions.",
    option: "Porte",
    icon: DoorOpen,
    primary: true,
  },
  {
    id: "cloture",
    label: "Clôture / portail",
    description:
      "Le pourtour de la clôture et le portail sont examinés pour détecter les points d'intrusion des nuisibles terrestres.",
    option: "Clôture",
    icon: Fence,
    primary: true,
  },
  {
    id: "arbre",
    label: "Arbre",
    description:
      "Les arbres abritent guêpes, frelons et insectes, et facilitent le passage des nuisibles vers la façade et la toiture.",
    option: "Arbre",
    icon: TreePine,
    primary: true,
  },
  {
    id: "jardin",
    label: "Jardin",
    description:
      "Le jardin peut abriter nids, rongeurs et parasites extérieurs. Un diagnostic permet de localiser précisément le foyer.",
    option: "Jardin",
    icon: Trees,
    primary: true,
  },
  {
    id: "potager",
    label: "Potager",
    description:
      "Légumes, terre meuble et arrosage : le potager attire mulots, rats, limaces et insectes ravageurs. Nous traitons avec des méthodes compatibles avec vos cultures.",
    option: "Potager",
    icon: Sprout,
    primary: true,
  },
  {
    id: "garage",
    label: "Garage",
    description:
      "Le garage, souvent sombre et peu fréquenté, attire rongeurs et insectes en quête d'un abri tranquille.",
    option: "Garage",
    icon: Car,
    primary: true,
  },
  {
    id: "piscine",
    label: "Piscine",
    description:
      "Les zones humides autour de la piscine favorisent la présence de moustiques et d'insectes d'eau.",
    option: "Jardin",
    icon: Waves,
  },
  {
    id: "poubelles",
    label: "Local poubelles",
    description:
      "Les déchets alimentaires sont le premier point d'attraction des rats et des cafards. Un local poubelles visité régulièrement par les nuisibles trahit une colonie proche.",
    option: "Jardin",
    icon: Trash2,
  },
  {
    id: "rat",
    label: "Un rat rôde ici !",
    description:
      "Bien vu — un rat s'est installé près des poubelles. C'est exactement le signe qu'il ne faut pas ignorer : un rat visible en journée indique presque toujours une colonie déjà établie à proximité.",
    option: "Jardin",
    icon: Rat,
  },
  {
    id: "nid-guepes",
    label: "Nid de guêpes",
    description:
      "Vous avez repéré un nid actif. Ne vous en approchez pas et ne tentez rien vous-même : la destruction s'effectue avec un équipement de protection adapté, souvent en fin de journée.",
    option: "Autre",
    icon: Bug,
  },
  {
    id: "egouts",
    label: "Regard / égouts",
    description:
      "Les regards et canalisations sont des points de passage classiques pour les rongeurs qui remontent vers l'habitation.",
    option: "Égouts",
    icon: CircleDot,
  },
  {
    id: "facade",
    label: "Façade / rez-de-chaussée",
    description:
      "Les murs et façades présentent parfois des fissures par lesquelles s'infiltrent insectes et petits rongeurs.",
    option: "Autre",
    icon: Building2,
  },
  {
    id: "abri",
    label: "Abri de jardin",
    description:
      "Les abris de jardin attirent souvent rongeurs et insectes en quête d'un refuge à l'écart de l'habitation.",
    option: "Jardin",
    icon: Tent,
  },
  {
    id: "autre",
    label: "Cette zone",
    description:
      "Cet emplacement peut lui aussi être concerné. Décrivez-nous la situation et nous vous proposons un diagnostic précis.",
    option: "Autre",
    icon: MapPin,
  },
];

export const HOUSE_ZONE_BY_ID: Record<string, SelectableZone> = Object.fromEntries(
  HOUSE_ZONES.map((zone) => [zone.id, zone])
);

export const PRIMARY_HOUSE_ZONES = HOUSE_ZONES.filter((zone) => zone.primary);

// Resolves any glTF mesh name from the villa (Villa_finale.glb) to a zone id via keyword
// matching, so that *every* element of the model is selectable — not just preset hotspots.
// Order matters: more specific rules come first (e.g. "TablePiscine" must resolve to the
// pool before the generic terrace furniture rule sees "Table").
export function classifyMeshToZone(name: string): string {
  const has = (needle: string) => name.includes(needle);

  // Storytelling placés par le modeleur : un rat près des poubelles, deux nids de guêpes.
  if (name.startsWith("Rat_")) return "rat";
  if (has("Nid_guepes")) return "nid-guepes";
  if (has("Poubelle") || has("poubelle")) return "poubelles";

  if (has("Cheminee")) return "cheminee";
  if (has("Cloture") || has("cloture") || has("Portail") || has("portail")) return "cloture";
  if (has("Garage")) return "garage";
  if (has("Cabane_fenetre") || has("Fenetre") || has("Baie") || has("imposte") || has("Rebord")) {
    return "fenetres";
  }
  if (has("Cabane")) return "abri";
  if (
    has("Bassin") ||
    name === "Eau" ||
    has("Eau_surface") ||
    has("Profondeur") ||
    has("Margelles") ||
    has("Piscine") ||
    has("LED_piscine") ||
    has("Parasol")
  ) {
    return "piscine";
  }
  if (has("Potager") || has("Epouvantail")) return "potager";
  if (has("Arbre")) return "arbre";
  if (has("Toit") || has("Pignon") || has("Gouttiere") || has("Descente_eau") || has("LED_debord")) {
    return "toiture";
  }
  // Grenier / combles = the real attic volume (zinc band + ventilation grilles) plus the
  // under-roof claire-voie and fascia band.
  if (has("Grenier") || has("Claire_voie") || has("Bandeau")) return "combles";
  // Intérieur RDC : séjour (salon, escalier, parquet et cloisons du rez-de-chaussée) —
  // must run before the generic RDC/facade rule which owns the exterior walls.
  if (has("Cuisine")) return "cuisine";
  if (has("Salon") || name === "Escalier" || name === "RDC_sol" || name === "RDC_cloisons") {
    return "sejour";
  }
  // Étage : volumes, sols, cloisons et lits des chambres.
  if (name.startsWith("Etage") || has("Brique") || has("Lit")) return "chambres";
  if (has("Balcon") || has("Garde_corps")) return "balcon";
  // Grande terrasse au sol + son mobilier (canapé, table, transats). "terrasse" en
  // minuscules couvre Marches_terrasse et LED_sous_terrasse.
  if (has("Terrasse") || has("terrasse") || has("Canape") || has("Table") || has("Transat")) {
    return "terrasse";
  }
  if (name === "Porte" || name === "Poignee" || has("Entree") || has("Auvent")) return "porte";
  if (has("Regard") || has("Tuyau") || has("egout")) return "egouts";
  if (name.startsWith("RDC") || has("Interieur_suggere") || has("_mur")) return "facade";
  if (
    has("Pelouse") ||
    name === "Terre" ||
    has("Allee") ||
    has("Arbuste") ||
    has("Plante") ||
    has("Jardiniere") ||
    has("Haie") ||
    has("Barbecue") ||
    has("Boite_lettres") ||
    has("Lampadaire") ||
    has("Halo") ||
    has("Spot_arbre") ||
    has("Borne")
  ) {
    return "jardin";
  }
  return "autre";
}

// Zones whose geometry fades away in interior view to reveal the inside of the house.
export const FADES_IN_INTERIOR = new Set<string>(["toiture", "cheminee", "combles", "balcon"]);

// The new villa has real rooms with real ceilings: in interior view the ceilings must fade
// with the roof, otherwise the top-down camera would only ever show ceiling slabs. The
// zone stays "chambres" (clicking a ceiling still means "upstairs rooms") — only the fade
// behaviour is mesh-specific.
export function meshFadesInInterior(meshName: string, zoneId: string): boolean {
  return FADES_IN_INTERIOR.has(zoneId) || meshName.includes("plafond");
}
