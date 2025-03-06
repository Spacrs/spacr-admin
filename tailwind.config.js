/** @type {import('tailwindcss').Config} */
export default {
  content:  [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-out',
        slideUp: 'slideUp 0.3s ease-out',
      },
      colors: {
        // primary: '#36468E',
        primary: '#131f5c',
        secondary: '#2ecc71', // Green
        danger: '#e74c3c', // Red
        warning: '#f1c40f', // Yellow
        dark: '#2c3e50', // Dark grayish blue
        light: '#ecf0f1', // Light gray
      },
    },
  },
  plugins: [],
}

