import {
  Box,
  Heading,
  Input,
  Flex,
  Stack,
  Button,
  useToast,
  VStack,
  IconButton,
} from "@chakra-ui/react";
import { CgImage, CgLink, CgTrash } from "react-icons/cg";
import { AiOutlineSend } from "React-icons/ai";

import React from "react";

export default function AddProject() {
  const toast = useToast();
  const toastIdRef = React.useRef();
  const tags = ["Dev", "Design", "Html", "CSS"];

  function close() {
    if (toastIdRef.current) {
      toast.close(toastIdRef.current);
    }
  }

  function closeAll() {
    // you may optionally pass an object of positions to exclusively close
    // keeping other positions opened
    // e.g. `{ positions: ['bottom'] }`
    toast.closeAll();
  }

  function addToast() {
    toastIdRef.current = toast({ description: "tag added" });
  }
  return (
    <Box
      marginY="50px"
      marginX={["50px", "300px"]}
      bg="gray.200"
      color="blue.300"
      maxW={["100%", "50%"]}
      borderRadius="xl"
      padding={["10px", "45px"]}
    >
      <Stack spacing={3}>
        <Flex align="flex-start" display={["column", "row"]}>
          <Heading
            as="h5"
            fontSize={{ base: "13px", md: "15px" }}
            color="black"
          >
            New Project/idea
          </Heading>
          <Input
            placeholder="Project name"
            variant="flushed"
            color="blue.500"
          />
          <Input placeholder="Description" variant="flushed" />
        </Flex>
        <Flex align="flex-start" display={["column", "row"]}>
          <Heading
            as="h5"
            fontSize={{ base: "13px", md: "15px" }}
            color="black"
          >
            Tags
          </Heading>
          <Input placeholder="Write your categories here.." variant="flushed" />

          <Flex wrap="wrap">
            {tags.map((tag) => (
              <Button
                onClick={addToast}
                type="button"
                variant="subtle"
                key={tag}
                m="1"
              >
                {tag}
              </Button>
            ))}
          </Flex>
        </Flex>
        <Flex justify="space-around" display={["column", "row"]}>
          <IconButton icon={<CgImage />} bg="none" />
          <IconButton icon={<CgLink />} bg="none" />
          <IconButton icon={<CgTrash />} bg="none" />
          <IconButton icon={<AiOutlineSend />} bg="none" />
        </Flex>
      </Stack>
    </Box>
  );
}
