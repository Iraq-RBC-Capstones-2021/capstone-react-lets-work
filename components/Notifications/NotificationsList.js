import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  IconButton,
  Center,
  Icon,
  VStack,
  Text,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { MdNotificationsNone, MdNotificationsActive } from "react-icons/md";
import { auth, notificationDb } from "../../firebase/firebase";
import NotificationItem from "./NotificationItem";
import { useDispatch, useSelector } from "react-redux";
import { setNotifications } from "../../store/user/userSlice";
import { onValue, ref } from "@firebase/database";
import { GiDesert } from "react-icons/gi";

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
      let allData = snapshot.val() === null ? [] : snapshot.val();
      allData = Object.entries(allData);

      dispatch(setNotifications(allData));
    });
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isAllNotificationsSeen = () => {
    if (status === "success") {
      for (let index = 0; index < data.length; index++) {
        if (data[index][1].seen === false) {
          return false;
        }
      }
    }
    return true;
  };

  return (
    <Menu>
      <MenuButton
        aria-label="Close menu"
        size="lg"
        icon={
          isAllNotificationsSeen() ? (
            <MdNotificationsNone />
          ) : (
            <MdNotificationsActive />
          )
        }
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
          {status === "success" && data.length > 0 ? (
            data.map((notification) => (
              <MenuItem _hover={{ bg: "#f4f5fd" }} p="0" key={notification[0]}>
                <NotificationItem
                  notification={notification[1]}
                  notificationId={notification[0]}
                />
              </MenuItem>
            ))
          ) : (
            <Center my="10">
              <VStack>
                <Icon as={GiDesert} w={20} h={20} color="lightPurple" />
                <Text color="lightPurple">
                  There are no notification ¯\_( ツ )_/¯
                </Text>
              </VStack>
            </Center>
          )}
        </MenuGroup>
      </MenuList>
    </Menu>
  );
}

export default NotificationsList;
