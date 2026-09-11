import { photo, type Photo } from "./images";

export type Category = {
  slug: string;
  name: string;
  count: number;
  image: Photo;
};

// Category counts are illustrative placeholder figures for the design.
export const categories: Category[] = [
  { slug: "cameras", name: "Cameras", count: 128, image: photo.camNeon },
  { slug: "lenses", name: "Lenses", count: 214, image: photo.lensDark },
  { slug: "rigs", name: "Camera Rigs", count: 62, image: photo.rigOnSet },
  { slug: "lighting", name: "Lighting", count: 97, image: photo.setBlue },
  { slug: "audio", name: "Audio", count: 88, image: photo.micStudio },
  { slug: "gimbals", name: "Gimbals", count: 54, image: photo.camLensTape },
  { slug: "drones", name: "Drones", count: 41, image: photo.droneFly },
  { slug: "monitors", name: "Monitors", count: 47, image: photo.monitorsSetup },
  { slug: "tripods", name: "Tripods", count: 73, image: photo.photographer },
  { slug: "accessories", name: "Accessories", count: 156, image: photo.accessory },
];

export const categoryBySlug = (slug: string) =>
  categories.find((c) => c.slug === slug);
