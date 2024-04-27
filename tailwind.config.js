/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/*/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/hooks/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      textColor: {
        txt_primery: "#5541fb",
        txt_secondery: "#fb6b2f",
      },
      backgroundColor: {
        bg_custom: "#eeeeee",
        bg_primery: "#5541fb",
        bg_secondery: "#fb6b2f",
      },
      borderColor: {
        border_primery: "#5541fb",
        border_secondery: "#fb6b2f",
      },
    },
  },
  plugins: [],
};
