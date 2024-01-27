/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/*/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        customRed:
          "linear-gradient(0deg, rgba(170,140,175,1) 10%, rgba(66,172,157,1) 50%)",
      },
    },
  },
  plugins: [],
};

// "linear-gradient(0deg, rgba(17,140,175,1) 6%, rgba(66,172,157,1) 100%)",
