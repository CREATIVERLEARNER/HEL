/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        jet: "#000000",
        neon: { red: "#FF1E1E" },
      },
      boxShadow: {
        neon: "0 0 20px rgba(255,30,30,0.6), 0 0 40px rgba(255,30,30,0.3)",
      },
      fontFamily: {
        sans: ["Inter", "Poppins", "system-ui", "sans-serif"],
      },
      keyframes: {
        scan: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        scan: "scan 1.2s linear infinite",
        "pulse-slow": "pulse 3s infinite",
      },
    },
  },
  plugins: [],
};
