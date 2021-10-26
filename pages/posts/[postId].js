import Image from "next/image";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { BsHeartFill, BsHeart } from "react-icons/bs";
import AvatarCollection from "../../components/AvatarCollection";
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  HStack,
  Button,
  Spacer,
  Icon,
  Badge,
  Input,
  InputGroup,
  InputRightElement,
  Flex,
  Image as ChakraImage,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRouter as router } from "next/dist/client/router";
import { RiSendPlaneFill } from "react-icons/ri";
import { useTranslation } from "next-i18next";
import { wrapper } from "../../store";
import { async } from "@firebase/util";
import { getSinglePost, handleLike } from "../../store/posts/postSlice";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfileData } from "../../store/user/userSlice";
import { collection, doc, getDoc, onSnapshot } from "@firebase/firestore";
import { auth, db } from "../../firebase/firebase";
import moment from "moment";
import PostOptionsMenu from "../../components/PostOptionsMenu";

export default function Index({ post, user }) {
  const { t } = useTranslation("postId");
  const [joinBtn, setJoinBtn] = useState(false);
  const likeStatus = useSelector((state) => state.posts.likeStatus);
  const [commentValue, setCommentValue] = useState("");
  const dispatch = useDispatch();

  function handleLikeClick() {
    if (likeStatus !== "loading" && auth.currentUser) {
      dispatch(handleLike({ postId: post.id, userId: auth.currentUser.uid }));
      if (post.likes.includes(auth.currentUser.uid)) {
        const userIndex = post.likes.findIndex(
          (u) => u === auth.currentUser.uid
        );
        post.likes.splice(userIndex, 1);
      } else {
        post.likes.push(auth.currentUser.uid);
      }
    }
  }
  function handleComments() {
    if (commentValue.trim().length > 0) {
      const newComment = {
        content: commentValue.trim(),
        userId: auth.currentUser.uid,
        createdAt: new Date(),
        postId: post.id,
        likes: [],
        username: auth.currentUser.displayName,
        userImage: auth.currentUser.photoURL,
      };
    }
  }
  return (
    <Flex justify="center">
      <Stack
        p={{ md: "6", base: "0" }}
        dir={router().locale === "ar" ? "rtl" : "ltr"}
      >
        <Box
          maxW="780px"
          w="full"
          bg="white"
          rounded="15px"
          p="6"
          overflow="hidden"
        >
          <Stack>
            <HStack mb="2">
              <Heading color="gray.700" fontSize="2xl" fontFamily="body">
                {post.title}
              </Heading>
              <Spacer />
              <Button rounded="15px" onClick={() => setJoinBtn(!joinBtn)}>
                {joinBtn ? t("joined") : t("join")}
              </Button>
              {auth.currentUser?.uid === post.userId && <PostOptionsMenu />}
            </HStack>
            <AvatarCollection users={post.users} />

            <Text color={"gray.500"}>{post.description}</Text>
          </Stack>
          {post.imageURL && (
            <Box
              height={{ md: "30rem", base: "10rem" }}
              mb="6"
              mt="3"
              maxH="600px"
            >
              <ChakraImage
                src={post.imageURL}
                alt=""
                height="100%"
                width="100%"
              />
            </Box>
          )}
          <HStack>
            {post.tags.map((tag) => (
              <Badge
                textTransform="auto"
                py="2"
                px="3"
                borderRadius="2xl"
                bg="#D6EAF8"
                key={tag}
              >
                {" "}
                {tag}{" "}
              </Badge>
            ))}
          </HStack>
          <Stack mt="6">
            <HStack mb="2">
              <Avatar src={user.imageURL} alt="Author" />
              <Stack direction="column" spacing="0" fontSize="sm">
                <Text fontWeight="600">{user.username}</Text>
                <Text color="gray.500">
                  {/* {post.userInfo.map((info) => `${info} `)} */}
                </Text>
              </Stack>
              <Spacer />
              <Icon
                as={
                  auth.currentUser && post.likes.includes(auth.currentUser.uid)
                    ? BsHeartFill
                    : BsHeart
                }
                color="lightPurple"
                onClick={handleLikeClick}
              />

              <Text color="lightPurple">{post.likes.length}</Text>
            </HStack>

            <InputGroup>
              <Input
                borderBottomWidth="2px"
                borderColor="#5D5FEF"
                variant="flushed"
                size="lg"
                placeholder="write a comment"
                onChange={(e) => setCommentValue(e.target.value)}
                value={commentValue}
              />
              <InputRightElement
                onClick={handleComments}
                _hover={{ bg: "gray.100" }}
                borderRadius="xl"
                cursor="pointer"
                //eslint-disable-next-line
                children={<RiSendPlaneFill size="23" color="#5D5FEF" />}
              />
            </InputGroup>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ locale, params }) => {
      const { postId } = params;
      await store.dispatch(getSinglePost(postId));
      const post = store.getState().posts.singlePost.data;
      const user = await (await getDoc(doc(db, "users", post.userId))).data();
      const newUser = {
        ...user,
        createdAt: moment(user.createdAt.toDate()).calendar(),
      };

      return {
        props: {
          post,
          user: newUser,
          ...(await serverSideTranslations(locale, ["postId"])),
        },
      };
    }
);
