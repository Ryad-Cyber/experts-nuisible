import { Phone } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/Button";

export function StickyCallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 p-3 backdrop-blur-md md:hidden">
      <Button href={siteConfig.phone.href} size="lg" className="w-full">
        <Phone className="size-5" />
        {siteConfig.cta.callNow} — {siteConfig.phone.display}
      </Button>
    </div>
  );
}
