import { Hero } from "@/components/sections/Hero";
import { MarqueeBand } from "@/components/sections/MarqueeBand";
import { Nuisibles } from "@/components/sections/Nuisibles";
import { EtapesAppel } from "@/components/sections/EtapesAppel";
import { Garantie } from "@/components/sections/Garantie";
import { EquipementProfessionnel } from "@/components/sections/EquipementProfessionnel";
import { Avis } from "@/components/sections/Avis";
import { Disponibilite } from "@/components/sections/Disponibilite";
import { Atouts } from "@/components/sections/Atouts";
import { Urgence } from "@/components/sections/Urgence";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";
import { WaveDivider } from "@/components/ui/WaveDivider";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";

// Ordre narratif pensé pour un visiteur stressé :
// problème traité (Nuisibles) → méthode & contrôle (EtapesAppel, Garantie) →
// preuves (Equipement, Avis) → freins pratiques (Disponibilite + zones) →
// différenciation (Atouts) → closing (Urgence) → objections/SEO (FAQ) → Contact.
export default function Home() {
  return (
    <>
      <Hero />
      <MarqueeBand />
      <Nuisibles />
      <EtapesAppel />
      <Garantie />
      <EquipementProfessionnel />
      <Avis />
      <Disponibilite />
      <Atouts />
      <WaveDivider fromColor="var(--color-background)" toColor="var(--color-accent)" />
      <Urgence />
      <WaveDivider fromColor="var(--color-accent)" toColor="var(--color-background)" flip />
      <FAQ />
      <FaqJsonLd />
      <Contact />
    </>
  );
}
