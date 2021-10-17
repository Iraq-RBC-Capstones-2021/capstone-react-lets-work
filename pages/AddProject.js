import {
  Box,
  Heading,
  Input,
  HStack,
  Tag,
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
  const tags = [
    "Dev",
    "Design",
    "Javascript",
    "C++",
    "Design",
    "Graphic",
    "Java",
  ];

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
    <Stack align="center" justify="center" bg="secondary.main" height="93vh">
      <Box
        mx={{ base: "3" }}
        bg="white"
        color="blue.300"
        borderRadius="xl"
        p={{ md: "8" }}
        h={{ base: "100%", md: "auto" }}
        w={{ md: "auto", base: "100%" }}
      >
        <Stack spacing={3}>
          <VStack
            alignContent="space-evenly"
            spacing={5}
            align="flex-start"
            justify="flex-start"
          >
            <Heading
              as="h5"
              fontSize={{ base: "30px", md: "15px" }}
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
          </VStack>
          <VStack spacing={5} align="flex-start" justify="flex-start">
            <Heading
              as="h5"
              fontSize={{ base: "30px", md: "15px" }}
              color="black"
            >
              Tags
            </Heading>
            <Input
              placeholder="Write your categories here.."
              variant="flushed"
            />

            <HStack wrap="wrap" spacing={3} flexShrink={0}>
              {tags.map((tag) => {
                return (
                  <Button
                    key={tag}
                    onClick={addToast}
                    type="button"
                    variant="secondary.main"
                  >
                    {tag}
                  </Button>
                );
              })}
            </HStack>
          </VStack>

          <Stack isInline spacing={2}>
            <IconButton icon={<CgImage />} />
            <IconButton icon={<CgLink />} />
            <IconButton icon={<CgTrash />} />
            <IconButton icon={<AiOutlineSend />} />
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
}
