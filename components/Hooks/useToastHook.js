import { useEffect } from "react";
import { useToast } from "@chakra-ui/react";

const useToastHook = (request) => {
  const toast = useToast();
  useEffect(() => {
    if (request.status === "fail") {
      toast({
        title: request.error,
        status: "error",
        variant: "subtle",
        position: "top",
        duration: 4000,
      });
    }
    if (request.status === "success") {
      toast({
        title: request.success,
        status: "success",
        variant: "subtle",
        position: "top",
        duration: 4000,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [request]);
};

export { useToastHook };
