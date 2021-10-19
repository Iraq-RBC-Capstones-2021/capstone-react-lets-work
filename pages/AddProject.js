import {
  Box,
  Heading,
  Input,
  HStack,
  Stack,
  Button,
  useToast,
  VStack,
  IconButton,
} from "@chakra-ui/react";
import { FiSend, FiTrash2, FiImage, FiLink2 } from "react-icons/fi";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import React from "react";
import ChakraInput from "../components/Shared/ChakraInput";

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
    <Formik
      initialValues={{ projectName: "", description: "", tags: "" }}
      validationSchema={Yup.object({
        projectName: Yup.string()
          .max(15, "Must be 15 characters or less")
          .required("Required"),
        description: Yup.string()
          .max(200, "Must be 200 characters or less")
          .required("Required"),
        tags: Yup.string().email("Invalid email address").required("Required"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      <Form>
        <Stack
          align="center"
          justify="center"
          bg="secondary.main"
          height="70vh"
        >
          <Box
            mx={{ base: "3" }}
            bg="white"
            color="blue.300"
            borderRadius="xl"
            p={["5", "6", "8"]}
            h={{ base: "100%", md: "auto" }}
            w={{ md: "auto", base: "100%" }}
          >
            <Stack spacing={3}>
              <VStack
                alignContent="space-evenly"
                align="flex-start"
                justify="flex-start"
              >
                <Heading
                  as="h5"
                  fontSize={{ base: "22px", md: "18px" }}
                  color="black"
                >
                  New Project/idea
                </Heading>
                {/* <Input
                  placeholder="Project name"
                  variant="flushed"
                  color="blue.500"
                  fontSize={{ base: "18px", md: "15px" }}
                /> */}
                <ChakraInput
                  placeholder="Project name"
                  variant="flushed"
                  color="blue.500"
                  fontSize={{ base: "18px", md: "15px" }}
                  name="projectName"
                  w="100%"
                />
                {/* <Input
                  placeholder="Description"
                  variant="flushed"
                  fontSize={{ base: "18px", md: "15px" }}
                /> */}
                <ChakraInput
                  placeholder="Description"
                  variant="flushed"
                  fontSize={{ base: "18px", md: "15px" }}
                  name="description"
                  w="100%"
                />
              </VStack>
              <VStack align="flex-start" justify="flex-start">
                <Heading
                  as="h5"
                  fontSize={{ base: "22px", md: "18px" }}
                  color="black"
                >
                  Tags
                </Heading>
                <Input
                  placeholder="Write your categories here.."
                  variant="flushed"
                  fontSize={{ base: "18px", md: "15px" }}
                />

                <HStack wrap="wrap" spacing={3} flexShrink={0}>
                  {tags.map((tag) => {
                    return (
                      <Button
                        fontSize={{ base: "15px", md: "16px" }}
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

              <Stack isInline spacing={2} wrap="wrap">
                <IconButton icon={<FiImage />} />
                <IconButton icon={<FiLink2 />} />
                <IconButton icon={<FiTrash2 />} />
                <IconButton icon={<FiSend />} type="submit" />
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Form>
    </Formik>
  );
}
