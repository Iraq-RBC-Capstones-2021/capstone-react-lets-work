import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import styles from "../styles/Home.module.css";
import TopSection from "../components/Home/TopSection";
import PostList from "../components/Home/posts/PostList";
const postSample = [
  {
    createdAt: "posted 12/12/2021",
    description:
      "Hidden universe revealed in stunning first images from German telescope",
    imageURL: "https://source.unsplash.com/random",
    isCompleted: "false",
    likes: ["userId", "userId"],
    tags: ["Design", "Rocket", "Telescope"],
    title: "Coding challenge",
    userId: "",
    postId: "1",
  },

  {
    createdAt: "12/12/2021",
    description:
      "Hidden universe revealed in stunning first images from German telescope",
    imageURL: "https://source.unsplash.com/random/2",
    isCompleted: "false",
    likes: ["userId"],
    tags: ["Design", "Rocket", "Telescope"],
    title: "Coding challenge",
    userId: "",
    postId: "2",
  },

  {
    createdAt: "12/12/2021",
    description:
      "Hidden universe revealed in stunning first images from German telescope Hidden universe revealed in stunning first images from German telescope",
    imageURL: "",
    isCompleted: "false",
    likes: ["userId", "userId", "userId", "userId"],
    tags: ["Design", "Rocket", "Telescope"],
    title: "Health Care System",
    userId: "",
    postId: "3",
  },
];
export default function Home() {
  return (
    <div className={styles.app}>
      <TopSection />
      <PostList posts={postSample} />
    </div>
  );
}
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["home"])),
    },
  };
}
