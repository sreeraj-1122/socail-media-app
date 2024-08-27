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
        'custom': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'custom-dark': '0 0 8px rgba(0, 0, 0, 0.4)',
      },
    },
  },
  plugins: [],
}

