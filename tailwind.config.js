const typography = require('@tailwindcss/typography');

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./styles/**/*.{css,scss}"
  ],
  purge: false, // Explicitly disable purging to silence warnings
  theme: {
    extend: {},
  },
  plugins: [
    typography, // Add the typography plugin
  ],
};