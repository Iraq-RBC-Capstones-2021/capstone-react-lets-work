import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";
import SignUp from "../../components/SignUp/SignUp";
import CustomHead from "../../components/CustomHead";

function SignUpPage() {
  return (
    <>
      <CustomHead title="Sign Up" />
      <SignUp />
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
export default SignUpPage;
