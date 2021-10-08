import "@fontsource/roboto";
import "@fontsource/roboto/300.css";
import { ChakraProvider } from "@chakra-ui/provider";

import { wrapper } from "../store";
import "../styles/globals.css";
import theme from "../styles/theme/index";

const App = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default wrapper.withRedux(App);
