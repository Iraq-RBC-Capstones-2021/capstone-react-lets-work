import {
  Box,
  Heading,
  Input,
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
    <Stack bg="gray.300" display={["flex", "flow"]} height="100%">
      <Box
        marginY="50px"
        marginX="300px"
        bg="white"
        color="blue.300"
        maxW="50%"
        borderRadius="xl"
        padding="45px"
      >
        <Stack spacing={3}>
          <VStack alignContent="space-evenly" spacing={5}>
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
          <VStack spacing={5}>
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

            <Stack isInline spacing={2} flexShrink={0}>
              <Button onClick={addToast} type="button" variant="secondary.main">
                Dev
              </Button>

              <Button onClick={addToast} type="button" variant="outline">
                JavaScript
              </Button>

              <Button onClick={addToast} type="button" variant="outline">
                C++
              </Button>
              <Button onClick={addToast} type="button" variant="outline">
                Design
              </Button>
              <Button onClick={addToast} type="button" variant="outline">
                Graphic
              </Button>
              <Button onClick={addToast} type="button" variant="outline">
                Graphic
              </Button>
              <Button onClick={addToast} type="button" variant="outline">
                XD
              </Button>
            </Stack>
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
