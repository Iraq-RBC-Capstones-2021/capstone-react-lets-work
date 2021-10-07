import { wrapper } from "../store";
import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/provider";
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
