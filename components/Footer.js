import {
  Box,
  Stack,
  HStack,
  Flex,
  Heading,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Text,
  Textarea,
  Input,
  Button,
  InputGroup,
  FormControl,
} from "@chakra-ui/react";
import { PhoneIcon, AtSignIcon } from "@chakra-ui/icons";
import React, { useRef, useState, useEffect } from "react";
import { useToast } from "@chakra-ui/toast";
import emailjs from "emailjs-com";
import { Formik, Form } from "formik";
import ChakraInput from "./Shared/ChakraInput";
import * as Yup from "yup";

function Footer() {
  const form = useRef();
  const [status, setStatus] = useState("");
  const toast = useToast();
  useEffect(() => {
    if (status === "error") {
      toast({
        title: "Failed to send email",
        position: "top",
        duration: "3000",
        status: "error",
        variant: "subtle",
      });
      setStatus("");
    }
    if (status === "success") {
      toast({
        title: "Email sent",
        position: "top",
        duration: "3000",
        status: "success",
        variant: "subtle",
      });
      setStatus("");
    }
  }, [status, toast]);
  const sendEmail = (values, onSubmitProps) => {
    emailjs
      .send(
        "service_th0e88m",
        "template_rd6cisi",
        values,
        "user_KhJ47OC9g6wyXA1O4IWuR"
      )
      .then(
        (result) => {
          setStatus("success");
        },
        (error) => {
          setStatus("error");
        }
      );
    onSubmitProps.resetForm();
  };

  return (
    <Flex
      bg="#1C3341"
      color="white"
      spacing="18px"
      justify="space-around"
      direction={["column", "column", "row", "row"]}
      align={{ base: "center", md: "flex-start" }}
    >
      <Box py="40px" display={{ base: "flex", md: "auto" }}>
        <Stack>
          <Heading paddingBottom="25px" fontSize={{ base: "35px", md: "30px" }}>
            FAQ’s
          </Heading>
          <Accordion allowToggle spacing={4}>
            <AccordionItem border="none">
              <h2>
                <AccordionButton>
                  <AccordionIcon />
                  <Box flexShrink={2} textAlign="left">
                    How Are We Different?
                  </Box>
                </AccordionButton>
              </h2>
              <AccordionPanel pb={2}>we are Different</AccordionPanel>
            </AccordionItem>

            <AccordionItem border="none">
              <h2>
                <AccordionButton>
                  <AccordionIcon />
                  <Box flexShrink={2} textAlign="left">
                    Is This Platform Totally Free?
                  </Box>
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>Yes, it is Totally free</AccordionPanel>
            </AccordionItem>
            <AccordionItem border="none">
              <h2>
                <AccordionButton>
                  <AccordionIcon />
                  <Box flexShrink={2} textAlign="left">
                    What Services Do We Provide?
                  </Box>
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>Lots of Services</AccordionPanel>
            </AccordionItem>
            <AccordionItem border="none">
              <h2>
                <AccordionButton>
                  <AccordionIcon Reverse />
                  <Box flexShrink={2} textAlign="left">
                    Where Are We Located?
                  </Box>
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>Lots of Services</AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Stack>
      </Box>
      <Box py="40px">
        <Stack>
          <Heading paddingBottom="25px" fontSize={{ base: "35px", md: "30px" }}>
            Lets Work
          </Heading>
          <HStack spacing={3}>
            <PhoneIcon />
            <Text>+964 750 000 00 00</Text>
          </HStack>
          <HStack spacing={3}>
            <AtSignIcon />
            <Text>letswork@gmail.com</Text>
          </HStack>
        </Stack>
      </Box>
      <Box py="40px">
        <Stack>
          <Heading fontSize={{ base: "35px", md: "30px" }}>Contact us</Heading>
          <Text>Send us messages</Text>
          <InputGroup w={{ base: "15rem", lg: "auto" }}>
            <Formik
              initialValues={{ user_name: "", email: "", message: "" }}
              validationSchema={Yup.object({
                user_name: Yup.string()
                  .max(15, "Must be 15 characters or less")
                  .required("Required"),
                message: Yup.string()
                  .max(200, "Must be 200 characters or less")
                  .required("Required"),
                email: Yup.string()
                  .email("Please enter a valid email")
                  .required("Please enter your email address"),
              })}
              onSubmit={sendEmail}
            >
              <Form>
                <Stack
                  width={("sm", "sm", "sm", "xs")}
                  display={["flow", "flow", "flex"]}
                >
                  <ChakraInput
                    color="black"
                    variant="primary"
                    placeholder="Name"
                    type="text"
                    name="user_name"
                  />
                  <ChakraInput
                    color="black"
                    variant="primary"
                    placeholder="Email"
                    type="email"
                    name="email"
                  />
                  <ChakraInput
                    color="black"
                    as={Textarea}
                    variant="primary"
                    placeholder="Your Message"
                    name="message"
                  />
                  <Button
                    bg="blue.400"
                    variant="primary"
                    width="100%"
                    type="submit"
                    value="Send"
                  >
                    Submit
                  </Button>
                </Stack>
              </Form>
            </Formik>
          </InputGroup>
        </Stack>
      </Box>
    </Flex>
  );
}

export default Footer;
