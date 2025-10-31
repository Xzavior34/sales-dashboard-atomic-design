/** @type {import('tailwindcss').Config} */
module.exports = {
  // FINAL FIX: This content array explicitly targets files inside the 'src' folder
  // which is where your Vercel logs showed the dashboard component lives.
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}", 
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
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
