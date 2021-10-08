import { useState } from "react";
import { Flex, Button, IconButton } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import NextLink from "next/link";

export default function Navbar() {
  return (
    <Flex>
      <Flex pos="fixed" top="1rem" right="1rem" align="center">
        <Flex display={["none", "none", "flex", "flex"]}>
          <NextLink href="/" passHref>
            <Button as="a" variant="ghost" aria-label="Home" my={5} w="100%">
              Home
            </Button>
          </NextLink>
          <NextLink href="/chat" passHref>
            <Button as="a" variant="ghost" aria-label="Home" my={5} w="100%">
              Chat
            </Button>
          </NextLink>
          <NextLink href="/search" passHref>
            <Button as="a" variant="ghost" aria-label="Home" my={5} w="100%">
              Search
            </Button>
          </NextLink>
          <NextLink href="/about" passHref>
            <Button as="a" variant="ghost" aria-label="Home" my={5} w="100%">
              About
            </Button>
          </NextLink>
        </Flex>
        <IconButton
          aria-label="open menu"
          size="lg"
          mr={2}
          icon={<HamburgerIcon />}
          display={["flex", "flex", "none", "none"]}
        />
      </Flex>
    </Flex>
  );
}
