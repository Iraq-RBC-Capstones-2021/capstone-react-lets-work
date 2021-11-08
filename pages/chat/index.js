import { useState, useEffect } from "react";
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
  Skeleton,
} from "@chakra-ui/react";
import { BiSend } from "react-icons/bi";
import { auth } from "../../firebase/firebase";
import { v4 as uuidv4 } from "uuid";
import { useTranslation } from "next-i18next";
import { wrapper } from "../../store";

import { useRouter } from "next/dist/client/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ChatList from "../../components/Chat/ChatList";
import { getAllUsers } from "../../store/user/userSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import ChatMessage from "../../components/Chat/ChatMessage";
import { getChatUsers, getGroupChats } from "../../store/chat/chatSlice";
import CustomHead from "../../components/CustomHead";

export default function Chat({ users }) {
  const router = useRouter();
  const chatUsers = useSelector((state) => state.chat.chatUsers.data);
  const groupChats = useSelector((state) => state.chat.groupChats.data);
  const newUsers = chatUsers
    .map((id) => {
      const user = users.filter((user) => user.id === id);
      if (user) return user[0];
      else if (!user) return null;
    })
    .filter((user) => user !== undefined);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getChatUsers());
    dispatch(getGroupChats());
  }, [dispatch]);
  const { room } = router.query;
  if (!auth.currentUser || !auth.currentUser?.emailVerified) {
    router.push("/signup");
  }
  return !auth.currentUser?.emailVerified ? (
    <Skeleton h="100vh" />
  ) : (
    <Center py={8}>
      <CustomHead title="Chat" />
      <Box w={room || "50%"} boxShadow="2xl" p="6" rounded="md">
        <HStack h="80vh" spacing={0}>
          <ChatList groupChats={groupChats} users={newUsers} />
          {room && <ChatMessage users={users} chatId={room} />}
        </HStack>
      </Box>
    </Center>
  );
}

export const getStaticProps = wrapper.getStaticProps(
  (store) =>
    async ({ locale }) => {
      await store.dispatch(getAllUsers());
      const users = store.getState().user.users;
      return {
        props: {
          users: users,
          ...(await serverSideTranslations(locale, ["chat", "navbar"])),
        },
      };
    }
);
