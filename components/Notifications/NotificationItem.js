import React from "react";
import Link from "next/link";
import moment from "moment";
import { Flex, Avatar, Text, HStack, Stack } from "@chakra-ui/react";

function NotificationItem({ notification }) {
  return (
    <Link passHref={true} href={notification.redirectTo}>
      <Flex
        py="3"
        px="5"
        w="full"
        borderBottom="1px solid #CCCCCC"
        align="center"
        justify="space-between"
        bgColor={notification.seen ? "primary" : "gray.200"}
      >
        <HStack align="center" spacing="4">
          <Avatar size="md" src={notification.userImageURL} />
          <Stack spacing="1">
            <Text fontSize={{ base: "15px", md: "17px" }} color="#2E2A77">
              {`${notification.username} ${notification.content}`}{" "}
            </Text>
            <Text fontSize={{ base: "12px", md: "13px" }} fontWeight="light">
              {" "}
              {moment(notification.createdAt).fromNow()}{" "}
            </Text>
          </Stack>
        </HStack>
        <Avatar size="md" src={notification.imageURL} />
      </Flex>
    </Link>
  );
}

export default NotificationItem;
