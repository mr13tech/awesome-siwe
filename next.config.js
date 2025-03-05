/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    'debug',
    'supports-color',
    '@metamask/sdk',
    '@wagmi/connectors',
  ],

  experimental: {
    // Silence ESM warnings
    // esmExternals: 'loose',
  },
}

module.exports = nextConfig
