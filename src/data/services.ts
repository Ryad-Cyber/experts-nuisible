import { Bird, Bug, Building2, Rat, Shield, SprayCan } from "lucide-react";
import type { Service } from "@/types";

export const services: Service[] = [
  {
    id: "deratisation",
    title: "Dératisation",
    description:
      "Élimination rapide et durable des rongeurs (rats, souris) à votre domicile ou en entreprise.",
    icon: Rat,
  },
  {
    id: "desinsectisation",
    title: "Désinsectisation",
    description:
      "Traitement efficace contre cafards, punaises de lit, guêpes et frelons.",
    icon: Bug,
  },
  {
    id: "desinfection",
    title: "Désinfection",
    description:
      "Désinfection complète des locaux pour éliminer bactéries, virus et odeurs persistantes.",
    icon: SprayCan,
  },
  {
    id: "professionnels",
    title: "Professionnels",
    description:
      "Contrats d'entretien et interventions pour restaurants, commerces et copropriétés.",
    icon: Building2,
  },
  {
    id: "nuisibles-volants",
    title: "Nuisibles volants",
    description:
      "Traitement des nids de guêpes, frelons et pigeons en toute sécurité.",
    icon: Bird,
  },
  {
    id: "prevention",
    title: "Prévention & suivi",
    description:
      "Diagnostic, plan de prévention et suivi régulier pour éviter toute récidive.",
    icon: Shield,
  },
];
