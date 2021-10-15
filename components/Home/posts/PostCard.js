import React from "react";
import NextLink from "next/link";
import {
  Box,
  Flex,
  Stack,
  Text,
  Image,
  Center,
  HStack,
  IconButton,
  Badge,
  Avatar,
  LinkBox,
  LinkOverlay,
  Button,
  Skeleton,
} from "@chakra-ui/react";
import { FaPlus, FaHeart } from "react-icons/fa";
function PostCard({
  createdAt,
  description,
  title,
  userId,
  likes,
  tags,
  imageURL,
  postId,
}) {
  //TODO: fetch user details from userId
  const sampleUser = {
    username: "Bruce Lee",
    imageURL: "https://randomuser.me/api/portraits/thumb/men/75.jpg",
  };
  function handleLike() {
    //TODO: send a post request with the postId to /users/${userId}/likedPosts
    //TODO: send the currentUser uid to /posts/${postId}/likes
  }
  return (
    <LinkBox bg="secondary.main" _hover={{ transform: "scale(1.01)" }}>
      <Stack
        spacing="0"
        h={imageURL ? { md: "37.87rem", base: "30rem" } : "15.1rem"}
        maxH="37.875rem"
        maxW={{ md: "21.8rem", base: "auto" }}
        borderRadius="lg"
      >
        {imageURL && (
          <Box borderTopRadius="lg" overflow="hidden" flexBasis="60%">
            <Image
              alt={title}
              objectFit="cover"
              w="100%"
              h="100%"
              src={imageURL}
              fallback={<Skeleton boxSize="100%" />}
            />
          </Box>
        )}
        <Stack px="4" py="2" flexBasis="40%" bg="white">
          <HStack justify="space-between">
            <NextLink href={`projects/${postId}`}>
              <LinkOverlay cursor="pointer">
                <Text noOfLines={1} fontSize="30px">
                  {title}
                </Text>{" "}
              </LinkOverlay>
            </NextLink>
            <IconButton // eslint-disable-next-line react/no-children-prop
              children={<FaPlus size="24" color="white" />}
              bg="primary.main"
              size="sm"
              borderRadius="50%"
              _hover={{ bg: "primary.darker" }}
              _active={{ bg: "primary.lighter" }}
            />
          </HStack>
          <Stack>
            <Text fontWeight="light" noOfLines={2}>
              {description}
            </Text>
            <Text fontWeight="light" fontSize="12px">
              {`posted: ${createdAt}`}
            </Text>
            <HStack>
              {tags.map((tag) => (
                <Badge
                  textTransform="auto"
                  py="2"
                  px="3"
                  borderRadius="2xl"
                  bg="#D6EAF8"
                  key={tag}
                >
                  {" "}
                  {tag}{" "}
                </Badge>
              ))}
            </HStack>
            <HStack justify="space-between">
              <NextLink href={`account/${userId}`}>
                <HStack _hover={{ opacity: "0.8" }}>
                  <Avatar
                    cursor={"pointer"}
                    size="sm"
                    src="https://randomuser.me/api/portraits/thumb/men/75.jpg"
                  />
                  <Text> {sampleUser.username} </Text>
                </HStack>
              </NextLink>
              <HStack>
                <Text> {likes.length} </Text>
                <IconButton
                  // TODO: check if the current user.likes array includes the postId if false then the icon color will be white
                  // eslint-disable-next-line react/no-children-prop
                  children={<FaHeart size="19" color="red" />}
                  bg="#4D7AB6"
                  size="sm"
                  onClick={handleLike}
                  borderRadius="50%"
                  _hover={{ bg: "#456da3" }}
                  _active={{ bg: "#5e87bd" }}
                />
              </HStack>
            </HStack>
          </Stack>
        </Stack>
      </Stack>
    </LinkBox>
  );
}

export default PostCard;
