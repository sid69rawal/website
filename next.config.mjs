/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // These origins are taken from the error messages in the logs:
    // "Blocked cross-origin request from <origin>"
    // This allows these specified development origins to make requests to the Next.js dev server.
    allowedDevOrigins: [
        "https://6000-firebase-studio-1746693118697.cluster-44kx2eiocbhe2tyk3zoyo3ryuo.cloudworkstations.dev",
        "https://9000-firebase-studio-1746693118697.cluster-44kx2eiocbhe2tyk3zoyo3ryuo.cloudworkstations.dev",
    ],
  },
  // Note: Turbopack is enabled via the CLI flag '--turbopack' in package.json,
  // so no specific configuration for it is typically needed here.
};

export default nextConfig;
