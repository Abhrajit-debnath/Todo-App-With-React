/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      poppins: ["poppins"],
    },
    extend: {
      colors: {
        'pink-500': 'rgba(252,67,176,1)',
        'blue-500': 'rgba(55,147,255,1)',
      },
      backgroundImage: {
        'gradient-rainbow': 'linear-gradient(90deg, 0%,  0%)',
      },
    },
    },
  plugins: [],
};
