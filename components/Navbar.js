import { useEffect, useState } from "react";
import {
  Flex,
  Button,
  IconButton,
  Text,
  HStack,
  useToast,
  Avatar,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  Stack,
  Center,
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
import { useTranslation } from "next-i18next";
import Router from "next/router";
import LanguageSwitcher from "./LanguageSwitcher";
import { useRouter } from "next/router";

export default function Navbar() {
  const { t } = useTranslation("navbar");
  const [display, setDisplay] = useState("none");
  const router = useRouter();
  const { pathname, asPath, query } = router;
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
      router.reload();

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
  }, [signOut.status, toast, dispatch, signOut.errorMessage, router]);

  function signOutHandler() {
    dispatch(handleSignOut(auth.currentUser?.uid));
  }

  const changeLanguage = (ln) => {
    router.push({ pathname, query }, asPath, { locale: ln });
  };

  return (
    <Flex align="center" justify="end" bgColor="offWhite">
      {auth.currentUser ? (
        <Flex
          align="center"
          display={["flex", "flex", "none", "none"]}
          mr="auto"
        >
          <NotificationsList />
        </Flex>
      ) : null}

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
          <LanguageSwitcher />
          <NextLink href="/" passHref>
            <Button as="a" variant="ghost" aria-label="Home">
              {t("home")}
            </Button>
          </NextLink>
          <NextLink href="/chat" passHref>
            <Button as="a" variant="ghost" aria-label="chat">
              {t("chat")}
            </Button>
          </NextLink>
          <NextLink href="/search" passHref>
            <Button as="a" variant="ghost" aria-label="search">
              {t("search")}
            </Button>
          </NextLink>
          <NextLink href="/about" passHref>
            <Button as="a" variant="ghost" aria-label="about">
              {t("about")}
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
                <PopoverHeader
                  cursor="pointer"
                  _hover={{ bg: "gray.100" }}
                  mt="3"
                >
                  <NextLink href={`/account/${auth.currentUser.uid}`}>
                    <HStack>
                      <Icon h="5" w="5" as={CgProfile} />
                      <Text>{t("profile")} </Text>
                    </HStack>
                  </NextLink>
                </PopoverHeader>
                <PopoverBody cursor="pointer" _hover={{ bg: "gray.100" }}>
                  {auth.currentUser.emailVerified ? (
                    <NextLink href="/setting">
                      <HStack>
                        <Icon h="5" w="5" as={FiSettings} />
                        <Text>{t("accountSetting")}</Text>
                      </HStack>
                    </NextLink>
                  ) : (
                    <NextLink href="/signup">
                      <HStack>
                        <Icon h="5" w="5" as={FiSettings} />
                        <Text>{t("verify")}</Text>
                      </HStack>
                    </NextLink>
                  )}
                </PopoverBody>
                <PopoverFooter
                  onClick={signOutHandler}
                  cursor="pointer"
                  _hover={{ bg: "gray.100" }}
                >
                  <HStack>
                    {" "}
                    <Icon h="5" w="5" as={BiLogOut} />{" "}
                    <Text>{t("logout")}</Text>{" "}
                  </HStack>{" "}
                </PopoverFooter>
              </PopoverContent>
            </Popover>
          ) : (
            <NextLink href="/signup" passHref>
              <Button as="a" variant="ghost" aria-label="sign up">
                {t("signup")}
              </Button>
            </NextLink>
          )}
          {auth.currentUser ? <NotificationsList /> : null}
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
                {t("home")}
              </Button>
            </NextLink>
            <NextLink href="/chat" passHref>
              <Button as="a" variant="ghost" aria-label="chat" my="2" w="100%">
                {t("chat")}
              </Button>
            </NextLink>
            <NextLink href="/search" passHref>
              <Button
                as="a"
                variant="ghost"
                aria-label="search"
                my="2"
                w="100%"
              >
                {t("search")}
              </Button>
            </NextLink>
            <NextLink href="/about" passHref>
              <Button as="a" variant="ghost" aria-label="about" my="2" w="100%">
                {t("about")}
              </Button>
            </NextLink>
            {auth.currentUser ? (
              <Stack w="100%">
                <NextLink passHref href="/account">
                  <Button
                    as="a"
                    variant="ghost"
                    aria-label="account"
                    my="2"
                    w="100%"
                  >
                    {t("profile")}
                  </Button>
                </NextLink>
                <Button
                  as="a"
                  variant="ghost"
                  aria-label="log out"
                  my="2"
                  w="100%"
                  cursor="pointer"
                  onClick={signOutHandler}
                >
                  {t("logout")}
                </Button>
              </Stack>
            ) : (
              <NextLink passHref href="/signup">
                <Button
                  as="a"
                  variant="ghost"
                  aria-label="sign up"
                  my="2"
                  w="100%"
                >
                  {t("signup")}
                </Button>
              </NextLink>
            )}
          </Flex>
          <Center mt="4">
            <Text
              px="4"
              color="indigo"
              as="kbd"
              onClick={() => {
                changeLanguage("en");
              }}
            >
              English
            </Text>
            <Text
              px="4"
              color="indigo"
              as="kbd"
              onClick={() => {
                changeLanguage("ar");
              }}
            >
              Arabic
            </Text>
          </Center>
        </Flex>
      </Flex>
    </Flex>
  );
}
