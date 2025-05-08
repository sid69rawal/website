/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      }
    ],
  },
  experimental: {
    // Required for Turbopack to work with `allowedDevOrigins`
    // This can be removed once Turbopack supports it by default
    // serverComponentsExternalPackages: ['@neondatabase/serverless'],
  },
  // Configuration for allowing cross-origin requests in development
  // This is useful for environments like Gitpod or Cloud Workstations
  async headers() {
    if (process.env.NODE_ENV === 'development') {
      return [
        {
          source: '/:path*',
          headers: [
            { key: 'Access-Control-Allow-Credentials', value: 'true' },
            { key: 'Access-Control-Allow-Origin', value: '*' }, // Adjust this to be more specific if needed
            { key: 'Access-Control-Allow-Methods', value: 'GET,DELETE,PATCH,POST,PUT' },
            { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version' },
          ],
        },
      ];
    }
    return [];
  },
  // The `allowedDevOrigins` option is not yet fully supported by Turbopack.
  // For now, the custom headers above provide a workaround.
  // Keep an eye on Next.js updates for Turbopack compatibility.
  // allowedDevOrigins: [
  //   'https://*.cluster-*.cloudworkstations.dev', // Example for Cloud Workstations
  //   'https://*.gitpod.io', // Example for Gitpod
  // ],
};

export default nextConfig;
