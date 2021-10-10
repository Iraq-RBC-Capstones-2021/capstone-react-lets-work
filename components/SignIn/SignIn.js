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
import { useTranslation } from "next-i18next";
import useInput from "../../hooks/useInput";
import { BiEnvelope, BiLock } from "react-icons/bi";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";
import { useState } from "react";
import NextLink from "next/link";
import { useRouter } from "next/dist/client/router";
function SignIn() {
  const { t } = useTranslation("form");
  const { locale } = useRouter();
  const [showPass, setShowPass] = useState(false);
  const [showResetPassForm, setShowResetPassForm] = useState(false);

  const {
    value: emailValue,
    isValid: emailIsValid,
    reset: emailReset,
    hasError: emailHasError,
    inputBlurHandler: emailBlurHandler,
    inputChangeHandler: emailChangeHandler,
  } = useInput((value) => value.includes("@"));
  const {
    value: resetEmailValue,
    isValid: resetEmailIsValid,
    reset: resetEmailReset,
    hasError: resetEmailHasError,
    inputBlurHandler: resetEmailBlurHandler,
    inputChangeHandler: resetEmailChangeHandler,
  } = useInput((value) => value.includes("@"));
  const {
    value: passwordValue,
    isValid: passwordIsValid,
    reset: passwordReset,
    hasError: passwordHasError,
    inputBlurHandler: passwordBlurHandler,
    inputChangeHandler: passwordChangeHandler,
  } = useInput((value) => value.trim().length >= 3);
  const isValidForm = passwordIsValid && emailIsValid;
  function signInSubmitHandler(e) {
    e.preventDefault();
    if (!isValidForm) {
      return;
    }
    const userData = { password: passwordValue, email: emailValue };
    //dispatch sign in action with userData
    passwordReset();
    emailReset();
  }
  function resetPassHandler(e) {
    e.preventDefault();
    if (!resetEmailIsValid) {
      return;
    }
    //dispatch a reset email action
    resetEmailReset();
  }
  return (
    <Flex
      dir={locale === "ar" ? "rtl" : "ltr"}
      width="full"
      h={{ md: "44rem", base: "100vh" }}
      justify="space-around"
      bg="#F9F9F9"
    >
      <Flex
        pt="5"
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
        pt="5"
        justify="space-evenly"
        direction="column"
        bg="secondary.main"
        flexBasis={{ base: "100%", md: "50%" }}
        align="center"
      >
        <Stack align="center">
          <Text fontWeight="semibold" fontSize="6xl">
            {showResetPassForm ? t("reset_password") : t("signIn")}
          </Text>
          <Text fontSize="md">
            {showResetPassForm ? t("reset_pass_desc") : t("signIn_description")}
          </Text>
        </Stack>
        <Box>
          <form
            onSubmit={
              showResetPassForm ? resetPassHandler : signInSubmitHandler
            }
          >
            <Stack align="center" justify="center" spacing="8">
              <Stack align="center" justify="center" spacing="4">
                <FormControl>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      fontSize="lg"
                      h="46px"
                      // eslint-disable-next-line react/no-children-prop
                      children={<BiEnvelope size="20" />}
                    />
                    {showResetPassForm ? (
                      <Input
                        value={resetEmailValue}
                        onChange={resetEmailChangeHandler}
                        onBlur={resetEmailBlurHandler}
                        placeholder={t("email")}
                        variant={resetEmailHasError ? "error" : "primary"}
                        w={{ base: "18.7rem", md: "21.8rem" }}
                        size="lg"
                        type="email"
                      />
                    ) : (
                      <Input
                        value={emailValue}
                        onChange={emailChangeHandler}
                        onBlur={emailBlurHandler}
                        placeholder={t("email")}
                        variant={emailHasError ? "error" : "primary"}
                        w={{ base: "18.7rem", md: "21.8rem" }}
                        size="lg"
                        type="email"
                      />
                    )}
                  </InputGroup>
                  {emailHasError ? (
                    <FormHelperText color="#cc0000">
                      {t("email_error")}
                    </FormHelperText>
                  ) : null}
                </FormControl>
                {!showResetPassForm && (
                  <FormControl>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        fontSize="lg"
                        h="46px"
                        // eslint-disable-next-line react/no-children-prop
                        children={<BiLock size="20" />}
                      />
                      <Input
                        value={passwordValue}
                        onChange={passwordChangeHandler}
                        onBlur={passwordBlurHandler}
                        placeholder={t("password")}
                        variant={passwordHasError ? "error" : "primary"}
                        w={{ base: "18.7rem", md: "21.8rem" }}
                        size="lg"
                        boxShadow="sm"
                        type={showPass.password ? "text" : "password"}
                      />
                      <InputRightElement width="4.5rem">
                        {locale !== "ar" && (
                          <IconButton
                            size="sm"
                            textAlign="center"
                            bg="transparent"
                            _hover="none"
                            _active="none"
                            mt="1"
                            border="none"
                            outline="none"
                            onClick={() => setShowPass(!showPass)}
                            icon={
                              showPass ? (
                                <AiOutlineEye size="20" />
                              ) : (
                                <AiOutlineEyeInvisible size="20" />
                              )
                            }
                          />
                        )}
                      </InputRightElement>
                    </InputGroup>
                    {passwordHasError ? (
                      <FormHelperText color="#cc0000">
                        {t("password_error")}
                      </FormHelperText>
                    ) : null}
                  </FormControl>
                )}
              </Stack>
              {!showResetPassForm && (
                <Checkbox
                  variant="rounded"
                  size="lg"
                  iconSize="23px"
                  px="2"
                  alignSelf="flex-start"
                >
                  <Text fontSize="md">{t("remember_me")}</Text>
                </Checkbox>
              )}
              <Button
                w={{ base: "18.7rem", md: "21.8rem" }}
                size="lg"
                bg="#5E6DFF"
                variant="primary"
                fontWeight="black"
                type="submit"
              >
                {showResetPassForm ? t("reset") : t("signIn")}
              </Button>
            </Stack>
          </form>
        </Box>
        <Stack align="center" spacing="5">
          {!showResetPassForm && (
            <Stack align="center">
              <Text>{t("alternativeSignIn")}</Text>
              <IconButton
                _hover={{ bg: "transparent", transform: "scale(1.1)" }}
                bg="transparent"
                size="lg"
                // eslint-disable-next-line react/no-children-prop
                children={<FcGoogle size="100%" />}
              />
            </Stack>
          )}
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
