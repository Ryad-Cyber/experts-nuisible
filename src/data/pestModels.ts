import type { ModelTuning } from "@/components/three/PestModelViewer";

// Each 3D model stands for a whole FAMILY of pests we treat — never only the displayed
// species. The copy makes that breadth explicit so visitors don't assume a narrow scope.
// `tuning` fine-tunes framing per model on top of the shared bounding-sphere normalization.
export type PestModel = {
  id: string;
  file: string;
  name: string;
  category: string;
  description: string;
  tuning?: ModelTuning;
};

export const PEST_MODELS: PestModel[] = [
  {
    id: "abeilles",
    file: "/bee_3D.glb",
    name: "Abeilles",
    category: "Insectes volants",
    description:
      "Abeilles, guêpes et autres insectes volants similaires. Essaims et nids à proximité de l'habitation.",
    tuning: { scale: 1.2, offsetY: 0.06 },
  },
  {
    id: "frelons",
    file: "/hornet_3D.glb",
    name: "Frelons",
    category: "Insectes volants",
    description:
      "Frelons européens, asiatiques et espèces apparentées. Nids parfois volumineux et dangereux.",
    tuning: { scale: 1.2 },
  },
  {
    id: "moustiques",
    file: "/mosquito_3D.glb",
    name: "Moustiques",
    category: "Insectes volants",
    description:
      "Moustiques et autres petits insectes volants nuisibles, particulièrement en période chaude.",
    tuning: { scale: 1.2 },
  },
  {
    id: "souris",
    file: "/mouse_3D.glb",
    name: "Souris",
    category: "Rongeurs",
    description:
      "Souris et petits rongeurs qui s'installent dans les habitations et les locaux professionnels.",
    tuning: { scale: 1.05, offsetY: 0.05 },
  },
  {
    id: "rats",
    file: "/rat_3D.glb",
    name: "Rats",
    category: "Rongeurs",
    description:
      "Rats et gros rongeurs. Dégâts matériels, contamination et nuisances importantes.",
    tuning: { scale: 1.3, offsetY: 0.12 },
  },
  {
    id: "rongeurs",
    file: "/capybara_3D.glb",
    name: "Autres rongeurs",
    category: "Rongeurs",
    description:
      "Représentation générale de la famille des rongeurs, des plus petits aux plus grands.",
  },
  {
    id: "punaises",
    file: "/punaise_lit_3D.glb",
    name: "Punaises de lit",
    category: "Insectes rampants",
    description:
      "Punaises de lit et infestations dans les matelas, sommiers et mobilier.",
    tuning: { scale: 1.3 },
  },
  {
    id: "champignons",
    file: "/champignon_3D.glb",
    name: "Champignons & moisissures",
    category: "Champignons",
    description:
      "Moisissures, champignons et autres problèmes liés à l'humidité et aux champignons.",
    tuning: { offsetY: 0.06 },
  },
  {
    id: "serpents",
    file: "/serpent_3D.glb",
    name: "Serpents",
    category: "Reptiles",
    description:
      "Serpents et autres reptiles indésirables autour ou à l'intérieur de l'habitation.",
    tuning: { scale: 1.4 },
  },
  {
    id: "fouisseurs",
    file: "/blaireau_3D.glb",
    name: "Animaux fouisseurs",
    category: "Faune & jardin",
    description:
      "Blaireaux et autres animaux fouisseurs causant des dégâts au jardin et aux terrains.",
    tuning: { offsetY: 0.04 },
  },
];
