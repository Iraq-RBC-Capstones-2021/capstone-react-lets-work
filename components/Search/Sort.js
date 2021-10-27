import {
  Stack,
  IconButton,
  RadioGroup,
  Radio,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/dist/client/router";

const Sort = ({ setSortOption, sortOption }) => {
  const { t } = useTranslation("search");
  const { locale } = useRouter();

  const handleSortChange = (value) => {
    setSortOption(value);
  };

  return (
    <Popover>
      <PopoverTrigger>
        <IconButton // eslint-disable-next-line react/no-children-prop
          children={<RiArrowDropDownLine size="24" />}
          size="sm"
          bg="transparent"
          _hover={{ bg: "transparent" }}
          _active={{ bg: "transparent" }}
          _focus={{ boxShadow: "none", background: "transparent" }}
        />
      </PopoverTrigger>
      <PopoverContent
        _focus={{ boxShadow: "lg" }}
        boxShadow="lg"
        ml={{ base: "10px", md: "0px" }}
      >
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody dir={locale === "ar" ? "rtl" : "ltr"}>
          <RadioGroup
            onChange={handleSortChange}
            value={sortOption}
            dir={locale === "ar" ? "rtl" : "ltr"}
          >
            <Stack pl="1rem" mt={4}>
              <Radio value="latest">{t("latest")}</Radio>
              <Radio value="oldest">{t("oldest")}</Radio>
              <Radio value="most">{t("most")}</Radio>
              <Radio value="nearest">{t("nearest")}</Radio>
            </Stack>
          </RadioGroup>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default Sort;
