/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"], // REQUIRED for shadcn
  content: [
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

      // ADD THIS (shadcn system)
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },

        // YOUR CUSTOM COLORS (keep them)
        primary: '#131f5c',
        lightBlue:'#ECF0FF',
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

