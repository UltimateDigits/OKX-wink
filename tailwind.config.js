/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        harmony: ['"HarmonyOS Sans"', "sans-serif"],
        pingfang: ['"PingFang SC"', "sans-serif"],
        ospunctuation: ["OSPunctuation", "sans-serif"],
        yahei: ['"Microsoft Yahei"', "sans-serif"],
        heiti: ['"Heiti SC"', "sans-serif"],
        wenquanyi: ['"WenQuanYi Micro Hei"', "sans-serif"],
        helveticaneue: ['"Helvetica Neue"', "sans-serif"],
        helvetica: ["Helvetica", "sans-serif"],
        arial: ["Arial", "sans-serif"],
        sanserif: ["sans-serif"],
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

