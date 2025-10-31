/** @type {import('tailwindcss').Config} */
module.exports = {
  // CRITICAL: This 'content' array must list all directories containing your classes.
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // Scans your current page.tsx
    "./pages/**/*.{js,ts,jsx,tsx,mdx}", 
    "./components/**/*.{js,ts,jsx,tsx,mdx}", 
  ],
  theme: {
    extend: {
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
