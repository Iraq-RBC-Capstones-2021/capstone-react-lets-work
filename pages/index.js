import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import TopSection from "../components/Home/TopSection";
export default function Home() {
  return (
    <div>
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
