import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import SignIn from "../../components/SignIn/SignIn";
import CustomHead from "../../components/CustomHead";

function SignInPage() {
  return (
    <>
      <CustomHead title="Sign In" />
      <SignIn />
    </>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["form", "navbar"])),
    },
  };
}
export default SignInPage;
