import { photo, type Photo } from "./images";

export type Review = {
  id: string;
  name: string;
  avatar: Photo;
  rating: number;
  date: string;
  body: string;
};

// A shared pool of reviews used across equipment detail pages.
export const reviews: Review[] = [
  {
    id: "r1",
    name: "Ifeoma D.",
    avatar: photo.pWomanC,
    rating: 5,
    date: "Aug 2026",
    body: "Immaculate condition and everything in the kit was exactly as listed. Pickup was quick and the owner walked me through the settings. Booked again the next week.",
  },
  {
    id: "r2",
    name: "Marcus O.",
    avatar: photo.pManE,
    rating: 5,
    date: "Jul 2026",
    body: "Saved me from buying a body I only needed for one shoot. Clean, fully charged, and delivered to set on time. This is how gear rental should work.",
  },
  {
    id: "r3",
    name: "Kelechi A.",
    avatar: photo.pManB,
    rating: 4,
    date: "Jul 2026",
    body: "Great experience overall. One battery was lower than expected but the owner sorted a replacement within the hour. Would rent from them again.",
  },
  {
    id: "r4",
    name: "Sarah M.",
    avatar: photo.pWomanD,
    rating: 5,
    date: "Jun 2026",
    body: "The listing was detailed enough that I knew exactly what I was getting. No surprises, fair deposit, smooth return. Highly recommend.",
  },
];
