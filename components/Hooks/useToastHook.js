import { useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import { useDispatch } from "react-redux";

const useToastHook = (request, resetToast) => {
  const dispatch = useDispatch();
  const toast = useToast();
  useEffect(() => {
    if (request.status === "fail" || request.status === "error") {
      toast({
        title: request.error,
        status: "error",
        variant: "subtle",
        position: "top",
        duration: 4000,
      });
      dispatch(resetToast());
    }
    if (request.status === "success") {
      toast({
        title: request.success,
        status: "success",
        variant: "subtle",
        position: "top",
        duration: 4000,
      });
      dispatch(resetToast());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [request]);
};

export { useToastHook };
