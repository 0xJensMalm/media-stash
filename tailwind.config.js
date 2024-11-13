/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-bg": "#121212",
        "dark-surface": "#1E1E1E",
        "dark-primary": "#2D2D2D",
      },
    },
  },
  plugins: [],
};