import type { HouseZone } from "@/types";

export const houseZones: HouseZone[] = [
  { id: "toiture", label: "Toiture", position: [-0.2, 3.55, 1.0], serviceId: "nuisibles-volants" },
  { id: "combles", label: "Combles", position: [-0.2, 3.16, 1.3], serviceId: "deratisation" },
  { id: "cuisine", label: "Cuisine", position: [-0.9, 0.85, 1.75], serviceId: "desinsectisation" },
  { id: "cave", label: "Cave & garage", position: [2.85, 1.45, 1.75], serviceId: "desinfection" },
  { id: "jardin", label: "Jardin", position: [-3.0, -0.55, 3.3], serviceId: "prevention" },
];
