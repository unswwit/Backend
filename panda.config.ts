import { defineConfig, defineGlobalStyles } from "@pandacss/dev";

const globalCss = defineGlobalStyles({
  "*": { margin: 0, padding: 0, boxSizing: "border-box" },
  "@media (prefers-color-scheme: dark)": {
    html: {
      colorScheme: "dark",
    },
  },
  a: {
    color: "inherit",
    textDecoration: "none",
  },
  body: {
    fontFamily: "inter",
  },
  h2: {
    fontFamily: "montserrat",
    fontSize: 40,
    fontWeight: 700,
  },
  h3: {
    fontFamily: "montserrat",
    fontSize: 40,
    fontWeight: 700,
  },
  p: { fontFamily: "montserrat", fontSize: 24 },
  button: {
    backgroundColor: "#E85F5C",
    color: "#fff",
    fontSize: "1.5rem",
    fontFamily: "montserrat",
    fontWeight: 400,
    textAlign: "center",
    padding: "1rem 2.12rem",
    borderRadius: "0.75rem",
    flexShrink: 1,
    "&:hover": {
      cursor: "pointer",
    },
  },
});

export default defineConfig({
  globalCss,
  // Whether to use css reset
  preflight: true,
  // Where to look for your css declarations
  include: ["./src/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],
  // Files to exclude
  exclude: [],
  // Useful for theme customization
  theme: {
    extend: {
      tokens: {
        fonts: {
          inter: {
            value: "var(--font-inter), sans-serif",
          },
          montserrat: {
            value: "var(--font-montserrat), sans-serif",
          },
        },
      },
    },
  },
  // The output directory for your css system
  outdir: "styled-system",
  jsxFramework: "react",
});
