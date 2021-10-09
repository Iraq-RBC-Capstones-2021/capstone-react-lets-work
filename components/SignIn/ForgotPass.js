/* eslint-disable react/no-children-prop */
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
  FormLabel,
  Input,
  useDisclosure,
  InputGroup,
  InputLeftElement,
  Stack,
} from "@chakra-ui/react";
import { BiEnvelope } from "react-icons/bi";
function ForgotPass({ isOpen, onClose }) {
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
                    children={<BiEnvelope size="20" />}
                  />
                  <Input
                    w={{ base: "18.7rem", md: "21.8rem" }}
                    placeholder="Email"
                    variant="white"
                    size="lg"
                    boxShadow="sm"
                    type="email"
                    border="1px solid #EAEAEA"
                    borderRadius="3px"
                  />
                </InputGroup>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button size="lg" w="10rem" variant="primary">
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
