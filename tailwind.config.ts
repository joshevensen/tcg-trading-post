import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./layouts/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        lorcanaAmber: "#F4B223",
        lorcanaAmethyst: "#7C4182",
        lorcanaEmerald: "#329044",
        lorcanaRuby: "#D50037",
        lorcanaSapphire: "#0093C9",
        lorcanaSteel: "#97A3AE",
      },
    },
  },
  plugins: [],
};
export default config;
