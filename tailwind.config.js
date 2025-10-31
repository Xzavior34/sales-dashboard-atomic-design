/** @type {import('tailwindcss').Config} */
module.exports = {
  // CRITICAL: This 'content' array tells Tailwind where your classes are used.
  // It ensures the production build finds and includes all necessary utility classes
  // from your components and pages.
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // Next.js 'app' directory
    "./pages/**/*.{js,ts,jsx,tsx,mdx}", // Next.js 'pages' directory
    "./components/**/*.{js,ts,jsx,tsx,mdx}", // Any shared components
    // Add any other paths where you use Tailwind classes
  ],
  theme: {
    extend: {
      // You can define custom colors, spacing, etc., here.
      // For now, we'll keep it simple to fix the build issue.
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        'primary-blue': '#2563eb',
        'primary-green': '#059669',
      }
    },
  },
  plugins: [],
}
