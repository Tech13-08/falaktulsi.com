/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        "primary-dark": "var(--primary-dark)",
        secondary: "var(--secondary)",
        "secondary-dark": "var(--secondary-dark)",
        background: "var(--background)",
        card: "var(--card)",
        text: "var(--text)",
        textSecondary: "var(--textSecondary)",
      },
    },
  },
  plugins: [],
};

// primary: "#8B5A3C", // rich espresso (buttons, highlights)
// secondary: "#6B4423", // deep coffee bean (hover, accents)
// background: "#2C2117", // dark roasted (page background)
// card: "#3D2F24", // mocha (cards)
// text: "#E8D5C4", // cream (primary text)
// textSecondary: "#C4A890", // latte foam (secondary text)
