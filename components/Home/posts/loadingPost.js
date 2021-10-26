import React from "react";
import {
  Box,
  Stack,
  Text,
  Image,
  HStack,
  IconButton,
  Badge,
  Avatar,
  LinkBox,
  LinkOverlay,
  Skeleton,
  SkeletonText,
  SkeletonCircle,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { FaHeart, FaPlus } from "react-icons/fa";
function LoadingPost({ image }) {
  return (
    <LinkBox bg="secondary.main" _hover={{ transform: "scale(1.01)" }}>
      <Stack
        spacing="0"
        h={{ md: "37.87rem", base: "30rem" }}
        maxH="37.875rem"
        maxW={{ md: "21.8rem", base: "auto" }}
        w={{ md: "21.8rem", base: "auto" }}
        borderRadius="lg"
      >
        (
        <Box borderTopRadius="lg" overflow="hidden" flexBasis="60%">
          <Skeleton boxSize="100%" />
        </Box>
        <Stack px="4" py="2" flexBasis="40%" bg="white">
          <HStack justify="space-between">
            <LinkOverlay cursor="pointer">
              <SkeletonText noOfLines="1" />
            </LinkOverlay>
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
            <SkeletonText noOfLines={2} />
            <Text fontWeight="light" fontSize="12px">
              <SkeletonText noOfLines={1} />
            </Text>
            <HStack>
              <SkeletonText noOfLines={1} />
            </HStack>
            <HStack justify="space-between">
              <HStack _hover={{ opacity: "0.8" }}>
                <SkeletonCircle />
                <SkeletonText noOfLines={1} />
              </HStack>
              <HStack>
                <SkeletonText noOfLines={1} />
                <IconButton
                  // TODO: check if the current user.likes array includes the postId if false then the icon color will be white
                  // eslint-disable-next-line react/no-children-prop
                  children={<FaHeart size="19" color="red" />}
                  bg="#4D7AB6"
                  size="sm"
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

export default LoadingPost;
