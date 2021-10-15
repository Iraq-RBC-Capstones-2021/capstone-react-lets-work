import { Flex, Stack, Text, Button, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { auth } from "../../firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import { sendVerificationEmail } from "../../store/auth/authSlice";

function EmailVerification() {
  const verificationEmail = useSelector((state) => state.auth.verficationEmail);
  const toast = useToast();
  useEffect(() => {
    verificationEmail.status === "success" &&
      toast({
        title: "Sent successfully",
        status: "success",
        variant: "subtle",
        position: "top",
        duration: 3000,
      });
    verificationEmail.status === "error" &&
      toast({
        title: "Please wait before sending another request",
        status: "warning",
        position: "top",
        variant: "subtle",
        duration: 3000,
      });
  }, [verificationEmail, toast]);
  const dispatch = useDispatch();
  function handleEmailVerification() {
    dispatch(sendVerificationEmail());
  }

  return (
    <Flex
      justify="space-around"
      direction="column"
      bg="secondary.main"
      flexBasis={{ base: "100%", lg: "50%" }}
      align="center"
    >
      <Stack h="50" align="center">
        <Text fontWeight="semibold" fontSize="6xl">
          Check Your Email
        </Text>
        <Stack spacing="8" align="center">
          <Text fontWeight="light" fontSize="lg">
            {auth.currentUser?.email}
          </Text>
          <Text fontSize="lg">
            We have sent a verification link to your email
          </Text>
          <Text>Didn&apos;t receive an email?</Text>
        </Stack>
      </Stack>

      <Button
        mt="5"
        isLoading={verificationEmail.status === "loading"}
        onClick={handleEmailVerification}
        w={{ base: "18.7rem", md: "21.8rem" }}
        size="lg"
        variant="primary"
        fontWeight="black"
        type="submit"
        _hover={{ _disabled: {} }}
        _disabled={{ cursor: "auto", bg: "#919bff" }}
      >
        {" "}
        Send another email{" "}
      </Button>

      <Text>
        Once you verify your account refresh the page and you will be redirected
      </Text>
    </Flex>
  );
}

export default EmailVerification;
