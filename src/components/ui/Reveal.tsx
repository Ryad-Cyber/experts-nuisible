"use client";

import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { motion, useReducedMotion, type Variants, type Transition } from "framer-motion";

type RevealProps = ComponentPropsWithoutRef<typeof motion.div> & {
  delay?: number;
  y?: number;
};

const easeOut = [0.16, 1, 0.3, 1] as const;

export const Reveal = forwardRef<HTMLDivElement, RevealProps>(function Reveal(
  { delay = 0, y = 24, children, ...props },
  ref
) {
  const prefersReducedMotion = useReducedMotion();

  // Variants stay identical on server and client (avoids a hydration mismatch);
  // only the transition timing is shortened for reduced-motion users.
  const variants: Variants = { hidden: { opacity: 0, y }, visible: { opacity: 1, y: 0 } };
  const transition: Transition = prefersReducedMotion
    ? { duration: 0.01 }
    : { duration: 0.6, ease: easeOut, delay };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants}
      transition={transition}
      {...props}
    >
      {children}
    </motion.div>
  );
});

type StaggerProps = ComponentPropsWithoutRef<typeof motion.div> & {
  staggerDelay?: number;
};

export const StaggerGroup = forwardRef<HTMLDivElement, StaggerProps>(function StaggerGroup(
  { staggerDelay = 0.08, children, ...props },
  ref
) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: prefersReducedMotion ? 0 : staggerDelay,
          },
        },
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
});

export const StaggerItem = forwardRef<HTMLDivElement, RevealProps>(function StaggerItem(
  { y = 20, children, ...props },
  ref
) {
  const prefersReducedMotion = useReducedMotion();

  const variants: Variants = {
    hidden: { opacity: 0, y },
    visible: {
      opacity: 1,
      y: 0,
      transition: prefersReducedMotion ? { duration: 0.01 } : { duration: 0.6, ease: easeOut },
    },
  };

  return (
    <motion.div ref={ref} variants={variants} {...props}>
      {children}
    </motion.div>
  );
});
