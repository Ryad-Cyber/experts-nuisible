import type { Pest } from "@/types";

// Rail homepage. `guideId` relie chaque carte à sa fiche d'identification
// (src/data/pestGuide.ts) sur /identifier — migration progressive vers cette
// source unique.
export const pests: Pest[] = [
  { id: "punaise", name: "Punaise de lit", image: "/punaise.jpg", serviceId: "desinsectisation", guideId: "punaises" },
  { id: "frelon", name: "Frelon asiatique", image: "/frelon.jpg", serviceId: "nuisibles-volants", guideId: "frelons" },
  { id: "mouse", name: "Souris", image: "/mouse.jpg", serviceId: "deratisation", guideId: "souris" },
  { id: "guepe", name: "Guêpe", image: "/Guepe.jpg", serviceId: "nuisibles-volants", guideId: "guepes" },
  { id: "cafard", name: "Cafard", image: "/cafard.jpg", serviceId: "desinsectisation", guideId: "cafards" },
  { id: "termite", name: "Termite", image: "/Termite.jpg", serviceId: "prevention", guideId: "termites" },
  { id: "fouine", name: "Fouine", image: "/fouine.jpg", serviceId: "deratisation", guideId: "fouines" },
  { id: "pigeon", name: "Pigeon", image: "/pigeon.jpg", serviceId: "nuisibles-volants", guideId: "pigeons" },
  { id: "fourmis", name: "Fourmis", image: "/fourmis.jpg", serviceId: "desinsectisation", guideId: "fourmis" },
  { id: "mite", name: "Mite alimentaire", image: "/mite.jpg", serviceId: "desinfection", guideId: "mites" },
  { id: "chenille", name: "Chenille processionnaire", image: "/chenille.jpg", serviceId: "desinsectisation", guideId: "chenilles" },
];
