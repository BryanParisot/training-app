/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["https://tailwindui.com", "https://lh3.googleusercontent.com"],
    unoptimized: true,
  },
};

module.exports = nextConfig;
