import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Verdade ou Desafio",
    short_name: "V&D",
    description: "Um jogo de verdade ou desafio para duas pessoas.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#f7f5ff",
    theme_color: "#0a57e6",
    icons: [
      {
        src: "/icons/icon-vd-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-vd-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
