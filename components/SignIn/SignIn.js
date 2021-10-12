import {
  Box,
  Flex,
  Button,
  Text,
  FormControl,
  Input,
  InputLeftElement,
  InputGroup,
  Stack,
  Link,
  InputRightElement,
  IconButton,
  Checkbox,
  HStack,
  FormHelperText,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useTranslation } from "next-i18next";
import { BiEnvelope, BiLock } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";
import { useState } from "react";
import NextLink from "next/link";
import { useRouter } from "next/dist/client/router";
import ChakraInput from "../Shared/ChakraInput";
import ForgotPass from "./ForgotPass";
import ChakraCheckbox from "../Shared/ChakraCheckbox";
function SignIn() {
  const { t } = useTranslation("form");
  const { locale } = useRouter();
  const [showResetPassForm, setShowResetPassForm] = useState(false);
  const initialValues = {
    email: "",
    password: "",
    checked: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Please enter a valid email")
      .required("Please enter your email address"),
    password: Yup.string()
      .required("Please enter your password")
      .min(8, "Password should be 8 chars minimum.")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
  });
  const onSubmit = (value, onSubmitProps) => {
    const userData = {
      email: value.email.trim(),
      password: value.password.trim(),
      rememberSession: value.checked,
    };
    //TODO: Send a sign in request with the userData
    onSubmitProps.resetForm();
  };
  const handleGoogleSignIn = () => {
    //TODO: send a google sign in request
  };
  return (
    <Flex
      dir={locale === "ar" ? "rtl" : "ltr"}
      width="full"
      h={{ md: "94vh", base: "92vh" }}
      justify="space-around"
      bg="#F9F9F9"
    >
      <Flex
        pt="5"
        px="7.5rem"
        display={{ base: "none", md: "none", lg: "flex" }}
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
        pt="5"
        justify="space-evenly"
        direction="column"
        bg="secondary.main"
        flexBasis={{ base: "100%", md: "100%", lg: "50%" }}
        align="center"
      >
        <Stack align="center">
          <Text fontWeight="semibold" fontSize={{ base: "4xl", md: "6xl" }}>
            {showResetPassForm ? t("reset_password") : t("signIn")}
          </Text>
          <Text fontSize="md">
            {showResetPassForm ? t("reset_pass_desc") : t("signIn_description")}
          </Text>
        </Stack>
        <Box>
          {showResetPassForm ? (
            <ForgotPass />
          ) : (
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {(Formik) => {
                return (
                  <Form>
                    <Stack align="center" justify="center" spacing="8">
                      <Stack align="center" justify="center" spacing="4">
                        <ChakraInput
                          type="email"
                          name="email"
                          placeholder={t("email")}
                          size="lg"
                          w={{ base: "18.7rem", md: "21.8rem" }}
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
                      </Stack>
                      <ChakraCheckbox
                        variant="rounded"
                        size="lg"
                        iconSize="23px"
                        px="2"
                        alignSelf="flex-start"
                        name="checked"
                        content={t("remember_me")}
                      />

                      <Button
                        isDisabled={!Formik.isValid}
                        w={{ base: "18.7rem", md: "21.8rem" }}
                        size="lg"
                        bg="#5E6DFF"
                        variant="primary"
                        fontWeight="black"
                        type="submit"
                        _hover={{ _disabled: {} }}
                        _disabled={{ cursor: "auto", bg: "#919bff" }}
                      >
                        {t("signIn")}
                      </Button>
                    </Stack>
                  </Form>
                );
              }}
            </Formik>
          )}
        </Box>
        <Stack align="center" spacing="5">
          <Stack align="center">
            <Text>{t("alternativeSignIn")}</Text>
            <IconButton
              _hover={{ bg: "transparent", transform: "scale(1.1)" }}
              bg="transparent"
              size="lg"
              // eslint-disable-next-line react/no-children-prop
              children={<FcGoogle size="100%" />}
              onClick={handleGoogleSignIn}
            />
          </Stack>

          <Text
            _hover={{ color: "gray.500" }}
            onClick={() => setShowResetPassForm(!showResetPassForm)}
            cursor="pointer"
            fontWeight="300"
          >
            {showResetPassForm ? t("go_back") : t("forgot_Password")}
          </Text>
        </Stack>
        <HStack wrap="wrap" align="center" justify="center">
          <Text
            fontSize={{ md: "20", base: "17" }}
            color="#121212"
            fontWeight="semibold"
          >
            {t("dont_have_account")}
          </Text>
          <Text
            fontSize={{ md: "20", base: "17" }}
            color="primary.main"
            fontWeight="semibold"
          >
            <Link as={NextLink} href="/signup" color="primary.main">
              {t("signUp_Here")}
            </Link>{" "}
          </Text>
        </HStack>
      </Flex>
    </Flex>
  );
}

export default SignIn;
