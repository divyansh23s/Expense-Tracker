/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#10b981",   // green-teal
        secondary: "#06b6d4", // cyan
        softbg: "#f0f9ff"
      }
    }
  },
  plugins: []
};
