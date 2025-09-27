import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        blush: {
          50: "#fff5f8",
          100: "#ffe6ed",
          200: "#ffccd9",
          300: "#ff9db8",
          400: "#ff6a95",
          500: "#f94c80",
          600: "#d72c63",
          700: "#b01f4f",
          800: "#8a1940",
          900: "#5b102b"
        },
        sage: {
          50: "#f4f8f6",
          100: "#e3f1eb",
          200: "#c4e1d3",
          300: "#9dcbaf",
          400: "#74b388",
          500: "#4d9263",
          600: "#3b744e",
          700: "#2f5a3e",
          800: "#254430",
          900: "#182a1f"
        },
        champagne: {
          50: "#fdfaf5",
          100: "#f7f1e6",
          200: "#ede2cf",
          300: "#decaad",
          400: "#c9aa80",
          500: "#b28c5f",
          600: "#8f6d46",
          700: "#735537",
          800: "#5a412c",
          900: "#3d2a1d"
        },
        pearl: {
          50: "#fbfaf7",
          100: "#f4f1eb",
          200: "#e8e2d6",
          300: "#d9cebb",
          400: "#c1b195",
          500: "#aa9473",
          600: "#8a7558",
          700: "#6e5d46",
          800: "#574836",
          900: "#3b2f23"
        },
        ink: {
          50: "#f4f4f3",
          100: "#dcdad7",
          200: "#c5c1bb",
          300: "#a8a298",
          400: "#8b847a",
          500: "#6f685f",
          600: "#575048",
          700: "#423c36",
          800: "#2d2925",
          900: "#181614"
        }
      }
    }
  },
  plugins: []
};

export default config;
