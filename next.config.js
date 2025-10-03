/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.themealdb.com",
        pathname: "/**", // include tutte le immagini
      },
    ],
  },
};

module.exports = nextConfig; //(se si usa next.config.js) altrimenti export default nextConfig;
