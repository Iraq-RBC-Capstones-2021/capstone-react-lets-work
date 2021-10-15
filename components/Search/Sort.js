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

const Sort = () => {
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
              <Radio value="1">Latest Projects</Radio>
              <Radio value="2">Oldest Projects</Radio>
              <Radio value="3">Most Popular</Radio>
              <Radio value="4">Nearest Projects</Radio>
            </Stack>
          </RadioGroup>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default Sort;
