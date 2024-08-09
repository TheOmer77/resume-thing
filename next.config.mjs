/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: { serverComponentsExternalPackages: ['puppeteer-core'] },
  webpack: config => {
    config.resolve.alias.canvas = false;
    return config;
  },
};

export default nextConfig;
