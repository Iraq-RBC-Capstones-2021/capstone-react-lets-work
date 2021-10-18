import { useEffect, useState } from "react";
import {
  Flex,
  Button,
  IconButton,
  Text,
  HStack,
  useToast,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuIcon,
  MenuCommand,
  MenuDivider,
  Avatar,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  Stack,
  Box,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { BiLogOut } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
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
    dispatch(handleSignOut(auth.currentUser?.uid));
  }
  return (
    <Flex align="center" justify="end" bgColor="offWhite">
      <Flex align="center" display={["flex", "flex", "none", "none"]} mr="auto">
        <NotificationsList />
      </Flex>
      <HStack
        justify={{ base: "end", md: "" }}
        minW="50%"
        top="1rem"
        right="1rem"
        align="center"
        spacing="10"
      >
        <HStack
          w="100%"
          align="center"
          display={["none", "none", "flex", "flex"]}
          justify="end"
          spacing="3"
        >
          <NextLink href="/" passHref>
            <Button as="a" variant="ghost" aria-label="Home">
              Home
            </Button>
          </NextLink>
          <NextLink href="/chat" passHref>
            <Button as="a" variant="ghost" aria-label="Home">
              Chat
            </Button>
          </NextLink>
          <NextLink href="/search" passHref>
            <Button as="a" variant="ghost" aria-label="Home">
              Search
            </Button>
          </NextLink>
          <NextLink href="/about" passHref>
            <Button as="a" variant="ghost" aria-label="Home">
              About
            </Button>
          </NextLink>
        </HStack>
        <HStack
          align="center"
          display={["none", "none", "flex", "flex"]}
          spacing="3"
        >
          {auth.currentUser ? (
            <Popover>
              <PopoverTrigger>
                <Button
                  rightIcon={<ChevronDownIcon />}
                  as={Button}
                  bg="transparent"
                  _hover={{ bg: "transparent" }}
                  _focus={{ boxShadow: "none" }}
                  _active={{}}
                  p="0"
                >
                  <HStack>
                    <Avatar size="sm" src={auth.currentUser?.photoURL} />
                    <Text> {auth.currentUser.displayName} </Text>
                  </HStack>
                </Button>
              </PopoverTrigger>
              <PopoverContent
                _focus={{ boxShadow: "lg" }}
                boxShadow="lg"
                ml={{ base: "10px", md: "0px" }}
              >
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader
                  cursor="pointer"
                  _hover={{ bg: "gray.100" }}
                  mt="3"
                >
                  <NextLink href="/account">
                    <HStack>
                      <Icon h="5" w="5" as={CgProfile} />
                      <Text>Profile </Text>
                    </HStack>
                  </NextLink>
                </PopoverHeader>
                <PopoverBody cursor="pointer" _hover={{ bg: "gray.100" }}>
                  <NextLink href="/setting">
                    <HStack>
                      <Icon h="5" w="5" as={FiSettings} />
                      <Text>Account Settings</Text>
                    </HStack>
                  </NextLink>
                </PopoverBody>
                <PopoverFooter
                  onClick={signOutHandler}
                  cursor="pointer"
                  _hover={{ bg: "gray.100" }}
                >
                  <HStack>
                    {" "}
                    <Icon h="5" w="5" as={BiLogOut} /> <Text>Logout</Text>{" "}
                  </HStack>{" "}
                </PopoverFooter>
              </PopoverContent>
            </Popover>
          ) : (
            <NextLink href="/signup" passHref>
              <Button as="a" variant="ghost" aria-label="Home">
                Sign Up
              </Button>
            </NextLink>
          )}

          <NotificationsList />
        </HStack>
        <IconButton
          aria-label="open menu"
          size="lg"
          mr="2"
          marginY="2"
          icon={<HamburgerIcon />}
          display={["flex", "flex", "none", "none"]}
          onClick={() => setDisplay("flex")}
        />
      </HStack>
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
            {auth.currentUser ? (
              <Stack>
                <NextLink href="/account">
                  <Button
                    as="a"
                    variant="ghost"
                    aria-label="Home"
                    my="2"
                    w="100%"
                  >
                    Profile
                  </Button>
                </NextLink>
                <Button
                  as="a"
                  variant="ghost"
                  aria-label="Home"
                  my="2"
                  w="100%"
                  onClick={signOutHandler}
                >
                  Logout
                </Button>
              </Stack>
            ) : (
              <NextLink href="/signup">
                <Button
                  as="a"
                  variant="ghost"
                  aria-label="Home"
                  my="2"
                  w="100%"
                >
                  Sign Up
                </Button>
              </NextLink>
            )}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
