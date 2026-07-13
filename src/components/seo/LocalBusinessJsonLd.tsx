import { siteConfig } from "@/config/site";
import { COVERAGE_DEPARTMENTS, COVERAGE_REGION_NAMES } from "@/data/coverage";

const DAY_ORDER = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"] as const;

const DAY_EN: Record<(typeof DAY_ORDER)[number], string> = {
  lundi: "Monday",
  mardi: "Tuesday",
  mercredi: "Wednesday",
  jeudi: "Thursday",
  vendredi: "Friday",
  samedi: "Saturday",
  dimanche: "Sunday",
};

// Derives a schema.org day list from siteConfig.hours, instead of hardcoding a duplicate
// schedule here. Handles the "always available" phrasing ("Disponibilité" / "7j/7") as well
// as the more granular "Lundi - Vendredi" / "Week-ends & jours fériés" formats.
function parseDays(slot: { days: string; hours: string }): string[] {
  const normalized = slot.days.toLowerCase();

  if (slot.hours.toLowerCase().includes("7j/7") || normalized.includes("disponibilit")) {
    return DAY_ORDER.map((day) => DAY_EN[day]);
  }
  if (normalized.includes("week-end")) return [DAY_EN.samedi, DAY_EN.dimanche];

  const [start, end] = normalized.split("-").map((part) => part.trim());
  const startIndex = DAY_ORDER.indexOf(start as (typeof DAY_ORDER)[number]);
  const endIndex = DAY_ORDER.indexOf(end as (typeof DAY_ORDER)[number]);
  if (startIndex === -1 || endIndex === -1) return [];
  return DAY_ORDER.slice(startIndex, endIndex + 1).map((day) => DAY_EN[day]);
}

function parseHours(label: string): { opens: string; closes: string } | null {
  if (/24h\s*\/\s*24/i.test(label)) return { opens: "00:00", closes: "23:59" };
  const match = label.match(/(\d{1,2})h(\d{2})\s*-\s*(\d{1,2})h(\d{2})/);
  if (!match) return null;
  const [, oh, om, ch, cm] = match;
  return { opens: `${oh.padStart(2, "0")}:${om}`, closes: `${ch.padStart(2, "0")}:${cm}` };
}

export function LocalBusinessJsonLd() {
  const openingHoursSpecification = siteConfig.hours
    .map((slot) => {
      const days = parseDays(slot);
      const hours = parseHours(slot.hours);
      if (!days.length || !hours) return null;
      return {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: days,
        opens: hours.opens,
        closes: hours.closes,
      };
    })
    .filter((entry): entry is NonNullable<typeof entry> => entry !== null);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "PestControl",
    "@id": `${siteConfig.url}/#business`,
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.phone.href.replace("tel:", ""),
    email: siteConfig.email,
    image: `${siteConfig.url}/logo_nuisible.jpeg`,
    // No fixed premises: service area only, no fabricated street address. Régions
    // et départements réellement desservis (source unique data/coverage.ts) —
    // rien d'inventé, chaque zone figure sur la page /zones-intervention.
    areaServed: [
      ...COVERAGE_REGION_NAMES.map((name) => ({ "@type": "AdministrativeArea", name })),
      ...COVERAGE_DEPARTMENTS.map((dept) => ({ "@type": "AdministrativeArea", name: dept.name })),
    ],
    openingHoursSpecification,
    sameAs: Object.values(siteConfig.social).map((entry) => entry.href),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
