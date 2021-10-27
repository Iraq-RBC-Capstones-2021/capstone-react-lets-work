import { Heading } from "@chakra-ui/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function Chat() {
  return <Heading as="h1">Chat Page</Heading>;
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["navbar"])),
    },
  };
}
