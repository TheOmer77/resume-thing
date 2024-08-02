/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['puppeteer-core', '@sparticuz/chromium'],
  },
  webpack: config => {
    config.module.rules.push({ test: /\.woff2$/i, type: 'asset/resource' });
    return config;
  },
};

export default nextConfig;
