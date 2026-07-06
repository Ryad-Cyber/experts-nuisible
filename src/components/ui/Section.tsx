import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";
import { Container } from "./Container";

type SectionVariant = "default" | "muted" | "accent";

type SectionProps = ComponentPropsWithoutRef<"section"> & {
  variant?: SectionVariant;
  containerClassName?: string;
};

const variantStyles: Record<SectionVariant, string> = {
  default: "bg-background text-foreground",
  muted: "bg-muted text-foreground",
  accent: "bg-gradient-to-br from-accent-light via-accent to-accent-dark text-accent-foreground",
};

export function Section({
  variant = "default",
  className,
  containerClassName,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn("py-16 md:py-24", variantStyles[variant], className)}
      {...props}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
