"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function HeroBackdrop() {
  const rootRef = useRef<HTMLDivElement>(null);
  const blobARef = useRef<HTMLDivElement>(null);
  const blobBRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion || !rootRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(blobARef.current, {
        yPercent: 22,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });
      gsap.to(blobBRef.current, {
        yPercent: -18,
        xPercent: 6,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div
        ref={blobARef}
        className="absolute -top-32 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,var(--accent-light)_0%,transparent_72%)] opacity-40 blur-3xl lg:left-1/4"
      />
      <div
        ref={blobBRef}
        className="absolute top-20 right-[-10rem] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,var(--primary-light)_0%,transparent_72%)] opacity-25 blur-3xl"
      />
    </div>
  );
}
