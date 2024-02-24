/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  },

  api: {
    bodyParser: {
      sizeLimit: "1mb",
    },
    externalResolver: true,
    basePath: "src/app/api", // Specify your custom API route path
  },
};

module.exports = nextConfig;
