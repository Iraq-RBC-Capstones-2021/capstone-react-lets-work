import React from "react";
import PostCard from "./PostCard";
import { Container, Flex, Box, Text } from "@chakra-ui/react";
import LoadingPost from "./loadingPost";
function PostList({ posts, list, status, users }) {
  return (
    <Container mt="10" maxWidth="container.xl">
      <Text color="primary.main" fontWeight="bold" fontSize="5xl">
        {" "}
        {list}{" "}
      </Text>
      <Flex wrap="wrap" direction={{ base: "column", md: "row" }}>
        {posts.map((post) => {
          const user = users.filter((user) => user.id === post.userId);
          return (
            <Box mx={{ md: "2", lg: "8" }} mt="10" key={post.id}>
              <PostCard user={user[0]} {...post} post={post} />
            </Box>
          );
        })}
        {status === "loading" &&
          [1, 2, 3].map((key) => (
            <Box mt="10" mx={{ md: "2", lg: "8" }} key={key}>
              {" "}
              <LoadingPost />{" "}
            </Box>
          ))}
      </Flex>
    </Container>
  );
}

export default PostList;
