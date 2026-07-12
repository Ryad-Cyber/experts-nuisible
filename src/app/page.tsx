import { Hero } from "@/components/sections/Hero";
import { MarqueeBand } from "@/components/sections/MarqueeBand";
import { EtapesAppel } from "@/components/sections/EtapesAppel";
import { Nuisibles } from "@/components/sections/Nuisibles";
import { Atouts } from "@/components/sections/Atouts";
import { Garantie } from "@/components/sections/Garantie";
import { Disponibilite } from "@/components/sections/Disponibilite";
import { Urgence } from "@/components/sections/Urgence";
import { EquipementProfessionnel } from "@/components/sections/EquipementProfessionnel";
import { Avis } from "@/components/sections/Avis";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";
import { ZoneIntervention } from "@/components/sections/ZoneIntervention";
import { WaveDivider } from "@/components/ui/WaveDivider";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";

export default function Home() {
  return (
    <>
      <Hero />
      <MarqueeBand />
      <EtapesAppel />
      <Garantie />
      <Nuisibles />
      <Atouts />
      <Disponibilite />
      <WaveDivider fromColor="var(--color-muted)" toColor="var(--color-accent)" />
      <Urgence />
      <WaveDivider fromColor="var(--color-accent)" toColor="var(--color-background)" flip />
      <EquipementProfessionnel />
      <Avis />
      <FAQ />
      <FaqJsonLd />
      <ZoneIntervention />
      <Contact />
    </>
  );
}
