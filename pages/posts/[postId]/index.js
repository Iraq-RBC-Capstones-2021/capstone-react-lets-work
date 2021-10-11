import Image from "next/image";
import { Box, Center, Heading, Text, Stack, Avatar } from "@chakra-ui/react";

export default function index() {
  return (
    <Center p="6">
      <Box
        maxW="780px"
        w="full"
        bg="white"
        rounded="15px"
        p="6"
        overflow="hidden"
      >
        <Stack>
          <Heading color="gray.700" fontSize="2xl" fontFamily="body">
            Rocket Project
          </Heading>
          <Text color={"gray.500"}>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum. Lorem ipsum dolor sit amet consectetur adipisicing
          </Text>
        </Stack>
        <Box height="40vw" maxH="600px" mb="6" pos="relative">
          <Image src="/images/movies-project.svg" alt="" layout="fill" />
        </Box>
        <Stack mt="6" direction="row" spacing="4" align="center">
          <Avatar
            src="https://avatars0.githubusercontent.com/u/1164541?v=4"
            alt="Author"
          />
          <Stack direction={"column"} spacing={0} fontSize={"sm"}>
            <Text fontWeight={600}>Achim Rolle</Text>
            <Text color={"gray.500"}>Content Creator, Web Developer</Text>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
}
