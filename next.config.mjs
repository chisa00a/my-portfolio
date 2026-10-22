/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Optimize local asset formats referenced across the portfolio.
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 768, 1024, 1280, 1600, 1920],
    imageSizes: [16, 32, 64, 128, 256, 384],
  },
};

export default nextConfig;
