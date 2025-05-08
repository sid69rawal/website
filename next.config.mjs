
/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      }
    ],
  },
  experimental: {
    allowedDevOrigins: [
      'https://6000-firebase-studio-1746693118697.cluster-44kx2eiocbhe2tyk3zoyo3ryuo.cloudworkstations.dev',
      'https://9000-firebase-studio-1746693118697.cluster-44kx2eiocbhe2tyk3zoyo3ryuo.cloudworkstations.dev',
      'http://6000-firebase-studio-1746693118697.cluster-44kx2eiocbhe2tyk3zoyo3ryuo.cloudworkstations.dev',
      'http://9000-firebase-studio-1746693118697.cluster-44kx2eiocbhe2tyk3zoyo3ryuo.cloudworkstations.dev',
    ],
  },
};

export default nextConfig;
