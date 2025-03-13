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
      animation: {
        kenburns: 'kenburns 30s ease-in-out infinite alternate',
        fadeIn: 'fadeIn 1s ease-in-out',
        slideUp: 'slideUp 0.8s ease-in-out',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        kenburns: {
          '0%': { transform: 'scale(1.1) translate(0px, 0px)' },
          '50%': { transform: 'scale(1.2) translate(-20px, -10px)' },
          '100%': { transform: 'scale(1.1) translate(20px, 10px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}