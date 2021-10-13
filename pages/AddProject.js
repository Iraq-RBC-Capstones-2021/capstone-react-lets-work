import {
  Box,
  Heading,
  Input,
  Tag,
  Stack,
  Button,
  useToast,
} from "@chakra-ui/react";
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
    <Box
      marginY="50px"
      marginX="285px"
      bg="blue.900"
      color="white"
      maxW="xl"
      borderWidth="1px"
      borderRadius="xl"
      overflow="hidden"
      padding="45px"
    >
      <Stack>
        <Heading>New Project/idea</Heading>
        <Input placeholder="Project name" variant="flushed" color="blue.500" />
        <Input placeholder="Description" variant="flushed" />
        <Heading>Tags</Heading>
        <Input placeholder="Write your categories here.." variant="flushed" />
        <Stack isInline spacing={2}>
          <Button onClick={addToast} type="button" variant="outline">
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
        </Stack>
      </Stack>
    </Box>
  );
}
