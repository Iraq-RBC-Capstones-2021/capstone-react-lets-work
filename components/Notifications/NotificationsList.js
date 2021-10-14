import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  IconButton,
} from "@chakra-ui/react";
import { BellIcon } from "@chakra-ui/icons";
import NotificationItem from "./NotificationItem";
const sampleNotifications = [
  {
    content: "Sent a message to Group Chat",
    userId: "",
    createdAt: new Date(),
    redirectTo: "/chat",
    id: "1",
    // TODO: fetch user data using userId
    userImageURL: "https://randomuser.me/api/portraits/thumb/men/75.jpg",
    username: "Ali",
    imageURL: "https://random.imagecdn.app/500/151",
  },
  {
    content: "Sent a message to Group Chat",
    userId: "",
    userImageURL: "https://randomuser.me/api/portraits/women/74.jpg",
    redirectTo: "/chat",
    id: "2",
    username: "Cloe",
    imageURL: "https://random.imagecdn.app/500/152",
    createdAt: new Date(),
  },
  {
    content: "Liked your post",
    userId: "",
    userImageURL: "https://randomuser.me/api/portraits/thumb/men/72.jpg",
    redirectTo: "/search",
    id: "3",
    username: "John",
    imageURL: "https://random.imagecdn.app/500/153",
    createdAt: new Date(),
  },
  {
    content: "Liked your post",
    userId: "",
    userImageURL: "https://randomuser.me/api/portraits/women/75.jpg",
    redirectTo: "/about",
    id: "4",
    username: "Natalie",
    imageURL: "https://random.imagecdn.app/500/154",
    createdAt: new Date(),
  },
  {
    content: "Sent you a Private Message",
    userId: "",
    userImageURL: "https://randomuser.me/api/portraits/men/20.jpg",
    redirectTo: "/chat",
    id: "5",
    username: "Mohammed",
    imageURL: "https://random.imagecdn.app/500/155",
    createdAt: new Date(),
  },
  {
    content: "Liked your post",
    userId: "",
    userImageURL: "https://randomuser.me/api/portraits/women/70.jpg",
    redirectTo: "/about",
    id: "6",
    username: "Natalie",
    imageURL: "https://random.imagecdn.app/500/150",
    createdAt: new Date(),
  },
  {
    content: "Liked your post",
    userId: "",
    username: "Cloe",
    userImageURL: "https://randomuser.me/api/portraits/women/80.jpg",
    redirectTo: "/about",
    id: "7",
    imageURL: "https://random.imagecdn.app/500/250",
    createdAt: new Date(),
  },
];
function NotificationsList() {
  return (
    <Menu>
      <MenuButton
        mt="2"
        ml="2"
        aria-label="Close menu"
        size="lg"
        icon={<BellIcon />}
        as={IconButton}
        background="transparent"
      />
      <MenuList
        position="relative"
        zIndex="100"
        mr="3"
        pb="0"
        boxShadow="dark-lg"
        bg="secondary.lighter"
        overflow="auto"
        w={{ base: "20rem", md: "md" }}
        maxH="33rem"
      >
        <MenuGroup
          color="#2E2A77"
          fontSize="22px"
          title={`${sampleNotifications.length} new notifications`}
        >
          {sampleNotifications.map((notification) => (
            <MenuItem _hover={{ bg: "#f4f5fd" }} p="0" key={notification.id}>
              <NotificationItem notification={notification} />
            </MenuItem>
          ))}
        </MenuGroup>
      </MenuList>
    </Menu>
  );
}

export default NotificationsList;
