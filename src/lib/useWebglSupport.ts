"use client";

import { useEffect, useState } from "react";

/** Détection WebGL côté client. Retourne `true` pendant le premier rendu
 *  (identique au serveur, pas de mismatch d'hydratation), puis se corrige. */
export function useWebglSupport(): boolean {
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSupported(Boolean(gl));
    } catch {
      setSupported(false);
    }
  }, []);

  return supported;
}
