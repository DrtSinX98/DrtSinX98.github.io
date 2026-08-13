/** @type {import('next').NextConfig} */
const nextConfig = {
  // Off deliberately. The gallery globe re-renders on every animation frame, and
  // Strict Mode's development-only double render halves the frame rate on that
  // page. The pre-migration app did not use Strict Mode either. Production
  // builds are unaffected by this flag.
  reactStrictMode: false,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'i.ibb.co' },
      { protocol: 'https', hostname: 'raw.githubusercontent.com' },
      { protocol: 'https', hostname: 'cdn.jsdelivr.net' },
    ],
  },
  // react-simple-maps ships ESM-only d3 sub-dependencies
  transpilePackages: ['react-simple-maps'],
};

export default nextConfig;
