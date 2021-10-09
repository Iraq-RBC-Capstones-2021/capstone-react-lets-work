import "@fontsource/roboto";
import "@fontsource/roboto/300.css";
import Navbar from "../components/Navbar";
import { ChakraProvider } from "@chakra-ui/provider";

import { wrapper } from "../store";
import theme from "../styles/theme/index";

const App = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <Navbar />
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default wrapper.withRedux(App);
