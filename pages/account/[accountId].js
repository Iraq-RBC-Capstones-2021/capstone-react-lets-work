import Profile from "../../components/Profile/Profile";
import IdeaCard from "../../components/Account/IdeaCard";
import {
  Box,
  Stack,
  SimpleGrid,
  Center,
  Skeleton,
  Heading,
  Flex,
  Button,
} from "@chakra-ui/react";
import { auth } from "../../firebase/firebase";
import { useEffect } from "react";
import { useRouter } from "next/dist/client/router";
import { getUserProfileData } from "../../store/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { usePopulateUserSlice } from "../../components/Hooks/usePopulateUserSlice";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { getUserPosts, resetUserProjects } from "../../store/posts/postsSlice";
import CustomHead from "../../components/CustomHead";

export default function AccountId({ params }) {
  const { t } = useTranslation("profile");

  const router = useRouter();

  const userInfo = useSelector((state) => state.user.entities);
  const loading = useSelector((state) => state.user.loading);
  usePopulateUserSlice(getUserProfileData, params.accountId);
  const lastUserPost = useSelector((state) => state.posts.lastUserPost);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!auth.currentUser) {
      router.push("/");
    }
  }, [router]);

  const userProjects = useSelector((state) => state.posts.userPosts);
  useEffect(() => {
    if (userProjects.data.length === 0) {
      dispatch(getUserPosts(params.accountId));
    }
    return () => dispatch(resetUserProjects());
    //eslint-disable-next-line
  }, [params.accountId]);

  return !auth.currentUser && params.accountId ? (
    <Skeleton h="100%" size="100%" />
  ) : (
    <>
      <CustomHead title="Profile" />
      <Box dir={router.locale === "ar" ? "rtl" : "ltr"}>
        <Profile userInfo={userInfo} loading={loading} />
        <Box px={["50px", "100px", "150px"]}>
          <Heading
            paddingBottom="20px"
            fontSize={{ base: "25px", md: "27px" }}
            py="10"
          >
            {t("projects")}
          </Heading>
        </Box>

        <Stack
          bg="secondary.main"
          py={{ base: 8, md: 16 }}
          px={8}
          textAlign="center"
          dir="ltr"
          align="center"
        >
          <Center>
            <Box p={4}>
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={16}>
                {userProjects.data.map((idea) => (
                  <IdeaCard
                    key={idea.id}
                    date={idea.createdAt}
                    ideaImage={idea.imageURL}
                    title={idea.title}
                    userImage={userInfo.imageURL}
                    username={userInfo.username}
                    ideaId={idea.id}
                  />
                ))}
              </SimpleGrid>
            </Box>
          </Center>
          {lastUserPost && userProjects.data.length % 3 === 0 && (
            <Button
              onClick={() => dispatch(getUserPosts(params.accountId))}
              w="30%"
              variant="secondary"
            >
              Load more
            </Button>
          )}
        </Stack>
      </Box>
    </>
  );
}

export async function getServerSideProps(context) {
  const params = context.params;
  return {
    props: {
      params,
      ...(await serverSideTranslations(context.locale, ["navbar", "profile"])),
    },
  };
}
