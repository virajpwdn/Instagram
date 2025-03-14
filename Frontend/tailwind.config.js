/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  darkMode: "class", // Enable dark mode
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#E1306C", // Instagram pinkish-red
        secondary: "#405DE6", // Instagram blue
        backgroundLight: "#FFFFFF",
        backgroundDark: "#121212",
        textLight: "#000000",
        textDark: "#FFFFFF",
      },

      backgroundImage: {
        "instagram-gradient":
          "linear-gradient(to right, #FEDA75, #FA7E1E, #D62976, #962FBF, #4F5BD5)",
      },

      fontFamily: {
        poppins: ["Poppins", ...defaultTheme.fontFamily.sans],
        montserrat: ["Montserrat", ...defaultTheme.fontFamily.sans],
        inter: ["Inter", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
