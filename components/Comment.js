import { Avatar, AvatarBadge, Text, VStack, Box, Flex } from "@chakra-ui/react";
import { TiHeartOutline, TiArrowBackOutline } from "react-icons/ti";

function Comment({ sampleComment }) {
  return (
    <Box
      bg="gray.300"
      w={["90%", "90%", "50%", "35%"]}
      p="2"
      m="5"
      rounded="xl"
      border-radius="10px"
    >
      <VStack align="flex-start">
        <Flex wrap="wrap" justify="space-between" align="center">
          <Avatar size="sm" src={sampleComment.src} mr="2">
            <AvatarBadge boxSize="1em" bg="green.500" />
          </Avatar>
          <Text
            fontSize={{ base: "10px", md: "13px" }}
            color="#3F3B3B"
            fontWeight="bold"
          >
            {sampleComment.name}
          </Text>
        </Flex>
        <Text
          fontSize={{ base: "10px", md: "12px" }}
          fontWeight="light"
          color="#5D6F88"
          paddingX="10px"
        >
          {sampleComment.content}{" "}
        </Text>
        <Flex align="flex-start" justify="space-between">
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
        </Flex>
      </VStack>
    </Box>
  );
}

export default Comment;
