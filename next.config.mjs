/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow a separate build dir (e.g. .next-prod) so a production build/serve
  // doesn't contend with a dev server using the default .next.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  images: {
    // Serve Unsplash URLs straight to the browser instead of running them
    // through the server-side optimizer (avoids optimizer fetch timeouts).
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
