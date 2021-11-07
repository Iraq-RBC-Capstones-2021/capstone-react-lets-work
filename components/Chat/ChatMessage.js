import React, { useEffect, useState } from "react";
import {
  HStack,
  Stack,
  Flex,
  Avatar,
  IconButton,
  Box,
  Text,
} from "@chakra-ui/react";
import { auth, db } from "../../firebase/firebase";
import { BiSend } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { resetGroupChat, sendMessage } from "../../store/chat/chatSlice";
import ChakraInput from "../Shared/ChakraInput";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { collection, onSnapshot, orderBy, query } from "@firebase/firestore";
import { handleSendingNotification } from "../../store/posts/postsSlice";
function ChatMessage({ chatId, users }) {
  const [messages, setMessages] = useState([]);
  const initialUser = useSelector((state) => state.chat.chatUser);
  const dispatch = useDispatch();
  const status = useSelector((state) => state.chat.sendMessageStatus);
  const groupChat = useSelector((state) => state.chat.groupChat);
  const newUsers = messages.map((msg) => {
    return users.filter((user) => user.id === msg.userId)[0];
  });
  const user = newUsers.filter((u) => u.id !== auth.currentUser?.uid)[0];
  const chatUser = user ? user : initialUser;

  useEffect(() => {
    const unsub = onSnapshot(
      query(collection(db, `chat/${chatId}/messages`), orderBy("createdAt")),
      (snapshot) => {
        const msgs = snapshot.docs.map((msg) => {
          return {
            ...msg.data(),
            id: msg.id,
          };
        });

        setMessages(msgs);
      },
      (error) => {}
    );
    return () => unsub();
  }, [chatId]);
  useEffect(() => {
    return () => dispatch(resetGroupChat());
  }, [dispatch]);
  const onSubmitHandler = (values, onSubmitProps) => {
    event.preventDefault();
    const newMessage = {
      content: values.message,
      createdAt: new Date(),
      userId: auth.currentUser.uid,
    };
    dispatch(
      sendMessage({
        chatId: chatId,
        message: newMessage,
      })
    );

    if (auth.currentUser) {
      dispatch(
        handleSendingNotification({
          newNotification: {
            redirectTo: `/chat/?room=${chatId}`,
            seen: false,
            invokerUserImage: auth.currentUser.photoURL,
            invokerUsername: auth.currentUser.displayName,
            content: "messaged you",
            createdAt: new Date().toString(),
            invokedItemImage: "",
            invokedUserId: chatUser.id,
            postId: auth.currentUser.uid,
          },
          type: "message",
        })
      );
    }
    onSubmitProps.resetForm();
  };
  const validationSchema = Yup.object({
    message: Yup.string().trim(),
  });
  return (
    <Flex
      as="main"
      h="full"
      flex={1}
      borderRightColor="gray.100"
      borderRightWidth={1}
      direction="column"
      align="center"
      justify="center"
    >
      <HStack my="3">
        <Avatar
          src={groupChat.imageURL ? groupChat.imageURL : chatUser.imageURL}
          name={groupChat.title ? groupChat.title : chatUser.username}
        />
        <Text fontSize="3xl" fontWeight="bold" ml="4">
          {groupChat.title ? groupChat.title : chatUser.username}
        </Text>
      </HStack>
      <Stack spacing="0" ml={4}>
        <Stack
          spacing="6"
          borderRadius="xl"
          borderBottomRadius="none"
          bg="white"
          p="4"
          boxShadow="lg"
          w={{ base: "100%", md: "40rem" }}
          overflow="auto"
          h="70vh"
        >
          {messages?.map((msg) => {
            const [msgUser] = newUsers.filter((user) => user.id === msg.userId);
            return (
              <Flex
                key={msg.id}
                justify={
                  msg.userId === auth.currentUser?.uid
                    ? "flex-end"
                    : "flex-start"
                }
              >
                <Box>
                  <Flex
                    direction={
                      msg.userId === auth.currentUser?.uid
                        ? "row-reverse"
                        : "row"
                    }
                  >
                    <Avatar
                      transform="translateY(16px)"
                      name={
                        msg.userId === auth.currentUser.uid
                          ? auth.currentUser.username
                          : msgUser.username
                      }
                      alignSelf="flex-end"
                      size="sm"
                      src={
                        msg.userId === auth.currentUser.uid
                          ? auth.currentUser.photoURL
                          : msgUser.imageURL
                      }
                      mx="2"
                    />

                    <Text
                      alignSelf="flex-start"
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
                        msg.userId === auth.currentUser?.uid ? "right" : "left"
                      }
                    >
                      <Flex
                        direction={
                          msg.userId === auth.currentUser?.uid
                            ? "row"
                            : "row-reverse"
                        }
                        align="center"
                        wrap="wrap"
                      >
                        <Text maxW="20rem">{msg.content}</Text>
                      </Flex>
                    </Text>
                  </Flex>

                  <Text
                    textAlign={
                      msg.userId === auth.currentUser?.uid ? "right" : "left"
                    }
                    fontSize="sm"
                    fontWeight="light"
                    ml="16"
                  ></Text>
                </Box>
              </Flex>
            );
          })}
        </Stack>
        <Formik
          validationSchema={validationSchema}
          initialValues={{ message: "" }}
          onSubmit={onSubmitHandler}
        >
          <Form>
            <HStack spacing="0" align="center">
              <ChakraInput
                variant="primary"
                border="1px solid #718096"
                name="message"
              />
              <IconButton
                isLoading={status === "loading"}
                type="submit"
                bg="primary.main"
                //eslint-disable-next-line
                children={<BiSend color="white" size="23" />}
                borderRadius="none"
              />
            </HStack>
          </Form>
        </Formik>
      </Stack>
    </Flex>
  );
}

export default ChatMessage;
