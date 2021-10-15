import React, { useEffect } from "react";
import { Button, Stack, useToast } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import ChakraInput from "../Shared/ChakraInput";
import { BiEnvelope } from "react-icons/bi";
import { useTranslation } from "next-i18next";
import { useDispatch, useSelector } from "react-redux";
import { handleForgetPass } from "../../store/auth/authSlice";
function ForgotPass() {
  const { t } = useTranslation("form");
  const dispatch = useDispatch();
  const forgotPass = useSelector((state) => state.auth.forgotPass);
  const toast = useToast();
  useEffect(() => {
    if (forgotPass.status === "success") {
      toast({
        title: "Email sent!",
        status: "success",
        variant: "subtle",
        position: "top",
        duration: 3000,
      });
    }
    if (forgotPass.status === "error") {
      toast({
        title: forgotPass.errorMessage,
        status: "error",
        variant: "subtle",
        position: "top",
        duration: 3000,
      });
    }
  }, [forgotPass.status, toast, forgotPass.errorMessage]);
  const initialValues = {
    email: "",
  };
  const onSubmit = (value, onSubmitProps) => {
    const email = value.email.trim();
    dispatch(handleForgetPass(email));
    onSubmitProps.resetForm();
  };
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Please enter a valid email")
      .required("Please enter your email address"),
  });
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(Formik) => {
        return (
          <Form>
            <Stack align="center" justify="center" spacing="8">
              <Stack align="center" justify="center" spacing="4">
                <ChakraInput
                  type="email"
                  name="email"
                  placeholder={t("email")}
                  size="lg"
                  w={{ base: "18.7rem", md: "21.8rem" }}
                  leftIcon={<BiEnvelope size="20" />}
                  isLoading={forgotPass.status === "loading"}
                />
              </Stack>

              <Button
                isLoading={forgotPass.status === "loading"}
                w={{ base: "18.7rem", md: "21.8rem" }}
                size="lg"
                bg="#5E6DFF"
                variant="primary"
                fontWeight="black"
                type="submit"
              >
                {t("reset")}
              </Button>
            </Stack>
          </Form>
        );
      }}
    </Formik>
  );
}

export default ForgotPass;
