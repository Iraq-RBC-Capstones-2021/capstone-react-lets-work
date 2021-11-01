import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  IconButton,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { MdNotificationsNone, MdNotificationsActive } from "react-icons/md";
import { auth } from "../../firebase/firebase";
import NotificationItem from "./NotificationItem";
import { useDispatch, useSelector } from "react-redux";
import { getAllNotification } from "../../store/user/userSlice";

function NotificationsList() {
  const dispatch = useDispatch();
  const { data, status } = useSelector((state) => state.user.notifications);
  useEffect(() => {
    if (auth.currentUser?.emailVerified) {
      dispatch(getAllNotification(auth.currentUser.uid));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Menu>
      <MenuButton
        aria-label="Close menu"
        size="lg"
        icon={<MdNotificationsNone />}
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
          title={`${data.length} new notifications`}
        >
          {status === "success"
            ? data.map((notification) => (
                <MenuItem
                  _hover={{ bg: "#f4f5fd" }}
                  p="0"
                  key={notification.id}
                >
                  <NotificationItem notification={notification} />
                </MenuItem>
              ))
            : null}
        </MenuGroup>
      </MenuList>
    </Menu>
  );
}

export default NotificationsList;
