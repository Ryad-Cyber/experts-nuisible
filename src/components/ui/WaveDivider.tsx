import { cn } from "@/lib/utils";

type WaveDividerProps = {
  fromColor: string;
  toColor: string;
  flip?: boolean;
  className?: string;
};

export function WaveDivider({ fromColor, toColor, flip, className }: WaveDividerProps) {
  return (
    <div
      aria-hidden
      className={cn("relative h-14 w-full overflow-hidden sm:h-20", className)}
      style={{ backgroundColor: fromColor }}
    >
      <svg
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        className={cn("absolute inset-0 h-full w-full", flip && "-scale-y-100")}
      >
        <path
          d="M0,60 C240,100 480,20 720,40 C960,60 1200,110 1440,55 L1440,100 L0,100 Z"
          fill={toColor}
        />
      </svg>
    </div>
  );
}
