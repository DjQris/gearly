import { photo, type Photo } from "./images";

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  profession: string;
  location: string;
  rating: number;
  portrait: Photo;
};

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote:
      "I needed a cinema camera for a three-day production. Gearly made it easy to find one nearby without buying equipment I only needed temporarily.",
    name: "David Okonkwo",
    profession: "Filmmaker",
    location: "Lagos",
    rating: 5,
    portrait: photo.creatorUrban,
  },
  {
    id: "t2",
    quote:
      "The lighting kit I rented turned a small interview setup into something that looked like a real commercial. Owner delivered it to set and picked it back up.",
    name: "Ngozi Eze",
    profession: "Content Creator",
    location: "Abuja",
    rating: 5,
    portrait: photo.pWomanB,
  },
  {
    id: "t3",
    quote:
      "As a video editor moving into directing, I couldn't justify buying a gimbal yet. Renting one for the weekend let me test-drive the whole workflow first.",
    name: "Bola Ade",
    profession: "Video Editor",
    location: "Lagos",
    rating: 5,
    portrait: photo.photographer,
  },
];
