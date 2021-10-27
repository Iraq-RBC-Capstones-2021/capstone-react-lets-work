import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import { HiDotsVertical } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, resetEditStatus } from "../store/posts/postSlice";
import { useToastHook } from "./Hooks/useToastHook";
import Modal from "./Shared/Modal";

export default function PostOptionsMenu({ postId }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const deleteStatus = useSelector((state) => state.posts.deletePostStatus);
  const { isOpen, onOpen, onClose } = useDisclosure();
  useToastHook(
    {
      status: deleteStatus,
      success: "Project Deleted",
      error: "Something went wrong",
    },
    resetEditStatus
  );
  if (deleteStatus === "success") {
    router.push("/");
  }
  function handleDelete() {
    dispatch(deletePost(postId));
  }
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<HiDotsVertical />}
        variant="ghost"
        rounded="100"
      />
      <MenuList>
        <MenuItem onClick={() => router.push(`/posts/edit/${postId}`)}>
          Edit Post
        </MenuItem>
        <MenuItem onClick={onOpen} textColor="red.500">
          Delete Post
        </MenuItem>
      </MenuList>
      <Modal
        status={deleteStatus}
        handleDelete={handleDelete}
        onClose={onClose}
        isOpen={isOpen}
      />
    </Menu>
  );
}
