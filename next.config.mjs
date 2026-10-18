/** @type {import('next').NextConfig} */
const nextConfig = {
  // React Compiler: komponentlarni avtomatik optimallashtiradi (Vite'dagi bilan bir xil)
  reactCompiler: true,
  // Javob sarlavhasidan "X-Powered-By: Next.js" ni olib tashlaydi
  poweredByHeader: false,
};

export default nextConfig;
