import Image from "next/image";
import { cn } from "@/lib/utils";

type LogoSize = "sm" | "md" | "lg";

type LogoProps = {
  size?: LogoSize;
  className?: string;
};

const sizeStyles: Record<LogoSize, string> = {
  sm: "size-8",
  md: "size-11",
  lg: "size-14",
};

export function Logo({ size = "md", className }: LogoProps) {
  return (
    <Image
      src="/logo_nuisible.jpeg"
      alt="Experts Nuisible"
      width={1254}
      height={1254}
      className={cn("shrink-0 rounded-full object-contain", sizeStyles[size], className)}
      priority
    />
  );
}
