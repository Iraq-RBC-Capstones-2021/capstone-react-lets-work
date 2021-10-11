import React from "react";
import { Button, Stack } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import ChakraInput from "../Shared/ChakraInput";
import { BiEnvelope } from "react-icons/bi";
import { useTranslation } from "next-i18next";
function ForgotPass() {
  const { t } = useTranslation("form");
  const initialValues = {
    email: "",
  };
  const onSubmit = (value, onSubmitProps) => {
    const email = value.email.trim();
    //TODO: Send an email reset request with the provided email
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
                />
              </Stack>

              <Button
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
