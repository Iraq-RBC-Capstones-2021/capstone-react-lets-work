import { ErrorMessage, Field } from "formik";
import { Textarea } from "@chakra-ui/react";
import TextError from "./TextError";
function ChakraTextarea({ name, ...rest }) {
  return (
    <>
      <Field as={Textarea} name={name} {...rest} />
      <ErrorMessage name={name} component={TextError} />
    </>
  );
}

export default ChakraTextarea;
