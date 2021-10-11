import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import styles from "../styles/Home.module.css";
import TopSection from "../components/Home/TopSection";
export default function Home() {
  return (
    <div className={styles.app}>
      <TopSection />
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
