import React from "react";
import { Field } from "formik";
import {
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  InputGroup,
  InputLeftElement,
  Stack,
  InputRightElement,
  Text,
  FormHelperText,
} from "@chakra-ui/react";
function ChakraInput(props) {
  const { label, name, leftIcon, rightIcon, isLoading, ...rest } = props;
  return (
    <Field name={name}>
      {({ field, form }) => {
        return (
          <FormControl
            isDisabled={isLoading}
            isInvalid={form.errors[name] && form.touched[name]}
          >
            <InputGroup>
              <Input
                variant={
                  form.errors[name] && form.touched[name] ? "error" : "primary"
                }
                w="18rem"
                id={name}
                {...rest}
                {...field}
              />
              {leftIcon ? (
                <InputLeftElement
                  h="46px"
                  pointerEvents="none"
                  // eslint-disable-next-line react/no-children-prop
                  children={leftIcon}
                />
              ) : null}
              {rightIcon ? (
                <InputRightElement
                  h="46px"
                  pointerEvents="none"
                  // eslint-disable-next-line react/no-children-prop
                  children={rightIcon}
                />
              ) : null}
            </InputGroup>
            {form.errors[name] && form.touched[name] && (
              <FormHelperText color="#cc0000">
                {" "}
                {form.errors[name]}{" "}
              </FormHelperText>
            )}
          </FormControl>
        );
      }}
    </Field>
  );
}

export default ChakraInput;
