/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "hero-image":
          "url('https://fastly.picsum.photos/id/353/5000/2806.jpg?blur=10&hmac=l1dEQwKX-yZjX2VvN69cTKz_KRWXHKhuzz--J9XHbt8')",
      },
      fontFamily: {
        sans: ["Raleway", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
