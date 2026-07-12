import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Ancienne URL de l'identificateur 3D — redirection permanente (308,
      // équivalent SEO du 301) qui préserve les query strings (?nuisible=…).
      {
        source: "/galerie-3d",
        destination: "/identifier",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
