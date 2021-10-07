import { ChakraProvider } from "@chakra-ui/provider";

import { wrapper } from "../store";
import "../styles/globals.css";
import theme from "../src/theme/index";
import "../src/theme/styles.css";

const App = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default wrapper.withRedux(App);
