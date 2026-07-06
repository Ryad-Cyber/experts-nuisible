import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Nuisibles } from "@/components/sections/Nuisibles";
import { Configurateur } from "@/components/sections/Configurateur";
import { Urgence } from "@/components/sections/Urgence";
import { Avis } from "@/components/sections/Avis";
import { Contact } from "@/components/sections/Contact";
import { WaveDivider } from "@/components/ui/WaveDivider";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Nuisibles />
      <Configurateur />
      <WaveDivider fromColor="var(--color-muted)" toColor="var(--color-accent)" />
      <Urgence />
      <WaveDivider fromColor="var(--color-accent)" toColor="var(--color-background)" flip />
      <Avis />
      <Contact />
    </>
  );
}
