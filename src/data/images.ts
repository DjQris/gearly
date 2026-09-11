// Central Unsplash image map. Every photo is referenced through here so shots
// can be swapped in one place. All IDs are verified to resolve on the Unsplash CDN.

export type Photo = { id: string; alt: string };

const BASE = "https://images.unsplash.com/photo-";

/**
 * Build a sized, cropped Unsplash URL. Images are served unoptimized (see
 * next.config), so the browser downloads exactly this — request the smallest
 * width the slot actually needs. `auto=format` returns WebP/AVIF where
 * supported. `q` can be dropped low for images that sit behind dark overlays.
 */
export function img(photo: Photo, w = 1200, h?: number, q = 70): string {
  const params = new URLSearchParams({
    auto: "format",
    fit: "crop",
    q: String(q),
    w: String(w),
  });
  if (h) params.set("h", String(h));
  return `${BASE}${photo.id}?${params.toString()}`;
}

export const photo = {
  // — Cameras & lenses —
  camCanonFront: { id: "1502920917128-1aa500764cbd", alt: "Professional DSLR camera body on a black background" },
  camBlackKit: { id: "1516035069371-29a1b244cc32", alt: "Camera body with two prime lenses on a dark surface" },
  camCanonZoom: { id: "1495707902641-75cac588d2e9", alt: "DSLR camera fitted with a telephoto zoom lens" },
  camNeon: { id: "1516724562728-afc824a36e84", alt: "Mirrorless camera lit with neon pink and blue light" },
  camLensTape: { id: "1621520291095-aa6c7137f048", alt: "Professional camera body and lens photographed in dramatic low light" },
  camPolaroid: { id: "1526170375885-4d8ecf77b99f", alt: "Instant film camera on a light background" },
  lensDark: { id: "1452780212940-6f5c0d14d848", alt: "Camera lens close-up in low light" },

  // — Rigs, sets & lighting —
  rigOnSet: { id: "1601506521937-0121a7fc2a6b", alt: "Cinema camera rig on a film set lit in blue" },
  setBlue: { id: "1524253482453-3fed8d2fe12b", alt: "Camera and production gear on set under blue light" },
  lightTrails: { id: "1519638399535-1b036603ac77", alt: "Long-exposure night city light trails" },

  // — Audio —
  micStudio: { id: "1590602847861-f357a9332bbc", alt: "Studio broadcast microphone in low light" },
  studioMusic: { id: "1598488035139-bdbb2231ce04", alt: "Recording studio with instruments and audio equipment" },

  // — Drones & stabilisers —
  droneFly: { id: "1473968512647-3e447244af8f", alt: "Quadcopter camera drone flying above a forest" },
  droneGround: { id: "1521405924368-64c5b84bec60", alt: "Camera drone resting on the ground outdoors" },
  droneCreator: { id: "1506947411487-a56738267384", alt: "Creator holding a camera drone on location" },

  // — Monitors / post —
  editSuite: { id: "1626785774573-4b799315345d", alt: "Laptop running video-editing software on a desk" },
  monitorsSetup: { id: "1598550476439-6847785fcea6", alt: "Multi-monitor editing workstation" },

  // — Accessories —
  accessory: { id: "1533928298208-27ff66555d8d", alt: "Polished metal accessory on a minimal surface" },

  // — Creators working —
  photographer: { id: "1493863641943-9b68992a8d07", alt: "Photographer with a camera and backpack on location" },
  creatorUrban: { id: "1488161628813-04466f872be2", alt: "Creative professional seated in an urban setting" },

  // — Portraits (owners & testimonials) —
  pManA: { id: "1500648767791-00dcc994a43e", alt: "Portrait of a smiling man" },
  pManB: { id: "1507003211169-0a1dd7228f2d", alt: "Portrait of a smiling man" },
  pManC: { id: "1519085360753-af0119f7cbe7", alt: "Portrait of a man in a dark suit" },
  pManD: { id: "1607990281513-2c110a25bd8c", alt: "Portrait of a bearded man" },
  pManE: { id: "1506794778202-cad84cf45f1d", alt: "Portrait of a young man" },
  pWomanA: { id: "1494790108377-be9c29b29330", alt: "Portrait of a smiling woman" },
  pWomanB: { id: "1531123897727-8f129e1688ce", alt: "Portrait of a smiling woman" },
  pWomanC: { id: "1524504388940-b1c1722653e1", alt: "Portrait of a woman" },
  pWomanD: { id: "1534528741775-53994a69daeb", alt: "Portrait of a woman" },
  pWomanE: { id: "1517841905240-472988babdf9", alt: "Portrait of a woman" },
} as const satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photo;
