import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import styles from "../styles/Home.module.css";
import TopSection from "../components/Home/TopSection";
import { Comment } from "../components/Comment";
export default function Home() {
  return (
    <div className={styles.app}>
      <TopSection />
      <Comment />
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
