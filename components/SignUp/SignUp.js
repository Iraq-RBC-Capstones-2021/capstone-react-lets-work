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
  HStack,
} from "@chakra-ui/react";
import { BiEnvelope, BiLock } from "react-icons/bi";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";
import Image from "next/image";
import { useState } from "react";
import NextLink from "next/link";
function SignUp() {
  const [showPass, setShowPass] = useState({
    password: false,
    repeatPass: false,
  });
  return (
    <Flex
      width="full"
      h={{ md: "44rem", base: "100vh" }}
      justify="space-around"
      bg="#F9F9F9"
    >
      <Flex
        pt="2rem"
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
        justify="space-evenly"
        direction="column"
        bg="secondary.main"
        flexBasis={{ base: "100%", md: "50%" }}
        align="center"
      >
        <Stack align="center">
          <Text fontWeight="semibold" fontSize="6xl">
            Sign Up
          </Text>
          <Text fontSize="md">Sign up now to start sharing your ideas</Text>
        </Stack>
        <Box>
          <form>
            <Stack align="center" justify="center" spacing="12">
              <Stack align="center" justify="center" spacing="4">
                <FormControl>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      fontSize="lg"
                      h="46px"
                      // eslint-disable-next-line react/no-children-prop
                      children={<FaRegUser size="20" />}
                    />
                    <Input
                      _focus={{
                        border: "1px solid",
                        borderColor: "primary.lighter",
                      }}
                      placeholder="Username"
                      variant="white"
                      w={{ base: "18.7rem", md: "21.8rem" }}
                      size="lg"
                      boxShadow="sm"
                      type="text"
                      border="1px solid #EAEAEA"
                      borderRadius="3px"
                    />
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      fontSize="lg"
                      h="46px"
                      // eslint-disable-next-line react/no-children-prop
                      children={<BiEnvelope size="20" />}
                    />
                    <Input
                      _focus={{
                        border: "1px solid",
                        borderColor: "primary.lighter",
                      }}
                      placeholder="Email"
                      variant="white"
                      w={{ base: "18.7rem", md: "21.8rem" }}
                      size="lg"
                      boxShadow="sm"
                      type="email"
                      border="1px solid #EAEAEA"
                      borderRadius="3px"
                    />
                  </InputGroup>
                </FormControl>
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
                      _focus={{
                        border: "1px solid",
                        borderColor: "primary.lighter",
                      }}
                      placeholder="Password"
                      variant="white"
                      w={{ base: "18.7rem", md: "21.8rem" }}
                      size="lg"
                      boxShadow="sm"
                      type={showPass.password ? "text" : "password"}
                      border="1px solid #EAEAEA"
                      borderRadius="3px"
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
                        onClick={() =>
                          setShowPass({
                            ...showPass,
                            password: !showPass.password,
                          })
                        }
                        icon={
                          showPass.password ? (
                            <AiOutlineEye size="20" />
                          ) : (
                            <AiOutlineEyeInvisible size="20" />
                          )
                        }
                      />
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
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
                      _focus={{
                        border: "1px solid",
                        borderColor: "primary.lighter",
                      }}
                      placeholder="Repeat Password"
                      variant="white"
                      w={{ base: "18.7rem", md: "21.8rem" }}
                      size="lg"
                      boxShadow="sm"
                      type={showPass.repeatPass ? "text" : "password"}
                      border="1px solid #EAEAEA"
                      borderRadius="3px"
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
                        onClick={() =>
                          setShowPass({
                            ...showPass,
                            repeatPass: !showPass.repeatPass,
                          })
                        }
                        icon={
                          showPass.repeatPass ? (
                            <AiOutlineEye size="20" />
                          ) : (
                            <AiOutlineEyeInvisible size="20" />
                          )
                        }
                      />
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
              </Stack>
              <Button
                w={{ base: "18.7rem", md: "21.8rem" }}
                size="lg"
                fontWeight="black"
                variant="primary"
              >
                Sign Up
              </Button>
            </Stack>
          </form>
        </Box>
        <HStack align="center" justify="center" wrap="wrap">
          <Text fontSize="20" color="#121212" fontWeight="semibold">
            Already have an account ?{" "}
          </Text>
          <Text fontWeight="semibold" fontSize="20" color="primary.main">
            <Link as={NextLink} href="/signin" color="primary.main">
              Login here
            </Link>{" "}
          </Text>
        </HStack>
      </Flex>
    </Flex>
  );
}

export default SignUp;
