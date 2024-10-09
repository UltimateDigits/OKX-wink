/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        custom: [
          "HarmonyOS Sans",
          "PingFang SC",
          "OSPunctuation",
          "Microsoft Yahei",
          "Heiti SC",
          "WenQuanYi Micro Hei",
          "Helvetica Neue",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
      colors: {
        empty: "#f7f7f7",
        bor: "#ebebeb",
        ph: "#bdbdbd",
        modem: "#f5f5f5",
      },
      fontSize: {
        "2xl": "24px",
      },
    },
  },
  plugins: [],
};

