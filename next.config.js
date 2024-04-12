const { withStoreConfig } = require("./store-config")
const store = require("./store.config.json")

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = withStoreConfig({
  features: store.features,
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "http", hostname: "localhost" },
      { protocol: "https", hostname: "medusa-public-images.s3.eu-west-1.amazonaws.com" },
      { protocol: "https", hostname: "medusa-server-testing.s3.amazonaws.com" },
      { protocol: "https", hostname: "medusa-server-testing.s3.us-east-1.amazonaws.com" },
    ],
  },
  async headers() {
    return [
      {
       // Apply these headers to all routes in your application.
       source: "/:path*",
       headers: [
         {
           key: "Content-Security-Policy",
           value: `default-src 'self'; 
                   script-src 'self' 'https://idempireuss-production.up.railway.app'; 
                   font-src 'self' https://fonts.gstatic.com; 
                   img-src 'self' https://idempireuss-production.up.railway.app https://medusa-public-images.s3.eu-west-1.amazonaws.com;`,
         },
       ],
     },
   ];
 },
})

console.log("next.config.js", JSON.stringify(module.exports, null, 2))

module.exports = nextConfig
