import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import SignIn from "../../components/SignIn/SignIn";

function SignInPage() {
  return <SignIn />;
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["form", "navbar"])),
    },
  };
}
export default SignInPage;
