import Image from "next/image";
import { cn } from "@/lib/utils";

type LogoSize = "sm" | "md" | "lg";

type LogoProps = {
  size?: LogoSize;
  className?: string;
};

const sizeStyles: Record<LogoSize, string> = {
  sm: "size-9 p-1.5",
  md: "size-11 p-2",
  lg: "size-16 p-2.5",
};

export function Logo({ size = "md", className }: LogoProps) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full bg-white shadow-[0_1px_2px_rgb(0_0_0_/_0.06),0_0_0_1px_rgb(16_48_32_/_0.06)]",
        sizeStyles[size],
        className
      )}
    >
      <Image
        src="/logo_nuisible.jpeg"
        alt="Experts Nuisible"
        width={1254}
        height={1254}
        className="h-full w-full rounded-full object-contain"
        priority
      />
    </span>
  );
}
