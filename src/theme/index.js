import { extendTheme, theme as base } from "@chakra-ui/react";

const colors = {
  brand: {
    40: "#1C3341",
    50: "#5E6DFF",
    60: "#EBEDFF",
  },
};

const fonts = {
  heading: `Montserrat, ${base.fonts?.heading}`,
  body: `Inter, ${base.fonts?.body}`,
};

const theme = extendTheme({ colors, fonts });

export default theme;
