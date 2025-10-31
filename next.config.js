/** @type {import('next').NextConfig} */
const nextConfig = {
  // Sets the output to 'standalone' to ensure optimal packaging for serverless functions,
  // or, for a simpler static deployment, you can use 'export'.
  // However, since you are using TypeScript and the App Router,
  // we will enforce the standard, robust Vercel output configuration.
  
  // CRITICAL FIX: The current default output seems to be causing asset serving issues.
  // We will enforce the standard configuration to ensure all assets are served correctly.
  
  // Setting output to 'export' simplifies deployment by creating static HTML/CSS/JS files,
  // which eliminates issues with Vercel's complex serverless runtime, a common source of 
  // 'Failed to load resource' errors for static assets.
  output: 'export', 
  
  reactStrictMode: true,
};

module.exports = nextConfig;
