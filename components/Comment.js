import { Avatar, AvatarBadge, Stack, Text } from "@chakra-ui/react";
import React from "react";

function Comment() {
  return (
    <Stack direction="row" spacing={4}>
      <Avatar>
        <AvatarBadge boxSize="1.25em" bg="green.500" />
      </Avatar>
    </Stack>
  );
}

export default Comment;
