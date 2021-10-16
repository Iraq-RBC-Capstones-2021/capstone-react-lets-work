import { Field } from "formik";
import { Textarea } from "@chakra-ui/react";
function ChakraTextarea({ name, ...rest }) {
  return (
    <Field name={name}>
      <Textarea></Textarea>
    </Field>
  );
}

export default ChakraTextarea;
