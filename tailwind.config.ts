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
    },
  },
  plugins: [],
};

export default config;
