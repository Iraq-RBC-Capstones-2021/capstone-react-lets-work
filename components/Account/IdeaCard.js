import { Box, Link, Image, Text, HStack, Flex } from "@chakra-ui/react";
import { Image as NextImage } from "next/image";
import { Link as NextLink } from "next/link";

const IdeaCard = ({ ideaImage, title, userImage, username, date, ideaId }) => {
  return (
    <Link
      as={NextLink}
      textDecoration="none"
      _hover={{ textDecoration: "none" }}
      href={`/posts/${ideaId}`}
      _focus={{ boxShadow: "none" }}
    >
      <Box
        bg="white"
        borderRadius="lg"
        boxShadow="md"
        transition="0.3s ease-in-out"
        _hover={{
          transform: "scale(1.05)",
          boxShadow: "lg",
        }}
      >
        <Box
          overflow="hidden"
          borderTopRadius="lg"
          height="218px"
          width="300px"
        >
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
            <Box overflow="hidden" height="24px" width="24px">
              <Image
                borderRadius="50%"
                src={userImage}
                alt={username}
                height="24px"
                objectFit="cover"
                width="24px"
              />
            </Box>
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
