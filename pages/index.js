import styles from "../styles/Home.module.css";
import TopSection from "../components/Home/TopSection";

export default function Home() {
  return (
    <div className={styles.app}>
      <TopSection />
    </div>
  );
}
