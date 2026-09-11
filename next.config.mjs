/** @type {import('next').NextConfig} */
const nextConfig = {
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
