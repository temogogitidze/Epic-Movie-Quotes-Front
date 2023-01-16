/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  variants: {
    extend: {
      visibility: ["group-hover"],
    },
  },
  theme: {
    extend: {
      backgroundImage: {
        "landing-bg": "url('@/assets/landing-bg.png')",
      },
      textColor: {
        "color-gold": "#DDCCAA",
      },
      backgroundColor: {
        "modal-bg": "#222030",
        "green-bg": "rgba(25, 135, 84, 0.2)",
        "orange-bg": "rgba(236, 149, 36, 0.2)",
      },
    },
  },
  plugins: [],
};
