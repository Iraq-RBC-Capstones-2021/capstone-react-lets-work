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
  Skeleton,
} from "@chakra-ui/react";
import { IoMdClose } from "react-icons/io";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Formik, Form } from "formik";
import { useRouter as router } from "next/dist/client/router";
import { useTranslation } from "next-i18next";
import * as Yup from "yup";
import { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import SettingInputMap from "../../components/Setting/SettingInputMap";
import { useImageValidation } from "../../components/Hooks/useImageValidation";
import { getUserProfileData } from "../../store/user/userSlice";
import { auth } from "../../firebase/firebase";
import { useSelector } from "react-redux";
import { usePopulateUserSlice } from "../../components/Hooks/usePopulateUserSlice";

export default function Index() {
  const [interestsArray, setInterestsArray] = useState([]);
  const [interestValue, setInterestValue] = useState("");
  const uploadInput = useRef();
  const { t } = useTranslation("setting");
  const [uploadedImage, setUploadedImage] = useState(null);
  const validatedImage = useImageValidation(uploadedImage);
  const userInfo = useSelector((state) => state.user.entities);
  const loading = useSelector((state) => state.user.loading);

  usePopulateUserSlice(getUserProfileData, auth.currentUser.uid);

  const initialValues = !loading
    ? {
        name: userInfo.name,
        username: userInfo.username,
        email: userInfo.email,
        bio: userInfo.bio,
        about: userInfo.about,
        skills_hobbies: userInfo.skills_hobbies,
        ...userInfo.social,
      }
    : {
        name: "",
        username: "",
        facebook: "",
        instagram: "",
        youtube: "",
        linkedIn: "",
        email: "",
        bio: "",
        about: "",
        skills_hobbies: "",
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
    linkedIn: Yup.string().url(),
    email: Yup.string().email("Invalid email").required("Required"),
    bio: Yup.string().min(5, "Too Short!").max(100, "Too Long!"),
    about: Yup.string().min(5, "Too Short!").max(300, "Too Long!"),
    skills_hobbies: Yup.string().min(2, "Too Short!").max(100, "Too Long!"),
  });

  function openFileUpload() {
    uploadInput.current.click();
  }

  const onChangeFile = (event) => {
    setUploadedImage(event.target.files[0]);
  };

  const addItemToInterestArray = (e) => {
    e.preventDefault();
    if (interestValue.length < 2) return;
    if (e.keyCode === 13 || e.type === "blur") {
      setInterestsArray((prev) => [
        ...prev,
        { id: uuidv4(), value: interestValue },
      ]);
      setInterestValue("");
    }
  };
  const deleteItemFromInterestArray = (id) => {
    setInterestsArray((prev) => prev.filter((interest) => interest.id !== id));
  };

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

  const submitSettingChanges = () => {};

  return !auth.currentUser && loading ? (
    <Skeleton h="100%" size="100%" />
  ) : (
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
                <Avatar size="2xl" src={auth.currentUser?.photoURL} />
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
              enableReinitialize={true}
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={submitSettingChanges}
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
                              <Input
                                placeholder={t("inputs.writeInterests")}
                                name="interests"
                                variant="ghost"
                                value={interestValue}
                                onChange={(e) =>
                                  setInterestValue(e.target.value)
                                }
                                onKeyDown={addItemToInterestArray}
                                onBlur={addItemToInterestArray}
                              />
                            </WrapItem>
                          </Wrap>{" "}
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
