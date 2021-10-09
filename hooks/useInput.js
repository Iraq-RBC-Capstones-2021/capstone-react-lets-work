import { useState } from "react";
const useInput = (validateValue) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isEdited, setIsEdited] = useState(false);
  const valueIsValid = validateValue(enteredValue);
  const hasError = !valueIsValid && isEdited;
  const inputChangeHandler = (e) => {
    setEnteredValue(e.target.value);
  };
  const inputBlurHandler = (e) => {
    setIsEdited(true);
  };
  const reset = () => {
    setEnteredValue("");
    setIsEdited(false);
  };
  return {
    value: enteredValue,
    isValid: valueIsValid,
    reset,
    hasError,
    inputBlurHandler,
    inputChangeHandler,
  };
};
export default useInput;
