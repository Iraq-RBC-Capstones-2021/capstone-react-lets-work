import {
  Heading,
  Stack,
  Box,
  Text,
  Avatar,
  VStack,
  Button,
  IconButton,
  Link,
  Flex,
} from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import { SiGmail, SiInstagram, SiFacebook, SiLinkedin } from "react-icons/si";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../firebase/firebase";
import {
  handleChatRoom,
  resetChatStatus,
  setChatUser,
} from "../../store/chat/chatSlice";
import { useTranslation } from "next-i18next";

function TopSection({
  username,
  bio,
  about,
  email,
  instagram,
  facebook,
  linkedIn,
  interests,
  skills_hobbies,
  imageURL,
  userId,
  user,
}) {
  const chatRoom = useSelector((state) => state.chat.chatRoom);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (chatRoom.status === "success") {
      router.push(`/chat/?room=${chatRoom.id}`, undefined, { shallow: true });
      dispatch(resetChatStatus());
    }
    //eslint-disable-next-line
  }, [chatRoom]);
  async function handle() {
    dispatch(
      handleChatRoom({
        currentUserId: auth.currentUser.uid,
        userId: userId,
      })
    );
    dispatch(setChatUser(user));
  }
  const { t } = useTranslation("profile");

  return (
    <Stack>
      <Flex
        justify="space-between"
        direction={["column", "column", "row", "row"]}
        align={{ base: "flex-start", md: "center" }}
      >
        <Box px={["50px", "80px", "150px"]} py={["15px", "30px", "30px"]}>
          <Flex
            direction={["column", "column", "row", "row"]}
            justify="space-around"
            align={{ base: "flex-start", md: "center" }}
          >
            <Avatar size="2xl" src={imageURL ? imageURL : ""} />

            <Stack mx={["15", "7"]}>
              <Heading fontSize={{ base: "25px", md: "27px" }}>
                {username}
              </Heading>
              <Flex align="center">
                <IconButton as={Link} href={email} icon={<SiGmail />} />
                <IconButton as={Link} href={instagram} icon={<SiInstagram />} />
                <IconButton as={Link} href={facebook} icon={<SiFacebook />} />
                <IconButton as={Link} href={linkedIn} icon={<SiLinkedin />} />
              </Flex>
              <Text color="gray.500" fontWeight="light">
                {" "}
                {bio}
              </Text>
              {auth.currentUser?.uid !== userId && (
                <VStack align="flex-start">
                  <Button onClick={handle} variant="primary">
                    Message
                  </Button>
                </VStack>
              )}
            </Stack>
          </Flex>
        </Box>
      </Flex>
      {interests === "" ? null : (
        <Flex
          direction={["column", "column", "row", "row"]}
          align={{ base: "flex-start", md: "center" }}
          bg="white"
        >
          <Box px={["50px", "100px", "150px"]} paddingY="30px" bg="white">
            <Heading
              paddingBottom="20px"
              fontSize={{ base: "25px", md: "27px" }}
            >
              {t("interests")}
            </Heading>
            <Flex wrap="wrap">{interests}</Flex>
          </Box>
        </Flex>
      )}

      {about === "" ? null : (
        <Flex
          direction={["column", "column", "row", "row"]}
          align={{ base: "flex-start", md: "flex-start" }}
          bg="white"
        >
          <Box
            px={["50px", "100px", "150px"]}
            py="20px"
            spacing={25}
            bg="white"
          >
            <Heading
              paddingBottom="20px"
              fontSize={{ base: "25px", md: "27px" }}
            >
              {t("about")}
            </Heading>
            <Text>{about}</Text>
          </Box>
        </Flex>
      )}

      {skills_hobbies === "" ? null : (
        <Flex
          direction={["column", "column", "row", "row"]}
          align={{ base: "flex-start", md: "flex-start" }}
          bg="secondary.main"
        >
          <Box px={["50px", "100px", "150px"]} py="35px">
            <Heading
              paddingBottom="20px"
              fontSize={{ base: "25px", md: "27px" }}
            >
              {t("skills_hobbies")}
            </Heading>
            {skills_hobbies}
          </Box>
        </Flex>
      )}
    </Stack>
  );
}

export default TopSection;
