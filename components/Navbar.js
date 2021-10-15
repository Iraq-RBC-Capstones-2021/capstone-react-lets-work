import { useEffect, useState } from "react";
import {
  Flex,
  Button,
  IconButton,
  Text,
  HStack,
  useToast,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import NextLink from "next/link";
import NotificationsList from "./Notifications/NotificationsList";
import { auth } from "../firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import { handleSignOut, resetStatus } from "../store/auth/authSlice";

export default function Navbar() {
  const [display, setDisplay] = useState("none");
  const [signedIn, setSignedIn] = useState(false);
  const dispatch = useDispatch();
  const signOut = useSelector((state) => state.auth.signOut);
  const toast = useToast();
  useEffect(() => {
    if (signOut.status === "success") {
      toast({
        title: "Successfully Logged Out",
        status: "success",
        variant: "subtle",
        position: "top",
        duration: 3000,
      });
      dispatch(resetStatus());
    }
    if (signOut.status === "error") {
      toast({
        title: signOut.errorMessage,
        status: "error",
        variant: "subtle",
        position: "top",
        duration: 3000,
      });
      dispatch(resetStatus());
    }
  }, [signOut.status, toast, dispatch, signOut.errorMessage]);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const authenticate = () => {
    setSignedIn(!signedIn);
  };
  function signOutHandler() {
    dispatch(handleSignOut());
  }
  return (
    // This is for testing purposes feel free to remove:
    <Flex
      align="center"
      bgColor="offWhite"
      justify={auth.currentUser ? "space-around" : "end"}
    >
      {isLoggedIn && auth.currentUser && (
        <HStack>
          <Text color="secondary.main" fontSize="2xl">
            {" "}
            Welcome{" "}
          </Text>
          <Text fontSize="2xl"> {auth.currentUser.displayName} </Text>
          <Button variant="primary" onClick={signOutHandler}>
            Log out
          </Button>
        </HStack>
      )}
      {/* {  ends here  } */}
      <Flex justify="end" bgColor="offWhite">
        <Flex display={["flex", "flex", "none", "none"]} mr="auto">
          <NotificationsList />
        </Flex>
        <Flex top="1rem" right="1rem" align="center">
          <Flex display={["none", "none", "flex", "flex"]}>
            <NextLink href="/" passHref>
              <Button as="a" variant="ghost" aria-label="Home" my="2" w="100%">
                Home
              </Button>
            </NextLink>
            <NextLink href="/chat" passHref>
              <Button as="a" variant="ghost" aria-label="Home" my="2" w="100%">
                Chat
              </Button>
            </NextLink>
            <NextLink href="/search" passHref>
              <Button as="a" variant="ghost" aria-label="Home" my="2" w="100%">
                Search
              </Button>
            </NextLink>
            <NextLink href="/about" passHref>
              <Button as="a" variant="ghost" aria-label="Home" my="2" w="100%">
                About
              </Button>
            </NextLink>
            <NextLink href={auth.currentUser ? "/account" : "/signup"} passHref>
              <Button
                as="a"
                variant="ghost"
                aria-label="Home"
                my="2"
                w="100%"
                ml="14"
                mr="2"
              >
                {auth.currentUser ? "Account" : "Sign Up"}
              </Button>
            </NextLink>

            <NotificationsList />
          </Flex>
          <IconButton
            aria-label="open menu"
            size="lg"
            mr="2"
            marginY="2"
            icon={<HamburgerIcon />}
            display={["flex", "flex", "none", "none"]}
            onClick={() => setDisplay("flex")}
          />
        </Flex>
        <Flex display={["flex", "flex", "none", "none"]}>
          <Flex
            w="100vw"
            bgColor="offWhite"
            zIndex={20}
            minHeight="100%"
            pos="fixed"
            top="0"
            left="0"
            overflow="auto"
            flexDir="column"
            display={display}
          >
            <Flex justify="flex-end">
              <IconButton
                mt="2"
                mr="2"
                aria-label="Close menu"
                size="lg"
                icon={<CloseIcon />}
                onClick={() => setDisplay("none")}
              />
            </Flex>
            <Flex
              height="100%"
              flexDir="column"
              align="center"
              onClick={() => setDisplay("none")}
            >
              <NextLink href="/" passHref>
                <Button
                  as="a"
                  variant="ghost"
                  aria-label="Home"
                  my="2"
                  w="100%"
                >
                  Home
                </Button>
              </NextLink>
              <NextLink href="/chat" passHref>
                <Button
                  as="a"
                  variant="ghost"
                  aria-label="Home"
                  my="2"
                  w="100%"
                >
                  Chat
                </Button>
              </NextLink>
              <NextLink href="/search" passHref>
                <Button
                  as="a"
                  variant="ghost"
                  aria-label="Home"
                  my="2"
                  w="100%"
                >
                  Search
                </Button>
              </NextLink>
              <NextLink href="/about" passHref>
                <Button
                  as="a"
                  variant="ghost"
                  aria-label="Home"
                  my="2"
                  w="100%"
                >
                  About
                </Button>
              </NextLink>
              <NextLink href="#" passHref>
                <Button
                  as="a"
                  variant="ghost"
                  aria-label="Home"
                  my="2"
                  w="100%"
                  onClick={authenticate}
                >
                  {signedIn ? "Account" : "Sign Up"}
                </Button>
              </NextLink>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
