import { useState } from "react";
import {
  HStack,
  useDisclosure,
  Stack,
  VStack,
  Flex,
  Avatar,
  AvatarBadge,
  Heading,
  IconButton,
  Box,
  Divider,
  Text,
  Input,
  List,
  ListItem,
  Center,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import { BiSend } from "react-icons/bi";
import { auth } from "../../firebase/firebase";
import { v4 as uuidv4 } from "uuid";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/dist/client/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function Chat() {
  const { t } = useTranslation("chat");
  const { locale } = useRouter();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, userId: 2, content: "hello" },
    { id: 2, userId: 3, content: "hello again" },
  ]);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const newMessage = { id: uuidv4(), userId: uuidv4(), content: message };
    setMessages([...messages, newMessage]);
    setMessage("");
  };

  return (
    <Center py={8}>
      <Box boxShadow="2xl" p="6" rounded="md">
        <HStack h="80vh" spacing={0}>
          <Flex
            as="aside"
            h="full"
            maxW={{ base: "xs", xl: "sm" }}
            display={{ base: "none", lg: "flex" }}
            w="full"
            pt={8}
          >
            <Tabs isFitted variant="enclosed">
              <TabList mb="1em">
                <Tab
                  _focus={{ boxShadow: "none" }}
                  _selected={{ color: "white", bg: "primary.main" }}
                >
                  {t("private")}
                </Tab>
                <Tab
                  _focus={{ boxShadow: "none" }}
                  _selected={{ color: "white", bg: "primary.main" }}
                >
                  {t("group")}
                </Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <VStack h="full" alignItems="center" w="full" spacing={6}>
                    <Flex
                      w="full"
                      flexDirection="column"
                      alignItems="center"
                      justifyContent="flex-start"
                    ></Flex>

                    <Box w="full" overflowY="auto">
                      <List w="full" spacing={0}>
                        <ListItem>
                          <Flex
                            py={4}
                            px={2}
                            w="full"
                            alignItems="center"
                            borderBottomColor="gray.100"
                            borderBottomWidth={1}
                            style={{ transition: "background 300ms" }}
                            _hover={{ bg: "gray.50", cursor: "pointer" }}
                          >
                            <Box
                              rounded="full"
                              bg="gray.100"
                              minW={14}
                              minH={14}
                            >
                              <Avatar name="John Doe" minW={14} minH={14}>
                                <AvatarBadge
                                  bg="green.400"
                                  boxSize={4}
                                  borderWidth={2}
                                />
                              </Avatar>
                            </Box>
                            <VStack
                              overflow="hidden"
                              flex={1}
                              ml={3}
                              spacing={0}
                              alignItems="flex-start"
                            >
                              <Heading fontSize={12} w="full">
                                John Doe
                              </Heading>
                              <Text
                                overflow="hidden"
                                textOverflow="ellipsis"
                                whiteSpace="nowrap"
                                w="full"
                                fontSize="xs"
                                color="gray.500"
                              >
                                3 days ago
                              </Text>
                            </VStack>
                          </Flex>
                        </ListItem>

                        <ListItem>
                          <Flex
                            py={4}
                            px={2}
                            w="full"
                            alignItems="center"
                            borderBottomColor="gray.100"
                            borderBottomWidth={1}
                            style={{ transition: "background 300ms" }}
                            _hover={{ bg: "gray.50", cursor: "pointer" }}
                          >
                            <Box
                              rounded="full"
                              bg="gray.100"
                              minW={14}
                              minH={14}
                            >
                              <Avatar name="John Doe" minW={14} minH={14}>
                                <AvatarBadge
                                  bg="green.400"
                                  boxSize={4}
                                  borderWidth={2}
                                />
                              </Avatar>
                            </Box>
                            <VStack
                              overflow="hidden"
                              flex={1}
                              ml={3}
                              spacing={0}
                              alignItems="flex-start"
                            >
                              <Heading fontSize={12} w="full">
                                John Doe
                              </Heading>
                              <Text
                                overflow="hidden"
                                textOverflow="ellipsis"
                                whiteSpace="nowrap"
                                w="full"
                                fontSize="xs"
                                color="gray.500"
                              >
                                3 days ago
                              </Text>
                            </VStack>
                          </Flex>
                        </ListItem>
                      </List>
                    </Box>
                  </VStack>
                </TabPanel>
                <TabPanel>
                  <VStack h="full" alignItems="center" w="full" spacing={6}>
                    <Flex
                      w="full"
                      flexDirection="column"
                      alignItems="center"
                      justifyContent="flex-start"
                    ></Flex>

                    <Box w="full" overflowY="auto">
                      <List w="full" spacing={0}>
                        <ListItem>
                          <Flex
                            py={4}
                            px={2}
                            w="full"
                            alignItems="center"
                            borderBottomColor="gray.100"
                            borderBottomWidth={1}
                            style={{ transition: "background 300ms" }}
                            _hover={{ bg: "gray.50", cursor: "pointer" }}
                          >
                            <Box
                              rounded="full"
                              bg="gray.100"
                              minW={14}
                              minH={14}
                            >
                              <Avatar name="John Doe" minW={14} minH={14}>
                                <AvatarBadge
                                  bg="green.400"
                                  boxSize={4}
                                  borderWidth={2}
                                />
                              </Avatar>
                            </Box>
                            <VStack
                              overflow="hidden"
                              flex={1}
                              ml={3}
                              spacing={0}
                              alignItems="flex-start"
                            >
                              <Heading fontSize={12} w="full">
                                Group
                              </Heading>
                              <Text
                                overflow="hidden"
                                textOverflow="ellipsis"
                                whiteSpace="nowrap"
                                w="full"
                                fontSize="xs"
                                color="gray.500"
                              >
                                3 days ago
                              </Text>
                            </VStack>
                          </Flex>
                        </ListItem>
                      </List>
                    </Box>
                  </VStack>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Flex>
          <Flex
            as="main"
            h="full"
            flex={1}
            borderRightColor="gray.100"
            borderRightWidth={1}
          >
            <Stack spacing="0" ml={4}>
              <Box
                borderRadius="xl"
                borderBottomRadius="none"
                bg="white"
                boxShadow="lg"
                w={{ base: "100%", md: "40rem" }}
                overflow="auto"
                h="70vh"
              >
                {messages?.map((msg) => {
                  return (
                    <Flex
                      m="2"
                      key={msg.id}
                      justify={
                        msg.userId === auth.currentUser?.uid
                          ? "flex-end"
                          : "flex-start"
                      }
                    >
                      <Box>
                        <Text
                          bg={
                            msg.userId === auth.currentUser?.uid
                              ? "green.100"
                              : "gray.100"
                          }
                          borderRadius="3xl"
                          borderBottomLeftRadius={
                            msg.userId === auth.currentUser?.uid ? "3xl" : "0"
                          }
                          borderBottomRightRadius={
                            msg.userId === auth.currentUser?.uid ? "0" : "3xl"
                          }
                          py="2"
                          px="4"
                          color="black"
                          fontSize="xl"
                          textAlign={
                            msg.userId === auth.currentUser?.uid
                              ? "right"
                              : "left"
                          }
                        >
                          {msg.content}
                        </Text>
                        <Text
                          textAlign={
                            msg.userId === auth.currentUser?.uid
                              ? "right"
                              : "left"
                          }
                          fontSize="sm"
                          fontWeight="light"
                        ></Text>
                      </Box>
                    </Flex>
                  );
                })}
              </Box>
              <form onSubmit={onSubmitHandler}>
                <HStack spacing="0" align="center">
                  <Input
                    onChange={(e) => setMessage(e.target.value)}
                    variant="primary"
                    border="1px solid #718096"
                    value={message}
                  />
                  <IconButton
                    type="submit"
                    bg="primary.main"
                    //eslint-disable-next-line
                    children={<BiSend color="white" size="23" />}
                    borderRadius="none"
                  />
                </HStack>
              </form>
            </Stack>
          </Flex>
        </HStack>
      </Box>
    </Center>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["chat"])),
    },
  };
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["navbar"])),
    },
  };
}
