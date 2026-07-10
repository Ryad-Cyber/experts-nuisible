import { Hero } from "@/components/sections/Hero";
import { MarqueeBand } from "@/components/sections/MarqueeBand";
import { Nuisibles } from "@/components/sections/Nuisibles";
import { Configurateur } from "@/components/sections/Configurateur";
import { Atouts } from "@/components/sections/Atouts";
import { GalerieNuisibles3D } from "@/components/sections/GalerieNuisibles3D";
import { Garantie } from "@/components/sections/Garantie";
import { Disponibilite } from "@/components/sections/Disponibilite";
import { Urgence } from "@/components/sections/Urgence";
import { Avis } from "@/components/sections/Avis";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";
import { ZoneIntervention } from "@/components/sections/ZoneIntervention";
import { WaveDivider } from "@/components/ui/WaveDivider";

export default function Home() {
  return (
    <>
      <Hero />
      <MarqueeBand />
      <Garantie />
      <Nuisibles />
      <Configurateur />
      <Atouts />
      <GalerieNuisibles3D />
      <Disponibilite />
      <WaveDivider fromColor="var(--color-muted)" toColor="var(--color-accent)" />
      <Urgence />
      <WaveDivider fromColor="var(--color-accent)" toColor="var(--color-background)" flip />
      <Avis />
      <FAQ />
      <ZoneIntervention />
      <Contact />
    </>
  );
}
