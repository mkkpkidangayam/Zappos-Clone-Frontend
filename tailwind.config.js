// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./src/**/*.{js,jsx,ts,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        ".animated-slide": {
          animation: "slide 2s ease-in-out infinite alternate",
        },
        "@keyframes slide": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-100%)" },
        },
      };

      addUtilities(newUtilities, ["responsive", "hover"]);
    }),
  ],
};

// module.exports = {
//   content: [
//     "./src/**/*.{js,jsx,ts,tsx}",
//   ],
//   theme: {
//     extend: {},
//     animation: {
//       slide: 'slide 2s ease-in-out infinite alternate',
//     },
//     keyframes: {
//       slide: {
//         '0%': { transform: 'translateY(0)' },
//         '100%': { transform: 'translateY(-100%)' },
//       },
//     },
//   },
//   variants: {},
//   plugins: [],
// };

