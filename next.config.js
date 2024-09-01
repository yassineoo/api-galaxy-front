/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental:{
    serverActions:true
  },
  images: {
    domains: [
      "images.pexels.com",
      "images.apilist.fun",
      "lh3.googleusercontent.com",
    ],
  },
};


module.exports = nextConfig;
