/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily:{
      'iransans-regular':'iransans-regular',
      'iransans-medium':'iransans-medium',
      'iransans-bold':'iransans-bold',
    },
    extend: {},
  },
  plugins: [],
}