/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "480px",
      },
      boxShadow: {
        card: "0 4px 12px rgba(0,0,0,0.05)",
        "card-dark": "0 4px 12px rgba(0,0,0,0.2)",
      },
    },
  },
  plugins: [],
};
