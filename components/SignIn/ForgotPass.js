import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
  FormHelperText,
  Stack,
} from "@chakra-ui/react";
import useInput from "../../hooks/useInput";
import { BiEnvelope } from "react-icons/bi";
function ForgotPass({ isOpen, onClose }) {
  const {
    value: emailValue,
    isValid: emailIsValid,
    reset: emailReset,
    hasError: emailHasError,
    inputBlurHandler: emailBlurHandler,
    inputChangeHandler: emailChangeHandler,
  } = useInput((value) => value.includes("@"));
  function forgotPassHandler() {
    //check if the email exists in the database
    if (!emailIsValid) {
      return;
    }
    //dispatch a resetpassword action
    emailReset();
  }
  return (
    <>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="secondary.main">
          <ModalHeader pl="14">Request a password reset</ModalHeader>
          <ModalCloseButton />
          <Stack align="center">
            <ModalBody pb={6}>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    fontSize="lg"
                    h="46px"
                    // eslint-disable-next-line react/no-children-prop
                    children={<BiEnvelope size="20" />}
                  />
                  <Input
                    w={{ base: "18.7rem", md: "21.8rem" }}
                    value={emailValue}
                    onChange={emailChangeHandler}
                    onBlur={emailBlurHandler}
                    placeholder="Email"
                    variant={emailHasError ? "error" : "primary"}
                    size="lg"
                    type="email"
                  />
                </InputGroup>
                {emailHasError ? (
                  <FormHelperText color="#cc0000">
                    enter a valid email
                  </FormHelperText>
                ) : null}
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                onClick={forgotPassHandler}
                size="lg"
                w="10rem"
                variant="primary"
              >
                Submit
              </Button>
            </ModalFooter>
          </Stack>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ForgotPass;
