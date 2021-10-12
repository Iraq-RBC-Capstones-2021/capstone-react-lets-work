import React from "react";
import PostCard from "./PostCard";
import { Container, Flex, Box } from "@chakra-ui/react";
function PostList({ posts }) {
  return (
    <Container maxWidth="container.xl">
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
