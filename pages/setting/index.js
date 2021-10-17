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
} from "@chakra-ui/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ChakraInput from "../../components/Shared/ChakraInput";
import { Formik, Form } from "formik";
import { useRouter as router } from "next/dist/client/router";
import { useTranslation } from "next-i18next";
import * as Yup from "yup";
import ChakraTextarea from "../../components/Shared/ChakraTextarea";

export default function Index() {
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
    intrests: Yup.string().min(2, "Too Short!").max(100, "Too Long!"),
  });
  return (
    <Center p="6" dir={router().locale === "ar" ? "rtl" : "ltr"}>
      <Stack>
        <Heading>{t("accountSetting")}</Heading>
        <Box w="85vw" bg="white" rounded="15px" p="6" overflow="hidden">
          <Wrap>
            <WrapItem>
              <Avatar
                size="2xl"
                name="Segun Adebayo"
                src="https://bit.ly/sage-adebayo"
              />
            </WrapItem>
            <WrapItem alignItems="center">
              <Button
                rounded="5px"
                backgroundColor="lightPurple"
                color="white"
                _hover={{ bg: "darkPurple" }}
              >
                {t("uploadNewPhoto")}
              </Button>
            </WrapItem>
          </Wrap>
          {/* there is alot of repetative code here inside the Formik, this will be fixed later */}
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
          >
            {() => {
              return (
                <Form>
                  <Box
                    mt="6"
                    px="6"
                    display={["block", "block", "flex", "flex"]}
                  >
                    <Box w="50vw">
                      <Wrap>
                        <WrapItem alignItems="center" w="15vw">
                          <Text> {t("name")}:</Text>
                        </WrapItem>
                        <WrapItem>
                          <ChakraInput size="lg" type="text" name="name" />
                        </WrapItem>
                      </Wrap>
                      <Wrap>
                        <WrapItem alignItems="center" w="15vw">
                          <Text> {t("username")}:</Text>
                        </WrapItem>
                        <WrapItem>
                          <ChakraInput size="lg" type="text" name="username" />
                        </WrapItem>
                      </Wrap>
                      <Wrap>
                        <WrapItem alignItems="center" w="15vw">
                          <Text> {t("email")}:</Text>
                        </WrapItem>
                        <WrapItem>
                          <ChakraInput size="lg" type="text" name="email" />
                        </WrapItem>
                      </Wrap>
                      <Wrap>
                        <WrapItem alignItems="center" w="15vw">
                          <Text> {t("facebook")}:</Text>
                        </WrapItem>
                        <WrapItem>
                          <ChakraInput size="lg" type="text" name="facebook" />
                        </WrapItem>
                      </Wrap>
                      <Wrap>
                        <WrapItem alignItems="center" w="15vw">
                          <Text> {t("instagram")}:</Text>
                        </WrapItem>
                        <WrapItem>
                          <ChakraInput size="lg" type="text" name="instagram" />
                        </WrapItem>
                      </Wrap>
                      <Wrap>
                        <WrapItem alignItems="center" w="15vw">
                          <Text> {t("youtube")}</Text>
                        </WrapItem>
                        <WrapItem>
                          <ChakraInput size="lg" type="text" name="youtube" />
                        </WrapItem>
                      </Wrap>
                      <Wrap>
                        <WrapItem alignItems="center" w="15vw">
                          <Text> {t("linkedin")}:</Text>
                        </WrapItem>
                        <WrapItem>
                          <ChakraInput size="lg" type="text" name="linkedin" />
                        </WrapItem>
                      </Wrap>
                    </Box>
                  </Box>
                  <Box w="100vw" mt="6" ml="6">
                    <Wrap>
                      <WrapItem alignItems="center" w="15vw">
                        <Text>{t("bio")}:</Text>
                      </WrapItem>
                      <WrapItem>
                        <ChakraTextarea
                          placeholder={t("writeBio")}
                          name="bio"
                          w="57vw"
                          h="10vw"
                        />
                      </WrapItem>
                    </Wrap>
                    <Wrap>
                      <WrapItem alignItems="center" w="15vw">
                        <Text>{t("about")}:</Text>
                      </WrapItem>
                      <WrapItem>
                        <ChakraTextarea
                          placeholder={t("writeAbout")}
                          name="about"
                          w="57vw"
                          h="10vw"
                        />
                      </WrapItem>
                    </Wrap>
                    <Wrap>
                      <WrapItem alignItems="center" w="15vw">
                        <Text>{t("skillsAndHobbies")}:</Text>
                      </WrapItem>
                      <WrapItem>
                        <ChakraTextarea
                          placeholder={t("WriteSkillsAndHobbies")}
                          name="skillsAndHobbies"
                          w="57vw"
                          h="10vw"
                        />
                      </WrapItem>
                    </Wrap>
                    <Wrap>
                      <WrapItem alignItems="center" w="15vw">
                        <Text>{t("interests")}:</Text>
                      </WrapItem>
                      <WrapItem>
                        <ChakraInput
                          placeholder={t("writeInterests")}
                          size="lg"
                          type="text"
                          name="intrests"
                          w="57vw"
                        />
                      </WrapItem>
                    </Wrap>
                  </Box>
                </Form>
              );
            }}
          </Formik>
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
