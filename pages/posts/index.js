import { useRouter } from "next/dist/client/router";
import React from "react";

function Index() {
  const router = useRouter();
  router.push("/");
  return <div></div>;
}

export default Index;
