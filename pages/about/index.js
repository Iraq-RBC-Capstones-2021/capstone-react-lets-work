import {
  Box,
  Container,
  Heading,
  Stack,
  Text,
  SimpleGrid,
  Image,
  Center,
} from "@chakra-ui/react";
import NextImage from "next/image";
import Feature from "../../components/About/Feature";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/dist/client/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import CustomHead from "../../components/CustomHead";

export default function About() {
  const { t } = useTranslation("about");
  const { locale } = useRouter();
  return (
    <div>
      <CustomHead title="About" />
      <Stack
        bg="secondary.main"
        py={{ base: 8, md: 16 }}
        px="10px"
        textAlign="center"
      >
        <Heading
          fontWeight={700}
          fontSize={{ base: "30px", sm: "40px", md: "50px" }}
          lineHeight="70px"
        >
          {t("what")}
        </Heading>
        <Center>
          <Text
            color="#000"
            maxW="600px"
            fontSize="24px"
            fontWeight="400"
            textAlign="center"
            mt="2rem"
            lineHeight="140%"
          >
            {t("about")}
          </Text>
        </Center>
        <Center>
          <Image
            as={NextImage}
            src="images/Goodteam.svg"
            width={{ sm: "24rem", lg: "429px" }}
            alt="goodteambro"
            height={{ sm: "24rem", lg: "429px" }}
            mt="0"
          />
        </Center>
      </Stack>

      <Stack
        flexDirection={{ base: "column", md: "row" }}
        py={{ base: 8, md: 16 }}
        justifyContent="center"
        alignItems="center"
      >
        <Stack>
          <Image
            as={NextImage}
            src="images/Team-amico 1.svg"
            width={{ base: "24rem", lg: "429px" }}
            alt="goodteambro"
            height={{ base: "24rem", lg: "429px" }}
            mt="0"
          />
        </Stack>
        <Container>
          <Stack>
            <Heading
              fontWeight={700}
              fontSize={{ base: "30px", sm: "40px", md: "50px" }}
              lineHeight="70px"
              textAlign="center"
            >
              {t("discussion")}
            </Heading>
            <Center>
              <Text
                color="#000"
                maxW="600px"
                fontSize="24px"
                fontWeight="400"
                textAlign="center"
                mt="2rem"
                lineHeight="140%"
              >
                {t("discussion_text")}
              </Text>
            </Center>
          </Stack>
        </Container>
      </Stack>

      <Stack
        bg="secondary.main"
        py={{ base: 8, md: 16 }}
        px={8}
        textAlign="center"
      >
        <Heading
          fontWeight={700}
          fontSize={{ base: "30px", sm: "40px", md: "50px" }}
          lineHeight="70px"
          mb={8}
        >
          {t("why")}
        </Heading>
        <Box p={4}>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={16}>
            <Feature
              imageSrc="images/innovative.svg"
              alt="feature1"
              title={t("use")}
              textContent={t("use_text")}
            />
            <Feature
              imageSrc="images/startup.svg"
              alt="feature2"
              title={t("share")}
              textContent={t("share_text")}
            />
            <Feature
              imageSrc="images/Information flow_Monochromatic.svg"
              alt="feature3"
              title={t("find")}
              textContent={t("find_text")}
            />
            <Feature
              imageSrc="images/web.svg"
              alt="feature4"
              title={t("communication")}
              textContent={t("communication_text")}
            />
          </SimpleGrid>
        </Box>
      </Stack>
    </div>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["about", "navbar"])),
    },
  };
}
