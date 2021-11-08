import React from "react";
import Link from "next/link";
import moment from "moment";
import { Flex, Avatar, Text, HStack, Stack } from "@chakra-ui/react";
import { setNotificationSeenAsTrue } from "../../store/posts/postsSlice";
import { useDispatch } from "react-redux";

function NotificationItem({ notification, notificationId }) {
  const dispatch = useDispatch();
  const handleNotificationSeen = () => {
    dispatch(setNotificationSeenAsTrue({ notificationId }));
  };
  return (
    <Link passHref={true} href={notification.redirectTo}>
      <Flex
        py="3"
        px="5"
        w="full"
        borderBottom="1px solid #CCCCCC"
        align="center"
        justify="space-between"
        bgColor={notification.seen ? "primary" : "secondary.darker"}
        onClick={handleNotificationSeen}
      >
        <HStack align="center" spacing="4">
          <Avatar size="md" src={notification.invokerUserImage} />
          <Stack spacing="1">
            <Text fontSize={{ base: "15px", md: "17px" }} color="#2E2A77">
              {`${notification.invokerUsername} ${notification.content}`}
            </Text>
            <Text fontSize={{ base: "12px", md: "13px" }} fontWeight="light">
              {moment(notification.createdAt).fromNow()}{" "}
            </Text>
          </Stack>
        </HStack>
        {notification.invokedItemImage !== "" ? (
          <Avatar size="md" src={notification.invokedItemImage} />
        ) : null}
      </Flex>
    </Link>
  );
}

export default NotificationItem;
