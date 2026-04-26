/** @type {import('next').NextConfig} */
const nextConfig = {
  // Turbopack is now stable and the default bundler in Next.js 16
  // React Compiler — stable opt-in, auto-memoizes components
  reactCompiler: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Mongoose uses Node.js-specific APIs; keep it server-only
  serverExternalPackages: ["mongoose"],
};

export default nextConfig;

