import Image from "next/image";
import { BsHeartFill, BsHeart } from "react-icons/bs";
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  HStack,
  Button,
  Spacer,
  Icon,
  AvatarGroup,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";

export default function Index() {
  const [joinBtn, setJoinBtn] = useState(false);
  const [liked, setLiked] = useState(false);
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
          <HStack mb="2">
            <Heading color="gray.700" fontSize="2xl" fontFamily="body">
              Movies Project
            </Heading>
            <AvatarGroup size="sm" max="4">
              <Avatar name="Ryan Florence" src="https://bit.ly/ryan-florence" />
              <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />
              <Avatar name="Kent Dodds" src="https://bit.ly/kent-c-dodds" />
              <Avatar
                name="Prosper Otemuyiwa"
                src="https://bit.ly/prosper-baba"
              />
              <Avatar name="Christian Nwamba" src="https://bit.ly/code-beast" />
              <Avatar name="Christian Nwamba" src="https://bit.ly/code-beast" />
              <Avatar name="Christian Nwamba" src="https://bit.ly/code-beast" />
            </AvatarGroup>

            <Spacer />
            <Button rounded="15px" onClick={() => setJoinBtn(!joinBtn)}>
              {joinBtn ? "Joined" : "Join"}
            </Button>
          </HStack>

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
        <Stack>
          <HStack mb="2">
            <Avatar
              src="https://avatars0.githubusercontent.com/u/1164541?v=4"
              alt="Author"
            />
            <Stack direction="column" spacing="0" fontSize="sm">
              <Text fontWeight="600">Achim Rolle</Text>
              <Text color="gray.500">Content Creator, Web Developer</Text>
            </Stack>
            <Spacer />
            {liked ? (
              <Icon
                as={BsHeartFill}
                color="lightPurple"
                onClick={() => setLiked(!liked)}
              />
            ) : (
              <Icon
                as={BsHeart}
                color="lightPurple"
                onClick={() => setLiked(!liked)}
              />
            )}
            <Text color="lightPurple">32</Text>
          </HStack>
        </Stack>
      </Box>
    </Center>
  );
}
