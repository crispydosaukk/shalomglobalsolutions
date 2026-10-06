import { imageHosts } from './image-hosts.config.mjs';

const isStaticExport = true;

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(isStaticExport ? { output: 'export' } : {}),
  productionBrowserSourceMaps: true,
  distDir: process.env.DIST_DIR || '.next',
  trailingSlash: isStaticExport,

  typescript: {
    ignoreBuildErrors: true,
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  images: isStaticExport ? { unoptimized: true } : {
    remotePatterns: imageHosts,
    minimumCacheTTL: 60,
    qualities: [75, 85, 100],
  }
};
export default nextConfig;