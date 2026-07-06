"use client";

import type { ComponentPropsWithoutRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type CardProps = ComponentPropsWithoutRef<typeof motion.div>;

export function Card({ className, ...props }: CardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className={cn(
        "rounded-xl border border-border bg-background p-6 shadow-sm transition-shadow duration-300 hover:shadow-md",
        className
      )}
      {...props}
    />
  );
}
