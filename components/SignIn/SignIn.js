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
import useInput from "../../hooks/useInput";
import { BiEnvelope, BiLock } from "react-icons/bi";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";
import { useState } from "react";
import NextLink from "next/link";
function SignIn() {
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
      width="full"
      h={{ md: "44rem", base: "100vh" }}
      justify="space-around"
      bg="#F9F9F9"
    >
      <Flex
        pt="5"
        pl="7.5rem"
        display={{ base: "none", md: "flex", lg: "flex" }}
        direction="column"
        flexBasis="50%"
        justify="space-evenly"
      >
        <Stack>
          <Text fontWeight="semibold" color="primary.main" fontSize="6xl">
            Let&apos;s Work
          </Text>
          <Text fontSize="4xl">Where your ideas become reality</Text>
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
            {showResetPassForm ? "Reset Password" : "Sign In"}
          </Text>
          <Text fontSize="md">
            {showResetPassForm
              ? "Enter your email to reset your password"
              : "Sign In now to start sharing your ideas"}
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
                        placeholder="Email"
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
                        placeholder="Email"
                        variant={emailHasError ? "error" : "primary"}
                        w={{ base: "18.7rem", md: "21.8rem" }}
                        size="lg"
                        type="email"
                      />
                    )}
                  </InputGroup>
                  {emailHasError ? (
                    <FormHelperText color="#cc0000">
                      enter a valid email
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
                        placeholder="Password"
                        variant={passwordHasError ? "error" : "primary"}
                        w={{ base: "18.7rem", md: "21.8rem" }}
                        size="lg"
                        boxShadow="sm"
                        type={showPass.password ? "text" : "password"}
                      />
                      <InputRightElement width="4.5rem">
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
                      </InputRightElement>
                    </InputGroup>
                    {passwordHasError ? (
                      <FormHelperText color="#cc0000">
                        password must atleast has 6 characters
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
                  <Text fontSize="md">Remember me</Text>
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
                {showResetPassForm ? "Reset" : "Sign In"}
              </Button>
            </Stack>
          </form>
        </Box>
        <Stack align="center" spacing="5">
          {!showResetPassForm && (
            <Stack align="center">
              <Text>or sign in with</Text>
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
            {showResetPassForm ? "Go back to Sign In page" : "forgot password?"}
          </Text>
        </Stack>
        <HStack wrap="wrap" align="center" justify="center">
          <Text
            fontSize={{ md: "20", base: "17" }}
            color="#121212"
            fontWeight="semibold"
          >
            Don&apos;t have an account yet?{" "}
          </Text>
          <Text
            fontSize={{ md: "20", base: "17" }}
            color="primary.main"
            fontWeight="semibold"
          >
            <Link as={NextLink} href="/signup" color="primary.main">
              Sign Up here
            </Link>{" "}
          </Text>
        </HStack>
      </Flex>
    </Flex>
  );
}

export default SignIn;
