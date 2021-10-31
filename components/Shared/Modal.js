import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
export default function modal({ isOpen, onClose, handleDelete, status }) {
  return (
    <>
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Are you sure?</ModalHeader>
          <ModalBody>
            Do you really want to delete this post? This process cannot be
            undone.
          </ModalBody>
          <ModalFooter>
            <Button _focus={{}} colorScheme="gray" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              isLoading={status === "loading"}
              onClick={handleDelete}
              colorScheme="red"
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
