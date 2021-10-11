import { Box, Link, Image, Text, HStack, Flex } from "@chakra-ui/react";
import { Image as NextImage } from "next/image";

const IdeaCard = ({ ideaImage, title, userImage, username, date }) => {
  return (
    <Link textDecoration="none" _hover={{ textDecoration: "none" }}>
      <Box
        bg="white"
        borderRadius="lg"
        maxW="300px"
        boxShadow="md"
        transition="0.3s ease-in-out"
        _hover={{
          transform: "scale(1.05)",
          boxShadow: "lg",
        }}
      >
        <Box overflow="hidden" borderTopRadius="lg">
          <Image
            as={NextImage}
            src={ideaImage}
            alt={title}
            objectFit="contain"
            width="100%"
          />
        </Box>
        <Flex pl={4} mb={4} direction="column">
          <Text
            fontSize="12px"
            color="#5D6F88"
            fontWeight="400"
            mt="24px"
            mb="8px"
            alignSelf="start"
          >
            {date}
          </Text>
          <Text fontSize="20px" marginTop="2" alignSelf="start">
            {title}
          </Text>
          <HStack marginTop="2" spacing="2" display="flex" alignSelf="start">
            <Image
              borderRadius="full"
              boxSize="40px"
              src={userImage}
              alt={username}
              height="24px"
            />
            <Text fontSize="12px" color="#5D6F88" py={4}>
              {username}
            </Text>
          </HStack>
        </Flex>
      </Box>
    </Link>
  );
};

export default IdeaCard;
