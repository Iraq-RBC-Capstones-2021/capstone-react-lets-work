import React from "react";
import { Field } from "formik";
import { FormControl, Text, Checkbox } from "@chakra-ui/react";
function ChakraCheckbox(props) {
  const { label, name, leftIcon, rightIcon, content, ...rest } = props;
  return (
    <Field name={name}>
      {({ field, form }) => {
        return (
          <FormControl isInvalid={form.errors[name] && form.touched[name]}>
            <Checkbox {...rest} {...field}>
              <Text fontSize="md">{content}</Text>
            </Checkbox>
          </FormControl>
        );
      }}
    </Field>
  );
}

export default ChakraCheckbox;
