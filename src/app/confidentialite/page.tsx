import type { Metadata } from "next";
import { LegalPageLayout, LegalSection } from "@/components/ui/LegalPageLayout";
import { legalConfig } from "@/config/legal";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Politique de confidentialité — Experts Nuisible",
  description:
    "Politique de confidentialité d'Experts Nuisible : données collectées via le formulaire de contact, finalités, durées de conservation et droits RGPD.",
  // Canonical explicite : sans cela, la page hérite du canonical racine défini
  // dans layout.tsx et se déclarerait comme un doublon de la page d'accueil.
  alternates: { canonical: "/confidentialite" },
};

export default function ConfidentialitePage() {
  return (
    <LegalPageLayout
      title="Politique de confidentialité"
      intro="Cette page décrit, en langage clair, quelles données personnelles nous collectons via ce site, pourquoi, et quels sont vos droits (Règlement général sur la protection des données — RGPD)."
    >
      <LegalSection title="1. Responsable du traitement">
        <p>
          {legalConfig.tradeName}
          {legalConfig.companyName && ` (${legalConfig.companyName})`}, service de techniciens
          mobiles intervenant en {legalConfig.serviceArea}
          {legalConfig.address ? `, dont le siège social est situé ${legalConfig.address}` : ""}
          , est responsable du traitement des données collectées sur ce site. Pour toute
          question :{" "}
          <a href={`mailto:${siteConfig.email}`} className="font-medium text-secondary underline underline-offset-2 hover:text-foreground">
            {siteConfig.email}
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="2. Données collectées et finalités">
        <p>
          <strong className="font-medium text-foreground/90">Formulaire de demande de devis</strong> : nom, téléphone,
          e-mail, type de nuisible, zone où le nuisible a été aperçu, et votre message. Ces
          informations servent exclusivement à répondre à votre demande, établir un devis et
          organiser une intervention (mesures précontractuelles, article 6.1.b du RGPD). Elles
          nous sont transmises par e-mail via notre prestataire technique d&apos;acheminement
          Resend.
        </p>
        <p>
          <strong className="font-medium text-foreground/90">Appels et WhatsApp</strong> : si vous nous contactez par
          téléphone ou WhatsApp, les échanges relèvent de ces canaux ; WhatsApp est un service
          tiers soumis à sa propre politique de confidentialité.
        </p>
        <p>
          <strong className="font-medium text-foreground/90">Mesure d&apos;audience</strong> : nous utilisons Plausible
          Analytics, un outil de mesure respectueux de la vie privée, sans cookies et sans suivi
          individuel. Aucune donnée personnelle identifiable n&apos;est collectée à cette fin —
          c&apos;est pourquoi ce site n&apos;affiche pas de bannière de consentement aux cookies.
        </p>
      </LegalSection>

      <LegalSection title="3. Cookies">
        <p>
          Ce site ne dépose pas de cookies publicitaires ni de cookies de suivi. Seuls des
          mécanismes techniques strictement nécessaires au fonctionnement (par exemple la mémoire
          de session utilisée pour pré-remplir le formulaire lorsque vous naviguez entre les
          pages) peuvent être utilisés ; ils ne quittent pas votre navigateur.
        </p>
      </LegalSection>

      <LegalSection title="4. Destinataires et sous-traitants">
        <p>
          Vos données ne sont ni vendues ni cédées. Elles sont accessibles uniquement à
          l&apos;équipe de {legalConfig.tradeName}{" "}et transitent par nos sous-traitants
          techniques : l&apos;hébergeur du site ({legalConfig.host.name}) et le service
          d&apos;acheminement d&apos;e-mails (Resend), chacun agissant conformément au RGPD.
        </p>
      </LegalSection>

      <LegalSection title="5. Durée de conservation">
        <p>
          Les demandes de contact sont conservées au maximum 3 ans après le dernier échange si
          elles ne débouchent pas sur une intervention. En cas d&apos;intervention, les documents
          contractuels et de facturation sont conservés pendant les durées légales applicables.
        </p>
      </LegalSection>

      <LegalSection title="6. Vos droits">
        <p>
          Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification,
          d&apos;effacement, d&apos;opposition, de limitation du traitement et de portabilité de
          vos données. Pour exercer ces droits, écrivez-nous à{" "}
          <a href={`mailto:${siteConfig.email}`} className="font-medium text-secondary underline underline-offset-2 hover:text-foreground">
            {siteConfig.email}
          </a>{" "}
          — nous répondons dans un délai d&apos;un mois. Vous pouvez également introduire une
          réclamation auprès de la CNIL (cnil.fr).
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}
