import { Text, Wrap, WrapItem } from "@chakra-ui/layout";
import ChakraInput from "../Shared/ChakraInput";
import ChakraTextarea from "../Shared/ChakraTextarea";

export default function SettingInputMap({
  isTextarea,
  label,
  placeholder,
  name,
}) {
  return (
    <Wrap>
      <WrapItem alignItems="center" w="9em">
        <Text> {label}:</Text>
      </WrapItem>
      <WrapItem>
        {isTextarea ? (
          <ChakraTextarea
            name={name}
            w={["80vw", "50vw", "50vw", "50vw"]}
            h="10vw"
            placeholder={placeholder}
          />
        ) : (
          <ChakraInput
            fontSize="md"
            size="lg"
            type="text"
            name={name}
            placeholder={placeholder}
            w={["80vw", "50vw", "30vw", "30vw"]}
          />
        )}
      </WrapItem>
    </Wrap>
  );
}
