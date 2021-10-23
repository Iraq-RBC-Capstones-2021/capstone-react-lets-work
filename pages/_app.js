import "@fontsource/roboto";
import "@fontsource/roboto/300.css";
import Layout from "../components/Layout";
import { ChakraProvider } from "@chakra-ui/provider";
import { Skeleton } from "@chakra-ui/react";
import { appWithTranslation } from "next-i18next";
import { wrapper } from "../store";
import theme from "../styles/theme/index";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "@firebase/auth";
import { auth } from "../firebase/firebase";
import { setIsLoggedIn } from "../store/auth/authSlice";
import { useDispatch } from "react-redux";

const App = ({ Component, pageProps }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setIsLoaded(true);

      user ? dispatch(setIsLoggedIn(true)) : dispatch(setIsLoggedIn(false));
    });
  }, [dispatch]);
  return (
    <ChakraProvider theme={theme}>
      {isLoaded ? (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      ) : (
        <Skeleton h="100vh" />
      )}
    </ChakraProvider>
  );
};

export default wrapper.withRedux(appWithTranslation(App));
