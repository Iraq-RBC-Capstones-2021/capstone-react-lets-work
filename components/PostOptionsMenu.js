import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import { HiDotsVertical } from "react-icons/hi";

export default function PostOptionsMenu() {
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
        <MenuItem>Edit Post</MenuItem>
        <MenuItem textColor="red.500">Delete Post</MenuItem>
      </MenuList>
    </Menu>
  );
}
