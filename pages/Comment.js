import {
  Avatar,
  AvatarBadge,
  Stack,
  Text,
  VStack,
  Box,
  HStack,
  Button,
} from "@chakra-ui/react";
import { TiHeartOutline, TiArrowBackOutline } from "react-icons/ti";

function Comment() {
  const sampleComment = {
    name: "Dan Abrahmov",
    src: "https://bit.ly/dan-abramov",
    content: "That is great",
    likes: "56",
  };
  return (
    <Box
      bg="gray.300"
      w="30%"
      p={3}
      m={2}
      rounded="xl"
      position="absolute"
      border-radius="19px"
    >
      <VStack align="flex-start" spacing="1">
        <Stack direction="row" spacing={1}>
          <Avatar size="sm" src={sampleComment.src}>
            <AvatarBadge boxSize="1em" bg="green.500" />
          </Avatar>
          <Text fontSize={{ base: "13px", md: "13px" }} color="#3F3B3B">
            {sampleComment.name}
          </Text>
        </Stack>
        <Text
          fontSize={{ base: "12px", md: "12px" }}
          fontWeight="light"
          color="#5D6F88"
        >
          {sampleComment.content}{" "}
        </Text>
        <HStack spacing={1}>
          <TiHeartOutline color="#5D5FEF" />
          <Text
            color="#5D5FEF"
            border="none"
            bg="none"
            fontSize={{ base: "13px", md: "13px" }}
          >
            {sampleComment.likes}
          </Text>
          <TiArrowBackOutline color="#5D5FEF" />
          <Text
            color="#5D5FEF"
            border="none"
            bg="none"
            fontSize={{ base: "13px", md: "13px" }}
          >
            Reply
          </Text>
        </HStack>
      </VStack>
    </Box>
  );
}

export default Comment;
