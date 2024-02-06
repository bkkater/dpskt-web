/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["cdn.discordapp.com"],
  },
  experimental: {
    optimizePackageImports: ["@phosphor-icons/react"],
  },
};

module.exports = nextConfig;
