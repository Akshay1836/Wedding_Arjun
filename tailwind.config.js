/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        ivory: {
          50: "#fffdf8",
          100: "#fbf4e8",
        },
        blush: {
          100: "#f6dfe4",
          200: "#efc5cf",
          300: "#e7a8b8",
          600: "#c87082",
          700: "#af5a6e",
          800: "#94485b",
        },
        gold: {
          100: "#f7edd4",
          200: "#efd7a2",
          300: "#e6c370",
          400: "#d6a63e",
          500: "#c38d2a",
          600: "#a67622",
          700: "#885f1e",
        },
      },
      fontFamily: {
        script: ["\"Great Vibes\"", "cursive"],
        display: ["\"Cormorant Garamond\"", "serif"],
        sans: ["\"Manrope\"", "system-ui", "sans-serif"],
      },
      boxShadow: {
        premium: "0 24px 60px -26px rgba(38, 28, 22, 0.35)",
      },
    },
  },
  plugins: [],
}

