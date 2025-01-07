import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--color-background)",
        foreground: "var(--color-text)",
        border: "var(--color-border)",
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        accent: "var(--color-accent)",
        light: "var(--color-light)",
        dark: "var(--color-dark)",
        warning: "var(--color-warning)",
        success: "var(--color-success)",
        destructive: "var(--color-danger)",
      },
      fontFamily: {
        poppinsThin: ["poppins-thin"],
        poppinsLight: ["poppins-light"],
        poppinsRegular: ["poppins-regular"],
        poppinsMedium: ["poppins-medium"],
        poppinsSemibold: ["poppins-semibold"],
        poppinsBold: ["poppins-bold"],
        poppinsExtrabold: ["poppins-extrabold"],
        poppinsBlack: ["poppins-black"],
      },
      keyframes: {
        pulseScale: {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.1)", opacity: "0.9" },
        },
      },
      animation: {
        pulseScale: "pulseScale 1.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
