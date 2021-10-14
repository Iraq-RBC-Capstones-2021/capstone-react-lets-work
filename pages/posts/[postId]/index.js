import Image from "next/image";
import { BsHeartFill, BsHeart } from "react-icons/bs";
import AvatarCollection from "../../../components/AvatarCollection";
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
            <Spacer />
            <Button rounded="15px" onClick={() => setJoinBtn(!joinBtn)}>
              {joinBtn ? "Joined" : "Join"}
            </Button>
          </HStack>
          <AvatarCollection users={usersDummyData} />

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

const usersDummyData = [
  { name: "Dan Abrahamov", source: "https://bit.ly/ryan-florence" },
  { name: "Haidar Altufaily", source: "https://bit.ly/kent-c-dodds" },
  { name: "Esraa Yareb", source: "https://bit.ly/sage-adebayo" },
  { name: "Nora Yaqub", source: "https://bit.ly/code-beast" },
  { name: "Aryan Majeed", source: "https://bit.ly/ryan-florence" },
  { name: "Karim Benzema", source: "https://bit.ly/kent-c-dodds" },
];
