import { Box, Flex, Button, Text, Stack, Link, HStack } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import NextLink from "next/link";
import * as Yup from "yup";
import { BiEnvelope, BiLock } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa";
import Image from "next/image";
import ChakraInput from "../Shared/ChakraInput";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/dist/client/router";
function SignUp() {
  const { t } = useTranslation("form");
  const { locale } = useRouter();
  const initialValues = {
    email: "",
    username: "",
    password: "",
    passConfirm: "",
  };
  const validationSchema = Yup.object({
    username: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Please enter your name"),
    email: Yup.string()
      .email("Please enter a valid email")
      .required("Please enter your email address"),
    password: Yup.string()
      .required("Please enter your password")
      .min(8, "Password should be 8 chars minimum.")
      .matches(/[a-zA-Z]/, "Password must contain a letter atleast")
      .matches(/[0-9]/, "Password must contain a number atleast "),
    passConfirm: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Please confirm your password"),
  });
  const onSubmit = (value, onSubmitProps) => {
    const userCredentials = {
      email: value.email.trim(),
      username: value.username.trim(),
      password: value.password.trim(),
    };
    onSubmitProps.resetForm();
    //TODO: send a sign up request with the userCredentials.
  };
  return (
    <Flex
      dir={locale === "ar" ? "rtl" : "ltr"}
      width="full"
      h={{ md: "44rem", base: "100vh" }}
      justify="space-around"
      bg="#F9F9F9"
    >
      <Flex
        pt="2rem"
        px="7.5rem"
        display={{ base: "none", md: "flex", lg: "flex" }}
        direction="column"
        flexBasis="50%"
        justify="space-evenly"
      >
        <Stack>
          <Text fontWeight="semibold" color="primary.main" fontSize="6xl">
            {t("brand")}
          </Text>
          <Text fontSize="4xl">{t("title")}</Text>
        </Stack>
        <Image
          src="/images/Creative team-amico.svg"
          alt="teamwork"
          width="456"
          height="456"
        />
      </Flex>
      <Flex
        justify="space-evenly"
        direction="column"
        bg="secondary.main"
        flexBasis={{ base: "100%", md: "50%" }}
        align="center"
      >
        <Stack align="center">
          <Text fontWeight="semibold" fontSize="6xl">
            {t("signUp")}
          </Text>
          <Text fontSize="md">{t("signUp_description")}</Text>
        </Stack>
        <Box>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {(Formik) => {
              return (
                <Form>
                  <Stack align="center" justify="center" spacing="12">
                    <Stack align="center" justify="center" spacing="4">
                      <ChakraInput
                        placeholder={t("username")}
                        w={{ base: "18.7rem", md: "21.8rem" }}
                        size="lg"
                        type="text"
                        leftIcon={<FaRegUser size="20" />}
                        name="username"
                      />
                      <ChakraInput
                        placeholder={t("email")}
                        w={{ base: "18.7rem", md: "21.8rem" }}
                        size="lg"
                        type="email"
                        name="email"
                        leftIcon={<BiEnvelope size="20" />}
                      />
                      <ChakraInput
                        placeholder={t("password")}
                        w={{ base: "18.7rem", md: "21.8rem" }}
                        size="lg"
                        boxShadow="sm"
                        type="password"
                        name="password"
                        leftIcon={<BiLock size="20" />}
                      />
                      <ChakraInput
                        placeholder={t("repeat_password")}
                        w={{ base: "18.7rem", md: "21.8rem" }}
                        size="lg"
                        type="password"
                        name="passConfirm"
                        leftIcon={<BiLock size="20" />}
                      />
                    </Stack>
                    <Button
                      isDisabled={!Formik.isValid}
                      w={{ base: "18.7rem", md: "21.8rem" }}
                      size="lg"
                      variant="primary"
                      fontWeight="black"
                      type="submit"
                      _hover={{ _disabled: {} }}
                      _disabled={{ cursor: "auto", bg: "#919bff" }}
                    >
                      {t("signUp")}
                    </Button>
                  </Stack>
                </Form>
              );
            }}
          </Formik>
        </Box>
        <HStack align="center" justify="center" wrap="wrap">
          <Text fontSize="20" color="#121212" fontWeight="semibold">
            {t("already_have_account")}
          </Text>
          <Text fontWeight="semibold" fontSize="20" color="primary.main">
            <Link as={NextLink} href="/signin" color="primary.main">
              {t("login_here")}
            </Link>{" "}
          </Text>
        </HStack>
      </Flex>
    </Flex>
  );
}

export default SignUp;
