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
} from "@chakra-ui/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ChakraInput from "../../components/Shared/ChakraInput";
import { Formik, Form, ErrorMessage, Field } from "formik";
import TextError from "../../components/Shared/TextError";
import { useRouter as router } from "next/dist/client/router";
import { useTranslation } from "next-i18next";
import * as Yup from "yup";
import ChakraTextarea from "../../components/Shared/ChakraTextarea";
import { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function Index() {
  const [imageFileState, setImageFileState] = useState({
    file: null,
    imageUploadError: null,
  });
  const [interestsArray, setInterestsArray] = useState(["lmao"]);
  const uploadInput = useRef();
  const { t } = useTranslation("setting");
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
    const imageFile = event.target.files[0];

    if (!imageFile) {
      return;
    }

    if (!imageFile.name.match(/\.(jpg|jpeg|png)$/)) {
      setImageFileState({
        imageUploadError: "Only jpg/jpeg/png extentions are allowed.",
      });
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = (image) => {
      const img = new Image();
      img.onload = () => {
        setImageFileState({ file: imageFile, imageUploadError: undefined });
      };
      img.onerror = () => {
        setImageFileState({ imageUploadError: "Invalid image content." });
        return false;
      };
      img.src = image.target.result;
    };
    fileReader.readAsDataURL(imageFile);
  };
  const handleInterestArray = (e) => {
    if (e.keyCode === 13) {
      setInterestsArray((prev) => [...prev, e.target.value]);
    }
  };
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
            <Wrap align="center">
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
              {imageFileState.file === undefined ? (
                <Text color="red.400">{imageFileState.imageUploadError}</Text>
              ) : null}
            </Wrap>
            {/* there is alot of repetative code here inside the Formik, this will be fixed later */}
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
            >
              {() => {
                return (
                  <Form>
                    <Wrap pt="8">
                      <WrapItem alignItems="center" w="9em">
                        <Text> {t("name")}:</Text>
                      </WrapItem>
                      <WrapItem>
                        <ChakraInput
                          fontSize="md"
                          size="lg"
                          type="text"
                          name="name"
                          w={["80vw", "50vw", "30vw", "30vw"]}
                          placeholder={t("addName")}
                        />
                      </WrapItem>
                    </Wrap>
                    <Wrap>
                      <WrapItem alignItems="center" w="9em">
                        <Text> {t("username")}:</Text>
                      </WrapItem>
                      <WrapItem>
                        <ChakraInput
                          fontSize="md"
                          size="lg"
                          type="text"
                          name="username"
                          w={["80vw", "50vw", "30vw", "30vw"]}
                          placeholder={t("addUsername")}
                        />
                      </WrapItem>
                    </Wrap>
                    <Wrap>
                      <WrapItem alignItems="center" w="9em">
                        <Text> {t("email")}:</Text>
                      </WrapItem>
                      <WrapItem>
                        <ChakraInput
                          fontSize="md"
                          size="lg"
                          type="text"
                          name="email"
                          w={["80vw", "50vw", "30vw", "30vw"]}
                          placeholder={t("addEmail")}
                        />
                      </WrapItem>
                    </Wrap>
                    <Wrap>
                      <WrapItem alignItems="center" w="9em">
                        <Text> {t("facebook")}:</Text>
                      </WrapItem>
                      <WrapItem>
                        <ChakraInput
                          fontSize="md"
                          size="lg"
                          type="text"
                          name="facebook"
                          w={["80vw", "50vw", "30vw", "30vw"]}
                          placeholder={t("addFacebook")}
                        />
                      </WrapItem>
                    </Wrap>
                    <Wrap>
                      <WrapItem alignItems="center" w="9em">
                        <Text> {t("instagram")}:</Text>
                      </WrapItem>
                      <WrapItem>
                        <ChakraInput
                          fontSize="md"
                          size="lg"
                          type="text"
                          name="instagram"
                          w={["80vw", "50vw", "30vw", "30vw"]}
                          placeholder={t("addInstagram")}
                        />
                      </WrapItem>
                    </Wrap>
                    <Wrap>
                      <WrapItem alignItems="center" w="9em">
                        <Text> {t("youtube")}</Text>
                      </WrapItem>
                      <WrapItem>
                        <ChakraInput
                          fontSize="md"
                          size="lg"
                          type="text"
                          name="youtube"
                          w={["80vw", "50vw", "30vw", "30vw"]}
                          placeholder={t("addYoutube")}
                        />
                      </WrapItem>
                    </Wrap>
                    <Wrap>
                      <WrapItem alignItems="center" w="9em">
                        <Text> {t("linkedin")}:</Text>
                      </WrapItem>
                      <WrapItem>
                        <ChakraInput
                          fontSize="md"
                          size="lg"
                          type="text"
                          name="linkedin"
                          w={["80vw", "50vw", "30vw", "30vw"]}
                          placeholder={t("addLinkedin")}
                        />
                      </WrapItem>
                    </Wrap>
                    <Wrap>
                      <WrapItem alignItems="center" w="9em">
                        <Text>{t("bio")}:</Text>
                      </WrapItem>
                      <WrapItem>
                        <ChakraTextarea
                          placeholder={t("writeBio")}
                          name="bio"
                          w={["80vw", "50vw", "50vw", "50vw"]}
                          h="10vw"
                        />
                      </WrapItem>
                    </Wrap>
                    <Wrap>
                      <WrapItem alignItems="center" w="9em">
                        <Text>{t("about")}:</Text>
                      </WrapItem>
                      <WrapItem>
                        <ChakraTextarea
                          placeholder={t("writeAbout")}
                          name="about"
                          w={["80vw", "50vw", "50vw", "50vw"]}
                          h="10vw"
                        />
                      </WrapItem>
                    </Wrap>
                    <Wrap>
                      <WrapItem alignItems="center" w="9em">
                        <Text>{t("skillsAndHobbies")}:</Text>
                      </WrapItem>
                      <WrapItem>
                        <ChakraTextarea
                          placeholder={t("WriteSkillsAndHobbies")}
                          name="skillsAndHobbies"
                          w={["80vw", "50vw", "50vw", "50vw"]}
                          h="10vw"
                        />
                      </WrapItem>
                    </Wrap>
                    <Wrap>
                      <WrapItem alignItems="center" w="9em">
                        <Text>{t("interests")}:</Text>
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
                              <WrapItem key={uuidv4()}>
                                <Button
                                  type="button"
                                  size="sm"
                                  bgColor="blue.100"
                                  rounded="100"
                                  m="1"
                                >
                                  {interest}
                                </Button>
                              </WrapItem>
                            ))}
                            <WrapItem>
                              <Field
                                as={Input}
                                placeholder={t("writeInterests")}
                                name="interests"
                                variant="ghost"
                                onKeyDown={handleInterestArray}
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
                  </Form>
                );
              }}
            </Formik>
          </Box>
          <Center>
            <Button
              mt="5"
              w="20vw"
              rounded="5px"
              backgroundColor="lightPurple"
              color="white"
              _hover={{ bg: "darkPurple" }}
            >
              {t("save")}
            </Button>
          </Center>
        </Box>
      </Stack>
    </Center>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["setting"])),
    },
  };
}
