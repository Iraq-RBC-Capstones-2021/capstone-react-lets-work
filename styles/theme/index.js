import { extendTheme } from "@chakra-ui/react";

const fonts = {
  heading: "Roboto",
  body: "Roboto",
};

const colors = {
  transparent: "transparent",
  black: "#000",
  white: "#fff",
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

const theme = extendTheme({ colors, fonts });

export default theme;
