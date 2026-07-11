import type { Metadata } from "next";
import { GalerieNuisibles3D } from "@/components/sections/GalerieNuisibles3D";
import { siteConfig } from "@/config/site";

const title = `Galerie 3D des nuisibles — ${siteConfig.name}`;
const description =
  "Explorez en 3D les principaux nuisibles traités par Experts Nuisible : rongeurs, insectes, reptiles et plus encore.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: `${siteConfig.url}/galerie-3d`,
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: `${siteConfig.url}/galerie-3d`,
    siteName: siteConfig.name,
    title,
    description,
  },
};

export default function Galerie3DPage() {
  return <GalerieNuisibles3D />;
}
