import { useState } from "react";
import { Flex, Button, IconButton } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import NextLink from "next/link";

export default function Navbar() {
  const [display, setDisplay] = useState("none");
  return (
    <Flex justify="end">
      <Flex top="1rem" right="1rem" align="center">
        <Flex display={["none", "none", "flex", "flex"]}>
          <NextLink href="/" passHref>
            <Button as="a" variant="ghost" aria-label="Home" my="5" w="100%">
              Home
            </Button>
          </NextLink>
          <NextLink href="/chat" passHref>
            <Button as="a" variant="ghost" aria-label="Home" my="5" w="100%">
              Chat
            </Button>
          </NextLink>
          <NextLink href="/search" passHref>
            <Button as="a" variant="ghost" aria-label="Home" my="5" w="100%">
              Search
            </Button>
          </NextLink>
          <NextLink href="/about" passHref>
            <Button as="a" variant="ghost" aria-label="Home" my="5" w="100%">
              About
            </Button>
          </NextLink>
        </Flex>
        <IconButton
          aria-label="open menu"
          size="lg"
          mr="2"
          mt="2"
          icon={<HamburgerIcon />}
          display={["flex", "flex", "none", "none"]}
          onClick={() => setDisplay("flex")}
        />
      </Flex>
      <Flex
        w="100vw"
        bgColor="gray.200"
        zIndex={20}
        h="100vw"
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
          flexDir="column"
          align="center"
          onClick={() => setDisplay("none")}
        >
          <NextLink href="/" passHref>
            <Button as="a" variant="ghost" aria-label="Home" my="5" w="100%">
              Home
            </Button>
          </NextLink>
          <NextLink href="/chat" passHref>
            <Button as="a" variant="ghost" aria-label="Home" my="5" w="100%">
              Chat
            </Button>
          </NextLink>
          <NextLink href="/search" passHref>
            <Button as="a" variant="ghost" aria-label="Home" my="5" w="100%">
              Search
            </Button>
          </NextLink>
          <NextLink href="/about" passHref>
            <Button as="a" variant="ghost" aria-label="Home" my="5" w="100%">
              About
            </Button>
          </NextLink>
        </Flex>
      </Flex>
    </Flex>
  );
}
