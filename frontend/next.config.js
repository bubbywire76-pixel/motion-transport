/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['motionapp.ng'],
  },
}

module.exports = nextConfig
