import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

const fonts = {
  heading: "Roboto",
  body: "Roboto",
};

const breakpoints = createBreakpoints({
  sm: "36em",
  md: "46em",
  lg: "64em",
  xl: "80em",
});

const colors = {
  transparent: "transparent",
  black: "#000",
  white: "#fff",
  offWhite: "#F9F9F9",
  darkPurple: "#141850",
  primary: {
    lighter: "#7884ff",
    main: "#5E6DFF",
    darker: "#4556ff",
  },

  secondary: {
    lighter: "#edeffd",
    main: "#EBEDFF",
    darker: "#d2d6ff",
  },
  tertiary: {
    lighter: "#244153",
    main: "#1C3341",
    darker: "#14252f",
  },
};

const theme = extendTheme({ colors, fonts, breakpoints });

export default theme;
