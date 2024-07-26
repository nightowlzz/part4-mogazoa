/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      // NextAuth 관련 경로는 내부적으로 처리
      {
        source: '/api/auth/:path*',
        destination: '/api/auth/:path*',
      },
      // 추가 인증 관련 경로들을 내부적으로 처리 (필요한 경우)
      {
        source: '/api/signin',
        destination: '/api/auth/signin',
      },
      {
        source: '/api/signout',
        destination: '/api/auth/signout',
      },
      // 그 외 모든 API 요청을 외부 API로 리다이렉트
      {
        source: '/api/:path*',
        destination: 'https://mogazoa-api.vercel.app/:path*',
      },
    ];
  },
  images: {
    domains: [
      'sprint-fe-project.s3.ap-northeast-2.amazonaws.com',
      'store.storeimages.cdn-apple.com',
    ],
  },
  reactStrictMode: true,
  swcMinify: true,
};

export default nextConfig;
