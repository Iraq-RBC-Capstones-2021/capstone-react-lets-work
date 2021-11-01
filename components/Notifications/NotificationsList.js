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
import { auth, notificationDb } from "../../firebase/firebase";
import NotificationItem from "./NotificationItem";
import { useDispatch, useSelector } from "react-redux";
import { setNotifications } from "../../store/user/userSlice";
import { onValue, ref } from "@firebase/database";

function NotificationsList() {
  const dispatch = useDispatch();
  const { data, status } = useSelector((state) => state.user.notifications);

  useEffect(() => {
    //note: these listeners should be detached?!
    const notificationRef = ref(
      notificationDb,
      `users/${auth.currentUser.uid}`
    );
    onValue(notificationRef, (snapshot) => {
      const allData = snapshot.val();
      dispatch(setNotifications(allData));
    });
    return () => {};
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
        <MenuGroup color="#2E2A77" fontSize="22px">
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
