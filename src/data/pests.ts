import type { Pest } from "@/types";

export const pests: Pest[] = [
  { id: "punaise", name: "Punaise de lit", image: "/punaise.jpg", serviceId: "desinsectisation" },
  { id: "frelon", name: "Frelon asiatique", image: "/frelon.jpg", serviceId: "nuisibles-volants" },
  { id: "mouse", name: "Souris", image: "/mouse.jpg", serviceId: "deratisation" },
  { id: "guepe", name: "Guêpe", image: "/Guepe.jpg", serviceId: "nuisibles-volants" },
  { id: "cafard", name: "Cafard", image: "/cafard.jpg", serviceId: "desinsectisation" },
  { id: "termite", name: "Termite", image: "/Termite.jpg", serviceId: "prevention" },
  { id: "fouine", name: "Fouine", image: "/fouine.jpg", serviceId: "deratisation" },
  { id: "pigeon", name: "Pigeon", image: "/pigeon.jpg", serviceId: "nuisibles-volants" },
  { id: "fourmis", name: "Fourmis", image: "/fourmis.jpg", serviceId: "desinsectisation" },
  { id: "mite", name: "Mite alimentaire", image: "/mite.jpg", serviceId: "desinfection" },
  { id: "chenille", name: "Chenille processionnaire", image: "/chenille.jpg", serviceId: "desinsectisation" },
];
