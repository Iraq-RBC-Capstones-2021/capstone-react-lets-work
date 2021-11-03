import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import { IoLanguage } from "react-icons/io5";
import { useRouter } from "next/router";

export default function LanguageSwitcher() {
  const router = useRouter();
  const { pathname, asPath, query } = router;

  const changeLanguage = (ln) => {
    router.push({ pathname, query }, asPath, { locale: ln });
  };

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Languages"
        icon={<IoLanguage />}
        variant="ghost"
      />
      <MenuList>
        <MenuItem
          onClick={() => {
            changeLanguage("en");
          }}
        >
          English
        </MenuItem>
        <MenuItem
          onClick={() => {
            changeLanguage("ar");
          }}
        >
          Arabic
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
