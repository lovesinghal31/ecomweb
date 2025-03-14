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
          DEFAULT: '#FCA311', // Yellow/Orange
          dark: '#E69100',    // Darker shade of yellow/orange
        },
        secondary: {
          DEFAULT: '#14213D', // Dark Blue
          light: '#1E3A6C',   // Lighter shade of dark blue
        },
        accent: {
          DEFAULT: '#000000', // Black
          light: '#333333',   // Light black/dark gray
          dark: '#000000',    // Added dark variant for accent
        },
        gray: {
          light: '#E5E5E5',   // Light Gray
          DEFAULT: '#CCCCCC', // Medium Gray
          dark: '#666666',    // Dark Gray
        }
      },
      fontFamily: {
        sans: ['"Quantico"', 'sans-serif'],
        heading: ['"Quantico"', 'sans-serif'],
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