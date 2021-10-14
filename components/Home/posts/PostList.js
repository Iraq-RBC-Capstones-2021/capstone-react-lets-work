import React from "react";
import PostCard from "./PostCard";
import { Container, Flex, Box, Text } from "@chakra-ui/react";
function PostList({ posts, list }) {
  return (
    <Container mt="10" maxWidth="container.xl">
      <Text color="primary.main" fontWeight="bold" fontSize="5xl">
        {" "}
        {list}{" "}
      </Text>
      <Flex
        wrap="wrap"
        direction={{ base: "column", md: "row" }}
        justify="space-evenly"
      >
        {posts.map((post) => (
          <Box mt="10" key={post.id}>
            <PostCard {...post} key={post.id} />
          </Box>
        ))}
      </Flex>
    </Container>
  );
}

export default PostList;
