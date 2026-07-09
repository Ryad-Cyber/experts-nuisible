import {
  AppWindow,
  BedDouble,
  Building2,
  Car,
  CircleDot,
  DoorOpen,
  Fence,
  Flame,
  Home,
  MapPin,
  PanelTop,
  Tent,
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
    label: "Combles / vide-grenier",
    description:
      "Situés juste sous la toiture, les combles et le vide-grenier offrent un espace chaud et isolé recherché par les rongeurs et les insectes xylophages qui viennent s'y abriter.",
    option: "Combles / vide-grenier",
    icon: Warehouse,
    primary: true,
  },
  {
    id: "chambres",
    label: "Chambres / pièces intérieures",
    description:
      "Les chambres et pièces de vie sont particulièrement concernées par les punaises de lit, les acariens et certains insectes rampants. Une inspection cible les zones à risque.",
    option: "Chambre / pièces intérieures",
    icon: BedDouble,
    primary: true,
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
    label: "Balcon / terrasse",
    description:
      "Les balcons et terrasses en hauteur sont un point d'observation et de nidification fréquent pour les pigeons et autres oiseaux.",
    option: "Autre",
    icon: PanelTop,
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

// Resolves any glTF mesh name from the villa to a zone id via keyword matching, so that
// *every* element of the model is selectable — not just a handful of preset hotspots.
// Order matters: more specific rules come first.
export function classifyMeshToZone(name: string): string {
  const has = (needle: string) => name.includes(needle);

  if (has("Cheminee")) return "cheminee";
  if (has("Cloture") || has("Portail") || has("Pilier_portail")) return "cloture";
  if (has("Garage")) return "garage";
  if (has("Cabane_fenetre") || has("Fenetre") || has("Baie") || has("imposte")) return "fenetres";
  if (has("Cabane")) return "abri";
  if (
    has("Bassin") ||
    name === "Eau" ||
    has("Eau_surface") ||
    has("Profondeur") ||
    has("Margelles") ||
    has("Piscine") ||
    has("LED_piscine")
  ) {
    return "piscine";
  }
  if (has("Arbre")) return "arbre";
  if (has("Toit") || has("Pignon") || has("Gouttiere") || has("Descente_eau") || has("LED_debord")) {
    return "toiture";
  }
  // Combles / vide-grenier = the volume just *under* the roof (fascia band + under-roof vents),
  // distinct from the upper living floor, which is treated as bedrooms below.
  if (has("Claire_voie") || has("Bandeau")) return "combles";
  if (name.startsWith("Etage") || has("Brique")) return "chambres";
  if (has("Terrasse_toit") || has("Garde_corps") || has("LED_sous_terrasse")) return "balcon";
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
    has("Poubelle") ||
    has("Boite_lettres") ||
    has("Lampadaire") ||
    has("Spot_arbre") ||
    has("Borne") ||
    has("Nid_guepes") ||
    has("Terrasse") ||
    has("Marche_terrasse")
  ) {
    return "jardin";
  }
  return "autre";
}

// Zones whose geometry fades away in interior view to reveal the inside of the house.
export const FADES_IN_INTERIOR = new Set<string>(["toiture", "cheminee", "combles", "balcon"]);
