import { withKazeStyle } from '@kaze-style/next-plugin';

/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  // i18n: { locales: ['ja'], defaultLocale: 'ja' },
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    appDir: true,
    serverActions: true,
  },
};

export default withKazeStyle(nextConfig);
