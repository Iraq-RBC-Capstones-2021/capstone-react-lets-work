import React, { useEffect, useState } from "react";
import NextLink from "next/link";
import {
  Box,
  Stack,
  Text,
  Image,
  HStack,
  IconButton,
  Badge,
  Avatar,
  LinkBox,
  LinkOverlay,
  Skeleton,
  useToast,
} from "@chakra-ui/react";
import { FaPlus, FaHeart } from "react-icons/fa";
import { IoMdChatbubbles } from "react-icons/io";
import { useDispatch } from "react-redux";
import {
  handleDeletingNotification,
  handleLike,
  handleSendingNotification,
  joinProjectHandler,
  likeHandler,
} from "../../../store/posts/postsSlice";
import { auth } from "../../../firebase/firebase";
import { useSelector } from "react-redux";
import {
  joinGroupChat,
  setChatUser,
  setGroupChat,
} from "../../../store/chat/chatSlice";
import { useRouter } from "next/dist/client/router";
function PostCard({
  createdAt,
  description,
  title,
  userId,
  likes,
  tags,
  imageURL,
  user,
  users,
  id,
  post,
}) {
  const [likeError, setLikeError] = useState("");
  const likeStatus = useSelector((state) => state.posts.likeStatus);
  const dispatch = useDispatch();
  const toast = useToast();
  const router = useRouter();

  const joinProjectStatus = useSelector(
    (state) => state.chat.joinProjectStatus
  );
  useEffect(() => {
    if (likeError) {
      toast({
        title: likeError,
        position: "top",
        duration: 3000,
        status: "error",
        variant: "subtle",
      });
      setLikeError("");
    }
  }, [likeError, toast]);
  function handleLikeClick() {
    if (
      auth.currentUser &&
      likeStatus !== "loading" &&
      auth.currentUser?.emailVerified
    ) {
      dispatch(handleLike({ postId: id, userId: auth.currentUser?.uid }));
      dispatch(likeHandler({ post, userId: auth.currentUser?.uid }));
      if (!likes.includes(auth.currentUser.uid)) {
        dispatch(
          handleSendingNotification({
            newNotification: {
              redirectTo: `/posts/${id}`,
              seen: false,
              invokerUserImage: auth.currentUser.photoURL,
              invokerUsername: auth.currentUser.displayName,
              content: "liked your post",
              createdAt: new Date().toString(),
              invokedItemImage: imageURL,
              invokedUserId: user.id,
              postId: id,
            },
            type: "like",
          })
        );
      } else {
        dispatch(
          handleDeletingNotification({
            invokedUserId: user.id,
            userId: auth.currentUser.uid,
            type: "like",
          })
        );
      }
    } else if (!auth.currentUser) {
      setLikeError("Login first!");
    } else if (!auth.currentUser?.emailVerified) {
      setLikeError("Please verify your account first");
    }
  }
  function handleChat() {
    router.push(`/chat/?room=${id}`, undefined, {
      shallow: true,
    });
    dispatch(
      setGroupChat({
        imageURL,
        title,
      })
    );
    dispatch(setChatUser(""));
  }
  function handleProjectJoin() {
    if (auth.currentUser && auth.currentUser?.emailVerified) {
      dispatch(joinGroupChat({ id, postUsers: users }));
      dispatch(
        joinProjectHandler({ postId: id, userId: auth.currentUser?.uid })
      );
    } else if (!auth.currentUser) {
      setLikeError("Login first!");
    } else if (!auth.currentUser?.emailVerified) {
      setLikeError("Please verify your account first");
    }
  }
  return (
    <LinkBox bg="secondary.main" _hover={{ transform: "scale(1.01)" }}>
      <Stack
        spacing="0"
        h={imageURL ? { md: "37.87rem", base: "30rem" } : "15.1rem"}
        maxH="37.875rem"
        maxW={{ md: "21.8rem", base: "auto" }}
        w={{ md: "21.8rem", base: "auto" }}
        borderRadius="lg"
      >
        {imageURL && (
          <Box borderTopRadius="lg" overflow="hidden" flexBasis="60%">
            <Image
              alt={title}
              objectFit="cover"
              w="100%"
              h="100%"
              src={imageURL}
              fallback={<Skeleton boxSize="100%" />}
            />
          </Box>
        )}

        <Stack px="4" py="2" flexBasis="40%" bg="white">
          <HStack justify="space-between">
            <NextLink href={`posts/${id}`}>
              <LinkOverlay cursor="pointer">
                <Text noOfLines={1} fontSize="30px">
                  {title}
                </Text>{" "}
              </LinkOverlay>
            </NextLink>
            {users.includes(auth.currentUser?.uid) ||
            userId === auth.currentUser?.uid ? (
              <IconButton // eslint-disable-next-line react/no-children-prop
                children={<IoMdChatbubbles size="24" color="white" />}
                bg="primary.main"
                size="sm"
                onClick={handleChat}
                borderRadius="50%"
                _hover={{ bg: "primary.darker" }}
                _active={{ bg: "primary.lighter" }}
              />
            ) : (
              <IconButton // eslint-disable-next-line react/no-children-prop
                children={<FaPlus size="24" color="white" />}
                onClick={handleProjectJoin}
                bg="primary.main"
                size="sm"
                borderRadius="50%"
                _hover={{ bg: "primary.darker" }}
                _active={{ bg: "primary.lighter" }}
              />
            )}
          </HStack>
          <Stack pb="3" justify="space-between" h="100%">
            <Text fontWeight="light" noOfLines={2}>
              {description}
            </Text>
            <Text fontWeight="light" fontSize="12px">
              {`posted: ${createdAt}`}
            </Text>
            <HStack>
              {tags.map((tag) => (
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
            <HStack justify="space-between">
              <NextLink href={`account/${userId}`}>
                <HStack _hover={{ opacity: "0.8" }}>
                  <Avatar cursor={"pointer"} size="sm" src={user.imageURL} />
                  <Text> {user.username} </Text>
                </HStack>
              </NextLink>
              <HStack>
                <Text> {likes.length} </Text>
                <IconButton
                  // eslint-disable-next-line react/no-children-prop
                  children={
                    <FaHeart
                      size="19"
                      color={
                        auth.currentUser && likes.includes(auth.currentUser.uid)
                          ? "red"
                          : "white"
                      }
                    />
                  }
                  bg="#4D7AB6"
                  size="sm"
                  onClick={handleLikeClick}
                  borderRadius="50%"
                  _hover={{ bg: "#456da3" }}
                  _active={{ bg: "#5e87bd" }}
                />
              </HStack>
            </HStack>
          </Stack>
        </Stack>
      </Stack>
    </LinkBox>
  );
}

export default PostCard;
