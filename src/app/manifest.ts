import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "CodeTrilhas — Aprendizado Modular de Programação",
    short_name: "CodeTrilhas",
    description:
      "Plataforma open-source de trilhas interativas de linguagens, bibliotecas e frameworks criadas pela comunidade.",
    start_url: "/",
    display: "standalone",
    background_color: "#09090b",
    theme_color: "#6366f1",
    orientation: "portrait",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
