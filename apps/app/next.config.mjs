import { join } from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    serverComponentsExternalPackages: ['puppeteer-core'],
    outputFileTracingRoot: join(import.meta.dirname, '../../'),
  },
  webpack: config => {
    config.resolve.alias.canvas = false;
    return config;
  },
  // https://github.com/wojtekmaj/react-pdf/issues/1822#issuecomment-2172868407
  swcMinify: false,
};

export default nextConfig;
