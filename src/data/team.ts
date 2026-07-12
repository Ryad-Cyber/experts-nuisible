import type { Technician } from "@/types";

// Technicien « de garde » mis en avant sur le site (« Aujourd'hui, c'est X qui décroche »).
// À renseigner UNIQUEMENT avec une identité réelle : prénom exact + photo réelle.
// Tant que la valeur est null, les composants affichent la version générique honnête
// (« Un technicien identifie le nuisible »). Ne jamais inventer d'identité.
//
// Exemple une fois les données réelles disponibles :
// export const onDutyTechnician: Technician | null = {
//   firstName: "Karim",
//   photo: "/portrait_karim.jpeg",
//   certification: "Certibiocide",
// };
export const onDutyTechnician: Technician | null = null;
