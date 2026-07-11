"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { Bug } from "lucide-react";

// A discreet scroll companion: a hairline rail with a gold→green progress fill and a small
// frosted-glass capsule — carrying a minimalist pest motif — that glides down as the visitor
// scrolls, wrapped in a soft luminous halo. Modern, fluid and premium; decorative only.
export function ScrollMotif() {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 280, damping: 34, mass: 0.2 });

  const capsuleTop = useTransform(progress, [0, 1], ["0%", "100%"]);
  const opacity = useTransform(progress, [0, 0.04, 0.97, 1], [0, 1, 1, 0.6]);

  return (
    <>
      {/* Desktop: tall rail at mid-height with a floating, gliding capsule. */}
      <motion.div
        aria-hidden
        style={{ opacity }}
        className="pointer-events-none fixed right-6 top-1/4 z-30 hidden h-1/2 lg:block"
      >
        <div className="relative mx-auto h-full w-px bg-gradient-to-b from-transparent via-border to-transparent">
          {/* Progress fill */}
          <motion.div
            style={{ scaleY: progress }}
            className="absolute inset-0 w-px origin-top bg-gradient-to-b from-accent via-accent-dark to-secondary"
          />

          {/* Gliding glass capsule */}
          <motion.div style={{ top: capsuleTop }} className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2">
            {/* Soft luminous halo */}
            <motion.span
              animate={prefersReducedMotion ? undefined : { opacity: [0.4, 0.75, 0.4], scale: [1, 1.16, 1] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -inset-2 rounded-full bg-accent/25 blur-md"
            />

            <motion.div
              animate={prefersReducedMotion ? undefined : { y: [0, -4, 0] }}
              transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
              className="relative flex size-9 items-center justify-center rounded-full border border-white/70 bg-white/60 text-accent-dark shadow-[0_6px_22px_rgba(16,32,26,0.2)] backdrop-blur-md"
            >
              <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-br from-white/60 via-transparent to-transparent opacity-70" />
              <Bug className="relative size-4" />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Mobile/tablet: lighter — a taller rail so the capsule's glide actually reads as
          following the scroll, anchored mid-screen and clear of the header above and the
          StickyCallBar thumb zone below. No floating loop, just the progress fill. */}
      <motion.div
        aria-hidden
        style={{ opacity }}
        className="pointer-events-none fixed right-3 top-1/2 z-30 h-[45vh] max-h-96 -translate-y-1/2 lg:hidden"
      >
        <div className="relative mx-auto h-full w-px bg-gradient-to-b from-transparent via-border to-transparent">
          <motion.div
            style={{ scaleY: progress }}
            className="absolute inset-0 w-px origin-top bg-gradient-to-b from-accent via-accent-dark to-secondary"
          />
          <motion.div style={{ top: capsuleTop }} className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2">
            <span className="absolute -inset-1.5 rounded-full bg-accent/25 blur-sm" />
            <div className="relative flex size-6 items-center justify-center rounded-full border border-white/70 bg-white/70 text-accent-dark shadow-[0_4px_14px_rgba(16,32,26,0.18)] backdrop-blur-md">
              <Bug className="relative size-3" />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}
