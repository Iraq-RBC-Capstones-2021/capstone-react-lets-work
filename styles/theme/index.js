import { extendTheme } from "@chakra-ui/react";

const fonts = {
  heading: "Open Sans",
  body: "Raleway",
};

const colors = {
  transparent: "transparent",
  black: "#000",
  white: "#fff",
  gray: {
    50: "#f7fafc",
    100: "#EDF2F7",
    200: "#E2E8F0",
    700: "#2D3748",
    800: "#1A202C",
    900: "#171923",
  },
  Blue: {
    50: "#EBF8FF",
    100: "#BEE3F8",
    200: "#90CDF4",
    300: "#63B3ED",
    400: "#4299E1",
    500: "#3182CE",
    600: "#2B6CB0",
    700: "#2C5282",
    800: "#2A4365",
    900: "#1A365D",
  },
};

const theme = extendTheme({ colors, fonts });

export default theme;
