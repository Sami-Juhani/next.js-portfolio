/** @type {import('next').NextConfig} */
const nextConfig = {
  /* SETTINGS FOR STATIC DEPLOYMENT, DELETE ON FINAL PRODUCT */
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "samipaan.com",
      },
    ],
  },
}

export default nextConfig
