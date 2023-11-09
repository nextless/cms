import path from "path";
import fs from "fs/promises";
import type { MetadataRoute } from "next";

type NotUndefined<T> = T extends undefined ? never : T;

const sets: Record<string, NotUndefined<MetadataRoute.Manifest["icons"]>[0]> = {
  favicon: {
    src: "/favicon.ico",
    type: "image/x-icon",
    sizes: "48x48",
  },
  icon1: {
    src: "/icon4.png",
    type: "image/png",
    sizes: "192x192",
  },
  icon2: {
    src: "/icon5.png",
    type: "image/png",
    sizes: "512x512",
  },
  "apple-icon": {
    src: "/apple-icon.png",
    type: "image/png",
    sizes: "180x180",
  },
};

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const loc = path.join(process.cwd(), "app");
  const files = await fs.readdir(loc);

  const icons: MetadataRoute.Manifest["icons"] = [];

  for (const file of files) {
    const [name, ext] = file.split(".");
    if (!ext) continue;
    if (!(sets as any)?.[name]) continue;
    icons.push({ ...(sets as any)[name] });
  }

  return {
    scope: "/",
    start_url: "/",
    name: "bucan.ch",
    display: "standalone",
    short_name: "bucan.ch",
    theme_color: "#ffffff",
    background_color: "#ffffff",
    icons,
  };
}
