"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, Phone, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/Button";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  function close() {
    setOpen(false);
    toggleRef.current?.focus();
  }

  const panelTransition = prefersReducedMotion ? { duration: 0.01 } : { duration: 0.2, ease: "easeOut" as const };

  return (
    <div className="md:hidden">
      <button
        ref={toggleRef}
        type="button"
        aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        onClick={() => setOpen((prev) => !prev)}
        className="relative z-40 flex size-10 items-center justify-center rounded-full text-foreground"
      >
        {open ? <X className="size-6" /> : <Menu className="size-6" />}
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              aria-hidden
              onClick={close}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={panelTransition}
              className="fixed inset-0 top-16 z-30 bg-foreground/20 backdrop-blur-[2px]"
            />

            <motion.nav
              id="mobile-nav-panel"
              aria-label="Navigation mobile"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={panelTransition}
              className="fixed inset-x-0 top-16 z-40 flex flex-col gap-1 border-b border-border bg-background p-4 shadow-lg"
            >
              {siteConfig.nav.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={close}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: prefersReducedMotion ? 0.01 : 0.18,
                    delay: prefersReducedMotion ? 0 : index * 0.03,
                  }}
                  className="rounded-lg px-3 py-3 text-base font-medium text-foreground hover:bg-muted"
                >
                  {link.label}
                </motion.a>
              ))}

              <Button href={siteConfig.phone.href} className="mt-2 w-full" onClick={close}>
                <Phone className="size-4" />
                {siteConfig.cta.callNow}
              </Button>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
