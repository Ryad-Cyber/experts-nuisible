"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/Button";

function HamburgerIcon({ open, reducedMotion }: { open: boolean; reducedMotion: boolean }) {
  const barTransition = reducedMotion
    ? { duration: 0.01 }
    : { duration: 0.35, ease: [0.65, 0, 0.35, 1] as const };

  return (
    <span className="relative flex size-5 flex-col items-center justify-center gap-[5px]">
      <motion.span
        className="h-[2px] w-5 rounded-full bg-gradient-to-r from-secondary via-foreground to-accent-dark"
        animate={{ y: open ? 7 : 0, rotate: open ? 45 : 0 }}
        transition={barTransition}
      />
      <motion.span
        className="h-[2px] w-5 rounded-full bg-foreground"
        animate={{ opacity: open ? 0 : 1, scale: open ? 0.4 : 1 }}
        transition={barTransition}
      />
      <motion.span
        className="h-[2px] w-5 rounded-full bg-gradient-to-r from-accent-dark via-foreground to-secondary"
        animate={{ y: open ? -7 : 0, rotate: open ? -45 : 0 }}
        transition={barTransition}
      />
    </span>
  );
}

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    function onScroll() {
      setOpen(false);
    }
    function onTouchMove(event: TouchEvent) {
      if (panelRef.current?.contains(event.target as Node)) return;
      setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [open]);

  function close() {
    setOpen(false);
    setServicesOpen(false);
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
        <HamburgerIcon open={open} reducedMotion={Boolean(prefersReducedMotion)} />
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
              ref={panelRef}
              id="mobile-nav-panel"
              aria-label="Navigation mobile"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={panelTransition}
              className="fixed inset-x-0 top-16 z-40 flex max-h-[calc(100dvh-3.6rem)] flex-col gap-1 overflow-y-auto border-b border-border bg-background p-4 shadow-lg"
            >
              {siteConfig.nav.map((link, index) => {
                const entry = {
                  initial: { opacity: 0, y: -6 },
                  animate: { opacity: 1, y: 0 },
                  transition: {
                    duration: prefersReducedMotion ? 0.01 : 0.18,
                    delay: prefersReducedMotion ? 0 : index * 0.03,
                  },
                };

                if (link.label === "Services") {
                  return (
                    <motion.div key={link.href} {...entry}>
                      <button
                        type="button"
                        aria-expanded={servicesOpen}
                        onClick={() => setServicesOpen((prev) => !prev)}
                        className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-base font-medium text-foreground hover:bg-muted"
                      >
                        {link.label}
                        <ChevronDown
                          className={`size-5 text-secondary transition-transform duration-300 ${
                            servicesOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      <AnimatePresence initial={false}>
                        {servicesOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={
                              prefersReducedMotion ? { duration: 0.01 } : { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
                            }
                            className="overflow-hidden"
                          >
                            <div className="ml-3 mt-1 flex flex-col gap-0.5 border-l border-border pl-3">
                              {siteConfig.servicesMenu.map((item) => (
                                <a
                                  key={item.label}
                                  href={item.href}
                                  onClick={close}
                                  className="rounded-lg px-3 py-2.5 text-base font-medium text-foreground/75 transition-colors hover:bg-muted hover:text-foreground"
                                >
                                  {item.label}
                                </a>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                }

                return (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={close}
                    {...entry}
                    className="rounded-lg px-3 py-2.5 text-base font-medium text-foreground hover:bg-muted"
                  >
                    {link.label}
                  </motion.a>
                );
              })}

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
