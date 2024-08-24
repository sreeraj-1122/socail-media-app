/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        // Custom breakpoints
        '2xl-lg': '1600px',
        '3xl': '1800px',
      },
      colors: {
        'custom-bg': '#121212', 
        'custom-light': '#93C5FD',
      },
      boxShadow: {
        'custom': '0px 0px 20px rgba(0, 0, 0, 0.055)',
        'custom-dark': '0 8px 30px rgba(0, 0, 0, 0.5)',
      },
    },
  },
  plugins: [],
}

