import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: "Roboto",
        lilita: "Lilita One",
      },
      colors: {
        capital_blue: "#0E395A",
        capital_red: "#FF374F",
        primary: "#0E395A",
        secondary: "#FF374F",
        mainGray: "#9F9F9F",
      },
    },
  },
  plugins: [],
} satisfies Config;
