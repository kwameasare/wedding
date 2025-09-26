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
        }
      }
    }
  },
  plugins: []
};

export default config;
