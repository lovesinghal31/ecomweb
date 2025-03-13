/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3498db',
          dark: '#2980b9',
        },
        secondary: {
          DEFAULT: '#2c3e50',
          light: '#34495e',
        },
        accent: {
          DEFAULT: '#27ae60',
          dark: '#219653',
        },
      },
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}