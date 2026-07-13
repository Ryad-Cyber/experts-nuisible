import type { Metadata } from "next";
import { LegalPageLayout, LegalSection } from "@/components/ui/LegalPageLayout";
import { legalConfig } from "@/config/legal";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Mentions légales — Experts Nuisible",
  description:
    "Mentions légales du site Experts Nuisible : éditeur, hébergeur, propriété intellectuelle et conditions d'utilisation.",
  // Canonical explicite : sans cela, la page hérite du canonical racine défini
  // dans layout.tsx et se déclarerait comme un doublon de la page d'accueil.
  alternates: { canonical: "/mentions-legales" },
};

export default function MentionsLegalesPage() {
  return (
    <LegalPageLayout
      title="Mentions légales"
      intro="Conformément à la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique (LCEN), voici les informations légales relatives à ce site."
    >
      <LegalSection title="1. Éditeur du site">
        <p>
          Le site {siteConfig.url} est édité sous le nom commercial{" "}
          <strong className="font-medium text-foreground/90">{legalConfig.tradeName}</strong>,
          service de techniciens mobiles intervenant en {legalConfig.serviceArea}.
          {legalConfig.companyName && (
            <>
              {" "}
              Raison sociale : {legalConfig.companyName}
              {legalConfig.legalForm ? ` (${legalConfig.legalForm})` : ""}
              {legalConfig.siret ? `, SIRET ${legalConfig.siret}` : ""}.
            </>
          )}
        </p>
        {legalConfig.address && <p>Siège social : {legalConfig.address}.</p>}
        <p>
          Téléphone : {siteConfig.phone.display} — E-mail : {siteConfig.email}
        </p>
        {legalConfig.publicationDirector && (
          <p>Directeur de la publication : {legalConfig.publicationDirector}.</p>
        )}
      </LegalSection>

      <LegalSection title="2. Hébergement">
        <p>
          Le site est hébergé par {legalConfig.host.name}, {legalConfig.host.address} —{" "}
          {legalConfig.host.website}.
        </p>
      </LegalSection>

      <LegalSection title="3. Activité">
        <p>
          {legalConfig.tradeName} exerce une activité de lutte contre les nuisibles
          (dératisation, désinsectisation, désinfection) auprès des particuliers et des
          professionnels, en {legalConfig.serviceArea}. Les techniciens utilisent des produits
          biocides dans le cadre de la certification Certibiocide (certification reconnue par
          le Ministère de l&apos;Agriculture).
        </p>
      </LegalSection>

      <LegalSection title="4. Propriété intellectuelle">
        <p>
          L&apos;ensemble des contenus de ce site (textes, visuels, modèles 3D, logo, structure)
          est la propriété de {legalConfig.tradeName}{" "}ou fait l&apos;objet d&apos;une
          autorisation d&apos;utilisation. Toute reproduction, représentation ou diffusion,
          totale ou partielle, sans autorisation écrite préalable est interdite et
          constituerait une contrefaçon au sens des articles L.335-2 et suivants du Code de la
          propriété intellectuelle.
        </p>
      </LegalSection>

      <LegalSection title="5. Responsabilité">
        <p>
          Les informations publiées sur ce site (fiches nuisibles, conseils, délais indicatifs)
          sont fournies à titre informatif et ne remplacent pas un diagnostic réalisé sur place
          par un technicien. {legalConfig.tradeName} s&apos;efforce d&apos;assurer
          l&apos;exactitude des informations mais ne saurait être tenu responsable des
          omissions ou des résultats obtenus à la suite d&apos;une utilisation autonome de ces
          conseils.
        </p>
        <p>
          Les liens externes (WhatsApp, Instagram) renvoient vers des services tiers dont les
          conditions d&apos;utilisation et politiques de confidentialité leur sont propres.
        </p>
      </LegalSection>

      <LegalSection title="6. Données personnelles">
        <p>
          Le traitement des données personnelles collectées via ce site est détaillé dans notre{" "}
          <a href="/confidentialite" className="font-medium text-secondary underline underline-offset-2 hover:text-foreground">
            politique de confidentialité
          </a>
          .
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}
