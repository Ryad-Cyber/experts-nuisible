import Image from "next/image";
import { cn } from "@/lib/utils";

type LogoSize = "sm" | "md" | "lg";

type LogoProps = {
  size?: LogoSize;
  className?: string;
};

const sizeStyles: Record<LogoSize, string> = {
  sm: "size-9",
  md: "size-17",
  lg: "size-16",
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
