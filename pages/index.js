import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import TopSection from "../components/Home/TopSection";
import PostList from "../components/Home/posts/PostList";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  getFavPosts,
  getInitialPosts,
  getMostRecentProjects,
  getTopProjects,
} from "../store/posts/postsSlice";
import { Button, Stack, Box } from "@chakra-ui/react";
import { wrapper } from "../store";
import { collection, getDocs } from "@firebase/firestore";
import { auth, db } from "../firebase/firebase";
import moment from "moment";
import CustomHead from "../components/CustomHead";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/dist/client/router";

export default function Home({
  initialTopPosts,
  initialMostRecentPosts,
  users,
}) {
  const { t } = useTranslation("home");
  const dispatch = useDispatch();
  const topPosts = useSelector((state) => state.posts.topPosts);
  const mostRecentPosts = useSelector((state) => state.posts.mostRecentPosts);
  const favPosts = useSelector((state) => state.posts.favPosts);
  const lastTopPost = useSelector((state) => state.posts.lastTopPost);
  const lastRecentPost = useSelector((state) => state.posts.lastRecentPost);
  const lastFavPost = useSelector((state) => state.posts.lastFavPost);
  const router = useRouter();
  useEffect(() => {
    if (topPosts.data.length === 0) {
      dispatch(getTopProjects());
    }
    if (mostRecentPosts.data.length === 0) {
      dispatch(getMostRecentProjects());
    }
    if (favPosts.data.length === 0) {
      dispatch(getFavPosts());
    }
    //eslint-disable-next-line
  }, [dispatch]);
  return (
    <Box dir={router.locale === "ar" ? "rtl" : "ltr"} mb="20">
      <CustomHead title="Home" />
      <TopSection />
      <Stack spacing="6" align="center">
        <PostList
          users={users}
          status={topPosts.status}
          list={t("top_projects")}
          posts={topPosts.data.length > 0 ? topPosts.data : initialTopPosts}
        />
        {lastTopPost && topPosts.data.length % 3 === 0 && (
          <Button
            w="30%"
            variant="secondary"
            onClick={() => dispatch(getTopProjects())}
          >
            {t("load")}{" "}
          </Button>
        )}
      </Stack>
      {auth.currentUser && (
        <Box>
          <Stack align="center">
            <PostList
              users={users}
              list={t("favorite_projects")}
              posts={favPosts.data}
              status={favPosts.status}
            />

            {lastFavPost && favPosts.data.length % 3 === 0 && (
              <Button
                w="30%"
                variant="secondary"
                onClick={() => dispatch(getFavPosts())}
              >
                {t("load")}{" "}
              </Button>
            )}
          </Stack>
          <Stack align="center" spacing="6">
            <PostList
              users={users}
              status={mostRecentPosts.status}
              list={t("new_projects")}
              posts={
                mostRecentPosts.data.length > 0
                  ? mostRecentPosts.data
                  : initialMostRecentPosts
              }
            />
            {lastRecentPost && mostRecentPosts.data.length % 3 === 0 && (
              <Button
                w="30%"
                variant="secondary"
                onClick={() => dispatch(getMostRecentProjects())}
              >
                {t("load")}{" "}
              </Button>
            )}
          </Stack>
        </Box>
      )}
    </Box>
  );
}
export const getStaticProps = wrapper.getStaticProps(
  (store) =>
    async ({ locale }) => {
      try {
        await store.dispatch(getInitialPosts("createdAt"));
        const mostRecentPosts = store.getState().posts.initialPosts;
        await store.dispatch(getInitialPosts("likesCount"));
        const topPosts = store.getState().posts.initialPosts;
        const users = await (
          await getDocs(collection(db, "users"))
        ).docs.map((user) => {
          return user.data();
        });
        const newUsers = users.map((user) => {
          return {
            ...user,
            createdAt: moment(user.createdAt.toDate()).calendar(),
          };
        });
        return {
          props: {
            users: newUsers,
            initialTopPosts: topPosts,
            initialMostRecentPosts: mostRecentPosts,
            ...(await serverSideTranslations(locale, ["home", "navbar"])),
          },
          revalidate: 10,
        };
      } catch (err) {
        return {
          props: {
            ...(await serverSideTranslations(locale, ["home", "navbar"])),
          },
          notFound: true,
        };
      }
    }
);
