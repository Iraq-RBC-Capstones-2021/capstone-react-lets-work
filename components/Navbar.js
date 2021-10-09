import { useState } from "react";
import { Flex, Button, IconButton } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, BellIcon } from "@chakra-ui/icons";
import NextLink from "next/link";

export default function Navbar() {
  const [display, setDisplay] = useState("none");
  const [signedIn, setSignedIn] = useState(false);
  const authenticate = () => {
    setSignedIn(!signedIn);
  };
  return (
    <Flex justify="end" bgColor="offWhite">
      <Flex display={["flex", "flex", "none", "none"]} mr="auto">
        <IconButton
          mt="2"
          ml="2"
          aria-label="Close menu"
          size="lg"
          icon={<BellIcon />}
        />
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
          <NextLink href="#" passHref>
            <Button
              as="a"
              variant="ghost"
              aria-label="Home"
              my="2"
              w="100%"
              ml="14"
              mr="2"
              onClick={authenticate}
            >
              {signedIn ? "Account" : "Sign Up"}
            </Button>
          </NextLink>
          <IconButton
            aria-label="open menu"
            bgColor="transparent"
            size="md"
            my="2"
            mr="2"
            icon={<BellIcon />}
          />
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
  );
}
