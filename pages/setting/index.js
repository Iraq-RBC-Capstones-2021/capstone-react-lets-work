import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  Button,
  Wrap,
  WrapItem,
  Flex,
} from "@chakra-ui/react";
import ChakraInput from "../../components/Shared/ChakraInput";
import { Formik, Form } from "formik";
import { useState } from "react";
import { useRouter as router } from "next/dist/client/router";
import { useTranslation } from "next-i18next";
import * as Yup from "yup";

export default function Index() {
  const { t } = useTranslation("setting");
  const initialValues = {
    name: "",
    username: "",
    facebook: "",
    instagram: "",
    youtube: "",
    linkedin: "",
    email: "",
    bio: "",
    about: "",
    about: "",
    skillsAndHobbies: "",
    interests: "",
  };
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Please enter your name"),
    username: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Please enter a valid username"),
    facebook: Yup.string().url(),
    instagram: Yup.string().url(),
    youtube: Yup.string().url(),
    linkedin: Yup.string().url(),
    email: Yup.string().email("Invalid email").required("Required"),
    bio: Yup.string().min(5, "Too Short!").max(100, "Too Long!"),
    about: Yup.string().min(5, "Too Short!").max(300, "Too Long!"),
    skillsAndHobbies: Yup.string().min(2, "Too Short!").max(100, "Too Long!"),
    interests: Yup.string().min(2, "Too Short!").max(100, "Too Long!"),
  });
  return (
    <Center p="6" dir={router().locale === "ar" ? "rtl" : "ltr"}>
      <Stack>
        <Heading>Account Setting</Heading>
        <Box w="85vw" bg="white" rounded="15px" p="6" overflow="hidden">
          <Wrap>
            <WrapItem>
              <Avatar
                size="2xl"
                name="Segun Adebayo"
                src="https://bit.ly/sage-adebayo"
              />
            </WrapItem>
            <WrapItem alignItems="center">
              <Button
                rounded="5px"
                backgroundColor="lightPurple"
                color="white"
                _hover={{ bg: "darkPurple" }}
              >
                Upload New Photo
              </Button>
            </WrapItem>
          </Wrap>
          {/* there is alot of repetative code here inside the Formik, this will be fixed later */}
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
          >
            {(Formik) => {
              return (
                <Form>
                  <Box mt="6" display={["block", "block", "flex", "flex"]}>
                    <Box w="50vw">
                      <Wrap>
                        <WrapItem alignItems="center" w="10vw">
                          <Text>Name:</Text>
                        </WrapItem>
                        <WrapItem>
                          <ChakraInput size="lg" type="text" name="name" />
                        </WrapItem>
                      </Wrap>

                      <Wrap>
                        <WrapItem alignItems="center" w="10vw">
                          <Text>Username:</Text>
                        </WrapItem>
                        <WrapItem>
                          <ChakraInput size="lg" type="text" name="username" />
                        </WrapItem>
                      </Wrap>
                      <Wrap>
                        <WrapItem alignItems="center" w="10vw">
                          <Text>Email:</Text>
                        </WrapItem>
                        <WrapItem>
                          <ChakraInput size="lg" type="text" name="email" />
                        </WrapItem>
                      </Wrap>
                    </Box>
                    <Box w="50vw">
                      <Wrap>
                        <WrapItem alignItems="center" w="10vw">
                          <Text>Facebook:</Text>
                        </WrapItem>
                        <WrapItem>
                          <ChakraInput size="lg" type="text" name="facebook" />
                        </WrapItem>
                      </Wrap>
                      <Wrap>
                        <WrapItem alignItems="center" w="10vw">
                          <Text>Instagram:</Text>
                        </WrapItem>
                        <WrapItem>
                          <ChakraInput size="lg" type="text" name="instagram" />
                        </WrapItem>
                      </Wrap>
                      <Wrap>
                        <WrapItem alignItems="center" w="10vw">
                          <Text>Youtube:</Text>
                        </WrapItem>
                        <WrapItem>
                          <ChakraInput size="lg" type="text" name="youtube" />
                        </WrapItem>
                      </Wrap>
                      <Wrap>
                        <WrapItem alignItems="center" w="10vw">
                          <Text>LinkedIn:</Text>
                        </WrapItem>
                        <WrapItem>
                          <ChakraInput size="lg" type="text" name="linkedin" />
                        </WrapItem>
                      </Wrap>
                    </Box>
                  </Box>
                  <Box w="100vw"></Box>
                </Form>
              );
            }}
          </Formik>
        </Box>
      </Stack>
    </Center>
  );
}
