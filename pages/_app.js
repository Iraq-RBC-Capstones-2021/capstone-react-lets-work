import "@fontsource/roboto";
import "@fontsource/roboto/300.css";
import Layout from "../components/Layout";
import { ChakraProvider } from "@chakra-ui/provider";
import { appWithTranslation } from "next-i18next";
import { wrapper } from "../store";
import theme from "../styles/theme/index";

const App = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
};

export default wrapper.withRedux(appWithTranslation(App));
