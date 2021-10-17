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

const Sort = () => {
  const { t } = useTranslation("search");
  const { locale } = useRouter();

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
        <PopoverBody>
          <RadioGroup defaultValue="1">
            <Stack pl="1rem">
              <Radio value="1">{t("latest")}</Radio>
              <Radio value="2">{t("oldest")}</Radio>
              <Radio value="3">{t("most")}</Radio>
              <Radio value="4">{t("nearest")}</Radio>
            </Stack>
          </RadioGroup>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default Sort;
