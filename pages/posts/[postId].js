import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { BsHeartFill, BsHeart } from "react-icons/bs";
import AvatarCollection from "../../components/AvatarCollection";
import {
  Box,
  Heading,
  Text,
  Stack,
  Avatar,
  HStack,
  Button,
  Spacer,
  Icon,
  Badge,
  InputGroup,
  Flex,
  Image as ChakraImage,
  IconButton,
  Skeleton,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRouter as router } from "next/dist/client/router";
import { RiSendPlaneFill } from "react-icons/ri";
import { useTranslation } from "next-i18next";
import { wrapper } from "../../store";
import {
  getSinglePost,
  handleLike,
  handleSendingNotification,
} from "../../store/posts/postsSlice";
import { useDispatch, useSelector } from "react-redux";
import { doc, getDoc } from "@firebase/firestore";
import { auth, db } from "../../firebase/firebase";
import moment from "moment";
import PostOptionsMenu from "../../components/PostOptionsMenu";
import {
  getComments,
  postComment,
  //resetCommentStatus,
} from "../../store/comments/commentSlice";
import { getAllUsers } from "../../store/user/userSlice";
import Comment from "../../components/Comment";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import ChakraInput from "../../components/Shared/ChakraInput";

export default function Index({ post, user, some }) {
  const { t } = useTranslation("postId");
  const [joinBtn, setJoinBtn] = useState(false);
  const likeStatus = useSelector((state) => state.posts.likeStatus);
  const postCommentStatus = useSelector(
    (state) => state.comments.postCommentStatus
  );
  const [comments, setComments] = useState(some);
  const dispatch = useDispatch();
  const validationSchema = Yup.object({
    comment: Yup.string()
      .required("")
      .trim()
      .min(1, "Comments can not be empty"),
  });
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
  function handleComments(value, onSubmitProps) {
    const newComment = {
      content: value.comment.trim(),
      userId: auth.currentUser.uid,
      createdAt: new Date(),
      postId: post.id,
      likes: [],
      username: auth.currentUser.displayName,
      userImage: auth.currentUser.photoURL,
    };
    setComments((prevComments) => [newComment, ...prevComments]);

    dispatch(
      postComment({
        postId: post.id,
        comment: newComment,
      })
    );
    if (auth.currentUser) {
      dispatch(
        handleSendingNotification({
          newNotification: {
            redirectTo: `/posts/${post.id}`,
            seen: false,
            invokerUserImage: auth.currentUser.photoURL,
            invokerUsername: auth.currentUser.displayName,
            content: "commented on your post",
            createdAt: new Date().toString(),
            invokedItemImage: post.imageURL,
            invokedUserId: user.id,
            postId: post.id,
          },
          type: "comment",
        })
      );
    }
    onSubmitProps.resetForm();
  }
  const users = useSelector((state) => state.user.users);
  useEffect(() => {
    if (users.length === 0) {
      dispatch(getAllUsers());
    }
  }, [dispatch, users]);
  const postUsers = users.filter((user) => {
    return post.users.includes(user.id);
  });
  return (
    <Flex mt={{ base: "6", md: "" }} align="center" justify="center">
      <Stack
        p={{ md: "6", base: "0" }}
        dir={router().locale === "ar" ? "rtl" : "ltr"}
      >
        <Box
          maxW="780px"
          minW={{ base: "300px", md: "600px", lg: "780px" }}
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
              {auth.currentUser?.uid === post.userId && (
                <PostOptionsMenu postId={post.id} />
              )}
            </HStack>
            <AvatarCollection users={postUsers} />

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
                fallbackSrc={<Skeleton h="100%" />}
              />
            </Box>
          )}
          <HStack mt={post.imageURL || "6"}>
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
            {auth.currentUser && (
              <Formik
                validationSchema={validationSchema}
                initialValues={{ comment: "" }}
                onSubmit={handleComments}
              >
                <Form>
                  <InputGroup>
                    <HStack w="100%" justify="space-between">
                      <ChakraInput
                        variant="flushed"
                        placeholder="Write a comment"
                        name="comment"
                        borderColor="#5D5FEF"
                      />
                      <IconButton
                        isLoading={postCommentStatus === "loading"}
                        _hover={{ bg: "gray.100" }}
                        borderRadius="xl"
                        bg="transparent"
                        cursor="pointer"
                        type="submit"
                        //eslint-disable-next-line
                        children={<RiSendPlaneFill size="23" color="#5D5FEF" />}
                      />
                    </HStack>
                  </InputGroup>{" "}
                </Form>
              </Formik>
            )}
          </Stack>
        </Box>
        {comments.map((comm) => (
          <Comment key={comm.id} postUser={post.userId} sampleComment={comm} />
        ))}
      </Stack>
    </Flex>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ locale, params }) => {
      try {
        const { postId } = params;
        await store.dispatch(getSinglePost(postId));
        const post = store.getState().posts.singlePost.data;
        const user = await (await getDoc(doc(db, "users", post.userId))).data();
        const newUser = {
          ...user,
          createdAt: moment(user.createdAt.toDate()).calendar(),
        };
        await store.dispatch(getComments(post.id));
        const comments = store.getState().comments.comments.data;
        return {
          props: {
            post,
            user: newUser,
            some: comments,
            ...(await serverSideTranslations(locale, ["postId"])),
          },
        };
      } catch (err) {
        return {
          notFound: true,
        };
      }
    }
);
