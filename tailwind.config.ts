import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        floatBubble: "floatBubble linear infinite",
        bubbleShine: "bubbleShine ease-in-out infinite",
      },
      keyframes: {
        floatBubble: {
          "0%": { transform: "translateY(0) scale(0.9)", opacity: "0" },
          "10%": { opacity: "0.3" },
          "50%": { opacity: "0.6" },
          "100%": { transform: "translateY(-120vh) scale(1.3)", opacity: "0" },
        },
        bubbleShine: {
          "0%, 100%": { opacity: "0" },
          "50%": { opacity: "0.8" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
