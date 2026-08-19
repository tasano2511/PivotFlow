import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "PivotFlow Labs",
    // Home-screen labels truncate around 12 characters, so the short form drops "Labs".
    short_name: "PivotFlow",
    description:
      "PivotFlow Labs — a studio building a portfolio of apps, plus custom builds on request.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#10161F",
    theme_color: "#10161F",
    icons: [
      { src: "/icons/192", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/512", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/512", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
