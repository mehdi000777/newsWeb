/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#27bec4",
        secondary: "#646464",
        orange: "#ff642f"
      },
      backgroundImage: {
        "line-bg": "url('src/assets/line-bg.png')"
      }
    },
  },
  plugins: [],
}

