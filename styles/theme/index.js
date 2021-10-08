import { extendTheme } from "@chakra-ui/react";
import { darken } from "@chakra-ui/theme-tools";
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
const components = {
  Button: {
    variants: {
      primary: {
        bg: "primary.main",
        color: "#ffff",
        _hover: {
          bg: darken("primary.main", 5),
        },
        _active: {
          bg: darken("primary.main", 8),
        },
      },
      secondary: {
        bg: "#2882BC",
        color: "#ffff",
        _hover: {
          bg: darken("#2882BC", 5),
        },
        _active: {
          bg: darken("#2882BC", 8),
        },
      },
    },
  },
  Checkbox: {
    variants: {
      rounded: {
        control: {
          borderRadius: "50%",
          bg: "#ffff",
        },
      },
    },
  },
};

const theme = extendTheme({ colors, fonts, components });

export default theme;
