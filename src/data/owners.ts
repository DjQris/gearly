import { photo, type Photo } from "./images";

export type Owner = {
  id: string;
  name: string;
  avatar: Photo;
  location: string;
  verified: boolean;
  rating: number;
  rentals: number;
  responseTime: string;
  memberSince: string;
};

export const owners: Owner[] = [
  {
    id: "chidi",
    name: "Chidi Okafor",
    avatar: photo.pManA,
    location: "Lagos, Ikeja",
    verified: true,
    rating: 4.9,
    rentals: 142,
    responseTime: "within 1 hour",
    memberSince: "2023",
  },
  {
    id: "amara",
    name: "Amara Bello",
    avatar: photo.pWomanA,
    location: "Abuja, Wuse",
    verified: true,
    rating: 5.0,
    rentals: 87,
    responseTime: "within 2 hours",
    memberSince: "2024",
  },
  {
    id: "tunde",
    name: "Tunde Adeyemi",
    avatar: photo.pManC,
    location: "Lagos, Lekki",
    verified: true,
    rating: 4.8,
    rentals: 203,
    responseTime: "within 30 minutes",
    memberSince: "2022",
  },
  {
    id: "zainab",
    name: "Zainab Yusuf",
    avatar: photo.pWomanB,
    location: "Port Harcourt",
    verified: true,
    rating: 4.9,
    rentals: 61,
    responseTime: "within 3 hours",
    memberSince: "2024",
  },
  {
    id: "emeka",
    name: "Emeka Nwosu",
    avatar: photo.pManD,
    location: "Abuja, Maitama",
    verified: true,
    rating: 4.7,
    rentals: 118,
    responseTime: "within 1 hour",
    memberSince: "2023",
  },
];

export const ownerById = (id: string) => owners.find((o) => o.id === id);
