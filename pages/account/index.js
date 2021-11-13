import { useRouter } from "next/dist/client/router";
import React from "react";
import { auth } from "../../firebase/firebase";

function Index() {
  const router = useRouter();
  router.push(`/account/${auth.currentUser?.uid}`);

  return <div></div>;
}

export default Index;
