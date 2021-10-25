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
} from "../store/posts/postSlice";
import { Button, Stack, Box, Text } from "@chakra-ui/react";
import { wrapper } from "../store";
import { collection, getDocs } from "@firebase/firestore";
import { auth, db } from "../firebase/firebase";
import moment from "moment";
export default function Home({
  initialTopPosts,
  initialMostRecentPosts,
  users,
}) {
  const dispatch = useDispatch();
  const topPosts = useSelector((state) => state.posts.topPosts);
  const mostRecentPosts = useSelector((state) => state.posts.mostRecentPosts);
  const favPosts = useSelector((state) => state.posts.favPosts);
  const lastTopPost = useSelector((state) => state.posts.lastTopPost);
  const lastRecentPost = useSelector((state) => state.posts.lastRecentPost);
  const lastFavPost = useSelector((state) => state.posts.lastFavPost);
  useEffect(() => {
    dispatch(getTopProjects());
    dispatch(getMostRecentProjects());
    dispatch(getFavPosts());
  }, [dispatch]);
  return (
    <Box mb="20">
      <TopSection />
      <Stack spacing="6" align="center">
        <PostList
          users={users}
          status={topPosts.status}
          list="Top Projects"
          posts={topPosts ? topPosts.data : initialTopPosts}
        />
        {lastTopPost && topPosts.data.length % 3 === 0 && (
          <Button
            w="30%"
            variant="secondary"
            onClick={() => dispatch(getTopProjects())}
          >
            Load More
          </Button>
        )}
      </Stack>
      {auth.currentUser && (
        <Box>
          <Stack align="center">
            <PostList
              users={users}
              list="Favorite Projects"
              posts={favPosts.data}
              status={favPosts.status}
            />

            {lastFavPost && favPosts.data.length % 3 === 0 && (
              <Button
                w="30%"
                variant="secondary"
                onClick={() => dispatch(getFavPosts())}
              >
                Load More
              </Button>
            )}
          </Stack>
          <Stack align="center" spacing="6">
            <PostList
              users={users}
              status={mostRecentPosts.status}
              list="New Projects"
              posts={
                mostRecentPosts ? mostRecentPosts.data : initialMostRecentPosts
              }
            />
            {lastRecentPost && mostRecentPosts.data.length % 3 === 0 && (
              <Button
                w="30%"
                variant="secondary"
                onClick={() => dispatch(getMostRecentProjects())}
              >
                Load More
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
            ...(await serverSideTranslations(locale, ["home"])),
          },
        };
      } catch (err) {
        return {
          notFound: true,
        };
      }
    }
);
