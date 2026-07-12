import { CalendarCheck, MessageSquareText, SearchCheck, type LucideIcon } from "lucide-react";

export type InterventionStep = {
  icon: LucideIcon;
  title: string;
  description: string;
};

// Les 3 étapes de l'appel — source unique partagée entre la section homepage
// EtapesAppel (version chorégraphiée, avec technicien de garde éventuel) et
// les pages services (version compacte). Ne jamais dupliquer ces textes.
export const INTERVENTION_STEPS: InterventionStep[] = [
  {
    icon: MessageSquareText,
    title: "Vous décrivez ce que vous avez vu",
    description:
      "Bruits, traces, piqûres… expliquez simplement, avec vos mots. 30 secondes suffisent.",
  },
  {
    icon: SearchCheck,
    title: "Un technicien identifie le nuisible",
    description: "Il vous dit de quoi il s'agit, si c'est urgent, et comment nous le traitons.",
  },
  {
    icon: CalendarCheck,
    title: "Vous obtenez un prix et un créneau",
    description: "Le prix est annoncé avant intervention. Aucun supplément sans votre accord.",
  },
];
