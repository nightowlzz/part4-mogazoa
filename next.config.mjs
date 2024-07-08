/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://mogazoa-api.vercel.app/:path*',
      },
    ];
  },
};
export default nextConfig;
