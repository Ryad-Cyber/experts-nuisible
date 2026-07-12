import { Phone } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

export function StickyCallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 p-3 backdrop-blur-md md:hidden">
      <div className="flex items-stretch gap-2">
        <Button href={siteConfig.phone.href} size="lg" className="min-w-0 flex-1">
          <Phone className="size-5 shrink-0" />
          <span className="truncate">
            {siteConfig.cta.callNow} — {siteConfig.phone.display}
          </span>
        </Button>
        {/* Canal alternatif pour les visiteurs qui n'aiment pas téléphoner. */}
        <a
          href={siteConfig.whatsapp.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Envoyer des photos sur WhatsApp"
          className="flex aspect-square h-12 shrink-0 items-center justify-center rounded-full border border-border bg-background text-[#25D366] shadow-sm transition-colors hover:bg-muted"
        >
          <WhatsAppIcon className="size-6" />
        </a>
      </div>
    </div>
  );
}
