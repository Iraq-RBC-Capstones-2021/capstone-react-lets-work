import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  Button,
  Wrap,
  WrapItem,
  Input,
  IconButton,
} from "@chakra-ui/react";
import { IoMdClose } from "react-icons/io";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Formik, Form, ErrorMessage, Field } from "formik";
import TextError from "../../components/Shared/TextError";
import { useRouter as router } from "next/dist/client/router";
import { useTranslation } from "next-i18next";
import * as Yup from "yup";
import { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import SettingInputMap from "../../components/Setting/SettingInputMap";
import { useImageValidation } from "../../components/Hooks/useImageValidation";

export default function Index() {
  const [interestsArray, setInterestsArray] = useState([]);
  const uploadInput = useRef();
  const { t } = useTranslation("setting");
  const [uploadedImage, setUploadedImage] = useState(null);
  const validatedImage = useImageValidation(uploadedImage);

  const initialValues = {
    name: "",
    username: "",
    facebook: "",
    instagram: "",
    youtube: "",
    linkedin: "",
    email: "",
    bio: "",
    about: "",
    skillsAndHobbies: "",
    interests: "",
  };
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Please enter your name"),
    username: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Please enter a valid username"),
    facebook: Yup.string().url(),
    instagram: Yup.string().url(),
    youtube: Yup.string().url(),
    linkedin: Yup.string().url(),
    email: Yup.string().email("Invalid email").required("Required"),
    bio: Yup.string().min(5, "Too Short!").max(100, "Too Long!"),
    about: Yup.string().min(5, "Too Short!").max(300, "Too Long!"),
    skillsAndHobbies: Yup.string().min(2, "Too Short!").max(100, "Too Long!"),
    interests: Yup.string().min(5, "Too Short!").max(60, "Too Long!"),
  });

  function openFileUpload() {
    uploadInput.current.click();
  }

  const onChangeFile = (event) => {
    setUploadedImage(event.target.files[0]);
  };

  const addItemToInterestArray = (e) => {
    if (e.keyCode === 13 || e.type === "blur") {
      setInterestsArray((prev) => [
        ...prev,
        { id: uuidv4(), value: e.target.value },
      ]);
    }
  };
  const deleteItemFromInterestArray = (id) => {
    setInterestsArray((prev) => prev.filter((interest) => interest.id !== id));
  };

  //Below function will create all the input and textareas
  //by iterating the inputs key located in public/locales/en/setting.json
  //
  const mapInputsArray = (inputListObject) => {
    inputListObject = Object.entries(inputListObject);
    let inputList = [];
    for (let input = 0; input < 20; input = input + 2) {
      if (input > 13) {
        inputList.push(
          <SettingInputMap
            key={inputListObject[input][0]}
            isTextarea={true}
            name={inputListObject[input][0]}
            label={t(inputListObject[input][1])}
            placeholder={t(inputListObject[input + 1][1])}
          />
        );
      } else {
        inputList.push(
          <SettingInputMap
            key={inputListObject[input][0]}
            isTextarea={false}
            name={inputListObject[input][0]}
            label={t(inputListObject[input][1])}
            placeholder={t(inputListObject[input + 1][1])}
          />
        );
      }
    }
    return inputList;
  };

  const inputList = mapInputsArray(t("inputs", { returnObjects: true }));

  return (
    <Center p="6" dir={router().locale === "ar" ? "rtl" : "ltr"}>
      <Stack>
        <Heading>{t("accountSetting")}</Heading>
        <Box
          bg="white"
          w={["95vw", "85vw", "85vw", "85vw"]}
          rounded={["5px", "15px", "15px", "15px"]}
          p="6"
          overflow="hidden"
        >
          <Box w="70vw">
            <Wrap align="center" pb="8">
              <WrapItem>
                <Avatar
                  size="2xl"
                  name="Segun Adebayo"
                  src="/images/avatar.png"
                />
              </WrapItem>
              <WrapItem>
                <Input
                  hidden
                  ref={uploadInput}
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={onChangeFile}
                />
                <Button
                  rounded="5px"
                  backgroundColor="lightPurple"
                  color="white"
                  _hover={{ bg: "darkPurple" }}
                  onClick={() => openFileUpload()}
                >
                  {t("uploadNewPhoto")}
                </Button>
              </WrapItem>{" "}
              {validatedImage.imageUploadError ? (
                <Text color="red.400">{validatedImage.imageUploadError}</Text>
              ) : (
                <Text color="green.400">
                  {validatedImage.imageUploadSuccess}
                </Text>
              )}
            </Wrap>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
            >
              {() => {
                return (
                  <Form>
                    {inputList}
                    <Wrap>
                      <WrapItem alignItems="center" w="9em">
                        <Text>{t("inputs.interests")}:</Text>
                      </WrapItem>
                      <WrapItem>
                        <Box
                          w={["80vw", "50vw", "50vw", "50vw"]}
                          minH="10vw"
                          borderWidth="1px"
                          rounded="7"
                        >
                          <Wrap>
                            {interestsArray.map((interest) => (
                              <WrapItem key={interest.id}>
                                <Box
                                  m="1"
                                  size="sm"
                                  color="blue.400"
                                  bgColor="blue.100"
                                  rounded="100"
                                  dir="ltr"
                                  pl="2"
                                >
                                  {interest.value}
                                  <IconButton
                                    ml="2"
                                    size="sm"
                                    rounded="100"
                                    variant="ghost"
                                    icon={<IoMdClose />}
                                    onClick={() =>
                                      deleteItemFromInterestArray(interest.id)
                                    }
                                  />
                                </Box>
                              </WrapItem>
                            ))}
                            <WrapItem>
                              <Field
                                as={Input}
                                placeholder={t("inputs.writeInterests")}
                                name="interests"
                                variant="ghost"
                                onKeyDown={addItemToInterestArray}
                                onBlur={addItemToInterestArray}
                              />
                            </WrapItem>
                          </Wrap>{" "}
                          <ErrorMessage
                            name="interests"
                            component={TextError}
                          />
                        </Box>
                      </WrapItem>
                    </Wrap>
                    <Center>
                      <Button
                        mt="5"
                        w="20vw"
                        rounded="5px"
                        backgroundColor="lightPurple"
                        color="white"
                        _hover={{ bg: "darkPurple" }}
                        type="submit"
                      >
                        {t("save")}
                      </Button>
                    </Center>
                  </Form>
                );
              }}
            </Formik>
          </Box>
        </Box>
      </Stack>
    </Center>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "setting",
        "useImageValidation",
      ])),
    },
  };
}
