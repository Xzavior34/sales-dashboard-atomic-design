/** @type {import('next').NextConfig} */
const nextConfig = {
  // This is the essential configuration for the App Router
  // and modern builds.
  reactStrictMode: true,

  // Ensure this is set to false if you are using custom CSS/Tailwind
  // though it defaults to true and works, leaving it clean is safest.
  // swcMinify: true,
};

module.exports = nextConfig;
